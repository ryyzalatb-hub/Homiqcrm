'use client';
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building, 
  Calendar, 
  Download, 
  Sparkles, 
  Filter,
  Award,
  ArrowUpRight,
  Printer,
  X,
  FileText,
  CheckCircle2,
  Send,
  Copy
} from 'lucide-react';
import { DEMO_KPI, DEMO_PROJECTS } from '@/lib/demo-data';
import { useToast } from '@/components/ui/Toast';

const monthlyPerformanceData = [
  { month: 'Jul 26', target: 500, realisasi: 420 },
  { month: 'Agu 26', target: 500, realisasi: 510 },
  { month: 'Sep 26', target: 600, realisasi: 580 },
  { month: 'Okt 26', target: 650, realisasi: 677 },
  { month: 'Nov 26', target: 700, realisasi: 380 }, // Current month in progress
];

const pipelineStageData = [
  { stage: 'New Lead', prospek: 8, potensi: 1328 },
  { stage: 'Contacted', prospek: 12, potensi: 1992 },
  { stage: 'Interested', prospek: 9, potensi: 2430 },
  { stage: 'Site Visit', prospek: 6, potensi: 1496 },
  { stage: 'Negotiation', prospek: 4, potensi: 1380 },
  { stage: 'Booking', prospek: 7, potensi: 2155 },
  { stage: 'Closing', prospek: 3, potensi: 677 },
];

const leadSourceData = [
  { name: 'Meta Ads', value: 38, color: '#2563EB' },
  { name: 'Instagram Ads', value: 26, color: '#38BDF8' },
  { name: 'TikTok Ads', value: 16, color: '#F43F5E' },
  { name: 'Walk-In Kantor', value: 12, color: '#10B981' },
  { name: 'Pameran & Brosur', value: 8, color: '#F59E0B' },
];

const projectAbsorptionData = DEMO_PROJECTS.map(p => ({
  name: p.name.replace(' Residence', '').replace(' Hillside', ''),
  terjual: p.total_units - p.available_units,
  sedia: p.available_units,
  total: p.total_units,
}));

export default function AnalyticsPage() {
  const { showToast } = useToast();
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [isMounted, setIsMounted] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleExport = () => {
    setIsExportModalOpen(true);
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
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Recharts Live Analytics &bull; Enterprise BI
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Real-time Data Sinkron
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Laporan &amp; Analitik Penjualan Properti
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Visualisasi komprehensif performa saluran iklan digital, serapan unit kavling perumahan, dan rasio konversi pipeline sales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl text-xs font-semibold text-slate-300 border border-slate-700">
              <button
                onClick={() => setPeriod('month')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  period === 'month' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'hover:text-white'
                }`}
              >
                Bulan Ini
              </button>
              <button
                onClick={() => setPeriod('quarter')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  period === 'quarter' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'hover:text-white'
                }`}
              >
                Kuartal 4
              </button>
              <button
                onClick={() => setPeriod('year')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  period === 'year' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'hover:text-white'
                }`}
              >
                Tahun 2026
              </button>
            </div>

            <button
              onClick={handleExport}
              className="px-3.5 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Ekspor Laporan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Highlights with Top Accent Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Omzet Closing</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-2xl font-extrabold text-emerald-600 font-mono tracking-tight">
              Rp {(DEMO_KPI.total_closing_value / 1000000).toLocaleString('id-ID')} <span className="text-sm font-semibold text-emerald-800">Jt</span>
            </p>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">3 Unit Rumah Telah Akad Kredit</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Potensi Pipeline Aktif</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-2xl font-extrabold text-blue-700 font-mono tracking-tight">Rp 9.45 M</p>
            <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              45 Leads
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Estimasi gross development value</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-indigo-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tingkat Konversi Lead</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">6.7%</p>
            <span className="text-xs text-emerald-600 font-semibold">+1.8% vs Q3</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Rata-rata industri properti: 4.5%</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Top Performer Bulan Ini</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <p className="text-sm font-bold text-slate-900">Kang Dika Pratama</p>
              <p className="text-[11px] text-emerald-600 font-semibold font-mono">2 Closing (Rp 332 Jt)</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target bulanan: 106% tercapai</p>
        </div>

      </div>

      {/* Row 1 Charts: Monthly Realization BarChart + Pipeline Omzet AreaChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Target vs Realization */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Target vs Realisasi Penjualan Bulanan</h3>
              <p className="text-xs text-slate-500 mt-0.5">Satuan nominal dalam Juta Rupiah (Rp Jt)</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Semester 2 2026
            </span>
          </div>

          <div className="h-72 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip 
                    formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString('id-ID')} Juta`, '']} 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="target" name="Target Omzet" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="realisasi" name="Realisasi Closing" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">Memuat grafik...</div>
            )}
          </div>
        </div>

        {/* Pipeline Progression AreaChart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Distribusi Nilai Potensi Pipeline</h3>
              <p className="text-xs text-slate-500 mt-0.5">Potensi omzet per tahapan penjualan (Juta Rp)</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              7 Tahapan
            </span>
          </div>

          <div className="h-72 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pipelineStageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPotensi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip 
                    formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString('id-ID')} Juta`, 'Nilai Potensi']} 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="potensi" 
                    stroke="#2563EB" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorPotensi)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">Memuat grafik...</div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Lead Source PieChart + Unit Absorption BarChart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Source PieChart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Sumber Akuisisi Prospek</h3>
          <p className="text-xs text-slate-500 mt-0.5">Saluran marketing paling efektif</p>

          <div className="h-56 w-full mt-3">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`${val}%`, 'Kontribusi']}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">Memuat...</div>
            )}
          </div>

          <div className="space-y-1.5 mt-2 text-xs">
            {leadSourceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Unit Absorption BarChart */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Serapan Unit Kavling per Proyek</h3>
                <p className="text-xs text-slate-500 mt-0.5">Komparasi unit terjual/booked vs sisa unit siap dipasarkan</p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                Total 75 Kavling
              </span>
            </div>

            <div className="h-64 w-full">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectAbsorptionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                    <Tooltip 
                      formatter={(val: any) => [`${val} Unit`, '']} 
                      contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '11px', border: 'none' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="terjual" name="Terjual / Booked" fill="#10B981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="sedia" name="Unit Kosong (Tersedia)" fill="#64748B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">Memuat grafik...</div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Perlindungan transaksi: Anti Double-Booking PostgreSQL aktif</span>
            <span className="font-semibold text-blue-600">Garut Sejahtera Property CRM</span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE PERFORMANCE REPORT MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full my-8 overflow-hidden animate-in zoom-in-95">
            
            {/* Modal Control Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Laporan Eksekutif Kinerja Penjualan</h3>
                  <p className="text-[11px] text-slate-500">Executive Brief &bull; Siap Cetak A4 / PDF untuk Direksi</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = `*EXECUTIVE BUSINESS SUMMARY — HOMIQ CRM*\nPT Garut Sejahtera Propertindo\nPeriode: November 2026\n\n📊 *METRIK UTAMA:*\n• Total Omzet Closing: Rp 1,15 Miliar\n• Tingkat Konversi Lead: 24.2%\n• Serapan Unit Kavling: 56 dari 75 Unit (74.7% Terjual)\n• Akumulasi Booking Fee: Rp 7,0 Juta\n\n🎯 *TOP MARKETING PERFORMER:*\n1. Kang Dika Pratama (2 Unit - Rp 511 Jt / 85% Target)\n2. Teh Nisa Andriani (1 Unit - Rp 345 Jt / 69% Target)\n\n🚀 *EFEKTIVITAS SALURAN IKLAN:*\n• Meta Ads (IG/FB): 38 Leads, 4 Closing (Omzet Rp 664 Jt)\n• TikTok Lead Gen: 16 Leads, 2 Closing (Omzet Rp 332 Jt)\n• Walk-in / Pameran: 20 Leads, 1 Closing (Omzet Rp 166 Jt)`;
                    navigator.clipboard.writeText(text);
                    showToast('Ringkasan eksekutif berhasil disalin ke clipboard!', 'success');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Teks</span>
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body (Printable Paper Style) */}
            <div className="p-6 sm:p-8 space-y-5 text-slate-800 text-xs max-h-[70vh] overflow-y-auto">
              
              {/* Company Header (Kop Surat) */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    GS
                  </div>
                  <h2 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
                    PT Garut Sejahtera Propertindo
                  </h2>
                </div>
                <p className="text-[10px] text-slate-600 font-medium">
                  LAPORAN EKSEKUTIF KINERJA PEMASARAN &amp; PENYERAPAN KAVLING
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Periode Analitik: Bulan November 2026 &bull; Tanggal Rilis: 04 November 2026
                </p>
              </div>

              {/* 4 Executive KPI Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 font-mono block">Total Omzet Closing</span>
                  <strong className="text-sm font-extrabold text-blue-600 font-mono">Rp 1,15 M</strong>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 font-mono block">Tingkat Konversi</span>
                  <strong className="text-sm font-extrabold text-emerald-600 font-mono">24.2%</strong>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 font-mono block">Serapan Kavling</span>
                  <strong className="text-sm font-extrabold text-slate-900 font-mono">74.7% (56 Unit)</strong>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 font-mono block">Tanda Jadi Masuk</span>
                  <strong className="text-sm font-extrabold text-amber-600 font-mono">Rp 7,0 Jt</strong>
                </div>
              </div>

              {/* Marketing Channel Effectiveness Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900">
                  Efektivitas Saluran Pemasaran &amp; ROI Iklan:
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Channel Iklan</th>
                        <th className="p-2.5">Jumlah Leads</th>
                        <th className="p-2.5">Unit Closing</th>
                        <th className="p-2.5">Biaya Iklan (CAC)</th>
                        <th className="p-2.5 text-right">Omzet Masuk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">Instagram / Meta Ads</td>
                        <td className="p-2.5">38 Leads (45%)</td>
                        <td className="p-2.5 font-bold text-emerald-600">4 Unit</td>
                        <td className="p-2.5">Rp 84.000 / lead</td>
                        <td className="p-2.5 text-right font-bold text-blue-700">Rp 664.000.000</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">TikTok Lead Gen</td>
                        <td className="p-2.5">16 Leads (19%)</td>
                        <td className="p-2.5 font-bold text-emerald-600">2 Unit</td>
                        <td className="p-2.5">Rp 93.000 / lead</td>
                        <td className="p-2.5 text-right font-bold text-blue-700">Rp 332.000.000</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">Walk-In &amp; Pameran</td>
                        <td className="p-2.5">20 Leads (24%)</td>
                        <td className="p-2.5 font-bold text-emerald-600">1 Unit</td>
                        <td className="p-2.5">Rp 150.000 / lead</td>
                        <td className="p-2.5 text-right font-bold text-blue-700">Rp 166.000.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Project Absorption Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900">
                  Ringkasan Serapan Unit Kavling Perumahan:
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Nama Proyek Perumahan</th>
                        <th className="p-2.5">Total Unit</th>
                        <th className="p-2.5">Terjual / Booked</th>
                        <th className="p-2.5">Sisa Unit</th>
                        <th className="p-2.5 text-right">Persentase Serapan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">Bumi Cimanuk Indah (Subsidi)</td>
                        <td className="p-2.5">30 Unit</td>
                        <td className="p-2.5 font-bold text-emerald-600">26 Unit</td>
                        <td className="p-2.5">4 Unit</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">86.7%</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">Grand Karangpawitan (Komersial)</td>
                        <td className="p-2.5">25 Unit</td>
                        <td className="p-2.5 font-bold text-emerald-600">18 Unit</td>
                        <td className="p-2.5">7 Unit</td>
                        <td className="p-2.5 text-right font-bold text-blue-700">72.0%</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">Tarogong Regency (Premium)</td>
                        <td className="p-2.5">20 Unit</td>
                        <td className="p-2.5 font-bold text-emerald-600">12 Unit</td>
                        <td className="p-2.5">8 Unit</td>
                        <td className="p-2.5 text-right font-bold text-blue-700">60.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Strategic Insights */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                <h5 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Rekomendasi Bisnis &amp; Strategi Bulan Depan:
                </h5>
                <p>&bull; <strong>Bumi Cimanuk Indah:</strong> Segera percepat akad kredit untuk 4 unit tersisa agar serapan kavling mencapai 100% sebelum tutup tahun buku 2026.</p>
                <p>&bull; <strong>Grand Karangpawitan:</strong> Kampanye iklan Instagram terbukti paling efektif (ROI 207x), disarankan menambah anggaran promosi Meta Ads sebesar 15% pada minggu ke-2.</p>
                <p>&bull; <strong>Pemberkasan KPR:</strong> Manfaatkan <em>Portal Berkas KPR Konsumen</em> untuk mempercepat pengumpulan slip gaji &amp; rekening koran pembeli yang masih tertahan.</p>
              </div>

              {/* Signatures */}
              <div className="pt-4 flex justify-between items-end text-center">
                <div className="space-y-12">
                  <p className="text-slate-500">Disiapkan Oleh,</p>
                  <div>
                    <strong className="block text-slate-900 underline font-bold">Tim Analitik &amp; Pemasaran</strong>
                    <span className="text-[10px] text-slate-400">HOMIQ Property CRM</span>
                  </div>
                </div>

                <div className="space-y-12">
                  <p className="text-slate-500">Mengetahui &amp; Menyetujui,</p>
                  <div>
                    <strong className="block text-slate-900 underline font-bold">MUHAMMAD RIZAL</strong>
                    <span className="text-[10px] text-slate-400">Direktur Utama PT Garut Sejahtera Propertindo</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-[11px] text-slate-500 font-mono">
                Laporan Kinerja Q4/2026 &bull; Siap Dikirim ke Pemilik / Investor
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-200 rounded-xl transition"
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`*LAPORAN EKSEKUTIF KINERJA PENJUALAN PROPERTI*\nPT Garut Sejahtera Propertindo\n\nTotal Omzet: Rp 1,15 Miliar (Konversi 24.2%)\nUnit Terjual: 56 dari 75 Unit (Serapan 74.7%)\n\nSilakan cek detail laporan lengkap melalui dashboard HOMIQ CRM: http://localhost:3001/analytics`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke WA Direksi</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
