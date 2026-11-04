'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Hammer, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Camera, 
  Printer, 
  FileCheck, 
  DollarSign, 
  Percent, 
  Calendar, 
  HardHat, 
  ChevronRight, 
  Check, 
  X, 
  Sparkles, 
  Search, 
  Filter, 
  Send, 
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Download,
  Info
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface ConstructionUnit {
  id: string;
  project_name: string;
  unit_code: string;
  customer_name: string;
  customer_phone: string;
  contractor_name: string;
  progress_percent: number;
  stage_name: string;
  start_date: string;
  target_bast_date: string;
  bank_name: string;
  kpr_plafon: number;
  disbursed_percent: number; // Persentase termin yang sudah cair dari bank
  next_disbursement_stage: string;
  quality_checks: {
    pondasi: boolean;
    struktur_kolom: boolean;
    atap_baja: boolean;
    keramik_granit: boolean;
    plafon_cat: boolean;
    uji_air_pln: boolean;
  };
  field_notes: string;
  last_inspected: string;
}

const INITIAL_CONSTRUCTION_DATA: ConstructionUnit[] = [
  {
    id: 'c1',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-01',
    customer_name: 'Bapak Hendra Lesmana',
    customer_phone: '6281355667788',
    contractor_name: 'CV Garut Mandiri Jaya',
    progress_percent: 100,
    stage_name: 'Selesai 100% (Siap BAST / Kunci)',
    start_date: '01-08-2026',
    target_bast_date: '25-10-2026',
    bank_name: 'Cash Keras (Pelunasan 100%)',
    kpr_plafon: 166000000,
    disbursed_percent: 100,
    next_disbursement_stage: 'Lunas Penuh',
    quality_checks: {
      pondasi: true,
      struktur_kolom: true,
      atap_baja: true,
      keramik_granit: true,
      plafon_cat: true,
      uji_air_pln: true
    },
    field_notes: 'Fisik bangunan telah 100% rapi. Uji instalasi air sumur bor dan daya listrik PLN 1300 VA lolos uji.',
    last_inspected: '25-10-2026'
  },
  {
    id: 'c2',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-02',
    customer_name: 'Bapak Irwan Santoso',
    customer_phone: '6281233445599',
    contractor_name: 'CV Garut Mandiri Jaya',
    progress_percent: 92,
    stage_name: 'Finishing Akhir & Pengecatan',
    start_date: '10-08-2026',
    target_bast_date: '15-11-2026',
    bank_name: 'Bank BTN (KPR Subsidi FLPP)',
    kpr_plafon: 157700000,
    disbursed_percent: 60,
    next_disbursement_stage: 'Termin 3 (40% BAST & Saldo Retensi)',
    quality_checks: {
      pondasi: true,
      struktur_kolom: true,
      atap_baja: true,
      keramik_granit: true,
      plafon_cat: true,
      uji_air_pln: false
    },
    field_notes: 'Cat lapis kedua selesai. Menunggu penyambungan meteran listrik PLN sebelum penandatanganan BAST.',
    last_inspected: '02-11-2026'
  },
  {
    id: 'c3',
    project_name: 'Grand Karangpawitan Residence',
    unit_code: 'Blok B-01',
    customer_name: 'Ibu Lilis Karlina',
    customer_phone: '6281244556677',
    contractor_name: 'PT Sinergi Bangun Garut',
    progress_percent: 100,
    stage_name: 'Selesai 100% (BAST Terlaksana)',
    start_date: '15-06-2026',
    target_bast_date: '20-10-2026',
    bank_name: 'Bank Mandiri (KPR Komersial)',
    kpr_plafon: 310500000,
    disbursed_percent: 100,
    next_disbursement_stage: 'Dana Cair 100% ke Escrow',
    quality_checks: {
      pondasi: true,
      struktur_kolom: true,
      atap_baja: true,
      keramik_granit: true,
      plafon_cat: true,
      uji_air_pln: true
    },
    field_notes: 'BAST telah ditandatangani konsumen. Masa garansi pemeliharaan struktur 100 hari kerja aktif.',
    last_inspected: '20-10-2026'
  },
  {
    id: 'c4',
    project_name: 'Banyuresmi Hillside',
    unit_code: 'Blok C-01',
    customer_name: 'Ibu Dewi Sartika',
    customer_phone: '6281399887766',
    contractor_name: 'Mandor Tatang & Rekan',
    progress_percent: 35,
    stage_name: 'Pondasi Batu Kali & Sloof Beton',
    start_date: '15-10-2026',
    target_bast_date: '15-01-2027',
    bank_name: 'Bank BTN Syariah',
    kpr_plafon: 436500000,
    disbursed_percent: 0,
    next_disbursement_stage: 'Termin 1 (30% saat Sloof & Tiang Selesai)',
    quality_checks: {
      pondasi: true,
      struktur_kolom: true,
      atap_baja: false,
      keramik_granit: false,
      plafon_cat: false,
      uji_air_pln: false
    },
    field_notes: 'Pengecoran sloof beton bertulang mutu K-225 selesai. Menunggu umur beton 7 hari untuk naik dinding bata ringan.',
    last_inspected: '01-11-2026'
  },
  {
    id: 'c5',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-06',
    customer_name: 'Bapak Agus Setiawan (Tahap Booking)',
    customer_phone: '6281223456789',
    contractor_name: 'CV Garut Mandiri Jaya',
    progress_percent: 65,
    stage_name: 'Kuda-Kuda Baja Ringan & Pasang Genteng',
    start_date: '01-09-2026',
    target_bast_date: '30-11-2026',
    bank_name: 'Bank BTN (Proses SP3K)',
    kpr_plafon: 157700000,
    disbursed_percent: 30,
    next_disbursement_stage: 'Termin 2 (30% Tutup Atap)',
    quality_checks: {
      pondasi: true,
      struktur_kolom: true,
      atap_baja: true,
      keramik_granit: false,
      plafon_cat: false,
      uji_air_pln: false
    },
    field_notes: 'Rangka atap baja ringan profil C75 tebal 0.75mm telah terpasang rapi. Siap inspeksi Bank BTN untuk termin 2.',
    last_inspected: '03-11-2026'
  },
  {
    id: 'c6',
    project_name: 'Grand Karangpawitan Residence',
    unit_code: 'Blok B-04',
    customer_name: 'Ibu Siti Nurhaliza (Negosiasi)',
    customer_phone: '6282119876543',
    contractor_name: 'PT Sinergi Bangun Garut',
    progress_percent: 15,
    stage_name: 'Pembersihan Lahan & Galian Pondasi',
    start_date: '28-10-2026',
    target_bast_date: '28-02-2027',
    bank_name: 'Bank BSI (KPR Griya Hasanah)',
    kpr_plafon: 310500000,
    disbursed_percent: 0,
    next_disbursement_stage: 'Termin 1 (30%)',
    quality_checks: {
      pondasi: false,
      struktur_kolom: false,
      atap_baja: false,
      keramik_granit: false,
      plafon_cat: false,
      uji_air_pln: false
    },
    field_notes: 'Galian tanah pondasi batu kali kedalaman 80cm sedang berlangsung oleh 6 pekerja.',
    last_inspected: '03-11-2026'
  }
];

export default function ConstructionPage() {
  const { showToast } = useToast();
  const [units, setUnits] = useState<ConstructionUnit[]>(INITIAL_CONSTRUCTION_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ongoing' | 'completed' | 'btn_ready'>('all');
  
  // Modals
  const [selectedUnitForBAPF, setSelectedUnitForBAPF] = useState<ConstructionUnit | null>(null);
  const [selectedUnitForUpdate, setSelectedUnitForUpdate] = useState<ConstructionUnit | null>(null);

  // Update Form State
  const [editProgress, setEditProgress] = useState<number>(0);
  const [editStage, setEditStage] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editChecks, setEditChecks] = useState<ConstructionUnit['quality_checks']>({
    pondasi: false,
    struktur_kolom: false,
    atap_baja: false,
    keramik_granit: false,
    plafon_cat: false,
    uji_air_pln: false
  });

  const filteredUnits = units.filter(u => {
    const matchesSearch = 
      u.unit_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.contractor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.bank_name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'ongoing') return u.progress_percent < 100;
    if (selectedFilter === 'completed') return u.progress_percent === 100;
    if (selectedFilter === 'btn_ready') {
      return (u.progress_percent >= 30 && u.disbursed_percent < 30) || 
             (u.progress_percent >= 60 && u.disbursed_percent < 60) || 
             (u.progress_percent === 100 && u.disbursed_percent < 100);
    }
    return true;
  });

  // KPI Calculations
  const totalInConstruction = units.filter(u => u.progress_percent < 100).length;
  const totalCompleted = units.filter(u => u.progress_percent === 100).length;
  const totalPlafonUnderway = units.reduce((acc, curr) => acc + curr.kpr_plafon, 0);
  
  // Dana yang sudah cair vs tertahan di bank
  const totalDisbursedValue = units.reduce((acc, curr) => acc + (curr.kpr_plafon * curr.disbursed_percent / 100), 0);
  const totalPendingDisbursement = totalPlafonUnderway - totalDisbursedValue;

  const handleOpenUpdateModal = (u: ConstructionUnit) => {
    setSelectedUnitForUpdate(u);
    setEditProgress(u.progress_percent);
    setEditStage(u.stage_name);
    setEditNotes(u.field_notes);
    setEditChecks({ ...u.quality_checks });
  };

  const handleSaveProgressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnitForUpdate) return;

    setUnits(prev => prev.map(u => {
      if (u.id === selectedUnitForUpdate.id) {
        return {
          ...u,
          progress_percent: editProgress,
          stage_name: editStage,
          field_notes: editNotes,
          quality_checks: { ...editChecks },
          last_inspected: 'Hari ini'
        };
      }
      return u;
    }));

    showToast(`Progres fisik ${selectedUnitForUpdate.unit_code} berhasil diperbarui menjadi ${editProgress}%!`, 'success');
    setSelectedUnitForUpdate(null);
  };

  const handleSendBankWhatsApp = (u: ConstructionUnit) => {
    const text = `*PENGAJUAN PENCAIRAN TERMIN KPR BANK BTN*\n*PT GARUT SEJAHTERA PROPERTY*\n\nKepada Yth. Bagian Kredit / Loan Officer Bank BTN Cabang Garut\n\nMelalui surat ini kami sampaikan laporan progres fisik lapangan:\n• Nama Konsumen: *${u.customer_name}*\n• Proyek: *${u.project_name}*\n• Unit / Kavling: *${u.unit_code}*\n• Plafon KPR: *Rp ${u.kpr_plafon.toLocaleString('id-ID')}*\n• Progres Fisik Riil: *${u.progress_percent}% (${u.stage_name})*\n• Pengajuan Termin: *${u.next_disbursement_stage}*\n\nDokumen Berita Acara Pemeriksaan Fisik (BAPF) dan foto dokumentasi lapangan telah siap diverifikasi. Mohon kesediaan tim appraisal/bank untuk verifikasi lapangan.\n\nTerima kasih,\nBagian Konstruksi & Legal KPR\nPT Garut Sejahtera Property`;
    const url = buildWhatsAppLink('6281299887766', text);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Membuka WhatsApp untuk koordinasi dengan Loan Officer Bank...', 'info');
  };

  const handleExportCSV = () => {
    const headers = [
      'Unit Kavling',
      'Proyek',
      'Nama Konsumen',
      'No WhatsApp',
      'Kontraktor / Mandor',
      'Progres Fisik (%)',
      'Tahap Pembangunan',
      'Plafon KPR (Rp)',
      'Bank Penyalur',
      'Termin Cair (%)',
      'Status Termin Selanjutnya',
      'Tanggal Mulai',
      'Target Selesai / BAST',
      'Inspeksi Terakhir',
      'Catatan Lapangan'
    ];

    const rows = filteredUnits.map(u => [
      `"${u.unit_code}"`,
      `"${u.project_name}"`,
      `"${u.customer_name}"`,
      `"${u.customer_phone}"`,
      `"${u.contractor_name}"`,
      u.progress_percent,
      `"${u.stage_name}"`,
      u.kpr_plafon,
      `"${u.bank_name}"`,
      u.disbursed_percent,
      `"${u.next_disbursement_stage}"`,
      `"${u.start_date}"`,
      `"${u.target_bast_date}"`,
      `"${u.last_inspected}"`,
      `"${u.field_notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `HOMIQ_Laporan_Konstruksi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('File CSV Laporan Konstruksi & Termin Bank berhasil diunduh!', 'success');
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
                <HardHat className="w-3.5 h-3.5 text-blue-400" />
                Construction &amp; Bank BTN Disbursement Tracker
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Standar SNI &amp; KemenPUPR
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Progres Fisik Bangunan &amp; Pencairan Termin KPR
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitoring tahapan konstruksi riil di lapangan, audit kendali mutu teknis, penerbitan Berita Acara Pemeriksaan Fisik (BAPF) resmi, dan percepatan pencairan dana KPR perbankan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 shadow-xs transition active:scale-95"
            >
              <Download className="w-4 h-4 text-slate-400" />
              Ekspor CSV Laporan
            </button>
            <Link
              href="/documents"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-500/30 transition active:scale-95"
            >
              <FileCheck className="w-4 h-4" />
              Hub Dokumen &amp; BAST
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Financial & Construction KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dalam Konstruksi</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Hammer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalInConstruction}</span>
            <span className="text-xs text-slate-500">Unit Aktif</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            Target penyelesaian s.d Q1 2027
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Selesai 100% (BAST)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalCompleted}</span>
            <span className="text-xs text-slate-500">Unit Siap Kunci</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <Check className="w-3 h-3" />
            Kualitas mutu teknis lolos verifikasi
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dana Termin Bank Cair</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              Rp {(totalDisbursedValue / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} M
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Masuk ke Rekening Escrow BTN Developer
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Termin Siap Diajukan</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              Rp {(totalPendingDisbursement / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} M
            </span>
          </div>
          <p className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Dapat dicairkan via BAPF &amp; foto fisik
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kavling, konsumen, bank (BTN/Mandiri), kontraktor..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Unit ({units.length})
            </button>
            <button
              onClick={() => setSelectedFilter('ongoing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                selectedFilter === 'ongoing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sedang Dibangun ({totalInConstruction})
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                selectedFilter === 'completed'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Selesai 100% ({totalCompleted})
            </button>
            <button
              onClick={() => setSelectedFilter('btn_ready')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                selectedFilter === 'btn_ready'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              ⚡ Siap Pencairan Bank
            </button>
          </div>
        </div>
      </div>

      {/* Main Construction Units Table / Cards */}
      <div className="space-y-4">
        {filteredUnits.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center">
            <Hammer className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">Tidak ada unit konstruksi yang cocok</h3>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
          </div>
        ) : (
          filteredUnits.map((u) => {
            const isFinished = u.progress_percent === 100;
            const isNearDisbursement = 
              (u.progress_percent >= 30 && u.disbursed_percent < 30) ||
              (u.progress_percent >= 60 && u.disbursed_percent < 60) ||
              (u.progress_percent === 100 && u.disbursed_percent < 100);

            return (
              <div 
                key={u.id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all overflow-hidden"
              >
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Card Header: Lot, Project, Customer & Badges */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isFinished ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        u.progress_percent >= 50 ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {u.unit_code}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-sm">{u.unit_code} — {u.project_name}</h3>
                          {isFinished ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                              Siap Serah Terima (BAST)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                              Sedang Dikerjakan
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Konsumen: <span className="font-semibold text-slate-700">{u.customer_name}</span> ({u.customer_phone}) • Kontraktor: <span className="font-medium text-slate-700">{u.contractor_name}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => handleOpenUpdateModal(u)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        Update Progres Fisik
                      </button>
                      <button
                        onClick={() => setSelectedUnitForBAPF(u)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1.5 transition"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Cetak BAPF Bank A4
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & Stages */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{u.stage_name}</span>
                        <span className="text-slate-400 font-mono text-[11px]">| Inspeksi Terakhir: {u.last_inspected}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono font-bold text-blue-600 text-sm">
                        <span>{u.progress_percent}%</span>
                        <span className="text-[10px] text-slate-400 font-normal">/ 100%</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFinished ? 'bg-emerald-500' :
                          u.progress_percent >= 70 ? 'bg-blue-600' :
                          u.progress_percent >= 40 ? 'bg-amber-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${u.progress_percent}%` }}
                      />
                    </div>

                    {/* Progress Milestone Indicators */}
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1 text-[11px]">
                      <div className={`p-1.5 rounded-lg text-center font-medium border ${u.quality_checks.pondasi ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        Pondasi 25% {u.quality_checks.pondasi && '✓'}
                      </div>
                      <div className={`p-1.5 rounded-lg text-center font-medium border ${u.quality_checks.struktur_kolom ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        Dinding 50% {u.quality_checks.struktur_kolom && '✓'}
                      </div>
                      <div className={`p-1.5 rounded-lg text-center font-medium border ${u.quality_checks.atap_baja ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        Atap Baja 75% {u.quality_checks.atap_baja && '✓'}
                      </div>
                      <div className={`p-1.5 rounded-lg text-center font-medium border ${u.quality_checks.keramik_granit ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        Lantai Granit {u.quality_checks.keramik_granit && '✓'}
                      </div>
                      <div className={`p-1.5 rounded-lg text-center font-medium border ${u.quality_checks.plafon_cat ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        Plafon &amp; Cat {u.quality_checks.plafon_cat && '✓'}
                      </div>
                      <div className={`p-1.5 rounded-lg text-center font-medium border ${u.quality_checks.uji_air_pln ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        Air &amp; Listrik PLN {u.quality_checks.uji_air_pln && '✓'}
                      </div>
                    </div>
                  </div>

                  {/* Financial Bank BTN Disbursement Row */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs font-bold text-slate-800">{u.bank_name}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-mono font-semibold text-slate-700">Plafon: Rp {u.kpr_plafon.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span>Pencairan Berjalan: <strong className="text-emerald-700 font-mono">{u.disbursed_percent}%</strong> (Rp {(u.kpr_plafon * u.disbursed_percent / 100).toLocaleString('id-ID')})</span>
                        <span>•</span>
                        <span>Tahap Selanjutnya: <strong className="text-blue-700">{u.next_disbursement_stage}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isNearDisbursement && (
                        <button
                          onClick={() => handleSendBankWhatsApp(u)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-xs transition"
                        >
                          <Send className="w-3 h-3" />
                          Ajukan Termin Bank (WA)
                        </button>
                      )}
                      <span className="text-[11px] text-slate-400 font-mono">
                        Target BAST: {u.target_bast_date}
                      </span>
                    </div>
                  </div>

                  {/* Field Notes */}
                  {u.field_notes && (
                    <div className="text-xs text-slate-600 bg-white rounded-lg p-2.5 border border-slate-200/60 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                      <span className="italic leading-relaxed">{u.field_notes}</span>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: UPDATE PROGRESS FISIK LAPANGAN */}
      {selectedUnitForUpdate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-blue-400" />
                  Update Progres Fisik — {selectedUnitForUpdate.unit_code}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proyek: {selectedUnitForUpdate.project_name} • Konsumen: {selectedUnitForUpdate.customer_name}
                </p>
              </div>
              <button
                onClick={() => setSelectedUnitForUpdate(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgressUpdate} className="p-6 space-y-5">
              
              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Persentase Progres Fisik Riil:</label>
                  <span className="text-base font-extrabold font-mono text-blue-600">{editProgress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editProgress}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setEditProgress(val);
                    if (val === 100) setEditStage('Selesai 100% (Siap BAST / Kunci)');
                    else if (val >= 85) setEditStage('Pengecatan Akhir & Finishing Sanitair');
                    else if (val >= 70) setEditStage('Pemasangan Genteng & Rangka Atap');
                    else if (val >= 50) setEditStage('Pasangan Dinding Bata & Plesteran');
                    else if (val >= 25) setEditStage('Pondasi Batu Kali & Sloof Beton');
                    else setEditStage('Pembersihan Lahan & Bowplank');
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Stage Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Tahap Konstruksi:</label>
                <input
                  type="text"
                  value={editStage}
                  onChange={(e) => setEditStage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Quality Checklist */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Kendali Mutu Lapangan (Quality Control):</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editChecks.pondasi}
                      onChange={(e) => setEditChecks(prev => ({ ...prev, pondasi: e.target.checked }))}
                      className="rounded text-blue-600"
                    />
                    <span>Pondasi &amp; Sloof K-225</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editChecks.struktur_kolom}
                      onChange={(e) => setEditChecks(prev => ({ ...prev, struktur_kolom: e.target.checked }))}
                      className="rounded text-blue-600"
                    />
                    <span>Dinding Bata Ringan</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editChecks.atap_baja}
                      onChange={(e) => setEditChecks(prev => ({ ...prev, atap_baja: e.target.checked }))}
                      className="rounded text-blue-600"
                    />
                    <span>Atap Baja Ringan C75</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editChecks.keramik_granit}
                      onChange={(e) => setEditChecks(prev => ({ ...prev, keramik_granit: e.target.checked }))}
                      className="rounded text-blue-600"
                    />
                    <span>Lantai Granit 60x60</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editChecks.plafon_cat}
                      onChange={(e) => setEditChecks(prev => ({ ...prev, plafon_cat: e.target.checked }))}
                      className="rounded text-blue-600"
                    />
                    <span>Plafon Gypsum &amp; Cat</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editChecks.uji_air_pln}
                      onChange={(e) => setEditChecks(prev => ({ ...prev, uji_air_pln: e.target.checked }))}
                      className="rounded text-blue-600"
                    />
                    <span>Uji Aliran Air &amp; Listrik</span>
                  </label>
                </div>
              </div>

              {/* Field Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Catatan Pengawas Lapangan:</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Kondisi lapangan, kendala material, cuaca, atau rekomendasi..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedUnitForUpdate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition"
                >
                  Simpan Perubahan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CETAK BERITA ACARA PEMERIKSAAN FISIK (BAPF) A4 RESMI */}
      {selectedUnitForBAPF && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 print:border-none print:shadow-none print:rounded-none print:my-0">
            
            {/* Action Bar (Hidden in Print) */}
            <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm">Pratinjau Cetak Berita Acara Pemeriksaan Fisik (BAPF)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak / Simpan PDF
                </button>
                <button
                  onClick={() => setSelectedUnitForBAPF(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Official Printable A4 Document Body */}
            <div className="p-8 sm:p-10 space-y-6 text-slate-800 bg-white min-h-[750px] font-sans">
              
              {/* Kop Surat PT Developer */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-xl">
                    H
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">
                      PT GARUT SEJAHTERA PROPERTY
                    </h2>
                    <p className="text-[11px] text-slate-600 font-medium mt-1">
                      Developer Perumahan &amp; Pengelola Kawasan Hunian Garut
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Jl. Pembangunan No. 88, Tarogong Kidul, Garut | Telp: (0262) 234567 | Email: legal@garutsejahtera.co.id
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">FORMULIR RESMI</span>
                  <span className="text-xs font-bold font-mono text-slate-800">DOC-BAPF-{selectedUnitForBAPF.unit_code.replace(/\s+/g, '')}</span>
                </div>
              </div>

              {/* Document Header Title */}
              <div className="text-center space-y-1">
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 underline underline-offset-4">
                  BERITA ACARA PEMERIKSAAN FISIK (BAPF) BANGUNAN
                </h3>
                <p className="text-xs text-slate-600">
                  Untuk Keperluan Penyaluran / Pencairan Dana KPR Perbankan
                </p>
              </div>

              {/* Lead Paragraph */}
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                Pada hari ini, tanggal <strong>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>, bertempat di lokasi proyek perumahan <strong>{selectedUnitForBAPF.project_name}</strong>, telah dilakukan pemeriksaan dan verifikasi fisik pekerjaan konstruksi bangunan rumah hunian dengan rincian sebagai berikut:
              </p>

              {/* Data Unit & Konsumen Table */}
              <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-1/3 px-3 py-2 bg-slate-50 font-bold text-slate-700">Nama Konsumen / Pemohon KPR</td>
                      <td className="px-3 py-2 font-semibold text-slate-900">{selectedUnitForBAPF.customer_name}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-3 py-2 bg-slate-50 font-bold text-slate-700">Nomor Kavling &amp; Proyek</td>
                      <td className="px-3 py-2 font-semibold text-slate-900">{selectedUnitForBAPF.unit_code} ({selectedUnitForBAPF.project_name})</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-3 py-2 bg-slate-50 font-bold text-slate-700">Bank Penyalur Kredit (KPR)</td>
                      <td className="px-3 py-2 font-semibold text-slate-900">{selectedUnitForBAPF.bank_name}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-3 py-2 bg-slate-50 font-bold text-slate-700">Plafon Kredit KPR</td>
                      <td className="px-3 py-2 font-mono font-bold text-slate-900">Rp {selectedUnitForBAPF.kpr_plafon.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-3 py-2 bg-slate-50 font-bold text-slate-700">Kontraktor Pelaksana</td>
                      <td className="px-3 py-2 font-medium text-slate-900">{selectedUnitForBAPF.contractor_name}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 bg-slate-50 font-bold text-slate-700">Pencapaian Progres Fisik Saat Ini</td>
                      <td className="px-3 py-2">
                        <span className="font-extrabold text-blue-700 font-mono text-sm">{selectedUnitForBAPF.progress_percent}%</span>
                        <span className="text-slate-600 ml-2">({selectedUnitForBAPF.stage_name})</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Rincian Bobot Standar PUPR */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Tabel Rincian Bobot Pekerjaan Lapangan (Standar Teknis PU)
                </h4>
                <table className="w-full border-collapse border border-slate-300 text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="border border-slate-300 px-2 py-1.5 text-left w-10">No</th>
                      <th className="border border-slate-300 px-2 py-1.5 text-left">Komponen Pekerjaan</th>
                      <th className="border border-slate-300 px-2 py-1.5 text-center w-24">Bobot Teknis</th>
                      <th className="border border-slate-300 px-2 py-1.5 text-center w-28">Status Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-center">1</td>
                      <td className="border border-slate-300 px-2 py-1">Pondasi Batu Kali, Galian, &amp; Sloof Beton Bertulang K-225</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-mono">25.0%</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-semibold text-emerald-700">
                        {selectedUnitForBAPF.quality_checks.pondasi ? '100% Selesai' : 'Dalam Proses'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-center">2</td>
                      <td className="border border-slate-300 px-2 py-1">Pasangan Dinding Bata Ringan, Kolom Praktis &amp; Kusen</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-mono">25.0%</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-semibold text-emerald-700">
                        {selectedUnitForBAPF.quality_checks.struktur_kolom ? '100% Selesai' : 'Dalam Proses'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-center">3</td>
                      <td className="border border-slate-300 px-2 py-1">Kuda-kuda Rangka Atap Baja Ringan C75 &amp; Penutup Atap</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-mono">25.0%</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-semibold text-emerald-700">
                        {selectedUnitForBAPF.quality_checks.atap_baja ? '100% Selesai' : 'Belum Selesai'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-center">4</td>
                      <td className="border border-slate-300 px-2 py-1">Plester, Acian, Keramik Lantai Granit 60x60, &amp; Plafon Gypsum</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-mono">15.0%</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-semibold text-emerald-700">
                        {selectedUnitForBAPF.quality_checks.keramik_granit ? '100% Selesai' : 'Belum Selesai'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-center">5</td>
                      <td className="border border-slate-300 px-2 py-1">Pengecatan Weathercoat, Pintu Sanitair, Instalasi Listrik &amp; Air</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-mono">10.0%</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-semibold text-emerald-700">
                        {selectedUnitForBAPF.quality_checks.uji_air_pln ? '100% Selesai' : 'Belum Selesai'}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-bold">
                      <td colSpan={2} className="border border-slate-300 px-2 py-1.5 text-right">TOTAL PENCAPAIAN RIIL:</td>
                      <td className="border border-slate-300 px-2 py-1.5 text-center font-mono text-blue-700 text-xs">
                        {selectedUnitForBAPF.progress_percent}%
                      </td>
                      <td className="border border-slate-300 px-2 py-1.5 text-center text-emerald-800">
                        REKOMENDASI: {selectedUnitForBAPF.next_disbursement_stage}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Kesimpulan & Rekomendasi Bank */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Rekomendasi Pencairan Kredit ke Bank:</span>
                <p className="text-slate-600 leading-relaxed text-justify">
                  Berdasarkan hasil pemeriksaan fisik, bangunan tersebut telah memenuhi kualifikasi mutu standar teknis perumahan nasional. Oleh karena itu, pengembang merekomendasikan pencairan kredit KPR tahap <strong>{selectedUnitForBAPF.next_disbursement_stage}</strong> kepada pihak perbankan yang bersangkutan dan disalurkan langsung ke Rekening Escrow Giro PT Garut Sejahtera Property di Bank BTN.
                </p>
              </div>

              {/* Tanda Tangan 3 Pihak */}
              <div className="pt-6 grid grid-cols-3 gap-4 text-center text-xs">
                <div className="space-y-14">
                  <p className="font-medium text-slate-600">Kontraktor Pelaksana,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline uppercase">{selectedUnitForBAPF.contractor_name}</p>
                    <p className="text-[10px] text-slate-500">Penanggung Jawab Proyek</p>
                  </div>
                </div>

                <div className="space-y-14">
                  <p className="font-medium text-slate-600">Pengawas Lapangan (Site Engineer),</p>
                  <div>
                    <p className="font-bold text-slate-900 underline uppercase">Ir. Bambang Trihatmojo, ST</p>
                    <p className="text-[10px] text-slate-500">Surveior &amp; QC PT GSP</p>
                  </div>
                </div>

                <div className="space-y-14">
                  <p className="font-medium text-slate-600">Mengetahui &amp; Menyetujui,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline uppercase">H. Ahmad Fauzi, SE, MM</p>
                    <p className="text-[10px] text-slate-500">Direktur Utama PT GSP</p>
                  </div>
                </div>
              </div>

              {/* Watermark / Legal Note */}
              <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                Dokumen ini digenerate secara otomatis melalui HOMIQ Smart Property CRM &bull; Dilengkapi audit integritas data &bull; Sah dan berlaku tanpa materai tambahan untuk pengajuan bank.
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
