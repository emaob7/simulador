import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import type { Question } from '../src/types';
import { WEEK_CATALOG, loadWeekQuestions } from '../src/data/weekCatalog';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

type QuestionPatch = Partial<Pick<Question, 'text' | 'options' | 'explanation' | 'pagina' | 'subtema'>>;

function replaceAll(value: string, replacements: readonly [string | RegExp, string][]): string {
  return replacements.reduce((current, [pattern, replacement]) => current.replace(pattern as never, replacement), value);
}

function patchCardio(question: Question): QuestionPatch | undefined {
  const replacementsById: Record<string, readonly [string | RegExp, string][]> = {
    mi_cardio_w_q105: [
      [/\bTraducir\b/g, 'Traduce'], [/\btáctil\b/g, 'contráctil'], [/\bcontractual\b/g, 'contráctil'], [/\bLas opciones ayc\b/g, 'Las opciones a y c'],
    ],
    mi_cardio_w_q117: [[/aorta de respetando/g, 'aorta descendente, respetando']],
    mi_cardio_w_q119: [[/cribado ecológico/g, 'cribado ecográfico'], [/se eleva comprimido del/g, 'se eleva aproximadamente del']],
    mi_cardio_w_q120: [
      [/desgarro íntima inicial/g, 'desgarro intimal inicial'], [/asienta combinada/g, 'asienta habitualmente'],
      [/colgajo íntima\b/g, 'colgajo de íntima'], [/cayado oa la/g, 'cayado o a la'],
    ],
    mi_cardio_w_q123: [[/se conoce parcialmente/g, 'se conoce clásicamente'], [/afectado con mayor frecuencia/g, 'afecta con mayor frecuencia']],
    mi_cardio_ic_q139: [[/cambiar la pausa/g, 'cambiar la pauta']],
  };
  const replacements = replacementsById[question.id];
  if (!replacements) return undefined;
  return {
    text: replaceAll(question.text, replacements),
    options: question.options.map(option => replaceAll(option, replacements)),
    explanation: replaceAll(question.explanation, replacements),
  };
}

function desiredPatch(question: Question): QuestionPatch | undefined {
  const cardio = patchCardio(question);
  if (cardio) return cardio;

  if (question.semana === 6) {
    const replacements: readonly [RegExp, string][] = [[/\band\b/g, 'y'], [/hemabrasiones/g, 'hemartrosis']];
    return {
      text: replaceAll(question.text, replacements),
      options: question.options.map(option => replaceAll(option, replacements)),
      explanation: replaceAll(question.explanation, replacements),
    };
  }

  if (question.id === 'semana17_ped_q208') return {
    text: 'Para establecer la definición de caso probable de dengue, el paciente debe presentar aparición aguda de fiebre de hasta 7 días de duración sin afección de vías aéreas superiores ni foco aparente, residir o haber viajado a área endémica, y presentar dos o más de las siguientes manifestaciones, EXCEPTO:',
    explanation: question.explanation.replace('La opción y es la excepción', 'La opción «Aislamiento viral positivo o seroconversión de IgG» es la excepción'),
    pagina: 'Ministerio de Salud Pública y Bienestar Social (MSPyBS). Dengue: Guía de Manejo Clínico, 2012, tabla 3, pág. 14.',
  };
  if (question.id === 'semana17_ped_q301') return {
    options: question.options.map(option => option.replace(/\s*\$\\rightarrow\$\s*/g, ' → ')),
  };
  if (question.id === 'semana17_ped_q302') return {
    options: question.options.map(option => option.replace(/por verm$/, 'por verme')),
  };

  const cleanStemById: Record<string, string> = {
    semana17_ped_q148: 'Un paciente desarrolla neumonía luego de un episodio de aspiración. El grupo etiológico más relacionado es:',
    semana17_ped_q197: 'Un paciente de 24 años con diagnóstico de dengue acude a consulta en su 4.° día de evolución refiriendo que la fiebre cayó bruscamente a 37,2 °C. Al examen físico presenta PA: 100/85 mmHg, extremidades frías, llenado capilar lento y pulso débil y rápido. El laboratorio muestra un aumento progresivo del hematocrito con leucopenia y plaquetopenia marcadas. ¿Cuál es la conducta fisiopatológica y clínica prioritaria según la guía?',
    semana17_ped_q198: 'En un paciente con dengue que evoluciona favorablemente y entra en la fase de recuperación, ¿cuál es el comportamiento hematológico y cardiovascular característico descrito en la guía?',
    semana17_ped_q199: 'En relación con las manifestaciones clínicas, semiológicas y laboratoriales de la fase febril del dengue, todas las afirmaciones son correctas, EXCEPTO:',
    semana17_ped_q207: 'De acuerdo con la tabla comparativa de métodos de diagnóstico del dengue, ¿cuál es el espécimen requerido y el momento oportuno de toma de muestra para la confirmación mediante IgG pareado por ELISA, IH o prueba de neutralización?',
    semana17_ped_q210: 'Un paciente con cuadro febril agudo de 4 días de evolución se realiza una prueba rápida inmunocromatográfica de dengue que incluye antígeno NS1, IgM e IgG. El informe del laboratorio reporta: NS1 (+), IgM (-) e IgG (+). Según la tabla de interpretación oficial de la guía, ¿a qué diagnóstico corresponde este patrón serológico?',
    semana17_ped_q214: 'Un niño de 6 años previamente sano consulta por un cuadro de 24 horas de rinorrea y fiebre de 38,2 °C compatible con sospecha de COVID-19. No presenta factores de riesgo, signos de alarma ni insuficiencia respiratoria (Escenario 1 - Grupo A). Según la guía clínica, ¿cuál es la conducta terapéutica y pauta de alarma correcta?',
    semana17_ped_q215: 'Un lactante de 18 meses con sospecha de COVID-19 es evaluado en urgencias. Presenta fiebre y tos sin signos de alarma ni insuficiencia respiratoria. Por presentar un factor de riesgo (edad ≤2 años), se clasifica en el Escenario 2 (Grupo B). ¿Cuál es la disposición de internación y el panel de laboratorio inicial indicado en la guía?',
    semana17_ped_q216: 'Un escolar de 7 años con sospecha de COVID-19 ingresa por presentar dificultad respiratoria, quejido intermitente, crepitantes pulmonares y una saturación de oxígeno ambiental del 91% (Escenario 3 - Grupo C). Con respecto al tratamiento inicial establecido en la guía para este grupo, señale la afirmación CORRECTA:',
    semana17_ped_q217: 'Un lactante con sospecha de COVID-19 presenta dificultad respiratoria grave con aleteo nasal, tiraje generalizado, incapacidad para mantener una SaO₂ ≥92% con aporte de oxígeno >60%, y una gasometría arterial con relación PaO₂/FiO₂ ≤175 con máscara de reservorio, catalogándose en el Escenario 4 (Grupo D). Según la guía, ¿cuál de los estudios complementarios y conductas terapéuticas está específicamente indicado para este nivel de atención?',
    semana18_med_q034: 'Todas las siguientes constituyen complicaciones de la lesión renal aguda, EXCEPTO:',
    semana18_med_q044: '¿Cuál es la principal causa de muerte en pacientes con enfermedad renal crónica?',
    semana18_med_q046: '¿A partir de qué etapa de la enfermedad renal crónica suelen evidenciarse las manifestaciones clínicas sutiles de la enfermedad neuromuscular de origen urémico?',
    semana18_med_q161: 'Un paciente presenta una crisis aguda de cefalea en racimos, con dolor retroorbitario unilateral de gran intensidad que alcanza rápidamente su máxima intensidad. ¿Cuál es una medida terapéutica indicada para abortar la crisis?',
    semana18_med_q163: 'Un paciente presenta cefalea bilateral y pulsátil durante el ejercicio, de menos de 48 h de duración. Tras descartar causas secundarias, se diagnostica cefalea primaria de esfuerzo. ¿Cuál de los siguientes fármacos suele ser eficaz para su tratamiento?',
    semana20_gyo_q030: '¿Hasta qué porcentaje de las mujeres puede desarrollar hiperpigmentación durante el embarazo?',
    semana20_gyo_q034: 'Respecto al metabolismo del agua durante el embarazo, señale la afirmación INCORRECTA:',
    semana20_gyo_q078: 'La prolactina producida por la decidua entra de manera preferente al líquido amniótico durante la gestación. ¿Qué concentración máxima puede alcanzar en este compartimento entre las semanas 20 y 24 de embarazo?',
    semana20_gyo_q114: 'Respecto a las bandas ecográficas observadas durante el embarazo, señale la asociación CORRECTA:',
    semana20_gyo_q120: '¿Qué es la anastomosis de Hyrtl?',
    semana20_gyo_q122: '¿Cuál es el método más preciso para establecer o confirmar la edad gestacional?',
    semana20_gyo_q123: 'Antes de las 9 semanas de embarazo, ¿qué diferencia entre la edad gestacional ecográfica determinada por la longitud coronilla-rabadilla y la edad menstrual justifica cambiar la fecha probable de parto?',
    semana20_gyo_q127: 'Respecto al desarrollo fetal entre las 12 y 20 semanas de gestación, señale la afirmación INCORRECTA (EXCEPTO):',
    semana20_gyo_q131: 'Respecto a la circulación fetal, señale la afirmación INCORRECTA (EXCEPTO):',
    semana20_gyo_q132: '¿Qué ocurre con los vasos umbilicales, el conducto arterioso, el agujero oval y el conducto venoso después del nacimiento?',
  };
  if (cleanStemById[question.id]) return { text: cleanStemById[question.id] };

  if (question.id === 'semana20_gyo_q152') return {
    text: '¿Cuál es la medición ecográfica más adecuada para establecer o confirmar la edad gestacional antes de las 14 semanas?',
    subtema: 'Valoración de la edad gestacional',
    pagina: 'Williams Obstetricia, 26.ª edición, capítulo 14, pág. 248.',
  };
  if (question.id === 'semana20_gyo_q154') return {
    text: 'En la ecografía transvaginal, ¿a partir de qué longitud embrionaria puede ser visible el movimiento cardiaco?',
    pagina: 'Williams Obstetricia, 26.ª edición, capítulo 14, págs. 248-249.',
  };
  return undefined;
}

let changedFiles = 0;
let changedQuestions = 0;

for (const definition of WEEK_CATALOG) {
  const questions = await loadWeekQuestions(definition.week);
  const patchById = new Map<string, QuestionPatch>();
  for (const question of questions) {
    const patch = desiredPatch(question);
    if (!patch) continue;
    const changedPatch = Object.fromEntries(Object.entries(patch).filter(([field, value]) => JSON.stringify(value) !== JSON.stringify(question[field as keyof Question]))) as QuestionPatch;
    if (Object.keys(changedPatch).length) patchById.set(question.id, changedPatch);
  }
  if (!patchById.size) continue;

  const file = path.join(root, 'src', 'data', `semana${definition.week}`, 'questions.ts');
  let source = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const edits: Array<{ start: number; end: number; replacement: string }> = [];

  const visit = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const properties = new Map<string, ts.PropertyAssignment>();
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : undefined;
        if (name) properties.set(name, property);
      }
      const idProperty = properties.get('id');
      if (idProperty && ts.isStringLiteral(idProperty.initializer)) {
        const patch = patchById.get(idProperty.initializer.text);
        if (patch) {
          for (const [field, value] of Object.entries(patch)) {
            const property = properties.get(field);
            if (!property) throw new Error(`${idProperty.initializer.text}: falta ${field}`);
            edits.push({ start: property.initializer.getStart(sourceFile), end: property.initializer.getEnd(), replacement: JSON.stringify(value) });
          }
          changedQuestions += 1;
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  for (const edit of edits.sort((left, right) => right.start - left.start)) {
    source = source.slice(0, edit.start) + edit.replacement + source.slice(edit.end);
  }
  fs.writeFileSync(file, source, 'utf8');
  changedFiles += 1;
}

console.log(`Correcciones verificadas aplicadas: ${changedQuestions} preguntas en ${changedFiles} archivos.`);
