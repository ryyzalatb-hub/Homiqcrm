'use client';
import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  Building, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  ArrowRight,
  Sparkles,
  Lock,
  Receipt
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface InstantBookingFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  kavlingCode?: string;
  projectName?: string;
  unitPrice?: number;
  onPaymentSuccess?: (kavlingCode: string, receiptData: any) => void;
}

export default function InstantBookingFeeModal({
  isOpen,
  onClose,
  kavlingCode = 'A-04',
  projectName = 'Bumi Cimanuk Asri',
  unitPrice = 166000000,
  onPaymentSuccess
}: InstantBookingFeeModalProps) {
  const { showToast } = useToast();
  const [feeTier, setFeeTier] = useState<number>(1500000);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca' | 'mandiri' | 'bsi'>('qris');
  const [buyerName, setBuyerName] = useState('Bapak Hasanudin');
  const [buyerPhone, setBuyerPhone] = useState('082215269402');
  const [buyerKtp, setBuyerKtp] = useState('3205011985040003');
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins in sec
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copiedVa, setCopiedVa] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Countdown timer for QRIS
  useEffect(() => {
    if (!isOpen || isPaid) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isPaid]);

  // Generate transaction id when opened
  useEffect(() => {
    if (isOpen) {
      const randomStr = Math.floor(100000 + Math.random() * 900000);
      setTransactionId(`TRX-HMQ-${randomStr}`);
      setIsPaid(false);
      setTimeLeft(900);
    }
  }, [isOpen, kavlingCode]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const vaNumber = {
    bca: '88012' + buyerPhone.replace(/[^0-9]/g, '').slice(-9),
    mandiri: '89301' + buyerPhone.replace(/[^0-9]/g, '').slice(-9),
    bsi: '77210' + buyerPhone.replace(/[^0-9]/g, '').slice(-9)
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      showToast(`Pembayaran Booking Fee ${kavlingCode} Berhasil! Kavling resmi terkunci.`, 'success');
      if (onPaymentSuccess) {
        onPaymentSuccess(kavlingCode, {
          transactionId,
          kavlingCode,
          projectName,
          amount: feeTier,
          buyerName,
          buyerPhone,
          paidAt: new Date().toISOString()
        });
      }
    }, 1200);
  };

  const handleCopyVa = () => {
    const activeVa = vaNumber[paymentMethod as keyof typeof vaNumber] || '88012082215269402';
    navigator.clipboard.writeText(activeVa);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
    showToast('Nomor Virtual Account disalin ke clipboard', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#070B16] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden text-white my-8">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#0A1020] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Lock className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white font-display">
                  Instant Booking Fee Gateway
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  REAL-TIME ROW LOCK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kunci Kavling <span className="text-amber-300 font-bold">{kavlingCode}</span> &bull; {projectName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {!isPaid ? (
            <>
              {/* Step 1: Kavling & Buyer Info Strip */}
              <div className="p-4 rounded-2xl bg-[#0D1426] border border-[#1C2640] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Unit Terpilih</span>
                  <span className="text-sm font-extrabold text-amber-300">Blok {kavlingCode}</span>
                  <p className="text-[10px] text-slate-400 truncate">{projectName}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Calon Pembeli</span>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-[#070B16] border border-[#1C2640] rounded-lg px-2.5 py-1 text-xs text-white font-semibold focus:border-amber-400 outline-none mt-0.5"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">WhatsApp Konsumen</span>
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-[#070B16] border border-[#1C2640] rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:border-amber-400 outline-none mt-0.5"
                    placeholder="08xxxxxxxx"
                  />
                </div>
              </div>

              {/* Step 2: Nominal Booking Fee Tier */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 font-display">
                  Pilih Besaran Tanda Jadi (Booking Fee):
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { amount: 1000000, label: 'Standar', desc: 'Kunci Kavling 7 Hari' },
                    { amount: 1500000, label: 'Prioritas', desc: 'Kunci Kavling 14 Hari' },
                    { amount: 2500000, label: 'VIP Hook', desc: 'Bebas Pilih Blok Hook' }
                  ].map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => setFeeTier(tier.amount)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        feeTier === tier.amount
                          ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                          : 'bg-[#0D1426] border-[#1C2640] text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-400">
                        {tier.label}
                      </span>
                      <span className="text-sm font-extrabold text-white block mt-0.5 font-display">
                        Rp {tier.amount.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {tier.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Payment Channel Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 font-display">
                  Metode Pembayaran Instan:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'qris', name: 'QRIS', sub: 'Semua Bank / e-Wallet', icon: QrCode },
                    { id: 'bca', name: 'BCA VA', sub: 'Virtual Account', icon: Building },
                    { id: 'mandiri', name: 'Mandiri VA', sub: 'Livin by Mandiri', icon: Building },
                    { id: 'bsi', name: 'BSI VA', sub: 'BSI Mobile Syariah', icon: Building },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isActive = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          isActive
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                            : 'bg-[#0D1426] border-[#1C2640] text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold block">{method.name}</span>
                        <span className="text-[9px] text-slate-400 truncate block">{method.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Payment Visual / Interactive Display */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-amber-500/20 text-center">
                {paymentMethod === 'qris' ? (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>BATAS BAYAR: {formatTimer(timeLeft)}</span>
                    </div>

                    {/* QR Code Canvas Visual Representation */}
                    <div className="w-48 h-48 mx-auto p-3 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center">
                      <div className="w-full h-full border-4 border-slate-900 rounded-lg p-2 flex flex-col items-center justify-between">
                        <div className="w-full flex justify-between">
                          <div className="w-8 h-8 bg-black rounded" />
                          <div className="w-4 h-4 bg-amber-500 rounded-full" />
                          <div className="w-8 h-8 bg-black rounded" />
                        </div>
                        <div className="text-[10px] font-black text-black tracking-widest font-mono">
                          QRIS &bull; GSP-HOMIQ
                        </div>
                        <div className="w-full flex justify-between items-end">
                          <div className="w-8 h-8 bg-black rounded" />
                          <div className="text-[8px] font-mono font-bold text-slate-600">
                            {kavlingCode}
                          </div>
                          <div className="w-8 h-8 bg-black rounded" />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300">
                      Pindai QRIS menggunakan BCA Mobile, Livin Mandiri, GoPay, OVO, atau ShopeePay
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 py-2">
                    <span className="text-xs text-slate-400 block font-mono uppercase">
                      Nomor Virtual Account {paymentMethod.toUpperCase()}:
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-amber-300">
                        {vaNumber[paymentMethod as keyof typeof vaNumber] || '88012082215269402'}
                      </span>
                      <button
                        onClick={handleCopyVa}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Salin VA"
                      >
                        {copiedVa ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">
                      Atas Nama: <strong className="text-white">PT GARUT SEJAHTERA PROPERTINDO</strong>
                    </p>
                  </div>
                )}

                {/* Instant Simulator Trigger Button */}
                <div className="pt-3 border-t border-slate-800 mt-4">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Memverifikasi Notifikasi Bank...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>Simulasikan Pembayaran Berhasil (Instant Webhook)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Success Receipt View */
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-emerald-500/30 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                  PEMBAYARAN DIVERIFIKASI &bull; ROW LOCK AKTIF
                </span>
                <h3 className="text-xl font-extrabold text-white font-display mt-1">
                  Kavling Blok {kavlingCode} Berhasil Dikunci!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Bukti tanda jadi resmi telah diterbitkan oleh PT Garut Sejahtera Propertindo.
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="p-4 rounded-2xl bg-[#070B16] border border-[#19243C] text-left text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[#19243C]">
                  <span className="text-slate-400">ID Transaksi</span>
                  <span className="font-mono font-bold text-amber-300">{transactionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nama Pembeli</span>
                  <span className="font-bold text-white">{buyerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">WhatsApp</span>
                  <span className="font-mono text-slate-300">{buyerPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nominal Booking Fee</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    Rp {feeTier.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status Kavling</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30">
                    LOCKED / BOOKED
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Resi A4</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <span>Selesai & Lihat Siteplan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
