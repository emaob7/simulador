import fs from 'fs';

const raw = fs.readFileSync('classification_dump.json', 'utf-8');
const data = JSON.parse(raw);

let md = `# 📚 Clasificación del Simulador por Semanas\n\n`;
md += `Este documento contiene la clasificación completa de los temas y subtemas del proyecto **Simulador**, organizados cronológicamente por semanas (Semana 1 a Semana 14), incluyendo la materia, los temas principales y cada uno de sus subtemas específicos con su respectiva cantidad de preguntas.\n\n`;

md += `## 📊 Resumen General\n\n`;
md += `| Semana | Materia / Módulo | Temas | Total Preguntas |\n`;
md += `| :---: | :--- | :---: | :---: |\n`;

let totalQsAll = 0;
for (const w of data) {
  totalQsAll += w.totalQuestions;
  md += `| **Semana ${w.semana}** | ${w.materia} (${w.module}) | ${w.temasCount} | ${w.totalQuestions} |\n`;
}
md += `| **TOTAL** | **14 Semanas** | - | **${totalQsAll}** |\n\n`;
md += `---\n\n`;

md += `## 🗓️ Desglose Detallado por Semanas, Temas y Subtemas\n\n`;

for (const w of data) {
  md += `### 📅 Semana ${w.semana}: ${w.materia}\n`;
  md += `**Módulo:** \`${w.module}\`  \n`;
  md += `**Total de Preguntas:** ${w.totalQuestions}  \n\n`;

  for (const t of w.temas) {
    md += `#### 🔹 Tema: ${t.tema} (${t.count} preguntas)\n`;
    for (const st of t.subtemas) {
      md += `- **${st.subtema}**: ${st.count} pregunta(s)\n`;
    }
    md += `\n`;
  }
  md += `---\n\n`;
}

fs.writeFileSync('clasificacion_semanas.md', md, 'utf-8');
console.log('Generated clasificacion_semanas.md successfully!');
