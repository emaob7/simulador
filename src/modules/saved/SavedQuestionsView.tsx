import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  ChevronRight,
  Play,
  Search,
  Trash2,
  X
} from 'lucide-react';
import { Question } from '../../types';
import { analyzeSubtema } from '../../utils/normalizer';

const MATERIAS = ['Todas', 'Pediatría', 'Medicina Interna', 'Cirugía', 'Ginecología y Obstetricia'] as const;
type MateriaFilter = typeof MATERIAS[number];

interface SavedQuestionsViewProps {
  allQuestions: Question[];
  savedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onStartQuizWithQuestions: (questions: Question[]) => void;
  onQuestionSelect: (questionId: string) => void;
  onBackToSimulator: () => void;
}

export function SavedQuestionsView({
  allQuestions,
  savedQuestionIds,
  onToggleBookmark,
  onStartQuizWithQuestions,
  onQuestionSelect,
  onBackToSimulator
}: SavedQuestionsViewProps) {
  const [selectedMateria, setSelectedMateria] = useState<MateriaFilter>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const savedQuestions = useMemo(() => {
    const savedIds = new Set(savedQuestionIds);
    return allQuestions.filter(question => savedIds.has(question.id));
  }, [allQuestions, savedQuestionIds]);

  const materiaCounts = useMemo(() => {
    const counts: Record<MateriaFilter, number> = {
      Todas: savedQuestions.length,
      Pediatría: 0,
      'Medicina Interna': 0,
      Cirugía: 0,
      'Ginecología y Obstetricia': 0
    };

    savedQuestions.forEach(question => {
      counts[question.materia] += 1;
    });

    return counts;
  }, [savedQuestions]);

  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('es');

    return savedQuestions.filter(question => {
      const matchesMateria = selectedMateria === 'Todas' || question.materia === selectedMateria;
      const matchesSearch = !query || [question.text, question.tema, question.subtema]
        .some(value => value?.toLocaleLowerCase('es').includes(query));

      return matchesMateria && matchesSearch;
    });
  }, [savedQuestions, selectedMateria, searchQuery]);

  const activeSubjectCount = MATERIAS
    .slice(1)
    .filter(materia => materiaCounts[materia] > 0)
    .length;

  const hasSearch = searchQuery.trim().length > 0;

  const handleStartFilteredQuiz = () => {
    if (filteredQuestions.length > 0) onStartQuizWithQuestions(filteredQuestions);
  };

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in duration-300 pb-16">
      <header className="mb-6 border-b border-[#282722] pb-6">
        <button
          type="button"
          onClick={onBackToSimulator}
          className="mb-5 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#8D8B82] transition-colors hover:text-[#D4B342]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al simulador
        </button>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B99A35]">
              Biblioteca personal
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#F2F0E9] sm:text-3xl">
              Preguntas guardadas
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8D8B82]">
              Revisa las preguntas que marcaste durante tus entrenamientos y vuelve a practicarlas cuando quieras.
            </p>
          </div>

          {savedQuestions.length > 0 && (
            <button
              type="button"
              onClick={handleStartFilteredQuiz}
              disabled={filteredQuestions.length === 0}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#D4B342] px-5 text-xs font-bold text-[#11110F] transition-colors hover:bg-[#E0C158] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Repasar selección ({filteredQuestions.length})
            </button>
          )}
        </div>
      </header>

      {savedQuestions.length > 0 ? (
        <section className="overflow-hidden rounded-xl border border-[#282722] bg-[#121210]">
          <div className="grid grid-cols-3 border-b border-[#282722] bg-[#151512]">
            <div className="px-4 py-4 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#77756D]">Guardadas</p>
              <p className="mt-1 text-xl font-semibold text-[#F2F0E9]">{savedQuestions.length}</p>
            </div>
            <div className="border-x border-[#282722] px-4 py-4 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#77756D]">En la vista</p>
              <p className="mt-1 text-xl font-semibold text-[#F2F0E9]">{filteredQuestions.length}</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#77756D]">Materias</p>
              <p className="mt-1 text-xl font-semibold text-[#F2F0E9]">{activeSubjectCount}</p>
            </div>
          </div>

          <div className="border-b border-[#282722] px-4 pt-4 sm:px-6">
            <div className="flex gap-6 overflow-x-auto scrollbar-none" role="tablist" aria-label="Filtrar por materia">
              {MATERIAS.map(materia => {
                const isSelected = selectedMateria === materia;

                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    key={materia}
                    onClick={() => setSelectedMateria(materia)}
                    className={`relative flex shrink-0 cursor-pointer items-center gap-2 pb-3 text-xs font-semibold transition-colors ${
                      isSelected ? 'text-[#E1C35A]' : 'text-[#85837B] hover:text-[#D5D2C8]'
                    }`}
                  >
                    {materia}
                    <span className={isSelected ? 'text-[#E1C35A]' : 'text-[#66645E]'}>
                      {materiaCounts[materia]}
                    </span>
                    {isSelected && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D4B342]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-b border-[#282722] p-4 sm:p-6">
            <label className="relative block">
              <span className="sr-only">Buscar entre las preguntas guardadas</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77756D]" />
              <input
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Buscar por enunciado, tema o subtema"
                className="h-11 w-full rounded-lg border border-[#302F2A] bg-[#0E0E0C] pl-10 pr-10 text-sm text-[#EEECE5] outline-none transition-colors placeholder:text-[#67655F] focus:border-[#8F792E]"
              />
              {hasSearch && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-[#77756D] transition-colors hover:text-[#EEECE5]"
                  title="Limpiar búsqueda"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>

          <div className="flex items-center justify-between border-b border-[#282722] px-4 py-3 sm:px-6">
            <h2 className="text-xs font-semibold text-[#D5D2C8]">Lista de repaso</h2>
            <span className="text-[11px] text-[#77756D]">
              {selectedMateria === 'Todas' ? 'Todas las materias' : selectedMateria}
            </span>
          </div>

          {filteredQuestions.length > 0 ? (
            <ol>
              {filteredQuestions.map((question, index) => {
                const subtopic = analyzeSubtema(
                  question.subtema,
                  question.materia,
                  question.semana,
                  question.text,
                  question.id
                ).normalizado || question.subtema;

                return (
                  <li
                    key={question.id}
                    className="group border-b border-[#24231F] last:border-b-0 hover:bg-[#161613]"
                  >
                    <div className="grid gap-4 px-4 py-5 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:px-6">
                      <div className="hidden h-8 w-8 items-center justify-center rounded-md border border-[#343229] bg-[#191813] text-[11px] font-semibold text-[#A58C37] sm:flex">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-wide">
                          <span className="text-[#B99A35]">{question.materia}</span>
                          <span className="text-[#4F4E49]">/</span>
                          <span className="text-[#77756D]">Semana {question.semana}</span>
                          {subtopic && (
                            <>
                              <span className="text-[#4F4E49]">/</span>
                              <span className="normal-case tracking-normal text-[#85837B]">{subtopic}</span>
                            </>
                          )}
                        </div>

                        <p className="line-clamp-3 text-sm font-medium leading-6 text-[#E7E4DB] sm:text-[15px]">
                          {question.text}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 sm:self-center">
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(question.id)}
                          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-[#34312D] text-[#8D817B] transition-colors hover:border-[#70423D] hover:bg-[#251715] hover:text-[#D89086]"
                          title="Quitar de guardadas"
                          aria-label="Quitar de guardadas"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuestionSelect(question.id)}
                          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-[#474334] bg-[#1C1B16] px-3 text-xs font-semibold text-[#D9C166] transition-colors hover:border-[#8F792E] hover:bg-[#211F17]"
                        >
                          Abrir pregunta
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="px-6 py-14 text-center">
              <Search className="mx-auto h-6 w-6 text-[#68665F]" />
              <h3 className="mt-4 text-sm font-semibold text-[#E7E4DB]">No encontramos coincidencias</h3>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#77756D]">
                Prueba con otro término o selecciona una materia diferente.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMateria('Todas');
                }}
                className="mt-5 cursor-pointer text-xs font-semibold text-[#C5A640] hover:text-[#E1C35A]"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-xl border border-[#282722] bg-[#121210] px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-[#343229] bg-[#181713] text-[#AD9237]">
            <Bookmark className="h-5 w-5" />
          </div>
          <h2 className="mt-5 text-base font-semibold text-[#F2F0E9]">Tu biblioteca está vacía</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#85837B]">
            Guarda las preguntas que quieras volver a estudiar usando el marcador durante un entrenamiento.
          </p>
          <button
            type="button"
            onClick={onBackToSimulator}
            className="mt-6 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#D4B342] px-4 text-xs font-bold text-[#11110F] hover:bg-[#E0C158]"
          >
            <BookOpen className="h-4 w-4" />
            Ir al simulador
          </button>
        </section>
      )}
    </div>
  );
}
