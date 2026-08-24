import type { Materia, Question } from '../types';
import { analyzeSubtema } from './normalizer';

export interface StudySubjectDefinition {
  id: string;
  materia: Materia;
  label: string;
  topicIds: string[];
}

export interface StudyTopicDefinition {
  id: string;
  materia: Materia;
  label: string;
}

export interface StudyClassification {
  subjectId: string;
  topicId: string;
  topicLabel: string;
  subtopicLabel: string;
}

const topics: StudyTopicDefinition[] = [
  { id: 'ped-neonatologia', materia: 'Pediatría', label: 'Neonatología' },
  { id: 'ped-nutricion', materia: 'Pediatría', label: 'Nutrición' },
  { id: 'ped-desnutricion-antropometria', materia: 'Pediatría', label: 'Desnutrición y Antropometría' },
  { id: 'ped-vacunas', materia: 'Pediatría', label: 'Vacunas' },
  { id: 'ped-crecimiento-desarrollo', materia: 'Pediatría', label: 'Crecimiento y Desarrollo' },
  { id: 'ped-urgencias', materia: 'Pediatría', label: 'Urgencias Pediátricas' },
  { id: 'ped-infectologia', materia: 'Pediatría', label: 'Infectología' },

  { id: 'mi-endocrinologia', materia: 'Medicina Interna', label: 'Endocrinología' },
  { id: 'mi-oncohematologia', materia: 'Medicina Interna', label: 'Oncohematología' },
  { id: 'mi-cuidados-criticos', materia: 'Medicina Interna', label: 'Cuidados Críticos' },
  { id: 'mi-cardiologia', materia: 'Medicina Interna', label: 'Cardiología' },
  { id: 'mi-neumologia', materia: 'Medicina Interna', label: 'Neumología' },
  { id: 'mi-reumatologia', materia: 'Medicina Interna', label: 'Reumatología' },

  { id: 'cir-infecciones', materia: 'Cirugía', label: 'Infecciones' },
  { id: 'cir-cicatrizacion', materia: 'Cirugía', label: 'Cicatrización' },
  { id: 'cir-piel', materia: 'Cirugía', label: 'Piel' },
  { id: 'cir-traumatismos', materia: 'Cirugía', label: 'Traumatismos' },
  { id: 'cir-quemaduras', materia: 'Cirugía', label: 'Quemaduras' },
  { id: 'cir-esofago', materia: 'Cirugía', label: 'Esófago' },
  { id: 'cir-estomago', materia: 'Cirugía', label: 'Estómago' },
  { id: 'cir-toracica', materia: 'Cirugía', label: 'Cirugía Torácica' },
  { id: 'cir-mamas', materia: 'Cirugía', label: 'Mamas' },

  { id: 'gyo-anatomia', materia: 'Ginecología y Obstetricia', label: 'Anatomía' },
  { id: 'gyo-trastornos-desarrollo', materia: 'Ginecología y Obstetricia', label: 'Trastornos anatómicos y del desarrollo' },
  { id: 'gyo-prolapso', materia: 'Ginecología y Obstetricia', label: 'Prolapso de órganos pélvicos' },
  { id: 'gyo-reproduccion', materia: 'Ginecología y Obstetricia', label: 'Endocrinología de la reproducción' },
  { id: 'gyo-infecciones', materia: 'Ginecología y Obstetricia', label: 'Infecciones ginecológicas' },
  { id: 'gyo-dolor-pelvico', materia: 'Ginecología y Obstetricia', label: 'Dolor pélvico crónico' },
  { id: 'gyo-amenorreas', materia: 'Ginecología y Obstetricia', label: 'Amenorreas' },
  { id: 'gyo-anticonceptivos', materia: 'Ginecología y Obstetricia', label: 'Anticonceptivos' },
  { id: 'gyo-menopausia', materia: 'Ginecología y Obstetricia', label: 'Menopausia' },
  { id: 'gyo-sop', materia: 'Ginecología y Obstetricia', label: 'Síndrome de Ovarios Poliquísticos' },
  { id: 'gyo-sua', materia: 'Ginecología y Obstetricia', label: 'Sangrado Uterino Anormal' },
  { id: 'gyo-patologia-uterina', materia: 'Ginecología y Obstetricia', label: 'Patología Uterina Benigna' },
  { id: 'gyo-endometriosis', materia: 'Ginecología y Obstetricia', label: 'Endometriosis' },
];

export const STUDY_TOPICS = topics;

export const STUDY_SUBJECTS: StudySubjectDefinition[] = [
  { id: 'pediatria', materia: 'Pediatría', label: 'Pediatría', topicIds: topics.filter(topic => topic.materia === 'Pediatría').map(topic => topic.id) },
  { id: 'medicina-interna', materia: 'Medicina Interna', label: 'Medicina Interna', topicIds: topics.filter(topic => topic.materia === 'Medicina Interna').map(topic => topic.id) },
  { id: 'cirugia', materia: 'Cirugía', label: 'Cirugía', topicIds: topics.filter(topic => topic.materia === 'Cirugía').map(topic => topic.id) },
  { id: 'ginecologia-obstetricia', materia: 'Ginecología y Obstetricia', label: 'Ginecología y Obstetricia', topicIds: topics.filter(topic => topic.materia === 'Ginecología y Obstetricia').map(topic => topic.id) },
];

const topicById = new Map(topics.map(topic => [topic.id, topic]));
const subjectByMateria = new Map(STUDY_SUBJECTS.map(subject => [subject.materia, subject]));

function normalized(value?: string): string {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function resolveTopicId(question: Question): string {
  const tema = normalized(question.tema);
  const subtema = normalized(question.subtema);
  const docxTema = normalized(question.docx_tema);
  const group = normalized(analyzeSubtema(question.subtema, question.materia, question.semana, question.text, question.id).grupo);

  switch (question.semana) {
    case 1: return 'ped-neonatologia';
    case 2: return 'mi-endocrinologia';
    case 3:
      if (tema.includes('cicatriz')) return 'cir-cicatrizacion';
      if (tema.includes('infecc') || tema.includes('sirs') || tema.includes('sepsis')) return 'cir-infecciones';
      return 'cir-piel';
    case 4:
      if (tema.includes('prolapso') || subtema.includes('prolapso') || subtema.includes('pop-q')) return 'gyo-prolapso';
      if (tema.includes('trastorno') || tema.includes('anomalia') || tema.includes('anomalía') || group.includes('diferenciacion') || group.includes('embriologia')) return 'gyo-trastornos-desarrollo';
      return 'gyo-anatomia';
    case 5:
      if (
        group.includes('desnutricion') ||
        group.includes('crecimiento y desarrollo') ||
        subtema.includes('antropometr') ||
        docxTema.includes('antropometr') ||
        docxTema.includes('patrones de crecimiento')
      ) return 'ped-desnutricion-antropometria';
      return 'ped-nutricion';
    case 6:
      return tema.includes('cuidados criticos') || group.includes('cuidados criticos') ? 'mi-cuidados-criticos' : 'mi-oncohematologia';
    case 7:
      return group.includes('quemadura') || subtema.includes('quemadura') || subtema.includes('inhalacion') ? 'cir-quemaduras' : 'cir-traumatismos';
    case 8:
      if (tema.includes('infecciones')) return 'gyo-infecciones';
      if (tema.includes('dolor pelvico')) return 'gyo-dolor-pelvico';
      return 'gyo-reproduccion';
    case 9:
      return tema.includes('vacuna') || group.includes('inmuniza') ? 'ped-vacunas' : 'ped-crecimiento-desarrollo';
    case 10: return 'mi-cardiologia';
    case 11:
      if (/^semana11_cirugia_q(?:26|27|28|29|30)$/.test(question.id)) return 'cir-estomago';
      return tema.includes('estomago') ? 'cir-estomago' : 'cir-esofago';
    case 12:
      if (group.includes('anticoncept')) return 'gyo-anticonceptivos';
      if (group.includes('menopaus') || group.includes('climaterio')) return 'gyo-menopausia';
      return 'gyo-amenorreas';
    case 13: return 'ped-urgencias';
    case 14:
      return group.includes('reumatologia') ? 'mi-reumatologia' : 'mi-neumologia';
    case 15:
      return tema.includes('mamas') ? 'cir-mamas' : 'cir-toracica';
    case 16:
      if (tema.includes('endometriosis')) return 'gyo-endometriosis';
      if (tema.includes('poliqu')) return 'gyo-sop';
      if (tema.includes('sangrado')) return 'gyo-sua';
      return 'gyo-patologia-uterina';
    case 17: return 'ped-infectologia';
    default:
      throw new Error(`Semana sin taxonomía: ${question.semana} (${question.id})`);
  }
}

function questionNumber(question: Question, pattern: RegExp): number | null {
  const match = question.id.match(pattern);
  return match ? Number(match[1]) : null;
}

function isNumberIn(number: number | null, values: number[]): boolean {
  return number !== null && values.includes(number);
}

function isNumberBetween(number: number | null, start: number, end: number): boolean {
  return number !== null && number >= start && number <= end;
}

function resolveNeonatologySubtopic(question: Question, info: ReturnType<typeof analyzeSubtema>): string {
  const infectionOverrides = new Set(['neo_docx_q1', 'neo_docx_q74', 'neo_docx_q75', 'neo_docx_q77']);
  const traumaOverrides = new Set(['neo_docx_q24', 'neo_docx_q25', 'neo_docx_q26']);
  if (infectionOverrides.has(question.id)) return 'Infecciones Neonatales';
  if (traumaOverrides.has(question.id)) return 'Trauma Obstétrico y Neurología';
  if (question.id === 'neo_docx_q60') return 'Patología Digestiva y Quirúrgica';

  if (normalized(info.grupo).includes('respiratoria y cardiovascular')) {
    const source = normalized(`${info.normalizado} ${question.subtema} ${question.text}`);
    if (/ductus|cardiovascular|cardiopatia|soplo|circulacion/.test(source)) return 'Patología Cardiovascular Neonatal';
    return 'Patología Respiratoria Neonatal';
  }
  return info.grupo;
}

function resolvePediatricNutritionSubtopic(question: Question, topicId: string): string {
  const source = normalized(question.subtema);
  if (topicId === 'ped-nutricion') {
    if (/lactancia|leche materna|ictericia/.test(source)) return 'Lactancia Materna e Ictericia Asociada';
    if (/guia alimentaria|guias alimentarias|paraguay/.test(source)) return 'Guías Alimentarias del Paraguay';
    if (/obesidad/.test(source)) return 'Obesidad Pediátrica';
    if (/vitamina|micronutriente|carencial|hierro|zinc|folato|escorbuto|raquitismo/.test(source)) return 'Deficiencias de Micronutrientes';
    return 'Requerimientos y Alimentación Complementaria';
  }

  if (/realimentacion/.test(source)) return 'Síndrome de Realimentación';
  if (/prematur|peso al nacer/.test(source)) return 'Evaluación y Clasificación del Prematuro';
  if (/antropometr|curva|percentil|puntaje z|indice de masa/.test(source)) return 'Evaluación Antropométrica y Curvas de Crecimiento';
  return 'Desnutrición Infantil: Clasificación y Manejo';
}

function resolveWeek9Subtopic(question: Question, topicId: string): string {
  if (topicId === 'ped-crecimiento-desarrollo') {
    const number = questionNumber(question, /^semana9_crec_q(\d+)$/);
    if (isNumberBetween(number, 1, 5)) return 'Desarrollo Fetal y Maduración Sensorial';
    if (isNumberIn(number, [6, 7, 8, 9, 28, 29])) return 'Crecimiento Somático y Neurodesarrollo Temprano';
    if (isNumberBetween(number, 10, 27) || isNumberBetween(number, 30, 49)) return 'Hitos del Lactante (0–12 meses)';
    if (isNumberBetween(number, 50, 53)) return 'Llanto, Cólico y Autorregulación';
    if (isNumberBetween(number, 54, 69)) return 'Desarrollo del Niño Pequeño (12–24 meses)';
    if (isNumberBetween(number, 70, 80)) return 'Desarrollo Preescolar';
    if (isNumberBetween(number, 81, 85)) return 'Crecimiento y Desarrollo en la Edad Escolar';
    if (isNumberBetween(number, 86, 88)) return 'Dentición y Desarrollo Dental';
    return 'Pubertad y Estadios de Tanner';
  }

  const number = questionNumber(question, /^semana9_vac_q(\d+)$/);
  if (isNumberIn(number, [1, 2, 3, 4, 5, 45, 46])) return 'Esquema PAI Paraguay y Administración';
  if (isNumberIn(number, [6, 7, 12, 32, 33, 34, 35])) return 'Fundamentos, Intervalos, ESAVI y Anafilaxia';
  if (isNumberIn(number, [8, 9, 10, 11, 24, 25, 26, 27, 28, 36])) return 'Situaciones Especiales, Contraindicaciones y Grupos de Riesgo';
  if (isNumberIn(number, [13, 37, 38, 39])) return 'Vacunación contra Hepatitis B Perinatal';
  if (isNumberIn(number, [14, 15, 16, 44])) return 'Vacunas BCG y Rotavirus';
  if (isNumberBetween(number, 17, 23)) return 'Vacunas Hexavalente, DPT, Td y dTpa';
  if (isNumberBetween(number, 29, 31)) return 'Inmunodeficiencias Primarias';
  return 'Vacunación contra el VPH';
}

function resolveCriticalCareSubtopic(question: Question): string {
  const number = questionNumber(question, /^semana6_med_q(\d+)$/);
  if (isNumberIn(number, [2, 5, 17, 78])) return 'Insuficiencia Respiratoria Aguda y SDRA';
  if (isNumberIn(number, [14, 27, 28, 80, 81, 82])) return 'Choque Cardiógeno, Edema Pulmonar y Paro Cardíaco';
  if (isNumberIn(number, [76, 77, 83, 84])) return 'Cuidados Generales, Coma y Neurointensivismo';
  return 'Sepsis, Tipos de Choque y Hemodinamia';
}

function resolveSurgeryWeek3Subtopic(question: Question, topicId: string): string {
  const source = normalized(`${question.subtema} ${question.text}`);
  if (topicId === 'cir-cicatrizacion') {
    const number = questionNumber(question, /^q(\d+)_s3$/);
    if (isNumberIn(number, [23, 24, 25])) return 'Trastornos Hereditarios del Tejido Conectivo';
    if (number === 26) return 'Cicatrización Ósea';
    if (number === 27) return 'Tipos de Cicatrización y Cierre de Heridas';
    if (isNumberIn(number, [28, 29])) return 'Heridas Crónicas y Pie Diabético';
    if (number === 30) return 'Cicatriz Hipertrófica y Queloide';
    return 'Biología y Fases de la Cicatrización';
  }

  if (topicId === 'cir-infecciones') {
    const sirsIds = new Set(['q13_s3', 'q19_s3', 'q31_s3', 'cx_s3_q44', 'cx_s3_q45', 'cx_s3_q46']);
    const necrotizingIds = new Set(['q17_s3', 'q35_s3', 'cx_s3_q57', 'cx_s3_q58', 'cx_s3_q59', 'cx_s3_q60']);
    const surgicalSiteIds = new Set(['q12_s3', 'q16_s3', 'q32_s3', 'cx_s3_q49', 'cx_s3_q50', 'cx_s3_q51']);
    const intraabdominalIds = new Set(['q18_s3', 'q20_s3', 'q33_s3', 'q34_s3', 'cx_s3_q52', 'cx_s3_q53', 'cx_s3_q54', 'cx_s3_q55', 'cx_s3_q56']);
    if (sirsIds.has(question.id)) return 'SIRS, Sepsis y Choque Séptico';
    if (necrotizingIds.has(question.id)) return 'Infecciones Necrosantes de Tejidos Blandos';
    if (surgicalSiteIds.has(question.id)) return 'Infección del Sitio Quirúrgico y Profilaxis';
    if (intraabdominalIds.has(question.id)) return 'Infecciones Intraabdominales y Peritonitis';
    return 'Principios de Antibioticoterapia y Control del Foco';
  }

  if (question.id === 'q3_s3') return 'Tumores Cutáneos';
  if (/hidradenitis/.test(source)) return 'Hidradenitis Supurativa';
  if (/stevens|johnson|necrolisis|ten\b/.test(source)) return 'Síndrome de Stevens-Johnson y Necrólisis Epidérmica';
  if (/carcinoma|melanoma|sarcoma|tumor|kaposi/.test(source)) return 'Tumores Cutáneos';
  if (/infeccion|mordedura|actinomicosis/.test(source)) return 'Infecciones Cutáneas y Heridas por Mordedura';
  if (/ulcera por presion|presion/.test(source)) return 'Úlceras por Presión';
  if (/radiacion|ultravioleta|solar/.test(source)) return 'Lesiones Cutáneas por Radiación';
  if (/caustic|quimic|termic|extravasacion/.test(source)) return 'Lesiones Químicas, Térmicas y por Extravasación';
  return 'Anatomía e Histología de la Piel';
}

function resolveTraumaSubtopic(question: Question): string {
  const number = questionNumber(question, /^semana7_cir_q(\d+)$/);
  if (isNumberIn(number, [1, 2, 3, 53, 54])) return 'Evaluación Inicial, ATLS y Vía Aérea';
  if (isNumberIn(number, [4, 5, 7, 8, 9, 10, 55, 57, 58])) return 'Trauma Torácico';
  if (isNumberIn(number, [6, 12, 13, 14, 15, 56, 59, 61])) return 'Choque, Reanimación y Control de Hemorragia';
  if (isNumberIn(number, [11, 60, 72])) return 'Traumatismo Craneoencefálico';
  if (isNumberIn(number, [28, 29, 66])) return 'Trauma Vascular y de Extremidades';
  if (number === 71) return 'Trauma Penetrante de Cuello';
  return 'Trauma Abdominal y Pélvico';
}

function resolveBurnSubtopic(question: Question): string {
  const number = questionNumber(question, /^semana7_cir_q(\d+)$/);
  if (isNumberIn(number, [36, 37, 46, 47, 73, 74, 75, 76])) return 'Extensión y Profundidad de las Quemaduras';
  if (isNumberIn(number, [38, 40])) return 'Quemaduras Eléctricas';
  if (isNumberIn(number, [39, 42, 43, 44, 45])) return 'Quemaduras Químicas';
  if (number === 41) return 'Quemaduras Térmicas';
  if (isNumberIn(number, [48, 49, 77, 79])) return 'Reanimación Hídrica del Paciente Quemado';
  if (isNumberIn(number, [50, 51, 78, 81, 82])) return 'Lesión por Inhalación, Monóxido de Carbono y Cianuro';
  return 'Tratamiento Tópico de las Quemaduras';
}

function resolveDigestiveSurgerySubtopic(question: Question, topicId: string): string {
  const source = normalized(`${question.subtema} ${question.text}`);
  if (topicId === 'cir-esofago') {
    if (question.id === 'semana11_cirugia_q43') return 'ERGE, Barrett y Cirugía Antirreflujo';
    if (['semana11_cirugia_q50', 'semana11_cirugia_q59'].includes(question.id)) return 'Anatomía, Fisiología y Diagnóstico Esofágico';
    if (/cancer|carcinoma|tumor/.test(source)) return 'Cáncer de Esófago';
    if (/caustic|perforacion/.test(source)) return 'Lesiones Cáusticas y Perforación Esofágica';
    if (/hernia|schatzki|anillo/.test(source)) return 'Hernia Hiatal y Anillos Esofágicos';
    if (/acalasia|motilidad|espasmo|diverticulo|disfagia/.test(source)) return 'Trastornos de Motilidad y Divertículos';
    if (/esofagitis eosinofilica|esclerodermia/.test(source)) return 'Esofagitis y Esclerodermia Esofágica';
    if (/reflujo|erge|barrett|funduplicatura|nissen|toupet|antirreflujo/.test(source)) return 'ERGE, Barrett y Cirugía Antirreflujo';
    return 'Anatomía, Fisiología y Diagnóstico Esofágico';
  }

  const stomachOverrides: Record<string, string> = {
    'semana11_cirugia_q19': 'Enfermedad Ulcerosa Péptica y sus Complicaciones',
    'semana11_cirugia_q29': 'Gastritis y Otras Patologías Benignas',
    'cx_estomago_q73': 'Diagnóstico de la Enfermedad Gástrica',
    'cx_estomago_q74': 'Enfermedad Ulcerosa Péptica y sus Complicaciones',
    'cx_estomago_q84': 'Enfermedad Ulcerosa Péptica y sus Complicaciones',
    'cx_estomago_q86': 'Enfermedad Ulcerosa Péptica y sus Complicaciones',
    'cx_estomago_q92': 'Gastritis y Otras Patologías Benignas',
    'cx_estomago_q98': 'Tumores Gástricos',
    'cx_estomago_q99': 'Gastritis y Otras Patologías Benignas',
    'cx_estomago_q101': 'Gastritis y Otras Patologías Benignas',
    'cx_estomago_q102': 'Gastritis y Otras Patologías Benignas',
    'cx_estomago_q104': 'Síndromes Posgastrectomía',
    'cx_estomago_q106': 'Síndromes Posgastrectomía',
  };
  if (stomachOverrides[question.id]) return stomachOverrides[question.id];

  if (/dumping|posgastrect|postgastrect|diarrea posquirurg|reflujo biliar/.test(source)) return 'Síndromes Posgastrectomía';
  if (/adenocarcinoma|cancer gastrico|linfoma gastrico|tumor neuroendocrino/.test(source)) return 'Tumores Gástricos';
  if (/ulcera|helicobacter|zollinger|dieulafoy|mallory|hemorrag|varices/.test(source)) return 'Enfermedad Ulcerosa Péptica y sus Complicaciones';
  if (/gastritis|menetrier|volvulo|benigna/.test(source)) return 'Gastritis y Otras Patologías Benignas';
  if (/diagnost|endoscop|ecografia|escintigraf|bario/.test(source)) return 'Diagnóstico de la Enfermedad Gástrica';
  return 'Anatomía y Fisiología Gástrica';
}

function resolvePelvicPainSubtopic(question: Question): string {
  const number = questionNumber(question, /^semana8_dolor_q(\d+)$/);
  if (isNumberIn(number, [1, 2])) return 'Dolor Musculoesquelético y Dolor Referido';
  if (isNumberIn(number, [3, 8])) return 'Adherencias Pélvicas';
  if (isNumberIn(number, [4, 9])) return 'Síndrome de Remanente Ovárico';
  if (isNumberBetween(number, 5, 7) || isNumberBetween(number, 10, 12)) return 'Síndrome de Congestión Pélvica';
  if (number === 13) return 'Síndrome de Intestino Irritable';
  return 'Cistitis Intersticial y Síndrome de Dolor Vesical';
}

function resolveSubtopic(question: Question, topicId: string): string {
  const info = analyzeSubtema(question.subtema, question.materia, question.semana, question.text, question.id);
  const raw = normalized(`${question.tema} ${question.subtema} ${question.docx_tema || ''} ${info.grupo}`);
  const questionText = normalized(question.text);

  if (topicId === 'ped-neonatologia') return resolveNeonatologySubtopic(question, info);
  if (topicId === 'ped-nutricion' || topicId === 'ped-desnutricion-antropometria') return resolvePediatricNutritionSubtopic(question, topicId);
  if (topicId === 'ped-vacunas' || topicId === 'ped-crecimiento-desarrollo') return resolveWeek9Subtopic(question, topicId);
  if (topicId === 'ped-urgencias') return question.subtema.trim();
  if (topicId === 'ped-infectologia') return info.grupo || question.subtema.trim();
  if (topicId === 'mi-endocrinologia' && question.id === 'q45') return 'Hipotálamo e Hipófisis';
  if (topicId === 'mi-oncohematologia') {
    if (question.id === 'semana6_med_q58') return 'Anemias Hemolíticas y HPN';
    return question.subtema.trim();
  }
  if (topicId === 'mi-cuidados-criticos') return resolveCriticalCareSubtopic(question);
  if (topicId === 'mi-cardiologia' && ['mi_cardio_w_q124', 'mi_cardio_w_q128'].includes(question.id)) return 'Enfermedades Arteriales y Vasculares Periféricas';
  if (topicId === 'mi-neumologia' || topicId === 'mi-reumatologia') return question.docx_tema?.trim() || question.subtema.trim();
  if (topicId === 'cir-infecciones' || topicId === 'cir-cicatrizacion' || topicId === 'cir-piel') return resolveSurgeryWeek3Subtopic(question, topicId);
  if (topicId === 'cir-traumatismos') return resolveTraumaSubtopic(question);
  if (topicId === 'cir-quemaduras') return resolveBurnSubtopic(question);
  if (topicId === 'cir-esofago' || topicId === 'cir-estomago') return resolveDigestiveSurgerySubtopic(question, topicId);
  if (topicId === 'gyo-dolor-pelvico') return resolvePelvicPainSubtopic(question);

  if (topicId === 'cir-toracica') {
    if (questionText.includes('traquea') || questionText.includes('traqueal') || questionText.includes('traqueo')) return 'Pulmón';
    if (questionText.includes('mediastin') || questionText.includes('timoma') || questionText.includes('vaina del nervio') || questionText.includes('celulas ganglionares')) return 'Mediastino';
    if (questionText.includes('pleura') || questionText.includes('derrame') || questionText.includes('quilotorax')) return 'Pleura';
    if (raw.includes('mediastin') && !raw.includes('pleura')) return 'Mediastino';
    if (raw.includes('pleura') && !raw.includes('mediastin')) return 'Pleura';
    if (raw.includes('pared toracica') || raw.includes('pared torácica')) return 'Pared torácica';
    return 'Pulmón';
  }

  const broadTopicIds = new Set([
    'mi-endocrinologia', 'mi-cardiologia',
  ]);
  if (broadTopicIds.has(topicId) && info.grupo && normalized(info.grupo) !== 'general') return info.grupo;

  if (question.subtema?.trim()) return question.subtema.trim();
  if (question.docx_tema?.trim()) return question.docx_tema.split('—').pop()?.trim() || question.docx_tema.trim();
  return info.normalizado || 'General';
}

export function classifyQuestionForStudy(question: Question): StudyClassification {
  const topicId = resolveTopicId(question);
  const topic = topicById.get(topicId);
  const subject = subjectByMateria.get(question.materia);
  if (!topic || !subject) throw new Error(`Clasificación inválida para ${question.id}`);
  return {
    subjectId: subject.id,
    topicId,
    topicLabel: topic.label,
    subtopicLabel: resolveSubtopic(question, topicId),
  };
}

export function getTopicDefinition(topicId: string): StudyTopicDefinition | undefined {
  return topicById.get(topicId);
}
