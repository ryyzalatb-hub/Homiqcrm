'use client';
import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  Flame, 
  Zap, 
  Snowflake, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  CreditCard, 
  DollarSign, 
  Search, 
  Filter, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';
import { DEMO_LEADS } from '@/lib/demo-data';
import { buildWhatsAppLink, formatPhoneDisplay } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';

interface ScoredLead {
  id: string;
  name: string;
  phone: string;
  project: string;
  budget: number;
  score: number;
  tier: 'ultra-hot' | 'warm' | 'cold';
  financialScore: number; // 0-100
  urgencyScore: number;   // 0-100
  documentScore: number;  // 0-100
  nextAction: string;
  marketingName: string;
}

export default function LeadScoringPage() {
  const { showToast } = useToast();
  const [tierFilter, setTierFilter] = useState<'all' | 'ultra-hot' | 'warm' | 'cold'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<ScoredLead | null>(null);

  // Compute intelligent scores for leads
  const scoredLeads: ScoredLead[] = DEMO_LEADS.map(lead => {
    let score = 70;
    let tier: 'ultra-hot' | 'warm' | 'cold' = 'warm';
    let financialScore = 75;
    let urgencyScore = 70;
    let documentScore = 65;
    let nextAction = 'Follow-up via WhatsApp dan kirimkan brosur perumahan.';

    if (lead.full_name.includes('Siti Patonah')) {
      score = 96;
      tier = 'ultra-hot';
      financialScore = 95;
      urgencyScore = 98;
      documentScore = 95;
      nextAction = 'Berkas KPR FLPP Bank BTN siap diajukan. Kunci kavling Blok A-07.';
    } else if (lead.full_name.includes('Hasanudin')) {
      score = 92;
      tier = 'ultra-hot';
      financialScore = 90;
      urgencyScore = 94;
      documentScore = 92;
      nextAction = 'Jadwalkan survei show unit Tipe 36/60 hari ini dan siapkan formulir KPR.';
    } else if (lead.full_name.includes('Azhar Pratama')) {
      score = 88;
      tier = 'ultra-hot';
      financialScore = 95;
      urgencyScore = 85;
      documentScore = 84;
      nextAction = 'Ajukan persetujuan diskon tanda jadi kavling hook Tipe 54/84 ke Direktur.';
    } else if (lead.full_name.includes('Agus Setiawan')) {
      score = 86;
      tier = 'ultra-hot';
      financialScore = 85;
      urgencyScore = 90;
      documentScore = 83;
      nextAction = 'Dampingi survei lokasi Blok A-06 bersama istri siang ini.';
    } else if (lead.full_name.includes('Nugraha')) {
      score = 78;
      tier = 'warm';
      financialScore = 80;
      urgencyScore = 76;
      documentScore = 78;
      nextAction = 'Konfirmasi kunjungan show unit Grand Karangpawitan Blok B-05 besok.';
    } else if (lead.full_name.includes('Anggi')) {
      score = 68;
      tier = 'warm';
      financialScore = 70;
      urgencyScore = 68;
      documentScore = 66;
      nextAction = 'Kirimkan panduan syarat batas gaji maksimal & fotokopi berkas FLPP.';
    } else if (lead.status === 'closing' || lead.status === 'booking') {
      score = 94;
      tier = 'ultra-hot';
      financialScore = 95;
      urgencyScore = 92;
      documentScore = 95;
      nextAction = 'Verifikasi pembayaran dan koordinasikan dengan notaris.';
    } else if (lead.priority === 'high') {
      score = 82;
      tier = 'ultra-hot';
      financialScore = 82;
      urgencyScore = 85;
      documentScore = 80;
      nextAction = 'Prioritaskan telepon langsung dan tawarkan unit kavling favorit.';
    } else {
      score = 48;
      tier = 'cold';
      financialScore = 50;
      urgencyScore = 45;
      documentScore = 50;
      nextAction = 'Jadwalkan pesan broadcast berkala untuk edukasi promo bulanan.';
    }

    return {
      id: lead.id,
      name: lead.full_name,
      phone: lead.phone,
      project: lead.project_name,
      budget: lead.budget,
      score,
      tier,
      financialScore,
      urgencyScore,
      documentScore,
      nextAction,
      marketingName: lead.assigned_to_name
    };
  });

  const filteredLeads = scoredLeads.filter(l => {
    const matchesTier = tierFilter === 'all' || l.tier === tierFilter;
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const hotCount = scoredLeads.filter(l => l.tier === 'ultra-hot').length;
  const warmCount = scoredLeads.filter(l => l.tier === 'warm').length;
  const coldCount = scoredLeads.filter(l => l.tier === 'cold').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="crm-card bg-gradient-to-r from-[#0A0F1D] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-400" />
                PREDICTIVE CONVERSION ENGINE
              </span>
              <span className="text-xs text-slate-400 font-medium">Algoritma Skor Finansial 360°</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Intelligent Lead Scoring Matrix
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Prioritisasi calon pembeli secara otomatis berdasarkan kemampuan angsuran finansial, kecepatan interaksi, kesiapan berkas KPR perbankan, dan probabilitas closing tertinggi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <span className="block text-[10px] text-amber-400 font-mono font-bold uppercase">Ultra Hot Tier</span>
              <strong className="text-xl font-black text-white">{hotCount} Prospek</strong>
            </div>
            <div className="px-4 py-3 bg-blue-900/40 rounded-xl border border-blue-700/50 text-center">
              <span className="block text-[10px] text-blue-300 font-mono font-bold uppercase">Estimasi Closing</span>
              <strong className="text-xl font-black text-blue-400">Rp 1.48 M</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="crm-card p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Tier Buttons */}
        <div className="flex gap-2 text-xs font-semibold">
          <button
            onClick={() => setTierFilter('all')}
            className={`px-4 py-2 rounded-xl transition ${tierFilter === 'all' ? 'bg-slate-900 text-white font-bold shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            Semua ({scoredLeads.length})
          </button>
          <button
            onClick={() => setTierFilter('ultra-hot')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${tierFilter === 'ultra-hot' ? 'bg-rose-600 text-white font-bold shadow-sm' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            Ultra Hot ({hotCount})
          </button>
          <button
            onClick={() => setTierFilter('warm')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${tierFilter === 'warm' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
          >
            <Zap className="w-3.5 h-3.5" />
            Warm ({warmCount})
          </button>
          <button
            onClick={() => setTierFilter('cold')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${tierFilter === 'cold' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            Cold ({coldCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau proyek..."
            className="text-xs pl-9 pr-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 font-medium"
          />
        </div>
      </div>

      {/* Leads Table Matrix */}
      <div className="crm-card bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Skor AI</th>
                <th className="py-3.5 px-4 font-bold">Calon Pembeli</th>
                <th className="py-3.5 px-4 font-bold">Minat Proyek & Budget</th>
                <th className="py-3.5 px-4 font-bold">Diagnostik 3-Faktor</th>
                <th className="py-3.5 px-4 font-bold">Rekomendasi Tindakan (Next Action)</th>
                <th className="py-3.5 px-4 font-bold text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(lead => {
                let badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
                let icon = <Flame className="w-3.5 h-3.5 text-rose-600" />;

                if (lead.tier === 'warm') {
                  badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
                  icon = <Zap className="w-3.5 h-3.5 text-amber-600" />;
                } else if (lead.tier === 'cold') {
                  badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
                  icon = <Snowflake className="w-3.5 h-3.5 text-blue-600" />;
                }

                return (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* Score Pillar */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm font-mono border ${
                          lead.score >= 85 
                            ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm shadow-rose-200/50' 
                            : lead.score >= 70
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {lead.score}
                        </span>
                        <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${badgeStyle}`}>
                            {icon}
                            {lead.tier === 'ultra-hot' ? 'Ultra Hot' : lead.tier === 'warm' ? 'Warm' : 'Cold'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Lead Info */}
                    <td className="py-4 px-4">
                      <strong className="text-slate-900 font-bold block text-sm">{lead.name}</strong>
                      <span className="text-[11px] text-slate-500 font-mono">{formatPhoneDisplay(lead.phone)}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">PIC: {lead.marketingName}</span>
                    </td>

                    {/* Project & Budget */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-800 block">{lead.project}</span>
                      <span className="font-mono text-emerald-700 font-bold text-xs">
                        Rp {(lead.budget / 1000000).toFixed(0)} Juta
                      </span>
                    </td>

                    {/* Factor Breakdown Bars */}
                    <td className="py-4 px-4 min-w-[180px]">
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between text-slate-500">
                          <span>Finansial & DBR</span>
                          <span className="font-mono font-bold text-slate-800">{lead.financialScore}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${lead.financialScore}%` }}></div>
                        </div>

                        <div className="flex justify-between text-slate-500 pt-0.5">
                          <span>Respon & Kesiapan</span>
                          <span className="font-mono font-bold text-slate-800">{lead.urgencyScore}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${lead.urgencyScore}%` }}></div>
                        </div>
                      </div>
                    </td>

                    {/* Next Action */}
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-slate-700 text-xs leading-relaxed font-medium">
                        {lead.nextAction}
                      </p>
                    </td>

                    {/* Quick WhatsApp Action */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                        >
                          Diagnostik
                        </button>
                        <a
                          href={buildWhatsAppLink(
                            lead.phone,
                            `Halo ${lead.name}, salam dari Garut Sejahtera Property. Menindaklanjuti rencana unit di ${lead.project}, kami ada update penting mengenai jadwal survei & simulasi cicilan khusus minggu ini. Boleh kami hubungi?`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/30"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Chat
                        </a>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostic Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
            
            <div className="bg-gradient-to-r from-[#0A0F1D] to-[#1E293B] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">
                  AI Lead Diagnostic 360°
                </span>
                <h3 className="font-bold text-base">{selectedLead.name}</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Indeks Skor</span>
                  <div className="text-2xl font-black text-slate-900 font-mono">{selectedLead.score}/100</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Peluang Closing</span>
                  <div className="text-sm font-bold text-emerald-600">
                    {selectedLead.score >= 85 ? 'Sangat Tinggi (>85%)' : selectedLead.score >= 70 ? 'Moderat (50-70%)' : 'Nurturing (<50%)'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Rincian Penilaian Algoritma:
                </h4>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span>Kelayakan Finansial & Rasio Utang (DBR)</span>
                      <strong className="font-mono">{selectedLead.financialScore}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedLead.financialScore}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span>Kecepatan Respon & Minat Kunjungan</span>
                      <strong className="font-mono">{selectedLead.urgencyScore}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${selectedLead.urgencyScore}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 mb-1">
                      <span>Kelengkapan Berkas KPR (KTP, NPWP, Slip Gaji)</span>
                      <strong className="font-mono">{selectedLead.documentScore}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${selectedLead.documentScore}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider block text-blue-800">
                  Rekomendasi Tindakan Terbaik:
                </span>
                <p className="leading-relaxed font-medium">
                  {selectedLead.nextAction}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Tutup
                </button>
                <a
                  href={buildWhatsAppLink(selectedLead.phone, `Halo ${selectedLead.name}, salam dari Garut Sejahtera Propertindo...`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/30"
                >
                  <Phone className="w-4 h-4" />
                  Kirim Pesan WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
