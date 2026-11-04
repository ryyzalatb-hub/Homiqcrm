'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UploadCloud, 
  FileText, 
  Download, 
  Send, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles,
  Phone,
  Calendar,
  Lock,
  ChevronRight,
  Eye,
  RefreshCw,
  Home,
  Printer,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

interface DocumentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'verified' | 'in_review' | 'needs_revision' | 'pending';
  fileName?: string;
  fileSize?: string;
  updatedAt?: string;
  rejectionReason?: string;
}

export default function CustomerKprPortalPage() {
  const params = useParams();
  const bookingId = (params?.id as string) || 'BOK-202611-892';
  const { showToast } = useToast();

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // Booking Data
  const bookingData = {
    code: bookingId.toUpperCase(),
    customerName: 'Bapak Agus Setiawan',
    customerPhone: '0812-2345-6789',
    projectName: 'Bumi Cimanuk Indah',
    unitCode: 'Blok A-01',
    propertyType: 'Tipe 36/60 (Subsidi PUPR)',
    propertyPrice: 166000000,
    bookingFee: 2000000,
    dpAmount: 8300000,
    kprAmount: 157700000,
    monthlyInstallment: 1054000,
    tenorYears: 20,
    picName: 'Kang Dika Pratama',
    picPhone: '6281223456789',
    bookingDate: '02 November 2026',
    bankPartner: 'Bank BTN Cabang Garut'
  };

  // Document list
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc-1',
      name: 'e-KTP Pemohon & Pasangan',
      category: 'Identitas Diri',
      description: 'Foto jelas e-KTP asli (tidak terpotong & tidak buram).',
      status: 'verified',
      fileName: 'ktp_agus_setiawan_dan_istri.jpg',
      fileSize: '2.4 MB',
      updatedAt: '02 Nov 2026, 14:20'
    },
    {
      id: 'doc-2',
      name: 'Kartu Keluarga (KK) & Buku Nikah',
      category: 'Legalitas Keluarga',
      description: 'Scan berwarna KK terbaru & lembar akta nikah.',
      status: 'verified',
      fileName: 'kk_dan_buku_nikah_resmi.pdf',
      fileSize: '3.1 MB',
      updatedAt: '02 Nov 2026, 14:22'
    },
    {
      id: 'doc-3',
      name: 'NPWP Pribadi & Bukti SPT Tahunan',
      category: 'Perpajakan',
      description: 'Kartu NPWP dan bukti lapor SPT tahun terakhir.',
      status: 'verified',
      fileName: 'npwp_dan_spt_2025.pdf',
      fileSize: '1.8 MB',
      updatedAt: '02 Nov 2026, 14:25'
    },
    {
      id: 'doc-4',
      name: 'Slip Gaji Asli 3 Bulan Terakhir',
      category: 'Penghasilan',
      description: 'Slip gaji resmi berstempel dan tanda tangan HRD.',
      status: 'verified',
      fileName: 'slip_gaji_agustus_oktober_2026.pdf',
      fileSize: '4.2 MB',
      updatedAt: '02 Nov 2026, 14:30'
    },
    {
      id: 'doc-5',
      name: 'Rekening Koran Tabungan 3 Bulan',
      category: 'Perbankan',
      description: 'Rekening koran mutasi payroll bank tempat gaji ditransfer.',
      status: 'needs_revision',
      fileName: 'rekening_koran_mandiri_3bln.pdf',
      fileSize: '3.9 MB',
      updatedAt: '03 Nov 2026, 09:15',
      rejectionReason: 'Halaman ke-3 buram dan stempel legalisir bank terpotong. Mohon upload ulang file PDF yang lebih jelas.'
    },
    {
      id: 'doc-6',
      name: 'Surat Keterangan Karyawan Aktif',
      category: 'Pekerjaan',
      description: 'Surat asli dari instansi/perusahaan tempat bekerja.',
      status: 'pending'
    }
  ]);

  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const progressPercent = Math.round((verifiedCount / documents.length) * 100);

  // File Upload simulation
  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast(`Mengunggah "${file.name}" ke portal berkas...`, 'info');

    // Simulate instant upload processing
    setTimeout(() => {
      setDocuments(prev => prev.map(d => {
        if (d.id === docId) {
          return {
            ...d,
            status: 'in_review',
            fileName: file.name,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            updatedAt: 'Baru saja diunggah',
            rejectionReason: undefined
          };
        }
        return d;
      }));
      showToast(`Dokumen "${file.name}" berhasil diunggah! Sedang ditinjau oleh analis perbankan.`, 'success');
    }, 800);
  };

  const handleSendWaUpdate = () => {
    const msg = encodeURIComponent(
      `Halo ${bookingData.picName},\n\nSaya ${bookingData.customerName} (Unit ${bookingData.unitCode} ${bookingData.projectName}).\nSaya telah mengunggah/memperbarui dokumen persyaratan KPR melalui Portal Konsumen HOMIQ.\n\nMohon bantuannya untuk diperiksa dan diproses ke ${bookingData.bankPartner}.\nTerima kasih!`
    );
    window.open(`https://wa.me/${bookingData.picPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 select-none">
      
      {/* Top Navigation Bar for Customer */}
      <nav className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm shadow-blue-500/20">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              HOMIQ <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-1.5 py-0.2 rounded">PORTAL KPR</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Garut Sejahtera Property &bull; Mitra Resmi Bank BTN</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 transition flex items-center gap-1 font-medium px-2 py-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke CRM</span>
          </Link>
          <button
            onClick={handleSendWaUpdate}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hubungi PIC Marketing</span>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Customer Welcome & Booking Summary Banner */}
        <div className="crm-card p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-[#0A0F1D] text-white rounded-2xl relative overflow-hidden shadow-lg border-slate-200/90">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Booking ID: {bookingData.code}
                </span>
                <span className="text-xs text-slate-400 font-mono">Terverifikasi Otomatis</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Selamat Datang, {bookingData.customerName}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Ini adalah portal resmi pengumpulan berkas pengajuan kredit KPR perumahan Anda. Unggah dokumen langsung dari smartphone atau komputer Anda secara aman.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 shrink-0 text-left md:text-right space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300">Unit Kavling Terkunci</span>
              <p className="text-base font-extrabold text-blue-300">{bookingData.projectName}</p>
              <p className="text-xs font-bold text-white">{bookingData.unitCode} &bull; {bookingData.propertyType}</p>
              <p className="text-xs font-mono text-emerald-300 pt-1 font-semibold">
                Cicilan: Rp {bookingData.monthlyInstallment.toLocaleString('id-ID')} / bln ({bookingData.tenorYears} Thn)
              </p>
            </div>
          </div>
        </div>

        {/* 5-Stage Visual Progress Stepper */}
        <div className="crm-card p-5 bg-white rounded-2xl border-slate-200/90 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Alur Tahapan Pengajuan KPR Rumah Anda
            </h3>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg">
              Progres Berkas: {progressPercent}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            
            {/* Step 1 */}
            <div className="p-3 rounded-xl border bg-emerald-50/70 border-emerald-200 text-emerald-950 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">Tahap 1</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs font-bold">Booking Fee</p>
              <p className="text-[10px] text-emerald-700">Rp 2.000.000 Lunas</p>
            </div>

            {/* Step 2 (Active) */}
            <div className="p-3 rounded-xl border bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Tahap 2</span>
                <Clock className="w-4 h-4 text-blue-600 animate-spin" />
              </div>
              <p className="text-xs font-bold">Upload Berkas</p>
              <p className="text-[10px] text-blue-700 font-semibold">{verifiedCount} dari {documents.length} Terverifikasi</p>
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-500 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">Tahap 3</span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
              <p className="text-xs font-semibold text-slate-700">Analisis BI Checking</p>
              <p className="text-[10px] text-slate-400">Menunggu Berkas</p>
            </div>

            {/* Step 4 */}
            <div className="p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-500 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">Tahap 4</span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
              <p className="text-xs font-semibold text-slate-700">SP3K Terbit</p>
              <p className="text-[10px] text-slate-400">Persetujuan Bank</p>
            </div>

            {/* Step 5 */}
            <div className="p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-500 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">Tahap 5</span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
              <p className="text-xs font-semibold text-slate-700">Akad &amp; Kunci</p>
              <p className="text-[10px] text-slate-400">Serah Terima</p>
            </div>

          </div>
        </div>

        {/* Required Documents Upload Center */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Dokumen Persyaratan KPR Bank BTN
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pastikan dokumen dalam format PDF, JPG, atau PNG dengan ukuran maksimal 10MB per file.
              </p>
            </div>

            <button
              onClick={() => showToast('Semua status dokumen telah sinkron dengan server perbankan', 'info')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Status</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => {
              const isVerified = doc.status === 'verified';
              const isInReview = doc.status === 'in_review';
              const isNeedsRevision = doc.status === 'needs_revision';
              const isPending = doc.status === 'pending';

              return (
                <div
                  key={doc.id}
                  className={`crm-card p-5 rounded-2xl border transition space-y-3 ${
                    isNeedsRevision
                      ? 'bg-rose-50/50 border-rose-300 ring-1 ring-rose-200'
                      : isVerified
                        ? 'bg-white border-slate-200/90'
                        : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isVerified ? 'bg-emerald-100 text-emerald-700' :
                        isNeedsRevision ? 'bg-rose-100 text-rose-700' :
                        isInReview ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Dokumen #{idx + 1} &bull; {doc.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {doc.name}
                        </h4>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider ${
                      isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      isNeedsRevision ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' :
                      isInReview ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}>
                      {isVerified ? 'Terverifikasi' :
                       isNeedsRevision ? 'Perlu Revisi' :
                       isInReview ? 'Sedang Ditinjau' : 'Belum Ada'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {doc.description}
                  </p>

                  {/* Rejection Alert Warning */}
                  {isNeedsRevision && doc.rejectionReason && (
                    <div className="p-3 rounded-xl bg-rose-100/70 border border-rose-300 text-rose-900 text-[11px] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Catatan Analis Bank:</strong> {doc.rejectionReason}
                      </div>
                    </div>
                  )}

                  {/* Attached File Metadata */}
                  {doc.fileName && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-mono text-[11px] truncate">{doc.fileName}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-slate-400">{doc.fileSize}</span>
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-blue-600 transition"
                          title="Lihat Pratinjau Dokumen"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Upload Action Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {doc.updatedAt ? `Update: ${doc.updatedAt}` : 'Maksimal 10 MB per berkas'}
                    </span>

                    <label className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 ${
                      isNeedsRevision 
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm' 
                        : isVerified
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                    }`}>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{isVerified ? 'Upload Ulang' : isNeedsRevision ? 'Upload Revisi' : 'Pilih File'}</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.id, e)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assistance & Consultant Box */}
        <div className="crm-card p-5 bg-white rounded-2xl border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
              DP
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{bookingData.picName}</p>
              <p className="text-[11px] text-slate-500">Konsultan Pemasaran &amp; Pendamping KPR Anda</p>
              <p className="text-[10px] font-mono text-blue-700 mt-0.5">Garut Sejahtera Property &bull; {bookingData.bankPartner}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReceiptModalOpen(true)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition border border-slate-200"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Tanda Terima Berkas A4</span>
            </button>
            <button
              onClick={handleSendWaUpdate}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Chat WhatsApp PIC</span>
            </button>
          </div>
        </div>

      </main>

      {/* Tanda Terima Berkas KPR Resmi Modal */}
      {isReceiptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in zoom-in-95 my-8">
            
            {/* Modal Action Bar (Hidden when printed) */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Tanda Terima Penyerahan Berkas KPR Resmi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 font-sans print:p-0">
              
              {/* Kop Surat Developer */}
              <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                      PT GARUT SEJAHTERA PROPERTY
                    </h2>
                    <p className="text-[11px] text-slate-600">
                      Pusat Pelayanan &amp; Administrasi Akad KPR Perumahan Bersubsidi FLPP
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Mitra Resmi: Bank BTN Kantor Cabang Garut &bull; Telp: (0262) 234-8899
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold block mb-1">
                    TTB/#{bookingData.code}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Tanggal: {bookingData.bookingDate}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="text-center py-1">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 underline decoration-2 underline-offset-4">
                  TANDA TERIMA PENYERAHAN DOKUMEN PENGAJUAN KPR
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bukti resmi kelengkapan administrasi pengajuan kredit perumahan rakyat
                </p>
              </div>

              {/* Customer & Unit Details */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-500">Nama Pemohon: <strong className="text-slate-900">{bookingData.customerName}</strong></div>
                  <div className="text-slate-500">No. WhatsApp: <span className="font-mono text-slate-800">{bookingData.customerPhone}</span></div>
                  <div className="text-slate-500">Unit Kavling: <strong className="text-blue-700">{bookingData.unitCode} ({bookingData.projectName})</strong></div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">Plafon Pengajuan: <strong className="text-slate-900">Rp {bookingData.kprAmount.toLocaleString('id-ID')}</strong></div>
                  <div className="text-slate-500">Bank Penyalur: <span className="text-slate-800">{bookingData.bankPartner}</span></div>
                  <div className="text-slate-500">Petugas PIC: <span className="text-slate-800">{bookingData.picName}</span></div>
                </div>
              </div>

              {/* Checklist Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Daftar Status Berkas Dokumen:
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/90 text-slate-800 font-bold text-[10px] uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">No</th>
                        <th className="p-2.5">Nama Dokumen Persyaratan</th>
                        <th className="p-2.5">Kategori</th>
                        <th className="p-2.5">Nama Berkas</th>
                        <th className="p-2.5 text-center">Status Verifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px]">
                      {documents.map((doc, i) => (
                        <tr key={doc.id} className="hover:bg-slate-50">
                          <td className="p-2.5 font-mono text-slate-500">{i + 1}</td>
                          <td className="p-2.5 font-bold text-slate-900">{doc.name}</td>
                          <td className="p-2.5 text-slate-600">{doc.category}</td>
                          <td className="p-2.5 font-mono text-slate-700 truncate max-w-[150px]">
                            {doc.fileName || '-'}
                          </td>
                          <td className="p-2.5 text-center">
                            {doc.status === 'verified' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Terverifikasi
                              </span>
                            ) : doc.status === 'needs_revision' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                                Perlu Revisi
                              </span>
                            ) : doc.status === 'in_review' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                Sedang Ditinjau
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                Menunggu
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bank Notice */}
              <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
                <p className="font-bold">Informasi Analisis Bank BTN:</p>
                <p className="mt-0.5 text-blue-800">
                  Dokumen yang telah berstatus *Terverifikasi* akan segera diteruskan ke unit analis pembiayaan untuk proses verifikasi BI Checking / SLIK OJK dan wawancara konfirmasi data. Mohon pastikan nomor telepon pemohon tetap aktif.
                </p>
              </div>

              {/* Dual Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-6 text-center text-xs text-slate-700">
                <div className="space-y-12">
                  <p className="font-medium text-[11px] text-slate-500">Pemohon KPR,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline">{bookingData.customerName}</p>
                    <p className="text-[10px] text-slate-500">Konsumen Pembeli</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <p className="font-medium text-[11px] text-slate-500">Petugas Administrasi KPR,</p>
                  <div>
                    <p className="font-bold text-slate-900 underline">{bookingData.picName}</p>
                    <p className="text-[10px] text-slate-500">Legal &amp; KPR Officer</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Close Button */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end print:hidden">
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Document Interactive Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95">
            
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-900 truncate">{previewDoc.name}</h4>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              
              {/* Mock Document Visual Screen */}
              <div className="h-44 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="font-mono font-bold text-xs text-slate-800 truncate max-w-[260px]">
                  {previewDoc.fileName || 'dokumen_terlampir.pdf'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Ukuran: {previewDoc.fileSize || '2.4 MB'} &bull; Format Asli Terenkripsi</p>

                {/* Status Stamp */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    previewDoc.status === 'verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    previewDoc.status === 'needs_revision' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                    'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {previewDoc.status === 'verified' ? '✓ Terverifikasi' :
                     previewDoc.status === 'needs_revision' ? '! Perlu Revisi' : 'Sedang Ditinjau'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Kategori Berkas:</span>
                  <span className="font-semibold text-slate-800">{previewDoc.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Waktu Unggah:</span>
                  <span className="font-semibold text-slate-800">{previewDoc.updatedAt || '02 Nov 2026, 14:20'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Validasi Kriptografi:</span>
                  <span className="text-emerald-600 font-mono font-bold">SHA-256 Valid</span>
                </div>
              </div>

              {previewDoc.rejectionReason && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-800 space-y-1">
                  <strong className="font-bold block">Catatan Analis Bank:</strong>
                  <p>{previewDoc.rejectionReason}</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition"
              >
                Tutup Pratinjau
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
