import fs from 'node:fs';
import path from 'node:path';
import type { Question } from '../src/types';
import { WEEK_CATALOG, loadWeekQuestions } from '../src/data/weekCatalog';
import { classifyQuestionForStudy } from '../src/utils/studyCatalog';

interface WeekDefinition {
  num: number;
  folderName: string;
  title: string;
  materia: string;
  questions: Question[];
}

const vault = process.env.OBSIDIAN_VAULT || path.join(process.env.USERPROFILE || '', 'Documents', 'Banco_Preguntas_CONAREM');
const backupRoot = path.join(path.dirname(vault), 'Banco_Preguntas_CONAREM_Backups');
const apply = process.argv.includes('--apply');
const weeksArg = process.argv.find(arg => arg.startsWith('--weeks='))?.split('=')[1] || 'all';
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const optionLetters = ['A', 'B', 'C', 'D', 'E'];

const weeks: WeekDefinition[] = await Promise.all(WEEK_CATALOG.map(async definition => ({
  num: definition.week,
  folderName: definition.folderName,
  title: definition.title,
  materia: definition.materia === 'Cirugía' ? 'Cirugía General' : definition.materia,
  questions: await loadWeekQuestions(definition.week),
})));

const selectedWeeks = weeksArg === 'all'
  ? new Set(weeks.map(w => w.num))
  : new Set(weeksArg.split(',').map(Number));

function assertChild(parent: string, child: string): void {
  const parentPath = path.resolve(parent);
  const childPath = path.resolve(child);
  if (!childPath.startsWith(`${parentPath}${path.sep}`)) throw new Error(`Ruta fuera del ámbito permitido: ${childPath}`);
}

function cleanTitle(value: string): string {
  return value.replace(/[\\/:*?"<>|]/g, ' - ').replace(/\s+/g, ' ').trim();
}

function groupForWeek(question: Question, week: number): string {
  const classification = classifyQuestionForStudy(question);
  return [3, 4, 11].includes(week) ? classification.topicLabel : classification.subtopicLabel;
}

function renderQuestion(question: Question, heading: string): string {
  const correctLetter = optionLetters[question.correctOptionIndex] || String(question.correctOptionIndex + 1);
  const correctText = question.options[question.correctOptionIndex] || '';
  let markdown = `${heading} (\`${question.id}\`)\n\n> [!question] Enunciado\n> ${question.text.replace(/\n/g, '\n> ')}\n\n**Opciones de Respuesta:**\n`;
  question.options.forEach((option, index) => {
    const letter = optionLetters[index] || String(index + 1);
    markdown += index === question.correctOptionIndex
      ? `- **[x] ${letter})** ${option} *(Correcta)*\n`
      : `- [ ] **${letter})** ${option}\n`;
  });
  markdown += `\n> [!tip] 💡 Justificación Clínica y Clave de Examen\n> **Respuesta:** \`${correctLetter}) ${correctText}\`\n>\n> ${(question.explanation || 'Sin explicación adicional.').replace(/\n/g, '\n> ')}\n\n`;
  if (question.pagina) markdown += `> [!quote] 📖 Fuente Bibliográfica\n> ${question.pagina}\n\n`;
  return `${markdown}---\n\n`;
}

function buildWeek(week: WeekDefinition): Map<string, string> {
  const groups = new Map<string, Question[]>();
  week.questions.forEach(question => {
    const group = groupForWeek(question, week.num);
    const list = groups.get(group) || [];
    list.push(question);
    groups.set(group, list);
  });
  const entries = Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b, 'es'));
  const pad = String(week.num).padStart(2, '0');
  const output = new Map<string, string>();

  entries.forEach(([group, questions], index) => {
    const fileName = `${String(index + 1).padStart(2, '0')} - ${cleanTitle(group)}.md`;
    let markdown = `---\ntype: subtema\nsemana: ${week.num}\nmateria: "${week.materia}"\ntema: "${week.title}"\nsubtema: "${group}"\ntotal_preguntas: ${questions.length}\ntags:\n  - Subtema\n  - Semana${pad}\n  - CONAREM\n---\n\n# 🔹 ${group}\n\n> [!abstract] 🧭 Clasificación\n> - **Semana:** [[${week.folderName}/📜 Índice - Semana ${pad}|Semana ${pad}: ${week.title}]]\n> - **Materia:** \`${week.materia}\`\n> - **Preguntas:** \`${questions.length}\`\n\n---\n\n## ❓ Preguntas de Examen (${questions.length})\n\n`;
    questions.forEach((question, questionIndex) => { markdown += renderQuestion(question, `### Pregunta ${questionIndex + 1}`); });
    output.set(fileName, markdown);
  });

  let indexMarkdown = `---\ntype: indice_semanal\nsemana: ${week.num}\nmateria: "${week.materia}"\ntema_principal: "${week.title}"\ntotal_subtemas: ${entries.length}\ntotal_preguntas: ${week.questions.length}\ntags:\n  - Semana\n  - Semana${pad}\n  - CONAREM\n---\n\n# 📅 Semana ${pad}: ${week.title}\n\n> [!info] 🎯 Resumen del Bloque Semanal\n> - **Materia:** \`${week.materia}\`\n> - **Subtemas:** \`${entries.length}\`\n> - **Total de Preguntas:** \`${week.questions.length}\`\n> - **Índice General:** [[00 - 🏠 Inicio & Índice General]]\n\n---\n\n## 📑 Clasificación Temática\n\n| # | Tema o subtema | Preguntas | Ficha |\n| :-: | :--- | :---: | :--- |\n`;
  entries.forEach(([group, questions], index) => {
    const fileBase = `${String(index + 1).padStart(2, '0')} - ${cleanTitle(group)}`;
    indexMarkdown += `| ${index + 1} | **${group}** | \`${questions.length}\` | [[${week.folderName}/${fileBase}\\|Ver preguntas ➔]] |\n`;
  });
  indexMarkdown += `\n---\n\n## ❓ Banco Completo de Preguntas - Semana ${pad}\n\n`;
  let questionNumber = 1;
  entries.forEach(([group, questions]) => {
    indexMarkdown += `### 📂 ${group} (${questions.length} preguntas)\n\n`;
    questions.forEach(question => {
      indexMarkdown += renderQuestion(question, `#### Pregunta ${questionNumber}`);
      questionNumber += 1;
    });
  });
  output.set(`📜 Índice - Semana ${pad}.md`, indexMarkdown);
  return output;
}

function extractIds(markdown: string): string[] {
  return Array.from(markdown.matchAll(/(?:###|####) Pregunta \d+ \(`([^`]+)`\)/g), match => match[1]);
}

function validateWeek(week: WeekDefinition, output: Map<string, string>): void {
  const index = Array.from(output.entries()).find(([name]) => name.includes('Índice - Semana'))?.[1];
  if (!index) throw new Error(`Semana ${week.num}: índice no generado`);
  const indexIds = extractIds(index);
  const noteIds = Array.from(output.entries()).filter(([name]) => !name.includes('Índice - Semana')).flatMap(([, markdown]) => extractIds(markdown));
  const sourceIds = week.questions.map(question => question.id);
  for (const [label, ids] of [['índice', indexIds], ['fichas', noteIds]] as const) {
    if (ids.length !== sourceIds.length || new Set(ids).size !== sourceIds.length || sourceIds.some(id => !ids.includes(id))) {
      throw new Error(`Semana ${week.num}: validación fallida en ${label}`);
    }
  }
  for (const question of week.questions) {
    const fullExplanation = (question.explanation || 'Sin explicación adicional.').replace(/\r\n/g, '\n').replace(/\n/g, '\n> ');
    if (!index.replace(/\r\n/g, '\n').includes(fullExplanation)) {
      throw new Error(`Semana ${week.num}: explicación incompleta o alterada en ${question.id}`);
    }
  }
}

function buildMasterIndex(): string {
  const total = weeks.reduce((sum, week) => sum + week.questions.length, 0);
  let markdown = `---\ntype: indice_general\ntags:\n  - IndiceGeneral\n  - CONAREM\n  - BancoDePreguntas\n---\n\n# 🏥 Banco de Preguntas CONAREM - Organización por Semanas\n\n## 📊 Balance General\n\n- **Total de Semanas:** \`${weeks.length} Semanas\`\n- **Total de Preguntas:** \`${total} preguntas\`\n\n## 📂 Navegación por Semanas\n\n| Semana | Especialidad | Tema | Preguntas | Enlace |\n| :---: | :--- | :--- | :---: | :--- |\n`;
  weeks.forEach(week => {
    const pad = String(week.num).padStart(2, '0');
    markdown += `| **Semana ${pad}** | \`${week.materia}\` | ${week.title} | \`${week.questions.length}\` | [[${week.folderName}/📜 Índice - Semana ${pad}\\|Abrir ➔]] |\n`;
  });
  markdown += `| **TOTAL** | - | **${weeks.length} módulos** | **\`${total}\`** | - |\n`;
  return markdown;
}

if (!fs.existsSync(vault) || !fs.existsSync(path.join(vault, '.obsidian'))) throw new Error(`Vault de Obsidian inválido: ${vault}`);
const targets = weeks.filter(week => selectedWeeks.has(week.num));
if (targets.length !== selectedWeeks.size) throw new Error(`Selección de semanas inválida: ${weeksArg}`);

const generated = new Map<number, Map<string, string>>();
for (const week of targets) {
  const output = buildWeek(week);
  validateWeek(week, output);
  generated.set(week.num, output);
}

console.log(`Validación previa correcta: ${targets.map(week => `S${week.num}=${week.questions.length}`).join(', ')}`);
if (!apply) {
  console.log('Dry run: no se modificó Obsidian. Use --apply para sincronizar.');
  process.exit(0);
}

const stagingRoot = path.join(vault, '.codex-staging', runId);
assertChild(vault, stagingRoot);
fs.mkdirSync(stagingRoot, { recursive: true });
for (const week of targets) {
  const stageWeek = path.join(stagingRoot, week.folderName);
  fs.mkdirSync(stageWeek, { recursive: true });
  generated.get(week.num)!.forEach((markdown, fileName) => fs.writeFileSync(path.join(stageWeek, fileName), markdown, 'utf8'));
}
fs.writeFileSync(path.join(stagingRoot, '00 - 🏠 Inicio & Índice General.md'), buildMasterIndex(), 'utf8');

const backup = path.join(backupRoot, runId);
fs.mkdirSync(backup, { recursive: true });
for (const week of targets) {
  const targetFolder = path.join(vault, week.folderName);
  assertChild(vault, targetFolder);
  const backupFolder = path.join(backup, week.folderName);
  fs.mkdirSync(backupFolder, { recursive: true });
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  const generatedFiles = fs.readdirSync(targetFolder).filter(name => name.endsWith('.md') && (name.includes('Índice - Semana') || /^\d{2} - /.test(name)));
  generatedFiles.forEach(name => fs.copyFileSync(path.join(targetFolder, name), path.join(backupFolder, name)));
  generatedFiles.forEach(name => fs.rmSync(path.join(targetFolder, name)));
  fs.readdirSync(path.join(stagingRoot, week.folderName)).forEach(name => fs.copyFileSync(path.join(stagingRoot, week.folderName, name), path.join(targetFolder, name)));
}

const masterName = '00 - 🏠 Inicio & Índice General.md';
if (fs.existsSync(path.join(vault, masterName))) fs.copyFileSync(path.join(vault, masterName), path.join(backup, masterName));
fs.copyFileSync(path.join(stagingRoot, masterName), path.join(vault, masterName));

for (const week of targets) {
  const targetFolder = path.join(vault, week.folderName);
  const output = new Map<string, string>();
  fs.readdirSync(targetFolder).filter(name => name.endsWith('.md')).forEach(name => output.set(name, fs.readFileSync(path.join(targetFolder, name), 'utf8')));
  validateWeek(week, output);
}

fs.rmSync(stagingRoot, { recursive: true });
console.log(`Obsidian sincronizado. Respaldo recuperable: ${backup}`);
