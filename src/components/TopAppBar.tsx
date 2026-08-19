import React, { useState } from 'react';
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search, 
  Bookmark, 
  X
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
    <header className="w-full h-16 sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 border-b border-[#424242] transition-all duration-300">
      
      {/* LEFT: TOGGLE BUTTON & TITLE */}
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        {/* Toggle Button for Sidebar (Always Active & Visible) */}
        <button 
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl bg-[#2E2E2E] hover:bg-[#2E2E2E]/80 text-[#A6A6A6] hover:text-[#E0AF26] border border-[#424242] hover:border-[#C6A84A]/40 transition-all duration-200 cursor-pointer flex items-center gap-2 group shadow-sm shrink-0"
          title={isSidebarCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform text-[#E0AF26]" />
          ) : (
            <PanelLeftClose className="w-5 h-5 group-hover:scale-110 transition-transform text-[#E0AF26]" />
          )}
          <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider text-[#A6A6A6] group-hover:text-[#E0AF26]">
            Menú
          </span>
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#C6A84A] animate-pulse shrink-0 hidden sm:block"></span>
          <span className="text-[#FFFFFF] font-manrope font-extrabold text-sm md:text-base truncate">
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
              className="bg-[#1C1C1C] border border-[#424242] focus:border-[#C6A84A] focus:ring-1 focus:ring-[#C6A84A] text-xs py-2 pl-9 pr-8 w-36 sm:w-56 md:w-72 rounded-xl text-[#FFFFFF] placeholder:text-[#A6A6A6] transition-all outline-none shadow-inner" 
              placeholder="Buscar en 1.507 preguntas..." 
              type="text" 
            />
            <Search className="w-4 h-4 absolute left-3 text-[#A6A6A6] pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                className="absolute right-2.5 p-0.5 text-[#A6A6A6] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#2E2E2E] border border-[#424242] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 flex justify-between items-center border-b border-[#424242] text-[10px] font-bold text-[#A6A6A6] uppercase tracking-wider">
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
                    className="p-2.5 rounded-xl hover:bg-[#1C1C1C] text-left transition-all flex flex-col gap-1 cursor-pointer border border-transparent hover:border-[#424242]"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#E0AF26] font-bold">
                      <span>Semana {q.semana} • {q.materia}</span>
                      <span className="text-[#A6A6A6]">ID: {q.id}</span>
                    </div>
                    <p className="text-xs text-[#FFFFFF] line-clamp-2 font-medium">
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
                ? 'bg-[#2E2E2E] hover:bg-[#2E2E2E]/80 text-[#E0AF26] border-[#C6A84A]/40 shadow-[0_0_15px_rgba(198,168,74,0.15)]' 
                : 'bg-[#2E2E2E] text-[#A6A6A6] border-[#424242] opacity-60 pointer-events-none'
            }`}
            title="Repasar preguntas guardadas"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Guardadas</span>
            <span className="px-1.5 py-0.2 bg-[#C6A84A]/20 rounded-md text-[10px] font-black border border-[#C6A84A]/30">
              {savedCount}
            </span>
          </button>
        )}

        {/* User Profile Avatar / Badge */}
        {userData && (
          <div className="flex items-center gap-2 pl-2 border-l border-[#424242]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C6A84A]/40 to-[#1C1C1C] border border-[#C6A84A]/40 overflow-hidden shrink-0 shadow-md flex items-center justify-center text-[#E0AF26] font-black text-xs font-manrope">
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
              <p className="text-xs font-bold text-[#FFFFFF] truncate max-w-[120px]">
                {userData.displayName || 'Dr. Rodney'}
              </p>
              <p className="text-[9px] font-bold text-[#C6A84A] uppercase tracking-widest">
                {userData.role === 'admin' ? 'Admin' : 'Aspirante'}
              </p>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
