import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught React Error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-[#1C1C1C] border border-red-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-red-400">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-xl font-black font-manrope">Se detectó una excepción en la vista</h2>
            </div>
            
            <p className="text-sm text-neutral-300">
              {this.state.error?.message || "Ocurrió un error inesperado al renderizar el componente."}
            </p>

            {this.state.error?.stack && (
              <pre className="p-4 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-red-300 overflow-x-auto max-h-48 whitespace-pre-wrap">
                {this.state.error.stack}
              </pre>
            )}

            <div className="flex gap-4 pt-2">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  window.location.reload();
                }}
                className="bg-primary text-black font-bold px-6 py-3 rounded-xl hover:bg-primary/90"
              >
                Recargar Aplicación
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('dr_rodney_guest_user');
                  window.location.href = '/';
                }}
                className="border-white/10 text-neutral-400 hover:text-white"
              >
                Volver al Inicio
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
