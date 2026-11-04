'use client';
import React, { useState, useEffect } from 'react';
import { DEMO_KPI, DEMO_LEADS, DEMO_PROJECTS, DEMO_BOOKINGS } from '@/lib/demo-data';
import { 
  Users, 
  UserCheck2, 
  TrendingUp, 
  DollarSign, 
  CalendarClock, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Building2, 
  FileText,
  Percent,
  Check,
  ChevronRight,
  Sparkles,
  Calculator,
  ShieldCheck,
  HardHat,
  Receipt,
  Hammer,
  Map,
  Camera,
  Navigation,
  Target,
  Flame,
  Zap,
  BedDouble,
  Bath,
  Maximize2,
  Play
} from 'lucide-react';
import Link from 'next/link';
import { buildWhatsAppLink, WhatsAppTemplates, formatPhoneDisplay } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';
import InteractiveTourModal from '@/components/dashboard/InteractiveTourModal';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

export default function DashboardPage() {
  const { showToast } = useToast();
  const [leadsList, setLeadsList] = useState(DEMO_LEADS);
  const [isMounted, setIsMounted] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleQuickComplete = (leadId: string, leadName: string) => {
    setLeadsList(prev => prev.filter(l => l.id !== leadId));
    showToast(`Follow-up untuk ${leadName} telah ditandai selesai.`, 'success');
  };

  const salesPerformanceData = [
    { bulan: 'Mei', target: 800, realisasi: 650 },
    { bulan: 'Jun', target: 900, realisasi: 850 },
    { bulan: 'Jul', target: 900, realisasi: 720 },
    { bulan: 'Agt', target: 1000, realisasi: 950 },
    { bulan: 'Sep', target: 1100, realisasi: 1050 },
    { bulan: 'Okt', target: 1200, realisasi: 1150 },
  ];

  const recentActivities = [
    {
      id: 'a1',
      title: 'Akad Kredit Selesai',
      desc: 'Bapak Hendra Lesmana menyelesaikan akad unit Blok A-01 (Bumi Cimanuk Asri)',
      time: '2 jam lalu',
      type: 'closing',
      badge: 'Rp 166 Jt',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'a2',
      title: 'Booking Unit Baru Terverifikasi',
      desc: 'Ibu Siti Patonah mengunci kavling Blok A-07 (Bumi Cimanuk Asri)',
      time: 'Hari ini, 11:00',
      type: 'booking',
      badge: 'Booking Fee Rp 1,5 Jt',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'a3',
      title: 'Jadwal Survei Lokasi Masuk',
      desc: 'Bapak Hasanudin menjadwalkan survei show unit Tipe 36/60 bersama PIC Dika',
      time: 'Hari ini, 09:30',
      type: 'survey',
      badge: 'Terjadwal',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'a4',
      title: 'Negosiasi Kavling Hook',
      desc: 'Om Azhar Pratama meminta proposal skema cicilan Tipe 54/84 Banyuresmi Hillside',
      time: 'Kemarin, 15:30',
      type: 'lead',
      badge: 'Prospek Hot',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Executive Hero Banner: Rich Deep Midnight Navy with High-End Telemetry */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#080C1A] via-[#0F172A] to-[#1E293B] p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-48 -bottom-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                HOMIQ PROPTECH OS &bull; PT GARUT SEJAHTERA PROPERTINDO
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Direktur Utama: MUHAMMAD RIZAL
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Executive Command & Smart Property CRM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitoring serapan kavling real estate, otomasi follow-up WhatsApp calon pembeli, simulasi KPR perbankan, dan akselerasi omzet closing pengembang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsTourOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-200 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 transition flex items-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-current" />
              <span>Simulasi Alur Bisnis</span>
            </button>

            <Link
              href="/ai-copilot"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>HOMIQ AI Co-Pilot</span>
            </Link>

            <Link
              href="/siteplan"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-200 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 transition flex items-center gap-2"
            >
              <Map className="w-4 h-4 text-indigo-400" />
              <span>Siteplan 2D</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modern PropTech Quick Launchpad Bar */}
      <div className="crm-card p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-semibold">
          <Link
            href="/ai-copilot"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-800 text-[11px] truncate">AI Assistant</span>
              <span className="text-[10px] text-slate-500 truncate block">Closing Scripts</span>
            </div>
          </Link>

          <Link
            href="/siteplan"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-200/80 hover:border-indigo-300 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Map className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-800 text-[11px] truncate">Siteplan 2D</span>
              <span className="text-[10px] text-slate-500 truncate block">Pilih Kavling</span>
            </div>
          </Link>

          <Link
            href="/gallery"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/80 border border-slate-200/80 hover:border-purple-300 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Camera className="w-4 h-4 text-purple-600" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-800 text-[11px] truncate">Galeri 4K</span>
              <span className="text-[10px] text-slate-500 truncate block">Show Unit</span>
            </div>
          </Link>

          <Link
            href="/lead-scoring"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/80 border border-slate-200/80 hover:border-amber-300 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Target className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-800 text-[11px] truncate">Lead Scoring</span>
              <span className="text-[10px] text-slate-500 truncate block">Peluang Closing</span>
            </div>
          </Link>

          <Link
            href="/kpr-calculator"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/80 hover:border-emerald-300 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Calculator className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-800 text-[11px] truncate">Kalkulator KPR</span>
              <span className="text-[10px] text-slate-500 truncate block">Simulasi Bank BTN</span>
            </div>
          </Link>

          <Link
            href="/map-explorer"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50/80 border border-slate-200/80 hover:border-rose-300 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Navigation className="w-4 h-4 text-rose-600" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-800 text-[11px] truncate">Peta Garut</span>
              <span className="text-[10px] text-slate-500 truncate block">Akses & Tol</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards: Enhanced Depth & Color Personality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Leads Terdata</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono tracking-tight">
            {DEMO_KPI.total_leads} Prospek
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              +22.4%
            </span>
            <span className="text-slate-500 text-[11px]">termasuk 5 kontak baru</span>
          </div>
        </div>

        {/* Metric 2: Active Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition relative overflow-hidden border-t-4 border-t-indigo-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Konsumen Booked & Akad</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <UserCheck2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono tracking-tight">
            {DEMO_KPI.total_customers} Pelanggan
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
              <ShieldCheck className="w-3 h-3 text-indigo-600" />
              8 Booking Aktif
            </span>
            <span className="text-slate-500 text-[11px]">dana escrow aman</span>
          </div>
        </div>

        {/* Metric 3: Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Rasio Konversi Closing</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono tracking-tight">
            26.8%
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <TrendingUp className="w-3 h-3 text-amber-600" />
              +4.2%
            </span>
            <span className="text-slate-500 text-[11px]">performa kuartal ini</span>
          </div>
        </div>

        {/* Metric 4: Total Sales */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-5 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Akumulasi Omzet Closing</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono tracking-tight">
            Rp 677 Jt
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
            <span className="text-emerald-300 font-semibold">3 Unit Lunas / Akad</span>
            <span className="font-mono text-slate-400">+ Rp 14 Jt Booking Fee</span>
          </div>
        </div>

      </div>

      {/* Featured Visual Property Showcase Strip */}
      <div className="crm-card p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Proyek Unggulan & Persediaan Kavling
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">3 Kawasan perumahan aktif di Kabupaten Garut</p>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Lihat Galeri 4K
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Bumi Cimanuk Asri */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition group bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Bumi Cimanuk Asri"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white font-mono font-bold text-[10px]">
                  Subsidi FLPP
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-[10px]">
                  19 Sedia / 20 Unit
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">Bumi Cimanuk Asri</h3>
                <p className="text-xs text-slate-500">Tarogong Kidul, Garut</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-black text-sm text-blue-700 font-mono">Rp 166 Juta</span>
                  <span className="text-[11px] text-slate-500 font-medium">Cicilan 1 Jt-an</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/siteplan"
                className="w-full py-2 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition block text-center shadow-xs"
              >
                Pilih Kavling di Siteplan
              </Link>
            </div>
          </div>

          {/* Card 2: Grand Karangpawitan Residence */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition group bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                  alt="Grand Karangpawitan"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/90 text-white font-mono font-bold text-[10px]">
                  Komersial Asri
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-[10px]">
                  21 Sedia / 25 Unit
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">Grand Karangpawitan</h3>
                <p className="text-xs text-slate-500">Karangpawitan, Garut</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-black text-sm text-blue-700 font-mono">Rp 345 Juta</span>
                  <span className="text-[11px] text-slate-500 font-medium">DP 10% Bertahap</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/siteplan"
                className="w-full py-2 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition block text-center shadow-xs"
              >
                Pilih Kavling di Siteplan
              </Link>
            </div>
          </div>

          {/* Card 3: Banyuresmi Hillside */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition group bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                  alt="Banyuresmi Hillside"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-600/90 text-white font-mono font-bold text-[10px]">
                  Villa Mountain View
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-[10px]">
                  19 Sedia / 20 Unit
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">Banyuresmi Hillside</h3>
                <p className="text-xs text-slate-500">Situ Bagendit, Garut</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-black text-sm text-blue-700 font-mono">Rp 485 Juta</span>
                  <span className="text-[11px] text-slate-500 font-medium">Dekat Danau</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/siteplan"
                className="w-full py-2 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition block text-center shadow-xs"
              >
                Pilih Kavling di Siteplan
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Section: Chart & Follow-up Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 Cols): Grafik Performa Penjualan */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                Grafik Performa Penjualan Properti
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Komparasi target omzet vs realisasi closing per bulan (Juta Rupiah)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block"></span> Target
              </span>
              <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block"></span> Realisasi
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip 
                    formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString('id-ID')} Juta`, '']}
                    contentStyle={{ backgroundColor: '#0A0F1D', color: '#fff', borderRadius: '12px', fontSize: '11px', border: '1px solid #1E293B', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="target" name="Target" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="realisasi" name="Realisasi" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Memuat visualisasi data...
              </div>
            )}
          </div>
        </div>

        {/* Right (1 Col): Follow-up Hari Ini featuring the 5 new leads */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <CalendarClock className="w-4 h-4 text-amber-600" />
                  Follow-up Prioritas Hari Ini
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Antrean kontak calon pembeli prioritas</p>
              </div>
              <span className="text-[11px] font-bold font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                8 Jadwal
              </span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {leadsList.slice(0, 5).map(lead => {
                const waLink = buildWhatsAppLink(
                  lead.phone,
                  WhatsAppTemplates.followUp(lead.full_name, lead.project_name, lead.assigned_to_name)
                );

                return (
                  <div key={lead.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-2 hover:bg-white hover:border-blue-300 transition shadow-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{lead.full_name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{lead.project_name} &bull; <strong className="text-slate-700">Rp {(lead.budget / 1000000).toFixed(0)} Jt</strong></p>
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                        {lead.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-200/60">
                      <span className="text-slate-500 text-[10px] font-mono">{formatPhoneDisplay(lead.phone)}</span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs shadow-emerald-600/20"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Chat WA</span>
                        </a>
                        <button
                          onClick={() => handleQuickComplete(lead.id, lead.full_name)}
                          className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold transition"
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/follow-ups"
            className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold rounded-xl border border-slate-200 text-center block transition mt-2"
          >
            Buka Antrean Follow-up Lengkap →
          </Link>
        </div>

      </div>

      {/* Lower Section: Aktivitas Transaksi & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 Cols): Aktivitas Terbaru Timeline */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Aktivitas Transaksi & Sales Terbaru
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Pencatatan real-time interaksi sales, booking fee kavling, dan jadwal survei</p>
          </div>

          <div className="space-y-2.5">
            {recentActivities.map(act => (
              <div key={act.id} className="p-3 bg-slate-50/70 hover:bg-white hover:border-slate-300 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{act.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">&bull; {act.time}</span>
                  </div>
                  <p className="text-xs text-slate-600">{act.desc}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border self-start sm:self-auto shrink-0 ${act.badgeColor}`}>
                  {act.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right (1 Col): Serapan Proyek */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              Serapan Kavling Proyek
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Status persediaan unit perumahan aktif</p>
          </div>

          <div className="space-y-3">
            {DEMO_PROJECTS.map(proj => {
              const soldOrBooked = proj.total_units - proj.available_units;
              const pct = Math.round((soldOrBooked / proj.total_units) * 100);

              return (
                <div key={proj.id} className="space-y-1.5 p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/70">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{proj.name}</p>
                      <p className="text-[11px] text-slate-500">{proj.city}</p>
                    </div>
                    <span className="text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md text-[11px]">
                      {proj.available_units} Sedia
                    </span>
                  </div>

                  <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden mt-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>{soldOrBooked} Terjual / Booked</span>
                    <span className="font-bold font-mono text-slate-700">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/siteplan"
            className="w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold rounded-xl border border-slate-200 text-center block transition"
          >
            Buka Peta Denah Siteplan 2D →
          </Link>
        </div>

      </div>

      {/* 6-Stage Interactive Business Simulation Modal */}
      <InteractiveTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

    </div>
  );
}
