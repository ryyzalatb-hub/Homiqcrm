'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_BOOKINGS, DEMO_PROJECTS } from '@/lib/demo-data';
import { Booking } from '@/types';
import { 
  BadgeCheck, 
  CreditCard, 
  Search, 
  Printer, 
  Copy, 
  Check, 
  X, 
  FileText, 
  Building, 
  UserCheck, 
  DollarSign,
  ShieldCheck,
  Plus,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Calendar,
  Download,
  Receipt,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  QrCode,
  Zap,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { formatPhoneDisplay, buildWhatsAppLink } from '@/lib/whatsapp';

export interface DPInstallment {
  id: string;
  stageName: string;
  dueDate: string;
  amount: number;
  paidDate?: string;
  status: 'paid' | 'due' | 'pending';
  receiptNumber?: string;
}

const INITIAL_DP_LEDGER: Record<string, DPInstallment[]> = {
  'b1': [
    { id: 'dp-1-1', stageName: 'Cicilan DP Tahap 1 (Saat SPK)', dueDate: '02-11-2026', amount: 16500000, paidDate: '02-11-2026', status: 'paid', receiptNumber: 'KW-DP-202611-01' },
    { id: 'dp-1-2', stageName: 'Cicilan DP Tahap 2 (Bulan ke-2)', dueDate: '02-12-2026', amount: 16000000, status: 'due' },
    { id: 'dp-1-3', stageName: 'Cicilan DP Tahap 3 (Bulan ke-3)', dueDate: '02-01-2027', amount: 16000000, status: 'pending' },
  ],
  'b2': [
    { id: 'dp-2-1', stageName: 'Cicilan DP Tahap 1 (Subsidi FLPP)', dueDate: '15-10-2026', amount: 4300000, paidDate: '15-10-2026', status: 'paid', receiptNumber: 'KW-DP-202610-02' },
    { id: 'dp-2-2', stageName: 'Cicilan DP Tahap 2 (Pelunasan DP)', dueDate: '30-10-2026', amount: 4000000, paidDate: '30-10-2026', status: 'paid', receiptNumber: 'KW-DP-202610-03' },
  ],
  'b3': [
    { id: 'dp-3-1', stageName: 'Cicilan DP Tahap 1', dueDate: '20-10-2026', amount: 11500000, paidDate: '20-10-2026', status: 'paid', receiptNumber: 'KW-DP-202610-04' },
    { id: 'dp-3-2', stageName: 'Cicilan DP Tahap 2', dueDate: '05-11-2026', amount: 11500000, paidDate: '03-11-2026', status: 'paid', receiptNumber: 'KW-DP-202611-05' },
    { id: 'dp-3-3', stageName: 'Cicilan DP Tahap 3 (Pelunasan DP)', dueDate: '20-11-2026', amount: 11500000, status: 'due' },
  ],
  'b4': [
    { id: 'dp-4-1', stageName: 'Pelunasan Cash Keras (100%)', dueDate: '25-10-2026', amount: 161000000, paidDate: '25-10-2026', status: 'paid', receiptNumber: 'KW-CASH-202610-01' },
  ]
};

export default function BookingsPage() {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(DEMO_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedAkadStatus, setSelectedAkadStatus] = useState('all');
  const [receiptModalBooking, setReceiptModalBooking] = useState<Booking | null>(null);

  // DP Installments Ledger State
  const [dpLedger, setDpLedger] = useState<Record<string, DPInstallment[]>>(INITIAL_DP_LEDGER);
  const [selectedBookingForDP, setSelectedBookingForDP] = useState<Booking | null>(null);
  const [printDPReceipt, setPrintDPReceipt] = useState<{ booking: Booking; installment: DPInstallment } | null>(null);

  // Payment Gateway Simulator State
  const [activePaymentGateway, setActivePaymentGateway] = useState<{
    booking: Booking;
    installment?: DPInstallment;
    amount: number;
    title: string;
  } | null>(null);
  const [selectedGatewayChannel, setSelectedGatewayChannel] = useState<'btn' | 'bca' | 'mandiri' | 'qris'>('btn');
  const [isSimulatingGateway, setIsSimulatingGateway] = useState(false);

  // New Booking Modal State
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newProject, setNewProject] = useState(DEMO_PROJECTS[0].name);
  const [newUnitCode, setNewUnitCode] = useState('Blok A-08');
  const [newPrice, setNewPrice] = useState('166000000');
  const [newBookingFee, setNewBookingFee] = useState('2000000');
  const [newPaymentMethod, setNewPaymentMethod] = useState('KPR Subsidi FLPP');
  const [newMarketing, setNewMarketing] = useState('Kang Dika Pratama');

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.booking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.unit_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_phone.includes(searchQuery) ||
      b.marketing_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProj = selectedProject === 'all' || b.project_name === selectedProject;
    const matchesStatus = selectedAkadStatus === 'all' || b.akad_status === selectedAkadStatus;
    return matchesSearch && matchesProj && matchesStatus;
  });

  const totalFee = bookings.reduce((acc, curr) => acc + curr.booking_fee, 0);
  const totalValue = bookings.reduce((acc, curr) => acc + curr.price, 0);
  const sudahAkadCount = bookings.filter(b => b.akad_status === 'Sudah Akad').length;
  const pemberkasanCount = bookings.filter(b => b.akad_status !== 'Sudah Akad').length;

  const handleCopyCode = (code: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
    }
    showToast(`Kode booking "${code}" berhasil disalin ke clipboard!`, 'info');
  };

  const handlePrintReceipt = (booking: Booking) => {
    setReceiptModalBooking(booking);
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newCustomerPhone.trim()) {
      showToast('Nama calon pembeli dan nomor WhatsApp wajib diisi.', 'error');
      return;
    }

    const newCode = `BOK-202611-${Math.floor(100 + Math.random() * 900)}`;
    const created: Booking = {
      id: `b-${Date.now()}`,
      booking_code: newCode,
      customer_name: newCustomerName.trim(),
      customer_phone: newCustomerPhone.trim(),
      project_name: newProject,
      unit_code: newUnitCode.trim(),
      marketing_name: newMarketing,
      price: Number(newPrice) || 166000000,
      booking_fee: Number(newBookingFee) || 2000000,
      payment_method: newPaymentMethod,
      payment_status: 'Lunas (Terkunci)',
      akad_status: 'Pemberkasan',
      booked_at: 'Hari ini'
    };

    setBookings(prev => [created, ...prev]);
    setIsNewBookingModalOpen(false);
    showToast(`Pemesanan ${created.unit_code} oleh ${created.customer_name} berhasil dicatat! Kode: ${newCode}`, 'success');

    // Reset
    setNewCustomerName('');
    setNewCustomerPhone('');
  };

  const handleSendReceiptWA = (b: Booking) => {
    const text = `*KWITANSI TANDA JADI PEMESANAN KAVLING*\n*Garut Sejahtera Property*\n\nNo. Kwitansi: KW/${b.booking_code}\nNama Konsumen: ${b.customer_name}\nUnit: *${b.unit_code}* (${b.project_name})\nSkema: ${b.payment_method}\nHarga Jual: Rp ${b.price.toLocaleString('id-ID')}\n*Tanda Jadi (Booking Fee): Rp ${b.booking_fee.toLocaleString('id-ID')} (LUNAS)*\n\nStatus Unit: *TERKUNCI AMAN* (Anti-Double Booking)\nTerima kasih atas kepercayaan Bapak/Ibu.`;
    const url = buildWhatsAppLink(b.customer_phone, text);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Membuka WhatsApp untuk mengirim kwitansi resmi...', 'success');
  };

  const handleMarkDPPaid = (bookingId: string, instId: string) => {
    const receiptNum = `KW-DP-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;
    setDpLedger(prev => {
      const items = prev[bookingId] || [];
      return {
        ...prev,
        [bookingId]: items.map(item => {
          if (item.id === instId) {
            return {
              ...item,
              status: 'paid',
              paidDate: 'Hari ini',
              receiptNumber: receiptNum
            };
          }
          return item;
        })
      };
    });
    showToast(`Cicilan DP berhasil ditandai LUNAS! Nomor Kwitansi: ${receiptNum}`, 'success');
  };

  const handleSimulateGatewaySuccess = () => {
    if (!activePaymentGateway) return;
    setIsSimulatingGateway(true);

    setTimeout(() => {
      setIsSimulatingGateway(false);
      const { booking, installment, amount } = activePaymentGateway;

      if (installment) {
        handleMarkDPPaid(booking.id, installment.id);
      } else {
        setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, payment_status: 'Lunas (Terkunci)' } : b));
        showToast(`Pembayaran Tanda Jadi Rp ${amount.toLocaleString('id-ID')} unit ${booking.unit_code} LUNAS via Gateway!`, 'success');
      }

      showToast(`⚡ Webhook Pembayaran Sukses! Dana Rp ${amount.toLocaleString('id-ID')} via ${selectedGatewayChannel.toUpperCase()} telah terverifikasi ke Rekening Escrow BTN.`, 'success');
      setActivePaymentGateway(null);
    }, 700);
  };

  const handleSendDPReminderWA = (b: Booking, inst: DPInstallment) => {
    const text = `*PENGINGAT JATUH TEMPO ANGSURAN UANG MUKA (DP)*\n*PT GARUT SEJAHTERA PROPERTY*\n\nKepada Yth. Bapak/Ibu *${b.customer_name}*\nPembeli Unit: *${b.unit_code}* (${b.project_name})\n\nKami menginformasikan jadwal angsuran uang muka kavling Anda:\n• Rincian: *${inst.stageName}*\n• Nominal Tagihan: *Rp ${inst.amount.toLocaleString('id-ID')}*\n• Tanggal Jatuh Tempo: *${inst.dueDate}*\n• Status: *${inst.status === 'due' ? 'Jatuh Tempo Hari Ini' : 'Menunggu Pembayaran'}*\n\nPembayaran dapat disalurkan melalui Rekening Resmi Escrow Developer:\n*Bank BTN Cabang Garut*\nNo. Rekening: *00123-01-30-009988-7*\nA.n: *PT Garut Sejahtera Property*\n\nSetelah melakukan transfer, mohon kirimkan bukti transfer ke WhatsApp ini agar kwitansi resmi langsung kami terbitkan. Terima kasih 🙏`;
    const url = buildWhatsAppLink(b.customer_phone, text);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Membuka WhatsApp untuk mengirim pengingat jadwal DP...', 'info');
  };

  const handleExportBookingsCSV = () => {
    const headers = ['Kode Booking', 'Nomor Unit', 'Proyek Perumahan', 'Nama Pembeli', 'Nomor WhatsApp', 'Harga Jual (Rp)', 'Tanda Jadi (Rp)', 'Skema Pembayaran', 'Status Pembayaran', 'Status Akad', 'Konsultan Marketing', 'Tanggal Booking'];
    const rows = filteredBookings.map(b => [
      `"${b.booking_code}"`,
      `"${b.unit_code}"`,
      `"${b.project_name}"`,
      `"${b.customer_name}"`,
      `"${b.customer_phone}"`,
      b.price,
      b.booking_fee,
      `"${b.payment_method}"`,
      `"${b.payment_status}"`,
      `"${b.akad_status}"`,
      `"${b.marketing_name}"`,
      `"${b.booked_at}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `homiq-transaksi-booking-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${filteredBookings.length} data transaksi booking berhasil diekspor ke CSV / Excel!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Transactions
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Row-Locking DB Aktif (0% Konflik)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Booking &amp; Transaksi Penjualan Properti
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pencatatan resmi tanda jadi (booking fee), validasi kwitansi hukum perumahan, dan pemantauan tahapan akad kredit konsumen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportBookingsCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center gap-1.5"
              title="Ekspor Seluruh Transaksi ke Excel / CSV"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Ekspor CSV Transaksi</span>
            </button>

            <button
              onClick={() => setIsNewBookingModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-sm shadow-emerald-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Catat Tanda Jadi Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Fee */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Tanda Jadi (Fee)</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-2 tracking-tight">
            Rp {(totalFee / 1000000).toFixed(1)} <span className="text-sm font-semibold text-emerald-800">Juta</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Rekening penampungan resmi developer</p>
        </div>

        {/* Metric 2: Total Nilai Transaksi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Nilai Kavling Terkunci</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-blue-700 font-mono mt-2 tracking-tight">
            Rp {(totalValue / 1000000).toLocaleString('id-ID')} <span className="text-sm font-semibold text-blue-800">Jt</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Akumulasi properti subsidi &amp; komersial</p>
        </div>

        {/* Metric 3: Sudah Akad */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-indigo-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Status Sudah Akad</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
              <BadgeCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono mt-2 tracking-tight">
            {sudahAkadCount} <span className="text-sm font-semibold text-slate-500">Unit</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-2">
            {Math.round((sudahAkadCount / (bookings.length || 1)) * 100)}% dari total transaksi
          </p>
        </div>

        {/* Metric 4: Dalam Pemberkasan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Proses Pemberkasan</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 font-mono mt-2 tracking-tight">
            {pemberkasanCount} <span className="text-sm font-semibold text-slate-500">Unit</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Verifikasi berkas &amp; evaluasi bank</p>
        </div>

      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari kode booking, nama konsumen, nomor WhatsApp, unit kavling, atau PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Proyek Perumahan</option>
            {DEMO_PROJECTS.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>

          <select
            value={selectedAkadStatus}
            onChange={(e) => setSelectedAkadStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status Akad</option>
            <option value="Pemberkasan">Pemberkasan</option>
            <option value="Proses Bank">Proses Bank</option>
            <option value="Sudah Akad">Sudah Akad</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[880px]">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Kode Booking</th>
                <th className="p-3.5">Nama Calon Pembeli</th>
                <th className="p-3.5">Proyek &amp; Kavling</th>
                <th className="p-3.5">PIC Marketing</th>
                <th className="p-3.5">Harga Unit</th>
                <th className="p-3.5">Tanda Jadi (Fee)</th>
                <th className="p-3.5">Skema Bayar</th>
                <th className="p-3.5">Status Akad</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400">
                    Tidak ada transaksi yang cocok dengan kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {b.booking_code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(b.booking_code)}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded transition"
                          title="Salin Kode Booking"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{b.booked_at}</span>
                    </td>

                    <td className="p-3.5 font-bold text-slate-900">
                      <p>{b.customer_name}</p>
                      <p className="text-[10px] font-mono text-slate-500 font-normal">{formatPhoneDisplay(b.customer_phone)}</p>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] inline-block mb-0.5 border border-blue-200">
                        {b.unit_code}
                      </span>
                      <p className="text-slate-600 text-[11px]">{b.project_name}</p>
                    </td>

                    <td className="p-3.5 font-medium text-slate-700">
                      {b.marketing_name}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      Rp {b.price.toLocaleString('id-ID')}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-emerald-600">
                      Rp {b.booking_fee.toLocaleString('id-ID')}
                    </td>

                    <td className="p-3.5">
                      <span className="text-[11px] text-slate-700 font-medium">
                        {b.payment_method}
                      </span>
                      <span className="text-[10px] text-emerald-600 block mt-0.5 font-semibold">({b.payment_status})</span>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        b.akad_status === 'Sudah Akad'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : b.akad_status === 'Pemberkasan'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-blue-50 text-blue-800 border-blue-300'
                      }`}>
                        {b.akad_status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBookingForDP(b)}
                          className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[11px] rounded-lg transition flex items-center gap-1 border border-amber-200"
                          title="Kartu Kontrol Angsuran Uang Muka (DP)"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Angsuran DP</span>
                        </button>
                        <Link
                          href={`/portal-kpr/${b.booking_code.toLowerCase()}`}
                          target="_blank"
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] rounded-lg transition flex items-center gap-1 border border-blue-200"
                          title="Buka Portal Berkas KPR Konsumen"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Portal KPR</span>
                        </Link>
                        <button
                          onClick={() => handlePrintReceipt(b)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg transition flex items-center gap-1"
                          title="Cetak Kwitansi / SPK"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Kwitansi</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kwitansi / SPK Modal */}
      {receiptModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Kwitansi Tanda Jadi Pemesanan Kavling</h3>
              </div>
              <button 
                onClick={() => setReceiptModalBooking(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Receipt Content */}
            <div id="receipt-printable-area" className="p-6 space-y-4 text-xs text-slate-700 bg-white">
              {/* Company Header */}
              <div className="text-center pb-4 border-b border-slate-200">
                <h4 className="font-extrabold text-base text-slate-900">GARUT SEJAHTERA PROPERTY</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Developer &amp; Real Estate Management &bull; Garut, Jawa Barat</p>
                <p className="text-[10px] text-slate-400">NPWP: 01.234.567.8-443.000 &bull; Hotline: 0812-3456-7890</p>
              </div>

              {/* Receipt Meta */}
              <div className="flex justify-between items-center text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span>No. Kwitansi: <strong>KW/{receiptModalBooking.booking_code}</strong></span>
                <span>Tanggal: <strong>{receiptModalBooking.booked_at}</strong></span>
              </div>

              {/* Receipt Fields */}
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Telah Terima Dari:</span>
                  <span className="col-span-2 font-bold text-slate-900">{receiptModalBooking.customer_name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Nomor Telepon:</span>
                  <span className="col-span-2 font-mono text-slate-800">{formatPhoneDisplay(receiptModalBooking.customer_phone)}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Unit Kavling:</span>
                  <span className="col-span-2 font-bold text-blue-700">{receiptModalBooking.unit_code} ({receiptModalBooking.project_name})</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Metode Bayar:</span>
                  <span className="col-span-2 text-slate-800">{receiptModalBooking.payment_method}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Harga Jual Unit:</span>
                  <span className="col-span-2 font-mono font-bold text-slate-900">Rp {receiptModalBooking.price.toLocaleString('id-ID')}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800 font-semibold">Tanda Jadi (Fee):</span>
                  <span className="col-span-2 font-mono font-extrabold text-emerald-800 text-sm">
                    Rp {receiptModalBooking.booking_fee.toLocaleString('id-ID')} (LUNAS)
                  </span>
                </div>
              </div>

              {/* Stamp & Signature Section */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-center">
                <div>
                  <p className="text-[10px] text-slate-400">Penyetor / Calon Pembeli</p>
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-slate-800">({receiptModalBooking.customer_name})</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">Penerima / Kasir Developer</p>
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-slate-800">({receiptModalBooking.marketing_name})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => handleSendReceiptWA(receiptModalBooking)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Kirim via WA</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReceiptModalBooking(null)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg transition"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    window.print();
                    showToast('Dialog pencetakan dokumen kwitansi SPK dibuka.', 'success');
                  }}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Catat Tanda Jadi (Booking Fee) Baru</h3>
              </div>
              <button 
                onClick={() => setIsNewBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Calon Pembeli</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ibu Rina Permata"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
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
                  <label className="block text-slate-700 font-bold mb-1">Kode Unit Kavling</label>
                  <input
                    type="text"
                    required
                    placeholder="Blok A-08"
                    value={newUnitCode}
                    onChange={(e) => setNewUnitCode(e.target.value)}
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
                  <label className="block text-slate-700 font-bold mb-1">Besar Tanda Jadi (Rp)</label>
                  <input
                    type="number"
                    value={newBookingFee}
                    onChange={(e) => setNewBookingFee(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono text-emerald-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Skema Pembayaran</label>
                  <select
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  >
                    <option value="KPR Subsidi FLPP">KPR Subsidi FLPP</option>
                    <option value="KPR Komersial Bank">KPR Komersial Bank</option>
                    <option value="KPR Syariah Murabahah">KPR Syariah Murabahah</option>
                    <option value="Cash Bertahap 12x">Cash Bertahap 12x</option>
                    <option value="Cash Keras">Cash Keras</option>
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

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Unit kavling akan langsung berstatus <strong>BOOKED</strong> dan terkunci di database. Konsumen lain tidak akan bisa memilih kavling ini.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-sm transition"
                >
                  Kunci Kavling &amp; Terbitkan Kwitansi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: KARTU KONTROL ANGSURAN UANG MUKA (DP) */}
      {selectedBookingForDP && (() => {
        const installments = dpLedger[selectedBookingForDP.id] || [
          { id: `dp-${selectedBookingForDP.id}-1`, stageName: 'Cicilan DP Tahap 1', dueDate: '15-11-2026', amount: Math.round(selectedBookingForDP.price * 0.05), status: 'due' },
          { id: `dp-${selectedBookingForDP.id}-2`, stageName: 'Cicilan DP Tahap 2', dueDate: '15-12-2026', amount: Math.round(selectedBookingForDP.price * 0.05), status: 'pending' },
        ];
        const totalDPAmount = installments.reduce((acc, curr) => acc + curr.amount, 0);
        const totalDPPaid = installments.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
        const remainingDP = totalDPAmount - totalDPPaid;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in zoom-in-95 my-6">
              
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Kartu Kontrol Angsuran Uang Muka (DP)</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {selectedBookingForDP.customer_name} • Unit {selectedBookingForDP.unit_code} ({selectedBookingForDP.project_name})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBookingForDP(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Financial KPI Summary */}
              <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-500 block">Total Uang Muka (DP)</span>
                  <span className="text-base font-extrabold font-mono text-slate-900 mt-0.5 block">
                    Rp {totalDPAmount.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400">Kavling Rp {selectedBookingForDP.price.toLocaleString('id-ID')}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-500 block">DP Masuk (Lunas)</span>
                  <span className="text-base font-extrabold font-mono text-emerald-600 mt-0.5 block">
                    Rp {totalDPPaid.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Tercatat di kas developer</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-500 block">Sisa Kewajiban DP</span>
                  <span className="text-base font-extrabold font-mono text-amber-700 mt-0.5 block">
                    Rp {remainingDP.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-amber-700 font-semibold">
                    {remainingDP === 0 ? 'DP Telah Lunas Penuh' : 'Menunggu pembayaran tahap berikutnya'}
                  </span>
                </div>
              </div>

              {/* Installments Table */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Jadwal Termin Angsuran DP
                  </h4>
                  <span className="text-[11px] text-slate-500">Rekening: Bank BTN 00123-01-30-009988-7</span>
                </div>

                <div className="space-y-2.5">
                  {installments.map((inst, idx) => {
                    const isPaid = inst.status === 'paid';
                    const isDue = inst.status === 'due';

                    return (
                      <div
                        key={inst.id}
                        className={`p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isPaid ? 'bg-emerald-50/60 border-emerald-200' :
                          isDue ? 'bg-amber-50/60 border-amber-300' :
                          'bg-white border-slate-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-xs text-slate-900">{inst.stageName}</span>
                            {isPaid ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                LUNAS ({inst.paidDate})
                              </span>
                            ) : isDue ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                JATUH TEMPO
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                                Menunggu
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 pl-7 flex items-center gap-2">
                            <span>Jatuh Tempo: <strong className="text-slate-700">{inst.dueDate}</strong></span>
                            {inst.receiptNumber && (
                              <span>• No: <strong className="font-mono text-blue-700">{inst.receiptNumber}</strong></span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                          <span className="font-mono font-extrabold text-sm text-slate-900">
                            Rp {inst.amount.toLocaleString('id-ID')}
                          </span>

                          {isPaid ? (
                            <button
                              onClick={() => setPrintDPReceipt({ booking: selectedBookingForDP, installment: inst })}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 shadow-2xs transition"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              Cetak Kwitansi
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setActivePaymentGateway({
                                  booking: selectedBookingForDP,
                                  installment: inst,
                                  amount: inst.amount,
                                  title: `Pelunasan ${inst.stageName}`
                                })}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1 transition shadow-2xs"
                                title="Buka Payment Gateway VA / QRIS"
                              >
                                <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                                <span>VA / QRIS</span>
                              </button>
                              <button
                                onClick={() => handleSendDPReminderWA(selectedBookingForDP, inst)}
                                className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1 transition"
                                title="Kirim Pengingat Jadwal via WA"
                              >
                                <Send className="w-3 h-3" />
                                <span>WA</span>
                              </button>
                              <button
                                onClick={() => handleMarkDPPaid(selectedBookingForDP.id, inst.id)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-2xs transition"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Lunas</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Konsultan Marketing: <strong>{selectedBookingForDP.marketing_name}</strong>
                </span>
                <button
                  onClick={() => setSelectedBookingForDP(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition"
                >
                  Tutup Kartu Kontrol
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* MODAL 4: CETAK KWITANSI ANGSURAN UANG MUKA (DP) A4 RESMI */}
      {printDPReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in print:p-0 print:bg-white print:fixed print:inset-0">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 print:border-none print:shadow-none print:rounded-none">
            
            {/* Action Bar (Hidden in Print) */}
            <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm">Pratinjau Kwitansi Angsuran DP</span>
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
                  onClick={() => setPrintDPReceipt(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Official Printable Area */}
            <div className="p-8 space-y-5 text-xs text-slate-800 bg-white font-sans">
              
              {/* Kop Surat PT */}
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <h4 className="font-black text-base text-slate-900 tracking-tight uppercase">PT GARUT SEJAHTERA PROPERTY</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">Developer &amp; Pengelola Kawasan Hunian Garut</p>
                <p className="text-[10px] text-slate-400">Jl. Pembangunan No. 88, Garut | Rekening Giro BTN: 00123-01-30-009988-7</p>
              </div>

              {/* Kwitansi Header Meta */}
              <div className="flex justify-between items-center text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span>No. Kwitansi: <strong className="font-mono text-blue-700">{printDPReceipt.installment.receiptNumber || 'KW-DP-202611-09'}</strong></span>
                <span>Tanggal Bayar: <strong>{printDPReceipt.installment.paidDate || 'Hari ini'}</strong></span>
              </div>

              {/* Data Fields */}
              <div className="space-y-2.5 pt-1">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Telah Terima Dari:</span>
                  <span className="col-span-2 font-bold text-slate-900 uppercase">{printDPReceipt.booking.customer_name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Nomor Kontak:</span>
                  <span className="col-span-2 font-mono text-slate-800">{formatPhoneDisplay(printDPReceipt.booking.customer_phone)}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500">Untuk Pembayaran:</span>
                  <span className="col-span-2 font-semibold text-slate-800 leading-relaxed">
                    {printDPReceipt.installment.stageName} untuk unit kavling <strong>{printDPReceipt.booking.unit_code}</strong> pada perumahan <strong>{printDPReceipt.booking.project_name}</strong>.
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800 font-bold self-center">Jumlah Nominal:</span>
                  <span className="col-span-2 font-mono font-black text-emerald-800 text-base">
                    Rp {printDPReceipt.installment.amount.toLocaleString('id-ID')} (LUNAS)
                  </span>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-center">
                <div>
                  <p className="text-[10px] text-slate-400">Penyetor / Pembeli</p>
                  <div className="h-14 flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-slate-800">({printDPReceipt.booking.customer_name})</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">Kasir / Bagian Keuangan</p>
                  <div className="h-14 flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-slate-800">(Bagian Keuangan PT GSP)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
                Kwitansi ini adalah bukti pembayaran sah yang dikeluarkan oleh sistem keuangan HOMIQ CRM.
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Virtual Account & QRIS Payment Gateway Simulator Modal */}
      {activePaymentGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            
            {/* Modal Top Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Payment Gateway Escrow</span>
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded-full">
                      SANDBOX LIVE
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400">Rekening Resmi PT Garut Sejahtera Propertindo</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePaymentGateway(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bill Summary Banner */}
            <div className="p-4 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Total Tagihan:</span>
                <span className="text-lg font-mono font-black text-blue-700">
                  Rp {activePaymentGateway.amount.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {activePaymentGateway.booking.customer_name} &bull; <strong>{activePaymentGateway.booking.unit_code}</strong>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  23:59:45
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Batas Bayar</span>
              </div>
            </div>

            {/* Channel Tabs */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setSelectedGatewayChannel('btn')}
                  className={`py-1.5 rounded-lg text-center transition ${selectedGatewayChannel === 'btn' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'}`}
                >
                  BTN VA
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGatewayChannel('bca')}
                  className={`py-1.5 rounded-lg text-center transition ${selectedGatewayChannel === 'bca' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'}`}
                >
                  BCA VA
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGatewayChannel('mandiri')}
                  className={`py-1.5 rounded-lg text-center transition ${selectedGatewayChannel === 'mandiri' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'}`}
                >
                  MANDIRI
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGatewayChannel('qris')}
                  className={`py-1.5 rounded-lg text-center transition flex items-center justify-center gap-1 ${selectedGatewayChannel === 'qris' ? 'bg-white text-emerald-700 shadow-2xs' : 'hover:text-slate-900'}`}
                >
                  <QrCode className="w-3 h-3 text-emerald-600" />
                  QRIS
                </button>
              </div>

              {/* Channel View */}
              {selectedGatewayChannel === 'qris' ? (
                <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    STANDAR BI QRIS DINAMIS &bull; ASPI
                  </div>

                  {/* QRIS Graphic SVG */}
                  <div className="w-44 h-44 mx-auto bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center justify-between">
                    <div className="text-[10px] font-black tracking-widest text-slate-800 font-mono">
                      Q R I S
                    </div>
                    {/* Visual QR Code matrix representation */}
                    <div className="w-32 h-32 bg-slate-900 rounded p-1.5 flex flex-wrap gap-1 items-center justify-center relative">
                      <div className="absolute inset-1 border-2 border-white/90 grid grid-cols-4 grid-rows-4 p-1">
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-transparent" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-transparent" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-transparent" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-transparent" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-transparent" />
                        <div className="bg-white m-0.5 rounded-xs" />
                        <div className="bg-white m-0.5 rounded-xs" />
                      </div>
                      <div className="w-7 h-7 bg-blue-600 rounded-md z-10 flex items-center justify-center font-bold text-white text-[9px] shadow-sm">
                        HQ
                      </div>
                    </div>
                    <div className="text-[8px] text-slate-400 font-mono">NMID: ID1020261189201</div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Scan menggunakan aplikasi <strong>BCA Mobile, Livin Mandiri, GoPay, OVO, atau ShopeePay</strong>.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {selectedGatewayChannel === 'btn' ? 'Bank BTN Virtual Account (Escrow Rekanan)' :
                       selectedGatewayChannel === 'bca' ? 'BCA Virtual Account' :
                       'Bank Mandiri Virtual Account'}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                      OTOMATIS
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">Nomor Virtual Account:</span>
                      <span className="font-mono text-base font-black text-slate-900 tracking-wider">
                        {selectedGatewayChannel === 'btn' ? '9881 2345 0092 1189' :
                         selectedGatewayChannel === 'bca' ? '1234 5081 2234 5678' :
                         '8921 0012 3456 7890'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const num = selectedGatewayChannel === 'btn' ? '9881234500921189' : selectedGatewayChannel === 'bca' ? '1234508122345678' : '8921001234567890';
                        if (navigator?.clipboard) navigator.clipboard.writeText(num);
                        showToast('Nomor Virtual Account berhasil disalin!', 'info');
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p>&bull; Masukkan kode pembayaran di menu <strong>Transfer &gt; Virtual Account</strong>.</p>
                    <p>&bull; Konfirmasi nama penerima: <strong>PT GARUT SEJAHTERA PROPERTY</strong>.</p>
                  </div>
                </div>
              )}

              {/* Instant Webhook Simulation Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSimulatingGateway}
                  onClick={handleSimulateGatewaySuccess}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSimulatingGateway ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menerima Webhook Callback Bank...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Simulasikan Pembayaran Berhasil (Webhook HTTP 200)</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Menguji otomatisasi pembaruan buku besar DP &amp; penerbitan kwitansi real-time.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
