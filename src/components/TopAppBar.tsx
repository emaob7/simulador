import React, { useState } from 'react';
import { 
  Menu, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search, 
  Bookmark, 
  Sparkles, 
  RotateCcw,
  X,
  ArrowRight
} from 'lucide-react';
import { Question } from '../types';

interface TopAppBarProps {
  title: string;
  userData?: any;
  isSidebarCollapsed?: boolean;
  onToggleSidebar: () => void;
  savedCount?: number;
  onStartBookmarks?: () => void;
  allQuestions?: Question[];
  onQuestionSelect?: (id: string) => void;
}

export function TopAppBar({ 
  title, 
  userData, 
  isSidebarCollapsed = false,
  onToggleSidebar,
  savedCount = 0,
  onStartBookmarks,
  allQuestions = [],
  onQuestionSelect
}: TopAppBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = searchQuery.trim().length >= 2 
    ? allQuestions.filter(q => 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.subtema && q.subtema.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.tema && q.tema.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <header className="w-full h-16 sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 border-b border-white/10 transition-all duration-300">
      
      {/* LEFT: TOGGLE BUTTON & TITLE */}
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        {/* Toggle Button for Sidebar (Always Active & Visible) */}
        <button 
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/20 text-[#A0A0A0] hover:text-primary border border-white/10 hover:border-primary/40 transition-all duration-200 cursor-pointer flex items-center gap-2 group shadow-sm shrink-0"
          title={isSidebarCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <PanelLeftClose className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider text-[#A0A0A0] group-hover:text-primary">
            Menú
          </span>
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 hidden sm:block"></span>
          <span className="text-white font-manrope font-extrabold text-sm md:text-base truncate">
            {title}
          </span>
        </div>
      </div>

      {/* RIGHT: SEARCH, BOOKMARKS & PROFILE */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Functional Search Bar */}
        <div className="relative">
          <div className="relative flex items-center">
            <input 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="bg-[#141824] border border-white/10 focus:border-primary/60 focus:ring-1 focus:ring-primary text-xs py-2 pl-9 pr-8 w-36 sm:w-56 md:w-72 rounded-xl text-white placeholder:text-[#A0A0A0] transition-all outline-none shadow-inner" 
              placeholder="Buscar en 1.507 preguntas..." 
              type="text" 
            />
            <Search className="w-4 h-4 absolute left-3 text-[#A0A0A0] pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                className="absolute right-2.5 p-0.5 text-[#A0A0A0] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#141824] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 flex justify-between items-center border-b border-white/10 text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">
                <span>Resultados encontrados ({searchResults.length})</span>
                <button onClick={() => setIsSearchOpen(false)} className="hover:text-white">Cerrar</button>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {searchResults.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      if (onQuestionSelect) {
                        onQuestionSelect(q.id);
                      }
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-2.5 rounded-xl hover:bg-white/10 text-left transition-all flex flex-col gap-1 cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center justify-between text-[10px] text-primary font-bold">
                      <span>Semana {q.semana} • {q.materia}</span>
                      <span className="text-white/40">ID: {q.id}</span>
                    </div>
                    <p className="text-xs text-white line-clamp-2 font-medium">
                      {q.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Saved Questions Shortcut */}
        {onStartBookmarks && (
          <button 
            onClick={onStartBookmarks}
            disabled={savedCount === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              savedCount > 0 
                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                : 'bg-white/5 text-[#A0A0A0] border-white/10 opacity-60 pointer-events-none'
            }`}
            title="Repasar preguntas guardadas"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Guardadas</span>
            <span className="px-1.5 py-0.2 bg-amber-500/20 rounded-md text-[10px] font-black">
              {savedCount}
            </span>
          </button>
        )}

        {/* User Profile Avatar / Badge */}
        {userData && (
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/30 to-[#141824] border border-primary/40 overflow-hidden shrink-0 shadow-md flex items-center justify-center text-primary font-black text-xs font-manrope">
              {userData.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  alt="Perfil" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                (userData.displayName || 'Dr')[0].toUpperCase()
              )}
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <p className="text-xs font-bold text-white truncate max-w-[120px]">
                {userData.displayName || 'Dr. Rodney'}
              </p>
              <p className="text-[9px] font-bold text-primary uppercase tracking-widest">
                {userData.role === 'admin' ? 'Admin' : 'Aspirante'}
              </p>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
