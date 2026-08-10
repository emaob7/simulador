import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { Button } from '../../components/ui/Button';

export function LoginView() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bypassPassword, setBypassPassword] = useState('');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.loginWithGoogle();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypass = () => {
    if (bypassPassword === 'Abe33554') {
        localStorage.setItem('dr_rodney_guest_user', JSON.stringify({
            uid: 'guest_admin',
            email: 'admin@rodney.com',
            displayName: 'Administrador',
            isApproved: true,
            role: 'admin'
        }));
        window.location.reload();
    } else {
        setError('Contraseña incorrecta');
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-[#121212]/50 backdrop-blur-md p-10 rounded-3xl border border-white/5 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
        <h1 className="text-3xl font-black text-primary tracking-tighter font-manrope mb-2">DR. RODNEY</h1>
        <p className="font-manrope uppercase tracking-widest font-bold text-[10px] text-[#A0A0A0] mb-10">Preparación Estratégica CONAREM</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-950/20 border border-red-500/20 rounded-xl text-red-400 text-xs text-left">
            <p className="font-bold mb-1">Error de conexión:</p>
            <p>{error}</p>
          </div>
        )}

        <Button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-6 bg-white text-black hover:bg-neutral-100 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50 mb-4 rounded-xl border border-transparent shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Ingresar con Google
            </>
          )}
        </Button>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-[9px] text-[#A0A0A0] uppercase tracking-widest mb-3">Acceso de emergencia</p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Contraseña"
              value={bypassPassword}
              onChange={(e) => setBypassPassword(e.target.value)}
              className="bg-[#121212]/50 border border-white/5 shadow-inner rounded-xl px-4 py-3 text-xs w-full text-white placeholder-[#A0A0A0] focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
            <Button
              onClick={handleBypass}
              variant="outline"
              className="px-4 py-3 text-[10px] font-bold text-white bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
