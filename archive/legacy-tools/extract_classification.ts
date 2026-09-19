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

const weekData = [
  { semanaNum: 1, questions: questionsSemana1 },
  { semanaNum: 2, questions: questionsSemana2 },
  { semanaNum: 3, questions: questionsSemana3 },
  { semanaNum: 4, questions: questionsSemana4 },
  { semanaNum: 5, questions: questionsSemana5 },
  { semanaNum: 6, questions: questionsSemana6 },
  { semanaNum: 7, questions: questionsSemana7 },
  { semanaNum: 8, questions: questionsSemana8 },
  { semanaNum: 9, questions: questionsSemana9 },
  { semanaNum: 10, questions: questionsSemana10 },
  { semanaNum: 11, questions: questionsSemana11 },
  { semanaNum: 12, questions: questionsSemana12 },
  { semanaNum: 13, questions: questionsSemana13 },
  { semanaNum: 14, questions: questionsSemana14 },
];

console.log('Total weeks found:', weekData.length);

type TemaStat = {
  name: string;
  count: number;
  subtemas: Map<string, number>;
};

type WeekStat = {
  semanaNum: number;
  materia: string;
  module: string;
  totalQuestions: number;
  temas: Map<string, TemaStat>;
};

const stats: WeekStat[] = [];

for (const w of weekData) {
  const qs = w.questions;
  let materia = 'Desconocida';
  let moduleName = `Semana ${w.semanaNum}`;

  if (qs.length > 0) {
    if (qs[0].materia) materia = qs[0].materia;
    if (qs[0].module) moduleName = qs[0].module;
  }

  const temasMap = new Map<string, TemaStat>();

  for (const q of qs) {
    const temaName = (q.tema || 'Sin Tema Especificado').trim();
    const subtemaName = (q.subtema || 'Sin Subtema Especificado').trim();

    if (!temasMap.has(temaName)) {
      temasMap.set(temaName, {
        name: temaName,
        count: 0,
        subtemas: new Map<string, number>()
      });
    }

    const tStat = temasMap.get(temaName)!;
    tStat.count++;
    tStat.subtemas.set(subtemaName, (tStat.subtemas.get(subtemaName) || 0) + 1);
  }

  stats.push({
    semanaNum: w.semanaNum,
    materia,
    module: moduleName,
    totalQuestions: qs.length,
    temas: temasMap
  });
}

const summary = stats.map(s => ({
  semana: s.semanaNum,
  materia: s.materia,
  module: s.module,
  totalQuestions: s.totalQuestions,
  temasCount: s.temas.size,
  temas: Array.from(s.temas.values()).map(t => ({
    tema: t.name,
    count: t.count,
    subtemas: Array.from(t.subtemas.entries()).map(([st, c]) => ({ subtema: st, count: c }))
  }))
}));

fs.writeFileSync('classification_dump.json', JSON.stringify(summary, null, 2), 'utf-8');
console.log('Saved classification_dump.json successfully!');
