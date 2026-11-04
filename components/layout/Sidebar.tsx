'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  Kanban, 
  BadgeCheck, 
  Calculator, 
  UserCheck2, 
  FileCheck, 
  MapPinCheck, 
  BarChart3, 
  Settings, 
  Building2, 
  Home, 
  Users2, 
  X, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  HardHat,
  Map,
  Camera,
  Navigation,
  Target,
  Smartphone,
  PenTool,
  BookOpen
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
      { label: 'AI Co-Pilot & Studio', href: '/ai-copilot', icon: Sparkles, badge: 'AI v3.5', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
      { label: 'Interactive Siteplan', href: '/siteplan', icon: Map, badge: 'Instant QRIS', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
      { label: 'Lead Scoring Matrix', href: '/lead-scoring', icon: Target, badge: 'Smart', badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
    ]
  },
  {
    title: 'SALES & CRM',
    items: [
      { label: 'Leads Database', href: '/leads', icon: Users, badge: '50 Leads', badgeColor: 'bg-slate-800 text-slate-300' },
      { label: 'Follow-up Harian', href: '/follow-ups', icon: CalendarClock, badge: '8 Hari ini', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
      { label: 'Sales Pipeline', href: '/pipeline', icon: Kanban, badge: '7 Tahap', badgeColor: 'bg-blue-900/60 text-blue-300' },
      { label: 'WhatsApp Automation', href: '/whatsapp-center', icon: MessageSquare, badge: 'Drip Engine', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
    ]
  },
  {
    title: 'PROPERTI & ARSITEKTUR',
    items: [
      { label: 'Galeri & Virtual 360°', href: '/gallery', icon: Camera, badge: '360° VR', badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
      { label: 'Projects & Units', href: '/projects', icon: Home },
      { label: 'Peta & Radius Garut', href: '/map-explorer', icon: Navigation },
      { label: 'Progres Konstruksi', href: '/construction', icon: HardHat, badge: 'Kurva S', badgeColor: 'bg-amber-900/60 text-amber-300' },
      { label: 'Survei Lokasi', href: '/site-visits', icon: MapPinCheck },
    ]
  },
  {
    title: 'TRANSAKSI & LEGALITAS',
    items: [
      { label: 'SPK & E-Signature', href: '/spk-digital', icon: PenTool, badge: 'Legal E-Sign', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
      { label: 'Bookings & Transaksi', href: '/bookings', icon: BadgeCheck, badge: 'QRIS Active', badgeColor: 'bg-emerald-900/60 text-emerald-300' },
      { label: 'Kalkulator All-in KPR', href: '/kpr-calculator', icon: Calculator, badge: 'BPHTB/AJB', badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
      { label: 'Data Pelanggan', href: '/customers', icon: UserCheck2, badge: '31', badgeColor: 'bg-slate-800 text-slate-300' },
      { label: 'Dokumen & Kontrak', href: '/documents', icon: FileCheck },
      { label: 'Portal Mandiri KPR', href: '/portal-kpr', icon: Smartphone, badge: 'Konsumen', badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
    ]
  },
  {
    title: 'DIREKSI & INVESTOR',
    items: [
      { label: 'Dossier Eksekutif A4', href: '/dossier', icon: BookOpen, badge: 'Majalah PDF', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
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
    <div className="flex flex-col h-full bg-[#070B16] text-slate-300 border-r border-[#19243C] select-none">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#19243C] shrink-0 bg-[#070B16]">
        <Link href="/" onClick={close} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <Building2 className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-tight leading-none font-display">
                HOMIQ
              </span>
              <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ULTRA-LUXURY
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
            <div className="px-3 pb-1 text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
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
                      ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-200 border-l-2 border-amber-400 font-bold shadow-sm shadow-amber-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#0D1426]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition ${
                      isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-amber-300'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
                      isActive ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30' : item.badgeColor || 'bg-slate-800 text-slate-400'
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

      {/* Developer Profile Footer - MUHAMMAD RIZAL */}
      <div className="p-3.5 border-t border-[#19243C] bg-[#050812] shrink-0">
        <Link href="/settings" onClick={close} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#0D1426] transition group border border-transparent hover:border-amber-500/20">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
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
          <Settings className="w-4 h-4 text-slate-500 group-hover:text-amber-300 shrink-0 transition" />
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
            onClick={close} 
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
