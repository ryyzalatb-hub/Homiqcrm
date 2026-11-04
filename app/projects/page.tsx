'use client';
import React, { useState } from 'react';
import { DEMO_PROJECTS } from '@/lib/demo-data';
import { 
  Building, 
  MapPin, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ShieldCheck, 
  Plus, 
  Lock, 
  X,
  CreditCard,
  User,
  Phone,
  Layers,
  Sparkles,
  Map,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Trees,
  Compass,
  Home,
  BedDouble,
  Bath,
  Utensils,
  Car,
  Maximize2,
  CheckCircle2,
  Printer,
  FileText,
  Download,
  Send,
  MessageCircle,
  Camera,
  Eye,
  Share2,
  Search
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, WhatsAppTemplates } from '@/lib/whatsapp';

interface KavlingUnit {
  code: string;
  status: 'available' | 'booked' | 'sold';
  price: number;
  landArea: number;
  buildingArea: number;
  bookedBy?: string;
  bookedPhone?: string;
  bookingCode?: string;
}

export default function ProjectsPage() {
  const { showToast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('p1');

  // Initialize Kavling Matrix State for each project
  const [unitsData, setUnitsData] = useState<Record<string, KavlingUnit[]>>(() => {
    const initial: Record<string, KavlingUnit[]> = {};
    DEMO_PROJECTS.forEach(proj => {
      const units: KavlingUnit[] = Array.from({ length: proj.total_units }, (_, i) => {
        const num = i + 1;
        const prefix = proj.id === 'p1' ? 'A' : proj.id === 'p2' ? 'B' : 'C';
        const code = `Blok ${prefix}-${num < 10 ? '0' + num : num}`;
        let status: 'available' | 'booked' | 'sold' = 'available';

        if (proj.id === 'p1') {
          if (num <= 2) status = 'sold';
          else if (num <= 5) status = 'booked';
        } else if (proj.id === 'p2') {
          if (num === 1) status = 'sold';
          else if (num <= 4) status = 'booked';
        } else if (proj.id === 'p3') {
          if (num === 1) status = 'booked';
        }

        const price = proj.id === 'p1' ? 166000000 : proj.id === 'p2' ? 345000000 : 485000000;
        const landArea = proj.id === 'p1' ? 60 : proj.id === 'p2' ? 72 : 84;
        const buildingArea = proj.id === 'p1' ? 36 : proj.id === 'p2' ? 45 : 54;

        return { code, status, price, landArea, buildingArea };
      });
      initial[proj.id] = units;
    });
    return initial;
  });

  // Modal State for Booking
  const [selectedUnit, setSelectedUnit] = useState<KavlingUnit | null>(null);
  const [lockedUnit, setLockedUnit] = useState<KavlingUnit | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('KPR Subsidi FLPP');
  const [bookingFee, setBookingFee] = useState('1500000');
  const [marketingPIC, setMarketingPIC] = useState('Kang Dika Pratama');
  const [bookingNotes, setBookingNotes] = useState('');

  // View Mode & Interactive Siteplan / Floorplan / Gallery Controls
  const [viewMode, setViewMode] = useState<'siteplan' | 'grid' | 'floorplan' | 'gallery'>('siteplan');
  const [activeGalleryPhoto, setActiveGalleryPhoto] = useState<number | null>(null);
  const [lotSearchQuery, setLotSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredUnit, setHoveredUnit] = useState<KavlingUnit | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>('master_bedroom');

  // Pricelist Modal State
  const [isPricelistModalOpen, setIsPricelistModalOpen] = useState(false);
  const [pricelistFilter, setPricelistFilter] = useState<'all' | 'available' | 'booked' | 'sold'>('all');

  const activeProject = DEMO_PROJECTS.find(p => p.id === selectedProjectId) || DEMO_PROJECTS[0];
  const activeUnits = unitsData[selectedProjectId] || [];

  const availableCount = activeUnits.filter(u => u.status === 'available').length;
  const bookedCount = activeUnits.filter(u => u.status === 'booked').length;
  const soldCount = activeUnits.filter(u => u.status === 'sold').length;

  const handleSendPricelistWhatsApp = () => {
    const minPrice = activeUnits[0]?.price || 166000000;
    const text = `*DAFTAR HARGA & KETERSEDIAAN KAVLING RESMI*\n*PT GARUT SEJAHTERA PROPERTY*\n\nProyek: *${activeProject.name}*\nLokasi: ${activeProject.location}, ${activeProject.city}\n\n• Total Unit: ${activeUnits.length} Kavling\n• Unit Tersedia (Ready): *${availableCount} Unit*\n• Unit Ter-Booking: ${bookedCount} Unit\n• Unit Terjual: ${soldCount} Unit\n\nHarga Mulai: *Rp ${(minPrice / 1000000).toLocaleString('id-ID')} Juta*\nSkema: KPR Subsidi FLPP (Bunga 5% Tetap 20 Thn) / KPR Komersial / Cash Keras Diskon 5%\n\nInformasi survei lokasi & booking kavling:\nHubungi Kantor Pemasaran Garut Sejahtera 🙏`;
    const url = buildWhatsAppLink('081234567890', text);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Membuka WhatsApp untuk membagikan daftar harga...', 'success');
  };

  const handleSendBrochureWhatsApp = () => {
    const text = `*BROSUR DIGITAL & SPESIFIKASI BANGUNAN RESMI*\n*PT GARUT SEJAHTERA PROPERTY*\n\nProyek Unggulan: *${activeProject.name}*\nLokasi: ${activeProject.location}, ${activeProject.city}\nHarga Mulai: *Rp 166.000.000* (Skema KPR Subsidi FLPP Bunga 5% Flat)\n\n🏡 *SPESIFIKASI TEKNIS BANGUNAN STANDAR SNI:*\n• Struktur: Beton Bertulang K-225 & Besi 8-10mm SNI\n• Pondasi: Batu Kali Belah & Sloof Pengikat Beton\n• Dinding: Bata Ringan (Hebel) Plester & Aci Halus\n• Lantai: Granit Tile 60x60 cm Glazed Polished\n• Kusen: Aluminium Powder-Coated 3 Inch Hitam\n• Atap: Baja Ringan C75.75 & Genteng Metal Berpasir\n• Plafon: Gypsum Board Rangka Hollow Galvanis (Tinggi 3.2m)\n• Sanitair: Kloset Duduk Toto / American Standard & Hand Shower\n• Air Bersih: Sumur Bor Artesis + Pompa Submersible & Toren 500L\n• Listrik: PLN 1300 VA Prabayar\n\n🛡️ *Garansi Pemeliharaan Developer 100 Hari Pasca BAST!*\n\nJadwalkan kunjungan show unit bersama kami akhir pekan ini 🙏\nHotline Pemasaran: 0812-3456-7890`;
    const url = buildWhatsAppLink('081234567890', text);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Membuka WhatsApp untuk membagikan brosur & spesifikasi...', 'success');
  };

  const handleUnitClick = (unit: KavlingUnit) => {
    if (unit.status === 'available') {
      setSelectedUnit(unit);
      setBuyerName('');
      setBuyerPhone('');
      setBookingNotes(`Pemesanan tanda jadi unit ${unit.code}`);
    } else {
      setLockedUnit(unit);
      showToast(`Unit ${unit.code} berstatus ${unit.status.toUpperCase()} — Terkunci dari pemilihan ulang.`, 'warning');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnit) return;

    if (!buyerName.trim() || !buyerPhone.trim()) {
      showToast('Nama pembeli dan nomor kontak wajib diisi.', 'error');
      return;
    }

    // Double check protection: ensure unit is still available
    if (selectedUnit.status !== 'available') {
      showToast(`Proteksi Row-Locking: Unit ${selectedUnit.code} sudah dipesan oleh transaksi lain!`, 'error');
      setSelectedUnit(null);
      return;
    }

    const bookingCode = `BOK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;

    // Update unit status to 'booked' atomically
    setUnitsData(prev => ({
      ...prev,
      [selectedProjectId]: prev[selectedProjectId].map(u => {
        if (u.code === selectedUnit.code) {
          return {
            ...u,
            status: 'booked',
            bookedBy: buyerName.trim(),
            bookedPhone: buyerPhone.trim(),
            bookingCode
          };
        }
        return u;
      })
    }));

    showToast(`Sukses! Unit ${selectedUnit.code} berhasil di-booking (${bookingCode}) untuk ${buyerName}. Status unit dikunci.`, 'success');
    setSelectedUnit(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Home className="w-3.5 h-3.5 text-blue-400" />
                Masterplan &amp; Real Estate Matrix
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Row-Locking DB Aktif (0% Konflik Booking)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Proyek, Masterplan &amp; Ketersediaan Kavling
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Denah tata ruang vektor SVG interaktif, matriks status kavling waktu nyata, denah arsitektur 2D, dan pencetakan pricelist brosur resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsPricelistModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm shadow-blue-600/30 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Pricelist Resmi / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Selector Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEMO_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          const currentUnits = unitsData[proj.id] || [];
          const avail = currentUnits.filter(u => u.status === 'available').length;

          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected 
                  ? 'bg-blue-50/70 border-blue-500 shadow-md ring-1 ring-blue-500' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                  <div className="bg-blue-600 text-[9px] font-bold text-white transform rotate-45 translate-x-4 -translate-y-2 py-0.5 text-center">
                    AKTIF
                  </div>
                </div>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{proj.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.location}, {proj.city}</span>
                  </p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  avail > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {avail} KOSONG
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">{proj.description}</p>
            </button>
          );
        })}
      </div>

      {/* Active Project Details & Kavling Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{activeProject.name}</h3>
              <span className="text-[11px] text-slate-500 font-mono">({activeUnits.length} Total Kavling)</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fasilitas Komplek: <span className="font-medium text-slate-700">{activeProject.facilities.join(' • ')}</span>
            </p>
          </div>

          {/* View Mode Toggle & Legend */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('siteplan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'siteplan'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Site Plan Visual</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Matriks Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('floorplan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'floorplan'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Denah Rumah 2D</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'gallery'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Galeri &amp; Brosur</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold pl-2 border-l border-slate-200">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Avail ({availableCount})
              </span>
              <span className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Booked ({bookedCount})
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Sold ({soldCount})
              </span>
            </div>
          </div>
        </div>

        {/* SITEPLAN MASTERPLAN VIEW */}
        {viewMode === 'siteplan' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Trees className="w-4 h-4 text-emerald-600" />
                  Site Plan Visual Cluster &amp; Masterplan
                </span>
                <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
                  &bull; Arahkan kursor atau klik kavling untuk booking
                </span>
              </div>

              {/* Search Lot Finder & Zoom Controls */}
              <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari kavling (A-06)..."
                    value={lotSearchQuery}
                    onChange={(e) => setLotSearchQuery(e.target.value)}
                    className="pl-8 pr-7 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44 font-mono font-semibold"
                  />
                  {lotSearchQuery && (
                    <button
                      onClick={() => setLotSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition"
                    title="Perbesar Tampilan"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition"
                    title="Perkecil Tampilan"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="px-2 py-1 text-[10px] font-mono font-bold hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                    title="Reset Ukuran Normal"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {Math.round(zoomLevel * 100)}%
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive SVG Canvas Container */}
            <div className="relative border border-slate-200/90 rounded-2xl bg-[#F8FAFC] overflow-x-auto shadow-inner p-3 sm:p-5 select-none">
              
              {/* Tooltip Overlay */}
              {hoveredUnit && (
                <div className="absolute top-4 left-4 z-20 bg-slate-950/90 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-700/60 max-w-xs animate-in fade-in duration-100 pointer-events-none">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
                    <span className="font-extrabold text-xs text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        hoveredUnit.status === 'available' ? 'bg-emerald-400' :
                        hoveredUnit.status === 'booked' ? 'bg-amber-400' : 'bg-slate-400'
                      }`} />
                      Unit {hoveredUnit.code}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      hoveredUnit.status === 'available' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      hoveredUnit.status === 'booked' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {hoveredUnit.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Harga:</span>
                      <strong className="font-mono text-blue-300">Rp {(hoveredUnit.price / 1000000).toFixed(0)} Juta</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Dimensi:</span>
                      <span>LB {hoveredUnit.buildingArea}m² / LT {hoveredUnit.landArea}m²</span>
                    </p>
                    {hoveredUnit.bookedBy && (
                      <p className="flex justify-between text-amber-300 pt-1 border-t border-slate-800">
                        <span>Pemesan:</span>
                        <strong className="truncate max-w-[120px]">{hoveredUnit.bookedBy}</strong>
                      </p>
                    )}
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400 italic">
                    {hoveredUnit.status === 'available' ? '👉 Klik kavling ini untuk mengunci booking' : '🔒 Kavling terkunci dari transaksi lain'}
                  </p>
                </div>
              )}

              {/* Masterplan Architectural SVG */}
              <div 
                className="transition-transform duration-200 origin-top-left min-w-[850px]"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg
                  viewBox="0 0 980 560"
                  className="w-full h-auto drop-shadow-sm"
                  style={{ maxHeight: '600px' }}
                >
                  <defs>
                    <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                    <linearGradient id="grassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F0FDF4" />
                      <stop offset="100%" stopColor="#DCFCE7" />
                    </linearGradient>
                  </defs>

                  {/* Outer Cluster Boundary Landscaping */}
                  <rect x="15" y="15" width="950" height="530" rx="20" fill="url(#grassGradient)" stroke="#86EFAC" strokeWidth="2" strokeDasharray="6 4" />
                  
                  {/* Gate Entrance Area (West / Left) */}
                  <path d="M 0 250 L 55 250 L 55 330 L 0 330 Z" fill="#475569" />
                  <rect x="5" y="225" width="45" height="22" rx="4" fill="#0A0F1D" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="27" y="240" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">POS SATPAM</text>
                  <line x1="55" y1="250" x2="55" y2="330" stroke="#EF4444" strokeWidth="4" strokeDasharray="8 6" />
                  <text x="28" y="295" fill="#FFFFFF" fontSize="9" fontWeight="bold" transform="rotate(-90 28 295)" textAnchor="middle">ONE GATE SYSTEM</text>

                  {/* Main Road: Jl. Boulevard Utama (Row 10 Meter) */}
                  <rect x="55" y="250" width="905" height="80" fill="url(#roadGradient)" rx="4" />
                  {/* Road markings / Striping */}
                  <line x1="60" y1="290" x2="950" y2="290" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="16 14" opacity="0.8" />
                  <text x="500" y="295" fill="#94A3B8" fontSize="12" fontWeight="bold" letterSpacing="4" textAnchor="middle" opacity="0.7">
                    JL. BOULEVARD UTAMA (ROW 10M)
                  </text>

                  {/* Branch Road Utara: Jl. Anggrek (Barat) & Jl. Bougenville (Timur) */}
                  <rect x="55" y="138" width="330" height="34" fill="#334155" rx="3" />
                  <text x="220" y="159" fill="#94A3B8" fontSize="9" fontWeight="bold" letterSpacing="2" textAnchor="middle">
                    JL. ANGGREK UTARA (ROW 6M)
                  </text>
                  <rect x="595" y="138" width="330" height="34" fill="#334155" rx="3" />
                  <text x="760" y="159" fill="#94A3B8" fontSize="9" fontWeight="bold" letterSpacing="2" textAnchor="middle">
                    JL. BOUGENVILLE (ROW 6M)
                  </text>

                  {/* Branch Road Selatan: Jl. Melati (Barat) & Jl. Dahlia (Timur) */}
                  <rect x="55" y="412" width="330" height="34" fill="#334155" rx="3" />
                  <text x="220" y="433" fill="#94A3B8" fontSize="9" fontWeight="bold" letterSpacing="2" textAnchor="middle">
                    JL. MELATI SELATAN (ROW 6M)
                  </text>
                  <rect x="595" y="412" width="330" height="34" fill="#334155" rx="3" />
                  <text x="760" y="433" fill="#94A3B8" fontSize="9" fontWeight="bold" letterSpacing="2" textAnchor="middle">
                    JL. DAHLIA SELATAN (ROW 6M)
                  </text>

                  {/* Connecting Road Crossing (West & East of Facilities) */}
                  <rect x="365" y="65" width="34" height="445" fill="#334155" rx="3" />
                  <rect x="580" y="65" width="34" height="445" fill="#334155" rx="3" />

                  {/* Fasum Utara: Taman Hijau & Sarana Ibadah (Musholla) */}
                  <g>
                    <rect x="408" y="65" width="164" height="175" rx="12" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="2" />
                    {/* Mosque Building */}
                    <rect x="424" y="80" width="132" height="70" rx="8" fill="#15803D" stroke="#166534" strokeWidth="1.5" />
                    <circle cx="490" cy="115" r="14" fill="#22C55E" />
                    <text x="490" y="119" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">☪</text>
                    <text x="490" y="140" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">MUSHOLLA AS-SALAM</text>
                    {/* Park greenery & playground */}
                    <rect x="424" y="160" width="132" height="68" rx="8" fill="#BBF7D0" stroke="#86EFAC" />
                    <text x="490" y="195" fill="#166534" fontSize="9" fontWeight="bold" textAnchor="middle">TAMAN &amp; PLAYGROUND</text>
                    <text x="490" y="210" fill="#15803D" fontSize="8" textAnchor="middle">Ruang Terbuka Hijau (Fasum)</text>
                  </g>

                  {/* Fasum Selatan: Club House & Lapangan Warga */}
                  <g>
                    <rect x="408" y="340" width="164" height="170" rx="12" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="2" />
                    <rect x="424" y="355" width="132" height="65" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
                    <text x="490" y="388" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">CLUBHOUSE RESIDENCE</text>
                    <text x="490" y="403" fill="#BAE6FD" fontSize="8" textAnchor="middle">Balai Warga &amp; Gym</text>
                    {/* Sports court */}
                    <rect x="424" y="430" width="132" height="68" rx="8" fill="#38BDF8" stroke="#0284C7" />
                    <rect x="434" y="440" width="112" height="48" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="490" y1="440" x2="490" y2="488" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="490" y="468" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">LAP. 3-ON-3</text>
                  </g>

                  {/* LOT PARCELS RENDERING */}
                  {(() => {
                    const LOT_POSITIONS = [
                      // Blok A Utara Atas (4 kavling)
                      { x: 65, y: 70, w: 66, h: 62 },
                      { x: 140, y: 70, w: 66, h: 62 },
                      { x: 215, y: 70, w: 66, h: 62 },
                      { x: 290, y: 70, w: 66, h: 62 },
                      // Blok A Utara Bawah (4 kavling)
                      { x: 65, y: 178, w: 66, h: 62 },
                      { x: 140, y: 178, w: 66, h: 62 },
                      { x: 215, y: 178, w: 66, h: 62 },
                      { x: 290, y: 178, w: 66, h: 62 },

                      // Blok B Timur Atas (4 kavling)
                      { x: 625, y: 70, w: 66, h: 62 },
                      { x: 700, y: 70, w: 66, h: 62 },
                      { x: 775, y: 70, w: 66, h: 62 },
                      { x: 850, y: 70, w: 66, h: 62 },
                      // Blok B Timur Bawah (4 kavling)
                      { x: 625, y: 178, w: 66, h: 62 },
                      { x: 700, y: 178, w: 66, h: 62 },
                      { x: 775, y: 178, w: 66, h: 62 },
                      { x: 850, y: 178, w: 66, h: 62 },

                      // Blok C Barat Selatan Atas (4 kavling)
                      { x: 65, y: 345, w: 66, h: 62 },
                      { x: 140, y: 345, w: 66, h: 62 },
                      { x: 215, y: 345, w: 66, h: 62 },
                      { x: 290, y: 345, w: 66, h: 62 },
                      // Blok C Barat Selatan Bawah (3 kavling)
                      { x: 65, y: 452, w: 66, h: 62 },
                      { x: 140, y: 452, w: 66, h: 62 },
                      { x: 215, y: 452, w: 66, h: 62 },

                      // Blok D Timur Selatan Atas (4 kavling)
                      { x: 625, y: 345, w: 66, h: 62 },
                      { x: 700, y: 345, w: 66, h: 62 },
                      { x: 775, y: 345, w: 66, h: 62 },
                      { x: 850, y: 345, w: 66, h: 62 },
                      // Blok D Timur Selatan Bawah (3 kavling)
                      { x: 625, y: 452, w: 66, h: 62 },
                      { x: 700, y: 452, w: 66, h: 62 },
                      { x: 775, y: 452, w: 66, h: 62 },
                    ];

                    return activeUnits.map((kav, idx) => {
                      const pos = LOT_POSITIONS[idx];
                      if (!pos) return null;

                      const isAvail = kav.status === 'available';
                      const isBooked = kav.status === 'booked';
                      const isSold = kav.status === 'sold';
                      const isHovered = hoveredUnit?.code === kav.code;
                      const isSearchMatch = Boolean(
                        lotSearchQuery.trim() && 
                        kav.code.toLowerCase().includes(lotSearchQuery.trim().toLowerCase())
                      );

                      let fill = '#ECFDF5';
                      let stroke = '#10B981';
                      let textColor = '#065F46';

                      if (isBooked) {
                        fill = '#FEF3C7';
                        stroke = '#F59E0B';
                        textColor = '#92400E';
                      } else if (isSold) {
                        fill = '#F1F5F9';
                        stroke = '#94A3B8';
                        textColor = '#475569';
                      }

                      return (
                        <g
                          key={kav.code}
                          className="cursor-pointer transition-all duration-150"
                          onClick={() => handleUnitClick(kav)}
                          onMouseEnter={() => setHoveredUnit(kav)}
                          onMouseLeave={() => setHoveredUnit(null)}
                        >
                          {/* Search match animated pulse locator */}
                          {isSearchMatch && (
                            <rect
                              x={pos.x - 5}
                              y={pos.y - 5}
                              width={pos.w + 10}
                              height={pos.h + 10}
                              rx={10}
                              fill="none"
                              stroke="#2563EB"
                              strokeWidth={3}
                              strokeDasharray="4 2"
                              className="animate-pulse"
                            />
                          )}

                          {/* Parcel Rectangle */}
                          <rect
                            x={pos.x}
                            y={pos.y}
                            width={pos.w}
                            height={pos.h}
                            rx={7}
                            fill={isSearchMatch ? '#EFF6FF' : fill}
                            stroke={isSearchMatch ? '#2563EB' : (isHovered ? '#2563EB' : stroke)}
                            strokeWidth={isSearchMatch || isHovered ? 2.5 : 1.5}
                            filter={isHovered || isSearchMatch ? 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))' : undefined}
                          />

                          {/* Unit Code Label */}
                          <text
                            x={pos.x + pos.w / 2}
                            y={pos.y + 24}
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="bold"
                            fill={textColor}
                            fontFamily="monospace"
                          >
                            {kav.code.replace('Blok ', '')}
                          </text>

                          {/* Dimension specs */}
                          <text
                            x={pos.x + pos.w / 2}
                            y={pos.y + 38}
                            textAnchor="middle"
                            fontSize="8"
                            fill="#64748B"
                            fontFamily="monospace"
                          >
                            {kav.buildingArea}/{kav.landArea}m²
                          </text>

                          {/* Status Pill Tag inside lot */}
                          <rect
                            x={pos.x + 8}
                            y={pos.y + 44}
                            width={pos.w - 16}
                            height={12}
                            rx={3}
                            fill={isAvail ? '#10B981' : isBooked ? '#F59E0B' : '#94A3B8'}
                          />
                          <text
                            x={pos.x + pos.w / 2}
                            y={pos.y + 53}
                            textAnchor="middle"
                            fontSize="7.5"
                            fontWeight="bold"
                            fill="#FFFFFF"
                            letterSpacing="0.5"
                          >
                            {isAvail ? 'READY' : isBooked ? 'BOOKED' : 'SOLD'}
                          </text>
                        </g>
                      );
                    });
                  })()}

                </svg>
              </div>

              {/* Site Plan Compass Rose Widget */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-slate-200 text-slate-700 shadow-sm flex items-center gap-2 pointer-events-none">
                <Compass className="w-5 h-5 text-blue-600 animate-pulse" />
                <div className="text-[10px] font-mono leading-tight">
                  <p className="font-bold text-slate-900">U (Utara)</p>
                  <p className="text-slate-400">Masterplan 1:100</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRADITIONAL MATRIX GRID VIEW */}
        {viewMode === 'grid' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Denah Matriks Kavling (Klik unit kosong untuk booking)
              </h4>
              <span className="text-[11px] text-slate-400">
                Perlindungan transaksi: Unit Booked / Sold tidak dapat dipilih ulang
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2.5">
              {activeUnits.map((kav) => {
                const isAvail = kav.status === 'available';
                const isBooked = kav.status === 'booked';
                const isSold = kav.status === 'sold';

                let style = 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer shadow-2xs hover:scale-102';
                if (isBooked) {
                  style = 'bg-amber-50 border-amber-300 text-amber-900 cursor-not-allowed opacity-90';
                } else if (isSold) {
                  style = 'bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed opacity-70';
                }

                return (
                  <button
                    key={kav.code}
                    onClick={() => handleUnitClick(kav)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center relative group cursor-pointer ${style}`}
                    title={
                      isAvail 
                        ? `Klik untuk booking ${kav.code}` 
                        : `Unit ${kav.code} berstatus ${kav.status.toUpperCase()} (Klik untuk melihat detail proteksi)`
                    }
                  >
                    <span className="text-xs font-extrabold">{kav.code}</span>
                    <div className="flex items-center gap-1 mt-1">
                      {!isAvail && <Lock className="w-2.5 h-2.5 shrink-0 opacity-60" />}
                      <span className="text-[9px] uppercase tracking-wider font-bold">
                        {kav.status}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                      {kav.buildingArea}/{kav.landArea} m²
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2D ARCHITECTURAL FLOOR PLAN VIEW */}
        {viewMode === 'floorplan' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                  Denah Tata Ruang Arsitektur 2D
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {activeProject.id === 'p1' ? 'Tipe 36/60 Minimalis Tropis' : activeProject.id === 'p2' ? 'Tipe 45/84 Modern Scandinavian' : 'Tipe 54/90 Cluster Eksklusif'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dimensi Tanah: <strong className="text-slate-800">6.0 x 10.0 m</strong> &bull; LB: <strong className="text-blue-700">{activeProject.id === 'p1' ? '36' : activeProject.id === 'p2' ? '45' : '54'} m²</strong> &bull; LT: <strong className="text-blue-700">{activeProject.id === 'p1' ? '60' : activeProject.id === 'p2' ? '72' : '84'} m²</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Denah A4</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Halo, berikut kami kirimkan denah arsitektur dan spesifikasi resmi rumah ${activeProject.name} (Tipe 36/60). Silakan hubungi kami untuk survei show unit langsung!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Kirim Denah via WA</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Interactive Vector Floor Plan SVG (7 Cols) */}
              <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-inner flex flex-col items-center select-none overflow-x-auto">
                <p className="text-[11px] font-mono text-slate-400 mb-3 text-center">
                  💡 Klik ruangan pada denah untuk melihat spesifikasi teknis material
                </p>

                <svg
                  viewBox="0 0 540 680"
                  className="w-full max-w-[460px] h-auto drop-shadow-md bg-white rounded-xl border-2 border-slate-300 p-2"
                >
                  <defs>
                    <pattern id="lawnTile" width="12" height="12" patternUnits="userSpaceOnUse">
                      <rect width="12" height="12" fill="#DCFCE7" />
                      <circle cx="6" cy="6" r="1.5" fill="#86EFAC" />
                    </pattern>
                    <pattern id="carportTile" width="16" height="16" patternUnits="userSpaceOnUse">
                      <rect width="16" height="16" fill="#F1F5F9" />
                      <line x1="0" y1="0" x2="16" y2="16" stroke="#E2E8F0" strokeWidth="1" />
                      <line x1="16" y1="0" x2="0" y2="16" stroke="#E2E8F0" strokeWidth="1" />
                    </pattern>
                  </defs>

                  {/* Exterior Perimeter Border */}
                  <rect x="20" y="20" width="500" height="640" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" rx="4" />

                  {/* 1. Sisa Lahan Belakang (Taman Belakang & Area Cuci) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('backyard')}
                  >
                    <rect 
                      x="24" y="24" width="492" height="96" 
                      fill={selectedRoom === 'backyard' ? '#BBF7D0' : 'url(#lawnTile)'} 
                      stroke={selectedRoom === 'backyard' ? '#2563EB' : '#16A34A'} 
                      strokeWidth={selectedRoom === 'backyard' ? 3 : 1.5}
                    />
                    <text x="270" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                      TAMAN BELAKANG &amp; AREA CUCI JEMUR
                    </text>
                    <text x="270" y="82" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#15803D">
                      (Sisa Tanah: 6.0 x 1.5 m)
                    </text>
                  </g>

                  {/* Horizontal Main Dividing Wall */}
                  <line x1="20" y1="120" x2="520" y2="120" stroke="#0F172A" strokeWidth="6" />

                  {/* 2. Dapur & Ruang Makan */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('kitchen')}
                  >
                    <rect 
                      x="24" y="123" width="220" height="130" 
                      fill={selectedRoom === 'kitchen' ? '#DBEAFE' : '#F8FAFC'} 
                      stroke={selectedRoom === 'kitchen' ? '#2563EB' : '#94A3B8'} 
                      strokeWidth={selectedRoom === 'kitchen' ? 3 : 1}
                    />
                    {/* Kitchen counter illustration */}
                    <rect x="28" y="127" width="100" height="24" fill="#CBD5E1" rx="2" />
                    <circle cx="50" cy="139" r="6" fill="#64748B" />
                    <text x="134" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E293B">
                      DAPUR &amp; MEJA MAKAN
                    </text>
                    <text x="134" y="196" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#64748B">
                      2.5 x 2.0 m
                    </text>
                  </g>

                  {/* 3. Kamar Mandi */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('bathroom')}
                  >
                    <rect 
                      x="244" y="123" width="116" height="130" 
                      fill={selectedRoom === 'bathroom' ? '#CFFAFE' : '#F0FDFA'} 
                      stroke={selectedRoom === 'bathroom' ? '#2563EB' : '#0D9488'} 
                      strokeWidth={selectedRoom === 'bathroom' ? 3 : 1}
                    />
                    {/* Toilet bowl sketch */}
                    <ellipse cx="302" cy="150" rx="10" ry="14" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
                    <text x="302" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#115E59">
                      KM / WC
                    </text>
                    <text x="302" y="205" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#0D9488">
                      1.5 x 1.5 m
                    </text>
                  </g>

                  {/* Vertical Dividing Wall between Bath and Bed 2 */}
                  <line x1="360" y1="120" x2="360" y2="400" stroke="#0F172A" strokeWidth="6" />

                  {/* 4. Kamar Tidur Anak (Bed 2) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('bedroom_2')}
                  >
                    <rect 
                      x="363" y="123" width="153" height="150" 
                      fill={selectedRoom === 'bedroom_2' ? '#FEF3C7' : '#FFFDF5'} 
                      stroke={selectedRoom === 'bedroom_2' ? '#2563EB' : '#F59E0B'} 
                      strokeWidth={selectedRoom === 'bedroom_2' ? 3 : 1}
                    />
                    {/* Bed illustration */}
                    <rect x="420" y="130" width="90" height="60" rx="3" fill="#FDE68A" stroke="#D97706" />
                    <text x="440" y="210" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400E">
                      KAMAR TIDUR 2
                    </text>
                    <text x="440" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#B45309">
                      2.8 x 2.8 m
                    </text>
                  </g>

                  {/* Horizontal dividing wall between Bed 2 and Bed 1 */}
                  <line x1="360" y1="273" x2="520" y2="273" stroke="#0F172A" strokeWidth="6" />

                  {/* 5. Ruang Tamu & Ruang Keluarga */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('living_room')}
                  >
                    <rect 
                      x="24" y="253" width="336" height="190" 
                      fill={selectedRoom === 'living_room' ? '#DBEAFE' : '#F8FAFC'} 
                      stroke={selectedRoom === 'living_room' ? '#2563EB' : '#3B82F6'} 
                      strokeWidth={selectedRoom === 'living_room' ? 3 : 1}
                    />
                    {/* Sofa illustration */}
                    <rect x="40" y="300" width="30" height="70" rx="4" fill="#BFDBFE" stroke="#3B82F6" />
                    <rect x="80" y="320" width="40" height="30" rx="3" fill="#E2E8F0" />
                    <text x="190" y="335" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E3A8A">
                      RUANG TAMU &amp; KELUARGA
                    </text>
                    <text x="190" y="352" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#3B82F6">
                      3.0 x 4.0 m (Plafon 3.2m)
                    </text>
                  </g>

                  {/* 6. Kamar Tidur Utama (Master Bedroom) */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('master_bedroom')}
                  >
                    <rect 
                      x="363" y="276" width="153" height="167" 
                      fill={selectedRoom === 'master_bedroom' ? '#FEF3C7' : '#FFFBEB'} 
                      stroke={selectedRoom === 'master_bedroom' ? '#2563EB' : '#F59E0B'} 
                      strokeWidth={selectedRoom === 'master_bedroom' ? 3 : 1}
                    />
                    {/* Queen Bed illustration */}
                    <rect x="410" y="320" width="100" height="80" rx="4" fill="#FDE68A" stroke="#D97706" />
                    <text x="440" y="355" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350F">
                      KAMAR UTAMA
                    </text>
                    <text x="440" y="372" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#B45309">
                      3.0 x 3.0 m
                    </text>
                  </g>

                  {/* Horizontal Front Wall dividing House and Yard */}
                  <line x1="20" y1="443" x2="520" y2="443" stroke="#0F172A" strokeWidth="6" />

                  {/* 7. Teras Depan */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('terrace')}
                  >
                    <rect 
                      x="160" y="446" width="130" height="50" 
                      fill={selectedRoom === 'terrace' ? '#DBEAFE' : '#F1F5F9'} 
                      stroke={selectedRoom === 'terrace' ? '#2563EB' : '#94A3B8'} 
                      strokeWidth={selectedRoom === 'terrace' ? 2.5 : 1}
                    />
                    <text x="225" y="475" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">
                      TERAS (1.5 x 1.0 m)
                    </text>
                  </g>

                  {/* 8. Carport Mobil */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('carport')}
                  >
                    <rect 
                      x="24" y="446" width="240" height="210" 
                      fill={selectedRoom === 'carport' ? '#E2E8F0' : 'url(#carportTile)'} 
                      stroke={selectedRoom === 'carport' ? '#2563EB' : '#94A3B8'} 
                      strokeWidth={selectedRoom === 'carport' ? 3 : 1}
                    />
                    {/* Car silhouette representation */}
                    <rect x="80" y="480" width="110" height="150" rx="16" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="6 4" />
                    <text x="135" y="555" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
                      CARPORT MOBIL
                    </text>
                    <text x="135" y="572" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#64748B">
                      3.0 x 4.5 m (Rabat Beton)
                    </text>
                  </g>

                  {/* 9. Taman Depan */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => setSelectedRoom('front_yard')}
                  >
                    <rect 
                      x="264" y="496" width="252" height="160" 
                      fill={selectedRoom === 'front_yard' ? '#BBF7D0' : 'url(#lawnTile)'} 
                      stroke={selectedRoom === 'front_yard' ? '#2563EB' : '#16A34A'} 
                      strokeWidth={selectedRoom === 'front_yard' ? 3 : 1}
                    />
                    <circle cx="390" cy="565" r="16" fill="#86EFAC" stroke="#16A34A" />
                    <text x="390" y="600" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                      TAMAN DEPAN HIJAU
                    </text>
                    <text x="390" y="616" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#15803D">
                      3.0 x 2.5 m
                    </text>
                  </g>

                  {/* Main Entry Door Swing Arc */}
                  <path d="M 170 443 A 35 35 0 0 1 205 478" fill="none" stroke="#2563EB" strokeWidth="2" />
                  <line x1="170" y1="443" x2="205" y2="443" stroke="#2563EB" strokeWidth="3" />

                  {/* North Compass Indicator */}
                  <circle cx="485" cy="55" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
                  <text x="485" y="51" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#EF4444">▲</text>
                  <text x="485" y="66" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0F172A">U</text>
                </svg>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 font-mono">
                  <span>Skala Proporsional 1:100</span>
                  <span>&bull;</span>
                  <span>Standar SNI Perumahan Rakyat</span>
                </div>
              </div>

              {/* Right Column: Room Specification Inspector (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Room Pills Selector */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2 font-mono">
                    Pilih Ruangan untuk Diinspeksi:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'master_bedroom', label: 'Kamar Utama' },
                      { id: 'bedroom_2', label: 'Kamar Anak' },
                      { id: 'living_room', label: 'R. Tamu' },
                      { id: 'kitchen', label: 'Dapur' },
                      { id: 'bathroom', label: 'KM / WC' },
                      { id: 'carport', label: 'Carport' },
                      { id: 'front_yard', label: 'Taman Depan' },
                      { id: 'backyard', label: 'Sisa Belakang' }
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRoom(r.id)}
                        className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                          selectedRoom === r.id
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Room Detail Card */}
                {(() => {
                  const ROOM_DATA: Record<string, { title: string; dim: string; area: string; floor: string; walls: string; ceiling: string; vent: string; capacity: string; icon: any }> = {
                    master_bedroom: {
                      title: 'Kamar Tidur Utama (Master Bedroom)',
                      dim: '3.00 x 3.00 Meter',
                      area: '9.0 m²',
                      floor: 'Granit Tile 60x60 cm Glazed Polished',
                      walls: 'Bata Ringan Hebel diplester aci halus + Cat Dulux Weathercoat',
                      ceiling: 'Plafon Gypsum Board tinggi 3.20 meter (adem & sejuk)',
                      vent: 'Jendela Swing Aluminium motif kayu menghadap taman depan (cahaya alami maksimal)',
                      capacity: 'Muat Tempat Tidur Queen Size (160x200), Lemari Pakaian 3 Pintu, & Meja Rias',
                      icon: BedDouble
                    },
                    bedroom_2: {
                      title: 'Kamar Tidur Anak / Tamu (Bedroom 2)',
                      dim: '2.80 x 2.80 Meter',
                      area: '7.8 m²',
                      floor: 'Granit Tile 60x60 cm Glazed Polished',
                      walls: 'Bata Ringan Hebel diplester aci halus + Cat Emulsi',
                      ceiling: 'Plafon Gypsum Board tinggi 3.20 meter',
                      vent: 'Jendela Geser Aluminium menghadap ruang terbuka belakang (cross ventilation)',
                      capacity: 'Muat Tempat Tidur Single (120x200), Meja Belajar Anak, & Lemari 2 Pintu',
                      icon: BedDouble
                    },
                    living_room: {
                      title: 'Ruang Tamu & Ruang Keluarga Terpadu',
                      dim: '3.00 x 4.00 Meter',
                      area: '12.0 m²',
                      floor: 'Granit Tile 60x60 cm Glazed Polished',
                      walls: 'Bata Ringan Plester Aci + Cat Interior Premium',
                      ceiling: 'Plafon Drop Ceiling Gypsum 3.40 meter dengan instalasi lampu LED warm white',
                      vent: 'Pintu Utama Kayu Solid Kamper + Jendela Kaca Mati & Jendela Buka',
                      capacity: 'Muat Sofa L-Shape 3 Seater, Meja Kopi, & Rak Kredensa TV hingga 55 inch',
                      icon: Home
                    },
                    kitchen: {
                      title: 'Dapur & Area Makan Keluarga',
                      dim: '2.50 x 2.00 Meter',
                      area: '5.0 m²',
                      floor: 'Keramik Granit Anti-Slip 60x60 cm',
                      walls: 'Meja Dapur Cor Beton lapis Keramik + Backsplash Dinding Keramik',
                      ceiling: 'Plafon Gypsum Rangka Hollow Galvanis',
                      vent: 'Akses langsung pintu kaca ke area sisa tanah belakang',
                      capacity: 'Kitchen Sink Stainless Steel, Kompor Gas 2 Tungku, Kulkas 2 Pintu, & Meja Makan 4 Kursi',
                      icon: Utensils
                    },
                    bathroom: {
                      title: 'Kamar Mandi / WC',
                      dim: '1.50 x 1.50 Meter',
                      area: '2.25 m²',
                      floor: 'Keramik Kasar Tekstur Anti-Slip 30x30 cm',
                      walls: 'Keramik Dinding Full Tinggi 2 Meter (bebas rembes)',
                      ceiling: 'Plafon GRC Board Tahan Air & Kelembapan',
                      vent: 'Bovenlicht / Exhaust Grill Sirkulasi Udara Bebas Pengap',
                      capacity: 'Kloset Duduk Eco-Washer American Standard, Hand Shower Stainless, & Kran Wudhu',
                      icon: Bath
                    },
                    carport: {
                      title: 'Carport Kendaraan Roda 4 & Motor',
                      dim: '3.00 x 4.50 Meter',
                      area: '13.5 m²',
                      floor: 'Lantai Rabat Beton Trowel dengan Aksen Coral Sikat Garis Tali Air',
                      walls: 'Pilar Beton Minimalis + Pagar Pembatas Samping',
                      ceiling: 'Open Canopy Ready (Sudah disediakan tumpuan baja ringan)',
                      vent: 'Terbuka bebas akses langsung ke jalan boulevard komplek 10m',
                      capacity: 'Muat 1 Mobil MPV / SUV (Avanza / Innova / Pajero) + 2 Sepeda Motor',
                      icon: Car
                    },
                    front_yard: {
                      title: 'Taman Depan Penghijauan',
                      dim: '3.00 x 2.50 Meter',
                      area: '7.5 m²',
                      floor: 'Rumput Gajah Mini Hijau Subur + Tanaman Hias Pucuk Merah',
                      walls: 'Batas Tanah Kavling Asli',
                      ceiling: 'Terbuka Alam Bebas',
                      vent: 'Resapan air hujan mandiri dengan pipa biopori',
                      capacity: 'Area penghijauan estetis & sirkulasi udara bersih untuk kamar utama',
                      icon: Trees
                    },
                    backyard: {
                      title: 'Taman Belakang & Sisa Lahan Pengembangan',
                      dim: '6.00 x 1.50 Meter',
                      area: '9.0 m²',
                      floor: 'Tanah Asli Siap Renovasi / Area Cuci Pakaian',
                      walls: 'Tembok Belakang Keliling Tinggi 2.50 Meter (Aman & Privat)',
                      ceiling: 'Terbuka (Bisa ditutup kanopi transparan / polikarbonat)',
                      vent: 'Sirkulasi udara cross-ventilation ke seluruh bagian belakang rumah',
                      capacity: 'Dapat dikembangkan menjadi Dapur Tertutup, Kamar Tidur ke-3, atau Kolam Ikan Minimalis',
                      icon: Maximize2
                    }
                  };

                  const current = ROOM_DATA[selectedRoom] || ROOM_DATA['master_bedroom'];
                  const Icon = current.icon;

                  return (
                    <div className="crm-card p-5 bg-white rounded-2xl border-slate-200/90 shadow-2xs space-y-4">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-snug">{current.title}</h4>
                          <p className="text-[11px] font-mono text-blue-700 font-bold">
                            Dimensi: {current.dim} &bull; Luas: {current.area}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Finishing Lantai</span>
                          <p className="font-semibold text-slate-800">{current.floor}</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Dinding &amp; Cat</span>
                          <p className="text-slate-700">{current.walls}</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Ketinggian Plafon</span>
                          <p className="text-slate-700">{current.ceiling}</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Ventilasi &amp; Cahaya Alami</span>
                          <p className="text-slate-700">{current.vent}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-mono uppercase font-bold text-blue-700 block">Rekomendasi Kapasitas Interior</span>
                          <p className="text-slate-800 font-medium text-[11px] mt-0.5">{current.capacity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Developer Construction Specs Guarantee */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Garansi Mutu Bangunan Developer (100 Hari):
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Setiap unit perumahan bergaransi pemeliharaan kebocoran atap, keretakan dinding, dan instalasi pipa air selama 100 hari kalender sejak serah terima kunci (BAST).
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* VIEW MODE 4: GALERI SHOW UNIT & BROSUR DIGITAL MARKETING */}
        {viewMode === 'gallery' && (() => {
          const GALLERY_PHOTOS = [
            {
              id: 0,
              title: 'Fasad Tampak Depan Modern Minimalis',
              tag: 'Eksterior & Carport',
              desc: 'Desain tampak muka dengan aksen batu alam andesit, kusen aluminium powder coat hitam, dan carport rabat beton 4.5 meter.',
              specs: 'Tipe 36/60 & 45/72 • Atap Genteng Metal Berpasir • Carport 1 Mobil & 2 Motor',
              bgGradient: 'from-blue-900 via-slate-800 to-indigo-950',
              accent: 'border-blue-500/40 text-blue-300'
            },
            {
              id: 1,
              title: 'Ruang Tamu & Ruang Keluarga Open Space',
              tag: 'Interior Utama',
              desc: 'Konsep ruang terbuka tanpa sekat kaku dengan ketinggian plafon 3.20 meter memberikan sirkulasi udara sejuk alami dan pencahayaan maksimal.',
              specs: 'Lantai Granit Tile 60x60 cm • Drop Ceiling LED Warm White • Cat Weathercoat Jotun',
              bgGradient: 'from-slate-900 via-indigo-950 to-slate-800',
              accent: 'border-emerald-500/40 text-emerald-300'
            },
            {
              id: 2,
              title: 'Kamar Tidur Utama (Master Bedroom)',
              tag: 'Kamar Tidur',
              desc: 'Kamar tidur lega berdimensi 3.0 x 3.0 meter dengan jendela kaca sliding aluminium menghadap taman depan asri.',
              specs: 'Pintu Engineering Solid Wood • Stop Kontak AC 1/2 PK Siap Pasang • Saklar Panasonic',
              bgGradient: 'from-indigo-950 via-slate-900 to-blue-950',
              accent: 'border-indigo-500/40 text-indigo-300'
            },
            {
              id: 3,
              title: 'Kamar Mandi Bersih & Higienis',
              tag: 'Sanitair',
              desc: 'Kamar mandi finishing keramik dinding motif marmer setinggi 2 meter, kloset duduk Toto dengan eco-washer dan shower set stainless.',
              specs: 'Kloset Duduk Toto / American Standard • Floor Drain Anti-Kecoa • Ventilasi Bovenlicht',
              bgGradient: 'from-blue-950 via-cyan-950 to-slate-900',
              accent: 'border-cyan-500/40 text-cyan-300'
            },
            {
              id: 4,
              title: 'Dapur Minimalis & Backyard Sisa Lahan',
              tag: 'Dapur & Servis',
              desc: 'Meja dapur cor beton bertulang lapis granit dengan sink cuci piring stainless steel, terhubung ke sisa lahan belakang seluas 6x1.5 meter.',
              specs: 'Sink Stainless + Kran Leher Angsa • Keramik Meja Granit 60x60 • Saluran Pipa Biopori',
              bgGradient: 'from-slate-900 via-emerald-950 to-slate-950',
              accent: 'border-amber-500/40 text-amber-300'
            },
            {
              id: 5,
              title: 'Gerbang Kawasan One Gate System',
              tag: 'Fasilitas Kawasan',
              desc: 'Pintu masuk perumahan eksklusif dengan pos keamanan 24 jam, barrier gate otomatis, dan kamera CCTV pengawas di seluruh sudut jalan.',
              specs: 'Row Jalan 10 Meter Aspal Hotmix • Lampu PJU LED Solar Cell • Taman Tematik Warga',
              bgGradient: 'from-slate-950 via-slate-800 to-blue-900',
              accent: 'border-purple-500/40 text-purple-300'
            }
          ];

          return (
            <div className="space-y-6">
              
              {/* Marketing Action Toolbar */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-600" />
                    Galeri Visual Show Unit &amp; Brosur Pemasaran Digital
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    Materi visual resolusi tinggi untuk presentasi tatap muka, pameran properti, atau pengiriman via WhatsApp.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSendBrochureWhatsApp}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Brosur (WA)</span>
                  </button>
                  <button
                    onClick={() => setIsPricelistModalOpen(true)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Brosur A4</span>
                  </button>
                </div>
              </div>

              {/* 6 Photo Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {GALLERY_PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden hover:shadow-md hover:border-blue-300 transition group flex flex-col justify-between"
                  >
                    {/* Visual Mockup Header */}
                    <div className={`h-48 bg-gradient-to-br ${photo.bgGradient} p-4 text-white relative flex flex-col justify-between overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition pointer-events-none" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-black/40 backdrop-blur-xs border ${photo.accent}`}>
                          {photo.tag}
                        </span>
                        <button
                          onClick={() => setActiveGalleryPhoto(photo.id)}
                          className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition"
                          title="Perbesar Foto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h4 className="font-extrabold text-sm text-white leading-tight drop-shadow-xs">
                          {photo.title}
                        </h4>
                        <p className="text-[10px] text-slate-300 font-mono">
                          {activeProject.name}
                        </p>
                      </div>
                    </div>

                    {/* Photo Details */}
                    <div className="p-4 space-y-3 text-xs flex-1 flex flex-col justify-between">
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {photo.desc}
                      </p>

                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Spesifikasi Teknis:
                        </span>
                        <p className="text-[11px] font-semibold text-slate-800">
                          {photo.specs}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <button
                        onClick={() => setActiveGalleryPhoto(photo.id)}
                        className="w-full py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold rounded-lg text-xs transition border border-slate-200"
                      >
                        Lihat Detail Resolusi Penuh →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spesifikasi Teknis Material Standar SNI */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        Spesifikasi Teknis Material Standar PUPR &amp; SNI
                      </h4>
                      <p className="text-xs text-slate-500">Mutu material bangunan resmi PT Garut Sejahtera Property</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Garansi Mutu 100 Hari
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Pondasi &amp; Struktur</span>
                    <strong className="text-slate-800 text-[11px] block mt-0.5">Batu Kali Belah + Beton K-225</strong>
                    <span className="text-[10px] text-slate-500">Pembesian 8-10mm SNI anti gempa</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Dinding &amp; Cat</span>
                    <strong className="text-slate-800 text-[11px] block mt-0.5">Bata Ringan (Hebel) Plester Aci</strong>
                    <span className="text-[10px] text-slate-500">Cat Weathercoat Jotun tahan cuaca</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Lantai Utama</span>
                    <strong className="text-slate-800 text-[11px] block mt-0.5">Granit Tile 60x60 cm</strong>
                    <span className="text-[10px] text-slate-500">Glazed polished mewah bebas gores</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Kusen &amp; Daun Pintu</span>
                    <strong className="text-slate-800 text-[11px] block mt-0.5">Aluminium Powder Coat 3 Inch</strong>
                    <span className="text-[10px] text-slate-500">Pintu utama engineering solid wood</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Rangka &amp; Penutup Atap</span>
                    <strong className="text-slate-800 text-[11px] block mt-0.5">Baja Ringan C75 + Genteng Metal</strong>
                    <span className="text-[10px] text-slate-500">Genteng metal berpasir kedap suara hujan</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Sanitair &amp; Air Bersih</span>
                    <strong className="text-slate-800 text-[11px] block mt-0.5">Kloset Duduk Toto + Pompa Submersible</strong>
                    <span className="text-[10px] text-slate-500">Sumur bor artesis jernih + toren 500L</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })()}
      </div>

      {/* Lightbox Modal */}
      {activeGalleryPhoto !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" />
                Pratinjau Show Unit &bull; {activeProject.name}
              </span>
              <button
                onClick={() => setActiveGalleryPhoto(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="h-64 rounded-xl bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 text-white flex flex-col justify-end relative overflow-hidden border border-slate-800">
                <div className="relative z-10 space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Kualitas Visual High-Res
                  </span>
                  <h3 className="font-extrabold text-lg text-white">
                    Show Unit — {activeProject.name}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Foto aktual arsitektur tipe rumah standar developer dengan material bersertifikat SNI.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Garansi Bangunan: <strong>100 Hari Kalender Pasca BAST</strong></span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendBrochureWhatsApp}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Bagikan ke Konsumen (WA)</span>
                  </button>
                  <button
                    onClick={() => setActiveGalleryPhoto(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal Dialog */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Form Booking Kavling Unit</h3>
                  <p className="text-[11px] text-slate-500">{activeProject.name} — Unit {selectedUnit.code}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUnit(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
              {/* Unit Summary Card */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Unit Kavling Terpilih</span>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedUnit.code}</p>
                  <p className="text-[11px] text-slate-600">Luas: {selectedUnit.buildingArea}m² (Bangunan) / {selectedUnit.landArea}m² (Tanah)</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500">Harga Jual Unit</span>
                  <p className="text-sm font-extrabold text-blue-700 font-mono">
                    Rp {selectedUnit.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Pembeli *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Ibu Siti Nurhaliza"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp Pembeli *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 082119876543"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Skema Pembayaran</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="KPR Subsidi FLPP">KPR Subsidi FLPP</option>
                    <option value="KPR Komersial">KPR Komersial</option>
                    <option value="Cash Keras">Cash Keras</option>
                    <option value="Cash Bertahap">Cash Bertahap</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Booking Fee (Rp) *</label>
                  <input 
                    type="number" 
                    required
                    value={bookingFee}
                    onChange={(e) => setBookingFee(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PIC Marketing</label>
                  <select 
                    value={marketingPIC}
                    onChange={(e) => setMarketingPIC(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Kang Dika Pratama">Kang Dika Pratama</option>
                    <option value="Teh Nisa Andriani">Teh Nisa Andriani</option>
                    <option value="Kang Fajar Ramadhan">Kang Fajar Ramadhan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Tambahan Transaksi</label>
                <textarea 
                  rows={2}
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUnit(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kunci Booking (Row-Locking TX)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Locked Unit Protection Modal Dialog */}
      {lockedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg text-white flex items-center justify-center ${
                  lockedUnit.status === 'sold' ? 'bg-slate-600' : 'bg-amber-500'
                }`}>
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Unit Kavling Terkunci</h3>
                  <p className="text-[11px] text-slate-500">{activeProject.name} — Unit {lockedUnit.code}</p>
                </div>
              </div>
              <button 
                onClick={() => setLockedUnit(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                lockedUnit.status === 'sold' ? 'bg-slate-50 border-slate-200' : 'bg-amber-50 border-amber-200'
              }`}>
                <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${
                  lockedUnit.status === 'sold' ? 'text-slate-600' : 'text-amber-600'
                }`} />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 uppercase">
                    Status: {lockedUnit.status === 'sold' ? 'Unit Sudah Terjual (Akad Selesai)' : 'Unit Telah Di-Booking'}
                  </p>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Sesuai perlindungan <strong>PostgreSQL Transaction Row-Locking</strong>, unit kavling ini terkunci secara permanen/eksklusif dan <strong>tidak dapat dipilih ulang</strong> guna mencegah terjadinya double-booking antar marketing.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-400">Kode Kavling:</span>
                  <span className="font-bold text-slate-900">{lockedUnit.code}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-400">Luas Bangunan / Tanah:</span>
                  <span className="font-medium text-slate-800">{lockedUnit.buildingArea}m² / {lockedUnit.landArea}m²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-400">Harga Terkunci:</span>
                  <span className="font-mono font-bold text-blue-700">Rp {lockedUnit.price.toLocaleString('id-ID')}</span>
                </div>
                {lockedUnit.bookedBy && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Pemesan:</span>
                    <span className="font-bold text-slate-800">{lockedUnit.bookedBy}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLockedUnit(null)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition"
                >
                  Tutup Informasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Pricelist & Kavling Availability Modal */}
      {isPricelistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden animate-in zoom-in-95 my-8">
            
            {/* Modal Action Bar (Hidden when printed) */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Daftar Harga &amp; Ketersediaan Kavling Resmi (Pricelist A4)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendPricelistWhatsApp}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Kirim WhatsApp</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF A4</span>
                </button>
                <button
                  onClick={() => setIsPricelistModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 font-sans print:p-0">
              
              {/* Kop Surat Developer */}
              <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                      PT GARUT SEJAHTERA PROPERTY
                    </h2>
                    <p className="text-[11px] text-slate-600">
                      Pengembang Resmi Perumahan Subsidi FLPP &amp; Komersial Berizin APERSI
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Kantor Pemasaran: Jl. Raya Cimanuk No. 88, Garut, Jawa Barat &bull; Telp: (0262) 234-8899
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold block mb-1">
                    PRICELIST RESMI #{activeProject.id.toUpperCase()}-2026
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Periode: November 2026
                  </span>
                </div>
              </div>

              {/* Title & Project Info */}
              <div className="text-center py-1">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 underline decoration-2 underline-offset-4">
                  DAFTAR HARGA, SKEMA KPR &amp; STATUS KAVLING
                </h3>
                <p className="text-xs font-bold text-blue-700 mt-1">
                  Cluster: {activeProject.name} — {activeProject.location}, {activeProject.city}
                </p>
              </div>

              {/* Summary Stats Badges */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block">Total Kavling</span>
                  <span className="font-extrabold font-mono text-slate-900 text-sm">{activeUnits.length} Unit</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 uppercase block">Ready / Kosong</span>
                  <span className="font-extrabold font-mono text-emerald-700 text-sm">{availableCount} Unit</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-800 uppercase block">Ter-Booking</span>
                  <span className="font-extrabold font-mono text-amber-700 text-sm">{bookedCount} Unit</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                  <span className="text-[10px] text-slate-600 uppercase block">Terjual / Akad</span>
                  <span className="font-extrabold font-mono text-slate-700 text-sm">{soldCount} Unit</span>
                </div>
              </div>

              {/* Filter Tabs (Print:hidden) */}
              <div className="flex items-center gap-1.5 print:hidden">
                <span className="text-[11px] font-bold text-slate-600 mr-2">Filter Tampilan:</span>
                <button
                  onClick={() => setPricelistFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    pricelistFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua ({activeUnits.length})
                </button>
                <button
                  onClick={() => setPricelistFilter('available')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    pricelistFilter === 'available' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Ready ({availableCount})
                </button>
                <button
                  onClick={() => setPricelistFilter('booked')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    pricelistFilter === 'booked' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Booked ({bookedCount})
                </button>
                <button
                  onClick={() => setPricelistFilter('sold')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    pricelistFilter === 'sold' ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Sold ({soldCount})
                </button>
              </div>

              {/* Kavling Price Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/90 text-slate-800 font-bold text-[10px] uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">No. Kavling</th>
                      <th className="p-2.5">Tipe / Luas</th>
                      <th className="p-2.5">Cash Keras (-5%)</th>
                      <th className="p-2.5">Plafon KPR (99%)</th>
                      <th className="p-2.5 text-center">Angsuran 15 Thn (5%)</th>
                      <th className="p-2.5 text-center">Angsuran 20 Thn (5%)</th>
                      <th className="p-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    {activeUnits
                      .filter(u => pricelistFilter === 'all' || u.status === pricelistFilter)
                      .map((u) => {
                        const cashPrice = Math.round(u.price * 0.95);
                        const plafonKpr = Math.round(u.price * 0.99); // DP 1% subsidi
                        // FLPP Annuity Formula (5% p.a.)
                        const monthlyRate = 0.05 / 12;
                        const n15 = 15 * 12;
                        const cicilan15 = Math.round((plafonKpr * monthlyRate * Math.pow(1 + monthlyRate, n15)) / (Math.pow(1 + monthlyRate, n15) - 1));
                        const n20 = 20 * 12;
                        const cicilan20 = Math.round((plafonKpr * monthlyRate * Math.pow(1 + monthlyRate, n20)) / (Math.pow(1 + monthlyRate, n20) - 1));

                        return (
                          <tr key={u.code} className="hover:bg-slate-50">
                            <td className="p-2.5 font-sans font-bold text-slate-900">{u.code}</td>
                            <td className="p-2.5 font-sans text-slate-600">{u.buildingArea}/{u.landArea} m²</td>
                            <td className="p-2.5 text-slate-700">Rp {cashPrice.toLocaleString('id-ID')}</td>
                            <td className="p-2.5 font-bold text-slate-900">Rp {plafonKpr.toLocaleString('id-ID')}</td>
                            <td className="p-2.5 text-center text-blue-700 font-semibold">Rp {cicilan15.toLocaleString('id-ID')} /bln</td>
                            <td className="p-2.5 text-center text-emerald-700 font-bold">Rp {cicilan20.toLocaleString('id-ID')} /bln</td>
                            <td className="p-2.5 text-center font-sans">
                              {u.status === 'available' ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  Ready
                                </span>
                              ) : u.status === 'booked' ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                  Booked
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                  Sold
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Terms & Conditions Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                <p className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">Syarat &amp; Ketentuan Promo Berjalan:</p>
                <ul className="list-disc list-inside space-y-0.5 leading-relaxed">
                  <li>Tanda Jadi (Booking Fee) sebesar Rp 1.500.000 mengunci nomor kavling selama 14 hari kerja.</li>
                  <li>Suku bunga KPR Subsidi FLPP adalah <strong>5.0% tetap sampai lunas (*fixed* s.d. 20 tahun)</strong> bekerjasama dengan Bank BTN.</li>
                  <li>Harga sudah termasuk: Sertifikat Hak Milik (SHM), IMB/PBG, Listrik PLN 1300 VA, dan Jaringan Air Bersih.</li>
                  <li>Bebas Biaya: BPHTB, AJB, BBN, dan Biaya Administrasi Notaris (Khusus booking bulan ini).</li>
                </ul>
              </div>

              {/* Dual Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-6 text-center text-xs text-slate-700">
                <div className="space-y-12">
                  <p className="font-medium text-[11px] text-slate-500">Diverifikasi &amp; Diterbitkan Oleh,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline">Kang Dika Pratama</p>
                    <p className="text-[10px] text-slate-500">Head of Marketing &amp; Sales</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <p className="font-medium text-[11px] text-slate-500">Mengetahui &amp; Menyetujui,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline">MUHAMMAD RIZAL</p>
                    <p className="text-[10px] text-slate-500">Direktur Utama PT Garut Sejahtera Propertindo</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Close Button */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end print:hidden">
              <button
                onClick={() => setIsPricelistModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
