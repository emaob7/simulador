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

export function parseExplanation(text: string): ParsedSection[] {
  if (!text) return [];

  const lines = text.split('\n');
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let currentRawLines: string[] = [];

  const flushSection = () => {
    if (currentSection) {
      currentSection.rawText = currentRawLines.join('\n').trim();
      sections.push(currentSection);
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

    // Check header matching
    const isMdHeader = trimmed.startsWith('#');
    const isEmojiHeader = /^[ \t]*[-•*]?\s*[✅💡🟩❓🔍⚠️📚✨🎨🧠🧪🏥🧬🩺📋📖]/u.test(trimmed) && trimmed.length < 75;

    const cleanLineForCheck = trimmed
      .replace(/^[^\w\s]+/u, '')
      .replace(/^\*+\s*|\s*\*+$/g, '')
      .trim();

    const headerKeywords = /^(?:AN[ÁA]LISIS DE PREGUNTA|AN[ÁA]LISIS|CONCEPTOS? CLAVE|PUNTOS? CLAVE(?:\s*\(REPASO ACTIVO\))?|REPASO ACTIVO|EXPLICACI[ÓO]N|REFERENCIAS?|REFERENCIA)\b/i;
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
