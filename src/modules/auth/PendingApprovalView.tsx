import React from 'react';
import { AuthService } from '../../services/AuthService';
import { Button } from '../../components/ui/Button';

export function PendingApprovalView({ isRejected = false }: { isRejected?: boolean }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-surface-container-low p-10 rounded-3xl border border-white/5 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${isRejected ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent' : 'bg-gradient-to-r from-transparent via-primary to-transparent'} opacity-50`}></div>
        <div className={`w-16 h-16 ${isRejected ? 'bg-red-500/10 text-red-400' : 'bg-primary/10 text-primary'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <span translate="no" className="material-symbols-outlined text-3xl">
            {isRejected ? 'block' : 'hourglass_empty'}
          </span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tighter mb-4">
          {isRejected ? 'Solicitud Rechazada' : 'Cuenta en Revisión'}
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          {isRejected
            ? 'Tu solicitud de acceso no ha sido aprobada por el administrador. Si crees que se trata de un error o deseas inscribirte al curso, comunícate directamente con el Dr. Rodney.'
            : 'Tu cuenta ha sido registrada exitosamente, pero requiere la aprobación del administrador (Dr. Rodney) para acceder al simulador.'}
        </p>
        <Button 
          onClick={() => AuthService.logout()}
          variant="outline"
          className="w-full py-4 border-white/10 text-zinc-400 hover:text-white"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
