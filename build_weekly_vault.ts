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

const vaultDir = path.join('C:', 'Users', 'Rodney Duarte', 'Documents', 'Banco_Preguntas_CONAREM');

// Clean previous directory
if (fs.existsSync(vaultDir)) {
  fs.rmSync(vaultDir, { recursive: true, force: true });
}
fs.mkdirSync(vaultDir, { recursive: true });
fs.mkdirSync(path.join(vaultDir, '.obsidian'), { recursive: true });

// Setup .obsidian config
fs.writeFileSync(path.join(vaultDir, '.obsidian', 'app.json'), JSON.stringify({
  useMarkdownLinks: false,
  showFrontmatter: true,
  readableLineLength: true,
  strictLineBreaks: false,
  foldHeading: true,
  foldIndent: true,
  promptDelete: false,
}, null, 2), 'utf-8');

fs.writeFileSync(path.join(vaultDir, '.obsidian', 'graph.json'), JSON.stringify({
  "collapse-filter": false,
  "search": "",
  "colorGroups": [
    { "query": "tag:#Materia", "color": { "a": 1, "rgb": 14701138 } },
    { "query": "tag:#Semana", "color": { "a": 1, "rgb": 65280 } },
    { "query": "tag:#Subtema", "color": { "a": 1, "rgb": 3394815 } }
  ]
}, null, 2), 'utf-8');

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function cleanTitle(s: string): string {
  return (s || 'General').replace(/[\\/:*?"<>|]/g, ' - ').replace(/\s+/g, ' ').trim();
}

// WEEKLY DEFINITIONS & SUBTOPIC MAPPERS
interface WeekDef {
  num: number;
  folderName: string;
  title: string;
  materia: string;
  questions: Question[];
  mapSubtema: (q: Question) => string;
}

// Map helpers per week
function mapS01(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  const t = (q.text || '').toLowerCase();
  if (s.includes('reanimación') || t.includes('reanimación') || t.includes('vpp') || t.includes('adrenalina')) return 'Reanimación Neonatal en Sala de Partos';
  if (s.includes('membrana hialina') || s.includes('emh') || s.includes('taquipnea') || s.includes('salam') || s.includes('meconio')) return 'Dificultad Respiratoria Neonatal (EMH, TTRN, SALAM)';
  if (s.includes('ductus') || s.includes('dap') || s.includes('entero') || s.includes('ecn') || s.includes('onfalocele')) return 'Patología Cardiovascular y Digestiva del Prematuro (DAP y ECN)';
  if (s.includes('sepsis') || s.includes('encefalopatía') || s.includes('parálisis') || t.includes('plexo braquial')) return 'Infecciones Neonatales y Neurología Perinatal (Sepsis y EHI)';
  return 'Recién Nacido Sano, Atención Inmediata y Transición';
}

function mapS02(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  const t = (q.text || '').toLowerCase();
  if (s.includes('tiroid') || s.includes('graves') || s.includes('hashimoto') || s.includes('bocio') || s.includes('adenoma tóxico')) return 'Patología Tiroidea (Hipotiroidismo, Hipertiroidismo, Nódulo y Cáncer)';
  if (s.includes('suprarrenal') || s.includes('cushing') || s.includes('feocromocitoma') || s.includes('aldosteron')) return 'Glándula Suprarrenal (Cushing, Addison, Hiperaldosteronismo y Feocromocitoma)';
  if (s.includes('diabet') || s.includes('insulina') || s.includes('cetoacidosis')) return 'Diabetes Mellitus, Cetoacidosis y Complicaciones';
  if (s.includes('osteoporosis') || s.includes('men') || s.includes('hemocromatosis') || s.includes('óseo')) return 'Metabolismo Mineral, Óseo y Neoplasias Endocrinas (MEN)';
  return 'Hipotálamo, Hipófisis y Regulación Hormonal';
}

function mapS03(q: Question): string {
  return q.subtema || 'Cicatrización de Heridas';
}

function mapS04(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('prolapso') || s.includes('pop-q') || s.includes('pesarios')) return 'Prolapso de Órganos Pélvicos (POP-Q) y Piso Pélvico';
  if (s.includes('embriolog') || s.includes('conductos') || s.includes('müller') || s.includes('mesonéfricos') || s.includes('mayer')) return 'Embriología Genitourinaria y Malformaciones Müllerianas';
  if (s.includes('diferenciación') || s.includes('dsd') || s.includes('turner') || s.includes('clítoris') || s.includes('himen') || s.includes('disgenesia')) return 'Trastornos del Desarrollo Sexual (DSD) y Diferenciación';
  return 'Anatomía Pélvica, Sostén y Niveles de DeLancey';
}

function mapS05(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('lactancia') || s.includes('alimentación') || s.includes('leche') || s.includes('guías')) return 'Lactancia Materna y Alimentación Complementaria';
  if (s.includes('desnutri') || s.includes('realimentación')) return 'Desnutrición Infantil, Clasificación y Síndrome de Realimentación';
  if (s.includes('obesidad') || s.includes('exceso')) return 'Trastornos por Exceso y Obesidad Infantil';
  return 'Evaluación Antropométrica y Curvas de Crecimiento';
}

function mapS06(q: Question): string {
  return q.subtema || 'Anemias Ferropénicas y por Inflamación';
}

function mapS07(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('quemadura') || s.includes('inhalación') || s.includes('eléctrica') || s.includes('química')) return 'Quemaduras (Térmicas, Eléctricas, Químicas) e Inhalación';
  if (s.includes('choque') || s.includes('hemorrágico') || s.includes('compartimento') || s.includes('daños') || s.includes('toracotomía')) return 'Choque Hemorrágico, Reanimación y Control de Daños';
  if (s.includes('abdominal') || s.includes('torácico') || s.includes('extremidades') || s.includes('craneoencefálico') || s.includes('regiones')) return 'Trauma por Regiones (Tórax, Abdomen, Pelvis y TCE)';
  return 'Evaluación Inicial y Soporte Vital en Trauma (ATLS)';
}

function mapS08(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('infecc') || s.includes('its') || s.includes('vaginitis') || s.includes('vaginosis') || s.includes('cervicitis') || s.includes('úlcera')) return 'Infecciones del Tracto Genital Femenino e ITS';
  if (s.includes('pelviana') || s.includes('inflamatoria') || s.includes('eip') || s.includes('absceso')) return 'Enfermedad Inflamatoria Pélvica (EIP) y Abscesos';
  if (s.includes('benigna') || s.includes('vulva') || s.includes('pólipo') || s.includes('útero') || s.includes('cérvix')) return 'Patología Benigna del Aparato Genital Femenino';
  return 'Ciclo Menstrual, Esteroidogénesis y Fisiología Ovárica';
}

function mapS09(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('vacuna') || s.includes('inmuni')) return 'Programa Nacional de Inmunizaciones y Vacunas';
  return 'Crecimiento, Desarrollo Psicomotor e Hitos del Desarrollo';
}

function mapS10(q: Question): string {
  return q.subtema || 'Electrocardiografía (ECG) y Semiología Cardiovascular';
}

function mapS11(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('erge') || s.includes('reflujo') || s.includes('acalasia') || s.includes('motilidad') || s.includes('zenker') || s.includes('esofagitis') || s.includes('hernia hiatal') || s.includes('esfínter') || s.includes('barrett') || s.includes('funduplicatura') || s.includes('schatzki') || s.includes('esclerodermia') || s.includes('disfagia')) return 'Patología Esofágica Benigna y Trastornos Motores (ERGE, Acalasia)';
  if (s.includes('cáncer de esófago') || s.includes('perforación') || s.includes('cáusticas')) return 'Neoplasias de Esófago y Emergencias Esofágicas';
  if (s.includes('adenocarcinoma gástrico') || s.includes('linfoma') || s.includes('ménétrier')) return 'Neoplasias Gástricas (Adenocarcinoma y Linfoma)';
  return 'Enfermedad Ulcerosa Péptica, Fisiología Gástrica y Complicaciones Quirúrgicas';
}

function mapS12(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('anticoncep') || s.includes('diu') || s.includes('implante') || s.includes('aco') || s.includes('criterios de elegibilidad') || s.includes('parche') || s.includes('esterilización') || s.includes('emergencia')) return 'Métodos Anticonceptivos y Criterios de Elegibilidad';
  if (s.includes('menopaus') || s.includes('transición') || s.includes('straw') || s.includes('climaterio') || s.includes('vasomotores') || s.includes('genitourinario')) return 'Transición Menopáusica, Climaterio y Síndrome Genitourinario';
  return 'Amenorreas Primarias y Secundarias (Clasificación y Diagnóstico)';
}

function mapS13(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('soporte') || s.includes('bls') || s.includes('intubación')) return 'Soporte Vital Básico, Vía Aérea y RCP Pediátrico';
  if (s.includes('arritmia') || s.includes('paro')) return 'Arritmias y Paro Cardiorrespiratorio';
  if (s.includes('shock')) return 'Shock Pediátrico y Manejo Hemodinámico';
  if (s.includes('neurología') || s.includes('coma') || s.includes('neurocuidados') || s.includes('ppc')) return 'Neurología de Urgencia, Coma y Neurocuidados';
  if (s.includes('trauma')) return 'Trauma Pediátrico y Politraumatismo';
  return 'Quemaduras y Ahogamiento / Inmersión';
}

function mapS14(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('asma') || s.includes('epoc') || s.includes('bronquiectasias') || s.includes('obstructiva')) return 'Enfermedades Pulmonares Obstructivas (Asma, EPOC, Bronquiectasias)';
  if (s.includes('intersticial') || s.includes('hipersensibilidad') || s.includes('eosinof') || s.includes('aspergilosis') || s.includes('silicosis') || s.includes('asbesto') || s.includes('laborales')) return 'Neumopatías Intersticiales, Ocupacionales y Eosinofílicas';
  if (s.includes('pleura') || s.includes('derrame') || s.includes('apnea')) return 'Trastornos de la Pleura, Derrame Pleural y Apnea del Sueño';
  if (s.includes('lupus') || s.includes('saf') || s.includes('esclerosis') || s.includes('mixta') || s.includes('sjögren')) return 'Enfermedades Autoinmunes Sistémicas (LES, SAF, Esclerodermia, Sjögren)';
  if (s.includes('artritis') || s.includes('espondil') || s.includes('reumatoide') || s.includes('reactiva') || s.includes('psoriásica') || s.includes('anquilosante')) return 'Artritis Reumatoide y Espondiloartritis';
  return 'Vasculitis Sistémicas, Miopatías y Artropatías por Cristales (Gota)';
}

function mapS15(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('cáncer de pulmón') || s.includes('nps') || s.includes('subtipos')) return 'Cáncer de Pulmón (Epidemiología, Diagnóstico y Manejo)';
  if (s.includes('mediastín') || s.includes('pleura') || s.includes('pared') || s.includes('traqueal') || s.includes('torácic')) return 'Cirugía Torácica General, Pleura, Mediastino y Pared Torácica';
  if (s.includes('benigna') || s.includes('inflamatoria') || s.includes('anatomía') || s.includes('mamaria')) return 'Patología Mamaria Benigna e Inflamatoria';
  return 'Cáncer de Mama (Tamizaje, Factores de Riesgo, Histología y Manejo Quirúrgico)';
}

function mapS16(q: Question): string {
  const s = (q.subtema || '').toLowerCase();
  if (s.includes('sop') || s.includes('ovarios poliquísticos') || s.includes('rotterdam') || s.includes('criterios')) return 'Síndrome de Ovarios Poliquísticos (SOP y Criterios Diagnósticos)';
  if (s.includes('hemorragia') || s.includes('menstrual') || s.includes('figo') || s.includes('palm-coein')) return 'Hemorragia Uterina Anormal (Clasificación PALM-COEIN)';
  if (s.includes('leiomioma') || s.includes('mioma') || s.includes('adenomiosis')) return 'Miomatosis Uterina y Adenomiosis';
  return 'Infertilidad y Trastornos Reproductivos';
}

const allWeeksDefs: WeekDef[] = [
  { num: 1, folderName: 'Semana 01 - Neonatología (Pediatría)', title: 'Neonatología', materia: 'Pediatría', questions: questionsSemana1, mapSubtema: mapS01 },
  { num: 2, folderName: 'Semana 02 - Endocrinología (Medicina Interna)', title: 'Endocrinología', materia: 'Medicina Interna', questions: questionsSemana2, mapSubtema: mapS02 },
  { num: 3, folderName: 'Semana 03 - Infecciones, Cicatrización y Piel (Cirugía General)', title: 'Infecciones, Cicatrización y Piel', materia: 'Cirugía General', questions: questionsSemana3, mapSubtema: mapS03 },
  { num: 4, folderName: 'Semana 04 - Anatomía y Prolapsos (Ginecología y Obstetricia)', title: 'Anatomía y Prolapsos', materia: 'Ginecología y Obstetricia', questions: questionsSemana4, mapSubtema: mapS04 },
  { num: 5, folderName: 'Semana 05 - Nutrición y Antropometría (Pediatría)', title: 'Nutrición y Antropometría', materia: 'Pediatría', questions: questionsSemana5, mapSubtema: mapS05 },
  { num: 6, folderName: 'Semana 06 - Oncohematología y Cuidados Críticos (Medicina Interna)', title: 'Oncohematología y Cuidados Críticos', materia: 'Medicina Interna', questions: questionsSemana6, mapSubtema: mapS06 },
  { num: 7, folderName: 'Semana 07 - Traumatismos y Quemaduras (Cirugía General)', title: 'Traumatismos y Quemaduras', materia: 'Cirugía General', questions: questionsSemana7, mapSubtema: mapS07 },
  { num: 8, folderName: 'Semana 08 - Endocrinología Reproductiva e Infecciones (Ginecología)', title: 'Endocrinología Reproductiva e Infecciones', materia: 'Ginecología y Obstetricia', questions: questionsSemana8, mapSubtema: mapS08 },
  { num: 9, folderName: 'Semana 09 - Crecimiento, Desarrollo y Vacunas (Pediatría)', title: 'Crecimiento, Desarrollo y Vacunas', materia: 'Pediatría', questions: questionsSemana9, mapSubtema: mapS09 },
  { num: 10, folderName: 'Semana 10 - Cardiología (Medicina Interna)', title: 'Cardiología', materia: 'Medicina Interna', questions: questionsSemana10, mapSubtema: mapS10 },
  { num: 11, folderName: 'Semana 11 - Cirugía Digestiva, Esófago y Estómago (Cirugía)', title: 'Cirugía Digestiva, Esófago y Estómago', materia: 'Cirugía General', questions: questionsSemana11, mapSubtema: mapS11 },
  { num: 12, folderName: 'Semana 12 - Amenorrea, Anticonceptivos y Menopausia (Ginecología)', title: 'Amenorrea, Anticonceptivos y Menopausia', materia: 'Ginecología y Obstetricia', questions: questionsSemana12, mapSubtema: mapS12 },
  { num: 13, folderName: 'Semana 13 - Urgencias, Emergencias y RCP (Pediatría)', title: 'Urgencias, Emergencias y RCP', materia: 'Pediatría', questions: questionsSemana13, mapSubtema: mapS13 },
  { num: 14, folderName: 'Semana 14 - Neumología y Reumatología (Medicina Interna)', title: 'Neumología y Reumatología', materia: 'Medicina Interna', questions: questionsSemana14, mapSubtema: mapS14 },
  { num: 15, folderName: 'Semana 15 - Tórax, Pulmón, Mediastino y Mamas (Cirugía)', title: 'Tórax, Pulmón, Mediastino y Mamas', materia: 'Cirugía General', questions: questionsSemana15, mapSubtema: mapS15 },
  { num: 16, folderName: 'Semana 16 - SOP, Hemorragia Uterina e Infertilidad (Ginecología)', title: 'SOP, Hemorragia Uterina e Infertilidad', materia: 'Ginecología y Obstetricia', questions: questionsSemana16, mapSubtema: mapS16 },
];

let globalTotal = 0;
const weeklySummary: { num: number; folder: string; materia: string; title: string; count: number; subCount: number }[] = [];

for (const w of allWeeksDefs) {
  globalTotal += w.questions.length;
  const weekPath = path.join(vaultDir, w.folderName);
  fs.mkdirSync(weekPath, { recursive: true });

  // Group questions of this week by mapped subtheme
  const subMap = new Map<string, Question[]>();
  for (const q of w.questions) {
    const unifiedSub = w.mapSubtema(q);
    if (!subMap.has(unifiedSub)) {
      subMap.set(unifiedSub, []);
    }
    subMap.get(unifiedSub)!.push(q);
  }

  // Custom sort for Semana 6
  let sortedSubEntries = Array.from(subMap.entries());
  if (w.num === 6) {
    const customOrder6 = [
      'Anemias Ferropénicas y por Inflamación',
      'Anemias Megaloblásticas (B12 y Folato)',
      'Anemias Hemolíticas y HPN',
      'Hemostasia, Coagulación y Plaquetas',
      'Leucemias Agudas y Crónicas (LMA, LLA, LMC, LLC)',
      'Linfomas (Hodgkin y No Hodgkin)',
      'Mieloma Múltiple y Gammapatías',
      'Insuficiencia Medular (Anemia Aplásica y Mielodisplasia)',
      'Neoplasias Mieloproliferativas Crónicas (Policitemia Vera, Mielofibrosis)',
      'Urgencias Oncológicas y Marcadores Tumorales',
      'Sepsis, Choque Séptico y Hemodinamia',
      'Choque Cardiógeno, Edema Pulmonar y Paro',
      'Insuficiencia Respiratoria Aguda y SDRA',
      'Neurointensivismo, Coma y Paciente Crítico',
    ];
    sortedSubEntries.sort((a, b) => {
      const idxA = customOrder6.indexOf(a[0]);
      const idxB = customOrder6.indexOf(b[0]);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  } else if (w.num === 10) {
    const customOrder10 = [
      'Electrocardiografía (ECG) y Semiología Cardiovascular',
      'Arritmias, Fibrilación Auricular y Bloqueos AV',
      'Cardiopatía Isquémica y Síndromes Coronarios Agudos (SCA)',
      'Insuficiencia Cardíaca y Fármacos de Supervivencia',
      'Miocardiopatías y Miocarditis',
      'Enfermedades del Pericardio (Pericarditis, Derrame y Taponamiento)',
      'Valvulopatías Cardíacas',
      'Hipertensión Arterial y Crisis Hipertensivas',
    ];
    sortedSubEntries.sort((a, b) => {
      const idxA = customOrder10.indexOf(a[0]);
      const idxB = customOrder10.indexOf(b[0]);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }

  weeklySummary.push({
    num: w.num,
    folder: w.folderName,
    materia: w.materia,
    title: w.title,
    count: w.questions.length,
    subCount: subMap.size,
  });

  const padNum = String(w.num).padStart(2, '0');

  // 1. Generate individual subtopic notes inside this week's folder
  let subIndex = 1;
  for (const [subName, qList] of sortedSubEntries) {
    const subPad = String(subIndex).padStart(2, '0');
    const sanitizedSubName = cleanTitle(subName);
    const subFileName = `${subPad} - ${sanitizedSubName}.md`;

    let subMd = `---
type: subtema
semana: ${w.num}
materia: "${w.materia}"
tema: "${w.title}"
subtema: "${subName}"
total_preguntas: ${qList.length}
tags:
  - Subtema
  - Semana${padNum}
  - ${w.materia.replace(/\s+/g, '')}
  - CONAREM
---

# 🔹 ${subName}

> [!abstract] 🧭 Clasificación de la Pregunta
> - **Semana:** [[${w.folderName}/📜 Índice - Semana ${padNum}|Semana ${padNum}: ${w.title}]]
> - **Materia:** \`${w.materia}\`
> - **Tema Principal:** \`${w.title}\`
> - **Total de Preguntas:** \`${qList.length}\`

---

## ❓ Preguntas de Examen (${qList.length})

`;

    qList.forEach((q, idx) => {
      const correctLetter = optionLetters[q.correctOptionIndex] || 'Correcta';
      const correctText = q.options && q.options[q.correctOptionIndex] ? q.options[q.correctOptionIndex] : '';

      subMd += `### Pregunta ${idx + 1} (\`${q.id}\`)\n\n`;
      subMd += `> [!question] Enunciado\n`;
      subMd += `> ${q.text.replace(/\n/g, '\n> ')}\n\n`;

      subMd += `**Opciones de Respuesta:**\n`;
      if (Array.isArray(q.options)) {
        q.options.forEach((opt, oIdx) => {
          const letter = optionLetters[oIdx] || `${oIdx + 1}`;
          const isCorrect = oIdx === q.correctOptionIndex;
          if (isCorrect) {
            subMd += `- **[x] ${letter})** ${opt} *(Correcta)*\n`;
          } else {
            subMd += `- [ ] **${letter})** ${opt}\n`;
          }
        });
      }
      subMd += `\n`;

      if (q.explanation) {
        subMd += `> [!tip] 💡 Justificación Clínica y Clave de Examen\n`;
        subMd += `> **Respuesta:** \`${correctLetter}) ${correctText}\`\n>\n`;
        subMd += `> ${q.explanation.replace(/\n/g, '\n> ')}\n\n`;
      }

      if (q.pagina) {
        subMd += `> [!quote] 📖 Fuente Bibliográfica\n> ${q.pagina}\n\n`;
      }

      subMd += `---\n\n`;
    });

    fs.writeFileSync(path.join(weekPath, subFileName), subMd, 'utf-8');
    subIndex++;
  }

  // 2. Generate Week Index Note (📜 Índice - Semana XX.md)
  let weekIndexMd = `---
type: indice_semanal
semana: ${w.num}
materia: "${w.materia}"
tema_principal: "${w.title}"
total_subtemas: ${subMap.size}
total_preguntas: ${w.questions.length}
tags:
  - Semana
  - Semana${padNum}
  - ${w.materia.replace(/\s+/g, '')}
  - CONAREM
---

# 📅 Semana ${padNum}: ${w.title}

> [!info] 🎯 Resumen del Bloque Semanal
> - **Materia:** \`${w.materia}\`
> - **Tema Principal:** \`${w.title}\`
> - **Subtemas:** \`${subMap.size}\`
> - **Total de Preguntas:** \`${w.questions.length}\`
> - **Índice General:** [[00 - 🏠 Inicio & Índice General]]

---

## 📑 Clasificación Temática de la Semana ${padNum}

| # | Subtema Clínico | Preguntas | Ficha de Estudio |
| :-: | :--- | :---: | :--- |
`;

  let idxRow = 1;
  for (const [subName, qList] of sortedSubEntries) {
    const subPad = String(idxRow).padStart(2, '0');
    const sanitizedSubName = cleanTitle(subName);
    const linkTarget = `${subPad} - ${sanitizedSubName}`;
    weekIndexMd += `| ${idxRow} | **${subName}** | \`${qList.length}\` | [[${w.folderName}/${linkTarget}\\|Ver Preguntas ➔]] |\n`;
    idxRow++;
  }

  weekIndexMd += `\n---\n\n## ❓ Banco Completo de Preguntas - Semana ${padNum}\n\n`;

  let qCountAll = 1;
  for (const [subName, qList] of sortedSubEntries) {
    weekIndexMd += `### 📂 ${subName} (${qList.length} preguntas)\n\n`;
    for (const q of qList) {
      const correctLetter = optionLetters[q.correctOptionIndex] || 'Correcta';
      const correctText = q.options && q.options[q.correctOptionIndex] ? q.options[q.correctOptionIndex] : '';

      weekIndexMd += `#### Pregunta ${qCountAll} (\`${q.id}\`)\n`;
      weekIndexMd += `> [!question] Enunciado\n`;
      weekIndexMd += `> ${q.text.replace(/\n/g, '\n> ')}\n\n`;

      weekIndexMd += `**Opciones:**\n`;
      if (Array.isArray(q.options)) {
        q.options.forEach((opt, oIdx) => {
          const letter = optionLetters[oIdx] || `${oIdx + 1}`;
          const isCorrect = oIdx === q.correctOptionIndex;
          if (isCorrect) {
            weekIndexMd += `- **[x] ${letter})** ${opt} *(Correcta)*\n`;
          } else {
            weekIndexMd += `- [ ] **${letter})** ${opt}\n`;
          }
        });
      }
      weekIndexMd += `\n`;

      if (q.explanation) {
        weekIndexMd += `> [!tip] 💡 Justificación Clínica\n`;
        weekIndexMd += `> **Respuesta:** \`${correctLetter}) ${correctText}\`\n>\n`;
        weekIndexMd += `> ${q.explanation.replace(/\n/g, '\n> ')}\n\n`;
      }

      if (q.pagina) {
        weekIndexMd += `> [!quote] 📖 Referencia\n> ${q.pagina}\n\n`;
      }

      weekIndexMd += `---\n\n`;
      qCountAll++;
    }
  }

  fs.writeFileSync(path.join(weekPath, `📜 Índice - Semana ${padNum}.md`), weekIndexMd, 'utf-8');
}

// 3. Generate Master Index Note at Vault Root
let masterIndexMd = `---
type: indice_general
tags:
  - IndiceGeneral
  - CONAREM
  - BancoDePreguntas
---

# 🏥 Banco de Preguntas CONAREM - Organización por Semanas

Repositorio de estudio clasificado cronológicamente por **Semanas (1 a 16)** y estructurado internamente por **Temas y Subtemas Clínicos**.

---

## 📊 Balance General

- **Total de Semanas:** \`16 Semanas\`
- **Total de Preguntas:** \`${globalTotal} preguntas\`
- **Especialidades:** Pediatría, Medicina Interna, Cirugía General y Ginecología & Obstetricia.

---

## 📂 Navegación Cronológica por Semanas

| Semana | Especialidad | Tema Principal | Subtemas | Preguntas | Enlace al Bloque |
| :---: | :--- | :--- | :---: | :---: | :--- |
`;

for (const ws of weeklySummary) {
  const padNum = String(ws.num).padStart(2, '0');
  masterIndexMd += `| **Semana ${padNum}** | \`${ws.materia}\` | ${ws.title} | \`${ws.subCount}\` | \`${ws.count}\` | [[${ws.folder}/📜 Índice - Semana ${padNum}\\|Semana ${padNum}: ${ws.title} ➔]] |\n`;
}

masterIndexMd += `| **TOTAL** | - | **16 Módulos** | - | **\`${globalTotal}\`** | - |\n\n`;

masterIndexMd += `---

## 🩺 Distribución por Especialidad Médica

### 👶 Pediatría (338 preguntas)
- [[Semana 01 - Neonatología (Pediatría)/📜 Índice - Semana 01|Semana 01 - Neonatología (43 preguntas)]]
- [[Semana 05 - Nutrición y Antropometría (Pediatría)/📜 Índice - Semana 05|Semana 05 - Nutrición y Antropometría (55 preguntas)]]
- [[Semana 09 - Crecimiento, Desarrollo y Vacunas (Pediatría)/📜 Índice - Semana 09|Semana 09 - Crecimiento, Desarrollo y Vacunas (139 preguntas)]]
- [[Semana 13 - Urgencias, Emergencias y RCP (Pediatría)/📜 Índice - Semana 13|Semana 13 - Urgencias, Emergencias y RCP (101 preguntas)]]

### 🩺 Medicina Interna (599 preguntas)
- [[Semana 02 - Endocrinología (Medicina Interna)/📜 Índice - Semana 02|Semana 02 - Endocrinología (109 preguntas)]]
- [[Semana 06 - Oncohematología y Cuidados Críticos (Medicina Interna)/📜 Índice - Semana 06|Semana 06 - Oncohematología y Cuidados Críticos (94 preguntas)]]
- [[Semana 10 - Cardiología (Medicina Interna)/📜 Índice - Semana 10|Semana 10 - Cardiología (102 preguntas)]]
- [[Semana 14 - Neumología y Reumatología (Medicina Interna)/📜 Índice - Semana 14|Semana 14 - Neumología y Reumatología (294 preguntas)]]

### 🔪 Cirugía General (293 preguntas)
- [[Semana 03 - Infecciones, Cicatrización y Piel (Cirugía General)/📜 Índice - Semana 03|Semana 03 - Infecciones, Cicatrización y Piel (43 preguntas)]]
- [[Semana 07 - Traumatismos y Quemaduras (Cirugía General)/📜 Índice - Semana 07|Semana 07 - Traumatismos y Quemaduras (82 preguntas)]]
- [[Semana 11 - Cirugía Digestiva, Esófago y Estómago (Cirugía)/📜 Índice - Semana 11|Semana 11 - Cirugía Digestiva, Esófago y Estómago (59 preguntas)]]
- [[Semana 15 - Tórax, Pulmón, Mediastino y Mamas (Cirugía)/📜 Índice - Semana 15|Semana 15 - Tórax, Pulmón, Mediastino y Mamas (109 preguntas)]]

### 🤰 Ginecología y Obstetricia (277 preguntas)
- [[Semana 04 - Anatomía y Prolapsos (Ginecología y Obstetricia)/📜 Índice - Semana 04|Semana 04 - Anatomía y Prolapsos (38 preguntas)]]
- [[Semana 08 - Endocrinología Reproductiva e Infecciones (Ginecología)/📜 Índice - Semana 08|Semana 08 - Endocrinología Reproductiva e Infecciones (104 preguntas)]]
- [[Semana 12 - Amenorrea, Anticonceptivos y Menopausia (Ginecología)/📜 Índice - Semana 12|Semana 12 - Amenorrea, Anticonceptivos y Menopausia (80 preguntas)]]
- [[Semana 16 - SOP, Hemorragia Uterina e Infertilidad (Ginecología)/📜 Índice - Semana 16|Semana 16 - SOP, Hemorragia Uterina e Infertilidad (55 preguntas)]]

`;

fs.writeFileSync(path.join(vaultDir, '00 - 🏠 Inicio & Índice General.md'), masterIndexMd, 'utf-8');

console.log(`\n==========================================================`);
console.log(` Baúl Organizado por Semanas creado exitosamente en:`);
console.log(` ${vaultDir}`);
console.log(` Total de Semanas: 16`);
console.log(` Total de Preguntas: ${globalTotal}`);
console.log(`==========================================================\n`);
