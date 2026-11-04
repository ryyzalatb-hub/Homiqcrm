'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  KeyRound,
  FileSignature,
  CreditCard,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [email, setEmail] = useState('rizal@garutsejahtera.co.id');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast('Login berhasil! Selamat datang kembali, MUHAMMAD RIZAL (Direktur Utama).', 'success');
      router.push('/');
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'owner' | 'marketing' | 'finance' | 'construction' | 'superadmin') => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (role === 'owner') {
        showToast('Masuk sebagai MUHAMMAD RIZAL (Direktur Utama — Garut Sejahtera Property)', 'success');
        router.push('/');
      } else if (role === 'marketing') {
        showToast('Masuk sebagai Kang Dika Pratama (Senior Marketing Consultant)', 'info');
        router.push('/follow-ups');
      } else if (role === 'finance') {
        showToast('Masuk sebagai Ibu Siti Rahma (Admin Keuangan, Cicilan DP & Escrow BTN)', 'info');
        router.push('/bookings');
      } else if (role === 'construction') {
        showToast('Masuk sebagai Ir. Hendra Wijaya (Site Manager & Pengawas Mutu SNI)', 'info');
        router.push('/construction');
      } else if (role === 'superadmin') {
        showToast('Masuk sebagai Platform Super Admin (Multi-Tenant Master Console)', 'success');
        router.push('/super-admin');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#060913] text-slate-100 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* Left Architectural Cinematic Showcase */}
      <div 
        className="hidden lg:flex lg:w-7/12 p-12 lg:p-16 flex-col justify-between relative overflow-hidden border-r border-gold-500/15"
        style={{ 
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 60%), linear-gradient(to bottom, rgba(6,9,19,0.85) 0%, rgba(6,9,19,0.96) 100%), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        {/* Ambient Luxury Glow Orbs */}
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center font-bold text-obsidian-950 shadow-lg shadow-gold-500/25 border border-gold-300/40">
              <Building2 className="w-6 h-6 text-obsidian-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-wider text-white font-cinzel">HOMIQ</span>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
                  ULTRA-LUXURY
                </span>
              </div>
              <p className="text-xs text-gold-200/60 font-medium tracking-wide">Architectural PropTech Operating System</p>
            </div>
          </div>
        </div>

        {/* Center Content & Value Props */}
        <div className="relative z-10 space-y-7 my-auto py-10 max-w-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
              Enterprise PropTech Platform &bull; PT Garut Sejahtera Propertindo
            </div>
            <h1 className="text-3xl xl:text-5xl font-serif text-white tracking-tight leading-[1.18]">
              Harmoni Kemewahan Arsitektur &amp; Ketepatan Digital Closing.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Standar baru ekosistem CRM real estate kelas atas. Mengintegrasikan Virtual Tour 360°, pembayaran instan QRIS Booking Fee, E-Signature SPK Digital berkekuatan hukum, serta orkestrasi WhatsApp drip campaign terpadu.
            </p>
          </div>

          {/* 4 PropTech Architectural Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold">
                <Compass className="w-4 h-4 text-gold-400" />
                <span>360° Walkthrough VR</span>
              </div>
              <p className="text-[11px] text-slate-400">Tur interaktif panorama imersif 4 sudut ruang</p>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Instant QRIS Gateway</span>
              </div>
              <p className="text-[11px] text-slate-400">Kunci kavling detik itu juga via dynamic QRIS / VA</p>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                <FileSignature className="w-4 h-4 text-blue-400" />
                <span>Digital SPK &amp; E-Sign</span>
              </div>
              <p className="text-[11px] text-slate-400">Tanda tangan canvas &amp; cetak kontrak resmi A4</p>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-gold-500/20 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-gold-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-300" />
                <span>Zero Double-Booking</span>
              </div>
              <p className="text-[11px] text-slate-400">Transaksional row-locking database PostgreSQL</p>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="relative z-10 pt-6 border-t border-gold-500/15 text-xs space-y-1.5">
          <p className="italic text-slate-300 font-serif text-sm">
            &quot;HOMIQ mengubah total cara kami mempresentasikan portofolio properti premium kepada buyer &amp; perbankan, meningkatkan konversi transaksi secara signifikan.&quot;
          </p>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <p className="font-semibold text-gold-300">
              MUHAMMAD RIZAL &bull; Direktur Utama Garut Sejahtera Property
            </p>
            <span className="text-slate-500 font-mono">Grand City &bull; Pesona Regency &bull; Emerald</span>
          </div>
        </div>

      </div>

      {/* Right Login Form Deck */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 sm:p-10 lg:p-12 relative">
        <div className="w-full max-w-md space-y-6 relative z-10">
          
          {/* Mobile Logo View */}
          <div className="flex items-center gap-3 lg:hidden pb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-obsidian-950 shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-white font-cinzel">HOMIQ</span>
              <p className="text-xs text-gold-300 font-medium">Ultra-Luxury PropTech CRM</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-serif text-white tracking-tight">Masuk ke Portal CRM</h2>
            <p className="text-xs text-slate-400">
              Akses konsol manajemen properti eksklusif developer Anda
            </p>
          </div>

          {/* Luxury Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Alamat Email Bisnis
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-400/60 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@developer.co.id"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-obsidian-900/90 text-white border border-gold-500/25 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition font-medium placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Kata Sandi (Password)
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); showToast('Tautan verifikasi aman dikirim ke email terdaftar.', 'info'); }} className="text-[11px] text-gold-400 hover:text-gold-300 transition">
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400/60 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-obsidian-900/90 text-white border border-gold-500/25 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition font-mono placeholder:text-slate-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-gold-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input type="checkbox" defaultChecked className="rounded border-gold-500/30 text-gold-500 focus:ring-gold-400 bg-obsidian-900" />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-obsidian-950 rounded-xl text-xs font-bold transition shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Memverifikasi Akses Enkripsi...</span>
              ) : (
                <>
                  <span>Buka Workspace Eksekutif</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Switcher Section */}
          <div className="pt-5 border-t border-gold-500/15 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 font-cinzel tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-gold-400" />
                <span>Akses Demo 1-Klik</span>
              </span>
              <span className="text-[10px] font-mono text-gold-300 bg-gold-500/10 px-2 py-0.5 rounded font-bold border border-gold-500/30">
                Live Simulation
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pilih peran di bawah untuk menguji alur kerja eksekutif tanpa pengisian kredensial manual:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('owner')}
                className="w-full p-2.5 bg-obsidian-900/90 hover:bg-gold-500/10 text-slate-200 rounded-xl text-xs font-semibold border border-gold-500/30 flex items-center justify-between transition group hover:border-gold-400"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-300 border border-gold-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                    👔
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-white group-hover:text-gold-300 transition">Direktur Utama &amp; Owner</p>
                    <p className="text-[10px] text-slate-400">MUHAMMAD RIZAL &bull; Garut Sejahtera Propertindo</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gold-400 font-bold group-hover:translate-x-0.5 transition">Masuk →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('marketing')}
                className="w-full p-2.5 bg-obsidian-900/90 hover:bg-emerald-500/10 text-slate-200 rounded-xl text-xs font-semibold border border-slate-800 flex items-center justify-between transition group hover:border-emerald-500/40"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    💼
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-white group-hover:text-emerald-400 transition">Konsultan Marketing</p>
                    <p className="text-[10px] text-slate-400">Kang Dika Pratama (5 Leads WA Engine)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold group-hover:translate-x-0.5 transition">Masuk →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('finance')}
                className="w-full p-2.5 bg-obsidian-900/90 hover:bg-blue-500/10 text-slate-200 rounded-xl text-xs font-semibold border border-slate-800 flex items-center justify-between transition group hover:border-blue-500/40"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    💳
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-white group-hover:text-blue-400 transition">Admin Keuangan &amp; KPR</p>
                    <p className="text-[10px] text-slate-400">Ibu Siti Rahma (Escrow BTN &amp; Booking QRIS)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-blue-400 font-bold group-hover:translate-x-0.5 transition">Masuk →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('construction')}
                className="w-full p-2.5 bg-obsidian-900/90 hover:bg-amber-500/10 text-slate-200 rounded-xl text-xs font-semibold border border-slate-800 flex items-center justify-between transition group hover:border-amber-500/40"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    🏗️
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-white group-hover:text-amber-400 transition">Site Manager &amp; Konstruksi</p>
                    <p className="text-[10px] text-slate-400">Ir. Hendra Wijaya (Progres Fisik Kavling)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold group-hover:translate-x-0.5 transition">Masuk →</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-[11px] text-slate-500 font-mono">
            HOMIQ PropTech Edition &bull; PT Garut Sejahtera Propertindo
          </div>

        </div>
      </div>

    </div>
  );
}
