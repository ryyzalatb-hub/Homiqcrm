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
  Building2, 
  FileText,
  Percent,
  Sparkles,
  Calculator,
  ShieldCheck,
  HardHat,
  Map,
  Camera,
  Navigation,
  Target,
  Play,
  PenTool,
  BookOpen,
  Zap,
  Lock,
  Compass
} from 'lucide-react';
import Link from 'next/link';
import { buildWhatsAppLink, WhatsAppTemplates, formatPhoneDisplay } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';
import InteractiveTourModal from '@/components/dashboard/InteractiveTourModal';
import VirtualTour360Modal from '@/components/proptech/VirtualTour360Modal';
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
  const [isVrTourOpen, setIsVrTourOpen] = useState(false);

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
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'a2',
      title: 'Booking Fee QRIS Terverifikasi',
      desc: 'Ibu Siti Patonah mengunci kavling Blok A-07 via Instant Gateway',
      time: 'Hari ini, 11:00',
      type: 'booking',
      badge: 'QRIS Rp 1,5 Jt',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'a3',
      title: 'Jadwal Survei Lokasi Masuk',
      desc: 'Bapak Hasanudin menjadwalkan survei show unit Tipe 36/60 bersama PIC Dika',
      time: 'Hari ini, 09:30',
      type: 'survey',
      badge: 'Terjadwal',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      id: 'a4',
      title: 'E-Signature SPK Diterbitkan',
      desc: 'Om Azhar Pratama menandatangani digital SPK kavling C-01 Banyuresmi Hillside',
      time: 'Kemarin, 15:30',
      type: 'lead',
      badge: 'SPK/GSP/2026/XI',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Executive Hero Banner: Ultra-Luxury Obsidian Slate & Champagne Gold */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1120] via-[#0D1426] to-[#151F38] p-6 sm:p-8 text-white shadow-2xl border border-amber-500/25">
        <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-48 -bottom-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                HOMIQ PROPTECH OS &bull; PT GARUT SEJAHTERA PROPERTINDO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Direktur Utama: MUHAMMAD RIZAL
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-display">
              Executive Command &amp; Smart Property CRM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitoring serapan kavling real estate, otomasi follow-up WhatsApp calon pembeli, simulasi KPR perbankan, dan akselerasi omzet closing pengembang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsVrTourOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:brightness-110 transition flex items-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <Compass className="w-4 h-4 text-slate-950 fill-current animate-spin" style={{ animationDuration: '8s' }} />
              <span>360° Walkthrough VR</span>
            </button>

            <button
              onClick={() => setIsTourOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-200 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 transition flex items-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-current" />
              <span>Simulasi Bisnis</span>
            </button>

            <Link
              href="/ai-copilot"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Co-Pilot</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modern PropTech 6-Pillar Quick Launchpad Bar */}
      <div className="p-3.5 bg-[#0B1120] rounded-2xl border border-amber-500/20 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-semibold">
          
          <Link
            href="/ai-copilot"
            className="p-2.5 rounded-xl bg-[#070B16] hover:bg-[#131C35] border border-[#1C2640] hover:border-amber-400/50 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white text-[11px] truncate">AI Assistant</span>
              <span className="text-[10px] text-amber-300/80 truncate block font-mono">Closing Engine</span>
            </div>
          </Link>

          <Link
            href="/siteplan"
            className="p-2.5 rounded-xl bg-[#070B16] hover:bg-[#131C35] border border-[#1C2640] hover:border-amber-400/50 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Map className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white text-[11px] truncate">Siteplan 2D</span>
              <span className="text-[10px] text-emerald-300/80 truncate block font-mono">Instant QRIS Lock</span>
            </div>
          </Link>

          <button
            onClick={() => setIsVrTourOpen(true)}
            className="p-2.5 rounded-xl bg-[#070B16] hover:bg-[#131C35] border border-[#1C2640] hover:border-amber-400/50 transition flex items-center gap-2.5 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Camera className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white text-[11px] truncate">Virtual 360°</span>
              <span className="text-[10px] text-purple-300/80 truncate block font-mono">Show Unit VR</span>
            </div>
          </button>

          <Link
            href="/spk-digital"
            className="p-2.5 rounded-xl bg-[#070B16] hover:bg-[#131C35] border border-[#1C2640] hover:border-amber-400/50 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <PenTool className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white text-[11px] truncate">SPK E-Signature</span>
              <span className="text-[10px] text-amber-300/80 truncate block font-mono">Legal Digital</span>
            </div>
          </Link>

          <Link
            href="/whatsapp-center"
            className="p-2.5 rounded-xl bg-[#070B16] hover:bg-[#131C35] border border-[#1C2640] hover:border-amber-400/50 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white text-[11px] truncate">WhatsApp Drip</span>
              <span className="text-[10px] text-emerald-300/80 truncate block font-mono">H+1 Automation</span>
            </div>
          </Link>

          <Link
            href="/dossier"
            className="p-2.5 rounded-xl bg-[#070B16] hover:bg-[#131C35] border border-[#1C2640] hover:border-amber-400/50 transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white text-[11px] truncate">Executive Dossier</span>
              <span className="text-[10px] text-amber-300/80 truncate block font-mono">Majalah A4</span>
            </div>
          </Link>

        </div>
      </div>

      {/* 4 Primary Metric Cards: Obsidian Slate with Champagne Gold Accent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Leads */}
        <div className="bg-[#0B1120] p-5 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span className="font-mono uppercase tracking-wider">Total Leads Terdata</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display tracking-tight group-hover:text-amber-300 transition">
            {DEMO_KPI.total_leads} <span className="text-sm font-sans font-normal text-slate-400">Prospek</span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              +22.4%
            </span>
            <span className="text-slate-400 text-[11px]">termasuk 5 kontak baru</span>
          </div>
        </div>

        {/* Metric 2: Active Customers */}
        <div className="bg-[#0B1120] p-5 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span className="font-mono uppercase tracking-wider">Konsumen Booked &amp; Akad</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold">
              <UserCheck2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display tracking-tight group-hover:text-amber-300 transition">
            {DEMO_KPI.total_customers} <span className="text-sm font-sans font-normal text-slate-400">Pelanggan</span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              8 Booking Aktif
            </span>
            <span className="text-slate-400 text-[11px]">dana escrow aman</span>
          </div>
        </div>

        {/* Metric 3: Conversion Rate */}
        <div className="bg-[#0B1120] p-5 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/40 transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span className="font-mono uppercase tracking-wider">Rasio Konversi Closing</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display tracking-tight group-hover:text-amber-300 transition">
            26.8%
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              +4.2%
            </span>
            <span className="text-slate-400 text-[11px]">kuartal ini</span>
          </div>
        </div>

        {/* Metric 4: Total Sales */}
        <div className="bg-gradient-to-br from-[#0B1120] via-[#0D1426] to-[#151F38] text-white p-5 rounded-2xl border border-amber-500/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span className="font-mono uppercase tracking-wider">Akumulasi Omzet Closing</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-300 mt-2 font-display tracking-tight">
            Rp 677 Jt
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300 font-mono">
            <span className="text-emerald-300 font-semibold">3 Unit Lunas / Akad</span>
            <span className="text-slate-400">+ Rp 14 Jt Booking</span>
          </div>
        </div>

      </div>

      {/* Featured Visual Property Showcase Strip */}
      <div className="p-6 bg-[#0B1120] rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#19243C] pb-3">
          <div>
            <h2 className="font-extrabold text-base text-white flex items-center gap-2 font-display">
              <Building2 className="w-5 h-5 text-amber-400" />
              Proyek Unggulan &amp; Persediaan Kavling Garut
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">3 Kawasan perumahan aktif di bawah manajemen PT Garut Sejahtera Propertindo</p>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 font-mono"
          >
            Lihat Galeri 4K
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Bumi Cimanuk Asri */}
          <div className="rounded-2xl border border-[#1C2640] overflow-hidden hover:border-amber-400/40 transition group bg-[#070B16] flex flex-col justify-between shadow-lg">
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
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px]">
                  19 Sedia / 20 Unit
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-white font-display">Bumi Cimanuk Asri</h3>
                <p className="text-xs text-slate-400">Tarogong Kidul, Garut</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-black text-sm text-amber-300 font-mono">Rp 166 Juta</span>
                  <span className="text-[11px] text-slate-400 font-medium">Cicilan 1 Jt-an</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/siteplan"
                className="w-full py-2 bg-[#0D1426] hover:bg-amber-500 hover:text-slate-950 border border-[#1C2640] rounded-xl text-xs font-bold text-slate-200 transition block text-center"
              >
                Pilih Kavling di Siteplan
              </Link>
            </div>
          </div>

          {/* Card 2: Grand Karangpawitan Residence */}
          <div className="rounded-2xl border border-[#1C2640] overflow-hidden hover:border-amber-400/40 transition group bg-[#070B16] flex flex-col justify-between shadow-lg">
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
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px]">
                  21 Sedia / 25 Unit
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-white font-display">Grand Karangpawitan</h3>
                <p className="text-xs text-slate-400">Karangpawitan, Garut</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-black text-sm text-amber-300 font-mono">Rp 345 Juta</span>
                  <span className="text-[11px] text-slate-400 font-medium">DP 10% Bertahap</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/siteplan"
                className="w-full py-2 bg-[#0D1426] hover:bg-amber-500 hover:text-slate-950 border border-[#1C2640] rounded-xl text-xs font-bold text-slate-200 transition block text-center"
              >
                Pilih Kavling di Siteplan
              </Link>
            </div>
          </div>

          {/* Card 3: Banyuresmi Hillside */}
          <div className="rounded-2xl border border-[#1C2640] overflow-hidden hover:border-amber-400/40 transition group bg-[#070B16] flex flex-col justify-between shadow-lg">
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
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px]">
                  19 Sedia / 20 Unit
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-white font-display">Banyuresmi Hillside</h3>
                <p className="text-xs text-slate-400">Situ Bagendit, Garut</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-black text-sm text-amber-300 font-mono">Rp 485 Juta</span>
                  <span className="text-[11px] text-slate-400 font-medium">Dekat Danau</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="/siteplan"
                className="w-full py-2 bg-[#0D1426] hover:bg-amber-500 hover:text-slate-950 border border-[#1C2640] rounded-xl text-xs font-bold text-slate-200 transition block text-center"
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
        <div className="lg:col-span-2 bg-[#0B1120] p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#19243C]">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2 font-display">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                Grafik Performa Penjualan Properti
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Komparasi target omzet vs realisasi closing per bulan (Juta Rupiah)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono font-medium">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block"></span> Target
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block"></span> Realisasi
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1C2640" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={{ stroke: '#1C2640' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={{ stroke: '#1C2640' }} />
                  <Tooltip 
                    formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString('id-ID')} Juta`, '']}
                    contentStyle={{ backgroundColor: '#070B16', color: '#fff', borderRadius: '12px', fontSize: '11px', border: '1px solid #D4AF37', boxShadow: '0 8px 16px rgba(0,0,0,0.5)' }}
                  />
                  <Bar dataKey="target" name="Target" fill="#1E2A4A" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="realisasi" name="Realisasi" fill="#D4AF37" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Memuat visualisasi data...
              </div>
            )}
          </div>
        </div>

        {/* Right (1 Col): Follow-up Hari Ini featuring the 5 Indonesian leads */}
        <div className="bg-[#0B1120] p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#19243C]">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-display">
                  <CalendarClock className="w-4 h-4 text-amber-400" />
                  Follow-up Prioritas Hari Ini
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Antrean kontak calon pembeli prioritas</p>
              </div>
              <span className="text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
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
                  <div key={lead.id} className="p-3 bg-[#070B16] rounded-xl border border-[#1C2640] space-y-2 hover:border-amber-400/40 transition shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-white">{lead.full_name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{lead.project_name} &bull; <strong className="text-amber-300 font-mono">Rp {(lead.budget / 1000000).toFixed(0)} Jt</strong></p>
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                        {lead.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#1C2640]">
                      <span className="text-slate-400 text-[10px] font-mono">{formatPhoneDisplay(lead.phone)}</span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs hover:brightness-110"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Chat WA</span>
                        </a>
                        <button
                          onClick={() => handleQuickComplete(lead.id, lead.full_name)}
                          className="px-2 py-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold transition"
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
            className="w-full py-2.5 bg-[#070B16] hover:bg-[#131C35] text-amber-300 hover:text-white text-xs font-bold rounded-xl border border-[#1C2640] hover:border-amber-500/40 text-center block transition mt-2 font-mono"
          >
            Buka Antrean Follow-up Lengkap →
          </Link>
        </div>

      </div>

      {/* Lower Section: Aktivitas Transaksi & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 Cols): Aktivitas Terbaru Timeline */}
        <div className="lg:col-span-2 bg-[#0B1120] p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
          <div className="pb-3 border-b border-[#19243C]">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Aktivitas Transaksi &amp; Sales Terbaru
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Pencatatan real-time interaksi sales, booking fee kavling, dan jadwal survei</p>
          </div>

          <div className="space-y-2.5">
            {recentActivities.map(act => (
              <div key={act.id} className="p-3.5 bg-[#070B16] hover:border-amber-400/40 rounded-xl border border-[#1C2640] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{act.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">&bull; {act.time}</span>
                  </div>
                  <p className="text-xs text-slate-300">{act.desc}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border self-start sm:self-auto shrink-0 ${act.badgeColor}`}>
                  {act.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right (1 Col): Serapan Proyek */}
        <div className="bg-[#0B1120] p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
          <div className="pb-3 border-b border-[#19243C]">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 font-display">
              <Building2 className="w-4 h-4 text-amber-400" />
              Serapan Kavling Proyek
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Status persediaan unit perumahan aktif</p>
          </div>

          <div className="space-y-3">
            {DEMO_PROJECTS.map(proj => {
              const soldOrBooked = proj.total_units - proj.available_units;
              const pct = Math.round((soldOrBooked / proj.total_units) * 100);

              return (
                <div key={proj.id} className="space-y-1.5 p-3.5 bg-[#070B16] rounded-xl border border-[#1C2640]">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <p className="font-bold text-white font-display">{proj.name}</p>
                      <p className="text-[11px] text-slate-400">{proj.city}</p>
                    </div>
                    <span className="text-amber-300 font-bold bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md text-[11px] font-mono">
                      {proj.available_units} Sedia
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 pt-0.5 font-mono">
                    <span>{soldOrBooked} Terjual / Booked</span>
                    <span className="font-bold text-amber-300">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/siteplan"
            className="w-full py-2.5 bg-[#070B16] hover:bg-[#131C35] text-amber-300 hover:text-white text-xs font-bold rounded-xl border border-[#1C2640] hover:border-amber-500/40 text-center block transition font-mono"
          >
            Buka Peta Denah Siteplan 2D →
          </Link>
        </div>

      </div>

      {/* 6-Stage Interactive Business Simulation Modal */}
      <InteractiveTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

      {/* 360 Degree Virtual Tour Modal */}
      <VirtualTour360Modal
        isOpen={isVrTourOpen}
        onClose={() => setIsVrTourOpen(false)}
        projectName="Bumi Cimanuk Asri"
        unitType="Tipe 45/72 Scandinavian Modern"
        onSelectBooking={() => {
          setIsVrTourOpen(false);
          window.location.href = '/siteplan';
        }}
      />

    </div>
  );
}
