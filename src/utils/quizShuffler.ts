import type { Question } from '../types';

/**
 * Checks whether an option references relative letters like "A y B son correctas"
 */
function hasPositionalLetterReferences(options: string[]): boolean {
  return options.some(opt => 
    /\b(?:[a-e]\s*y\s*[a-e]|[a-e],\s*[a-e]|solo\s*[a-e]|ambas\s*[a-e]|opciones\s*[a-e]\s*y\s*[a-e])\b/i.test(opt)
  );
}

/**
 * Checks whether the explanation refers to options by their letter (e.g. "a) [Incorrecta]: ...",
 * "C (Correcta)", "La e es correcta", "las opciones a y c", "(d)", "«e) ...»").
 * Those explanations only make sense with the original option order, so the question must not be shuffled.
 */
export function explanationReferencesLetters(explanation: string | undefined): boolean {
  if (!explanation) return false;
  const patterns: RegExp[] = [
    /(?:^|\n)\s*[-•*]?\s*\(?[a-eA-E][\)\.]\s+\S/,                                   // "a) texto" / "- b. texto" at line start
    /\b[A-Ea-e]\s*[\(\[]\s*(?:correcta|incorrecta|falsa|verdadera|excepci[oó]n)/i,     // "C (Correcta)" / "b) [Incorrecta]"
    /\b(?:opci[oó]n|alternativa|inciso|letra)\s+(?:es\s+la\s+)?\(?[A-Ea-e]\)?(?![\p{L}\d])/iu, // "la opción b"
    /respuesta\s+correcta\s*:?\s*\**\s*`?\(?[A-Ea-e][\)\.\s]/i,                        // "Respuesta correcta: d)"
    /\b(?:la|el)\s+\(?[A-Ea-e]\)?\s+(?:es|son|ser[ií]a|corresponde|constituye|resulta|queda)\b/i, // "La e es correcta"
    /(?<![\p{L}\d])\([a-e]\)/u,                                                         // "(a)", "(c)" — but not "Lp(a)"
    /[«“"]\s*[a-eA-E]\)\s/,                                                              // "«e) texto»"
    /\b(?:opciones|alternativas|las|los)\s+\(?[A-Ea-e]\)?\s*(?:,\s*\(?[A-Ea-e]\)?\s*)*(?:,|y|e|o)\s+\(?[A-Ea-e]\)?(?![\p{L}\d])/iu, // "opciones a y c"
  ];
  return patterns.some(re => re.test(explanation));
}

/**
 * Checks if an option is a bottom-catchall like "Todas las anteriores" or "Ninguna de las anteriores"
 */
function isCatchAllOption(opt: string): boolean {
  return /^(?:todas las anteriores|ninguna de las anteriores|todas son correctas|ninguna es correcta|todas las anteriores son correctas|ninguna de las anteriores es correcta)/i.test(opt.trim());
}

/**
 * Returns a shuffled copy and moves correctOptionIndex with its option.
 * Explanations are immutable content: this function never interprets or rewrites them.
 */
export function shuffleQuestionOptions(question: Question): Question {
  if (!question.options || question.options.length <= 1) {
    return question;
  }

  // If question options contain cross-letter references like "A y B son correctas", preserve original order
  if (hasPositionalLetterReferences(question.options)) {
    return question;
  }

  // If the explanation analyses the options by letter ("a) ...", "C (Correcta)"), shuffling would
  // make those letters point to the wrong option on screen, so keep the original order.
  if (explanationReferencesLetters(question.explanation)) {
    return question;
  }

  const items = question.options.map((text, idx) => ({
    text,
    isCorrect: idx === question.correctOptionIndex,
    isCatchAll: isCatchAllOption(text)
  }));

  // Separate catchall options (like "Todas las anteriores") to place at the end if present
  const regularItems = items.filter(item => !item.isCatchAll);
  const catchAllItems = items.filter(item => item.isCatchAll);

  // Fisher-Yates shuffle on regular items
  for (let i = regularItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [regularItems[i], regularItems[j]] = [regularItems[j], regularItems[i]];
  }

  // Combine regular shuffled + catchall at the end
  const shuffledItems = [...regularItems, ...catchAllItems];

  const newOptions = shuffledItems.map(item => item.text);
  const newCorrectOptionIndex = shuffledItems.findIndex(item => item.isCorrect);

  return {
    ...question,
    options: newOptions,
    correctOptionIndex: newCorrectOptionIndex >= 0 ? newCorrectOptionIndex : question.correctOptionIndex,
    explanation: question.explanation
  };
}

/**
 * Shuffles a whole list of questions:
 * 1. Shuffles the order of questions themselves.
 * 2. Shuffles the options inside each question.
 */
export function shuffleQuizQuestions(questions: Question[], options: { shuffleQuestions?: boolean, shuffleOptions?: boolean } = {}): Question[] {
  const { shuffleQuestions = true, shuffleOptions = true } = options;

  let pool = [...questions];

  if (shuffleQuestions) {
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
  }

  if (shuffleOptions) {
    pool = pool.map(q => shuffleQuestionOptions(q));
  }

  return pool;
}
