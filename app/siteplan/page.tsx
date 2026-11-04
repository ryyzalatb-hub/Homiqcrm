'use client';
import React, { useState } from 'react';
import { 
  Map, 
  Layers, 
  Home, 
  CheckCircle2, 
  Lock, 
  User, 
  Phone, 
  X, 
  Sparkles, 
  Search, 
  Filter, 
  Maximize2, 
  CreditCard, 
  Send, 
  Share2, 
  Building2, 
  Compass, 
  Trees, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { DEMO_PROJECTS, DEMO_LEADS } from '@/lib/demo-data';
import { buildWhatsAppLink, formatPhoneDisplay } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';
import InstantBookingFeeModal from '@/components/proptech/InstantBookingFeeModal';

interface LotUnit {
  id: string;
  code: string;
  block: string;
  number: number;
  type: string;
  landArea: number;
  buildingArea: number;
  price: number;
  status: 'available' | 'booked' | 'sold';
  facing: 'Utara' | 'Selatan' | 'Timur' | 'Barat';
  isCorner: boolean;
  buyerName?: string;
  buyerPhone?: string;
  bookingCode?: string;
  marketingName?: string;
}

export default function InteractiveSiteplanPage() {
  const { showToast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('p1');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'booked' | 'sold'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Lot for Drawer Modal
  const [activeLot, setActiveLot] = useState<LotUnit | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Form Booking State
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('KPR Subsidi FLPP');
  const [bookingFee, setBookingFee] = useState('1500000');
  const [marketingPic, setMarketingPic] = useState('Kang Dika Pratama');

  // Masterplan lots state
  const [lots, setLots] = useState<Record<string, LotUnit[]>>(() => {
    const data: Record<string, LotUnit[]> = {};

    // P1: Bumi Cimanuk Asri (25 units)
    data['p1'] = Array.from({ length: 25 }, (_, i) => {
      const num = i + 1;
      const code = `A-${num < 10 ? '0' + num : num}`;
      let status: 'available' | 'booked' | 'sold' = 'available';
      let buyerName = undefined;
      let buyerPhone = undefined;

      if (num === 1) {
        status = 'sold';
        buyerName = 'Bapak Hendra Lesmana';
        buyerPhone = '6281355667788';
      } else if (num === 2) {
        status = 'sold';
        buyerName = 'Bapak Irwan Santoso';
        buyerPhone = '6281233445599';
      } else if (num === 6) {
        status = 'booked';
        buyerName = 'Bapak Agus Setiawan';
        buyerPhone = '6281223456789';
      } else if (num === 7) {
        status = 'booked';
        buyerName = 'Ibu Siti Patonah';
        buyerPhone = '6283857061667';
      } else if (num === 8) {
        status = 'booked';
        buyerName = 'Bapak Hasanudin';
        buyerPhone = '6282215269402';
      }

      return {
        id: `lot-p1-${num}`,
        code,
        block: 'A',
        number: num,
        type: 'Tipe 36/60 (Subsidi FLPP)',
        landArea: num % 5 === 0 ? 75 : 60,
        buildingArea: 36,
        price: num % 5 === 0 ? 185000000 : 166000000,
        status,
        facing: num <= 12 ? 'Utara' : 'Selatan',
        isCorner: num % 5 === 0,
        buyerName,
        buyerPhone,
        bookingCode: status !== 'available' ? `BOK-202611-A${num}` : undefined,
        marketingName: 'Kang Dika Pratama'
      };
    });

    // P2: Grand Karangpawitan (20 units)
    data['p2'] = Array.from({ length: 20 }, (_, i) => {
      const num = i + 1;
      const code = `B-${num < 10 ? '0' + num : num}`;
      let status: 'available' | 'booked' | 'sold' = 'available';
      let buyerName = undefined;
      let buyerPhone = undefined;

      if (num === 1) {
        status = 'sold';
        buyerName = 'Ibu Lilis Karlina';
        buyerPhone = '6281244556677';
      } else if (num === 4) {
        status = 'booked';
        buyerName = 'Ibu Hj. Siti Nurhaliza';
        buyerPhone = '6282119876543';
      } else if (num === 5) {
        status = 'booked';
        buyerName = 'Bapak Nugraha';
        buyerPhone = '6283138320817';
      }

      return {
        id: `lot-p2-${num}`,
        code,
        block: 'B',
        number: num,
        type: 'Tipe 45/72 (Komersial Asri)',
        landArea: num % 4 === 0 ? 90 : 72,
        buildingArea: 45,
        price: num % 4 === 0 ? 385000000 : 345000000,
        status,
        facing: num <= 10 ? 'Timur' : 'Barat',
        isCorner: num % 4 === 0,
        buyerName,
        buyerPhone,
        bookingCode: status !== 'available' ? `BOK-202611-B${num}` : undefined,
        marketingName: 'Teh Nisa Andriani'
      };
    });

    // P3: Banyuresmi Hillside (15 units)
    data['p3'] = Array.from({ length: 15 }, (_, i) => {
      const num = i + 1;
      const code = `C-${num < 10 ? '0' + num : num}`;
      let status: 'available' | 'booked' | 'sold' = 'available';
      let buyerName = undefined;
      let buyerPhone = undefined;

      if (num === 1) {
        status = 'booked';
        buyerName = 'Ibu Dewi Sartika';
        buyerPhone = '6281399887766';
      } else if (num === 2) {
        status = 'booked';
        buyerName = 'Om Azhar Pratama';
        buyerPhone = '62895704969810';
      }

      return {
        id: `lot-p3-${num}`,
        code,
        block: 'C',
        number: num,
        type: 'Tipe 54/84 (Villa Asri Mountain View)',
        landArea: num % 3 === 0 ? 105 : 84,
        buildingArea: 54,
        price: num % 3 === 0 ? 540000000 : 485000000,
        status,
        facing: 'Selatan',
        isCorner: num % 3 === 0,
        buyerName,
        buyerPhone,
        bookingCode: status !== 'available' ? `BOK-202611-C${num}` : undefined,
        marketingName: 'Kang Dika Pratama'
      };
    });

    return data;
  });

  const currentProject = DEMO_PROJECTS.find(p => p.id === selectedProjectId) || DEMO_PROJECTS[0];
  const currentLots = lots[selectedProjectId] || [];

  const filteredLots = currentLots.filter(lot => {
    const matchesFilter = statusFilter === 'all' || lot.status === statusFilter;
    const matchesSearch = lot.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (lot.buyerName && lot.buyerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Calculate project summary counts
  const availableCount = currentLots.filter(l => l.status === 'available').length;
  const bookedCount = currentLots.filter(l => l.status === 'booked').length;
  const soldCount = currentLots.filter(l => l.status === 'sold').length;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLot || !buyerName.trim()) {
      showToast('Mohon masukkan nama pemesan unit kavling.', 'error');
      return;
    }

    const bookingCode = `BOK-${new Date().getFullYear()}${new Date().getMonth() + 1}-${activeLot.code.replace('-', '')}`;

    setLots(prev => {
      const updated = { ...prev };
      updated[selectedProjectId] = updated[selectedProjectId].map(l => {
        if (l.id === activeLot.id) {
          return {
            ...l,
            status: 'booked',
            buyerName,
            buyerPhone: buyerPhone || '6281234567890',
            bookingCode,
            marketingName: marketingPic
          };
        }
        return l;
      });
      return updated;
    });

    setActiveLot(prev => prev ? {
      ...prev,
      status: 'booked',
      buyerName,
      buyerPhone: buyerPhone || '6281234567890',
      bookingCode,
      marketingName: marketingPic
    } : null);

    setIsBookingModalOpen(false);
    showToast(`Unit ${activeLot.code} berhasil dikunci atas nama ${buyerName}!`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="crm-card bg-gradient-to-r from-[#0A0F1D] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5 text-blue-400" />
                INTERACTIVE MASTERPLAN 2D
              </span>
              <span className="text-xs text-slate-400 font-medium">Sistem Anti-Double Booking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Visual Siteplan & Kavling Selector
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Peta denah kavling interaktif real-time. Klik pada lot kavling untuk memeriksa spesifikasi lengkap, simulasi KPR perbankan, atau langsung mengunci pesanan atas nama konsumen.
            </p>
          </div>

          {/* Quick Counter Pills */}
          <div className="flex items-center gap-2 text-xs">
            <div className="px-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-center">
              <span className="block text-[10px] text-emerald-400/80 font-bold uppercase">Tersedia</span>
              <strong className="text-base font-extrabold">{availableCount} Kavling</strong>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-300 text-center">
              <span className="block text-[10px] text-amber-400/80 font-bold uppercase">Booked</span>
              <strong className="text-base font-extrabold">{bookedCount} Kavling</strong>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-center">
              <span className="block text-[10px] text-rose-400/80 font-bold uppercase">Terjual</span>
              <strong className="text-base font-extrabold">{soldCount} Kavling</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Project Switcher & Status Filters */}
      <div className="crm-card p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Project Selector Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {DEMO_PROJECTS.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-2 ${
                selectedProjectId === proj.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {proj.name}
            </button>
          ))}
        </div>

        {/* Filter & Search */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'hover:text-slate-900'}`}
            >
              Semua ({currentLots.length})
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'available' ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'hover:text-slate-900'}`}
            >
              Available
            </button>
            <button
              onClick={() => setStatusFilter('booked')}
              className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'booked' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'hover:text-slate-900'}`}
            >
              Booked
            </button>
            <button
              onClick={() => setStatusFilter('sold')}
              className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'sold' ? 'bg-rose-600 text-white font-bold shadow-sm' : 'hover:text-slate-900'}`}
            >
              Terjual
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kavling (A-01)..."
              className="text-xs pl-8 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36"
            />
          </div>
        </div>
      </div>

      {/* Interactive Siteplan Canvas Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Map Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="crm-card bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            
            {/* Compass & Masterplan Legend Header */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-300 flex items-center gap-1.5 text-xs font-mono font-bold">
                  <Compass className="w-4 h-4 text-blue-400" />
                  Kavling Menghadap Utara / Selatan
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span>Kawasan Hijau 35%</span>
                </div>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                  Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500 shadow-sm shadow-amber-500/50"></span>
                  Booked
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                  Sold Out
                </span>
              </div>
            </div>

            {/* Architectural Layout Blueprint */}
            <div className="space-y-6">
              
              {/* Entrance Gate Boulevard */}
              <div className="bg-slate-800/60 border border-dashed border-slate-700 rounded-xl p-3 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>GERBANG UTAMA & POS SATPAM 24 JAM — BOULEVARD UTAMA ROW 8 METER</span>
              </div>

              {/* Grid of Lots */}
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3">
                {filteredLots.map(lot => {
                  let bgColor = 'bg-emerald-950/80 border-emerald-500/70 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/90 hover:shadow-lg hover:shadow-emerald-500/20';
                  let badge = 'Available';

                  if (lot.status === 'booked') {
                    bgColor = 'bg-amber-950/80 border-amber-500/70 text-amber-200 hover:border-amber-400 hover:bg-amber-900/90 hover:shadow-lg hover:shadow-amber-500/20';
                    badge = 'Booked';
                  } else if (lot.status === 'sold') {
                    bgColor = 'bg-rose-950/80 border-rose-500/70 text-rose-200 hover:border-rose-400 hover:bg-rose-900/90 hover:shadow-lg hover:shadow-rose-500/20';
                    badge = 'Sold';
                  }

                  const isSelected = activeLot?.id === lot.id;

                  return (
                    <button
                      key={lot.id}
                      onClick={() => setActiveLot(lot)}
                      className={`relative p-3 rounded-xl border text-left transition transform duration-150 flex flex-col justify-between h-24 ${bgColor} ${
                        isSelected ? 'ring-2 ring-white scale-105 z-10 shadow-2xl' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <strong className="text-xs font-mono font-extrabold tracking-tight">
                          {lot.code}
                        </strong>
                        {lot.isCorner && (
                          <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-purple-500/30 text-purple-300 border border-purple-500/40">
                            HOOK
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] block opacity-80 font-mono">
                          {lot.buildingArea}/{lot.landArea} m²
                        </span>
                        <span className="text-[10px] font-bold block truncate mt-0.5">
                          Rp {(lot.price / 1000000).toFixed(0)} Jt
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Park & Community Space */}
              <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-3 text-center text-xs text-emerald-300 font-mono flex items-center justify-center gap-2">
                <Trees className="w-4 h-4 text-emerald-400" />
                <span>TAMAN TEMATIK & JOGGING TRACK WARGA — KAWASAN TERBUKA HIJAU</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Klik salah satu kavling untuk melihat detail & kunci pemesanan</span>
              <span>PT Garut Sejahtera Propertindo</span>
            </div>
          </div>
        </div>

        {/* Right: Lot Detail & Booking Dossier */}
        <div className="lg:col-span-4 space-y-4">
          {activeLot ? (
            <div className="crm-card bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn">
              
              {/* Header Dossier */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-xl text-slate-900 font-mono">
                      Kavling {activeLot.code}
                    </h3>
                    {activeLot.isCorner && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                        Kavling Sudut (Hook)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {currentProject.name}
                  </p>
                </div>

                <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full border ${
                  activeLot.status === 'available'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : activeLot.status === 'booked'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {activeLot.status.toUpperCase()}
                </span>
              </div>

              {/* Price & Specs Table */}
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Harga Jual Resmi
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    Rp {activeLot.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    *Sudah termasuk PPN, IMB/PBG, dan Sambungan Listrik PLN
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Luas Bangunan</span>
                    <strong className="text-slate-800 font-mono text-sm">{activeLot.buildingArea} m²</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Luas Tanah</span>
                    <strong className="text-slate-800 font-mono text-sm">{activeLot.landArea} m²</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Arah Hadap</span>
                    <strong className="text-slate-800 text-sm">Hadap {activeLot.facing}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Daya Listrik</span>
                    <strong className="text-slate-800 text-sm">1.300 VA</strong>
                  </div>
                </div>
              </div>

              {/* Existing Buyer Info (if booked or sold) */}
              {activeLot.status !== 'available' && activeLot.buyerName && (
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Data Konsumen Pemesan:
                  </span>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">{activeLot.buyerName}</p>
                    <p className="text-slate-600 font-mono">
                      Kontak: {formatPhoneDisplay(activeLot.buyerPhone || '')}
                    </p>
                    <p className="text-slate-600 font-mono">
                      Kode Reservasi: {activeLot.bookingCode}
                    </p>
                    <p className="text-slate-600">
                      PIC Marketing: {activeLot.marketingName}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {activeLot.status === 'available' ? (
                  <button
                    onClick={() => {
                      setBuyerName('');
                      setBuyerPhone('');
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                  >
                    <Lock className="w-4 h-4" />
                    Kunci Booking Kavling {activeLot.code}
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium text-center">
                    Kavling ini telah dipesan / terkunci di sistem.
                  </div>
                )}

                <a
                  href={buildWhatsAppLink(
                    '6281234567890',
                    `Halo, saya ingin menanyakan ketersediaan & simulasi resmi untuk Kavling ${activeLot.code} (${currentProject.name}) seharga Rp ${(activeLot.price / 1000000).toFixed(0)} Juta.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Bagikan Info Kavling via WhatsApp
                </a>
              </div>

            </div>
          ) : (
            <div className="crm-card bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Map className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">Pilih Salah Satu Kavling</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Klik salah satu kotak kavling di peta denah sebelah kiri untuk membuka dossier spesifikasi dan formulir booking cepat.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Instant QRIS / VA Booking Gateway Modal */}
      {isBookingModalOpen && activeLot && (
        <InstantBookingFeeModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          kavlingCode={activeLot.code}
          projectName={currentProject.name}
          unitPrice={activeLot.price}
          onPaymentSuccess={(kavlingCode, receiptData) => {
            setLots(prev => {
              const updated = { ...prev };
              updated[selectedProjectId] = updated[selectedProjectId].map(l => {
                if (l.code === kavlingCode) {
                  return {
                    ...l,
                    status: 'booked',
                    buyerName: receiptData.buyerName,
                    buyerPhone: receiptData.buyerPhone,
                    bookingCode: receiptData.transactionId,
                    marketingName: 'Kang Dika Pratama'
                  };
                }
                return l;
              });
              return updated;
            });
            setActiveLot(prev => prev ? {
              ...prev,
              status: 'booked',
              buyerName: receiptData.buyerName,
              buyerPhone: receiptData.buyerPhone,
              bookingCode: receiptData.transactionId
            } : null);
          }}
        />
      )}

    </div>
  );
}
