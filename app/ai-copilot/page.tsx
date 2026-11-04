'use client';
import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  MessageSquare, 
  Target, 
  Calculator, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Copy, 
  Zap, 
  RefreshCw,
  Phone,
  ArrowRight,
  Lightbulb,
  FileText
} from 'lucide-react';
import { DEMO_LEADS, DEMO_PROJECTS, DEMO_KPI } from '@/lib/demo-data';
import { buildWhatsAppLink, formatPhoneDisplay } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';

export default function AICopilotPage() {
  const { showToast } = useToast();
  const [selectedLeadId, setSelectedLeadId] = useState(DEMO_LEADS[0].id);
  const [tone, setTone] = useState<'urgent' | 'consultative' | 'flpp' | 'sunda'>('urgent');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom prompt input
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      role: 'assistant',
      text: 'Halo! Saya HOMIQ AI Co-Pilot untuk PT Garut Sejahtera Propertindo. Ada yang bisa saya bantu hari ini? Misalnya: simulasi kelayakan KPR, rekomendasi penawaran untuk Bapak Hasanudin / Om Azhar Pratama, atau draft broadcast WhatsApp.'
    }
  ]);

  const selectedLead = DEMO_LEADS.find(l => l.id === selectedLeadId) || DEMO_LEADS[0];

  const handleGeneratePitch = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let script = '';
      const name = selectedLead.full_name;
      const proj = selectedLead.project_name;

      if (tone === 'urgent') {
        script = `Halo ${name}, kabar gembira dari Garut Sejahtera Propertindo! 🌟\n\nKavling idaman Anda di *${proj}* sedang dalam promo subsidi uang muka & bebas biaya notaris hingga akhir pekan ini. Kuota tersisa hanya 2 unit terbaik. Apakah ada waktu luang besok untuk kami temani survei unit langsung ke lokasi?`;
      } else if (tone === 'consultative') {
        script = `Selamat siang ${name}, semoga dalam keadaan sehat selalu.\n\nMelanjutkan pembicaraan mengenai rencana hunian di *${proj}*, kami telah menghitungkan estimasi angsuran yang paling aman untuk budget keluarga Anda. Jika berkenan, kami siap kirimkan dokumen simulasi PDF-nya via WhatsApp ini.`;
      } else if (tone === 'flpp') {
        script = `Yth. ${name}, informasi resmi program KPR Sejahtera FLPP BTN untuk *${proj}*:\n\n• Suku Bunga: 5.0% Flat sampai lunas\n• Angsuran: Mulai Rp 1.050.000 / bulan\n• DP Mulai 1% & Subsidi Bantuan Uang Muka (SBUM)\n\nKami siap mendampingi kelengkapan berkas slip gaji Anda sampai serah terima kunci. 🙏`;
      } else {
        script = `Sampurasun ${name}, wilujeng siang ti Garut Sejahtera Property! 🙏\n\nNgemutkeun kavling asri di *${proj}*, dinten ieu aya blok hoki caket taman anu nembe dibuka. Peryogi simkuring kintunkeun video show unit sareng denahna ka nomer ieu? Hatur nuhun.`;
      }

      setGeneratedMessage(script);
      setIsGenerating(false);
      showToast('Pesan WhatsApp otomatis berhasil dibuat oleh AI!', 'success');
    }, 400);
  };

  const handleSendCustomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    const userText = customPrompt;
    setAiChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setCustomPrompt('');
    setIsGenerating(true);

    setTimeout(() => {
      let responseText = '';
      const lower = userText.toLowerCase();

      if (lower.includes('hasanudin') || lower.includes('36/60')) {
        responseText = `Analisis untuk Bapak Hasanudin (0822-1526-9402):\n• Minat: Bumi Cimanuk Asri (Tipe 36/60 Subsidi - Rp 166 Juta).\n• Status: Sangat siap akad kredit FLPP BTN. DBR diperkirakan di bawah 28%.\n• Tindakan Prioritas: Segera kunci kavling Blok A-08 dan minta fotokopi KTP & slip gaji 3 bulan terakhir.`;
      } else if (lower.includes('nugraha') || lower.includes('45/72')) {
        responseText = `Analisis untuk Bapak Nugraha (0831-3832-0817):\n• Minat: Grand Karangpawitan (Tipe 45/72 Komersial - Rp 345 Juta).\n• Rekomendasi: Skema KPR BTN Komersial dengan DP 10% (Rp 34,5 Juta) atau angsuran bertahap developer 6 bulan.\n• Tindakan Prioritas: Siapkan show unit kavling Blok B-05 untuk survei besok siang.`;
      } else if (lower.includes('siti patonah') || lower.includes('patonah')) {
        responseText = `Analisis untuk Ibu Siti Patonah (0838-5706-1667):\n• Status Booking: Kavling Blok A-07 Bumi Cimanuk Asri.\n• Berkas yang dibutuhkan: Formulir pemohon KPR FLPP, SPT Tahunan PPh 21, dan surat keterangan belum memiliki rumah dari kelurahan.\n• Hubungi PIC Marketing: Kang Fajar Ramadhan untuk penjemputan berkas.`;
      } else if (lower.includes('direktur') || lower.includes('rizal')) {
        responseText = `Sistem terhubung langsung ke profil Direktur Utama MUHAMMAD RIZAL. Saat ini 8 follow-up aktif berjalan, arus kas masuk booking fee mencapai Rp 14.000.000, dan tingkat konversi prospek berada di angka 85% dari target kuartal ini.`;
      } else {
        responseText = `Berdasarkan data operasional HOMIQ, 3 proyek (Bumi Cimanuk Asri, Grand Karangpawitan, Banyuresmi Hillside) memiliki total 64 unit tersedia. Prioritaskan follow-up leads tier 'Ultra Hot' hari ini untuk mempercepat target closing bulan ini.`;
      }

      setAiChatHistory(prev => [...prev, { role: 'assistant', text: responseText }]);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="crm-card bg-gradient-to-r from-[#0A0F1D] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                HOMIQ AI ENGINE v3.0
              </span>
              <span className="text-xs text-slate-400 font-medium">Enterprise Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              AI Property Assistant & Co-Pilot
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Otomasi cerdas untuk meracik naskah closing WhatsApp, menganalisis kelayakan kredit perbankan, dan memberikan rekomendasi strategis bagi tim penjualan PT Garut Sejahtera Propertindo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <span className="block text-xs text-slate-400 font-mono">Total Prospek AI</span>
              <strong className="text-lg font-bold text-white">50 Leads</strong>
            </div>
            <div className="p-3 bg-blue-900/40 rounded-xl border border-blue-700/50 text-center">
              <span className="block text-xs text-blue-300 font-mono">Akurasi Rekomendasi</span>
              <strong className="text-lg font-bold text-blue-400">96.8%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Studio & Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Instant WhatsApp Pitch Generator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="crm-card p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">AI WhatsApp Copywriter</h2>
                  <p className="text-xs text-slate-500">Pilih prospek dan biarkan AI meracik penawaran personal</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Calon Pembeli
                </label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DEMO_LEADS.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.full_name} • {l.project_name} ({formatPhoneDisplay(l.phone)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tujuan & Pendekatan Closing
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'urgent', title: 'Urgent Promo', desc: 'Diskon biaya akad & kuota terbatas' },
                    { id: 'consultative', title: 'Konsultasi Finansial', desc: 'Simulasi cicilan ramah keluarga' },
                    { id: 'flpp', title: 'Resmi KPR FLPP', desc: 'Suku bunga 5% flat & syarat mudah' },
                    { id: 'sunda', title: 'Bahasa Sunda', desc: 'Pendekatan ramah kearifan lokal Garut' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id as any)}
                      className={`p-3 rounded-xl text-left border transition ${
                        tone === t.id 
                          ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                      }`}
                    >
                      <strong className="block text-xs">{t.title}</strong>
                      <span className="text-[10px] text-slate-500 font-normal leading-tight">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGeneratePitch}
                disabled={isGenerating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                {isGenerating ? 'AI Sedang Meracik...' : 'Buat Naskah WhatsApp Personalisasi'}
              </button>

              {generatedMessage && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Hasil Draf Pesan:
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedMessage);
                        showToast('Teks berhasil disalin!', 'success');
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Salin Pesan
                    </button>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-line leading-relaxed shadow-sm">
                    {generatedMessage}
                  </div>

                  <a
                    href={buildWhatsAppLink(selectedLead.phone, generatedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/30 transition"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Langsung ke WhatsApp {selectedLead.full_name} ({formatPhoneDisplay(selectedLead.phone)})
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Interactive AI Consultation Console */}
        <div className="lg:col-span-6 space-y-6">
          <div className="crm-card p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[580px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">Console Konsultasi Interaktif</h2>
                  <p className="text-xs text-slate-500">Tanyakan apapun seputar prospek, KPR, dan strategi unit</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            {/* Chat stream */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {aiChatHistory.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 text-xs ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {chat.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm ${
                      chat.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none font-sans'
                    }`}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex gap-2 items-center text-xs text-slate-500 italic p-2">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                  HOMIQ AI sedang menganalisis database properti...
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="pt-2 pb-3 shrink-0 flex gap-1.5 overflow-x-auto text-[11px]">
              <button
                type="button"
                onClick={() => setCustomPrompt('Analisis prospek Bapak Hasanudin untuk unit 36/60')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition"
              >
                🔍 Cek Bapak Hasanudin
              </button>
              <button
                type="button"
                onClick={() => setCustomPrompt('Bagaimana kesiapan berkas KPR Ibu Siti Patonah?')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition"
              >
                📄 KPR Ibu Siti Patonah
              </button>
              <button
                type="button"
                onClick={() => setCustomPrompt('Ringkas update untuk Direktur Utama MUHAMMAD RIZAL')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition"
              >
                👔 Update Direksi
              </button>
            </div>

            {/* Input form */}
            <form onSubmit={handleSendCustomPrompt} className="pt-2 border-t border-slate-100 shrink-0 flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ketik pertanyaan untuk AI (misal: 'Rekomendasi unit gaji 5 juta')..."
                className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!customPrompt.trim() || isGenerating}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-40 flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
