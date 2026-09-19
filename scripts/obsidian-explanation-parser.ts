export function extractExplanationsFromMarkdown(markdown: string): Map<string, string> {
  const explanations = new Map<string, string>();
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let currentId: string | undefined;

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^#{3,4}\s+Pregunta\s+\d+\s*\(`([a-zA-Z0-9_-]+)`\)/);
    if (heading) {
      currentId = heading[1];
      continue;
    }
    if (!currentId || !/^>\s*\[!tip\]/.test(lines[index])) continue;

    const tipLines: string[] = [];
    for (index += 1; index < lines.length; index += 1) {
      const line = lines[index];
      if (/^>\s*\[!quote\]/.test(line) || /^---\s*$/.test(line) || /^#{3,4}\s+Pregunta\s+\d+/.test(line)) {
        index -= 1;
        break;
      }
      tipLines.push(line.startsWith('> ') ? line.slice(2) : line.startsWith('>') ? line.slice(1) : line);
    }

    let explanation = tipLines.join('\n').trim();
    explanation = explanation.replace(/^\*\*Respuesta:\*\*\s*`[^`]*`\s*/, '').trim();
    explanation = explanation.replace(/^[Rr]espuesta\s+correcta[:\s]*[^\n]*\n/, '').trim();
    if (explanation.length > 10) explanations.set(currentId, explanation);
  }
  return explanations;
}
