import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { Button } from '../../components/ui/Button';

export function LoginView() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.loginWithGoogle();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0A] text-[#F4F2EC] lg:grid lg:grid-cols-[minmax(430px,44%)_1fr]">
      <section className="relative z-10 flex min-h-screen flex-col border-r border-white/[0.06] bg-[#10100F] px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <header className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          <div>
            <p className="font-manrope text-sm font-extrabold tracking-[0.12em] text-primary">DR. RODNEY</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#77766F]">
              Preparación estratégica CONAREM
            </p>
          </div>
        </header>

        <div className="my-auto w-full max-w-[460px] py-16 lg:py-12">
          <h1 className="font-serif text-4xl font-normal leading-tight tracking-[-0.02em] text-[#F4F2EC] sm:text-5xl">
            Bienvenido <span className="text-primary">de nuevo</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#8F8D84]">
            Enfócate. Prepárate. Alcanza tu residencia.
          </p>

          {error && (
            <div role="alert" className="mt-8 rounded-lg border border-red-500/20 bg-red-950/20 p-4 text-left text-xs text-red-300">
              <p className="font-semibold">No pudimos iniciar la sesión</p>
              <p className="mt-1 text-red-300/80">{error}</p>
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="mt-9 h-14 w-full gap-3 rounded-lg border border-black/10 bg-white px-5 text-sm font-semibold normal-case tracking-normal text-[#171715] shadow-none transition-colors hover:translate-y-0 hover:bg-[#F1F0EC] disabled:opacity-60"
          >
            {isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" aria-label="Iniciando sesión" />
            ) : (
              <>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt=""
                  className="h-5 w-5"
                />
                Continuar con Google
              </>
            )}
          </Button>

          <p className="mt-5 text-center text-[11px] leading-5 text-[#686760]">
            Usaremos tu cuenta únicamente para guardar tu avance y tus preguntas favoritas.
          </p>
        </div>

        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#5F5E58]">
          <span>© 2026 Dr. Rodney</span>
          <span aria-hidden="true">•</span>
          <span>Preparación médica de alto rendimiento</span>
        </footer>
      </section>

      <aside className="relative hidden min-h-screen overflow-hidden bg-[#0B0B0A] lg:block" aria-label="Ambiente de estudio médico">
        <img
          src="/assets/login-medical-study.png"
          alt="Escritorio de estudio con libros médicos y un texto de anatomía abierto"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </aside>
    </main>
  );
}
