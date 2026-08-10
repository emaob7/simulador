import React from 'react';
import { Menu } from 'lucide-react';

interface TopAppBarProps {
  title: string;
  userData?: any;
  onMenuClick: () => void;
}

export function TopAppBar({ title, userData, onMenuClick }: TopAppBarProps) {
  return (
    <header className="w-full h-16 sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md flex justify-between items-center px-4 md:px-8 border-b border-white/5 transition-all duration-300">
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        <button 
          onClick={onMenuClick}
          className="xl:hidden p-2 text-[#A0A0A0] hover:text-white transition-colors duration-300"
        >
          <Menu size={24} />
        </button>
        <span className="text-on-surface font-manrope font-bold text-base md:text-lg truncate">{title}</span>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative group hidden lg:block">
          <input 
            className="bg-[#121212]/50 border border-white/5 focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2 pl-4 pr-10 w-48 xl:w-64 rounded-xl text-on-surface placeholder:text-[#A0A0A0] transition-all focus:w-64 xl:focus:w-80 outline-none shadow-inner" 
            placeholder="Buscar..." 
            type="text" 
          />
          <span translate="no" className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] text-lg">search</span>
        </div>
        <div className="flex items-center gap-1 md:gap-4">
          <button className="p-2 text-[#A0A0A0] hover:text-primary transition-colors duration-300">
            <span translate="no" className="material-symbols-outlined text-xl md:text-2xl">notifications</span>
          </button>
          <button className="hidden sm:block p-2 text-[#A0A0A0] hover:text-primary transition-colors duration-300">
            <span translate="no" className="material-symbols-outlined text-xl md:text-2xl">settings</span>
          </button>
          {userData && (
            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0 ml-1 shadow-sm">
              <img 
                src={userData.photoURL || 'https://via.placeholder.com/40'} 
                alt="Perfil" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

