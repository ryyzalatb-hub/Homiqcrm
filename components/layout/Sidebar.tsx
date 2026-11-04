'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  UserCheck2,
  Kanban, 
  CalendarClock, 
  Home, 
  Users2,
  MapPinCheck, 
  BadgeCheck, 
  BarChart3, 
  Calculator, 
  FileCheck, 
  Settings, 
  X, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  HardHat,
  Map,
  Camera,
  Navigation,
  Target,
  Smartphone
} from 'lucide-react';
import { useMobileNav } from './MobileNavContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'CORE PLATFORM',
    items: [
      { label: 'Overview Dashboard', href: '/', icon: LayoutDashboard },
      { label: 'AI Co-Pilot & Studio', href: '/ai-copilot', icon: Sparkles, badge: 'AI v3.0', badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
      { label: 'Interactive Siteplan', href: '/siteplan', icon: Map, badge: 'Anti-Double', badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
      { label: 'Lead Scoring Matrix', href: '/lead-scoring', icon: Target, badge: 'Smart', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
    ]
  },
  {
    title: 'SALES & CRM',
    items: [
      { label: 'Leads Database', href: '/leads', icon: Users, badge: '50', badgeColor: 'bg-slate-800 text-slate-300' },
      { label: 'Follow-up Harian', href: '/follow-ups', icon: CalendarClock, badge: '8 Hari ini', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
      { label: 'Sales Pipeline', href: '/pipeline', icon: Kanban, badge: '7 Tahap', badgeColor: 'bg-blue-900/60 text-blue-300' },
      { label: 'WhatsApp Center', href: '/whatsapp-center', icon: MessageSquare, badge: 'wa.me', badgeColor: 'bg-emerald-900/60 text-emerald-300' },
    ]
  },
  {
    title: 'PROPERTI & OPERASIONAL',
    items: [
      { label: 'Galeri & Show Unit', href: '/gallery', icon: Camera, badge: '4K', badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
      { label: 'Projects & Units', href: '/projects', icon: Home },
      { label: 'Peta & Lokasi Garut', href: '/map-explorer', icon: Navigation },
      { label: 'Progres Konstruksi', href: '/construction', icon: HardHat, badge: 'Kurva S', badgeColor: 'bg-amber-900/60 text-amber-300' },
      { label: 'Survei Lokasi', href: '/site-visits', icon: MapPinCheck },
    ]
  },
  {
    title: 'TRANSAKSI & KPR',
    items: [
      { label: 'Bookings & Transaksi', href: '/bookings', icon: BadgeCheck },
      { label: 'Kalkulator KPR & SLIK', href: '/kpr-calculator', icon: Calculator, badge: 'Simulasi', badgeColor: 'bg-amber-900/60 text-amber-300' },
      { label: 'Data Pelanggan', href: '/customers', icon: UserCheck2, badge: '31', badgeColor: 'bg-slate-800 text-slate-300' },
      { label: 'Dokumen & Kontrak', href: '/documents', icon: FileCheck, badge: 'SPK/PPJB', badgeColor: 'bg-indigo-900/60 text-indigo-300' },
      { label: 'Portal Mandiri KPR', href: '/portal-kpr', icon: Smartphone, badge: 'Konsumen', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
    ]
  },
  {
    title: 'MANAJEMEN DEVELOPER',
    items: [
      { label: 'Tim Marketing & Komisi', href: '/team', icon: Users2 },
      { label: 'Reports & Analitik', href: '/analytics', icon: BarChart3 },
      { label: 'Pengaturan Developer', href: '/settings', icon: Settings },
      { label: 'Platform Super Admin', href: '/super-admin', icon: ShieldCheck, badge: 'Multi-Tenant', badgeColor: 'bg-purple-900/60 text-purple-300' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileNav();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#080C1A] text-slate-300 border-r border-[#1B2338] select-none">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#1B2338] shrink-0 bg-[#080C1A]">
        <Link href="/" onClick={close} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-base tracking-tight leading-none">
                HOMIQ
              </span>
              <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                PROPTECH OS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">
              PT Garut Sejahtera Propertindo
            </p>
          </div>
        </Link>
        
        {/* Mobile close button */}
        <button 
          onClick={close}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition"
          aria-label="Tutup Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
        {navSections.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold font-mono uppercase tracking-wider text-slate-500">
              {sec.title}
            </div>

            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition group ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#12192F]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Developer Profile Footer */}
      <div className="p-3.5 border-t border-[#1B2338] bg-[#070A16] shrink-0">
        <Link href="/settings" onClick={close} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#12192F] transition group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-900 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
            MR
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate block">
                MUHAMMAD RIZAL
              </span>
            </div>
            <span className="text-[10px] text-amber-400 block font-mono truncate">
              Direktur Utama
            </span>
          </div>
          <Settings className="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0" />
        </Link>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="w-64 shrink-0 hidden md:block h-screen sticky top-0 z-30 print:hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fadeIn print:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
            onClick={close} 
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
