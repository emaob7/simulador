import type { Materia, Question } from '../types';

export interface WeekCatalogEntry {
  week: number;
  count: number;
  materia: Materia;
  title: string;
  folderName: string;
}

export const WEEK_CATALOG: readonly WeekCatalogEntry[] = [
  { week: 1, count: 121, materia: 'Pediatría', title: 'Neonatología', folderName: 'Semana 01 - Neonatología (Pediatría)' },
  { week: 2, count: 109, materia: 'Medicina Interna', title: 'Endocrinología', folderName: 'Semana 02 - Endocrinología (Medicina Interna)' },
  { week: 3, count: 84, materia: 'Cirugía', title: 'Infecciones, cicatrización y piel', folderName: 'Semana 03 - Infecciones, Cicatrización y Piel (Cirugía General)' },
  { week: 4, count: 74, materia: 'Ginecología y Obstetricia', title: 'Anatomía, trastornos del desarrollo y prolapsos', folderName: 'Semana 04 - Anatomía y Prolapsos (Ginecología y Obstetricia)' },
  { week: 5, count: 95, materia: 'Pediatría', title: 'Nutrición y antropometría', folderName: 'Semana 05 - Nutrición y Antropometría (Pediatría)' },
  { week: 6, count: 94, materia: 'Medicina Interna', title: 'Oncohematología y cuidados críticos', folderName: 'Semana 06 - Oncohematología y Cuidados Críticos (Medicina Interna)' },
  { week: 7, count: 82, materia: 'Cirugía', title: 'Traumatismos y quemaduras', folderName: 'Semana 07 - Traumatismos y Quemaduras (Cirugía General)' },
  { week: 8, count: 104, materia: 'Ginecología y Obstetricia', title: 'Endocrinología reproductiva, infecciones y dolor pélvico', folderName: 'Semana 08 - Endocrinología Reproductiva e Infecciones (Ginecología)' },
  { week: 9, count: 139, materia: 'Pediatría', title: 'Crecimiento, desarrollo y vacunas', folderName: 'Semana 09 - Crecimiento, Desarrollo y Vacunas (Pediatría)' },
  { week: 10, count: 141, materia: 'Medicina Interna', title: 'Cardiología', folderName: 'Semana 10 - Cardiología (Medicina Interna)' },
  { week: 11, count: 106, materia: 'Cirugía', title: 'Esófago y estómago', folderName: 'Semana 11 - Cirugía Digestiva, Esófago y Estómago (Cirugía)' },
  { week: 12, count: 80, materia: 'Ginecología y Obstetricia', title: 'Amenorrea, anticonceptivos y menopausia', folderName: 'Semana 12 - Amenorrea, Anticonceptivos y Menopausia (Ginecología)' },
  { week: 13, count: 101, materia: 'Pediatría', title: 'Urgencias, emergencias y RCP', folderName: 'Semana 13 - Urgencias, Emergencias y RCP (Pediatría)' },
  { week: 14, count: 294, materia: 'Medicina Interna', title: 'Neumología y reumatología', folderName: 'Semana 14 - Neumología y Reumatología (Medicina Interna)' },
  { week: 15, count: 109, materia: 'Cirugía', title: 'Tórax, pulmón, mediastino y mamas', folderName: 'Semana 15 - Tórax, Pulmón, Mediastino y Mamas (Cirugía)' },
  { week: 16, count: 99, materia: 'Ginecología y Obstetricia', title: 'SOP, sangrado uterino, patología uterina y endometriosis', folderName: 'Semana 16 - SOP, Hemorragia Uterina e Infertilidad (Ginecología)' },
  { week: 17, count: 303, materia: 'Pediatría', title: 'Infectología', folderName: 'Semana 17 - Infectología (Pediatría)' },
  { week: 18, count: 207, materia: 'Medicina Interna', title: 'Nefrología y neurología', folderName: 'Semana 18 - Nefrología y Neurología (Medicina Interna)' },
  { week: 19, count: 107, materia: 'Cirugía', title: 'Hígado, vesícula biliar y vías biliares extrahepáticas', folderName: 'Semana 19 - Hígado, Vesícula y Vías Biliares (Cirugía)' },
  { week: 20, count: 169, materia: 'Ginecología y Obstetricia', title: 'Fisiología materna, embriogénesis, placenta y diagnóstico prenatal', folderName: 'Semana 20 - Fisiología Materna, Placenta y Diagnóstico Prenatal (Ginecología)' },
  { week: 21, count: 76, materia: 'Pediatría', title: 'Manual AIEPI y Atención Neonatal/Infantil', folderName: 'Semana 21 - Manual AIEPI (Pediatría)' },
] as const;

export const TOTAL_QUESTIONS = WEEK_CATALOG.reduce((total, entry) => total + entry.count, 0);

type QuestionModule = Record<string, Question[]>;
type WeekLoader = () => Promise<QuestionModule>;

const weekLoaders: Record<number, WeekLoader> = {
  1: () => import('./semana1/questions'), 2: () => import('./semana2/questions'),
  3: () => import('./semana3/questions'), 4: () => import('./semana4/questions'),
  5: () => import('./semana5/questions'), 6: () => import('./semana6/questions'),
  7: () => import('./semana7/questions'), 8: () => import('./semana8/questions'),
  9: () => import('./semana9/questions'), 10: () => import('./semana10/questions'),
  11: () => import('./semana11/questions'), 12: () => import('./semana12/questions'),
  13: () => import('./semana13/questions'), 14: () => import('./semana14/questions'),
  15: () => import('./semana15/questions'), 16: () => import('./semana16/questions'),
  17: () => import('./semana17/questions'), 18: () => import('./semana18/questions'),
  19: () => import('./semana19/questions'), 20: () => import('./semana20/questions'),
  21: () => import('./semana21/questions'),
};

const questionCache = new Map<number, Promise<Question[]>>();

export function getWeekDefinition(week: number): WeekCatalogEntry | undefined {
  return WEEK_CATALOG.find(entry => entry.week === week);
}

export function loadWeekQuestions(week: number): Promise<Question[]> {
  const definition = getWeekDefinition(week);
  const loader = weekLoaders[week];
  if (!definition || !loader) return Promise.reject(new Error(`Semana ${week} no registrada en el catálogo.`));
  let cached = questionCache.get(week);
  if (!cached) {
    cached = loader().then(module => {
      const questions = module[`questionsSemana${week}`];
      if (!Array.isArray(questions)) throw new Error(`Semana ${week}: export questionsSemana${week} ausente.`);
      if (questions.length !== definition.count) {
        throw new Error(`Semana ${week}: ${questions.length} preguntas; catálogo espera ${definition.count}.`);
      }
      return questions;
    });
    questionCache.set(week, cached);
  }
  return cached;
}

export async function loadWeeksQuestions(weeks: readonly number[]): Promise<Question[]> {
  const uniqueWeeks = [...new Set(weeks)].sort((left, right) => left - right);
  return (await Promise.all(uniqueWeeks.map(loadWeekQuestions))).flat();
}

export function loadAllQuestions(): Promise<Question[]> {
  return loadWeeksQuestions(WEEK_CATALOG.map(entry => entry.week));
}
