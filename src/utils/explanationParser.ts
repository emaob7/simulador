export interface ParsedBullet {
  type?: 'card' | 'subtitle' | 'paragraph' | 'group';
  key?: string;
  value: string;
  steps?: string[];
  subItems?: ParsedBullet[];
}

export interface ParsedSection {
  title: string;
  type: 'markdown';
  rawText: string;
  bullets?: ParsedBullet[];
}

export function normalizeExplanationMarkdown(text: string): string {
  if (!text) return '';

  // Limpiar artefactos y normalizar saltos de línea CRLF
  const cleanText = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/Principio del formulario/gi, '')
    .replace(/Final del formulario/gi, '');

  const rawLines = cleanText.split('\n');
  const processed: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      processed.push('');
      continue;
    }

    // Helper para desinfectar títulos de subtítulo
    const cleanHeaderTitle = (str: string): string => {
      return str
        .replace(/^[•●○■◆▪▫\-\+\*#\s]+/, '')
        .replace(/^<u>|<\/u>$/gi, '')
        .replace(/^\*{1,3}|\*{1,3}$/g, '')
        .replace(/^<u>|<\/u>$/gi, '')
        .replace(/^\*{1,3}|\*{1,3}$/g, '')
        .replace(/:$/, '')
        .trim();
    };

    // 1. Detección exhaustiva de encabezados de categoría (Unicode aware para español)
    const isUnderlineHeader = /^[-•*]?\s*(\*{1,3})?<u>.*<\/u>(\*{1,3})?:?$/.test(trimmed);
    const isColonBoldHeader = /^[-•*]?\s*\*\*[A-ZÁÉÍÓÚ0-9¿][\w\s\(\)\/,\.\u00C0-\u017F\+\-–—¿\?:;]{2,80}\*\*[:\s]*$/.test(trimmed);
    const isMarkdownHeader = /^#{3,6}\s+/.test(trimmed);
    const isSpecialSubheader = /^(?:Regla de examen|Criterios diagnósticos|Clasificación|Diferencias clínicas|Fuentes dietéticas de grasa|Clasificación endoscópica|Triángulo de Evaluación Pediátrica(?:\s*\(TEP\))?|Manifestaciones Clínicas|Patrones pupilares en el coma|Prevención(?:\s*\(Tabla[^)]*\))?):?$/i.test(trimmed);

    if (isUnderlineHeader || isColonBoldHeader || isMarkdownHeader || isSpecialSubheader) {
      const cleanTitle = cleanHeaderTitle(trimmed);
      processed.push('');
      processed.push(`#### ${cleanTitle}`);
      processed.push('');
      continue;
    }

    // 2. Clasificaciones clínicas (Tipo 0:, Nivel I:, Estadio II:, Grado 1:)
    if (/^(?:Tipo|Etapa|Estadio|Nivel|Grado)\s+[IVXLC\d]+:?\s+/i.test(trimmed) && !trimmed.startsWith('-')) {
      const formatted = trimmed.replace(/^((?:Tipo|Etapa|Estadio|Nivel|Grado)\s+[IVXLC\d]+:?)\s+/i, '- **$1** ');
      processed.push(formatted);
      continue;
    }

    // 3. Detección de viñetas en línea múltiples ("• A: ... • B: ...")
    if (trimmed.includes(' • ') || trimmed.includes(' •') || /^[•●○■◆▪▫]\s*.*\s+[•●○■◆▪▫]/.test(trimmed)) {
      const parts = trimmed.split(/\s+[•●○■◆▪▫]\s+/);
      for (const part of parts) {
        let p = part.trim().replace(/^[•●○■◆▪▫\-\+\*]\s*/, '');
        if (p) {
          p = p.replace(/^([A-ZÁÉÍÓÚa-záéíóú])\s*[:\.\)]\s*/, '**$1:** ');
          processed.push(`- ${p}`);
        }
      }
      continue;
    }

    // 4. Viñetas estándar (PROTEGIENDO cursivas como *Perla CONAREM*:)
    if (/^(?:[•●○■◆▪▫\-\+]|\*(?=\s))\s*/.test(trimmed)) {
      let content = trimmed.replace(/^(?:[•●○■◆▪▫\-\+]|\*(?=\s))\s*/, '').trim();
      content = content.replace(/^([A-ZÁÉÍÓÚa-záéíóú])\s*[:\.\)]\s*/, '**$1:** ');
      processed.push(`- ${content}`);
      continue;
    }

    // 5. Notación de opción directa o acrónimo (A:, B:, S:, M:, etc.)
    if (/^[A-Za-z]\s*[:\.\)]\s+/.test(trimmed)) {
      let content = trimmed.replace(/^([A-Za-z])\s*[:\.\)]\s+/, '**$1:** ');
      processed.push(`- ${content}`);
      continue;
    }

    // 6. Formato tabular / clave-valor multiespacio
    if (/^([^\s].{2,40}?)\s{2,}([^\s].+)$/.test(trimmed) && !trimmed.startsWith('#') && !trimmed.startsWith('http')) {
      const match = trimmed.match(/^([^\s].{2,40}?)\s{2,}([^\s].+)$/);
      if (match) {
        processed.push(`- **${match[1].trim()}** → ${match[2].trim()}`);
        continue;
      }
    }

    // 7. Flechas clínicas cortas (SOLO si no es un párrafo largo o nota mnemotécnica)
    if (
      (trimmed.includes('→') || trimmed.includes('←') || trimmed.includes('↔')) &&
      !trimmed.startsWith('- ') &&
      !trimmed.startsWith('* ') &&
      !trimmed.startsWith('#') &&
      trimmed.length < 120 &&
      !/^(?:Mnemotecnia|Nota|Secuencia|Algoritmo|Idea de examen):/i.test(trimmed)
    ) {
      processed.push(`- ${trimmed}`);
      continue;
    }

    processed.push(line);
  }

  return processed.join('\n');
}

export function parseExplanation(text: string): ParsedSection[] {
  if (!text) return [];

  const lines = text.split('\n');
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let currentRawLines: string[] = [];

  const flushSection = () => {
    if (currentSection) {
      const combined = currentRawLines.join('\n').trim();
      currentSection.rawText = normalizeExplanationMarkdown(combined);
      if (currentSection.rawText.length > 0 || currentSection.title.toLowerCase().startsWith('referencia')) {
        sections.push(currentSection);
      }
    }
    currentSection = null;
    currentRawLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentSection) {
        currentRawLines.push('');
      }
      continue;
    }

    // Filtrar línea inicial aislada de 'Respuesta correcta:' para evitar contenedores vacíos
    if (/^[✅\s]*[Rr]espuesta\s+correcta\s*:/i.test(trimmed)) {
      continue;
    }

    // Check header matching
    const isMdHeader = trimmed.startsWith('#');
    const isEmojiHeader = /^[ \t]*[-•*]?\s*[💡🟩❓🔍⚠️📚✨🎨🧠🧪🏥🧬🩺📋📖⚡🔑📌🎯⭐]/u.test(trimmed) && trimmed.length < 75;

    const cleanLineForCheck = trimmed
      .replace(/^[^\w\s¿?]+/u, '')
      .replace(/^\*+\s*|\s*\*+$/g, '')
      .trim();

    const headerKeywords = /^(?:AN[ÁA]LISIS DE PREGUNTA|AN[ÁA]LISIS DE LA PREGUNTA|AN[ÁA]LISIS|POR QU[ÉE] ES LA CORRECTA|CONCEPTOS? CLAVE|CLAVE CONAREM|PUNTOS? CLAVE(?:\s*\(REPASO ACTIVO\))?|REPASO ACTIVO|EXPLICACI[ÓO]N|REFERENCIAS?|REFERENCIA)\b/i;
    const isKeywordHeader = headerKeywords.test(cleanLineForCheck) && cleanLineForCheck.length < 75;

    if (isMdHeader || isEmojiHeader || isKeywordHeader) {
      flushSection();

      let cleanTitle = cleanLineForCheck
        .replace(/^[ \t]*[-•*#\s]+/g, '')
        .replace(/\*+/g, '')
        .trim();

      if (cleanTitle.toLowerCase().startsWith('referencia')) {
        cleanTitle = 'REFERENCIA';
      }

      currentSection = {
        title: cleanTitle,
        type: 'markdown',
        rawText: ''
      };
      
      // If line is Referencia: ..., keep the text inside rawText as well
      if (cleanLineForCheck.toLowerCase().startsWith('referencia')) {
        currentRawLines.push(line);
      }
    } else {
      if (!currentSection) {
        currentSection = {
          title: 'Explicación',
          type: 'markdown',
          rawText: ''
        };
      }
      currentRawLines.push(line);
    }
  }

  flushSection();
  return sections;
}
