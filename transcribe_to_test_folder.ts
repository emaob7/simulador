import fs from 'fs';
import path from 'path';
import { questionsSemana1 } from './src/data/semana1/questions';
import { questionsSemana2 } from './src/data/semana2/questions';
import { questionsSemana3 } from './src/data/semana3/questions';
import { questionsSemana4 } from './src/data/semana4/questions';
import { questionsSemana5 } from './src/data/semana5/questions';
import { questionsSemana6 } from './src/data/semana6/questions';
import { questionsSemana7 } from './src/data/semana7/questions';
import { questionsSemana8 } from './src/data/semana8/questions';
import { questionsSemana9 } from './src/data/semana9/questions';
import { questionsSemana10 } from './src/data/semana10/questions';
import { questionsSemana11 } from './src/data/semana11/questions';
import { questionsSemana12 } from './src/data/semana12/questions';
import { questionsSemana13 } from './src/data/semana13/questions';
import { questionsSemana14 } from './src/data/semana14/questions';
import { questionsSemana15 } from './src/data/semana15/questions';
import { questionsSemana16 } from './src/data/semana16/questions';
import { Question } from './src/types';

const outputDir = path.join('C:', 'Users', 'Rodney Duarte', 'Documents', 'test');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const weeksData: { num: number; filePrefix: string; name: string; questions: Question[] }[] = [
  { num: 1, filePrefix: 'semana_01_pediatria', name: 'Pediatría - Neonatología', questions: questionsSemana1 },
  { num: 2, filePrefix: 'semana_02_medicina_interna', name: 'Medicina Interna - Endocrinología', questions: questionsSemana2 },
  { num: 3, filePrefix: 'semana_03_cirugia', name: 'Cirugía - Infecciones, Cicatrización y Piel', questions: questionsSemana3 },
  { num: 4, filePrefix: 'semana_04_ginecologia_y_obstetricia', name: 'Ginecología y Obstetricia - Anatomía y Prolapsos', questions: questionsSemana4 },
  { num: 5, filePrefix: 'semana_05_pediatria', name: 'Pediatría - Nutrición y Antropometría', questions: questionsSemana5 },
  { num: 6, filePrefix: 'semana_06_medicina_interna', name: 'Medicina Interna - Oncohematología y Cuidados Críticos', questions: questionsSemana6 },
  { num: 7, filePrefix: 'semana_07_cirugia', name: 'Cirugía - Traumatismos y Quemaduras', questions: questionsSemana7 },
  { num: 8, filePrefix: 'semana_08_ginecologia_y_obstetricia', name: 'Ginecología y Obstetricia - Endocrinología Reproductiva e Infecciones', questions: questionsSemana8 },
  { num: 9, filePrefix: 'semana_09_pediatria', name: 'Pediatría - Crecimiento, Desarrollo y Vacunas', questions: questionsSemana9 },
  { num: 10, filePrefix: 'semana_10_medicina_interna', name: 'Medicina Interna - Cardiología', questions: questionsSemana10 },
  { num: 11, filePrefix: 'semana_11_cirugia', name: 'Cirugía - Esófago y Estómago', questions: questionsSemana11 },
  { num: 12, filePrefix: 'semana_12_ginecologia_y_obstetricia', name: 'Ginecología y Obstetricia - Amenorrea, Anticonceptivos y Menopausia', questions: questionsSemana12 },
  { num: 13, filePrefix: 'semana_13_pediatria', name: 'Pediatría - Urgencias, Emergencias y RCP', questions: questionsSemana13 },
  { num: 14, filePrefix: 'semana_14_medicina_interna', name: 'Medicina Interna - Neumología', questions: questionsSemana14 },
  { num: 15, filePrefix: 'semana_15_cirugia', name: 'Cirugía - Tórax, Pulmón, Mediastino y Mamas', questions: questionsSemana15 },
  { num: 16, filePrefix: 'semana_16_ginecologia_y_obstetricia', name: 'Ginecología y Obstetricia - SOP, Hemorragia Uterina e Infertilidad', questions: questionsSemana16 },
];

let totalGlobalQuestions = 0;
const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Master README index
let indexMd = `# 📚 Banco de Preguntas Transcrito y Clasificado - Simulador\n\n`;
indexMd += `Este directorio contiene la transcripción completa y clasificación temática de todas las preguntas del proyecto **Simulador**, organizadas por semanas en formato Markdown con el **Tema Principal** y **Subtema Específico** explicitados en cada sección y pregunta.\n\n`;
indexMd += `**Ubicación de archivos:** \`C:\\Users\\Rodney Duarte\\Documents\\test\`\n\n`;
indexMd += `## 📋 Índice por Semanas\n\n`;
indexMd += `| Semana | Materia / Descripción | Archivo Markdown | Total Preguntas |\n`;
indexMd += `| :---: | :--- | :--- | :---: |\n`;

for (const w of weeksData) {
  totalGlobalQuestions += w.questions.length;
  const fileName = `${w.filePrefix}.md`;
  indexMd += `| **Semana ${w.num}** | ${w.name} | [${fileName}](./${fileName}) | ${w.questions.length} |\n`;

  // Group questions by Tema -> Subtema
  const temasMap = new Map<string, Map<string, Question[]>>();

  for (const q of w.questions) {
    const tema = (q.tema || 'Sin Tema Especificado').trim();
    const subtema = (q.subtema || 'Sin Subtema Especificado').trim();

    if (!temasMap.has(tema)) {
      temasMap.set(tema, new Map<string, Question[]>());
    }
    const subMap = temasMap.get(tema)!;
    if (!subMap.has(subtema)) {
      subMap.set(subtema, []);
    }
    subMap.get(subtema)!.push(q);
  }

  // Generate Week Markdown Content
  let weekMd = `# 📝 Semana ${w.num}: ${w.name}\n\n`;
  if (w.questions.length > 0 && w.questions[0].materia) {
    weekMd += `**Materia Principal:** ${w.questions[0].materia}  \n`;
  }
  if (w.questions.length > 0 && w.questions[0].module) {
    weekMd += `**Módulo:** \`${w.questions[0].module}\`  \n`;
  }
  weekMd += `**Total de Preguntas:** ${w.questions.length}  \n\n`;
  weekMd += `---\n\n`;

  weekMd += `## 📑 Clasificación Curricular (Tema Principal ➔ Subtema Específico)\n\n`;
  for (const [temaName, subMap] of temasMap.entries()) {
    let temaCount = 0;
    subMap.forEach(qList => temaCount += qList.length);
    weekMd += `### 📌 Tema Principal: ${temaName} (${temaCount} preguntas)\n`;
    for (const [subName, qList] of subMap.entries()) {
      weekMd += `- **Subtema Específico:** ${subName} (${qList.length} preguntas)\n`;
    }
    weekMd += `\n`;
  }
  weekMd += `---\n\n## ❓ Transcripción Detallada de Preguntas\n\n`;

  let qIndex = 1;
  for (const [temaName, subMap] of temasMap.entries()) {
    weekMd += `## 📌 TEMA PRINCIPAL: ${temaName}\n\n`;

    for (const [subName, qList] of subMap.entries()) {
      weekMd += `### 🔹 SUBTEMA ESPECÍFICO: ${subName}\n\n`;

      for (const q of qList) {
        weekMd += `#### Pregunta ${qIndex} (ID: \`${q.id}\`)\n`;
        weekMd += `- **Tema Principal:** ${temaName}\n`;
        weekMd += `- **Subtema Específico:** ${subName}\n`;
        if (q.pagina) {
          weekMd += `- **Referencia / Bibliografía:** *${q.pagina}*\n`;
        }
        weekMd += `\n**Enunciado:**\n> ${q.text.replace(/\n/g, '\n> ')}\n\n`;

        weekMd += `**Opciones de Respuesta:**\n`;
        if (Array.isArray(q.options)) {
          q.options.forEach((opt, idx) => {
            const letter = optionLetters[idx] || `${idx + 1}`;
            const isCorrect = idx === q.correctOptionIndex;
            if (isCorrect) {
              weekMd += `- [x] **${letter})** ${opt} **(CORRECTA)**\n`;
            } else {
              weekMd += `- [ ] **${letter})** ${opt}\n`;
            }
          });
        }
        weekMd += `\n`;

        if (q.explanation) {
          const formattedExp = q.explanation.replace(/\n/g, '\n> ');
          weekMd += `> **💡 Explicación / Justificación:**\n> ${formattedExp}\n\n`;
        }

        weekMd += `---\n\n`;
        qIndex++;
      }
    }
  }

  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, weekMd, 'utf-8');
  console.log(`Guardado con Tema y Subtema por pregunta: ${filePath} (${w.questions.length} preguntas)`);
}

indexMd += `| **TOTAL** | **16 Semanas** | - | **${totalGlobalQuestions}** |\n\n`;
const readmePath = path.join(outputDir, 'README.md');
fs.writeFileSync(readmePath, indexMd, 'utf-8');
console.log(`Guardado README principal: ${readmePath}`);
console.log(`¡Actualización completada! Total de preguntas: ${totalGlobalQuestions}`);
