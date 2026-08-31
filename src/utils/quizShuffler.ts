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
