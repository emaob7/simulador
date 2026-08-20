import React, { useState } from 'react';
import { AuthService } from '../services/AuthService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  BarChart3, 
  BookOpenCheck, 
  ShieldAlert, 
  Bookmark, 
  Stethoscope,
  Search
} from 'lucide-react';
import { Question } from '../types';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'dashboard' | 'simulator' | 'admin' | 'results' | 'quiz' | 'quiz-config' | 'saved') => void;
  userData: any;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  savedCount?: number;
  onStartBookmarksQuiz?: () => void;
  allQuestions?: Question[];
  onQuestionSelect?: (id: string) => void;
}

export function Sidebar({ 
  currentView, 
  setCurrentView, 
  userData, 
  isOpen, 
  onClose, 
  isCollapsed = false, 
  onToggleCollapse, 
  savedCount = 0,
  onStartBookmarksQuiz,
  allQuestions = [],
  onQuestionSelect
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = searchQuery.trim().length >= 2 
    ? allQuestions.filter(q => 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.subtema && q.subtema.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.tema && q.tema.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  const isSelected = (view: string) => {
    if (view === 'simulator') {
      return ['simulator', 'quiz', 'results', 'quiz-config'].includes(currentView);
    }
    return currentView === view;
  };

  const handleSelectQuestion = (qId: string) => {
    if (onQuestionSelect) {
      onQuestionSelect(qId);
    }
    setSearchQuery('');
    setIsSearchOpen(false);
    onClose();
  };

  const menuContent = (mobileView: boolean = false) => {
    const collapsed = !mobileView && isCollapsed;
    return (
      <aside className={`h-full flex flex-col bg-[#121212] py-5 border-r border-[#2E2E2E] shadow-2xl transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        
        {/* BRAND HEADER */}
        <div className={`px-4 mb-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E0AF26] via-[#C6A84A] to-[#8C6D1F] p-0.5 shadow-[0_0_20px_rgba(198,168,74,0.35)] flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center text-[#E0AF26]">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h1 className="text-base font-black text-[#FFFFFF] tracking-tight font-manrope flex items-center gap-1.5">
                  DR. RODNEY
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#C6A84A]/20 text-[#E0AF26] border border-[#C6A84A]/30 rounded font-bold">2026</span>
                </h1>
                <p className="font-manrope uppercase tracking-widest font-bold text-[9px] text-[#C6A84A]">Simulador CONAREM</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E0AF26] to-[#8C6D1F] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(198,168,74,0.3)]">
              <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center text-[#E0AF26] font-black font-manrope text-xs">
                RD
              </div>
            </div>
          )}

          {/* Desktop Toggle Button */}
          {!mobileView && onToggleCollapse && (
            <button 
              onClick={onToggleCollapse} 
              title={collapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
              className="text-[#A6A6A6] hover:text-[#E0AF26] p-2 rounded-xl bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-[#333333] hover:border-[#C6A84A]/40 transition-all cursor-pointer shadow-sm"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}

          {/* Mobile Close Button */}
          {mobileView && (
            <button onClick={onClose} className="xl:hidden text-[#A6A6A6] hover:text-white p-2 rounded-xl bg-[#1E1E1E] transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        {/* SEARCH BAR (INTEGRATED) */}
        {!collapsed ? (
          <div className="px-4 mb-4 relative">
            <div className="relative flex items-center">
              <input 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#C6A84A] focus:ring-1 focus:ring-[#C6A84A] text-xs py-2 pl-8 pr-7 rounded-xl text-white placeholder:text-gray-500 transition-all outline-none" 
                placeholder="Buscar preguntas..." 
                type="text" 
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-gray-400 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                  className="absolute right-2.5 p-0.5 text-gray-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Search Dropdown in Sidebar */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-4 right-4 top-full mt-1.5 bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                <div className="p-2 border-b border-white/5 bg-[#141414] flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>Resultados ({searchResults.length})</span>
                  <button onClick={() => setIsSearchOpen(false)} className="hover:text-white text-xs">✕</button>
                </div>
                <div className="divide-y divide-white/5">
                  {searchResults.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(q.id)}
                      className="w-full text-left p-3 hover:bg-[#252525] transition-colors flex flex-col gap-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#E0AF26]">
                        <span>{q.materia}</span>
                        <span>•</span>
                        <span className="truncate">{q.subtema}</span>
                      </div>
                      <p className="text-xs text-gray-200 line-clamp-2 leading-snug">
                        {q.text}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="px-2 mb-3 flex justify-center">
            <button
              onClick={onToggleCollapse}
              title="Buscar preguntas"
              className="p-3 rounded-2xl bg-[#181818] border border-[#2E2E2E] hover:border-[#C6A84A]/40 text-gray-400 hover:text-[#E0AF26] transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* NAVIGATION LINKS */}
        <nav className={`flex flex-col gap-1.5 ${collapsed ? 'px-2' : 'px-3'}`}>
          
          {/* 1. Dashboard / Analytics */}
          <button
            onClick={() => { setCurrentView('dashboard'); onClose(); }}
            title={collapsed ? "Analíticas y Rendimiento" : undefined}
            className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3 rounded-2xl' : 'p-3 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
              isSelected('dashboard')
                ? 'bg-[#222222] text-[#E0AF26] border-[#C6A84A]/60 shadow-[0_0_20px_rgba(198,168,74,0.15)]'
                : 'text-[#A6A6A6] border-transparent hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
            }`}
          >
            <BarChart3 className={`w-5 h-5 shrink-0 ${isSelected('dashboard') ? 'text-[#E0AF26]' : 'text-[#A6A6A6]'}`} />
            {!collapsed && (
              <div className="text-left">
                <span className="block text-xs font-black uppercase tracking-wider">Analíticas</span>
                <span className="block text-[10px] text-[#A6A6A6] font-normal">Diagnóstico y Puntos Débiles</span>
              </div>
            )}
          </button>

          {/* 2. Simulator / Questions */}
          <button
            onClick={() => { setCurrentView('simulator'); onClose(); }}
            title={collapsed ? "Simulador de Examen" : undefined}
            className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3 rounded-2xl' : 'p-3 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
              isSelected('simulator')
                ? 'bg-[#222222] text-[#E0AF26] border-[#C6A84A]/60 shadow-[0_0_20px_rgba(198,168,74,0.15)]'
                : 'text-[#A6A6A6] border-transparent hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
            }`}
          >
            <BookOpenCheck className={`w-5 h-5 shrink-0 ${isSelected('simulator') ? 'text-[#E0AF26]' : 'text-[#A6A6A6]'}`} />
            {!collapsed && (
              <div className="text-left">
                <span className="block text-xs font-black uppercase tracking-wider">Simulador</span>
                <span className="block text-[10px] text-[#A6A6A6] font-normal">16 Semanas • 1.507 Preguntas</span>
              </div>
            )}
          </button>

          {/* 3. Bookmarks / Favoritas */}
          <button
            onClick={() => { setCurrentView('saved'); onClose(); }}
            disabled={savedCount === 0}
            title={collapsed ? `Guardadas (${savedCount})` : undefined}
            className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3 rounded-2xl' : 'p-3 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
              isSelected('saved')
                ? 'bg-[#222222] text-[#E0AF26] border-[#C6A84A]/60 shadow-[0_0_20px_rgba(198,168,74,0.15)]'
                : savedCount > 0
                  ? 'text-[#E0AF26] border-[#C6A84A]/20 bg-[#1E1E1E]/60 hover:bg-[#252525]'
                  : 'text-[#A6A6A6] border-transparent opacity-40 pointer-events-none'
            }`}
          >
            <Bookmark className={`w-5 h-5 shrink-0 ${isSelected('saved') ? 'text-[#E0AF26] fill-current' : 'text-[#E0AF26]'}`} />
            {!collapsed && (
              <div className="text-left flex-1 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider">Guardadas</span>
                  <span className="block text-[10px] text-[#A6A6A6] font-normal">Repaso de Favoritas</span>
                </div>
                <span className="px-2 py-0.5 bg-[#C6A84A]/20 text-[#E0AF26] text-[10px] font-black rounded-lg border border-[#C6A84A]/30">
                  {savedCount}
                </span>
              </div>
            )}
          </button>

          {/* 4. Admin */}
          {userData?.role === 'admin' && (
            <button
              onClick={() => { setCurrentView('admin'); onClose(); }}
              title={collapsed ? "Administración" : undefined}
              className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3 rounded-2xl' : 'p-3 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
                isSelected('admin')
                  ? 'bg-[#222222] text-[#E0AF26] border-[#C6A84A]/60 shadow-[0_0_20px_rgba(198,168,74,0.15)]'
                : 'text-[#A6A6A6] border-transparent hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
              }`}
            >
              <ShieldAlert className={`w-5 h-5 shrink-0 ${isSelected('admin') ? 'text-[#E0AF26]' : 'text-[#A6A6A6]'}`} />
              {!collapsed && (
                <div className="text-left">
                  <span className="block text-xs font-black uppercase tracking-wider">Administración</span>
                  <span className="block text-[10px] text-[#A6A6A6] font-normal">Gestión de Usuarios</span>
                </div>
              )}
            </button>
          )}
        </nav>

        {/* BANK STATS SUMMARY PILL */}
        {!collapsed && (
          <div className="mx-3 my-3 p-3 rounded-2xl bg-[#161616] border border-[#2A2A2A] text-left">
            <div className="flex items-center justify-between text-[10px] text-[#A6A6A6] font-bold uppercase tracking-wider mb-1">
              <span>Banco CONAREM</span>
              <span className="text-[#E0AF26] font-black">1.507 Qs</span>
            </div>
            <p className="text-[11px] text-[#D0D0D0] font-normal leading-relaxed">
              Pediatría, Medicina Interna, Cirugía y Gineco-Obstetricia.
            </p>
          </div>
        )}

        {/* USER PROFILE & FOOTER ACTIONS */}
        <div className={`mt-auto space-y-2 ${collapsed ? 'px-2' : 'px-3'}`}>
          
          <div className={`p-2.5 bg-[#181818] rounded-2xl flex items-center ${collapsed ? 'justify-center' : 'gap-3'} border border-[#2A2A2A]`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C6A84A]/40 to-[#1C1C1C] border border-[#C6A84A]/40 overflow-hidden shrink-0 shadow-sm flex items-center justify-center text-[#E0AF26] font-black text-xs font-manrope">
              {userData?.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  alt="avatar" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                (userData?.displayName || 'Dr')[0].toUpperCase()
              )}
            </div>
            {!collapsed && (
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-[#FFFFFF] truncate">{userData?.displayName || 'Dr. Rodney Duarte'}</p>
                <p className="text-[9px] font-bold text-[#C6A84A] tracking-wider uppercase truncate">
                  {userData?.role === 'admin' ? 'Administrador' : 'Aspirante CONAREM'}
                </p>
              </div>
            )}
          </div>

          <button 
            onClick={() => { AuthService.logout(); onClose(); }}
            title={collapsed ? "Cerrar Sesión" : undefined}
            className={`w-full py-2.5 text-[11px] font-bold text-[#A6A6A6] hover:text-[#FFFFFF] hover:bg-[#222222] rounded-xl uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-transparent hover:border-[#333333] cursor-pointer ${collapsed ? 'px-0' : ''}`}
          >
            <LogOut size={15} />
            {!collapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden xl:block fixed left-0 top-0 h-full z-50">
        {menuContent(false)}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] xl:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full z-[70] xl:hidden shadow-2xl"
            >
              {menuContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
