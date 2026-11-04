'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  FileText, 
  Lock, 
  Sparkles, 
  HelpCircle,
  Home,
  Clock,
  Eye,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function CustomerPortalLandingPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [bookingCode, setBookingCode] = useState('');
  const [phoneLast4, setPhoneLast4] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCode.trim()) {
      showToast('Harap masukkan Nomor Booking atau Kode Unit kavling Anda.', 'warning');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Clean up input
      const code = bookingCode.trim().toUpperCase().replace(/\s+/g, '-');
      router.push(`/portal-kpr/${code}`);
    }, 600);
  };

  const handleQuickDemo = (demoCode: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      router.push(`/portal-kpr/${demoCode}`);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">HOMIQ</span>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  CONSUMER PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">PT Garut Sejahtera Propertindo</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              Dashboard Developer
            </Link>
            <Link 
              href="/login"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition"
            >
              Masuk Internal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full flex flex-col items-center justify-center">
        
        {/* Badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-6 animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Layanan Mandiri Konsumen Rumah Garut &bull; Terenkripsi 256-Bit</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white text-center tracking-tight max-w-3xl leading-tight mb-4">
          Pantau Progres Rumah & Berkas KPR Anda <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">Secara Real-Time</span>
        </h1>
        <p className="text-slate-400 text-center max-w-xl text-sm sm:text-base leading-relaxed mb-10">
          Masukkan nomor registrasi booking atau pilih profil demo untuk melihat status berkas KPR Bank BTN, riwayat kwitansi uang muka, dan foto fisik pembangunan rumah Anda.
        </p>

        {/* Search Card */}
        <div className="w-full max-w-xl bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-8">
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={handleLookup} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Nomor Registrasi Booking / Unit Kavling
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Contoh: BOK-202611-892 atau Blok A-01"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi Data Konsumen...</span>
                  </>
                ) : (
                  <>
                    <span>Cari & Buka Portal Saya</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Selector */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 relative z-10">
            <p className="text-xs text-slate-400 font-medium mb-3 flex items-center justify-between">
              <span>Atau coba akses cepat data simulasi demo:</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('BOK-202611-892')}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-blue-500/60 hover:bg-slate-900 text-left transition group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300">
                    Bapak Agus Setiawan
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Blok A-01
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Bumi Cimanuk Indah &bull; KPR BTN Disetujui
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('BOK-202610-745')}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-blue-500/60 hover:bg-slate-900 text-left transition group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300">
                    Ibu Siti Nurhaliza
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Blok B-04
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Graha Garut City &bull; Unggah Berkas KPR
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full">
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Unggah Berkas Mandiri</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Foto dan unggah e-KTP, KK, NPWP, dan slip gaji langsung lewat HP tanpa harus bolak-balik ke kantor cabang.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Status KPR BTN Real-Time</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lihat progres appraisal bank, penerbitan SP3K resmi, hingga jadwal penandatanganan akad kredit di hadapan notaris.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Pantau Fisik Rumah</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cek foto progres konstruksi mingguan (fondasi, struktur, atap baja ringan, hingga uji air dan listrik PLN).
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/80 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Hak Cipta &copy; 2026 PT Garut Sejahtera Propertindo &bull; Sistem Terlindungi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition">Halaman Utama CRM</Link>
            <span>&bull;</span>
            <Link href="/kpr-calculator" className="hover:text-white transition">Simulasi KPR</Link>
            <span>&bull;</span>
            <Link href="/login" className="hover:text-white transition">Portal Staff</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}