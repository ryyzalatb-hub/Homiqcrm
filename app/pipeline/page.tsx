'use client';
import React, { useState } from 'react';
import { DEMO_LEADS, DEMO_PROJECTS } from '@/lib/demo-data';
import { Lead, LeadStatus, PriorityLevel } from '@/types';
import { 
  Plus, 
  MessageCircle, 
  Calendar, 
  Building,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  FileText,
  Printer,
  Copy,
  Send,
  ShieldCheck,
  CheckCircle2,
  Download
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, WhatsAppTemplates } from '@/lib/whatsapp';

const PIPELINE_COLUMNS: { id: LeadStatus; label: string; color: string; badge: string; borderTop: string }[] = [
  { id: 'new_lead', label: 'Prospek Baru', color: 'border-blue-500', badge: 'bg-blue-50 text-blue-700', borderTop: 'border-t-blue-500' },
  { id: 'contacted', label: 'Sudah Dihubungi', color: 'border-slate-500', badge: 'bg-slate-100 text-slate-700', borderTop: 'border-t-slate-500' },
  { id: 'interested', label: 'Berminat Serius', color: 'border-cyan-500', badge: 'bg-cyan-50 text-cyan-700', borderTop: 'border-t-cyan-500' },
  { id: 'site_visit', label: 'Survei Lokasi', color: 'border-amber-500', badge: 'bg-amber-50 text-amber-700', borderTop: 'border-t-amber-500' },
  { id: 'negotiation', label: 'Negosiasi / DP', color: 'border-purple-500', badge: 'bg-purple-50 text-purple-700', borderTop: 'border-t-purple-500' },
  { id: 'booking', label: 'Booking Unit', color: 'border-emerald-500', badge: 'bg-emerald-50 text-emerald-700', borderTop: 'border-t-emerald-500' },
  { id: 'closing', label: 'Closing & Akad', color: 'border-green-600', badge: 'bg-green-100 text-green-800', borderTop: 'border-t-green-600' },
];

export default function PipelinePage() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedSphLead, setSelectedSphLead] = useState<Lead | null>(null);

  // New Lead Form State
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProject, setNewProject] = useState(DEMO_PROJECTS[0].name);
  const [newBudget, setNewBudget] = useState('166000000');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('high');
  const [newPIC, setNewPIC] = useState('Kang Dika Pratama');
  const [newNotes, setNewNotes] = useState('');

  const moveLead = (leadId: string, newStatus: LeadStatus) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const oldStatusLabel = PIPELINE_COLUMNS.find(c => c.id === lead.status)?.label;
    const newStatusLabel = PIPELINE_COLUMNS.find(c => c.id === newStatus)?.label;

    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    showToast(`Status "${lead.full_name}" dipindahkan ke ${newStatusLabel}`, 'info');
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newPhone.trim()) {
      showToast('Nama dan nomor telepon wajib diisi', 'error');
      return;
    }

    const createdLead: Lead = {
      id: `l-${Date.now()}`,
      full_name: newFullName.trim(),
      phone: newPhone.trim(),
      source: 'Direct Form CRM',
      assigned_to_name: newPIC,
      project_name: newProject,
      budget: Number(newBudget) || 166000000,
      priority: newPriority,
      status: 'new_lead',
      last_contacted: 'Hari ini',
      next_follow_up: 'Hari ini, Baru',
      notes: newNotes.trim() || 'Lead baru didaftarkan ke sistem.'
    };

    setLeads(prev => [createdLead, ...prev]);
    setIsModalOpen(false);
    showToast(`Prospek baru "${createdLead.full_name}" berhasil didaftarkan ke Pipeline!`, 'success');

    // Reset Form
    setNewFullName('');
    setNewPhone('');
    setNewNotes('');
  };

  const displayedLeads = selectedProject === 'all' 
    ? leads 
    : leads.filter(l => l.project_name === selectedProject);

  // Grand Total Potential
  const totalPipelinePotential = displayedLeads.reduce((acc, curr) => acc + (curr.budget || 0), 0);

  const handleExportPipelineCSV = () => {
    const headers = ['Nama Lengkap', 'Nomor WhatsApp', 'Proyek Minat', 'Tahap Pipeline', 'Potensi Nilai (Rp)', 'Prioritas', 'PIC Marketing', 'Catatan'];
    const rows = displayedLeads.map(l => [
      `"${l.full_name}"`,
      `"${l.phone}"`,
      `"${l.project_name}"`,
      `"${PIPELINE_COLUMNS.find(c => c.id === l.status)?.label || l.status}"`,
      l.budget,
      `"${l.priority.toUpperCase()}"`,
      `"${l.assigned_to_name}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `homiq-pipeline-omzet-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${displayedLeads.length} data tahapan pipeline berhasil diekspor ke CSV / Excel!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sales Pipeline Properti</h2>
            <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              {displayedLeads.length} Prospek Aktif
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pantau dan gerakkan tahapan interaksi calon pembeli dari prospek awal hingga closing unit
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Project Filter */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Proyek Perumahan</option>
            {DEMO_PROJECTS.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>

          <div className="text-right hidden md:block pr-4 border-r border-slate-200">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Total Potensi Pipeline</span>
            <span className="text-sm font-extrabold text-emerald-600 font-mono">
              Rp {(totalPipelinePotential / 1000000).toLocaleString('id-ID')} Juta
            </span>
          </div>

          <button
            onClick={handleExportPipelineCSV}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition"
            title="Ekspor Seluruh Prospek Pipeline ke Excel / CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Ekspor CSV</span>
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Prospek Baru</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Container (Horizontal Scrollable) */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 items-start scrollbar-thin">
        {PIPELINE_COLUMNS.map((col, index) => {
          const colLeads = displayedLeads.filter(l => l.status === col.id);
          const colTotalBudget = colLeads.reduce((acc, curr) => acc + (curr.budget || 0), 0);

          return (
            <div 
              key={col.id} 
              className="w-80 shrink-0 bg-slate-100/90 rounded-2xl p-3 border border-slate-200 flex flex-col max-h-[calc(100vh-210px)] shadow-2xs"
            >
              {/* Column Header */}
              <div className={`p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs mb-3 border-t-4 ${col.borderTop}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{col.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badge}`}>
                    {colLeads.length}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 font-mono">
                  <span>Potensi Omzet:</span>
                  <span className="font-bold text-slate-800">
                    Rp {(colTotalBudget / 1000000).toLocaleString('id-ID')} Jt
                  </span>
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {colLeads.length === 0 ? (
                  <div className="h-32 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center p-4 text-slate-400 text-xs">
                    <span>Tidak ada prospek di tahap ini</span>
                  </div>
                ) : (
                  colLeads.map((lead) => {
                    const waLink = buildWhatsAppLink(
                      lead.phone,
                      WhatsAppTemplates.quickFollowUp(lead.full_name, lead.project_name)
                    );

                    return (
                      <div 
                        key={lead.id} 
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            lead.priority === 'high' 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200/60' 
                              : lead.priority === 'medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            PRIORITAS {lead.priority.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-slate-600 font-mono font-bold">
                            Rp {(lead.budget / 1000000).toFixed(0)} Jt
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 leading-snug">{lead.full_name}</h4>
                        
                        <div className="space-y-1 text-[11px] text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate font-medium text-slate-700">{lead.project_name}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">PIC: {lead.assigned_to_name}</span>
                          </div>
                        </div>

                        {lead.notes && (
                          <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                            "{lead.notes}"
                          </p>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">{lead.next_follow_up}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedSphLead(lead)}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition shadow-2xs"
                              title="Buat Surat Penawaran Harga (SPH) Resmi"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                            <a 
                              href={waLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition shadow-2xs"
                              title="Chat WhatsApp Calon Pembeli"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Interactive Status Mover Buttons & Dropdown */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px]">
                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <button
                                onClick={() => moveLead(lead.id, PIPELINE_COLUMNS[index - 1].id)}
                                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition"
                                title={`Mundur ke: ${PIPELINE_COLUMNS[index - 1].label}`}
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {index < PIPELINE_COLUMNS.length - 1 && (
                              <button
                                onClick={() => moveLead(lead.id, PIPELINE_COLUMNS[index + 1].id)}
                                className="p-1 hover:bg-blue-50 rounded text-blue-600 hover:text-blue-800 transition"
                                title={`Maju ke: ${PIPELINE_COLUMNS[index + 1].label}`}
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <select 
                            value={lead.status}
                            onChange={(e) => moveLead(lead.id, e.target.value as LeadStatus)}
                            className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[10px] font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {PIPELINE_COLUMNS.map(c => (
                              <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Tambah Prospek Baru</h3>
                  <p className="text-[11px] text-slate-500">Masukkan calon pembeli baru ke pipeline</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Prospek *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Bapak Irwan Santoso"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 081234567890"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Proyek Diminati</label>
                  <select 
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DEMO_PROJECTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget (Rp)</label>
                  <input 
                    type="number" 
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Prioritas</label>
                  <select 
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PIC Marketing</label>
                  <select 
                    value={newPIC}
                    onChange={(e) => setNewPIC(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Kang Dika Pratama">Kang Dika Pratama</option>
                    <option value="Teh Nisa Andriani">Teh Nisa Andriani</option>
                    <option value="Kang Fajar Ramadhan">Kang Fajar Ramadhan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Minat / Preferensi</label>
                <textarea 
                  rows={2}
                  placeholder="Contoh: Mencari rumah subsidi dekat pusat kota dengan angsuran < 1.2jt"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  Simpan ke Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SURAT PENAWARAN HARGA (SPH) OFFICIAL GENERATOR MODAL */}
      {selectedSphLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full my-8 overflow-hidden animate-in zoom-in-95">
            
            {/* Modal Control Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Surat Penawaran Harga (SPH) Resmi</h3>
                  <p className="text-[11px] text-slate-500">Kop Surat Developer &bull; Siap Cetak A4 / PDF</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = `*SURAT PENAWARAN HARGA RESMI (SPH)*\nPT Garut Sejahtera Propertindo — HOMIQ CRM\n\nKepada Yth: *${selectedSphLead.full_name}*\nProyek: *${selectedSphLead.project_name}*\n\n🏡 *SPESIFIKASI UNIT:*\n• Tipe 36/60 (LB 36m² / LT 60m²)\n• Legalitas: SHM (Sertifikat Hak Milik) & PBG\n• Listrik 1.300 VA & Air PDAM\n\n💰 *PILIHAN SKEMA PEMBAYARAN:*\n1. *Cash Keras (Lunas 30 Hari):*\n   Rp 166.000.000 — Diskon 5% 👉 *Netto: Rp 157.700.000*\n\n2. *Cash Bertahap 12 Bulan (Bunga 0%):*\n   DP 30% (Rp 49.800.000) 👉 *Cicilan: Rp 9.683.000 / bln*\n\n3. *KPR Subsidi FLPP Bank BTN (Bunga 5% Tetap):*\n   DP 5% (Rp 8.300.000) 👉 *Cicilan: Rp 1.054.000 / bln (20 Thn)*\n\n*Catatan:* Masa berlaku penawaran 14 hari. Tanda jadi (booking) Rp 2.000.000 langsung mengunci unit di sistem database HOMIQ.\n\nSalam hormat,\n*${selectedSphLead.assigned_to_name}*\nKonsultan Pemasaran`;
                    navigator.clipboard.writeText(text);
                    showToast('Teks SPH resmi berhasil disalin ke clipboard!', 'success');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Teks</span>
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF</span>
                </button>
                <button 
                  onClick={() => setSelectedSphLead(null)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body (Printable Paper Style) */}
            <div className="p-6 sm:p-8 space-y-5 text-slate-800 text-xs max-h-[70vh] overflow-y-auto">
              
              {/* Formal Letterhead (Kop Surat) */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1 relative">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    GS
                  </div>
                  <h2 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
                    PT Garut Sejahtera Propertindo
                  </h2>
                </div>
                <p className="text-[10px] text-slate-600">
                  Pengembang Kawasan Hunian Modern &bull; Anggota Resmi Asosiasi Real Estate Indonesia (REI)
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Izin Usaha: PBG.32.05/Dev/2024/00189 &bull; Kantor Pemasaran: Jl. Patriot No. 88, Garut 44151
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Telp: (0262) 234567 &bull; WhatsApp Hotline: 0812-2345-6789 &bull; www.homiq.co.id
                </p>
              </div>

              {/* Letter Reference & Meta */}
              <div className="flex justify-between items-start pt-2">
                <div className="space-y-0.5">
                  <p><span className="text-slate-500">Nomor Surat:</span> <strong className="font-mono">SPH/GS-HOMIQ/2026/XI/104</strong></p>
                  <p><span className="text-slate-500">Perihal:</span> <strong>Surat Penawaran Harga (SPH) &amp; Skema Pembayaran</strong></p>
                  <p><span className="text-slate-500">Lampiran:</span> 1 (satu) Berkas Lembar Spesifikasi Teknis</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">Garut, 04 November 2026</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold rounded">
                    Masa Berlaku: 14 Hari
                  </span>
                </div>
              </div>

              {/* Recipient */}
              <div className="pt-2">
                <p className="text-slate-500">Kepada Yth:</p>
                <h4 className="text-sm font-bold text-slate-900">{selectedSphLead.full_name}</h4>
                <p className="text-slate-600 font-mono">{selectedSphLead.phone}</p>
                <p className="text-slate-500">Di Tempat</p>
              </div>

              <p className="leading-relaxed text-slate-600">
                Dengan hormat, sehubungan dengan minat Bapak/Ibu terhadap perumahan kami, bersama surat ini kami sampaikan penawaran harga resmi serta pilihan skema pembiayaan unit hunian idaman keluarga:
              </p>

              {/* Technical Specifications */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>Spesifikasi Unit Hunian Pilihan:</span>
                  <span className="font-mono text-blue-700 font-bold">{selectedSphLead.project_name}</span>
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-600">
                  <div>&bull; Tipe Rumah: <strong>Tipe 36/60 Minimalis</strong></div>
                  <div>&bull; Luas Bangunan / Tanah: <strong>36 m² / 60 m²</strong></div>
                  <div>&bull; Kamar Tidur / Mandi: <strong>2 KT / 1 KM / Carport</strong></div>
                  <div>&bull; Pondasi: <strong>Batu Kali + Beton Bertulang</strong></div>
                  <div>&bull; Dinding: <strong>Bata Ringan Plester Aci + Cat</strong></div>
                  <div>&bull; Rangka Atap: <strong>Baja Ringan + Genteng Metal</strong></div>
                  <div>&bull; Daya Listrik: <strong>PLN 1.300 VA Prabayar</strong></div>
                  <div>&bull; Air Bersih: <strong>PDAM Tirta Intan Garut</strong></div>
                  <div>&bull; Legalitas Unit: <strong>SHM (Sertifikat Hak Milik) &amp; PBG</strong></div>
                  <div>&bull; Fasilitas Komplek: <strong>One Gate System, Pos Satpam, Musholla</strong></div>
                </div>
              </div>

              {/* 3 Payment Options Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900">
                  Opsi Skema Pembayaran yang Dapat Dipilih:
                </h4>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Skema Pembiayaan</th>
                        <th className="p-2.5">Uang Muka (DP)</th>
                        <th className="p-2.5">Simulasi Angsuran</th>
                        <th className="p-2.5 text-right">Harga Netto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">
                          1. Cash Keras (Lunas 30 Hari)
                          <span className="block text-[10px] text-emerald-600 font-sans font-bold">Diskon Spesial 5%</span>
                        </td>
                        <td className="p-2.5">100%</td>
                        <td className="p-2.5 text-slate-500 font-sans">-</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">Rp 157.700.000</td>
                      </tr>

                      <tr className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-sans font-semibold text-slate-900">
                          2. Cash Bertahap (In-House 12 Bulan)
                          <span className="block text-[10px] text-blue-600 font-sans font-bold">Bunga 0% Developer</span>
                        </td>
                        <td className="p-2.5">30% (Rp 49,8 Jt)</td>
                        <td className="p-2.5 font-bold text-slate-800">Rp 9.683.000 / bln (12x)</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">Rp 166.000.000</td>
                      </tr>

                      <tr className="hover:bg-slate-50/60 bg-blue-50/40">
                        <td className="p-2.5 font-sans font-semibold text-blue-900">
                          3. KPR Subsidi FLPP (Bank BTN)
                          <span className="block text-[10px] text-blue-600 font-sans font-bold">Bunga 5.0% Tetap Sampai Lunas</span>
                        </td>
                        <td className="p-2.5 font-bold text-blue-800">5% (Rp 8,3 Jt - SBUM 4 Jt)</td>
                        <td className="p-2.5 font-bold text-blue-700">Rp 1.054.000 / bln (20 Thn)</td>
                        <td className="p-2.5 text-right font-bold text-blue-900">Rp 166.000.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="text-[10px] text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <p className="font-bold text-slate-700">Ketentuan &amp; Tata Cara Pemesanan:</p>
                <p>1. Tanda Jadi / Booking Fee sebesar Rp 2.000.000,- langsung mengunci kavling dan memotong total uang muka.</p>
                <p>2. Transaksi diamankan secara eksklusif dengan sistem <em>PostgreSQL Row-Locking</em> guna mencegah double-booking.</p>
                <p>3. Harga sudah termasuk sertifikat SHM, izin PBG, penyambungan listrik 1.300 VA, dan air bersih.</p>
                <p>4. Penawaran harga berlaku selama 14 (empat belas) hari kalender sejak tanggal diterbitkan.</p>
              </div>

              {/* Formal Signatures */}
              <div className="pt-4 flex justify-between items-end text-center">
                <div className="space-y-12">
                  <p className="text-slate-500">Konsultan Pemasaran,</p>
                  <div>
                    <strong className="block text-slate-900 underline font-bold">{selectedSphLead.assigned_to_name}</strong>
                    <span className="text-[10px] text-slate-400">Marketing Executive</span>
                  </div>
                </div>

                <div className="space-y-12">
                  <p className="text-slate-500">Mengetahui &amp; Menyetujui,</p>
                  <div>
                    <strong className="block text-slate-900 underline font-bold">MUHAMMAD RIZAL</strong>
                    <span className="text-[10px] text-slate-400">Direktur Utama PT Garut Sejahtera Propertindo</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-[11px] text-slate-500">
                Penerima: <strong className="text-slate-800">{selectedSphLead.full_name}</strong> ({selectedSphLead.phone})
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSphLead(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-200 rounded-xl transition"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    const rawPhone = selectedSphLead.phone.replace(/\D/g, '');
                    const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
                    const text = `Halo selamat siang *${selectedSphLead.full_name}*,\n\nBerikut kami lampirkan *Surat Penawaran Harga (SPH) Resmi* dari *PT Garut Sejahtera Propertindo* untuk unit pilihan Anda di *${selectedSphLead.project_name}*:\n\n🏡 *SPESIFIKASI UNIT:*\n• Tipe 36/60 (LB 36m² / LT 60m²)\n• Sertifikat Hak Milik (SHM) & PBG\n\n💰 *PILIHAN SKEMA:* \n1. Cash Keras (Diskon 5%): *Rp 157.700.000*\n2. Cash Bertahap 12 Bln: *DP 30%, Cicilan Rp 9.683.000 / bln*\n3. KPR Subsidi FLPP: *DP 5%, Cicilan Rp 1.054.000 / bln (20 Thn Tetap)*\n\nPenawaran berlaku 14 hari. Boleh kami bantu siapkan berkas pemesanan unitnya?\n\nSalam hormat,\n*${selectedSphLead.assigned_to_name}*\nKonsultan Properti HOMIQ`;
                    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
                    showToast(`SPH resmi berhasil dikirim ke WhatsApp ${selectedSphLead.full_name}`, 'success');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim SPH via WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
