'use client';
import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronRight,
  X,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Building2,
  Keyboard,
  Command,
  CornerDownLeft,
  Printer,
  Volume2,
  VolumeX
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMobileNav } from './MobileNavContext';
import { useToast } from '../ui/Toast';
import { DEMO_LEADS } from '@/lib/demo-data';

const PAGE_TITLES: Record<string, { title: string; subtitle: string; category: string }> = {
  '/': { title: 'Overview Dashboard', subtitle: 'Monitoring KPI penjualan properti & performa bisnis', category: 'Executive' },
  '/leads': { title: 'Daftar Prospek (Leads)', subtitle: 'Basis data calon pembeli properti dari semua channel', category: 'Sales' },
  '/customers': { title: 'Data Pelanggan (Customers)', subtitle: 'Direktori pembeli yang telah terverifikasi & booking', category: 'Sales' },
  '/pipeline': { title: 'Sales Pipeline Kanban', subtitle: 'Alur tahapan prospek dari lead baru hingga akad', category: 'Sales' },
  '/follow-ups': { title: 'Smart Follow-up Engine', subtitle: 'Manajemen jadwal kontak & interaksi via WhatsApp', category: 'Marketing' },
  '/projects': { title: 'Matriks Proyek & Kavling', subtitle: 'Denah unit dengan proteksi row-locking anti double-booking', category: 'Inventory' },
  '/construction': { title: 'Progres Konstruksi & Pencairan Bank', subtitle: 'Monitoring fisik bangunan, kendali mutu QC, & BAPF Bank BTN', category: 'Construction' },
  '/team': { title: 'Marketing Team Performance', subtitle: 'Kinerja staf pemasaran & pencapaian closing', category: 'Team' },
  '/site-visits': { title: 'Jadwal Survei Lokasi', subtitle: 'Kunjungan show unit & survei kavling perumahan', category: 'Operations' },
  '/bookings': { title: 'Transaksi & Booking Fee', subtitle: 'Pencatatan tanda jadi & akad kredit konsumen', category: 'Finance' },
  '/analytics': { title: 'Laporan & Analitik', subtitle: 'Statistik omzet, sumber lead, & serapan kavling', category: 'Reports' },
  '/ai-copilot': { title: 'AI Co-Pilot & Studio', subtitle: 'Asisten cerdas naskah closing, skenario kredit KPR, & diagnostic prospek', category: 'Intelligence' },
  '/siteplan': { title: 'Visual Siteplan 2D', subtitle: 'Peta masterplan kavling interaktif & reservasi unit anti-double booking', category: 'Inventory' },
  '/gallery': { title: 'Galeri Properti & Virtual Show Unit', subtitle: 'Eksplorasi fasad arsitektural 4K, tata ruang interior, & e-katalog digital', category: 'Property' },
  '/map-explorer': { title: 'Peta Geografis & Akses Garut', subtitle: 'Analisis jarak tempuh, stasiun kereta, rencana tol Getaci, & fasilitas umum', category: 'Location' },
  '/lead-scoring': { title: 'Lead Scoring Matrix', subtitle: 'Prediksi probabilitas closing & prioritisasi calon pembeli otomatis', category: 'Sales AI' },
  '/kpr-calculator': { title: 'Kalkulator KPR & Simulasi Finansial', subtitle: 'Simulasi KPR Subsidi FLPP & Komersial dengan rincian instan WhatsApp', category: 'Finance' },
  '/whatsapp-center': { title: 'WhatsApp Marketing Center', subtitle: 'Click-to-WA engine & generator pesan percakapan calon pembeli terstandarisasi', category: 'Marketing' },
  '/documents': { title: 'Pusat Dokumen & Kontrak Legalitas', subtitle: 'Generator SPK, PPJB, BAST Kunci, dan Surat Pernyataan Subsidi KemenPUPR', category: 'Legal & Contracts' },
  '/spk-digital': { title: 'E-Signature & Digital SPK Legal', subtitle: 'Penandatanganan digital langsung & penerbitan SPK resmi PT Garut Sejahtera Propertindo', category: 'Legal & Sales' },
  '/dossier': { title: 'Dossier Eksekutif & Majalah Investor', subtitle: 'Laporan perkembangan proyek & serapan investasi format majalah arsitektur A4', category: 'Executive & Board' },
  '/portal-kpr': { title: 'Portal Mandiri Konsumen', subtitle: 'Akses pengecekan progres fisik rumah & unggah berkas KPR Bank BTN', category: 'Customer Portal' },
  '/settings': { title: 'Pengaturan Profil Pengembang', subtitle: 'Konfigurasi identitas developer, rekening escrow, biaya default, & hak akses staf', category: 'Settings' },
  '/super-admin': { title: 'Platform Super Admin', subtitle: 'Pengaturan multi-tenant & Row Level Security (RLS)', category: 'System' },
};

export default function Header() {
  const pathname = usePathname();
  const { toggle } = useMobileNav();
  const { showToast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSystemGuide, setShowSystemGuide] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMuted(localStorage.getItem('homiq_sound_muted') === 'true');
    }
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('homiq_sound_muted', String(nextMuted));
    }
    showToast(nextMuted ? 'Efek audio UI dimatikan (Mute).' : 'Efek audio UI diaktifkan (Chimes On).', 'info');
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
      } else if (e.key === 'Escape' && showShortcutsModal) {
        setShowShortcutsModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShortcutsModal]);

  const currentPage = PAGE_TITLES[pathname] || {
    title: 'HOMIQ CRM',
    subtitle: 'Smart Property SaaS Platform',
    category: 'Application'
  };

  const notifications = [
    { id: 'n1', title: 'Lead Baru Masuk', desc: 'Kang Asep Sopian tertarik Tipe 36/60 Bumi Cimanuk.', time: '10 menit lalu' },
    { id: 'n2', title: 'Jadwal Survei Hari Ini', desc: 'Bapak Agus Setiawan ke Grand Karangpawitan pukul 14:00.', time: '1 jam lalu' }
  ];

  const handleMarkAllRead = () => {
    setUnreadCount(0);
    setShowNotifications(false);
    showToast('Semua notifikasi telah ditandai dibaca', 'info');
  };

  const matchingLeads = searchQuery.trim() 
    ? DEMO_LEADS.filter(l => 
        l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        l.phone.includes(searchQuery) ||
        l.project_name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="h-16 bg-[#070B16]/90 backdrop-blur-xl border-b border-[#19243C] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shrink-0 shadow-2xl print:hidden">
      
      {/* Left: Hamburger & Dynamic Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggle}
          aria-label="Toggle Navigation Menu"
          className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-[#0D1426] md:hidden focus:outline-none transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-300 transition">HOMIQ</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-amber-400/80 font-medium">{currentPage.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-500 hidden sm:inline" />
            <span className="text-slate-300 font-semibold truncate hidden sm:inline">{currentPage.title}</span>
          </div>
          
          {/* Page Title */}
          <h1 className="text-sm font-bold text-white font-display tracking-tight leading-tight truncate">
            {currentPage.title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Global Search / Command Palette Trigger */}
        <div className="relative hidden md:block w-56 lg:w-72">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="w-full flex items-center justify-between pl-8 pr-2.5 py-1.5 bg-[#0D1426] hover:bg-[#131C35] text-xs rounded-xl border border-[#1C2640] hover:border-amber-500/30 text-slate-400 hover:text-slate-200 transition shadow-inner group text-left"
            title="Buka Command Palette (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 group-hover:text-amber-400 transition-colors" />
            <span className="truncate text-slate-400">Cari prospek, kavling...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-300/80 group-hover:text-amber-300 bg-[#070B16] border border-[#1C2640] rounded shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Quick System Guide Pill Button */}
        <button
          onClick={() => setShowSystemGuide(true)}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition shadow-sm"
          title="Panduan Alur Kerja Sistem Properti"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline">Alur Kerja Sistem</span>
        </button>

        {/* Keyboard Shortcuts Trigger */}
        <button
          onClick={() => setShowShortcutsModal(true)}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#0D1426] border border-[#1C2640] transition"
          title="Pintasan Keyboard (Tekan ?)"
        >
          <Keyboard className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden xl:inline">Pintasan</span>
          <kbd className="text-[10px] font-mono font-bold bg-[#070B16] px-1 py-0.2 rounded border border-[#1C2640] text-amber-300">?</kbd>
        </button>

        {/* UI Sound Mute/Unmute Toggle */}
        <button
          onClick={handleToggleSound}
          className={`p-2 rounded-xl border transition ${
            isMuted 
              ? 'text-slate-400 bg-[#0D1426] border-[#1C2640] hover:text-slate-200' 
              : 'text-amber-300 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
          }`}
          title={isMuted ? 'Efek Suara UI: Mati (Klik untuk Mengaktifkan)' : 'Efek Suara UI: Aktif (Klik untuk Mute)'}
          aria-label="Toggle Sound Effects"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-300" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifikasi"
            className="p-2 text-slate-400 hover:text-white hover:bg-[#0D1426] rounded-xl border border-transparent hover:border-[#1C2640] transition relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifications(false)} 
              />
              <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2.5 z-50 animate-in fade-in duration-150">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900">Notifikasi</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[10px] text-blue-600 hover:underline font-medium"
                    >
                      Tandai Dibaca
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition text-xs space-y-0.5">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2.5 border-l border-[#19243C] text-left hover:opacity-90 transition focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center border border-amber-300 shadow-md shadow-amber-500/20">
              MR
            </div>
            <div className="hidden lg:block text-left text-xs leading-none">
              <p className="font-bold text-white font-display">MUHAMMAD RIZAL</p>
              <p className="text-[10px] text-amber-400/90 mt-0.5 font-medium font-mono">Direktur Utama &bull; Garut Sejahtera</p>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)} 
              />
              <div className="absolute right-0 top-11 w-64 bg-[#0B1120] rounded-2xl shadow-2xl border border-amber-500/20 py-2 z-50 text-xs backdrop-blur-xl animate-in fade-in duration-100">
                <div className="px-4 py-2.5 border-b border-[#19243C]">
                  <p className="font-bold text-white font-display">MUHAMMAD RIZAL</p>
                  <p className="text-[11px] text-slate-400 font-mono">rizal@garutsejahtera.co.id</p>
                  <span className="inline-block mt-1.5 text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                    Direktur Utama &bull; Executive Board
                  </span>
                </div>

                <div className="py-1.5">
                  <Link
                    href="/dossier"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 hover:bg-[#131C35] text-amber-200 font-medium transition"
                  >
                    Dossier Eksekutif & Majalah A4
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 hover:bg-[#131C35] text-slate-300 hover:text-white font-medium transition"
                  >
                    Pengaturan Profil Developer
                  </Link>
                  <Link
                    href="/super-admin"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 hover:bg-[#131C35] text-slate-300 hover:text-white font-medium transition"
                  >
                    Konsol Super Admin
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => {
                      setShowProfileMenu(false);
                      showToast('Beralih ke layar login / ganti profil demo', 'info');
                    }}
                    className="block px-4 py-2 hover:bg-[#131C35] text-amber-300 font-semibold transition"
                  >
                    Ganti Profil Demo
                  </Link>
                </div>

                <div className="pt-1.5 border-t border-[#19243C]">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      showToast('Anda telah keluar dari sistem (Logout).', 'info');
                      window.location.href = '/login';
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-950/40 text-rose-400 font-semibold transition"
                  >
                    Keluar (Logout)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Interactive System Walkthrough Guide Modal */}
      {showSystemGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in zoom-in-95 my-8">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Panduan Alur Sistem HOMIQ CRM</h3>
                  <p className="text-[11px] text-slate-300">Alur operasional dari prospek iklan hingga serah terima kunci</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSystemGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 max-h-[75vh] overflow-y-auto text-xs text-slate-700">
              
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                    <h4 className="font-bold text-slate-900 text-xs">Iklan Masuk &amp; Pembagian Sales (Leads Engine)</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Prospek dari Instagram / TikTok Ads masuk via webhook dan langsung dibagi adil (round-robin) ke marketing.
                  </p>
                </div>
                <Link
                  href="/leads"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Buka Modul Leads</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                    <h4 className="font-bold text-slate-900 text-xs">Follow-Up Terjadwal &amp; WhatsApp Marketing</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Sistem mengingatkan jadwal kontak harian. Sales cukup klik tombol WhatsApp tanpa perlu mengetik ulang nomor telepon.
                  </p>
                </div>
                <Link
                  href="/follow-ups"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Buka Follow-ups</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                    <h4 className="font-bold text-slate-900 text-xs">Pilih Unit di Site Plan (Anti-Double Booking)</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Lihat denah masterplan vektor SVG dan denah rumah 2D. Kunci unit secara transaksional agar tidak bisa direbut sales lain.
                  </p>
                </div>
                <Link
                  href="/projects"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Buka Site Plan</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                    <h4 className="font-bold text-slate-900 text-xs">Simulasi KPR FLPP 5% &amp; Terbitkan SPH</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Hitung angsuran subsidi vs komersial, rincian biaya all-in, dan langsung cetak Surat Penawaran Harga (SPH) A4.
                  </p>
                </div>
                <Link
                  href="/kpr-calculator"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Kalkulator KPR</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 5 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">5</span>
                    <h4 className="font-bold text-slate-900 text-xs">Penerimaan Tanda Jadi &amp; Cetak Kwitansi</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Catat dana tanda jadi yang masuk ke rekening escrow resmi developer dan cetak kwitansi resmi bernomor seri.
                  </p>
                </div>
                <Link
                  href="/bookings"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Buka Bookings</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 6 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">6</span>
                    <h4 className="font-bold text-slate-900 text-xs">Portal KPR Mandiri (Unggah Berkas dari HP)</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Pembeli menerima link khusus untuk upload foto KTP, KK, NPWP, dan Slip Gaji tanpa perlu login ke sistem kantor.
                  </p>
                </div>
                <Link
                  href="/portal-kpr/cust-101"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Portal KPR</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 7 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">7</span>
                    <h4 className="font-bold text-slate-900 text-xs">Pusat Legalitas (SPK, PPJB, BAST) &amp; Slip Komisi</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Terbitkan kontrak bermaterai resmi setelah SP3K disetujui, dan hitung komisi penjualan sales secara transparan.
                  </p>
                </div>
                <Link
                  href="/documents"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Pusat Dokumen</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 8 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">8</span>
                    <h4 className="font-bold text-slate-900 text-xs">Monitoring Konstruksi &amp; Pencairan Termin Bank BTN</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Pantau progres fisik lapangan (Pondasi, Atap, Finishing), audit mutu teknis SNI, dan cetak Berita Acara Pemeriksaan Fisik (BAPF) untuk pencairan dana termin KPR.
                  </p>
                </div>
                <Link
                  href="/construction"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Progres Konstruksi</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 9 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">9</span>
                    <h4 className="font-bold text-slate-900 text-xs">Pra-Skrining BI Checking OJK &amp; Hak Akses Multi-Peran</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Audit skor kelayakan kredit pemohon (KOL-1 Lancar), riwayat bebas pinjol/paylater, dan kendalikan wewenang staf dengan 5 peran kerja.
                  </p>
                </div>
                <Link
                  href="/customers"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Cek SLIK OJK</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 10 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">10</span>
                    <h4 className="font-bold text-slate-900 text-xs">Payment Gateway Escrow &amp; QRIS Bank Indonesia</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Pembayaran tanda jadi dan angsuran DP via Virtual Account (BTN, BCA, Mandiri) &amp; QRIS dinamis dengan callback webhook HTTP 200 otomatis.
                  </p>
                </div>
                <Link
                  href="/bookings"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Buka Gateway</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Step 11 */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">11</span>
                    <h4 className="font-bold text-slate-900 text-xs">Insentif Pajak Bebas PPN DTP 100% (PMK No. 7/2024)</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-7">
                    Kalkulator penghematan pajak pertambahan nilai yang ditanggung pemerintah hingga puluhan juta rupiah sebagai amunisi closing penjualan.
                  </p>
                </div>
                <Link
                  href="/kpr-calculator"
                  onClick={() => setShowSystemGuide(false)}
                  className="sm:shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <span>Cek Insentif PPN</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">HOMIQ Smart Property CRM &bull; Versi 1.2 Enterprise</span>
              <button
                onClick={() => setShowSystemGuide(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Tutup Panduan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm text-white">Pintasan Keyboard (Power Shortcuts)</h3>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <p className="text-slate-500 text-[11px] pb-1 border-b border-slate-100">
                Gunakan kombinasi tombol berikut untuk menavigasi HOMIQ CRM dengan lebih cepat:
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">Buka Pencarian &amp; Spotlight</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-300 font-bold text-[10px] text-slate-700 shadow-2xs">Ctrl</kbd>
                    <span className="text-slate-400">+</span>
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-300 font-bold text-[10px] text-slate-700 shadow-2xs">K</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">Cetak Dokumen / Kwitansi / BAPF</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-300 font-bold text-[10px] text-slate-700 shadow-2xs">Ctrl</kbd>
                    <span className="text-slate-400">+</span>
                    <kbd className="px-2 py-0.5 rounded bg-white border border-slate-300 font-bold text-[10px] text-slate-700 shadow-2xs">P</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">Tutup Modal / Jendela Dialog</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2.5 py-0.5 rounded bg-white border border-slate-300 font-bold text-[10px] text-slate-700 shadow-2xs">Esc</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">Tampilkan Bantuan Pintasan Ini</span>
                  <div className="flex items-center gap-1 font-mono">
                    <kbd className="px-2.5 py-0.5 rounded bg-white border border-slate-300 font-bold text-[10px] text-slate-700 shadow-2xs">?</kbd>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Didukung di Windows &amp; macOS</span>
                <button
                  onClick={() => setShowShortcutsModal(false)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
