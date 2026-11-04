'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CommandPalette from '@/components/layout/CommandPalette';
import AICopilotDrawer from '@/components/ai/AICopilotDrawer';
import DraggableAIFab from '@/components/ai/DraggableAIFab';

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

      {/* Floating Draggable HOMIQ AI Trigger Orb - Ultra-Luxury Compact */}
      <DraggableAIFab onOpen={() => setIsAiOpen(true)} />

      {/* Global AI Copilot Drawer */}
      <AICopilotDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
