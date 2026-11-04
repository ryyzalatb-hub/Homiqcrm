'use client';
import React, { useState } from 'react';
import { DEMO_LEADS } from '@/lib/demo-data';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Smartphone, 
  User, 
  Phone, 
  Building2, 
  Calendar, 
  CheckCheck,
  RotateCcw,
  Zap,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Bot
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, formatPhoneDisplay } from '@/lib/whatsapp';

interface DripTrigger {
  id: string;
  title: string;
  timing: string;
  targetCount: number;
  openRate: string;
  responseRate: string;
  status: 'ACTIVE' | 'PAUSED';
  template: string;
}

const DRIP_WORKFLOWS: DripTrigger[] = [
  {
    id: 'drip-1',
    title: 'H+1 Pasca Survei Lokasi',
    timing: 'Tepat 24 Jam setelah kunjungan show unit',
    targetCount: 14,
    openRate: '94.2%',
    responseRate: '68.5%',
    status: 'ACTIVE',
    template: 'Halo {{nama}}, terima kasih atas kunjungan Anda kemarin ke {{proyek}}. Bagaimana kesan Anda terhadap tipe {{unit}}? Khusus minggu ini, kami memiliki subsidi DP & bebas biaya BPHTB senilai Rp 15 Juta. Apakah ada pertanyaan seputar skema angsuran yang bisa kami bantu?'
  },
  {
    id: 'drip-2',
    title: 'Reminder Deadline Berkas KPR (H-3)',
    timing: '3 Hari sebelum batas waktu penyerahan dokumen analis bank',
    targetCount: 8,
    openRate: '98.0%',
    responseRate: '82.1%',
    status: 'ACTIVE',
    template: 'Pemberitahuan Resmi: Yth. {{nama}}, batas penyerahan berkas KPR Bank BTN untuk unit {{unit}} tersisa 3 hari lagi. Pastikan Surat Keterangan Kerja & Rekening Koran 3 bulan terakhir telah diunggah ke Portal Mandiri agar kuota subsidi FLPP Anda tidak hangus.'
  },
  {
    id: 'drip-3',
    title: 'Apresiasi Ulang Tahun Konsumen',
    timing: 'Pukul 08:30 WIB pada hari ulang tahun calon pembeli',
    targetCount: 5,
    openRate: '96.5%',
    responseRate: '54.0%',
    status: 'ACTIVE',
    template: 'Selamat Ulang Tahun {{nama}}! Direksi dan seluruh manajemen PT Garut Sejahtera Propertindo mendoakan kesehatan dan keberkahan untuk Anda sekeluarga. Sebagai hadiah istimewa, nikmati voucher interior furnished senilai Rp 10.000.000 untuk booking unit {{proyek}}.'
  },
  {
    id: 'drip-4',
    title: 'Milestone Progress Konstruksi (50% Atap Terpasang)',
    timing: 'Otomatis saat fisik bangunan mencapai 50% di sistem',
    targetCount: 19,
    openRate: '99.1%',
    responseRate: '71.0%',
    status: 'ACTIVE',
    template: 'Kabar Gembira: Yth. {{nama}}, pembangunan hunian Anda di {{proyek}} {{unit}} kini telah mencapai 50% (Rangka atap baja ringan & dinding bata terpasang). Dokumentasi foto dan sertifikasi kendali mutu dapat Anda pantau langsung di Portal Konsumen.'
  }
];

export default function WhatsAppCenterPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'drip' | 'manual'>('drip');
  
  // Drip simulator states
  const [workflows, setWorkflows] = useState<DripTrigger[]>(DRIP_WORKFLOWS);
  const [isSimulatingDrip, setIsSimulatingDrip] = useState(false);
  const [dripLogs, setDripLogs] = useState<Array<{ time: string; recipient: string; title: string; status: string }>>([
    { time: '14:20:11', recipient: 'Bapak Hasanudin (082215269402)', title: 'H+1 Pasca Survei Lokasi', status: 'READ' },
    { time: '14:18:45', recipient: 'Bapak Nugraha (083138320817)', title: 'Reminder Deadline Berkas KPR', status: 'READ' },
    { time: '13:55:02', recipient: 'Ibu Siti patonah (083857061667)', title: 'H+1 Pasca Survei Lokasi', status: 'DELIVERED' },
  ]);

  // Manual Form State
  const [selectedLeadId, setSelectedLeadId] = useState<string>(DEMO_LEADS[0].id);
  const [recipientName, setRecipientName] = useState(DEMO_LEADS[0].full_name);
  const [recipientPhone, setRecipientPhone] = useState(DEMO_LEADS[0].phone);
  const [projectName, setProjectName] = useState(DEMO_LEADS[0].project_name);
  const [customMessage, setCustomMessage] = useState(
    `Halo ${DEMO_LEADS[0].full_name}, salam hangat dari PT Garut Sejahtera Propertindo.\n\n` +
    `Kami ingin mengonfirmasi minat Anda terhadap unit ${DEMO_LEADS[0].project_name}. Saat ini tersisa beberapa kavling siap huni dengan promo subsidi DP & bebas biaya BPHTB.\n\n` +
    `Kapan sekiranya waktu luang Anda untuk kami jadwalkan survei ke lokasi perumahan?`
  );

  const handleSelectLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    const lead = DEMO_LEADS.find(l => l.id === leadId);
    if (lead) {
      setRecipientName(lead.full_name);
      setRecipientPhone(lead.phone);
      setProjectName(lead.project_name);
      setCustomMessage(
        `Halo ${lead.full_name}, salam hangat dari PT Garut Sejahtera Propertindo.\n\n` +
        `Kami ingin mengonfirmasi minat Anda terhadap unit ${lead.project_name}. Saat ini tersisa beberapa kavling siap huni dengan promo subsidi DP & bebas biaya BPHTB.\n\n` +
        `Kapan sekiranya waktu luang Anda untuk kami jadwalkan survei ke lokasi perumahan?`
      );
      showToast(`Data prospek ${lead.full_name} disinkronkan.`, 'info');
    }
  };

  const handleRunDripSimulation = () => {
    setIsSimulatingDrip(true);
    showToast('Menjalankan engine otomasi WhatsApp Drip...', 'info');

    setTimeout(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      const newEntries = [
        { time: timeStr, recipient: 'Om Azhar pratama (0895704969810)', title: 'H+1 Pasca Survei Lokasi', status: 'READ' },
        { time: timeStr, recipient: 'Neng Anggi julianti (08886066919)', title: 'Reminder Deadline Berkas KPR', status: 'DELIVERED' }
      ];

      setDripLogs(prev => [...newEntries, ...prev]);
      setIsSimulatingDrip(false);
      showToast('Otomasi drip campaign berhasil disalurkan ke 5 prospek!', 'success');
    }, 1500);
  };

  const handleSendManual = () => {
    const link = buildWhatsAppLink(recipientPhone, customMessage);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-amber-500/25 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
              CENTANG BIRU VERIFIED &bull; OFFICIAL API ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            WhatsApp Marketing & Automation Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Automated drip campaign terjadwal H+1 pasca survei, pengingat berkas KPR, serta engine pesan personal interaktif.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1.5 rounded-2xl bg-[#070B16] border border-[#1C2640] shrink-0">
          <button
            onClick={() => setActiveTab('drip')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'drip'
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Automated Drip Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'manual'
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Kirim Pesan Manual</span>
          </button>
        </div>
      </div>

      {/* Telemetry Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Pesan Terkirim Bulan Ini', value: '1.420', sub: '99.4% Delivery Rate', icon: Send, color: 'text-emerald-400' },
          { label: 'Tingkat Keterbacaan (Read)', value: '91.2%', sub: 'Centang Biru Aktif', icon: CheckCheck, color: 'text-blue-400' },
          { label: 'Lead Response Rate', value: '46.8%', sub: 'Tingkat Balasan Prospek', icon: TrendingUp, color: 'text-amber-400' },
          { label: 'Active Cron Schedules', value: '4 Workflow', sub: 'Otomasi Server Siap', icon: Bot, color: 'text-purple-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 rounded-2xl bg-[#0D1426] border border-[#1C2640] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-slate-400 font-mono uppercase">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white font-display block">
                {stat.value}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                {stat.sub}
              </span>
            </div>
          );
        })}
      </div>

      {activeTab === 'drip' ? (
        /* DRIP AUTOMATION TAB */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Workflows List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Alur Kampanye Otomatis (Drip Triggers)</span>
              </h3>
              <button
                onClick={handleRunDripSimulation}
                disabled={isSimulatingDrip}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 transition flex items-center gap-1.5"
              >
                {isSimulatingDrip ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Jalankan Simulasi Drip</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3">
              {workflows.map((wf) => (
                <div 
                  key={wf.id} 
                  className="p-5 rounded-2xl bg-[#0B1120] border border-amber-500/20 hover:border-amber-500/40 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-white font-display">
                          {wf.title}
                        </h4>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          {wf.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{wf.timing}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-right text-xs shrink-0 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Open Rate</span>
                        <span className="font-bold text-blue-400">{wf.openRate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Response</span>
                        <span className="font-bold text-emerald-400">{wf.responseRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Template Preview */}
                  <div className="p-3 rounded-xl bg-[#070B16] border border-[#19243C] text-xs text-slate-300 font-sans leading-relaxed">
                    <p className="italic">{wf.template}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Log */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Log Pengiriman Real-Time</span>
            </h3>

            <div className="p-4 rounded-2xl bg-[#0B1120] border border-[#1C2640] space-y-3">
              {dripLogs.map((log, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#070B16] border border-[#19243C] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500">{log.time} WIB</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-blue-400">
                      <CheckCheck className="w-3.5 h-3.5" />
                      {log.status}
                    </span>
                  </div>
                  <strong className="block text-white truncate">{log.recipient}</strong>
                  <span className="text-[11px] text-amber-300/80 block">{log.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* MANUAL WHATSAPP SENDER TAB */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-white font-display">Pilih Prospek Tujuan:</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {DEMO_LEADS.slice(0, 5).map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => handleSelectLead(lead.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    selectedLeadId === lead.id
                      ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                      : 'bg-[#0D1426] border-[#1C2640] text-slate-400 hover:text-white'
                  }`}
                >
                  <div>
                    <strong className="text-xs font-bold text-white block">{lead.full_name}</strong>
                    <span className="text-[10px] font-mono text-slate-400 block">{lead.phone}</span>
                    <span className="text-[10px] text-amber-300/80 mt-0.5 block">{lead.project_name}</span>
                  </div>
                  {selectedLeadId === lead.id && (
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-amber-500/25 space-y-4">
              <h3 className="text-sm font-bold text-white font-display">Editor Percakapan WhatsApp</h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Nama Penerima</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Nomor WhatsApp</label>
                  <input
                    type="text"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-mono text-xs block mb-1">Isi Pesan Siap Kirim</label>
                <textarea
                  rows={6}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full bg-[#070B16] border border-[#1C2640] rounded-2xl p-4 text-xs text-white leading-relaxed focus:border-amber-400 outline-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(customMessage);
                    showToast('Teks pesan disalin ke clipboard.', 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Teks</span>
                </button>
                <button
                  onClick={handleSendManual}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 hover:brightness-110 transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim via WhatsApp (wa.me)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
