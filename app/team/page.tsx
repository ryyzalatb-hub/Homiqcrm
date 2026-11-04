'use client';
import React, { useState } from 'react';
import { 
  Users2, 
  Award, 
  Phone, 
  Mail, 
  TrendingUp, 
  CheckCircle, 
  Target, 
  Plus, 
  Sparkles, 
  Search, 
  Filter, 
  X, 
  DollarSign, 
  CheckCircle2, 
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Receipt,
  Printer,
  Building2,
  Wallet,
  Clock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { formatPhoneDisplay, buildWhatsAppLink } from '@/lib/whatsapp';

interface ClosingDeal {
  id: string;
  unitCode: string;
  projectName: string;
  customerName: string;
  price: number;
  scheme: 'KPR FLPP' | 'KPR Komersial' | 'Cash Keras';
  commRate: number; // e.g. 2.0%
  milestone1Paid: boolean; // 50% saat DP / SPK
  milestone2Paid: boolean; // 50% saat Akad / BAST
}

interface TeamMember {
  id: string;
  staffId: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  bankAccount: string;
  hasNpwp: boolean;
  active_leads: number;
  closing_this_month: number;
  closing_value: number;
  target: number;
  achievement: number;
  specialization: string;
  joined_date: string;
  deals: ClosingDeal[];
}

export default function MarketingTeamPage() {
  const { showToast } = useToast();

  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: 'm1',
      staffId: 'STF-GS-001',
      name: 'Kang Dika Pratama',
      role: 'Senior Property Consultant',
      phone: '0812-3456-7890',
      email: 'dika@garutsejahtera.co.id',
      bankAccount: 'BCA 148-092-8819 a.n Dika Pratama',
      hasNpwp: true,
      active_leads: 18,
      closing_this_month: 2,
      closing_value: 511000000,
      target: 600000000,
      achievement: 85,
      specialization: 'KPR Subsidi FLPP & Rumah Menengah',
      joined_date: 'Januari 2025',
      deals: [
        {
          id: 'dl-1',
          unitCode: 'Blok B-04',
          projectName: 'Bumi Cimanuk Indah',
          customerName: 'Ibu Ratna Dewi',
          price: 168000000,
          scheme: 'KPR FLPP',
          commRate: 2.0,
          milestone1Paid: true,
          milestone2Paid: true
        },
        {
          id: 'dl-2',
          unitCode: 'Blok A-02',
          projectName: 'Grand Karangpawitan',
          customerName: 'Bpk. Bambang Pamungkas',
          price: 343000000,
          scheme: 'KPR Komersial',
          commRate: 1.5,
          milestone1Paid: true,
          milestone2Paid: false
        }
      ]
    },
    {
      id: 'm2',
      staffId: 'STF-GS-002',
      name: 'Teh Nisa Andriani',
      role: 'Property Specialist',
      phone: '0821-9876-5432',
      email: 'nisa@garutsejahtera.co.id',
      bankAccount: 'Mandiri 131-00-9821-332 a.n Nisa Andriani',
      hasNpwp: true,
      active_leads: 15,
      closing_this_month: 1,
      closing_value: 345000000,
      target: 500000000,
      achievement: 69,
      specialization: 'Komersial & Syariah Murabahah',
      joined_date: 'Maret 2025',
      deals: [
        {
          id: 'dl-3',
          unitCode: 'Blok C-01',
          projectName: 'Tarogong Regency',
          customerName: 'dr. Hendra Gunawan',
          price: 345000000,
          scheme: 'KPR Komersial',
          commRate: 1.5,
          milestone1Paid: true,
          milestone2Paid: false
        }
      ]
    },
    {
      id: 'm3',
      staffId: 'STF-GS-003',
      name: 'Kang Fajar Ramadhan',
      role: 'Sales Executive',
      phone: '0857-1122-3344',
      email: 'fajar@garutsejahtera.co.id',
      bankAccount: 'BSI 714-220-9182 a.n Fajar Ramadhan',
      hasNpwp: false,
      active_leads: 12,
      closing_this_month: 0,
      closing_value: 0,
      target: 400000000,
      achievement: 30,
      specialization: 'Direct Canvassing & Event Pameran',
      joined_date: 'September 2025',
      deals: []
    }
  ]);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'top' | 'ontrack' | 'support'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedCommissionMember, setSelectedCommissionMember] = useState<TeamMember | null>(null);

  // Form State for new member
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Property Consultant');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBank, setNewBank] = useState('BCA 123-xxx-xxxx a.n ');
  const [newTarget, setNewTarget] = useState('500000000');
  const [newSpec, setNewSpec] = useState('KPR Subsidi & Komersial');

  // Aggregates
  const totalOmzet = team.reduce((acc, m) => acc + m.closing_value, 0);
  const totalTarget = team.reduce((acc, m) => acc + m.target, 0);
  const totalLeads = team.reduce((acc, m) => acc + m.active_leads, 0);
  const totalClosingUnits = team.reduce((acc, m) => acc + m.closing_this_month, 0);
  const avgAchievement = Math.round(team.reduce((acc, m) => acc + m.achievement, 0) / (team.length || 1));

  // Filtered members
  const filteredTeam = team.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.specialization.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'top') return m.achievement >= 80;
    if (filterType === 'ontrack') return m.achievement >= 50 && m.achievement < 80;
    if (filterType === 'support') return m.achievement < 50;

    return true;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      showToast('Nama dan nomor telepon staf marketing wajib diisi.', 'error');
      return;
    }

    const created: TeamMember = {
      id: `m-${Date.now()}`,
      staffId: `STF-GS-00${team.length + 1}`,
      name: newName.trim(),
      role: newRole.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@garutsejahtera.co.id`,
      bankAccount: newBank.trim() || 'BCA 000-000-0000',
      hasNpwp: true,
      active_leads: 0,
      closing_this_month: 0,
      closing_value: 0,
      target: Number(newTarget) || 400000000,
      achievement: 0,
      specialization: newSpec.trim(),
      joined_date: 'November 2026',
      deals: []
    };

    setTeam(prev => [...prev, created]);
    setIsAddModalOpen(false);
    showToast(`Staf marketing baru "${created.name}" berhasil didaftarkan!`, 'success');

    // Reset
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  const handleAutoDistribute = () => {
    showToast('Distribusi Round-Robin aktif: 6 prospek baru dialokasikan secara proporsional ke 3 konsultan.', 'success');
  };

  // Helper calculations for commission modal
  const calculateCommissionTotals = (member: TeamMember) => {
    let grossTotal = 0;
    let disbursedTotal = 0;
    let pendingDisbursed = 0;

    member.deals.forEach(deal => {
      const dealComm = (deal.price * deal.commRate) / 100;
      grossTotal += dealComm;

      const half = dealComm / 2;
      if (deal.milestone1Paid) disbursedTotal += half;
      else pendingDisbursed += half;

      if (deal.milestone2Paid) disbursedTotal += half;
      else pendingDisbursed += half;
    });

    const taxRate = member.hasNpwp ? 0.025 : 0.03; // 2.5% PPh 21 tarif efektif
    const taxDeduction = grossTotal * taxRate;
    const netTotal = grossTotal - taxDeduction;

    return {
      grossTotal,
      disbursedTotal,
      pendingDisbursed,
      taxDeduction,
      netTotal,
      taxRateText: member.hasNpwp ? '2.5% (NPWP Aktif)' : '3.0% (Tanpa NPWP)'
    };
  };

  const handlePrintCommissionSlip = () => {
    window.print();
  };

  const handleSendCommissionWhatsApp = (member: TeamMember) => {
    const comm = calculateCommissionTotals(member);
    const text = `Halo Rekan ${member.name}, 

Berikut ini rekapitulasi *Slip Komisi & Insentif Penjualan* Anda per periode berjalan:

• Total Unit Closing: ${member.deals.length} Unit
• Total Omzet Penjualan: Rp ${(member.closing_value / 1000000).toLocaleString('id-ID')} Juta
• Total Komisi Bruto: Rp ${comm.grossTotal.toLocaleString('id-ID')}
• Potongan PPh 21 (${comm.taxRateText}): -Rp ${comm.taxDeduction.toLocaleString('id-ID')}
• *Total Komisi Bersih*: *Rp ${comm.netTotal.toLocaleString('id-ID')}*

*Status Pencairan:*
- Sudah Ditransfer: Rp ${comm.disbursedTotal.toLocaleString('id-ID')}
- Siap Dicairkan (Termin Berikutnya): Rp ${comm.pendingDisbursed.toLocaleString('id-ID')}

Rekening Tujuan: ${member.bankAccount}
Terima kasih atas dedikasi dan kinerja closing terbaik Anda! 👏`;

    const url = buildWhatsAppLink(member.phone, text);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`Mengirim ringkasan slip komisi via WhatsApp ke ${member.name}...`, 'success');
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
                <Users2 className="w-3.5 h-3.5 text-blue-400" />
                Sales Force Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Lead Distribution Engine Aktif
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Kinerja &amp; Alokasi Tim Marketing
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitoring distribusi kuota prospek, pencapaian target omzet bulanan, dan hitung komisi penjualan (1.5% - 2.0%) lengkap dengan slip transfer resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleAutoDistribute}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5 text-blue-400" />
              <span>Bagi Prospek Round-Robin</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Staf Marketing</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Konsultan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Staf Marketing Aktif</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono tracking-tight">
            {team.length} <span className="text-sm font-semibold text-slate-500">Konsultan</span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-bold text-emerald-600">100% Siap</span>
            <span>menangani leads baru</span>
          </div>
        </div>

        {/* Metric 2: Total Omzet Tim Closing */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Realisasi Closing Tim</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2 font-mono tracking-tight">
            Rp {(totalOmzet / 1000000).toLocaleString('id-ID')} <span className="text-sm font-semibold text-emerald-700">Jt</span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-bold text-slate-700">{totalClosingUnits} Unit</span>
            <span>telah serah terima akad</span>
          </div>
        </div>

        {/* Metric 3: Total Active Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-indigo-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Prospek Terdistribusi</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono tracking-tight">
            {totalLeads} <span className="text-sm font-semibold text-slate-500">Leads</span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <span>Rata-rata {Math.round(totalLeads / team.length)} leads / konsultan</span>
          </div>
        </div>

        {/* Metric 4: Avg Target Achievement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Rata-rata Target</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 mt-2 font-mono tracking-tight">
            {avgAchievement}%
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <span>Target total: Rp {(totalTarget / 1000000000).toFixed(2)} Miliar</span>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama staf, nomor kontak, spesialisasi, atau peran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({team.length})
          </button>
          <button
            onClick={() => setFilterType('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'top'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Top Closer (≥80%)
          </button>
          <button
            onClick={() => setFilterType('ontrack')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'ontrack'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            On Track (50-79%)
          </button>
          <button
            onClick={() => setFilterType('support')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'support'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            Butuh Dorongan (&lt;50%)
          </button>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredTeam.map((member, index) => {
          const initials = member.name.split(' ').map(n => n[0]).slice(0, 2).join('');
          const isTop = member.achievement >= 80;
          const comm = calculateCommissionTotals(member);

          return (
            <div 
              key={member.id} 
              className="crm-card bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition space-y-4 relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header card */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{member.name}</h3>
                      <p className="text-[11px] text-slate-500 font-mono">{member.staffId} &bull; {member.role}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isTop 
                      ? 'bg-amber-50 text-amber-800 border-amber-300' 
                      : member.achievement >= 50 
                        ? 'bg-blue-50 text-blue-800 border-blue-200' 
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {isTop ? '🏆 Top Closer' : `Peringkat #${index + 1}`}
                  </span>
                </div>

                {/* Specialization tag */}
                <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600">
                  <span className="font-bold text-slate-700">Fokus: </span>
                  {member.specialization}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">Prospek Aktif</span>
                    <p className="font-extrabold text-slate-900 font-mono text-base mt-0.5">
                      {member.active_leads} Leads
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-emerald-800 font-medium">Unit Closing</span>
                    <p className="font-extrabold text-emerald-700 font-mono text-base mt-0.5">
                      {member.closing_this_month} Unit
                    </p>
                  </div>
                </div>

                {/* Target Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Pencapaian Target</span>
                    <span className="font-extrabold text-slate-900 font-mono">{member.achievement}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        member.achievement >= 80 
                          ? 'bg-emerald-500' 
                          : member.achievement >= 50 
                            ? 'bg-blue-600' 
                            : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, member.achievement)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>Realisasi: <strong>Rp {(member.closing_value / 1000000).toLocaleString('id-ID')} Jt</strong></span>
                    <span>Target: Rp {(member.target / 1000000).toLocaleString('id-ID')} Jt</span>
                  </div>
                </div>

                {/* Commission Summary Pill */}
                <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-blue-700 block font-medium">Akumulasi Komisi (Est):</span>
                    <span className="font-bold text-blue-900 font-mono">
                      Rp {comm.netTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCommissionMember(member)}
                    className="px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] border border-blue-200 transition shadow-2xs flex items-center gap-1"
                  >
                    <Receipt className="w-3 h-3 text-blue-600" />
                    <span>Rincian Slip</span>
                  </button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2 mt-2">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="px-2.5 py-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold transition text-[11px]"
                >
                  Detail Kinerja
                </button>

                <div className="flex items-center gap-1.5">
                  <a 
                    href={`https://wa.me/62${member.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] transition flex items-center gap-1 shadow-2xs"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm">
                  {selectedMember.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedMember.name}</h3>
                  <p className="text-xs text-slate-500">{selectedMember.role}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Bergabung Sejak</span>
                  <p className="font-bold text-slate-800 text-xs mt-0.5">{selectedMember.joined_date}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Status Alokasi Leads</span>
                  <p className="font-bold text-emerald-600 text-xs mt-0.5">Aktif Menerima</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Nomor Telepon:</span>
                  <span className="font-mono font-semibold text-slate-900">{formatPhoneDisplay(selectedMember.phone)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Email Resmi:</span>
                  <span className="font-semibold text-slate-900">{selectedMember.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Rekening Transfer:</span>
                  <span className="font-semibold text-slate-900">{selectedMember.bankAccount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Spesialisasi Pasar:</span>
                  <span className="font-semibold text-slate-900">{selectedMember.specialization}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Omzet Closing Berjalan:</span>
                  <span className="font-mono font-bold text-emerald-600">Rp {(selectedMember.closing_value / 1000000).toLocaleString('id-ID')} Jt</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Target Kuota Omzet:</span>
                  <span className="font-mono font-bold text-slate-900">Rp {(selectedMember.target / 1000000).toLocaleString('id-ID')} Jt</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-blue-900 space-y-1">
                <p className="font-bold text-xs">Evaluasi Supervisi CRM:</p>
                <p className="text-[11px] leading-relaxed text-blue-800">
                  Tingkat kecepatan respon follow-up rata-rata berada pada kisaran <strong>8 menit</strong> pasca-lead masuk. Rekomendasi: terus dorong prospek di tahap Survei Lokasi untuk booking unit.
                </p>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <Link
                href="/pipeline"
                onClick={() => setSelectedMember(null)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Lihat Leads di Pipeline →
              </Link>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Commission & Slip Generator Modal */}
      {selectedCommissionMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in zoom-in-95 my-8">
            
            {/* Modal Action Bar (Hidden when printed) */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Slip Komisi &amp; Insentif Penjualan Resmi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendCommissionWhatsApp(selectedCommissionMember)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Kirim ke WhatsApp</span>
                </button>
                <button
                  onClick={handlePrintCommissionSlip}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  onClick={() => setSelectedCommissionMember(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable A4 Slip Document Body */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 font-sans print:p-0">
              
              {/* Kop Surat Developer */}
              <div className="flex items-start justify-between pb-5 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                      PT GARUT SEJAHTERA PROPERTY
                    </h2>
                    <p className="text-[11px] text-slate-600">
                      Pengembang Perumahan Bumi Cimanuk Indah &amp; Grand Karangpawitan
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Jl. Raya Cimanuk No. 88, Garut, Jawa Barat &bull; Telp: (0262) 234-8899
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold block mb-1">
                    SLIP #{selectedCommissionMember.staffId}-2026/11
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Periode: November 2026
                  </span>
                </div>
              </div>

              {/* Document Title */}
              <div className="text-center py-1">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 underline decoration-2 underline-offset-4">
                  SLIP RINCIAN KOMISI PENJUALAN UNIT
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Berdasarkan Surat Perjanjian Kemitraan Marketing &amp; Realisasi Akad Unit
                </p>
              </div>

              {/* Consultant Details Card */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-500">Nama Penerima: <strong className="text-slate-900">{selectedCommissionMember.name}</strong></div>
                  <div className="text-slate-500">ID / NIK Staf: <span className="font-mono font-semibold text-slate-800">{selectedCommissionMember.staffId}</span></div>
                  <div className="text-slate-500">Jabatan: <span className="text-slate-800">{selectedCommissionMember.role}</span></div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">Rekening Tujuan: <strong className="text-slate-900">{selectedCommissionMember.bankAccount}</strong></div>
                  <div className="text-slate-500">Status Pajak: <span className="font-mono font-semibold text-slate-800">{selectedCommissionMember.hasNpwp ? 'NPWP Terdaftar (PPh 21 2.5%)' : 'Non-NPWP (PPh 21 3.0%)'}</span></div>
                  <div className="text-slate-500">Status Pencairan: <span className="text-emerald-700 font-bold">Disetujui Bagian Keuangan</span></div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Daftar Unit Closing Terverifikasi:</span>
                  <span className="text-slate-500 font-normal">{selectedCommissionMember.deals.length} Transaksi</span>
                </h4>

                {selectedCommissionMember.deals.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                    Belum ada unit closing pada periode ini.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/80 text-slate-700 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">Unit &amp; Proyek</th>
                          <th className="p-2.5">Nama Pembeli</th>
                          <th className="p-2.5">Nilai Transaksi</th>
                          <th className="p-2.5 text-center">Rate</th>
                          <th className="p-2.5 text-right">Komisi Bruto</th>
                          <th className="p-2.5 text-center">Status Pencairan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                        {selectedCommissionMember.deals.map((deal) => {
                          const dealComm = (deal.price * deal.commRate) / 100;
                          return (
                            <tr key={deal.id} className="hover:bg-slate-50">
                              <td className="p-2.5 font-sans font-semibold text-slate-900">
                                {deal.unitCode} <span className="text-[10px] text-slate-500 block">{deal.projectName}</span>
                              </td>
                              <td className="p-2.5 font-sans text-slate-700">{deal.customerName}</td>
                              <td className="p-2.5 text-slate-800">Rp {deal.price.toLocaleString('id-ID')}</td>
                              <td className="p-2.5 text-center font-bold text-blue-600">{deal.commRate}%</td>
                              <td className="p-2.5 text-right font-bold text-slate-900">Rp {dealComm.toLocaleString('id-ID')}</td>
                              <td className="p-2.5 text-center font-sans">
                                {deal.milestone2Paid ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    Lunas 100%
                                  </span>
                                ) : deal.milestone1Paid ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                    50% DP (Termin 1)
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                    Menunggu Verifikasi
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Commission Summary Calculations */}
              {(() => {
                const comm = calculateCommissionTotals(selectedCommissionMember);
                return (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Komisi Bruto Penjualan:</span>
                      <span className="font-mono font-bold text-slate-900">Rp {comm.grossTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Potongan PPh 21 Tenaga Ahli/Komisi ({comm.taxRateText}):</span>
                      <span className="font-mono font-bold text-red-600">- Rp {comm.taxDeduction.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                      <span>Total Bersih yang Ditransfer:</span>
                      <span className="font-mono text-emerald-700 text-base">Rp {comm.netTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-1 flex justify-between">
                      <span>Sudah Dicairkan: Rp {comm.disbursedTotal.toLocaleString('id-ID')}</span>
                      <span>Sisa Termin Akad/BAST: Rp {comm.pendingDisbursed.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Dual Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs text-slate-700">
                <div className="space-y-14">
                  <p className="font-medium text-[11px] text-slate-500">Diajukan &amp; Diterima Oleh,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline">{selectedCommissionMember.name}</p>
                    <p className="text-[10px] text-slate-500">Staf Marketing / Konsultan</p>
                  </div>
                </div>

                <div className="space-y-14">
                  <p className="font-medium text-[11px] text-slate-500">Diverifikasi &amp; Disetujui Oleh,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline">MUHAMMAD RIZAL</p>
                    <p className="text-[10px] text-slate-500">Direktur Utama PT Garut Sejahtera Propertindo</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Close Button */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end print:hidden">
              <button
                onClick={() => setSelectedCommissionMember(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Team Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Daftarkan Staf Marketing Baru</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap &amp; Panggilan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kang Rian Hidayat"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Peran / Jabatan</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                  >
                    <option value="Senior Property Consultant">Senior Consultant</option>
                    <option value="Property Specialist">Property Specialist</option>
                    <option value="Sales Executive">Sales Executive</option>
                    <option value="Digital Marketing PIC">Digital Marketing PIC</option>
                  </select>
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

              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Closing Bulanan (Rupiah)</label>
                <input
                  type="number"
                  placeholder="500000000"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Rekening Bank untuk Transfer Komisi</label>
                <input
                  type="text"
                  placeholder="Contoh: BCA 148-092-8819 a.n Rian Hidayat"
                  value={newBank}
                  onChange={(e) => setNewBank(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Spesialisasi &amp; Fokus Proyek</label>
                <input
                  type="text"
                  placeholder="Contoh: KPR Subsidi FLPP &amp; Pameran Mall"
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-sm transition"
                >
                  Simpan Staf Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}