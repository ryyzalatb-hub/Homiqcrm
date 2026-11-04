'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function playNotificationSound(type: ToastType = 'success') {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('homiq_sound_muted') === 'true') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    
    // Gentle non-intrusive volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';

    if (type === 'success') {
      // Pleasant two-tone chime: D5 (587 Hz) -> A5 (880 Hz)
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.32);
    } else if (type === 'warning') {
      osc.frequency.setValueAtTime(440, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'error') {
      osc.frequency.setValueAtTime(293.66, now);
      osc.frequency.setValueAtTime(220, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.28);
    } else {
      osc.frequency.setValueAtTime(739.99, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch {
    // AudioContext blocked or not allowed prior to user gesture
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    playNotificationSound(type);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          let bgColor = 'bg-slate-900 text-white border-slate-700';
          let Icon = Info;
          let iconColor = 'text-blue-400';

          if (toast.type === 'success') {
            bgColor = 'bg-emerald-950/95 text-emerald-100 border-emerald-600/60';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'error') {
            bgColor = 'bg-rose-950/95 text-rose-100 border-rose-600/60';
            Icon = XCircle;
            iconColor = 'text-rose-400';
          } else if (toast.type === 'warning') {
            bgColor = 'bg-amber-950/95 text-amber-100 border-amber-600/60';
            Icon = AlertCircle;
            iconColor = 'text-amber-400';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${bgColor}`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 text-xs font-medium leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
