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
  CheckCircle2, 
  Eye, 
  EyeOff, 
  UserCheck,
  Building,
  KeyRound
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC]">
      
      {/* Left Branding Showcase (Desktop) */}
      <div 
        className="hidden lg:flex lg:w-1/2 text-white p-12 flex-col justify-between relative overflow-hidden border-r border-[#1E293B]"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(8, 12, 26, 0.90), rgba(8, 12, 26, 0.98)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white leading-none">HOMIQ</span>
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">PRO CRM</span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Smart Property Operating System</p>
            </div>
          </div>
        </div>

        {/* Center Content & Value Props */}
        <div className="relative z-10 space-y-8 my-auto py-8">
          <div className="space-y-3">
            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-700/50 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Platform CRM B2B Multi-Tenant
            </span>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Tingkatkan Closing Penjualan Properti Tanpa Risiko Double-Booking.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              Solusi CRM terintegrasi khusus developer perumahan dan agensi properti. Dilengkapi fungsi transaksional row-locking database PostgreSQL anti benturan kavling, pipeline sales interaktif, dan otomasi WhatsApp.
            </p>
          </div>

          {/* 3 Pillars Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Row-Locking
              </p>
              <p className="text-[11px] text-slate-400">Garansi 0% double-booking unit kavling</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <p className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Click-to-WA
              </p>
              <p className="text-[11px] text-slate-400">Format internasional 628... dan template pesan</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-1">
              <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-amber-400" />
                Multi-Tenant
              </p>
              <p className="text-[11px] text-slate-400">Isolasi data database level PostgreSQL RLS</p>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="relative z-10 pt-6 border-t border-[#1E293B] text-xs text-slate-400 space-y-1">
          <p className="italic text-slate-300">
            &quot;HOMIQ mempermudah tim sales kami mengunci 12 unit dalam 1 minggu tanpa ada satupun unit ter-booking ganda.&quot;
          </p>
          <p className="font-semibold text-slate-400 text-[11px]">
            &mdash; MUHAMMAD RIZAL, Direktur Utama Garut Sejahtera Property
          </p>
        </div>

      </div>

      {/* Right Login Form Deck */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          
          {/* Mobile Logo View */}
          <div className="flex items-center gap-3 lg:hidden pb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 leading-none">HOMIQ</span>
              <p className="text-xs text-slate-500 font-medium">Smart Property CRM</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Masuk ke Workspace CRM</h2>
            <p className="text-xs text-slate-500">
              Silakan masukkan kredensial akun developer perumahan Anda
            </p>
          </div>

          {/* Standard Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email Bisnis
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@developer.co.id"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Kata Sandi (Password)
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); showToast('Tautan reset password telah dikirim ke email', 'info'); }} className="text-[11px] text-blue-600 font-medium hover:underline">
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Memproses Verifikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Switcher Section (Fitur Kunci Presentasi) */}
          <div className="pt-5 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>Pilih Akun Demo (1-Klik Masuk)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                Instant Access
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Untuk kebutuhan presentasi & pengujian, Anda dapat masuk langsung tanpa input password dengan memilih peran di bawah:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('owner')}
                className="w-full p-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition shadow-2xs hover:border-blue-400 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                    👔
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-blue-600 transition">Direktur Utama & Owner</p>
                    <p className="text-[10px] text-slate-500">Pak MUHAMMAD RIZAL (Garut Sejahtera)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-blue-600 font-bold">Buka Dashboard →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('marketing')}
                className="w-full p-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition shadow-2xs hover:border-emerald-400 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    💼
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition">Konsultan Marketing</p>
                    <p className="text-[10px] text-slate-500">Kang Dika Pratama (Sales Lead Engine)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">Buka Follow-up →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('finance')}
                className="w-full p-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition shadow-2xs hover:border-amber-400 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                    💳
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-amber-600 transition">Admin Keuangan &amp; KPR</p>
                    <p className="text-[10px] text-slate-500">Ibu Siti Rahma (Kontrol Angsuran DP &amp; Kwitansi)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-600 font-bold">Buka Keuangan →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('construction')}
                className="w-full p-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition shadow-2xs hover:border-violet-400 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center font-bold text-xs shrink-0">
                    🏗️
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-violet-600 transition">Site Manager &amp; Teknik Sipil</p>
                    <p className="text-[10px] text-slate-500">Ir. Hendra Wijaya (Progres Fisik &amp; BAPF BTN)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-violet-600 font-bold">Buka Konstruksi →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('superadmin')}
                className="w-full p-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition shadow-2xs hover:border-purple-400 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                    🛡️
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-purple-600 transition">Platform Super Admin</p>
                    <p className="text-[10px] text-slate-500">Master Console (Kelola Kuota Multi-Tenant)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-600 font-bold">Buka Console →</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-[11px] text-slate-400">
            HOMIQ Smart Property CRM &bull; Versi 1.2 Enterprise Edition
          </div>

        </div>
      </div>

    </div>
  );
}
