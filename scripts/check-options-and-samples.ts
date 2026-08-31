import type { Question } from '../src/types';

async function checkOptionsDistribution() {
  let totalQ = 0;
  const optionsCountMap: Record<number, number> = {};
  const sampleWithE: Array<{ id: string; week: number; text: string; options: string[]; correctIdx: number; expl: string }> = [];

  for (let w = 1; w <= 18; w++) {
    const mod = await import(`../src/data/semana${w}/questions.ts`);
    const qs = mod[`questionsSemana${w}`] as Question[];
    totalQ += qs.length;

    for (const q of qs) {
      const len = q.options?.length || 0;
      optionsCountMap[len] = (optionsCountMap[len] || 0) + 1;

      if (len === 5 && sampleWithE.length < 5 && w === 10) {
        sampleWithE.push({
          id: q.id,
          week: w,
          text: q.text,
          options: q.options,
          correctIdx: q.correctOptionIndex,
          expl: q.explanation.slice(0, 250)
        });
      }
    }
  }

  console.log("=== DISTRIBUCIÓN DE CANTIDAD DE OPCIONES EN EL SIMULADOR ===");
  console.log(`Total de preguntas: ${totalQ}`);
  for (const [count, qCount] of Object.entries(optionsCountMap)) {
    const pct = ((qCount / totalQ) * 100).toFixed(1);
    console.log(` • Preguntas con ${count} opciones (A-${String.fromCharCode(64 + Number(count))}): ${qCount} preguntas (${pct}%)`);
  }

  console.log("\n=== MUESTRAS DE PREGUNTAS CON OPCIÓN E (CORREGIDAS) ===");
  for (const s of sampleWithE) {
    console.log(`\n📌 [${s.id}] (Semana ${s.week})`);
    console.log(`Enunciado: ${s.text}`);
    s.options.forEach((opt, idx) => {
      const mark = idx === s.correctIdx ? " [CORRECTA]" : "";
      console.log(`   ${String.fromCharCode(65 + idx)}) ${opt}${mark}`);
    });
    console.log(`Explicación (primeras líneas):`);
    console.log(`   ${s.expl.replace(/\n/g, ' ')}...`);
  }
}

checkOptionsDistribution().catch(console.error);
