import React from 'react';
import { AuthService } from '../services/AuthService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  RotateCcw,
  BarChart3,
  BookOpenCheck,
  ShieldAlert,
  Bookmark,
  Stethoscope
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'dashboard' | 'simulator' | 'admin' | 'results' | 'quiz' | 'quiz-config' | 'saved') => void;
  userData: any;
  onResetData: () => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  savedCount?: number;
  onStartBookmarksQuiz?: () => void;
}

export function Sidebar({ 
  currentView, 
  setCurrentView, 
  userData, 
  onResetData, 
  isOpen, 
  onClose,
  isCollapsed = false,
  onToggleCollapse,
  savedCount = 0,
  onStartBookmarksQuiz
}: SidebarProps) {
  const isSelected = (view: string) => {
    if (view === 'simulator') {
      return ['simulator', 'quiz', 'results', 'quiz-config'].includes(currentView);
    }
    return currentView === view;
  };

  const menuContent = (mobileView: boolean = false) => {
    const collapsed = !mobileView && isCollapsed;
    return (
      <aside className={`h-full flex flex-col bg-[#121212] py-6 border-r border-[#424242] shadow-2xl transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        
        {/* BRAND HEADER */}
        <div className={`px-5 mb-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E0AF26] via-[#C6A84A] to-[#8C6D1F] p-0.5 shadow-[0_0_20px_rgba(198,168,74,0.35)] flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center text-[#E0AF26]">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-black text-[#FFFFFF] tracking-tight font-manrope flex items-center gap-1.5">
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
              className="text-[#A6A6A6] hover:text-[#E0AF26] p-2 rounded-xl bg-[#2E2E2E] hover:bg-[#2E2E2E]/80 border border-[#424242] hover:border-[#C6A84A]/40 transition-all cursor-pointer shadow-sm"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}

          {/* Mobile Close Button */}
          {mobileView && (
            <button onClick={onClose} className="xl:hidden text-[#A6A6A6] hover:text-white p-2 rounded-xl bg-[#2E2E2E] transition-colors duration-300">
              <X size={18} />
            </button>
          )}
        </div>

        {/* NAVIGATION LINKS */}
        <nav className={`flex flex-col gap-2 ${collapsed ? 'px-2' : 'px-4'}`}>
          
          {/* 1. Dashboard / Analytics */}
          <button
            onClick={() => { setCurrentView('dashboard'); onClose(); }}
            title={collapsed ? "Analíticas y Rendimiento" : undefined}
            className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3.5 rounded-2xl' : 'p-3.5 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
              isSelected('dashboard')
                ? 'bg-[#2E2E2E] text-[#E0AF26] border-[#C6A84A] shadow-[0_0_20px_rgba(198,168,74,0.2)]'
                : 'text-[#A6A6A6] border-transparent hover:text-[#FFFFFF] hover:bg-[#2E2E2E]/50'
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
            className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3.5 rounded-2xl' : 'p-3.5 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
              isSelected('simulator')
                ? 'bg-[#2E2E2E] text-[#E0AF26] border-[#C6A84A] shadow-[0_0_20px_rgba(198,168,74,0.2)]'
                : 'text-[#A6A6A6] border-transparent hover:text-[#FFFFFF] hover:bg-[#2E2E2E]/50'
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
            className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3.5 rounded-2xl' : 'p-3.5 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
              isSelected('saved')
                ? 'bg-[#2E2E2E] text-[#E0AF26] border-[#C6A84A] shadow-[0_0_20px_rgba(198,168,74,0.2)]'
                : savedCount > 0
                  ? 'text-[#E0AF26] border-[#C6A84A]/30 bg-[#2E2E2E]/60 hover:bg-[#2E2E2E]/90'
                  : 'text-[#A6A6A6] border-transparent opacity-50 pointer-events-none'
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
              className={`flex items-center gap-3.5 ${collapsed ? 'justify-center p-3.5 rounded-2xl' : 'p-3.5 rounded-2xl'} font-bold transition-all duration-200 cursor-pointer border ${
                isSelected('admin')
                  ? 'bg-[#2E2E2E] text-[#E0AF26] border-[#C6A84A] shadow-[0_0_20px_rgba(198,168,74,0.2)]'
                  : 'text-[#A6A6A6] border-transparent hover:text-[#FFFFFF] hover:bg-[#2E2E2E]/50'
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
          <div className="mx-4 my-2 p-3.5 rounded-2xl bg-[#1C1C1C] border border-[#424242] text-left">
            <div className="flex items-center justify-between text-[10px] text-[#A6A6A6] font-bold uppercase tracking-wider mb-1">
              <span>Banco CONAREM</span>
              <span className="text-[#E0AF26] font-black">1.507 Qs</span>
            </div>
            <p className="text-[11px] text-[#FAF9F6] font-medium leading-relaxed">
              4 Especialidades: Pediatría, Medicina Interna, Cirugía y Gineco.
            </p>
          </div>
        )}

        {/* USER PROFILE & FOOTER ACTIONS */}
        <div className={`mt-auto space-y-3 ${collapsed ? 'px-2' : 'px-4'}`}>
          
          <div className={`p-3 bg-[#2E2E2E] rounded-2xl flex items-center ${collapsed ? 'justify-center' : 'gap-3'} border border-[#424242]`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C6A84A]/40 to-[#1C1C1C] border border-[#C6A84A]/40 overflow-hidden shrink-0 shadow-sm flex items-center justify-center text-[#E0AF26] font-black text-xs font-manrope">
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
                <p className="text-[10px] font-bold text-[#C6A84A] tracking-wider uppercase truncate">
                  {userData?.role === 'admin' ? 'Administrador' : 'Aspirante CONAREM'}
                </p>
              </div>
            )}
          </div>

          <button 
            onClick={() => { onResetData(); onClose(); }}
            title={collapsed ? "Restaurar Datos" : undefined}
            className={`w-full py-2.5 text-[11px] font-bold text-rose-400 hover:text-white bg-rose-950/20 hover:bg-rose-600 border border-rose-500/30 rounded-xl uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${collapsed ? 'px-0' : ''}`}
          >
            <RotateCcw size={15} />
            {!collapsed && <span>Restaurar Datos</span>}
          </button>

          <button 
            onClick={() => { AuthService.logout(); onClose(); }}
            title={collapsed ? "Cerrar Sesión" : undefined}
            className={`w-full py-2.5 text-[11px] font-bold text-[#A6A6A6] hover:text-[#FFFFFF] hover:bg-[#2E2E2E] rounded-xl uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-transparent hover:border-[#424242] cursor-pointer ${collapsed ? 'px-0' : ''}`}
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
