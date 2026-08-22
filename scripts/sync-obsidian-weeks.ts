import fs from 'node:fs';
import path from 'node:path';
import { questionsSemana1 } from '../src/data/semana1/questions';
import { questionsSemana2 } from '../src/data/semana2/questions';
import { questionsSemana3 } from '../src/data/semana3/questions';
import { questionsSemana4 } from '../src/data/semana4/questions';
import { questionsSemana5 } from '../src/data/semana5/questions';
import { questionsSemana6 } from '../src/data/semana6/questions';
import { questionsSemana7 } from '../src/data/semana7/questions';
import { questionsSemana8 } from '../src/data/semana8/questions';
import { questionsSemana9 } from '../src/data/semana9/questions';
import { questionsSemana10 } from '../src/data/semana10/questions';
import { questionsSemana11 } from '../src/data/semana11/questions';
import { questionsSemana12 } from '../src/data/semana12/questions';
import { questionsSemana13 } from '../src/data/semana13/questions';
import { questionsSemana14 } from '../src/data/semana14/questions';
import { questionsSemana15 } from '../src/data/semana15/questions';
import { questionsSemana16 } from '../src/data/semana16/questions';
import type { Question } from '../src/types';
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
const weeksArg = process.argv.find(arg => arg.startsWith('--weeks='))?.split('=')[1] || '1,3,4,10,11';
const selectedWeeks = new Set(weeksArg.split(',').map(Number));
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const optionLetters = ['A', 'B', 'C', 'D', 'E'];

const weeks: WeekDefinition[] = [
  { num: 1, folderName: 'Semana 01 - Neonatología (Pediatría)', title: 'Neonatología', materia: 'Pediatría', questions: questionsSemana1 },
  { num: 2, folderName: 'Semana 02 - Endocrinología (Medicina Interna)', title: 'Endocrinología', materia: 'Medicina Interna', questions: questionsSemana2 },
  { num: 3, folderName: 'Semana 03 - Infecciones, Cicatrización y Piel (Cirugía General)', title: 'Infecciones, Cicatrización y Piel', materia: 'Cirugía General', questions: questionsSemana3 },
  { num: 4, folderName: 'Semana 04 - Anatomía y Prolapsos (Ginecología y Obstetricia)', title: 'Anatomía, Trastornos del Desarrollo y Prolapsos', materia: 'Ginecología y Obstetricia', questions: questionsSemana4 },
  { num: 5, folderName: 'Semana 05 - Nutrición y Antropometría (Pediatría)', title: 'Nutrición y Antropometría', materia: 'Pediatría', questions: questionsSemana5 },
  { num: 6, folderName: 'Semana 06 - Oncohematología y Cuidados Críticos (Medicina Interna)', title: 'Oncohematología y Cuidados Críticos', materia: 'Medicina Interna', questions: questionsSemana6 },
  { num: 7, folderName: 'Semana 07 - Traumatismos y Quemaduras (Cirugía General)', title: 'Traumatismos y Quemaduras', materia: 'Cirugía General', questions: questionsSemana7 },
  { num: 8, folderName: 'Semana 08 - Endocrinología Reproductiva e Infecciones (Ginecología)', title: 'Endocrinología Reproductiva e Infecciones', materia: 'Ginecología y Obstetricia', questions: questionsSemana8 },
  { num: 9, folderName: 'Semana 09 - Crecimiento, Desarrollo y Vacunas (Pediatría)', title: 'Crecimiento, Desarrollo y Vacunas', materia: 'Pediatría', questions: questionsSemana9 },
  { num: 10, folderName: 'Semana 10 - Cardiología (Medicina Interna)', title: 'Cardiología', materia: 'Medicina Interna', questions: questionsSemana10 },
  { num: 11, folderName: 'Semana 11 - Cirugía Digestiva, Esófago y Estómago (Cirugía)', title: 'Esófago y Estómago', materia: 'Cirugía General', questions: questionsSemana11 },
  { num: 12, folderName: 'Semana 12 - Amenorrea, Anticonceptivos y Menopausia (Ginecología)', title: 'Amenorrea, Anticonceptivos y Menopausia', materia: 'Ginecología y Obstetricia', questions: questionsSemana12 },
  { num: 13, folderName: 'Semana 13 - Urgencias, Emergencias y RCP (Pediatría)', title: 'Urgencias, Emergencias y RCP', materia: 'Pediatría', questions: questionsSemana13 },
  { num: 14, folderName: 'Semana 14 - Neumología y Reumatología (Medicina Interna)', title: 'Neumología y Reumatología', materia: 'Medicina Interna', questions: questionsSemana14 },
  { num: 15, folderName: 'Semana 15 - Tórax, Pulmón, Mediastino y Mamas (Cirugía)', title: 'Tórax, Pulmón, Mediastino y Mamas', materia: 'Cirugía General', questions: questionsSemana15 },
  { num: 16, folderName: 'Semana 16 - SOP, Hemorragia Uterina e Infertilidad (Ginecología)', title: 'SOP, Sangrado Uterino, Patología Uterina y Endometriosis', materia: 'Ginecología y Obstetricia', questions: questionsSemana16 },
];

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
}

function buildMasterIndex(): string {
  const total = weeks.reduce((sum, week) => sum + week.questions.length, 0);
  let markdown = `---\ntype: indice_general\ntags:\n  - IndiceGeneral\n  - CONAREM\n  - BancoDePreguntas\n---\n\n# 🏥 Banco de Preguntas CONAREM - Organización por Semanas\n\n## 📊 Balance General\n\n- **Total de Semanas:** \`16 Semanas\`\n- **Total de Preguntas:** \`${total} preguntas\`\n\n## 📂 Navegación por Semanas\n\n| Semana | Especialidad | Tema | Preguntas | Enlace |\n| :---: | :--- | :--- | :---: | :--- |\n`;
  weeks.forEach(week => {
    const pad = String(week.num).padStart(2, '0');
    markdown += `| **Semana ${pad}** | \`${week.materia}\` | ${week.title} | \`${week.questions.length}\` | [[${week.folderName}/📜 Índice - Semana ${pad}\\|Abrir ➔]] |\n`;
  });
  markdown += `| **TOTAL** | - | **16 módulos** | **\`${total}\`** | - |\n`;
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
