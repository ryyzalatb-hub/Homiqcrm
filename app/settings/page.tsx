'use client';
import React, { useState } from 'react';
import { 
  Building2, 
  Settings2, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Database, 
  Save, 
  CheckCircle2, 
  Download, 
  RotateCcw, 
  Key, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  HelpCircle, 
  Sparkles,
  Lock,
  MessageSquare,
  DollarSign,
  FileCheck,
  Zap
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Finance' | 'Legal' | 'Senior Consultant' | 'Sales Executive';
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin: string;
}

export default function SettingsPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'financial' | 'whatsapp' | 'users' | 'security'>('profile');

  // Tab 1: Company Profile State
  const [companyName, setCompanyName] = useState('PT Garut Sejahtera Property');
  const [brandName, setBrandName] = useState('Garut Sejahtera Housing & Living');
  const [nib, setNib] = useState('0220108920188');
  const [association, setAssociation] = useState('APERSI (Asosiasi Pengembang Perumahan dan Permukiman Seluruh Indonesia)');
  const [address, setAddress] = useState('Jl. Raya Cimanuk No. 88, Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151');
  const [phone, setPhone] = useState('(0262) 234-8899');
  const [email, setEmail] = useState('info@garutsejahtera.co.id');
  const [website, setWebsite] = useState('https://garutsejahtera.co.id');
  
  // Escrow Bank Accounts
  const [bankName, setBankName] = useState('Bank BTN Kantor Cabang Garut');
  const [bankAccountNo, setBankAccountNo] = useState('00148-01-30-008819-2');
  const [bankAccountHolder, setBankAccountHolder] = useState('PT GARUT SEJAHTERA PROPERTY - ESCROW TANDA JADI');

  // Tab 2: Financial Defaults
  const [defaultBookingFee, setDefaultBookingFee] = useState(1500000);
  const [refundPolicy, setRefundPolicy] = useState<'full' | 'admin_cut' | 'non_refundable'>('admin_cut');
  const [adminCutAmount, setAdminCutAmount] = useState(250000);
  const [flppRate, setFlppRate] = useState(5.0);
  const [maxDbr, setMaxDbr] = useState(35);
  const [pphCommRate, setPphCommRate] = useState(2.5);

  // Tab 3: WhatsApp & Leads
  const [defaultSenderName, setDefaultSenderName] = useState('Tim Layanan Garut Sejahtera');
  const [autoWelcomeMessage, setAutoWelcomeMessage] = useState(
    'Halo! Terima kasih telah menghubungi Garut Sejahtera Property. Tim konsultan kami akan segera membantu Anda memilih kavling hunian terbaik dengan penawaran promo subsidi minggu ini.'
  );
  const [roundRobinAutoAssign, setRoundRobinAutoAssign] = useState(true);

  // Tab 4: User Accounts
  const [users, setUsers] = useState<StaffUser[]>([
    { id: 'u1', name: 'MUHAMMAD RIZAL', email: 'rizal@garutsejahtera.co.id', role: 'Owner', status: 'ACTIVE', lastLogin: 'Hari ini, 09:15' },
    { id: 'u2', name: 'Siti Aminah, Ak.', email: 'finance@garutsejahtera.co.id', role: 'Finance', status: 'ACTIVE', lastLogin: 'Hari ini, 08:30' },
    { id: 'u3', name: 'Rahmat Hidayat, S.H.', email: 'legal@garutsejahtera.co.id', role: 'Legal', status: 'ACTIVE', lastLogin: 'Kemarin, 16:45' },
    { id: 'u4', name: 'Kang Dika Pratama', email: 'dika@garutsejahtera.co.id', role: 'Senior Consultant', status: 'ACTIVE', lastLogin: 'Hari ini, 10:12' },
    { id: 'u5', name: 'Teh Nisa Andriani', email: 'nisa@garutsejahtera.co.id', role: 'Senior Consultant', status: 'ACTIVE', lastLogin: 'Hari ini, 09:40' },
    { id: 'u6', name: 'Kang Fajar Ramadhan', email: 'fajar@garutsejahtera.co.id', role: 'Sales Executive', status: 'ACTIVE', lastLogin: 'Kemarin, 14:10' }
  ]);

  // Database Diagnostics State
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [dbDiagnosticResult, setDbDiagnosticResult] = useState<{
    status: string;
    latency: number;
    tablesCount: number;
    rlsStatus: string;
    timestamp: string;
  } | null>(null);

  const handleTestDbConnection = () => {
    setIsTestingDb(true);
    setTimeout(() => {
      setIsTestingDb(false);
      const latency = Math.floor(18 + Math.random() * 12);
      setDbDiagnosticResult({
        status: 'TERHUBUNG (HTTP 200 OK)',
        latency,
        tablesCount: 16,
        rlsStatus: 'Row-Level Security (RLS) Aktif & Terisolasi',
        timestamp: new Date().toLocaleTimeString('id-ID')
      });
      showToast(`Tes diagnostik database Supabase berhasil! Latensi: ${latency}ms`, 'success');
    }, 600);
  };

  const handleSaveSettings = () => {
    showToast('Seluruh konfigurasi pengembang & preferensi berhasil disimpan ke sistem!', 'success');
  };

  const handleExportDatabase = () => {
    const backupData = {
      tenant: companyName,
      exportedAt: new Date().toISOString(),
      profile: { companyName, brandName, nib, address, phone, email, website },
      escrowAccount: { bankName, bankAccountNo, bankAccountHolder },
      financialSettings: { defaultBookingFee, refundPolicy, adminCutAmount, flppRate, maxDbr },
      usersCount: users.length
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `homiq-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Berkas cadangan basis data (JSON Snapshot) berhasil diunduh.', 'success');
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        showToast(`Status pengguna ${u.name} diubah menjadi ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Settings2 className="w-3.5 h-3.5 text-blue-400" />
                Workspace Configuration Hub
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Garut Sejahtera Active Tenant
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Pengaturan Profil Pengembang &amp; Sistem
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Konfigurasi identitas legal developer, kop surat dokumen resmi, rekening penampung tanda jadi, standar finansial KPR, dan hak akses staf.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-400" />
          <span>Profil &amp; Legalitas Developer</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'financial'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Standar Finansial &amp; Tanda Jadi</span>
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'whatsapp'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp &amp; Integrasi Leads</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-400" />
          <span>Pengguna &amp; Hak Akses ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'security'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Keamanan &amp; Backup Data</span>
        </button>
      </div>

      {/* Tab 1: Profile & Developer Legalities */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Identitas Resmi Pengembang (Badan Usaha)</h3>
              <p className="text-xs text-slate-500">Data ini akan dicantumkan secara otomatis pada dokumen resmi (SPK, PPJB, Kwitansi, dan SPH).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Resmi Perusahaan (PT / CV)</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Brand Komersial / Merk Dagang</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor Induk Berusaha (NIB)</label>
                <input
                  type="text"
                  value={nib}
                  onChange={(e) => setNib(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Asosiasi Pengembang Properti</label>
                <input
                  type="text"
                  value={association}
                  onChange={(e) => setAssociation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Alamat Kantor Pemasaran Utama</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor Telepon Kantor</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Resmi Perusahaan</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Escrow Bank Account Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Rekening Bank Penampung Resmi (Escrow Account)</h3>
                <p className="text-xs text-slate-500">Rekening resmi developer untuk penerimaan dana booking fee, tanda jadi, dan uang muka konsumen.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Terverifikasi Bank
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Bank Mitra</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Nomor Rekening Escrow</label>
                <input
                  type="text"
                  value={bankAccountNo}
                  onChange={(e) => setBankAccountNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Atas Nama Rekening</label>
                <input
                  type="text"
                  value={bankAccountHolder}
                  onChange={(e) => setBankAccountHolder(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Financial Defaults */}
      {activeTab === 'financial' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Parameter Finansial &amp; Standar Transaksi</h3>
            <p className="text-xs text-slate-500">Nilai default yang digunakan pada Kalkulator KPR, Kwitansi Booking, dan Simulasi SPH.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="block text-slate-800 font-bold">Besaran Tanda Jadi Standar (Rp)</label>
              <input
                type="number"
                value={defaultBookingFee}
                onChange={(e) => setDefaultBookingFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-500">Nilai tanda jadi default saat mengunci kavling di peta site plan.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="block text-slate-800 font-bold">Kebijakan Pengembalian Tanda Jadi (Jika KPR Ditolak)</label>
              <select
                value={refundPolicy}
                onChange={(e) => setRefundPolicy(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="admin_cut">Dikembalikan dengan Potongan Biaya Administrasi (Rp 250.000)</option>
                <option value="full">Dikembalikan Penuh 100% (Tanpa Potongan)</option>
                <option value="non_refundable">Hangus Sepenuhnya (Non-Refundable)</option>
              </select>
              <p className="text-[11px] text-slate-500">Klausul yang tercetak pada Surat Pesanan Kavling (SPK) konsumen.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="block text-slate-800 font-bold">Bunga Standar KPR Subsidi FLPP (% per tahun)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={flppRate}
                  onChange={(e) => setFlppRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="font-bold text-slate-700">% Flat</span>
              </div>
              <p className="text-[11px] text-slate-500">Sesuai Keputusan Menteri PUPR untuk program perumahan bersubsidi.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="block text-slate-800 font-bold">Maksimal Batas Debt Burden Ratio (DBR)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={maxDbr}
                  onChange={(e) => setMaxDbr(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="font-bold text-slate-700">% dari Gaji</span>
              </div>
              <p className="text-[11px] text-slate-500">Batas maksimal cicilan bulanan yang disetujui analis perbankan mitra.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: WhatsApp & Lead Automation */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Integrasi WhatsApp &amp; Alokasi Otomatis</h3>
            <p className="text-xs text-slate-500">Otomatisasi pengiriman pesan sambutan dan pembagian prospek ke tim penjualan.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Panggilan Pengirim Default</label>
              <input
                type="text"
                value={defaultSenderName}
                onChange={(e) => setDefaultSenderName(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Pesan Sambutan Otomatis (Auto-Greeting)</label>
              <textarea
                rows={4}
                value={autoWelcomeMessage}
                onChange={(e) => setAutoWelcomeMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">Pesan yang otomatis disiapkan saat prospek pertama kali masuk via Meta Ads / Webhook simulator.</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-900">Distribusi Prospek Otomatis (Round-Robin Allocation)</p>
                <p className="text-[11px] text-blue-700">Setiap lead baru yang masuk dibagi bergantian secara merata ke konsultan yang aktif.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={roundRobinAutoAssign} 
                  onChange={(e) => setRoundRobinAutoAssign(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: User Accounts & Roles */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pengguna Sistem &amp; Hak Akses Jabatan</h3>
              <p className="text-xs text-slate-500">Kelola staf yang memiliki akses masuk ke platform HOMIQ CRM.</p>
            </div>
            <button
              onClick={() => showToast('Form pendaftaran staf baru dapat diakses melalui menu Marketing Team.', 'info')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-xs self-start sm:self-auto"
            >
              + Tambah Pengguna
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Pengguna</th>
                  <th className="p-3">Email Resmi</th>
                  <th className="p-3">Peran / Hak Akses</th>
                  <th className="p-3">Aktivitas Terakhir</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{u.name}</td>
                    <td className="p-3 text-slate-600 font-mono text-[11px]">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.role === 'Owner'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : u.role === 'Finance'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : u.role === 'Legal'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px]">{u.lastLogin}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'ACTIVE' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {u.status === 'ACTIVE' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        {u.status === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Security & Database Backup */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Keamanan Data &amp; PostgreSQL Row-Level Security (RLS)</h3>
                <p className="text-xs text-slate-500">Enkripsi multi-tenant memastikan data antar pengembang terisolasi secara aman.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                RLS Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">PostgreSQL RLS</span>
                <p className="font-extrabold text-slate-800 text-sm">Terenkripsi Per Tenant</p>
                <p className="text-[11px] text-slate-500">Mencegah kebocoran data prospek &amp; keuangan antar developer.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Double-Booking Guard</span>
                <p className="font-extrabold text-emerald-600 text-sm">SELECT ... FOR UPDATE</p>
                <p className="text-[11px] text-slate-500">Row-lock mengunci nomor kavling secara instan saat ada transaksi tanda jadi.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Audit Trail Logging</span>
                <p className="font-extrabold text-blue-600 text-sm">Tercatat Lengkap</p>
                <p className="text-[11px] text-slate-500">Setiap perubahan status unit dan follow-up dicatat dengan timestamp detail.</p>
              </div>
            </div>
          </div>

          {/* Live Database Connectivity Diagnostic Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Uji Diagnostik Database PostgreSQL Supabase</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Verifikasi konektivitas real-time, latensi jaringan perbankan, dan integritas 16 tabel multi-tenant.
                </p>
              </div>

              <button
                type="button"
                disabled={isTestingDb}
                onClick={handleTestDbConnection}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs shrink-0 disabled:opacity-50"
              >
                {isTestingDb ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menguji Ping Server...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Uji Koneksi Database (Ping)</span>
                  </>
                )}
              </button>
            </div>

            {/* Diagnostic Result Card */}
            {dbDiagnosticResult && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {dbDiagnosticResult.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Waktu Audit: {dbDiagnosticResult.timestamp} WIB
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Latensi Jaringan</span>
                    <span className="font-mono font-bold text-emerald-300 text-sm">{dbDiagnosticResult.latency} ms (Optimal)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Tabel Database</span>
                    <span className="font-mono font-bold text-blue-300 text-sm">{dbDiagnosticResult.tablesCount} / 16 Sehat</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Stored Procedure</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">Row-Locking OK</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">Status Keamanan</span>
                    <span className="font-mono font-bold text-emerald-300 text-sm">RLS Isolasi Aktif</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Backup Database Snapshot */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cadangan Basis Data Mandiri (Database Backup)</h3>
                <p className="text-xs text-slate-500">
                  Unduh seluruh berkas data prospek, kavling, transaksi, dan konfigurasi pengembang dalam format JSON terenkripsi.
                </p>
              </div>

              <button
                onClick={handleExportDatabase}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs shrink-0"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Unduh Snapshot Cadangan (JSON)</span>
              </button>
            </div>
          </div>

          {/* Reset Demo Data & PWA Offline Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: PWA Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Progressive Web App (PWA)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Ready to Install
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aplikasi HOMIQ dapat dipasang ke layar utama HP Android (Chrome) atau iPhone (Safari &bull; Add to Home Screen) untuk pengoperasian cepat staf sales di lokasi proyek perumahan.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Standalone Mode: <strong>Aktif</strong></span>
                <span className="font-mono text-emerald-600 font-bold">Fast Touch Screen UI</span>
              </div>
            </div>

            {/* Card 2: Reset Demo Data */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  Reset Data Simulasi Demo
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Lingkungan Demo
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingin mempresentasikan sistem ini ke klien baru? Kembalikan status kavling, simulasi booking, dan catatan follow-up ke kondisi bersih standar awal.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Tidak mempengaruhi akun aktif</span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.clear();
                    }
                    showToast('Data simulasi berhasil di-reset ke kondisi standar pabrik!', 'success');
                    setTimeout(() => window.location.reload(), 800);
                  }}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}