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

  const rawLines = text.split('\n');
  const processed: string[] = [];

  for (let line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) {
      processed.push('');
      continue;
    }

    // 1. If line contains multiple inline bullets: "• A: ... • B: ... • C: ..." or "• Item 1 • Item 2"
    if (trimmed.includes(' • ') || trimmed.includes(' •') || /^[•●○■◆▪▫]\s*.*\s+[•●○■◆▪▫]/.test(trimmed)) {
      const parts = trimmed.split(/\s+[•●○■◆▪▫]\s+/);
      for (const part of parts) {
        let p = part.trim().replace(/^[•●○■◆▪▫\-\*\+]\s*/, '');
        if (p) {
          // Normalize option letter e.g., 'A: ...' or 'A) ...' -> '**A:** ...'
          p = p.replace(/^([A-Ea-e])\s*[:\.\)]\s*/, '**$1:** ');
          processed.push(`- ${p}`);
        }
      }
      continue;
    }

    // 2. If line starts with a bullet marker: '• ...', '● ...', '- ...', '* ...'
    if (/^[•●○■◆▪▫\-\*\+]\s*/.test(trimmed)) {
      let content = trimmed.replace(/^[•●○■◆▪▫\-\*\+]\s*/, '').trim();
      content = content.replace(/^([A-Ea-e])\s*[:\.\)]\s*/, '**$1:** ');
      processed.push(`- ${content}`);
      continue;
    }

    // 3. If line starts directly with option notation: 'A: ...', 'A) ...', 'A. ...'
    if (/^[A-Ea-e]\s*[:\.\)]\s+/.test(trimmed)) {
      let content = trimmed.replace(/^([A-Ea-e])\s*[:\.\)]\s+/, '**$1:** ');
      processed.push(`- ${content}`);
      continue;
    }

    // 4. Tabular / multi-space key-value format (e.g., "Pliegue genital   Ovario")
    if (/^([^\s].{2,40}?)\s{2,}([^\s].+)$/.test(trimmed) && !trimmed.startsWith('#') && !trimmed.startsWith('http')) {
      const match = trimmed.match(/^([^\s].{2,40}?)\s{2,}([^\s].+)$/);
      if (match) {
        processed.push(`- **${match[1].trim()}** → ${match[2].trim()}`);
        continue;
      }
    }

    // 5. If line contains arrows (→, ←, ↔) representing clinical associations
    if ((trimmed.includes('→') || trimmed.includes('←') || trimmed.includes('↔')) && !trimmed.startsWith('- ') && !trimmed.startsWith('* ') && !trimmed.startsWith('#')) {
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
