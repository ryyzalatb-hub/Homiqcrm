'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  ArrowRight, 
  Building2, 
  Users, 
  UserCheck2, 
  Kanban, 
  CalendarClock, 
  MessageSquare, 
  Home, 
  Users2, 
  MapPinCheck, 
  BadgeCheck, 
  Calculator, 
  FileCheck, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Download,
  CreditCard,
  FileText,
  CornerDownLeft,
  HardHat,
  Smartphone
} from 'lucide-react';
import { DEMO_LEADS, DEMO_BOOKINGS } from '@/lib/demo-data';

interface PaletteItem {
  id: string;
  category: 'Halaman & Modul' | 'Aksi Cepat' | 'Prospek & Pelanggan';
  title: string;
  subtitle: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    // Custom event listener from Topbar search button click
    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Static list of pages & quick actions
  const staticItems: PaletteItem[] = [
    // Pages
    { id: 'p-1', category: 'Halaman & Modul', title: 'Overview Dashboard', subtitle: 'Monitoring KPI penjualan, omzet, & serapan unit', icon: Building2, href: '/' },
    { id: 'p-ai', category: 'Halaman & Modul', title: 'HOMIQ AI Co-Pilot & Studio', subtitle: 'Asisten cerdas naskah WhatsApp closing, analisa DBR, & skenario kredit', icon: Sparkles, href: '/ai-copilot', badge: 'AI v3.0' },
    { id: 'p-siteplan', category: 'Halaman & Modul', title: 'Interactive Siteplan 2D', subtitle: 'Peta masterplan kavling interaktif & reservasi unit anti double-booking', icon: Home, href: '/siteplan', badge: 'Anti-Double' },
    { id: 'p-gallery', category: 'Halaman & Modul', title: 'Galeri Properti & Show Unit', subtitle: 'Fasad modern 4K, tata ruang arsitektural, & e-katalog digital', icon: Building2, href: '/gallery', badge: '4K' },
    { id: 'p-map', category: 'Halaman & Modul', title: 'Peta Geografis & Akses Garut', subtitle: 'Radar jarak stasiun kereta garut, tol getaci, & sarana kota', icon: MapPinCheck, href: '/map-explorer' },
    { id: 'p-scoring', category: 'Halaman & Modul', title: 'Intelligent Lead Scoring Matrix', subtitle: 'Klasifikasi prospek Ultra Hot, Warm, Cold & probabilitas closing', icon: Users, href: '/lead-scoring', badge: 'Smart' },
    { id: 'p-2', category: 'Halaman & Modul', title: 'Leads & Prospek', subtitle: 'Direktori calon pembeli & simulator webhook', icon: Users, href: '/leads', badge: '50 Leads' },
    { id: 'p-3', category: 'Halaman & Modul', title: 'Data Pelanggan (Customers)', subtitle: 'Dossier 360° & riwayat berkas SP3K bank', icon: UserCheck2, href: '/customers' },
    { id: 'p-4', category: 'Halaman & Modul', title: 'Sales Pipeline Kanban', subtitle: 'Tahapan prospek & generator SPH resmi', icon: Kanban, href: '/pipeline', badge: '7 Tahap' },
    { id: 'p-5', category: 'Halaman & Modul', title: 'Smart Follow-up Engine', subtitle: 'Jadwal follow-up harian & Click-to-WA', icon: CalendarClock, href: '/follow-ups', badge: 'Hari Ini' },
    { id: 'p-6', category: 'Halaman & Modul', title: 'WhatsApp Marketing Center', subtitle: 'Template percakapan & live phone preview', icon: MessageSquare, href: '/whatsapp-center' },
    { id: 'p-7', category: 'Halaman & Modul', title: 'Projects Masterplan & Kavling', subtitle: 'Vektor SVG site plan anti-double booking & denah 2D', icon: Home, href: '/projects', badge: 'Row-Lock' },
    { id: 'p-7b', category: 'Halaman & Modul', title: 'Progres Konstruksi & Bank BTN', subtitle: 'Monitoring fisik bangunan, kendali mutu SNI, & cetak BAPF A4', icon: HardHat, href: '/construction', badge: 'Bank BTN' },
    { id: 'p-8', category: 'Halaman & Modul', title: 'Marketing Team & Komisi', subtitle: 'Leaderboard, komisi 1.5% - 2.0%, & cetak slip A4', icon: Users2, href: '/team' },
    { id: 'p-9', category: 'Halaman & Modul', title: 'Jadwal Survei Lokasi', subtitle: 'Survei show unit, Google Maps, & Calendar sync', icon: MapPinCheck, href: '/site-visits' },
    { id: 'p-10', category: 'Halaman & Modul', title: 'Bookings & Transaksi', subtitle: 'Buku kas tanda jadi & cetak Kwitansi Resmi', icon: BadgeCheck, href: '/bookings' },
    { id: 'p-11', category: 'Halaman & Modul', title: 'Kalkulator KPR Subsidi FLPP', subtitle: 'Simulasi bunga 5% flat, biaya all-in, & DBR 35%', icon: Calculator, href: '/kpr-calculator' },
    { id: 'p-12', category: 'Halaman & Modul', title: 'Pusat Dokumen & Kontrak', subtitle: 'Generator SPK, PPJB, BAST Kunci, & Pernyataan FLPP', icon: FileCheck, href: '/documents' },
    { id: 'p-13', category: 'Halaman & Modul', title: 'Laporan & Analitik Bisnis', subtitle: 'Analisis ROI iklan digital & laporan direksi', icon: BarChart3, href: '/analytics' },
    { id: 'p-14', category: 'Halaman & Modul', title: 'Pengaturan Developer', subtitle: 'Profil legal PT, rekening escrow Bank BTN, & hak akses staf', icon: Settings, href: '/settings' },
    { id: 'p-15', category: 'Halaman & Modul', title: 'Konsol Super Admin', subtitle: 'Multi-tenant subscriptions & PostgreSQL RLS', icon: ShieldCheck, href: '/super-admin' },
    { id: 'p-portal', category: 'Halaman & Modul', title: 'Portal Mandiri Konsumen KPR', subtitle: 'Pengecekan progres fisik rumah & unggah berkas KPR dari HP', icon: Smartphone, href: '/portal-kpr', badge: 'Konsumen' },

    // Quick Actions
    { id: 'a-1', category: 'Aksi Cepat', title: 'Uji Simulator Webhook Iklan', subtitle: 'Simulasi injeksi leads dari Instagram/TikTok Ads', icon: Zap, href: '/leads' },
    { id: 'a-2', category: 'Aksi Cepat', title: 'Kunci Kavling di Site Plan', subtitle: 'Pilih nomor kavling di denah vektor SVG masterplan', icon: Home, href: '/projects' },
    { id: 'a-3', category: 'Aksi Cepat', title: 'Buat Surat Penawaran Harga (SPH)', subtitle: 'Generator penawaran harga A4 dengan 3 opsi skema', icon: FileText, href: '/pipeline' },
    { id: 'a-4', category: 'Aksi Cepat', title: 'Hitung Simulasi Cicilan KPR', subtitle: 'Bandingkan KPR FLPP 5% flat vs komersial', icon: Calculator, href: '/kpr-calculator' },
    { id: 'a-5', category: 'Aksi Cepat', title: 'Cetak Kwitansi Tanda Jadi', subtitle: 'Buka buku kas booking untuk mencetak kwitansi resmi', icon: CreditCard, href: '/bookings' },
    { id: 'a-6', category: 'Aksi Cepat', title: 'Buka Portal KPR Mandiri Konsumen', subtitle: 'Tampilan pengunggahan berkas KPR dari ponsel pembeli', icon: UserCheck2, href: '/portal-kpr/cust-101' },
    { id: 'a-7', category: 'Aksi Cepat', title: 'Unduh Cadangan Basis Data (JSON)', subtitle: 'Ekspor snapshot lengkap data transaksi & profil', icon: Download, href: '/settings' },
    { id: 'a-8', category: 'Aksi Cepat', title: 'Cetak Berita Acara Fisik (BAPF)', subtitle: 'Format resmi untuk pencairan termin kredit KPR perbankan', icon: HardHat, href: '/construction' }
  ];

  // Dynamic leads & bookings results based on query
  const dynamicItems: PaletteItem[] = query.trim() ? [
    ...DEMO_LEADS.filter(l => 
      l.full_name.toLowerCase().includes(query.toLowerCase()) || 
      l.phone.includes(query) || 
      l.project_name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 4).map(l => ({
      id: `lead-${l.id}`,
      category: 'Prospek & Pelanggan' as const,
      title: l.full_name,
      subtitle: `${l.project_name} • Rp ${(l.budget / 1000000).toFixed(0)} Jt • PIC: ${l.assigned_to_name}`,
      icon: Users,
      href: '/leads',
      badge: 'Prospek'
    })),
    ...DEMO_BOOKINGS.filter(b => 
      b.customer_name.toLowerCase().includes(query.toLowerCase()) || 
      b.unit_code.toLowerCase().includes(query.toLowerCase()) ||
      b.booking_code.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3).map(b => ({
      id: `booking-${b.id}`,
      category: 'Prospek & Pelanggan' as const,
      title: `${b.customer_name} (${b.unit_code})`,
      subtitle: `${b.booking_code} • ${b.project_name} • ${b.akad_status}`,
      icon: BadgeCheck,
      href: '/bookings',
      badge: 'Terkunci'
    }))
  ] : [];

  // Filtered Items based on query
  const allItems = query.trim()
    ? [
        ...dynamicItems,
        ...staticItems.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
      ]
    : staticItems;

  const handleSelect = (item: PaletteItem) => {
    setIsOpen(false);
    router.push(item.href);
  };

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (allItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allItems.length) % (allItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Background dismiss */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

      {/* Palette Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]">
        
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <Search className="w-5 h-5 text-blue-600 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ketik untuk mencari modul, prospek, nomor kavling, atau aksi cepat..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100">
          {allItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-1">
              <p className="text-xs font-semibold text-slate-600">Tidak ada hasil yang cocok dengan &quot;{query}&quot;</p>
              <p className="text-[11px]">Coba cari nama prospek, kode booking, atau nama modul CRM lainnya.</p>
            </div>
          ) : (
            <div>
              {allItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer text-xs transition ${
                      isSelected ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold truncate text-xs ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {item.title}
                          </p>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {item.badge && (
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-white translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono">↓</kbd>
              <span className="text-[10px]">Pilih</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono flex items-center gap-0.5">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>
              <span className="text-[10px]">Buka</span>
            </span>
          </div>

          <span className="text-[10px] font-mono text-slate-400">
            HOMIQ Spotlight &bull; {allItems.length} opsi
          </span>
        </div>

      </div>

    </div>
  );
}