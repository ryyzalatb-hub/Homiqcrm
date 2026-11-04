'use client';
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Building2, 
  DollarSign, 
  Calendar, 
  Percent, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText, 
  Info, 
  TrendingUp,
  Sparkles,
  User,
  Phone,
  Printer,
  ChevronDown,
  ChevronUp,
  Table,
  Download
} from 'lucide-react';
import { DEMO_PROJECTS } from '@/lib/demo-data';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, formatWhatsAppNumber } from '@/lib/whatsapp';

type KprType = 'subsidi' | 'komersial' | 'syariah';

export default function KprCalculatorPage() {
  const { showToast } = useToast();

  // Presets & inputs
  const [kprType, setKprType] = useState<KprType>('subsidi');
  const [propertyPrice, setPropertyPrice] = useState<number>(166000000);
  const [dpPercentage, setDpPercentage] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(5.0);
  const [tenorYears, setTenorYears] = useState<number>(20);
  const [bookingFee, setBookingFee] = useState<number>(2000000);

  // Buyer & Marketing PIC metadata
  const [buyerName, setBuyerName] = useState<string>('Bapak Agus Setiawan');
  const [buyerPhone, setBuyerPhone] = useState<string>('0812-2345-6789');
  const [picMarketing, setPicMarketing] = useState<string>('Kang Dika Pratama');
  const [copied, setCopied] = useState<boolean>(false);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Quick preset loader
  const handleSelectPreset = (projectName: string, price: number, type: KprType, defaultRate: number) => {
    setPropertyPrice(price);
    setKprType(type);
    setInterestRate(defaultRate);
    if (type === 'subsidi') {
      setDpPercentage(5);
    } else {
      setDpPercentage(10);
    }
    showToast(`Preset proyek "${projectName}" berhasil dimuat!`, 'info');
  };

  // Calculations
  const calculations = useMemo(() => {
    const dpAmount = Math.round((propertyPrice * dpPercentage) / 100);
    const sisaDp = Math.max(0, dpAmount - bookingFee);
    const loanAmount = Math.max(0, propertyPrice - dpAmount);

    // Monthly installment calculation
    const calculateInstallment = (principal: number, annualRate: number, years: number) => {
      if (principal <= 0) return 0;
      const totalMonths = years * 12;
      const monthlyRate = annualRate / 100 / 12;

      if (monthlyRate === 0) return Math.round(principal / totalMonths);

      // Anuity formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
      const installment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      return Math.round(installment);
    };

    const monthlyInstallment = calculateInstallment(loanAmount, interestRate, tenorYears);

    // Tenor comparisons: 10, 15, 20, 25 years
    const tenorOptions = [10, 15, 20, 25].map(t => ({
      years: t,
      installment: calculateInstallment(loanAmount, interestRate, t)
    }));

    // Minimum required household income (Debt Service Ratio 35%)
    const minIncome = Math.round(monthlyInstallment / 0.35);

    // Estimated closing fees & taxes (Standar Pasar Properti Indonesia)
    // BPHTB: 5% x (Harga - NPOPTKP 60jt) -> Subsidi sering kali dapat insentif / bebas sebagian
    const npoptkp = 60000000;
    const bphtbBase = Math.max(0, propertyPrice - npoptkp);
    const bphtb = kprType === 'subsidi' ? 0 : Math.round(bphtbBase * 0.05);

    // Biaya Notaris, AJB, BBN
    const ajbNotaris = kprType === 'subsidi' ? 2500000 : Math.round(propertyPrice * 0.015);
    const bbn = kprType === 'subsidi' ? 1500000 : Math.round(propertyPrice * 0.01);

    // Biaya Bank (Provisi & Administrasi 1% Plafond)
    const provisiBank = kprType === 'subsidi' ? 500000 : Math.round(loanAmount * 0.01);
    const administrasiBank = kprType === 'subsidi' ? 350000 : 750000;

    // Asuransi Jiwa & Kebakaran
    const asuransi = kprType === 'subsidi' ? 1200000 : Math.round(loanAmount * 0.015);

    const totalClosingCosts = bphtb + ajbNotaris + bbn + provisiBank + administrasiBank + asuransi;
    const totalDanaAwal = dpAmount + totalClosingCosts;

    return {
      dpAmount,
      sisaDp,
      loanAmount,
      monthlyInstallment,
      tenorOptions,
      minIncome,
      bphtb,
      ajbNotaris,
      bbn,
      provisiBank,
      administrasiBank,
      asuransi,
      totalClosingCosts,
      totalDanaAwal
    };
  }, [propertyPrice, dpPercentage, interestRate, tenorYears, bookingFee, kprType]);

  // Year-by-year Amortization Schedule Calculation
  const amortizationSchedule = useMemo(() => {
    let balance = calculations.loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const installment = calculations.monthlyInstallment;
    const schedule: Array<{
      year: number;
      principalPaid: number;
      interestPaid: number;
      totalPaid: number;
      remainingBalance: number;
    }> = [];

    for (let y = 1; y <= tenorYears; y++) {
      let yearPrincipal = 0;
      let yearInterest = 0;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const interestMonth = balance * monthlyRate;
        const principalMonth = Math.min(balance, installment - interestMonth);
        yearInterest += interestMonth;
        yearPrincipal += principalMonth;
        balance = Math.max(0, balance - principalMonth);
      }

      schedule.push({
        year: y,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        totalPaid: Math.round(yearPrincipal + yearInterest),
        remainingBalance: Math.round(balance)
      });
    }

    return schedule;
  }, [calculations.loanAmount, calculations.monthlyInstallment, interestRate, tenorYears]);

  const handleExportAmortizationCSV = () => {
    const headers = ['Tahun ke-', 'Total Angsuran Tahunan (Rp)', 'Porsi Pokok (Rp)', 'Porsi Bunga (Rp)', 'Sisa Pokok Hutang (Rp)'];
    const rows = amortizationSchedule.map(s => [
      `"Tahun ${s.year}"`,
      s.totalPaid,
      s.principalPaid,
      s.interestPaid,
      s.remainingBalance
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `HOMIQ_Jadwal_Amortisasi_KPR_${tenorYears}Tahun.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Tabel Amortisasi ${tenorYears} Tahun berhasil diekspor ke CSV!`, 'success');
  };

  // Formatter helper
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // WhatsApp message generation
  const generatedWhatsAppText = useMemo(() => {
    const kprLabel = kprType === 'subsidi' 
      ? 'KPR Subsidi FLPP (Bunga 5% Tetap Hingga Lunas)' 
      : kprType === 'syariah' 
        ? 'KPR Syariah Murabahah' 
        : 'KPR Komersial Konvensional';

    return `Halo ${buyerName || 'Bapak/Ibu'},\n\nBerikut simulasi resmi perhitungan KPR dari *Garut Sejahtera Property*:\n\n` +
      `🏡 *SKEMA PENAWARAN UNIT*\n` +
      `• Harga Properti: *${formatRupiah(propertyPrice)}*\n` +
      `• Jenis KPR: *${kprLabel}*\n` +
      `• Suku Bunga: *${interestRate}% / tahun*\n` +
      `• Uang Muka (DP ${dpPercentage}%): *${formatRupiah(calculations.dpAmount)}*\n` +
      `• Tanda Jadi / Booking Fee: *${formatRupiah(bookingFee)}*\n` +
      `• Plafond Pengajuan KPR: *${formatRupiah(calculations.loanAmount)}*\n\n` +
      `📊 *SIMULASI ANGSURAN BULANAN*\n` +
      calculations.tenorOptions.map(t => `• Tenor ${t.years} Tahun: *${formatRupiah(t.installment)} / bln*${t.years === tenorYears ? ' ⭐ (Rekomendasi)' : ''}`).join('\n') +
      `\n\n💼 *ANALISIS KELAYAKAN FINANSIAL*\n` +
      `• Rekomendasi Joint Income Suami-Istri: Min. *${formatRupiah(calculations.minIncome)} / bln*\n` +
      `• Estimasi Biaya Legalitas & Akad Bank: *${formatRupiah(calculations.totalClosingCosts)}*\n\n` +
      `Apakah berkenan kami bantu jadwalkan survei lokasi dan konsultasi berkas bank akhir pekan ini?\n\n` +
      `Salam hangat,\n` +
      `*${picMarketing}*\n` +
      `Konsultan Properti — Garut Sejahtera Property\nHOMIQ Smart Property CRM`;
  }, [buyerName, kprType, propertyPrice, interestRate, dpPercentage, bookingFee, calculations, tenorYears, picMarketing]);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(generatedWhatsAppText);
      setCopied(true);
      showToast('Rincian simulasi KPR berhasil disalin ke clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenWhatsApp = () => {
    const link = buildWhatsAppLink(buyerPhone, generatedWhatsAppText);
    window.open(link, '_blank');
    showToast(`Membuka WhatsApp untuk ${buyerName}...`, 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                Smart Financial Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                FLPP 5% &amp; DBR 35% Analisis Aktif
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Kalkulator &amp; Simulasi KPR Properti
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hitung angsuran KPR subsidi FLPP 5% flat vs komersial, rincian biaya pra-akad all-in (BPHTB, notaris, provisi), batas kelayakan gaji (DBR 35%), dan kirim rincian instan via WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={handleOpenWhatsApp}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-sm shadow-emerald-600/30 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Kirim Rincian WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Project Presets */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Presets Proyek Garut Sejahtera</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSelectPreset('Bumi Cimanuk Asri', 166000000, 'subsidi', 5.0)}
            className="text-left p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Bumi Cimanuk Asri</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Subsidi FLPP</span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-600 mt-1">Rp 166.000.000</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Bunga 5.0% tetap &bull; Bebas PPN/BPHTB</p>
          </button>

          <button
            onClick={() => handleSelectPreset('Grand Karangpawitan Residence', 385000000, 'komersial', 6.75)}
            className="text-left p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Grand Karangpawitan</span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Komersial 45</span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-600 mt-1">Rp 385.000.000</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Suku bunga floating promo 6.75%</p>
          </button>

          <button
            onClick={() => handleSelectPreset('Banyuresmi Hillside', 450000000, 'syariah', 7.25)}
            className="text-left p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Banyuresmi Hillside</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Syariah Type 54</span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-600 mt-1">Rp 450.000.000</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Margin murabahah tetap 7.25%</p>
          </button>
        </div>
      </div>

      {/* Main Grid: Parameters vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Calculation Parameters (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Card: Skema & Parameter */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                Parameter Perhitungan KPR
              </h3>
              <span className="text-xs text-slate-500">Kalkulasi Real-time</span>
            </div>

            {/* KPR Type Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Jenis Program KPR
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setKprType('subsidi');
                    setInterestRate(5.0);
                    setDpPercentage(5);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 border ${
                    kprType === 'subsidi'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Subsidi FLPP</span>
                  <span className={`text-[10px] font-normal ${kprType === 'subsidi' ? 'text-blue-100' : 'text-slate-500'}`}>
                    Flat 5.0% Tetap
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setKprType('komersial');
                    setInterestRate(6.75);
                    setDpPercentage(10);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 border ${
                    kprType === 'komersial'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Komersial</span>
                  <span className={`text-[10px] font-normal ${kprType === 'komersial' ? 'text-blue-100' : 'text-slate-500'}`}>
                    Anuitas Bank
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setKprType('syariah');
                    setInterestRate(7.25);
                    setDpPercentage(10);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 border ${
                    kprType === 'syariah'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Syariah</span>
                  <span className={`text-[10px] font-normal ${kprType === 'syariah' ? 'text-blue-100' : 'text-slate-500'}`}>
                    Murabahah Flat
                  </span>
                </button>
              </div>
            </div>

            {/* Harga Properti */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Harga Properti / Rumah
                </label>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {formatRupiah(propertyPrice)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rp</span>
                <input
                  type="number"
                  step="1000000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* DP / Uang Muka */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Uang Muka / Down Payment ({dpPercentage}%)
                </label>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {formatRupiah(calculations.dpAmount)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={dpPercentage}
                onChange={(e) => setDpPercentage(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-600 font-mono mt-1">
                <span>0%</span>
                <span>5% (FLPP)</span>
                <span>10%</span>
                <span>20%</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Tenor & Bunga in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tenor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Jangka Waktu Tenor (Tahun)
                </label>
                <select
                  value={tenorYears}
                  onChange={(e) => setTenorYears(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                >
                  <option value={10}>10 Tahun (120 Bulan)</option>
                  <option value={15}>15 Tahun (180 Bulan)</option>
                  <option value={20}>20 Tahun (240 Bulan) - Populer</option>
                  <option value={25}>25 Tahun (300 Bulan)</option>
                </select>
              </div>

              {/* Suku Bunga */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Suku Bunga / Tahun (%)
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {interestRate}%
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                </div>
              </div>
            </div>

            {/* Booking Fee */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Tanda Jadi / Booking Fee (Pengurang DP)
                </label>
                <span className="text-xs font-mono text-slate-600">
                  Sisa DP Dibayar: <strong className="text-slate-900">{formatRupiah(calculations.sisaDp)}</strong>
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rp</span>
                <input
                  type="number"
                  step="500000"
                  value={bookingFee}
                  onChange={(e) => setBookingFee(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

          </div>

          {/* Card: Personalisasi Penawaran WhatsApp */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-600" />
              Personalisasi Penawaran WhatsApp
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nama Calon Pembeli</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Contoh: Bapak Agus Setiawan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="Contoh: 0812-xxxx-xxxx"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">PIC Marketing Pengirim</label>
                <select
                  value={picMarketing}
                  onChange={(e) => setPicMarketing(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="Kang Dika Pratama">Kang Dika Pratama</option>
                  <option value="Teh Siti Rahmawati">Teh Siti Rahmawati</option>
                  <option value="Kang Wildan Nugraha">Kang Wildan Nugraha</option>
                  <option value="MUHAMMAD RIZAL">MUHAMMAD RIZAL (Direktur Utama)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Results & Action Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Primary Result Banner */}
          <div className="bg-gradient-to-br from-[#0A0F1D] to-[#1E293B] text-white p-6 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between text-xs text-blue-400 font-semibold mb-1">
              <span>Estimasi Angsuran KPR</span>
              <span className="font-mono bg-blue-500/20 px-2 py-0.5 rounded text-[10px] text-blue-300 border border-blue-500/30">
                Tenor {tenorYears} Thn
              </span>
            </div>

            <div className="text-3xl font-extrabold font-mono text-white tracking-tight my-2">
              {formatRupiah(calculations.monthlyInstallment)}
              <span className="text-sm font-sans font-normal text-slate-400"> / bulan</span>
            </div>

            <p className="text-xs text-slate-300">
              Plafond pembiayaan bank: <strong className="text-white font-mono">{formatRupiah(calculations.loanAmount)}</strong>
            </p>

            <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Syarat Joint Income (35% DSR)</span>
                <span className="font-bold font-mono text-emerald-400">{formatRupiah(calculations.minIncome)} / bln</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Total Estimasi Biaya Akad</span>
                <span className="font-bold font-mono text-amber-300">{formatRupiah(calculations.totalClosingCosts)}</span>
              </div>
            </div>
          </div>

          {/* Government Incentive Card: PPN DTP 100% Ditanggung Pemerintah */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-900 border border-emerald-600/40 rounded-2xl p-4 text-white relative overflow-hidden shadow-2xs">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">Insentif Pajak PPN DTP 100%</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PMK No. 7/2024
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Konsumen berhak mendapat pembebasan Pajak Pertambahan Nilai (PPN 11%) ditanggung pemerintah:
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-sm font-mono font-black text-emerald-400">
                    Hemat: {formatRupiah(Math.round(propertyPrice * 0.11))}
                  </span>
                  <span className="text-[10px] text-slate-400">(Bebas Pajak Rp 0)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tenor Comparisons Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Perbandingan Tenor Angsuran
            </h4>

            <div className="space-y-2">
              {calculations.tenorOptions.map((opt) => {
                const isSelected = opt.years === tenorYears;
                return (
                  <div
                    key={opt.years}
                    onClick={() => setTenorYears(opt.years)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'}`} />
                      <span>{opt.years} Tahun ({opt.years * 12}x Cicilan)</span>
                    </div>
                    <span className="font-mono text-slate-900">
                      {formatRupiah(opt.installment)} / bln
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown Biaya Awal & Legalitas */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Estimasi Biaya Awal & Legalitas
              </h4>
              <span className="text-[11px] text-slate-600 font-mono">Standar Notaris & Bank</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Uang Muka (DP {dpPercentage}%)</span>
                <span className="font-mono font-semibold text-slate-900">{formatRupiah(calculations.dpAmount)}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Pajak Pembeli (BPHTB 5%)</span>
                <span className="font-mono font-semibold text-slate-900">
                  {calculations.bphtb === 0 ? 'Gratis / Bebas BPHTB' : formatRupiah(calculations.bphtb)}
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Akta Jual Beli (AJB) & Notaris</span>
                <span className="font-mono font-semibold text-slate-900">{formatRupiah(calculations.ajbNotaris)}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Bea Balik Nama (BBN Sertifikat)</span>
                <span className="font-mono font-semibold text-slate-900">{formatRupiah(calculations.bbn)}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Provisi & Administrasi Bank (1%)</span>
                <span className="font-mono font-semibold text-slate-900">{formatRupiah(calculations.provisiBank + calculations.administrasiBank)}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-600">Asuransi Jiwa & Kebakaran Bank</span>
                <span className="font-mono font-semibold text-slate-900">{formatRupiah(calculations.asuransi)}</span>
              </div>
              <div className="py-2.5 flex justify-between font-bold bg-slate-50 px-2 rounded-lg mt-1">
                <span className="text-slate-900">Total Estimasi Dana Awal Siap Huni</span>
                <span className="font-mono text-blue-700">{formatRupiah(calculations.totalDanaAwal)}</span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Format WhatsApp Siap Kirim
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 transition flex items-center gap-1 shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
              </button>
            </div>

            <p className="text-[11px] text-emerald-800 line-clamp-3 bg-white/70 p-2.5 rounded-xl border border-emerald-200/60 font-mono">
              {generatedWhatsAppText}
            </p>

            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Kirim Rincian Simulasi ke {buyerName}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Full-Width Section: Jadwal Amortisasi Kredit Penurunan Pokok */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        
        {/* Accordion Header */}
        <div 
          onClick={() => setShowAmortization(prev => !prev)}
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition select-none"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Tabel Jadwal Amortisasi Pinjaman (Tenor {tenorYears} Tahun)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  Rincian Pokok vs Bunga
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Plafon KPR: <strong className="font-mono text-slate-700">{formatRupiah(calculations.loanAmount)}</strong> • Bunga: <strong className="font-mono text-slate-700">{interestRate}% Flat/Anuitas</strong> • Angsuran: <strong className="font-mono text-slate-700">{formatRupiah(calculations.monthlyInstallment)}/bln</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 hidden sm:inline">
              {showAmortization ? 'Sembunyikan Tabel' : 'Buka Rincian Amortisasi'}
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
              {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        {showAmortization && (
          <div className="p-5 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <span>
                  Tabel ini memperlihatkan bagaimana pokok pinjaman berkurang setiap tahunnya setelah dikurangi porsi bunga bank.
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExportAmortizationCSV();
                }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 text-xs flex items-center gap-1.5 transition shrink-0 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Unduh CSV Excel</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3 text-left w-24">Tahun Ke-</th>
                    <th className="p-3 text-right">Angsuran / Tahun</th>
                    <th className="p-3 text-right text-emerald-800">Porsi Pokok Hutang</th>
                    <th className="p-3 text-right text-amber-800">Porsi Bunga Bank</th>
                    <th className="p-3 text-right">Sisa Pokok Hutang</th>
                    <th className="p-3 text-center w-36">Pelunasan Pokok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {amortizationSchedule.map((row) => {
                    const progressPercent = Math.min(100, Math.round(((calculations.loanAmount - row.remainingBalance) / calculations.loanAmount) * 100));

                    return (
                      <tr key={row.year} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-bold text-slate-900">
                          Tahun {row.year}
                        </td>
                        <td className="p-3 text-right font-mono text-slate-800">
                          {formatRupiah(row.totalPaid)}
                        </td>
                        <td className="p-3 text-right font-mono font-semibold text-emerald-700">
                          {formatRupiah(row.principalPaid)}
                        </td>
                        <td className="p-3 text-right font-mono text-amber-700">
                          {formatRupiah(row.interestPaid)}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          {formatRupiah(row.remainingBalance)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                              <div
                                className="bg-blue-600 h-full rounded-full transition-all"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono font-semibold text-slate-500 w-8 text-right">
                              {progressPercent}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Accumulation Footer */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Total Pokok Dipinjam:</span>
                <span className="font-extrabold font-mono text-slate-900 text-sm">{formatRupiah(calculations.loanAmount)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Akumulasi Bunga ({tenorYears} Thn):</span>
                <span className="font-extrabold font-mono text-amber-700 text-sm">
                  {formatRupiah(amortizationSchedule.reduce((acc, curr) => acc + curr.interestPaid, 0))}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Pengeluaran Kredit:</span>
                <span className="font-extrabold font-mono text-blue-700 text-sm">
                  {formatRupiah(amortizationSchedule.reduce((acc, curr) => acc + curr.totalPaid, 0))}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
