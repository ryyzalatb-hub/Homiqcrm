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
      <main className="min-h-screen w-full bg-[#F8FAFC]">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#F1F5F9] relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#F1F5F9]">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F1F5F9]">
          {children}
        </main>
      </div>
      <CommandPalette />

      {/* Floating Global AI Co-Pilot Trigger Button */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-full shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition flex items-center gap-2.5 font-bold text-xs border border-white/20 group"
        title="Buka HOMIQ AI Co-Pilot"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </div>
        <span className="hidden sm:inline tracking-tight">HOMIQ AI</span>
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/20 text-blue-100">
          v3.0
        </span>
      </button>

      {/* Global AI Copilot Drawer */}
      <AICopilotDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
