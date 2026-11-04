'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  Home, 
  CreditCard, 
  FileCheck, 
  HardHat, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface TourStep {
  step: number;
  title: string;
  category: string;
  badge: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  headline: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  targetUrl: string;
  buttonLabel: string;
  simulationNote: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: 'Injeksi Iklan Otomatis (Meta & TikTok Ads)',
    category: 'Lead Capture Engine',
    badge: 'Webhook HTTP 200',
    icon: Zap,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    headline: 'Prospek Masuk Tanpa Input Manual',
    description: 'Calon pembeli (Ibu Ratna Kumalasari) mengisi formulir iklan Instagram. Sistem HOMIQ menangkap payload webhook dalam hitungan detik dan langsung membagikannya secara adil (round-robin) ke konsultan Kang Dika Pratama.',
    metricLabel: 'Waktu Respon Prospek',
    metricValue: '< 15 Detik',
    targetUrl: '/leads',
    buttonLabel: 'Buka Modul Leads & Ads Webhook',
    simulationNote: 'Mencegah prospek basi dan menghilangkan ketergantungan ekspor spreadsheet manual.'
  },
  {
    step: 2,
    title: 'Smart Follow-up via WhatsApp Resmi',
    category: 'Sales Communication',
    badge: 'Click-to-WA',
    icon: MessageSquare,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    headline: 'Penawaran Personal Tanpa Repot Ketik',
    description: 'Sistem memformat nomor kontak ke standar Indonesia (+628...). Sales cukup menekan satu tombol hijau di layar untuk langsung membuka chat WhatsApp dengan naskah penawaran subsidi DP yang ramah dan profesional.',
    metricLabel: 'Rasio Respon Calon Pembeli',
    metricValue: '84.6%',
    targetUrl: '/follow-ups',
    buttonLabel: 'Buka Antrean Follow-up Harian',
    simulationNote: 'Mengatasi masalah sales lupa follow-up atau nomor kontak tertukar.'
  },
  {
    step: 3,
    title: 'Kunci Kavling di Masterplan (Anti-Double Booking)',
    category: 'Inventory Protection',
    badge: 'Row-Locking Active',
    icon: Home,
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
    headline: 'Proteksi Transaksional Tingkat Database',
    description: 'Ibu Ratna memilih kavling Blok A-08 (Tipe 36/60). Begitu booking fee tercatat, database mengeksekusi SELECT ... FOR UPDATE. Status kavling seketika berubah menjadi kuning (Booked) dan terkunci atomik.',
    metricLabel: 'Insiden Double-Booking',
    metricValue: '0 Kasus (100% Aman)',
    targetUrl: '/projects',
    buttonLabel: 'Lihat Denah Masterplan SVG',
    simulationNote: 'Dua sales di lapangan tidak akan pernah bisa menjual kavling yang sama secara bersamaan.'
  },
  {
    step: 4,
    title: 'Pembayaran DP via Payment Gateway Escrow',
    category: 'Financial Automation',
    badge: 'QRIS & Virtual Account',
    icon: CreditCard,
    iconBg: 'bg-teal-500/20',
    iconColor: 'text-teal-400',
    headline: 'Uang Masuk ke Rekening Resmi PT',
    description: 'Tagihan uang muka diterbitkan dengan QRIS Dinamis standar Bank Indonesia dan Bank BTN Virtual Account. Saat pembeli membayar lewat m-Banking, webhook memverifikasi dana dan kwitansi resmi terbit otomatis.',
    metricLabel: 'Verifikasi Mutasi Bank',
    metricValue: 'Real-time Otomatis',
    targetUrl: '/bookings',
    buttonLabel: 'Buka Buku Kontrol DP & Kwitansi',
    simulationNote: 'Kasir tidak perlu cek mutasi manual dan kwitansi resmi langsung ber-nomor seri unik.'
  },
  {
    step: 5,
    title: 'Kontrak Hukum Sah & e-Meterai Peruri Rp 10.000',
    category: 'Legal & Compliance',
    badge: 'UU ITE & PMK 134',
    icon: FileCheck,
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    headline: 'Surat Perjanjian Siap Cetak A4',
    description: 'Generator hukum HOMIQ menerbitkan Surat Pesanan Kavling (SPK) dan Perjanjian Pengikatan Jual Beli (PPJB) lengkap dengan segel e-Meterai Peruri Rp 10.000 dan verifikasi tanda tangan digital SHA-256.',
    metricLabel: 'Keabsahan Hukum Kontrak',
    metricValue: 'Standar Notaris RI',
    targetUrl: '/documents',
    buttonLabel: 'Buka Pusat Dokumen & e-Meterai',
    simulationNote: 'Menghilangkan salah ketik NIK atau klausul pasal secara manual di Microsoft Word.'
  },
  {
    step: 6,
    title: 'Pengawasan Konstruksi & Serah Terima Kunci (BAST)',
    category: 'Field Operations',
    badge: 'Kurva S & Bank BTN',
    icon: HardHat,
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    headline: 'Siklus Tuntas dari Tanah Sampai Rumah Huni',
    description: 'Site manager mengunggah progres fisik hingga 100%. Dokumen Berita Acara Pemeriksaan Fisik (BAPF) diajukan ke Bank BTN untuk pencairan KPR, dan Berita Acara Serah Terima Kunci (BAST) ditandatangani pembeli.',
    metricLabel: 'Kepuasan Konsumen',
    metricValue: '98.5% (Rating Bintang 5)',
    targetUrl: '/construction',
    buttonLabel: 'Buka Progres Fisik Konstruksi',
    simulationNote: 'Pembeli memantau rumahnya dengan tenang via Portal Mandiri Konsumen di HP.'
  }
];

interface InteractiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveTourModal({ isOpen, onClose }: InteractiveTourModalProps) {
  const { showToast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeStep = TOUR_STEPS[currentStepIndex];
  const Icon = activeStep.icon;

  // Autoplay timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= TOUR_STEPS.length - 1) {
            setIsPlaying(false);
            showToast('Simulasi alur penjualan telah selesai diputar!', 'success');
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, showToast]);

  if (!isOpen) return null;

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      showToast('Mode Autoplay Simulasi Alur Penjualan dimulai (4 detik / tahap).', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">Simulasi Alur Bisnis HOMIQ</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  DEMO WALKTHROUGH
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Dari Iklan Medsos Masuk hingga Serah Terima Kunci</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                isPlaying 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Jeda' : 'Autoplay'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span>Tahap {activeStep.step} dari {TOUR_STEPS.length}: <strong>{activeStep.category}</strong></span>
            <span className="text-blue-400 font-bold">{Math.round(((activeStep.step) / TOUR_STEPS.length) * 100)}% Alur Selesai</span>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'bg-blue-500 shadow-sm shadow-blue-500/50'
                    : idx < currentStepIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-800'
                }`}
                title={`Langkah ${s.step}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Main Stage Card */}
        <div className="p-6 space-y-5 flex-1">
          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
            
            {/* Stage Title & Badge */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${activeStep.iconBg} border border-white/10 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${activeStep.iconColor}`} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {activeStep.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {activeStep.title}
                  </h4>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-slate-800 text-blue-300 border border-slate-700 shrink-0">
                {activeStep.badge}
              </span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-blue-300">
                &bull; {activeStep.headline}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Metrics & Impact Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">{activeStep.metricLabel}</span>
                <span className="text-sm font-black font-mono text-emerald-400 mt-0.5 block">{activeStep.metricValue}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Manfaat Developer</span>
                <span className="text-[11px] text-slate-300 font-medium mt-0.5 block line-clamp-2">{activeStep.simulationNote}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            href={activeStep.targetUrl}
            onClick={onClose}
            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 group"
          >
            <span>{activeStep.buttonLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === TOUR_STEPS.length - 1}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md shadow-blue-600/20"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
