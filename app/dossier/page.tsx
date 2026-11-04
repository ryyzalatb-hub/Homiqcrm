'use client';
import React, { useState } from 'react';
import { 
  Building2, 
  Printer, 
  Download, 
  Share2, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Map, 
  Sparkles,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function ExecutiveDossierPage() {
  const { showToast } = useToast();
  const [selectedCluster, setSelectedCluster] = useState('all');

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*EXECUTIVE DOSSIER — PT GARUT SEJAHTERA PROPERTINDO*\n` +
      `Direktur Utama: MUHAMMAD RIZAL\n\n` +
      `Ringkasan Portofolio Q4 2026:\n` +
      `• Gross Development Value (GDV): Rp 48,5 Miliar\n` +
      `• Tingkat Serapan Unit: 72,4% (Sold & Booked)\n` +
      `• Proyeksi Net IRR: 28,4%\n` +
      `• Bank Rekanan KPR: Bank BTN, BSI, Bank Mandiri\n\n` +
      `Akses Dossier Digital Lengkap:\nhttps://homiq-smart-property-crm.vercel.app/dossier`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Top Action Header */}
      <div className="p-6 rounded-3xl bg-[#0B1120] border border-amber-500/25 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              EXECUTIVE BOARD DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PT GARUT SEJAHTERA PROPERTINDO
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            Majalah Portofolio & Dossier Investor A4
          </h1>
          <p className="text-xs text-slate-300">
            Katalog presentasi komprehensif perkembangan proyek, valuasi serapan pasar, dan kepatuhan perbankan.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Cetak Majalah A4</span>
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Ringkasan WA</span>
          </button>
        </div>
      </div>

      {/* THE LUXURY DOSSIER A4 SHEET */}
      <div className="bg-white text-slate-950 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden print:border-none print:shadow-none print:rounded-none">
        
        {/* Cover Section: Architectural Luxury Editorial Header */}
        <div className="relative h-96 sm:h-[480px] bg-slate-950 overflow-hidden flex flex-col justify-end p-8 sm:p-12 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Top Gold Corporate Crest */}
          <div className="absolute top-8 left-8 sm:left-12 flex items-center justify-between right-8 sm:right-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black flex items-center justify-center text-sm shadow-lg shadow-amber-500/30">
                GSP
              </div>
              <div>
                <span className="font-extrabold tracking-widest text-white text-sm font-display block uppercase">
                  PT GARUT SEJAHTERA PROPERTINDO
                </span>
                <span className="text-[10px] text-amber-300 font-mono tracking-widest uppercase block">
                  PROPTECH REAL ESTATE PORTFOLIO
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-amber-300/30 backdrop-blur-md">
                EDISI Q4 2026
              </span>
            </div>
          </div>

          {/* Cover Titles */}
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40">
              LAPORAN DIREKSI &amp; DOSSIER INVESTOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              SCANDINAVIAN LUXURY &amp; KAWASAN MANDIRI GARUT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Analisis performa investasi, kepatuhan legalitas, serapan kavling komersial &amp; subsidi, dan roadmap pengembangan kawasan 2026–2027.
            </p>
            
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-amber-200">
              <span>DIREKTUR UTAMA: <strong>MUHAMMAD RIZAL</strong></span>
              <span>&bull;</span>
              <span>KONSORTIUM BANK: <strong>BTN &bull; BSI &bull; MANDIRI</strong></span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Financial Valuation Matrix */}
        <div className="p-8 sm:p-12 space-y-6">
          <div className="border-b-2 border-slate-950 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                BAGIAN I &bull; TELEMETRI FINANSIAL
              </span>
              <h3 className="text-xl font-black font-display text-slate-900 mt-0.5">
                Valuasi Portofolio &amp; Kesehatan Likuiditas
              </h3>
            </div>
            <Award className="w-6 h-6 text-amber-600" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Gross Development Value', val: 'Rp 48,5 Miliar', sub: 'Total 102 Unit Kavling', color: 'border-l-4 border-amber-500' },
              { label: 'Tingkat Serapan Unit', val: '72,4%', sub: '74 Unit Terkunci / Akad', color: 'border-l-4 border-emerald-500' },
              { label: 'Proyeksi Net IRR', val: '28,4%', sub: 'Imbal Hasil Investasi', color: 'border-l-4 border-blue-500' },
              { label: 'Total Booking Fee Masuk', val: 'Rp 365 Juta', sub: 'Via Instant QRIS & VA', color: 'border-l-4 border-purple-500' },
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-xl bg-slate-50 border border-slate-200 ${stat.color}`}>
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">{stat.label}</span>
                <span className="text-lg font-black text-slate-900 font-display block mt-1">{stat.val}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Portfolio Cluster Breakdown */}
        <div className="px-8 sm:px-12 pb-8 space-y-6">
          <div className="border-b-2 border-slate-950 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
              BAGIAN II &bull; TIGA KAWASAN STRATEGIS
            </span>
            <h3 className="text-xl font-black font-display text-slate-900 mt-0.5">
              Portofolio Proyek Aktif di Garut
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Bumi Cimanuk Asri',
                location: 'Tarogong Kidul, Garut',
                type: 'Tipe 36/60 & Tipe 45/72',
                units: '50 Unit (Tersisa 11)',
                price: 'Rp 166 Jt – Rp 245 Jt',
                tag: 'Subsidi & Komersial Ring 1',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
              },
              {
                name: 'Grand Karangpawitan',
                location: 'Jl. Raya Karangpawitan',
                type: 'Tipe 45/72 Scandinavian',
                units: '32 Unit (Tersisa 9)',
                price: 'Rp 285 Jt – Rp 385 Jt',
                tag: 'Modern Scandinavian Villa',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
              },
              {
                name: 'Banyuresmi Hillside',
                location: 'Kec. Banyuresmi, Garut',
                type: 'Tipe 54/84 Resort Villa',
                units: '20 Unit (Tersisa 8)',
                price: 'Rp 345 Jt – Rp 450 Jt',
                tag: 'View Gunung Guntur & Resort',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
              }
            ].map((p, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                <div 
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                      {p.tag}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 font-display">{p.name}</h4>
                    <p className="text-xs text-slate-500">{p.location}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Unit:</span>
                      <span className="font-bold text-slate-800">{p.units}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rentang Harga:</span>
                      <span className="font-bold text-amber-700 font-mono">{p.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Legal Compliance & Bank Clearances */}
        <div className="px-8 sm:px-12 pb-12 space-y-6">
          <div className="border-b-2 border-slate-950 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
              BAGIAN III &bull; LEGALITAS &amp; KEMITRAAN PERBANKAN
            </span>
            <h3 className="text-xl font-black font-display text-slate-900 mt-0.5">
              Kepatuhan Hukum &amp; Garansi Sertifikasi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Legalitas Lahan &amp; Perizinan (100% Clear)</span>
              </div>
              <ul className="space-y-1 text-slate-600 pl-6 list-disc text-[11px]">
                <li>Sertifikat Hak Guna Bangunan (SHGB) Induk telah terbit &amp; split per kavling.</li>
                <li>Persetujuan Bangunan Gedung (PBG) &amp; Sertifikat Laik Fungsi (SLF) lengkap.</li>
                <li>Izin Pemanfaatan Ruang (IPR) sesuai Tata Ruang RTRW Kabupaten Garut.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Perjanjian Kerjasama (PKS) Perbankan</span>
              </div>
              <ul className="space-y-1 text-slate-600 pl-6 list-disc text-[11px]">
                <li><strong>Bank BTN:</strong> Fasilitas KPR Subsidi FLPP &amp; Komersial Platinum.</li>
                <li><strong>Bank BSI:</strong> Pembiayaan Syariah Hasanah Murabahah.</li>
                <li><strong>Bank Mandiri:</strong> KPR Mandiri Millennial &amp; Payroll Partnership.</li>
              </ul>
            </div>
          </div>

          {/* Dossier Sign-Off Authorization */}
          <div className="pt-6 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
            <div>
              <span className="font-bold text-slate-900 block font-display">
                PT GARUT SEJAHTERA PROPERTINDO
              </span>
              <p className="text-[11px] text-slate-500">
                Dokumen resmi presentasi Rapat Umum Pemegang Saham (RUPS) &amp; Komite Kredit Perbankan.
              </p>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[10px] text-slate-500 font-mono block">Disahkan Oleh:</span>
              <strong className="text-sm font-black text-slate-900 font-display block underline mt-1">
                MUHAMMAD RIZAL
              </strong>
              <span className="text-[10px] font-mono text-amber-700 font-bold block">
                Direktur Utama &bull; Chief Executive Officer
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
