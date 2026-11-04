'use client';
import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  MessageSquare, 
  Target, 
  Calculator, 
  Building2, 
  CheckCircle2, 
  Copy, 
  Bot, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  User,
  Zap,
  Phone
} from 'lucide-react';
import { DEMO_LEADS, DEMO_PROJECTS } from '@/lib/demo-data';
import { buildWhatsAppLink, formatPhoneDisplay } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICopilotDrawer({ isOpen, onClose }: AICopilotDrawerProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'copywriter' | 'scoring' | 'matcher' | 'briefing'>('copywriter');

  // Copywriter state
  const [selectedLeadId, setSelectedLeadId] = useState(DEMO_LEADS[0].id);
  const [tone, setTone] = useState<'promo' | 'empathetic' | 'formal' | 'sunda'>('promo');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Matcher state
  const [clientSalary, setClientSalary] = useState('6500000');
  const [clientDp, setClientDp] = useState('15000000');
  const [recommendationResult, setRecommendationResult] = useState<any | null>(null);

  // Scoring state
  const [scoringLeadId, setScoringLeadId] = useState(DEMO_LEADS[0].id);
  const [scoringResult, setScoringResult] = useState<any | null>(null);

  // Executive briefing
  const [executiveBriefing, setExecutiveBriefing] = useState<string | null>(null);

  const selectedLead = DEMO_LEADS.find(l => l.id === selectedLeadId) || DEMO_LEADS[0];
  const scoringLead = DEMO_LEADS.find(l => l.id === scoringLeadId) || DEMO_LEADS[0];

  // Generate Script Handler
  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let script = '';
      const lead = selectedLead;
      const firstName = lead.full_name;

      if (tone === 'promo') {
        script = `Sampurasun ${firstName}! 🙏\n\nKabar gembira dari PT Garut Sejahtera Propertindo. Kavling favorit Anda di *${lead.project_name}* saat ini tersisa 2 unit pilihan terbaik dengan subsidi biaya akad gratis s.d. Rp 10 Juta khusus minggu ini.\n\nApakah ${firstName} berkenan jika kami jadwalkan survei show unit bersama PIC konsultan kami (Kang Dika) besok pagi atau siang? Kami siapkan simulasi cicilan resminya ya! 🏡✨`;
      } else if (tone === 'empathetic') {
        script = `Selamat siang ${firstName}, salam hangat dari Garut Sejahtera Property.\n\nKami sangat memahami bahwa memiliki rumah idaman adalah keputusan penting bagi keluarga Anda. Mengenai rencana pengambilan unit di *${lead.project_name}*, kami siap mendampingi proses pemberkasan KPR hingga serah terima kunci agar cicilan tetap ringan dan aman bagi keuangan keluarga.\n\nJika ada syarat atau kendala slip gaji/berkas yang ingin dikonsultasikan, kami siap bantu gratis tanpa komitmen. Kapan waktu yang santai untuk kami hubungi kembali via WhatsApp/telepon? 🙏`;
      } else if (tone === 'formal') {
        script = `Yth. ${firstName},\n\nMenindaklanjuti permohonan informasi unit properti di *${lead.project_name}*, manajemen PT Garut Sejahtera Propertindo menginformasikan bahwa plafon kredit KPR Bank BTN FLPP / Mandiri dengan suku bunga subsidi 5% p.a. fix siap diproses.\n\nMohon konfirmasi kesiapan dokumen dasar (KTP, NPWP, Slip Gaji 3 bulan terakhir) agar tim legal kami dapat memvalidasi kuota unit sebelum terisi konsumen lain. Terima kasih.`;
      } else {
        script = `Sampurasun ${firstName}, wilujeng siang ti Garut Sejahtera Property! 🙏\n\nKumaha damang? Mugi sehat walafiat. Kanggo kavling impian di *${lead.project_name}*, dinten ieu aya blok strategis caket taman anu nembé dibuka. Hargana masih subsidi sareng angsuran mirah pisan mung 1 jutaan per sasih.\n\nUpami aya waktos salse, mangga urang ningal lokasi sakantenan jalan-jalan sareng kulawarga dinten ieu atanapi enjing. Hatur nuhun pisan! 🌿`;
      }

      setGeneratedScript(script);
      setIsGenerating(false);
      showToast('Naskah pesan WhatsApp pintar berhasil diracik AI!', 'success');
    }, 450);
  };

  // Run AI Scoring Diagnostic
  const handleRunScoring = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const isHighPriority = scoringLead.priority === 'high';
      const isFLPP = scoringLead.budget <= 200000000;
      
      const score = isHighPriority ? 92 : 74;
      const dbrEstimate = isFLPP ? 28 : 34;

      setScoringResult({
        leadName: scoringLead.full_name,
        score,
        tier: score >= 85 ? 'Ultra Hot Prospect 🔥' : 'Warm Prospect ⚡',
        dbr: `${dbrEstimate}% (Sangat Sehat < 35%)`,
        slikStatus: 'Kolektibilitas 1 (Lancar BI Checking)',
        recommendedAction: isHighPriority 
          ? 'Kunci kavling via Tanda Jadi Rp 1,5 Juta & jadwalkan akad Bank BTN minggu ini.' 
          : 'Kirimkan perbandingan cicilan 10 vs 15 tahun dan undang survei langsung ke show unit.',
        confidence: '96.4% Analisis Kecocokan'
      });
      setIsGenerating(false);
      showToast(`Diagnostic AI untuk ${scoringLead.full_name} selesai.`, 'success');
    }, 400);
  };

  // Run AI Matcher
  const handleRunMatcher = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const salary = parseInt(clientSalary) || 5000000;
      let matchedProject = DEMO_PROJECTS[0];
      let scheme = 'KPR Subsidi FLPP Bank BTN';
      let maxPlafon = 166000000;
      let estCicilan = 'Rp 1.050.000 / bln (Fixed 20 Thn)';

      if (salary >= 12000000) {
        matchedProject = DEMO_PROJECTS[2]; // Banyuresmi Hillside
        scheme = 'KPR Komersial Mandiri / BSI';
        maxPlafon = 485000000;
        estCicilan = 'Rp 3.450.000 / bln (Bunga Promo 4.88%)';
      } else if (salary >= 7000000) {
        matchedProject = DEMO_PROJECTS[1]; // Grand Karangpawitan
        scheme = 'KPR Komersial BTN / Mandiri';
        maxPlafon = 345000000;
        estCicilan = 'Rp 2.450.000 / bln';
      }

      setRecommendationResult({
        projectName: matchedProject.name,
        unitType: matchedProject.id === 'p1' ? 'Tipe 36/60 (2 KT, 1 KM)' : matchedProject.id === 'p2' ? 'Tipe 45/72 (2 KT, 1 KM, Taman Depan/Belakang)' : 'Tipe 54/84 (Villa Asri 3 KT, Carport 2 Mobil)',
        price: maxPlafon,
        scheme,
        estCicilan,
        dbrMatch: '29.5% dari Penghasilan Bulanan (Memenuhi Standar OJK)',
        summary: `Konsumen dengan penghasilan Rp ${salary.toLocaleString('id-ID')} sangat ideal mengambil unit di ${matchedProject.name} dengan resiko kredit macet mendekati 0%.`
      });
      setIsGenerating(false);
      showToast('Rekomendasi unit properti berhasil dihitung AI.', 'success');
    }, 400);
  };

  // Generate Executive Briefing
  const handleGenerateBriefing = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setExecutiveBriefing(
        `RINGKASAN EKSEKUTIF DIREKSI — PT GARUT SEJAHTERA PROPERTINDO\nDitujukan Kepada: Direktur Utama MUHAMMAD RIZAL\nTanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}\n\n1. KINERJA PENJUALAN & OMZET:\n• Total Akumulasi Closing: Rp 677.000.000 (3 Unit Akad Resmi).\n• Booking Baru Masuk: 8 Unit dalam status aktif (Dana Escrow Terverifikasi: Rp 14.000.000).\n• Prospek Masuk Terbaru: 5 Calon Konsumen Prioritas (Bpk. Hasanudin, Bpk. Nugraha, Ibu Siti Patonah, Om Azhar Pratama, Neng Anggi Julianti).\n\n2. REKOMENDASI STRATEGIS HARI INI:\n• Percepat pemberkasan KPR FLPP Ibu Siti Patonah di Bank BTN KC Garut untuk mencapai target serah terima bulan ini.\n• Konfirmasi kehadiran survei Bpk. Hasanudin & Bpk. Nugraha di kavling Blok A-08 dan Blok B-05.\n• Stok unit kavling subsidi Tipe 36/60 tersisa 18 unit; disarankan membuka kampanye promo bebas biaya BPHTB untuk mempercepat sold-out tahap 1.\n\nStatus Operasional: SISTEM STABIL & TARGET TERCAPAI 85%.`
      );
      setIsGenerating(false);
      showToast('Briefing Eksekutif Direksi berhasil disusun!', 'success');
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn bg-slate-900/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slideLeft overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-[#0A0F1D] via-[#0F172A] to-[#1E293B] text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-tight">HOMIQ AI Co-Pilot</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  v3.0 Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Asisten Cerdas Penjualan & Keputusan Properti Real-Time
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 py-2 gap-1.5 shrink-0 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('copywriter')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'copywriter' 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            WA Copywriter
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'scoring' 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Lead Scoring AI
          </button>

          <button
            onClick={() => setActiveTab('matcher')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'matcher' 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Unit Matcher
          </button>

          <button
            onClick={() => setActiveTab('briefing')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'briefing' 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Briefing Direksi
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">

          {/* TAB 1: COPYWRITER */}
          {activeTab === 'copywriter' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900 leading-relaxed">
                  Pilih calon pembeli dan gaya bahasa pesan. AI akan menyusun naskah penawaran persuasif yang siap dikirim langsung ke WhatsApp konsumen dalam 1 klik.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilih Calon Pembeli / Prospek
                </label>
                <select 
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DEMO_LEADS.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.full_name} • {l.project_name} ({formatPhoneDisplay(l.phone)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Gaya Bahasa & Strategi Closing
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'promo', label: 'Urgent Promo & Diskon Biaya Akad' },
                    { id: 'empathetic', label: 'Empati & Konsultasi Cicilan Aman' },
                    { id: 'formal', label: 'Resmi Perbankan BTN Subsidi' },
                    { id: 'sunda', label: 'Bahasa Sunda Akrab & Santun' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition font-medium text-[11px] leading-tight ${
                        tone === t.id 
                          ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateScript}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                {isGenerating ? 'AI Sedang Meracik Pesan...' : 'Generate Naskah WhatsApp AI'}
              </button>

              {generatedScript && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                      Draf Pesan Siap Kirim:
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedScript);
                        showToast('Teks berhasil disalin ke clipboard!', 'success');
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Salin
                    </button>
                  </div>

                  <div className="text-xs font-mono bg-white p-3.5 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed shadow-inner">
                    {generatedScript}
                  </div>

                  <a
                    href={buildWhatsAppLink(selectedLead.phone, generatedScript)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/30 transition"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Langsung ke WhatsApp ({formatPhoneDisplay(selectedLead.phone)})
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LEAD SCORING */}
          {activeTab === 'scoring' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Algoritma AI menganalisis kelayakan kredit, rasio angsuran (DBR), kesiapan dokumen, dan estimasi probabilitas approval KPR di Bank Rekanan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilih Data Prospek
                </label>
                <select 
                  value={scoringLeadId}
                  onChange={(e) => setScoringLeadId(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DEMO_LEADS.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.full_name} • Minat: {l.project_name} (Rp {(l.budget / 1000000).toFixed(0)} Juta)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleRunScoring}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition disabled:opacity-50"
              >
                <Target className="w-4 h-4 text-white" />
                {isGenerating ? 'Menganalisis Parameter Kredit...' : 'Jalankan Diagnostik AI'}
              </button>

              {scoringResult && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{scoringResult.leadName}</h4>
                      <p className="text-[11px] text-slate-500">{scoringResult.confidence}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-blue-600">{scoringResult.score}/100</span>
                      <p className="text-[10px] font-bold text-emerald-600">{scoringResult.tier}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Rasio Beban Utang</span>
                      <strong className="text-slate-800 text-[11px]">{scoringResult.dbr}</strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Riwayat OJK / SLIK</span>
                      <strong className="text-emerald-700 text-[11px]">{scoringResult.slikStatus}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                      Rekomendasi Tindakan Terbaik (Next Best Action):
                    </span>
                    <p className="text-xs text-blue-950 leading-relaxed font-medium">
                      {scoringResult.recommendedAction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UNIT MATCHER */}
          {activeTab === 'matcher' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                <Calculator className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Masukkan profil finansial calon pembeli. AI akan menghitung plafon maksimal dan merekomendasikan unit serta kavling yang paling cocok dengan rasio aman.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Gaji Pokok Bersih (THP)
                  </label>
                  <input
                    type="number"
                    value={clientSalary}
                    onChange={(e) => setClientSalary(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: 6500000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kesiapan Dana DP / Tunai
                  </label>
                  <input
                    type="number"
                    value={clientDp}
                    onChange={(e) => setClientDp(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: 15000000"
                  />
                </div>
              </div>

              <button
                onClick={handleRunMatcher}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                {isGenerating ? 'Menghitung Plafon & Simulasi...' : 'Hitung Rekomendasi Unit Terbaik'}
              </button>

              {recommendationResult && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Unit Rekomendasi Utama</span>
                      <h4 className="font-extrabold text-sm text-slate-900">{recommendationResult.projectName}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      Rp {(recommendationResult.price / 1000000).toFixed(0)} Juta
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-600"><strong>Tipe Bangunan:</strong> {recommendationResult.unitType}</p>
                    <p className="text-slate-600"><strong>Skema KPR:</strong> {recommendationResult.scheme}</p>
                    <p className="text-slate-600"><strong>Estimasi Cicilan:</strong> <span className="font-mono text-emerald-700 font-bold">{recommendationResult.estCicilan}</span></p>
                    <p className="text-slate-600"><strong>Analisis DBR:</strong> {recommendationResult.dbrMatch}</p>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                    {recommendationResult.summary}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BRIEFING DIREKSI */}
          {activeTab === 'briefing' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-900 leading-relaxed">
                  Menghasilkan ringkasan eksekutif harian komprehensif yang dirancang khusus untuk Direktur Utama <strong>MUHAMMAD RIZAL</strong> untuk memantau arus kas, antrean KPR, dan mitigasi kendala operasional.
                </p>
              </div>

              <button
                onClick={handleGenerateBriefing}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 transition disabled:opacity-50"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                {isGenerating ? 'Menyusun Laporan Direksi...' : 'Buat Executive Briefing Hari Ini'}
              </button>

              {executiveBriefing && (
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-amber-400 font-bold tracking-wider">
                      CONFIDENTIAL • DIRECTORS SUMMARY
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(executiveBriefing);
                        showToast('Laporan Direksi disalin!', 'success');
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Salin Teks
                    </button>
                  </div>
                  <pre className="whitespace-pre-line leading-relaxed text-[11px] text-slate-300 font-sans">
                    {executiveBriefing}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Ready • Latency ~0.3s</span>
          </div>
          <span className="font-semibold text-slate-700">HOMIQ PropTech Engine</span>
        </div>
      </div>
    </div>
  );
}
