'use client';
import React, { useState } from 'react';
import { DEMO_BOOKINGS, DEMO_PROJECTS } from '@/lib/demo-data';
import { 
  Users2, 
  Search, 
  Filter, 
  Phone, 
  Building2, 
  BadgeCheck, 
  ExternalLink,
  FileText,
  MessageCircle,
  X,
  CreditCard,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  UserCheck,
  Plus,
  ShieldCheck,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { formatPhoneDisplay, buildWhatsAppLink } from '@/lib/whatsapp';

interface CustomerRecord {
  id: string;
  booking_code: string;
  name: string;
  phone: string;
  project: string;
  unit: string;
  marketing: string;
  price: number;
  booking_fee: number;
  payment_method: string;
  akad_status: string;
  booked_at: string;
  nik: string;
  job: string;
  bankPartner: string;
  sp3kNumber: string;
  slikScore: number;
  slikStatus: 'Kol-1 (Sangat Lancar)' | 'Kol-2 (Perhatian Khusus)' | 'Kol-5 (Macet)';
  paylaterNote: string;
}

export default function CustomersPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedAkadFilter, setSelectedAkadFilter] = useState<'all' | 'akad' | 'pemberkasan'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  // Form State for new customer
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNik, setNewNik] = useState('');
  const [newJob, setNewJob] = useState('');
  const [newProject, setNewProject] = useState(DEMO_PROJECTS[0].name);
  const [newUnit, setNewUnit] = useState('Blok A-09');
  const [newPrice, setNewPrice] = useState('166000000');
  const [newFee, setNewFee] = useState('2000000');
  const [newPayment, setNewPayment] = useState('KPR Subsidi FLPP');
  const [newBank, setNewBank] = useState('Bank BTN KC Garut');
  const [newMarketing, setNewMarketing] = useState('Kang Dika Pratama');

  const [customersList, setCustomersList] = useState<CustomerRecord[]>(() => {
    return DEMO_BOOKINGS.map((b, idx) => ({
      id: b.id,
      booking_code: b.booking_code,
      name: b.customer_name,
      phone: b.customer_phone,
      project: b.project_name,
      unit: b.unit_code,
      marketing: b.marketing_name,
      price: b.price,
      booking_fee: b.booking_fee,
      payment_method: b.payment_method,
      akad_status: b.akad_status,
      booked_at: b.booked_at,
      nik: '3205' + Math.floor(100000000000 + Math.random() * 900000000000),
      job: idx === 0 ? 'PNS Guru Dinas Pendidikan' : idx === 1 ? 'Karyawan Swasta PT Garut Industri' : idx === 2 ? 'Wiraswasta Kuliner & Batik' : 'Pengusaha Mandiri',
      bankPartner: idx === 1 ? 'Bank BTN Kantor Cabang Garut' : idx === 2 ? 'Bank Mandiri KC Garut' : 'Bank BTN Syariah',
      sp3kNumber: 'SP3K/BTN-GRT/2026/XI/' + Math.floor(100 + Math.random() * 900),
      slikScore: idx === 0 ? 98 : idx === 1 ? 95 : idx === 2 ? 99 : 100,
      slikStatus: 'Kol-1 (Sangat Lancar)' as const,
      paylaterNote: idx === 1 ? 'Ada 1 paylater Rp 350.000 sudah dilunasi per 20 Oktober 2026 (SKL terlampir).' : 'Bersih dari pinjol & tunggakan perbankan.'
    }));
  });

  const filtered = customersList.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.project.toLowerCase().includes(search.toLowerCase()) ||
      c.unit.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.marketing.toLowerCase().includes(search.toLowerCase()) ||
      c.nik.includes(search);

    if (selectedAkadFilter === 'akad') return matchesSearch && c.akad_status.toLowerCase().includes('sudah');
    if (selectedAkadFilter === 'pemberkasan') return matchesSearch && !c.akad_status.toLowerCase().includes('sudah');
    return matchesSearch;
  });

  const totalOmzet = customersList.reduce((acc, curr) => acc + curr.price, 0);
  const totalBookingFee = customersList.reduce((acc, curr) => acc + curr.booking_fee, 0);
  const sudahAkadCount = customersList.filter(c => c.akad_status.toLowerCase().includes('sudah')).length;
  const pemberkasanCount = customersList.length - sudahAkadCount;

  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      showToast('Nama pelanggan dan nomor kontak wajib diisi.', 'error');
      return;
    }

    const created: CustomerRecord = {
      id: `c-${Date.now()}`,
      booking_code: `BOK-202611-${Math.floor(100 + Math.random() * 900)}`,
      name: newName.trim(),
      phone: newPhone.trim(),
      project: newProject,
      unit: newUnit.trim(),
      marketing: newMarketing,
      price: Number(newPrice) || 166000000,
      booking_fee: Number(newFee) || 2000000,
      payment_method: newPayment,
      akad_status: 'Pemberkasan',
      booked_at: 'Hari ini',
      nik: newNik.trim() || '3205' + Math.floor(100000000000 + Math.random() * 900000000000),
      job: newJob.trim() || 'Wiraswasta / Profesional',
      bankPartner: newBank,
      sp3kNumber: 'SP3K/PROSES/2026/XI/' + Math.floor(100 + Math.random() * 900),
      slikScore: 95,
      slikStatus: 'Kol-1 (Sangat Lancar)',
      paylaterNote: 'Pra-skrining awal lolos, berkas siap evaluasi komite kredit bank.'
    };

    setCustomersList(prev => [created, ...prev]);
    setIsAddCustomerOpen(false);
    showToast(`Konsumen baru "${created.name}" berhasil didaftarkan ke direktori CRM!`, 'success');

    // Reset
    setNewName('');
    setNewPhone('');
    setNewNik('');
    setNewJob('');
  };

  const handleExportData = () => {
    const headers = ['Kode Booking', 'Nama Pelanggan', 'NIK', 'Pekerjaan', 'Nomor WhatsApp', 'Proyek Perumahan', 'Nomor Unit', 'Harga Properti (Rp)', 'Tanda Jadi (Rp)', 'Skema Pembayaran', 'Bank KPR', 'Nomor SP3K', 'Status Akad', 'Konsultan Marketing'];
    const rows = filtered.map(c => [
      `"${c.booking_code}"`,
      `"${c.name}"`,
      `"'${c.nik}"`,
      `"${c.job}"`,
      `"${c.phone}"`,
      `"${c.project}"`,
      `"${c.unit}"`,
      c.price,
      c.booking_fee,
      `"${c.payment_method}"`,
      `"${c.bankPartner}"`,
      `"${c.sp3kNumber}"`,
      `"${c.akad_status}"`,
      `"${c.marketing}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `homiq-pelanggan-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${filtered.length} basis data pelanggan berhasil diekspor ke CSV / Excel!`, 'success');
  };

  const handleSendSlikWA = (cust: CustomerRecord) => {
    const text = `*RESUME HASIL PRA-SKRINING BI CHECKING / SLIK OJK*\n*PT Garut Sejahtera Propertindo*\n\nYth. Bapak/Ibu ${cust.name},\nKavling: ${cust.unit} (${cust.project})\n\nBerikut hasil audit data kelayakan kredit pembiayaan properti Anda:\n• Status Kolektibilitas: *KOL-1 (Lancar / Bersih)*\n• Skor Kelayakan KPR: *98 / 100 (Sangat Layak)*\n• Rekomendasi Bank: *${cust.bankPartner || 'Bank BTN (Syariah / Konvensional)'}*\n• Fasilitas Bebas Pinjol/Paylater: *Terverifikasi Aman*\n\nBerkas Anda siap diajukan ke perbankan mitra untuk penerbitan SP3K resmi. Terima kasih atas kepercayaan Anda memilih hunian berkualitas kami.\n\n_Salam hangat, Tim Administrasi KPR HOMIQ_`;
    const waUrl = buildWhatsAppLink(cust.phone, text);
    window.open(waUrl, '_blank');
    showToast(`Resume pra-skrining SLIK OJK untuk ${cust.name} dikirimkan via WhatsApp!`, 'success');
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
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                Customer 360° Directory
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                {customersList.length} Konsumen Terverifikasi Hukum
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Direktori Pelanggan &amp; Konsumen Properti
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Basis data pembeli yang telah membayar tanda jadi, dalam tahap verifikasi KPR perbankan, hingga serah terima kunci dan sertifikat SHM.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportData}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Ekspor Data Konsumen</span>
            </button>

            <button
              onClick={() => setIsAddCustomerOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pelanggan Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Nilai Transaksi</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-blue-700 font-mono mt-2 tracking-tight">
            Rp {(totalOmzet / 1000000000).toFixed(2)} <span className="text-sm font-semibold text-blue-800">Miliar</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Akumulasi properti terjual &amp; booking</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tanda Jadi Diterima</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
              <BadgeCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-2 tracking-tight">
            Rp {(totalBookingFee / 1000000).toFixed(1)} <span className="text-sm font-semibold text-emerald-800">Juta</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Terkunci di rekening penampungan</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-indigo-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Status Sudah Akad</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono mt-2 tracking-tight">
            {sudahAkadCount} <span className="text-sm font-semibold text-slate-500">Konsumen</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-2">SHM &amp; Kunci siap serah terima</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tahap Pemberkasan</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 font-mono mt-2 tracking-tight">
            {pemberkasanCount} <span className="text-sm font-semibold text-slate-500">Konsumen</span>
          </p>
          <p className="text-[11px] text-amber-700 font-medium mt-2">Verifikasi berkas &amp; bank partner</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama pelanggan, NIK, nomor WhatsApp, unit kavling, atau PIC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedAkadFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedAkadFilter === 'all'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({customersList.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedAkadFilter('akad')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedAkadFilter === 'akad'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sudah Akad ({sudahAkadCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedAkadFilter('pemberkasan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedAkadFilter === 'pemberkasan'
                ? 'bg-white text-amber-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pemberkasan ({pemberkasanCount})
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[850px]">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nama Konsumen</th>
                <th className="p-3.5">No. Telepon / WA</th>
                <th className="p-3.5">Unit Kavling</th>
                <th className="p-3.5">PIC Marketing</th>
                <th className="p-3.5">Nilai Properti</th>
                <th className="p-3.5">Skema Bayar</th>
                <th className="p-3.5">Status Akad</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    Tidak ada pelanggan yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <span className="text-[10px] font-mono text-slate-400">Kode: {c.booking_code}</span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">
                      {formatPhoneDisplay(c.phone)}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] inline-block mb-0.5 border border-blue-200">
                        {c.unit}
                      </span>
                      <p className="text-[11px] text-slate-500">{c.project}</p>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {c.marketing}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      Rp {(c.price / 1000000).toLocaleString('id-ID')} Juta
                    </td>
                    <td className="p-3.5">
                      <span className="text-slate-800 font-medium">{c.payment_method}</span>
                      <span className="block text-[10px] font-mono text-emerald-600 font-semibold">Fee: Rp {(c.booking_fee / 1000000).toFixed(1)} Jt</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        c.akad_status.toLowerCase().includes('sudah')
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}>
                        {c.akad_status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-semibold rounded-lg transition border border-blue-200 hover:border-transparent"
                      >
                        Detail Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER 360° DOSSIER MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full my-8 overflow-hidden animate-in zoom-in-95">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Dossier Pelanggan 360°</h3>
                  <p className="text-[11px] text-slate-500">Berkas legalitas, status KPR, &amp; akad kredit</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700 max-h-[70vh] overflow-y-auto">
              
              {/* Customer Profile Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                    Profil Konsumen Terverifikasi
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedCustomer.name}</h3>
                  <p className="text-slate-500 font-mono">{formatPhoneDisplay(selectedCustomer.phone)} &bull; NIK: {selectedCustomer.nik}</p>
                  <p className="text-slate-500 mt-0.5">{selectedCustomer.job}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    selectedCustomer.akad_status.toLowerCase().includes('sudah')
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {selectedCustomer.akad_status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">Kode: {selectedCustomer.booking_code}</p>
                </div>
              </div>

              {/* Property & Financial Ledger */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  Buku Kas &amp; Rincian Finansial Unit:
                </h4>

                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Unit Kavling &amp; Perumahan:</span>
                    <strong className="text-slate-900">{selectedCustomer.project} &mdash; {selectedCustomer.unit}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Total Harga Unit (Netto):</span>
                    <strong className="font-mono text-slate-900">Rp {selectedCustomer.price.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Tanda Jadi (Booking Fee):</span>
                    <strong className="font-mono text-emerald-600">Rp {selectedCustomer.booking_fee.toLocaleString('id-ID')} (Lunas)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Skema Pembiayaan:</span>
                    <strong className="text-slate-900">{selectedCustomer.payment_method}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Mitra Bank KPR:</span>
                    <strong className="text-blue-700">{selectedCustomer.bankPartner}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">No. Surat Persetujuan (SP3K):</span>
                    <strong className="font-mono text-slate-900">{selectedCustomer.sp3kNumber}</strong>
                  </div>
                </div>
              </div>

              {/* Pra-Skrining BI Checking & SLIK OJK */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/50 border border-emerald-200/90 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Pra-Skrining BI Checking &amp; SLIK OJK</h4>
                      <p className="text-[10px] text-slate-500">Audit kelayakan kredit perbankan &amp; histori pinjaman</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    KOL-1 LANCAR (98/100)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white border border-emerald-100 shadow-xs">
                    <p className="text-[10px] text-slate-400 font-medium">Histori Kredit</p>
                    <p className="font-extrabold text-emerald-700 mt-0.5">0 Tunggakan</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-emerald-100 shadow-xs">
                    <p className="text-[10px] text-slate-400 font-medium">Paylater / Pinjol</p>
                    <p className="font-extrabold text-emerald-700 mt-0.5">Bebas Hutang</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-emerald-100 shadow-xs">
                    <p className="text-[10px] text-slate-400 font-medium">Plafon Max KPR</p>
                    <p className="font-extrabold text-blue-700 mt-0.5">s.d. Rp 850 Jt</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-emerald-100/60">
                  <p className="text-[10px] text-slate-500 italic">
                    *Telah diverifikasi terhadap database iDeb OJK &amp; sistem analisa resiko BTN.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSendSlikWA(selectedCustomer)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Kirim Resume SLIK (WA)</span>
                  </button>
                </div>
              </div>

              {/* Document Status */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  Status Berkas Persyaratan Bank:
                </h4>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>e-KTP Pemohon &amp; Pasangan</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>Kartu Keluarga (KK) &amp; Nikah</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>NPWP &amp; Bukti Lapor SPT</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>Slip Gaji Asli 3 Bulan</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>Rekening Koran Payroll</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>Surat Keterangan Kerja Aktif</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Handover Guarantee */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900 text-[11px] space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-blue-600" />
                  Jaminan Legalitas &amp; Serah Terima Kunci (BAST):
                </p>
                <p className="text-blue-800 leading-relaxed">
                  Unit kavling {selectedCustomer.unit} pada proyek {selectedCustomer.project} berstatus sertifikat SHM sudah splitzing atas nama pengembang dan siap dibaliknamakan ke atas nama pembeli saat penandatanganan akad notaris.
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <Link
                href={`/portal-kpr/${selectedCustomer.booking_code.toLowerCase()}`}
                target="_blank"
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Buka Portal Berkas KPR Konsumen</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-200 rounded-xl transition"
                >
                  Tutup
                </button>
                <a
                  href={buildWhatsAppLink(selectedCustomer.phone, `Halo Bapak/Ibu ${selectedCustomer.name}, salam hormat dari PT Garut Sejahtera Propertindo. Kami ingin mengabarkan update terkait status unit ${selectedCustomer.unit} Anda...`)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ADD CUSTOMER MODAL */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Tambah Data Pelanggan Baru</h3>
              </div>
              <button 
                onClick={() => setIsAddCustomerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomerSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Konsumen</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Herman Susanto"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">NIK KTP (16 Digit)</label>
                  <input
                    type="text"
                    placeholder="3205xxxxxxxxxxxx"
                    value={newNik}
                    onChange={(e) => setNewNik(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pekerjaan / Instansi</label>
                  <input
                    type="text"
                    placeholder="Contoh: PNS Pemda Garut"
                    value={newJob}
                    onChange={(e) => setNewJob(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Proyek Perumahan</label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  >
                    {DEMO_PROJECTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit Kavling</label>
                  <input
                    type="text"
                    required
                    placeholder="Blok A-09"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Harga Unit (Rp)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tanda Jadi (Rp)</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono text-emerald-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Skema Bayar &amp; Bank</label>
                  <select
                    value={newPayment}
                    onChange={(e) => setNewPayment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  >
                    <option value="KPR Subsidi FLPP">KPR Subsidi FLPP</option>
                    <option value="KPR Komersial Bank">KPR Komersial Bank</option>
                    <option value="KPR Syariah Murabahah">KPR Syariah Murabahah</option>
                    <option value="Cash Bertahap">Cash Bertahap</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">PIC Marketing</label>
                  <select
                    value={newMarketing}
                    onChange={(e) => setNewMarketing(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  >
                    <option value="Kang Dika Pratama">Kang Dika Pratama</option>
                    <option value="Teh Nisa Andriani">Teh Nisa Andriani</option>
                    <option value="Kang Fajar Ramadhan">Kang Fajar Ramadhan</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-sm transition"
                >
                  Simpan Konsumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
