'use client';
import React, { useState, useRef, useEffect } from 'react';
import { 
  PenTool, 
  Download, 
  Printer, 
  Send, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

const PRESET_LEADS = [
  { name: 'Bapak Hasanudin', phone: '082215269402', project: 'Bumi Cimanuk Asri', unit: 'A-04 (Tipe 36/60)', price: 166000000, dp: 8300000, booking: 1500000 },
  { name: 'Bapak Nugraha', phone: '083138320817', project: 'Grand Karangpawitan', unit: 'B-02 (Tipe 45/72)', price: 285000000, dp: 14250000, booking: 2500000 },
  { name: 'Ibu Siti patonah', phone: '083857061667', project: 'Bumi Cimanuk Asri', unit: 'A-07 (Tipe 36/60)', price: 166000000, dp: 8300000, booking: 1500000 },
  { name: 'Om Azhar pratama', phone: '0895704969810', project: 'Banyuresmi Hillside', unit: 'C-01 (Tipe 54/84)', price: 345000000, dp: 17250000, booking: 3000000 },
  { name: 'Neng Anggi julianti', phone: '08886066919', project: 'Bumi Cimanuk Asri', unit: 'B-05 (Tipe 36/60)', price: 166000000, dp: 8300000, booking: 1500000 },
];

export default function DigitalSpkPage() {
  const { showToast } = useToast();
  
  // Form State
  const [selectedLead, setSelectedLead] = useState(PRESET_LEADS[0]);
  const [buyerName, setBuyerName] = useState(PRESET_LEADS[0].name);
  const [buyerPhone, setBuyerPhone] = useState(PRESET_LEADS[0].phone);
  const [buyerNik, setBuyerNik] = useState('3205011985040003');
  const [buyerAddress, setBuyerAddress] = useState('Jl. Cimanuk No. 42, Tarogong Kidul, Garut');
  const [projectName, setProjectName] = useState(PRESET_LEADS[0].project);
  const [kavlingUnit, setKavlingUnit] = useState(PRESET_LEADS[0].unit);
  const [unitPrice, setUnitPrice] = useState(PRESET_LEADS[0].price);
  const [bookingFee, setBookingFee] = useState(PRESET_LEADS[0].booking);
  const [downPayment, setDownPayment] = useState(PRESET_LEADS[0].dp);
  const [spkNumber, setSpkNumber] = useState('SPK/GSP/2026/XI/084');
  const [salesPic, setSalesPic] = useState('Dika Firmansyah (Senior Property Advisor)');

  // Signature Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#D4AF37'; // Champagne Gold Ink
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const handleSelectPreset = (lead: typeof PRESET_LEADS[0]) => {
    setSelectedLead(lead);
    setBuyerName(lead.name);
    setBuyerPhone(lead.phone);
    setProjectName(lead.project);
    setKavlingUnit(lead.unit);
    setUnitPrice(lead.price);
    setDownPayment(lead.dp);
    setBookingFee(lead.booking);
    showToast(`Data formulir diselaraskan dengan ${lead.name}`, 'info');
  };

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'clientX' in e ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = 'clientY' in e ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'clientX' in e ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = 'clientY' in e ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    showToast('Tanda tangan digital direset.', 'info');
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = buyerPhone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const text = encodeURIComponent(
      `Halo ${buyerName}, terima kasih telah mempercayakan hunian Anda kepada PT Garut Sejahtera Propertindo.\n\n` +
      `Berikut adalah Surat Pesanan Konsumen (SPK) resmi Anda:\n` +
      `• No. Registrasi: ${spkNumber}\n` +
      `• Proyek: ${projectName}\n` +
      `• Unit: ${kavlingUnit}\n` +
      `• Harga: Rp ${unitPrice.toLocaleString('id-ID')}\n` +
      `• Tanda Jadi (Booking): Rp ${bookingFee.toLocaleString('id-ID')}\n\n` +
      `Dokumen SPK ini telah berstempel digital resmi Direktur Utama MUHAMMAD RIZAL.`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, '_blank');
  };

  const kprAmount = unitPrice - downPayment - bookingFee;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B1120] border border-amber-500/25 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              LEGAL E-SIGN ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PT GARUT SEJAHTERA PROPERTINDO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            E-Signature & Digital SPK (Surat Pesanan Konsumen)
          </h1>
          <p className="text-xs text-slate-300">
            Penandatanganan digital langsung di layar tablet/HP & penerbitan dokumen hukum pemesanan unit berstempel legal Direksi.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Cetak SPK A4</span>
          </button>
          <button
            onClick={handleSendWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Salinan WA</span>
          </button>
        </div>
      </div>

      {/* Preset Lead Quick Selector Strip */}
      <div className="p-4 rounded-2xl bg-[#0D1426] border border-[#1C2640] print:hidden">
        <span className="text-xs font-bold text-amber-300 block mb-2 font-display">
          Pilih Cepat Data Calon Pembeli (CRM Leads):
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_LEADS.map((lead, i) => (
            <button
              key={i}
              onClick={() => handleSelectPreset(lead)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-2 ${
                buyerName === lead.name
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/60 shadow-sm shadow-amber-500/10'
                  : 'bg-[#070B16] text-slate-400 border-[#1C2640] hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{lead.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({lead.unit})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Input Form & E-Signature Pad */}
        <div className="lg:col-span-1 space-y-5 print:hidden">
          
          {/* Form Box */}
          <div className="p-5 rounded-2xl bg-[#0B1120] border border-amber-500/20 space-y-4">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Parameter Surat Pesanan</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Nama Konsumen Sesuai KTP</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-semibold focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Nomor NIK / KTP</label>
                <input
                  type="text"
                  value={buyerNik}
                  onChange={(e) => setBuyerNik(e.target.value)}
                  className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Kavling & Unit</label>
                <input
                  type="text"
                  value={kavlingUnit}
                  onChange={(e) => setKavlingUnit(e.target.value)}
                  className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-amber-300 font-bold focus:border-amber-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Tanda Jadi (Rp)</label>
                  <input
                    type="number"
                    value={bookingFee}
                    onChange={(e) => setBookingFee(Number(e.target.value))}
                    className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Uang Muka (Rp)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full bg-[#070B16] border border-[#1C2640] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive HTML5 E-Signature Pad */}
          <div className="p-5 rounded-2xl bg-[#0B1120] border border-amber-500/25 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-400" />
                <span>Kotak Tanda Tangan Konsumen</span>
              </h3>
              <button
                onClick={clearSignature}
                className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Goreskan tanda tangan digital calon pembeli menggunakan jari atau mouse di bawah ini:
            </p>

            {/* Signature Canvas Box */}
            <div className="relative border-2 border-dashed border-amber-500/40 rounded-2xl bg-[#070B16] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={320}
                height={160}
                className="w-full h-40 touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />

              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600 text-xs font-mono">
                  [ Tanda Tangan Konsumen di Sini ]
                </div>
              )}
            </div>

            {hasSignature && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tanda tangan tersimpan secara kriptografis</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Official A4 Digital SPK Sheet (Print-Ready) */}
        <div className="lg:col-span-2">
          <div className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 border border-slate-300 shadow-2xl space-y-6 print:p-0 print:border-none print:shadow-none">
            
            {/* SPK Document Header */}
            <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-black text-sm">
                    GS
                  </div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900 font-display">
                    PT GARUT SEJAHTERA PROPERTINDO
                  </h2>
                </div>
                <p className="text-xs text-slate-600">
                  Developer & Real Estate Management &bull; Garut, Jawa Barat
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Izin Usaha: 022000847291 &bull; Asosiasi Pengembang REI No. 10.02.94
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300 block mb-1">
                  SURAT PESANAN KONSUMEN (SPK)
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 block">
                  No: {spkNumber}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Buyer Identity Section */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
                I. IDENTITAS CALON PEMBELI
              </h4>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-600">Nama Lengkap</span>
                <span className="col-span-2 font-bold text-slate-900">: {buyerName}</span>
                <span className="text-slate-600">Nomor NIK / KTP</span>
                <span className="col-span-2 font-mono">: {buyerNik}</span>
                <span className="text-slate-600">No. WhatsApp / Telepon</span>
                <span className="col-span-2 font-mono">: {buyerPhone}</span>
                <span className="text-slate-600">Alamat Domisili</span>
                <span className="col-span-2">: {buyerAddress}</span>
              </div>
            </div>

            {/* Property Specification Section */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
                II. SPESIFIKASI UNIT & PEMBAYARAN
              </h4>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-600">Nama Kawasan / Proyek</span>
                <span className="col-span-2 font-bold text-slate-900">: {projectName}</span>
                <span className="text-slate-600">Blok / Tipe Unit</span>
                <span className="col-span-2 font-bold text-blue-900">: Kavling {kavlingUnit}</span>
                <span className="text-slate-600">Harga Jual Rumah</span>
                <span className="col-span-2 font-bold">: Rp {unitPrice.toLocaleString('id-ID')}</span>
                <span className="text-slate-600">Tanda Jadi (Booking Fee)</span>
                <span className="col-span-2 font-bold text-emerald-700">: Rp {bookingFee.toLocaleString('id-ID')} (LUNAS)</span>
                <span className="text-slate-600">Uang Muka (DP) Disepakati</span>
                <span className="col-span-2">: Rp {downPayment.toLocaleString('id-ID')}</span>
                <span className="text-slate-600">Estimasi Plafon KPR</span>
                <span className="col-span-2 font-mono font-bold">: Rp {kprAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Legal Terms & Conditions Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-600 space-y-1 leading-relaxed">
              <p className="font-bold text-slate-800 uppercase font-mono">KETENTUAN PEMESANAN:</p>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>Uang tanda jadi (Booking Fee) mengikat kavling terpilih dan tidak dapat ditarik kembali apabila konsumen membatalkan secara sepihak.</li>
                <li>Calon pembeli berkewajiban melengkapi seluruh berkas persyaratan KPR (Bank BTN/BSI/Mandiri) dalam kurun waktu 14 (empat belas) hari kalender sejak SPK ini diterbitkan.</li>
                <li>Apabila permohonan KPR ditolak oleh pihak perbankan (reject KPR), maka uang tanda jadi akan dikembalikan setelah dipotong biaya administrasi pembatalan resmi sebesar 25%.</li>
              </ol>
            </div>

            {/* Official Signatures & Corporate Seal */}
            <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-center text-xs">
              
              {/* Buyer Signature Box */}
              <div className="space-y-2 flex flex-col items-center">
                <span className="text-slate-600 font-semibold">Calon Pembeli,</span>
                <div className="h-20 w-44 border border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 p-1">
                  {hasSignature ? (
                    <span className="text-[11px] font-mono text-amber-700 font-bold">[Digital Signature Valid]</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Belum Ditandatangani</span>
                  )}
                </div>
                <strong className="block text-slate-900 underline font-display">{buyerName}</strong>
                <span className="text-[10px] text-slate-500 font-mono">Konsumen Pemohon</span>
              </div>

              {/* Developer Corporate Authorized Signature */}
              <div className="space-y-2 flex flex-col items-center relative">
                <span className="text-slate-600 font-semibold">PT Garut Sejahtera Propertindo,</span>
                
                {/* Official Corporate Stamp Overlay */}
                <div className="relative h-20 w-44 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-amber-600/60 rounded-full flex flex-col items-center justify-center p-1 rotate-[-8deg] bg-amber-500/5 pointer-events-none">
                    <span className="text-[8px] font-black tracking-widest text-amber-700 uppercase">PT GARUT SEJAHTERA</span>
                    <span className="text-[7px] font-mono font-bold text-amber-800">REI JAWA BARAT</span>
                    <span className="text-[8px] font-black text-amber-700">★ RESMI ★</span>
                  </div>
                  <span className="text-xs font-serif italic text-slate-800 z-10 font-bold">M. Rizal</span>
                </div>

                <strong className="block text-slate-900 underline font-display">MUHAMMAD RIZAL</strong>
                <span className="text-[10px] text-slate-500 font-mono">Direktur Utama</span>
              </div>

            </div>

            {/* Official Footer Security Hash */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-mono">
              <span>SHA-256 SECURED DIGITAL CONTRACT &bull; HOMIQ PROPTECH OS</span>
              <span>VERIFIED TIMESTAMP: {new Date().toISOString()}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
