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
    default:
      throw new Error(`Semana sin taxonomía: ${question.semana} (${question.id})`);
  }
}

function resolveSubtopic(question: Question, topicId: string): string {
  const info = analyzeSubtema(question.subtema, question.materia, question.semana, question.text, question.id);
  const raw = normalized(`${question.tema} ${question.subtema} ${question.docx_tema || ''} ${info.grupo}`);
  const questionText = normalized(question.text);

  if (topicId === 'cir-toracica') {
    if (questionText.includes('mediastin') || questionText.includes('timoma') || questionText.includes('vaina del nervio') || questionText.includes('celulas ganglionares')) return 'Mediastino';
    if (questionText.includes('pleura') || questionText.includes('derrame') || questionText.includes('quilotórax') || questionText.includes('quilotórax')) return 'Pleura';
    if (raw.includes('mediastin') && !raw.includes('pleura')) return 'Mediastino';
    if (raw.includes('pleura') && !raw.includes('mediastin')) return 'Pleura';
    if (raw.includes('pared toracica') || raw.includes('pared torácica')) return 'Pared torácica';
    return 'Pulmón';
  }

  const broadTopicIds = new Set([
    'ped-neonatologia', 'mi-endocrinologia', 'mi-oncohematologia', 'mi-cuidados-criticos',
    'mi-cardiologia', 'mi-neumologia', 'mi-reumatologia', 'ped-urgencias',
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
