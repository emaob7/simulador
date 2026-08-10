import React from 'react';
import { AuthService } from '../services/AuthService';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, LogOut, RotateCcw } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'dashboard' | 'simulator' | 'admin' | 'results' | 'quiz' | 'quiz-config') => void;
  userData: any;
  onResetData: () => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ 
  currentView, 
  setCurrentView, 
  userData, 
  onResetData, 
  isOpen, 
  onClose,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const isSelected = (view: string) => {
    if (view === 'simulator') {
      return ['simulator', 'quiz', 'results', 'quiz-config'].includes(currentView);
    }
    return currentView === view;
  };

  const renderNavButton = (view: 'dashboard' | 'simulator' | 'admin', icon: string, label: string) => {
    const selected = isSelected(view);
    return (
      <button 
        key={view}
        onClick={() => { setCurrentView(view); onClose(); }}
        title={isCollapsed ? label : undefined}
        className={`flex items-center gap-4 ${isCollapsed ? 'px-0 justify-center h-12 w-12 mx-auto rounded-xl' : 'px-8 py-4 rounded-r-lg'} font-bold font-manrope uppercase tracking-widest text-xs transition-all duration-300 ${
          isCollapsed ? '' : 'border-l-2'
        } ${
          selected 
            ? 'text-primary bg-primary/15 border-primary shadow-[0_0_20px_rgba(198,168,74,0.15)]' 
            : 'text-[#A0A0A0] border-transparent hover:text-white hover:bg-white/5'
        }`}
      >
        <span translate="no" className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0" }}>
          {icon}
        </span>
        {!isCollapsed && <span>{label}</span>}
      </button>
    );
  };

  const menuContent = (mobileView: boolean = false) => {
    const collapsed = !mobileView && isCollapsed;
    return (
      <aside className={`h-full flex flex-col bg-[#121212]/95 backdrop-blur-md py-6 gap-4 border-r border-white/5 shadow-2xl transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        <div className={`px-6 mb-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <div>
              <h1 className="text-xl font-black text-primary tracking-tighter font-manrope leading-none">DR. RODNEY</h1>
              <p className="font-manrope uppercase tracking-widest font-bold text-[10px] text-primary mt-1">Preparación Estratégica</p>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black font-manrope text-sm shadow-[0_0_15px_rgba(198,168,74,0.2)]">
              DR
            </div>
          )}

          {/* Desktop Toggle Button */}
          {!mobileView && onToggleCollapse && (
            <button 
              onClick={onToggleCollapse} 
              title={collapsed ? "Expandir menú" : "Plegar menú"}
              className="text-[#A0A0A0] hover:text-primary p-1.5 rounded-lg hover:bg-white/5 transition-all"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}

          {/* Mobile Close Button */}
          {mobileView && (
            <button onClick={onClose} className="xl:hidden text-[#A0A0A0] hover:text-white p-1 transition-colors duration-300">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className={`flex flex-col gap-1.5 ${collapsed ? 'px-2' : 'pr-4'}`}>
          {renderNavButton('dashboard', 'analytics', 'Analíticas')}
          {renderNavButton('simulator', 'clinical_notes', 'Simulador')}
          {userData?.role === 'admin' && renderNavButton('admin', 'admin_panel_settings', 'Admin')}
        </nav>

        <div className={`mt-auto space-y-3 ${collapsed ? 'px-3' : 'px-6'}`}>
          <div className={`p-3 bg-white/5 rounded-xl flex items-center ${collapsed ? 'justify-center' : 'gap-3'} border border-white/5 backdrop-blur-sm`}>
            <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden shrink-0 shadow-sm">
              <img 
                src={userData?.photoURL || 'https://via.placeholder.com/40'} 
                alt="avatar" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            {!collapsed && (
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-bold text-primary tracking-widest uppercase truncate">{userData?.role === 'admin' ? 'Administrador' : 'Aspirante CONAREM'}</p>
                <p className="text-sm font-bold text-on-surface truncate">{userData?.displayName || 'Médico'}</p>
              </div>
            )}
          </div>

          <button 
            onClick={() => { onResetData(); onClose(); }}
            title={collapsed ? "Restaurar Datos" : undefined}
            className={`w-full py-2.5 text-xs font-bold text-red-400 hover:text-white bg-red-950/20 hover:bg-red-600 border border-red-500/20 hover:border-red-500 rounded-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${collapsed ? 'px-0' : ''}`}
          >
            <RotateCcw size={16} />
            {!collapsed && <span>Restaurar Datos</span>}
          </button>

          <button 
            onClick={() => { AuthService.logout(); onClose(); }}
            title={collapsed ? "Cerrar Sesión" : undefined}
            className={`w-full py-2.5 text-xs font-bold text-[#A0A0A0] hover:text-white hover:bg-white/5 rounded-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-transparent hover:border-white/5 ${collapsed ? 'px-0' : ''}`}
          >
            <LogOut size={16} />
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden"
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


