import { questionsSemana8 } from './src/data/semana8/questions';

const CONSOLIDATED_SUBTHEMES = new Set([
  'Eje Hipotálamo-Hipófisis y Hormonas Glucoproteicas',
  'Esteroidogénesis y Dinámica Folicular Ovárica',
  'Ciclo Ovárico, Endometrial e Implantación',
  'Microbioma Vaginal, Vaginosis y Vaginitis',
  'ITS Ulcerativas y Lesiones Dermatológicas Genitales',
  'ITS No Ulcerativas y Patología Infecciosa Local/Sistémica',
  'Diagnóstico y Tamizaje de la Infección por VIH',
  'Dolor Pélvico Crónico'
]);

console.log(`Loaded ${questionsSemana8.length} questions from Semana 8.\n`);

const ids = new Set<string>();
const texts = new Set<string>();
const subthemesUsed = new Set<string>();
const errors: string[] = [];

questionsSemana8.forEach((q, idx) => {
  const qNum = idx + 1;
  const prefix = `[Q${qNum} - ID: ${q.id}]`;

  // 1. Check ID duplicates
  if (ids.has(q.id)) {
    errors.push(`${prefix} Duplicate question ID found: ${q.id}`);
  }
  ids.add(q.id);

  // 2. Check Text duplicates (using normalized/clean text to detect minor spacing differences)
  const cleanText = q.text.trim().toLowerCase().replace(/\s+/g, ' ');
  if (texts.has(cleanText)) {
    errors.push(`${prefix} Duplicate question text found: "${q.text.substring(0, 60)}..."`);
  }
  texts.add(cleanText);

  // 3. Check subtheme is valid
  if (!q.subtema) {
    errors.push(`${prefix} Question is missing subtema field.`);
  } else {
    subthemesUsed.add(q.subtema);
    if (!CONSOLIDATED_SUBTHEMES.has(q.subtema)) {
      errors.push(`${prefix} Invalid subtema: "${q.subtema}" (not one of the 7 consolidated subthemes).`);
    }

    // 4. Check alignment with content
    const textLower = q.text.toLowerCase();
    const expLower = q.explanation.toLowerCase();
    const contentText = `${textLower} ${expLower}`;

    if (q.subtema === 'Microbioma Vaginal, Vaginosis y Vaginitis') {
      // Check if it belongs here
      if (!contentText.includes('vaginal') && !contentText.includes('vaginosis') && !contentText.includes('vaginitis') && !contentText.includes('candidosis') && !contentText.includes('candida') && !contentText.includes('trichomonas') && !contentText.includes('microbiota') && !contentText.includes('lactobacillus') && !contentText.includes('amsel') && !contentText.includes('clue cells') && !contentText.includes('células guía')) {
        errors.push(`${prefix} Subtheme is "Microbioma Vaginal, Vaginosis y Vaginitis", but content doesn't seem to match.`);
      }
      // Check for syphilis/LH/FSH/etc. mismatches
      if (contentText.includes('sífilis') || contentText.includes('sifilis') || contentText.includes('treponema') || contentText.includes('chancro')) {
        errors.push(`${prefix} Syphilis-related question under "Microbioma Vaginal, Vaginosis y Vaginitis".`);
      }
      if (contentText.includes('lh') || contentText.includes('fsh') || contentText.includes('gnrh') || contentText.includes('hcg')) {
        errors.push(`${prefix} LH/FSH/GnRH/hCG-related question under "Microbioma Vaginal, Vaginosis y Vaginitis".`);
      }
    }

    if (q.subtema === 'ITS Ulcerativas y Lesiones Dermatológicas Genitales') {
      if (contentText.includes('lh') || contentText.includes('fsh') || contentText.includes('gnrh')) {
        errors.push(`${prefix} LH/FSH/GnRH-related question under "ITS Ulcerativas".`);
      }
    }

    if (q.subtema === 'ITS No Ulcerativas y Patología Infecciosa Local/Sistémica') {
      if (contentText.includes('lh') || contentText.includes('fsh') || contentText.includes('gnrh')) {
        errors.push(`${prefix} LH/FSH/GnRH-related question under "ITS".`);
      }
    }
  }
});

console.log('Subthemes used in questions.ts:');
Array.from(subthemesUsed).forEach(st => {
  console.log(`- ${st} (${CONSOLIDATED_SUBTHEMES.has(st) ? 'Valid' : 'INVALID'})`);
});
console.log();

if (errors.length > 0) {
  console.log(`Found ${errors.length} audit issues:`);
  errors.forEach(e => console.log(`- ${e}`));
} else {
  console.log('Audit completed successfully. No issues or mismatches found!');
}
