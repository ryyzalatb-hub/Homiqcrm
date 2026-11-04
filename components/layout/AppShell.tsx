'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CommandPalette from '@/components/layout/CommandPalette';
import AICopilotDrawer from '@/components/ai/AICopilotDrawer';
import { Sparkles } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAiOpen, setIsAiOpen] = useState(false);
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isCustomerPortal = pathname.startsWith('/portal-kpr') || pathname.startsWith('/portal');

  if (isAuthPage || isCustomerPortal) {
    return (
      <main className="min-h-screen w-full bg-[#060913] text-slate-100">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#060913] text-slate-100 relative selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Subtle Architectural Ambient Lighting */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[350px] bg-gradient-to-b from-amber-500/5 via-blue-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-t from-blue-600/5 via-indigo-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-transparent">
          {children}
        </main>
      </div>
      <CommandPalette />

      {/* Floating Global AI Co-Pilot Trigger Button - Ultra-Luxury Champagne Accent */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-[#0D1426] via-[#15203D] to-[#0D1426] text-amber-200 rounded-full shadow-2xl shadow-black/80 hover:scale-105 active:scale-95 transition flex items-center gap-2.5 font-bold text-xs border border-amber-500/30 hover:border-amber-400 group backdrop-blur-xl"
        title="Buka HOMIQ AI Co-Pilot"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/40 group-hover:rotate-12 transition">
          <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
        </div>
        <span className="hidden sm:inline tracking-tight font-display text-white">HOMIQ AI</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          COPILOT v3.5
        </span>
      </button>

      {/* Global AI Copilot Drawer */}
      <AICopilotDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
