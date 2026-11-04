'use client';
import React, { useState, useEffect } from 'react';
import { DEMO_LEADS, DEMO_PROJECTS } from '@/lib/demo-data';
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
  FileCheck2,
  FileText,
  BadgeCheck,
  MapPin,
  ExternalLink,
  Info
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, WhatsAppTemplates, formatPhoneDisplay } from '@/lib/whatsapp';

type TemplateKey = 'followUp' | 'siteVisit' | 'booking' | 'kprPortal' | 'sp3k';

export default function WhatsAppCenterPage() {
  const { showToast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('followUp');
  const [selectedLeadId, setSelectedLeadId] = useState<string>(DEMO_LEADS[0].id);

  // Form custom state
  const [recipientName, setRecipientName] = useState(DEMO_LEADS[0].full_name);
  const [recipientPhone, setRecipientPhone] = useState(DEMO_LEADS[0].phone);
  const [projectName, setProjectName] = useState(DEMO_LEADS[0].project_name);
  const [unitCode, setUnitCode] = useState('Blok B-04');
  const [bookingFee, setBookingFee] = useState(1500000);
  const [marketingName, setMarketingName] = useState('Kang Dika Pratama');
  const [portalUrl, setPortalUrl] = useState('https://homiq-crm.id/portal-kpr/cust-101');
  const [visitSchedule, setVisitSchedule] = useState('Sabtu ini pukul 10:00 WIB');

  // Custom text override
  const [customMessage, setCustomMessage] = useState('');
  const [isCustomEdited, setIsCustomEdited] = useState(false);

  // Handle selecting lead from list
  const handleSelectLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    const lead = DEMO_LEADS.find(l => l.id === leadId);
    if (lead) {
      setRecipientName(lead.full_name);
      setRecipientPhone(lead.phone);
      setProjectName(lead.project_name);
      setMarketingName(lead.assigned_to_name);
      setIsCustomEdited(false);
      showToast(`Data prospek "${lead.full_name}" dimuat ke formulir WhatsApp`, 'info');
    }
  };

  // Generate Message Text based on selected template
  const getGeneratedMessage = () => {
    switch (selectedTemplate) {
      case 'followUp':
        return `Halo Bapak/Ibu ${recipientName}, salam hangat dari ${marketingName} (Garut Sejahtera Property) 🙏

Kami ingin menanyakan kabar dan kelanjutan rencana hunian impian Anda di perumahan *${projectName}*. 

Saat ini masih tersedia unit favorit pilihan dengan promo subsidi DP dan bebas biaya notaris khusus bulan ini. Apakah ada hal yang ingin ditanyakan terkait simulasi angsuran atau denah unit? Kami siap bantu dengan senang hati 😊`;

      case 'siteVisit':
        return `Halo Bapak/Ibu ${recipientName}, salam dari perumahan *${projectName}* 🏡

Kami mengundang Bapak/Ibu untuk survei lokasi langsung dan meninjau unit rumah contoh serta progres pembangunan fasilitas lingkungan (${visitSchedule}).

📍 *Titik Temu*: Kantor Pemasaran ${projectName} (One Gate System)
Google Maps: https://maps.app.goo.gl/homiq-demo

Kira-kira apakah jadwal tersebut cocok untuk Bapak/Ibu? Konfirmasi bisa dibalas langsung ke pesan ini. Terima kasih! 🙏`;

      case 'booking':
        const feeStr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(bookingFee);
        return `Selamat Bapak/Ibu ${recipientName}! 🎉

Pemesanan unit kavling *${unitCode}* di perumahan *${projectName}* telah berhasil tercatat di sistem kami dengan tanda jadi sebesar *${feeStr}*.

Kavling Anda kini berstatus *BOOKED* dan terkunci di masterplan kami. Tahap berikutnya adalah verifikasi berkas persyaratan KPR/administrasi. Tim kami siap mendampingi hingga serah terima kunci. Terima kasih atas kepercayaannya! 🤝`;

      case 'kprPortal':
        return `Halo Bapak/Ibu ${recipientName}, 

Untuk mempermudah dan mempercepat proses pengajuan KPR unit *${unitCode}* di *${projectName}*, kami telah menyiapkan portal unggah dokumen mandiri yang aman:

👉 *Link Unggah Berkas KPR*:
${portalUrl}

*Persyaratan yang dibutuhkan:*
1. Foto KTP Pemohon & Pasangan
2. Kartu Keluarga (KK)
3. NPWP Pribadi
4. Slip Gaji 3 Bulan Terakhir
5. Rekening Koran 3 Bulan

Bapak/Ibu cukup membuka link di atas melalui HP untuk langsung mengunggah foto dokumen. Jika ada kendala, tim kami siap memandu via chat ini 🙏`;

      case 'sp3k':
        return `Kabar Gembira Bapak/Ibu ${recipientName}! 🎊🎉

Surat Penegasan Persetujuan Penyediaan Kredit (*SP3K*) dari Bank BTN untuk unit *${unitCode}* perumahan *${projectName}* telah RESMI TERBIT dan disetujui!

*Ringkasan Persetujuan:*
• Plafon KPR: Disetujui Penuh
• Skema: KPR Subsidi FLPP (Bunga 5% Tetap 20 Tahun)
• Agenda Selanjutnya: Penandatanganan Akad Kredit di Kantor Notaris

Tim legal kami akan segera menghubungi untuk konfirmasi berkas asli yang perlu dibawa saat penandatanganan akad. Selamat selangkah lagi menuju rumah impian Anda! 🏡✨`;

      default:
        return '';
    }
  };

  // Sync default template message when template or params change (unless manually typed)
  useEffect(() => {
    if (!isCustomEdited) {
      setCustomMessage(getGeneratedMessage());
    }
  }, [selectedTemplate, recipientName, recipientPhone, projectName, unitCode, bookingFee, marketingName, portalUrl, visitSchedule, isCustomEdited]);

  const activeMessageText = isCustomEdited ? customMessage : getGeneratedMessage();
  const waUrl = buildWhatsAppLink(recipientPhone, activeMessageText);

  const handleCopyMessage = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(activeMessageText);
    }
    showToast('Teks pesan WhatsApp berhasil disalin ke clipboard!', 'success');
  };

  const handleSendWA = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast(`Membuka WhatsApp Web / App untuk ${recipientName}...`, 'success');
  };

  const handleResetTemplate = () => {
    setIsCustomEdited(false);
    setCustomMessage(getGeneratedMessage());
    showToast('Pesan dikembalikan ke template awal.', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                Click-to-WA Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Format Standar Indonesia: <strong>+628...</strong>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              WhatsApp Marketing Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kirim pesan follow-up personal, undangan survei lokasi, link portal KPR mandiri, dan konfirmasi booking terformat resmi tanpa repot mengetik ulang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleSendWA}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-sm shadow-emerald-600/30 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Buka Chat WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Controls (Left) & Mobile Mockup Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form & Template Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Template Selector Tabs */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Pilih Skenario Percakapan
              </label>
              <span className="text-[11px] text-slate-400 font-mono">5 Template Siap Pakai</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => { setSelectedTemplate('followUp'); setIsCustomEdited(false); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition text-left ${
                  selectedTemplate === 'followUp'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-80 font-mono">01. Prospek Baru</span>
                Follow-up Minat
              </button>

              <button
                onClick={() => { setSelectedTemplate('siteVisit'); setIsCustomEdited(false); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition text-left ${
                  selectedTemplate === 'siteVisit'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-80 font-mono">02. Kunjungan</span>
                Undangan Survei
              </button>

              <button
                onClick={() => { setSelectedTemplate('booking'); setIsCustomEdited(false); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition text-left ${
                  selectedTemplate === 'booking'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-80 font-mono">03. Booking</span>
                Tanda Jadi Unit
              </button>

              <button
                onClick={() => { setSelectedTemplate('kprPortal'); setIsCustomEdited(false); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition text-left ${
                  selectedTemplate === 'kprPortal'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-80 font-mono">04. Berkas KPR</span>
                Link Portal Upload
              </button>

              <button
                onClick={() => { setSelectedTemplate('sp3k'); setIsCustomEdited(false); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition text-left col-span-2 sm:col-span-2 ${
                  selectedTemplate === 'sp3k'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <span className="block text-[10px] opacity-80 font-mono">05. Akad Kredit (Bank Approved)</span>
                Persetujuan SP3K Bank &amp; Persiapan Akad
              </button>
            </div>
          </div>

          {/* Recipient & Data Parameters */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Parameter Calon Pembeli &amp; Proyek</h3>
              <select
                value={selectedLeadId}
                onChange={(e) => handleSelectLead(e.target.value)}
                className="text-xs bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1 text-blue-800 font-semibold focus:outline-none"
              >
                <option value="">Muat Data dari Prospek Database</option>
                {DEMO_LEADS.map(l => (
                  <option key={l.id} value={l.id}>{l.full_name} ({l.project_name})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Calon Pembeli</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => { setRecipientName(e.target.value); setIsCustomEdited(false); }}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => { setRecipientPhone(e.target.value); setIsCustomEdited(false); }}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Proyek Perumahan</label>
                <select
                  value={projectName}
                  onChange={(e) => { setProjectName(e.target.value); setIsCustomEdited(false); }}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                >
                  {DEMO_PROJECTS.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">PIC Marketing Pengirim</label>
                <input
                  type="text"
                  value={marketingName}
                  onChange={(e) => { setMarketingName(e.target.value); setIsCustomEdited(false); }}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Contextual Extra Inputs */}
            {selectedTemplate === 'booking' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">Unit Kavling Terkunci</label>
                  <input
                    type="text"
                    value={unitCode}
                    onChange={(e) => { setUnitCode(e.target.value); setIsCustomEdited(false); }}
                    className="w-full px-3 py-2 text-xs border border-amber-300 rounded-lg focus:outline-none bg-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">Besaran Tanda Jadi (Rp)</label>
                  <input
                    type="number"
                    value={bookingFee}
                    onChange={(e) => { setBookingFee(Number(e.target.value)); setIsCustomEdited(false); }}
                    className="w-full px-3 py-2 text-xs border border-amber-300 rounded-lg focus:outline-none bg-white font-mono"
                  />
                </div>
              </div>
            )}

            {selectedTemplate === 'siteVisit' && (
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                <label className="block text-xs font-semibold text-blue-900 mb-1">Rencana Waktu Survei</label>
                <input
                  type="text"
                  value={visitSchedule}
                  onChange={(e) => { setVisitSchedule(e.target.value); setIsCustomEdited(false); }}
                  placeholder="Contoh: Sabtu ini pukul 10:00 WIB"
                  className="w-full px-3 py-2 text-xs border border-blue-300 rounded-lg focus:outline-none bg-white"
                />
              </div>
            )}

            {selectedTemplate === 'kprPortal' && (
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200">
                <label className="block text-xs font-semibold text-indigo-900 mb-1">Tautan Portal KPR Mandiri</label>
                <input
                  type="text"
                  value={portalUrl}
                  onChange={(e) => { setPortalUrl(e.target.value); setIsCustomEdited(false); }}
                  className="w-full px-3 py-2 text-xs border border-indigo-300 rounded-lg focus:outline-none bg-white font-mono"
                />
              </div>
            )}
          </div>

          {/* Live Editable Text Area */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>Sesuaikan Isi Pesan WhatsApp:</span>
                {isCustomEdited && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-normal border border-amber-200">
                    Teks Kustom
                  </span>
                )}
              </label>

              {isCustomEdited && (
                <button
                  onClick={handleResetTemplate}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Kembalikan ke Template</span>
                </button>
              )}
            </div>

            <textarea
              rows={8}
              value={activeMessageText}
              onChange={(e) => {
                setCustomMessage(e.target.value);
                setIsCustomEdited(true);
              }}
              className="w-full p-3.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed text-slate-800 bg-slate-50/40"
              placeholder="Tulis pesan kustom di sini..."
            />

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>{activeMessageText.length} karakter</span>
              <span className="text-emerald-600 font-medium">✓ Format WhatsApp didukung (*tebal*, _miring_)</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSendWA}
              className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition hover:shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Buka WhatsApp &amp; Kirim Sekarang</span>
            </button>

            <button
              onClick={handleCopyMessage}
              className="py-3 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-2xs"
            >
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Salin Pesan</span>
            </button>
          </div>

        </div>

        {/* Right Column: Realistic Smartphone Mockup Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[340px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 relative">
            
            {/* Phone Notch / Speaker */}
            <div className="w-24 h-4 bg-slate-900 rounded-b-xl mx-auto mb-1 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Phone Screen Container */}
            <div className="bg-[#EFEAE2] rounded-[28px] overflow-hidden flex flex-col h-[550px] relative border border-slate-700/50">
              
              {/* WhatsApp App Header */}
              <div className="bg-[#075E54] text-white p-3 flex items-center gap-2.5 shrink-0 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs shrink-0">
                  {recipientName.charAt(0) || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold truncate leading-tight">{recipientName}</p>
                  <p className="text-[10px] text-emerald-200 truncate leading-none mt-0.5">
                    {formatPhoneDisplay(recipientPhone)}
                  </p>
                </div>
              </div>

              {/* Chat Message Scroll Area */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col justify-end">
                {/* Security encryption pill */}
                <div className="bg-[#FFEECD] text-[#554738] p-1.5 rounded-lg text-[9px] text-center shadow-2xs leading-snug">
                  🔒 Pesan terenkripsi secara end-to-end
                </div>

                {/* WhatsApp Chat Bubble */}
                <div className="bg-[#D9FDD3] p-3.5 rounded-2xl rounded-tr-xs shadow-2xs max-w-[94%] self-end text-slate-800 text-xs space-y-1.5 relative border border-emerald-100">
                  <p className="whitespace-pre-wrap leading-relaxed text-[11px] font-sans text-slate-900">
                    {activeMessageText}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 pt-0.5">
                    <span>14:32</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* WhatsApp Input Bar Mockup */}
              <div className="p-2.5 bg-[#F0F2F5] flex items-center gap-2 shrink-0 border-t border-slate-200">
                <div className="flex-1 bg-white px-3 py-1.5 rounded-full text-[11px] text-slate-400">
                  Ketik pesan...
                </div>
                <div className="w-7 h-7 rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-2xs">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-3 max-w-[280px]">
            Preview tampilan nyata di layar WhatsApp pembeli. Link web dan nomor telepon langsung aktif dapat diklik.
          </p>
        </div>

      </div>

    </div>
  );
}