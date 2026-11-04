'use client';
import React, { useState } from 'react';
import { DEMO_BOOKINGS, DEMO_PROJECTS } from '@/lib/demo-data';
import { 
  FileText, 
  Printer, 
  Copy, 
  Send, 
  CheckCircle2, 
  Building, 
  User, 
  ShieldCheck, 
  CreditCard, 
  Download, 
  ExternalLink,
  Sparkles,
  FileCheck,
  Calendar,
  Lock,
  QrCode,
  BadgeCheck
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { formatPhoneDisplay } from '@/lib/whatsapp';

type DocumentType = 'spk' | 'ppjb' | 'bast' | 'flpp_statement';

export default function DocumentsHubPage() {
  const { showToast } = useToast();
  const [selectedBookingId, setSelectedBookingId] = useState<string>(DEMO_BOOKINGS[0].id);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('spk');
  const [hasEMeterai, setHasEMeterai] = useState(true);
  const [hasDigitalSign, setHasDigitalSign] = useState(true);

  const activeBooking = DEMO_BOOKINGS.find(b => b.id === selectedBookingId) || DEMO_BOOKINGS[0];

  const handleCopyText = () => {
    showToast('Teks naskah kontrak legalitas berhasil disalin ke clipboard!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const rawPhone = activeBooking.customer_phone.replace(/\D/g, '');
    const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
    const docName = 
      selectedDocType === 'spk' ? 'Surat Pesanan Kavling (SPK)' :
      selectedDocType === 'ppjb' ? 'Perjanjian Pengikatan Jual Beli (PPJB)' :
      selectedDocType === 'bast' ? 'Berita Acara Serah Terima (BAST)' :
      'Surat Pernyataan Bebas Rumah FLPP';

    const text = `Halo Bapak/Ibu *${activeBooking.customer_name}*,\n\nBerikut kami kirimkan draf resmi *${docName}* untuk unit *${activeBooking.unit_code}* di *${activeBooking.project_name}* dari PT Garut Sejahtera Propertindo.\n\nDokumen legalitas ini mengikat pemesanan unit Anda secara resmi. Silakan hubungi konsultan kami jika ada poin yang ingin dikonfirmasi.\n\nTerima kasih,\n*HOMIQ Legal & Contract Division*`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
    showToast(`Draf dokumen berhasil dikirim ke WhatsApp ${activeBooking.customer_name}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 select-none">
      
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                Legal Documents &amp; Contracts Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Standar Notaris &amp; KemenPUPR
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Pusat Dokumen &amp; Kontrak Legalitas Perumahan
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Generator instan Surat Pesanan Kavling (SPK), PPJB, Berita Acara Serah Terima (BAST Kunci), dan Surat Pernyataan Subsidi FLPP siap cetak A4 bermaterai.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyText}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Teks Kontrak</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak A4 / PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Controls Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Document Type Selector Card */}
          <div className="crm-card p-5 bg-white rounded-2xl border-slate-200/90 shadow-2xs space-y-3">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Pilih Jenis Dokumen Kontrak:
            </span>

            <div className="space-y-2">
              {[
                { id: 'spk', title: 'Surat Pesanan Kavling (SPK)', desc: 'Pengikatan booking fee & tanda jadi kavling resmi' },
                { id: 'ppjb', title: 'Perjanjian Pengikatan Jual Beli (PPJB)', desc: 'Naskah kontrak notaris hak & kewajiban pembeli' },
                { id: 'bast', title: 'Berita Acara Serah Terima (BAST)', desc: 'Penyerahan fisik show unit, kunci, & garansi retensi' },
                { id: 'flpp_statement', title: 'Surat Pernyataan Subsidi FLPP', desc: 'Format baku pemohon subsidi KemenPUPR' }
              ].map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setSelectedDocType(doc.id as DocumentType)}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-start justify-between ${
                    selectedDocType === doc.id
                      ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{doc.desc}</p>
                  </div>
                  {selectedDocType === doc.id && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Booking Selector Card */}
          <div className="crm-card p-5 bg-white rounded-2xl border-slate-200/90 shadow-2xs space-y-3">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Pilih Data Transaksi Konsumen:
            </span>

            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {DEMO_BOOKINGS.map(b => (
                <option key={b.id} value={b.id}>
                  {b.customer_name} &bull; {b.unit_code} ({b.project_name})
                </option>
              ))}
            </select>

            {/* Quick Metadata Box */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Kode Booking:</span>
                <span className="font-bold text-slate-800">{activeBooking.booking_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Harga Jual:</span>
                <span className="font-bold text-blue-700">Rp {activeBooking.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tanda Jadi:</span>
                <span className="font-bold text-emerald-600">Rp {activeBooking.booking_fee.toLocaleString('id-ID')} (Lunas)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PIC Sales:</span>
                <span className="text-slate-700">{activeBooking.marketing_name}</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Draf ke WhatsApp</span>
              </button>
              <button
                onClick={handlePrint}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar A4 / PDF</span>
              </button>
            </div>
          </div>

          {/* e-Meterai Peruri & Digital Signature Controls */}
          <div className="crm-card p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-rose-600" />
                e-Meterai &amp; TTD Digital
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hasEMeterai ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-500'}`}>
                {hasEMeterai ? 'Aktif (Peruri)' : 'Manual'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setHasEMeterai(!hasEMeterai);
                  showToast(hasEMeterai ? 'e-Meterai Peruri dilepas dari dokumen.' : 'e-Meterai Peruri Rp 10.000 berhasil dibubuhkan!', 'info');
                }}
                className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-between transition text-xs cursor-pointer ${
                  hasEMeterai
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{hasEMeterai ? '✓ e-Meterai Peruri Rp 10.000' : '+ Bubuhkan e-Meterai (Rp 10.000)'}</span>
                <span className="text-[10px] font-mono">{hasEMeterai ? 'Terpasang' : 'Opsional'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHasDigitalSign(!hasDigitalSign);
                  showToast(hasDigitalSign ? 'Tanda tangan digital dilepas.' : 'Tanda tangan digital terverifikasi sertifikat SHA-256!', 'info');
                }}
                className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-between transition text-xs cursor-pointer ${
                  hasDigitalSign
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{hasDigitalSign ? '✓ TTD Digital Terverifikasi' : '+ Pasang TTD Digital'}</span>
                <span className="text-[10px] font-mono">{hasDigitalSign ? 'SHA-256' : 'Basah'}</span>
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500 italic">
              *Sah secara hukum berdasarkan UU ITE No. 11/2008 &amp; PMK 134/PMK.03/2021.
            </p>
          </div>

          {/* Legal Note Box */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1 text-blue-900">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Standar Klausul Notaris &amp; PPAT</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Format perjanjian telah disesuaikan dengan UU No. 1 Tahun 2011 tentang Perumahan dan Kawasan Permukiman serta regulasi BP Tapera / Bank BTN.
            </p>
          </div>

        </div>

        {/* Right Printable Document Preview (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl shadow-md p-6 sm:p-10 space-y-6 text-xs text-slate-800 printable-area">
          
          {/* Formal Letterhead (Kop Surat Pengembang) */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1 relative">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                GS
              </div>
              <h2 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
                PT GARUT SEJAHTERA PROPERTINDO
              </h2>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              Pengembang Kawasan Perumahan Subsidi &amp; Komersial &bull; Anggota Resmi Real Estate Indonesia (REI)
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Izin Usaha: PBG.32.05/Dev/2024/00189 &bull; Kantor Pemasaran: Jl. Patriot No. 88, Tarogong Kidul, Garut 44151
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Telp: (0262) 234567 &bull; WhatsApp Hotline: 0812-3456-7890 &bull; Website: www.homiq.co.id
            </p>
          </div>

          {/* DOKUMEN 1: SURAT PESANAN KAVLING (SPK) */}
          {selectedDocType === 'spk' && (
            <div className="space-y-4">
              <div className="text-center space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide underline">
                  SURAT PESANAN KAVLING (SPK)
                </h3>
                <p className="font-mono text-slate-500 text-[11px]">Nomor: SPK/GS-HOMIQ/2026/XI/{activeBooking.booking_code.replace(/\D/g, '') || '892'}</p>
              </div>

              <p className="leading-relaxed text-slate-700">
                Pada hari ini, <strong>Rabu, 04 November 2026</strong>, bertempat di Kantor Pemasaran PT Garut Sejahtera Propertindo, telah dibuat dan disepakati Surat Pesanan Kavling oleh dan antara para pihak:
              </p>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">I. PIHAK PENGEMBANG (DEVELOPER):</p>
                <div className="grid grid-cols-3 gap-2 text-slate-600 text-[11px]">
                  <span>Nama Perusahaan</span>
                  <span className="col-span-2 font-bold text-slate-900">: PT Garut Sejahtera Propertindo</span>
                  <span>Diwakili Oleh</span>
                  <span className="col-span-2 font-bold text-slate-900">: MUHAMMAD RIZAL (Direktur Utama)</span>
                  <span>Alamat Kantor</span>
                  <span className="col-span-2">: Jl. Patriot No. 88, Garut, Jawa Barat</span>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">II. PIHAK PEMESAN (CALON PEMBELI):</p>
                <div className="grid grid-cols-3 gap-2 text-slate-600 text-[11px]">
                  <span>Nama Lengkap</span>
                  <span className="col-span-2 font-bold text-slate-900">: {activeBooking.customer_name}</span>
                  <span>Nomor Telepon / WA</span>
                  <span className="col-span-2 font-mono text-slate-900">: {formatPhoneDisplay(activeBooking.customer_phone)}</span>
                  <span>Alamat Domisili</span>
                  <span className="col-span-2">: Kabupaten Garut, Jawa Barat</span>
                </div>
              </div>

              {/* Rincian Objek & Nilai Pemesanan */}
              <div className="space-y-2">
                <p className="font-bold text-slate-900">RINCIAN OBJEK UNIT &amp; PEMBAYARAN:</p>
                <table className="w-full text-left border border-slate-200 text-xs rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50">
                      <td className="p-2.5 font-semibold text-slate-600 w-1/3">Nama Proyek Perumahan</td>
                      <td className="p-2.5 font-bold text-slate-900">{activeBooking.project_name}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-600">Kode Unit Kavling</td>
                      <td className="p-2.5 font-bold text-blue-700 font-mono">{activeBooking.unit_code}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-2.5 font-semibold text-slate-600">Tipe Rumah / Dimensi</td>
                      <td className="p-2.5 text-slate-800">Tipe 36/60 (Luas Bangunan 36m² / Luas Tanah 60m²)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-600">Harga Jual Unit (Netto)</td>
                      <td className="p-2.5 font-bold font-mono text-slate-900">Rp {activeBooking.price.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr className="bg-emerald-50/60">
                      <td className="p-2.5 font-semibold text-emerald-800">Tanda Jadi (Booking Fee) Lunas</td>
                      <td className="p-2.5 font-bold font-mono text-emerald-800">Rp {activeBooking.booking_fee.toLocaleString('id-ID')} (Memotong DP)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-600">Skema Pembiayaan Dipilih</td>
                      <td className="p-2.5 font-semibold text-slate-900">{activeBooking.payment_method}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ketentuan SPK */}
              <div className="space-y-1.5 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">KETENTUAN PENGKAITAN TRANSAKSI:</p>
                <p>1. Tanda Jadi (Booking Fee) yang telah disetorkan berfungsi mengunci unit kavling secara eksklusif dengan sistem <em>PostgreSQL Row-Locking</em> agar tidak dapat dipesan pihak ketiga.</p>
                <p>2. Pemesan wajib menyerahkan kelengkapan berkas KPR dalam waktu maksimal 14 (empat belas) hari kalender sejak SPK ini ditandatangani.</p>
                <p>3. Apabila terjadi penolakan kredit oleh pihak perbankan di luar kelalaian pemesan, tanda jadi akan dikembalikan sesuai ketentuan kebijakan pengembang.</p>
              </div>
            </div>
          )}

          {/* DOKUMEN 2: PERJANJIAN PENGIKATAN JUAL BELI (PPJB) */}
          {selectedDocType === 'ppjb' && (
            <div className="space-y-4">
              <div className="text-center space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide underline">
                  PERJANJIAN PENGIKATAN JUAL BELI (PPJB)
                </h3>
                <p className="font-mono text-slate-500 text-[11px]">Nomor: PPJB/GS-NOT/2026/XI/{activeBooking.booking_code.replace(/\D/g, '') || '892'}</p>
              </div>

              <p className="leading-relaxed text-slate-700">
                Perjanjian Pengikatan Jual Beli ini dibuat pada hari ini, <strong>Rabu, 04 November 2026</strong>, oleh PT Garut Sejahtera Propertindo sebagai <strong>PIHAK PERTAMA (Penjual)</strong> dan Bapak/Ibu {activeBooking.customer_name} sebagai <strong>PIHAK KEDUA (Pembeli)</strong>.
              </p>

              <div className="space-y-3 text-[11px] text-slate-700">
                <div>
                  <h5 className="font-bold text-slate-900">PASAL 1: OBJEK PERJANJIAN</h5>
                  <p className="leading-relaxed text-slate-600">
                    PIHAK PERTAMA mengikatkan diri untuk menjual kepada PIHAK KEDUA sebidang tanah dan bangunan rumah tinggal yang terletak di proyek <strong>{activeBooking.project_name}</strong>, Unit <strong>{activeBooking.unit_code}</strong>, seluas tanah 60 m² dan luas bangunan 36 m².
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">PASAL 2: HARGA &amp; TATA CARA PEMBAYARAN</h5>
                  <p className="leading-relaxed text-slate-600">
                    Harga jual objek tanah dan bangunan disepakati sebesar <strong>Rp {activeBooking.price.toLocaleString('id-ID')}</strong> (sudah termasuk PPN, SHM, PBG, listrik PLN 1.300 VA, dan air PDAM). Pembayaran dilakukan melalui fasilitas <strong>{activeBooking.payment_method}</strong>.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">PASAL 3: MASA PEMELIHARAAN &amp; GARANSI RETENSI</h5>
                  <p className="leading-relaxed text-slate-600">
                    PIHAK PERTAMA memberikan jaminan garansi pemeliharaan fisik bangunan terhadap kebocoran atap dan instalasi pipa selama <strong>100 (seratus) hari kalender</strong> sejak serah terima fisik kunci dilaksanakan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DOKUMEN 3: BERITA ACARA SERAH TERIMA (BAST) */}
          {selectedDocType === 'bast' && (
            <div className="space-y-4">
              <div className="text-center space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide underline">
                  BERITA ACARA SERAH TERIMA (BAST) KUNCI &amp; FISIK
                </h3>
                <p className="font-mono text-slate-500 text-[11px]">Nomor: BAST/GS-OPS/2026/XI/{activeBooking.booking_code.replace(/\D/g, '') || '892'}</p>
              </div>

              <p className="leading-relaxed text-slate-700">
                Menyatakan bahwa pada hari ini telah dilakukan serah terima fisik bangunan rumah tinggal dan kunci unit secara lengkap dan dalam kondisi prima tanpa cacat:
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Nama Penerima (Pemilik):</span>
                  <strong className="text-slate-900">{activeBooking.customer_name}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Unit Kavling Diserahkan:</span>
                  <strong className="text-blue-700">{activeBooking.project_name} — {activeBooking.unit_code}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Status Akad Kredit:</span>
                  <strong className="text-emerald-700">Lunas / Akad Notaris Selesai</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Kelengkapan Diserahkan:</span>
                  <span className="text-slate-800 font-semibold">1 Set Kunci Utama + 1 Kunci Pagar + Buku Panduan Rumah</span>
                </div>
              </div>
            </div>
          )}

          {/* DOKUMEN 4: SURAT PERNYATAAN SUBSIDI FLPP */}
          {selectedDocType === 'flpp_statement' && (
            <div className="space-y-4">
              <div className="text-center space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide underline">
                  SURAT PERNYATAAN PEMOHON KPR BERSUBSIDI FLPP
                </h3>
                <p className="font-mono text-slate-500 text-[11px]">Format Baku: Peraturan Menteri PUPR No. 35/PRT/M/2021</p>
              </div>

              <p className="leading-relaxed text-slate-700">
                Yang bertanda tangan di bawah ini saya:
              </p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500">Nama Pemohon</span>
                  <span className="col-span-2 font-bold text-slate-900">: {activeBooking.customer_name}</span>
                  <span className="text-slate-500">Nomor Telepon</span>
                  <span className="col-span-2 font-mono text-slate-900">: {activeBooking.customer_phone}</span>
                  <span className="text-slate-500">Unit Dimohonkan</span>
                  <span className="col-span-2 font-semibold text-blue-700">: {activeBooking.unit_code} ({activeBooking.project_name})</span>
                </div>
              </div>

              <p className="leading-relaxed text-[11px] text-slate-600">
                Dengan ini menyatakan dengan sebenar-benarnya di bawah sumpah bahwa:
                <br />1. Saya dan pasangan belum pernah memiliki rumah tinggal milik sendiri sebelumnya.
                <br />2. Saya dan pasangan belum pernah menerima bantuan atau subsidi perumahan dari Pemerintah dalam bentuk apa pun.
                <br />3. Rumah yang dibeli dengan KPR Bersubsidi ini akan dihuni sendiri sebagai tempat tinggal utama dan tidak akan disewakan atau dialihkan kepada pihak lain dalam jangka waktu 5 (lima) tahun.
              </p>
            </div>
          )}

          {/* Legal Stamp Duty (Materai) & Formal Signatures Block */}
          <div className="pt-6 border-t-2 border-slate-900 mt-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 text-center">
            
            {/* Pihak Pertama (Developer) */}
            <div className="space-y-4 w-52">
              <p className="text-slate-500 text-[11px]">PIHAK PERTAMA (Pengembang),</p>
              
              {hasDigitalSign ? (
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-[10px] space-y-1">
                  <div className="flex items-center justify-center gap-1 text-blue-700 font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>DIGITALLY SIGNED</span>
                  </div>
                  <p className="font-semibold text-slate-800">MUHAMMAD RIZAL</p>
                  <p className="text-[9px] font-mono text-slate-500">Cert: SHA256:7a9f...e104</p>
                </div>
              ) : (
                <div className="h-14" />
              )}

              <div>
                <strong className="block text-slate-900 underline font-bold">MUHAMMAD RIZAL</strong>
                <span className="text-[10px] text-slate-400">Direktur Utama PT Garut Sejahtera</span>
              </div>
            </div>

            {/* Materai Block */}
            {hasEMeterai ? (
              <div className="w-36 p-2 rounded-xl bg-gradient-to-br from-rose-900 via-rose-800 to-red-950 text-white border-2 border-amber-400/80 shadow-md text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] font-extrabold tracking-wider text-amber-300 font-mono">e-METERAI</span>
                </div>
                <div className="w-10 h-10 mx-auto bg-white rounded p-0.5 flex items-center justify-center">
                  <QrCode className="w-9 h-9 text-slate-900" />
                </div>
                <p className="text-[10px] font-bold text-amber-200">Rp 10.000</p>
                <p className="text-[7px] font-mono text-rose-200 tracking-tighter truncate">
                  MET-2026-PERURI-{activeBooking.booking_code.replace(/\D/g, '') || '892'}
                </p>
              </div>
            ) : (
              <div className="w-24 h-16 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 text-[9px] font-mono">
                <span>MATERAI</span>
                <span>TEMPEL</span>
                <span>Rp 10.000</span>
              </div>
            )}

            {/* Pihak Kedua (Konsumen) */}
            <div className="space-y-4 w-52">
              <p className="text-slate-500 text-[11px]">PIHAK KEDUA (Pemesan / Pembeli),</p>
              
              {hasDigitalSign ? (
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[10px] space-y-1">
                  <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>DIGITALLY SIGNED</span>
                  </div>
                  <p className="font-semibold text-slate-800">{activeBooking.customer_name}</p>
                  <p className="text-[9px] font-mono text-slate-500">NIK: {activeBooking.customer_phone.replace(/\D/g, '').padEnd(16, '0')}</p>
                </div>
              ) : (
                <div className="h-14" />
              )}

              <div>
                <strong className="block text-slate-900 underline font-bold">{activeBooking.customer_name}</strong>
                <span className="text-[10px] text-slate-400 font-mono">{activeBooking.customer_phone}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
