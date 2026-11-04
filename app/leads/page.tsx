'use client';
import React, { useState } from 'react';
import { DEMO_LEADS, DEMO_PROJECTS } from '@/lib/demo-data';
import { Lead, LeadStatus, PriorityLevel } from '@/types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MessageCircle, 
  Phone, 
  Building, 
  UserCheck, 
  ChevronRight, 
  X, 
  Check, 
  ArrowUpDown,
  Sparkles,
  Download,
  Zap,
  Copy,
  Globe,
  Radio,
  Send,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, WhatsAppTemplates, formatPhoneDisplay } from '@/lib/whatsapp';

const STATUS_LABELS: Record<LeadStatus, { label: string; badge: string }> = {
  new_lead: { label: 'Prospek Baru', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  contacted: { label: 'Sudah Dihubungi', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  interested: { label: 'Berminat Serius', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  site_visit: { label: 'Survei Lokasi', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  negotiation: { label: 'Negosiasi / DP', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  booking: { label: 'Booking Unit', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  closing: { label: 'Closing & Akad', badge: 'bg-green-100 text-green-800 border-green-300' },
  lost: { label: 'Batal / Lost', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function LeadsPage() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProject, setNewProject] = useState(DEMO_PROJECTS[0].name);
  const [newBudget, setNewBudget] = useState('166000000');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('high');
  const [newPIC, setNewPIC] = useState('Kang Dika Pratama');
  const [newNotes, setNewNotes] = useState('');

  // Webhook Simulator State
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [simChannel, setSimChannel] = useState<'meta' | 'tiktok' | 'google'>('meta');
  const [simLeadName, setSimLeadName] = useState('Rina Permata Sari');
  const [simLeadPhone, setSimLeadPhone] = useState('0821-9876-5432');
  const [simProject, setSimProject] = useState(DEMO_PROJECTS[0].name);
  const [simCampaign, setSimCampaign] = useState('Promo DP 0% & Subsidi Angsuran 1 Jt');

  const handleSimulateWebhook = () => {
    if (!simLeadName.trim() || !simLeadPhone.trim()) {
      showToast('Nama dan nomor HP simulasi wajib diisi', 'error');
      return;
    }

    const pics = ['Kang Dika Pratama', 'Teh Nisa Andriani', 'Kang Fajar Ramadhan'];
    const assignedPIC = pics[Math.floor(Math.random() * pics.length)];
    const channelName = simChannel === 'meta' 
      ? 'Instagram/Facebook Lead Ads' 
      : simChannel === 'tiktok' 
        ? 'TikTok Lead Gen' 
        : 'Google Search Ads';

    const incomingLead: Lead = {
      id: `lead-wh-${Date.now()}`,
      full_name: simLeadName.trim(),
      phone: simLeadPhone.trim(),
      source: channelName,
      assigned_to_name: assignedPIC,
      project_name: simProject,
      budget: 166000000,
      priority: 'high',
      status: 'new_lead',
      last_contacted: 'Baru saja masuk',
      next_follow_up: 'Hari ini (Segera kontak < 15 menit)',
      notes: `[Auto-Ingested dari ${channelName}] Campaign: ${simCampaign}. Calon pembeli meminta info brosur & jadwal survei.`
    };

    setLeads(prev => [incomingLead, ...prev]);
    setIsWebhookModalOpen(false);
    showToast(`⚡ Lead baru dari ${channelName} berhasil diterima! Auto-assigned ke ${assignedPIC}`, 'success');
  };

  // Filtering
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.notes && l.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.assigned_to_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProject = selectedProject === 'all' || l.project_name === selectedProject;
    const matchesStatus = selectedStatus === 'all' || l.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || l.priority === selectedPriority;

    return matchesSearch && matchesProject && matchesStatus && matchesPriority;
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newPhone.trim()) {
      showToast('Nama dan nomor WhatsApp wajib diisi', 'error');
      return;
    }

    const created: Lead = {
      id: `l-${Date.now()}`,
      full_name: newFullName.trim(),
      phone: newPhone.trim(),
      source: 'Direct CRM Entry',
      assigned_to_name: newPIC,
      project_name: newProject,
      budget: Number(newBudget) || 166000000,
      priority: newPriority,
      status: 'new_lead',
      last_contacted: 'Hari ini',
      next_follow_up: 'Hari ini, Baru',
      notes: newNotes.trim() || 'Prospek baru didaftarkan ke direktori.'
    };

    setLeads(prev => [created, ...prev]);
    setIsAddModalOpen(false);
    showToast(`Prospek "${created.full_name}" berhasil ditambahkan!`, 'success');

    // Reset
    setNewFullName('');
    setNewPhone('');
    setNewNotes('');
  };

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    const label = STATUS_LABELS[newStatus]?.label || newStatus;
    showToast(`Status prospek diperbarui menjadi "${label}"`, 'info');
  };

  const handleDeleteLead = (leadId: string, leadName: string) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    showToast(`Prospek "${leadName}" telah dihapus`, 'info');
  };

  const handleExportCSV = () => {
    const headers = ['Nama Lengkap', 'Nomor WhatsApp', 'Proyek Minat', 'Budget (Rp)', 'Status Pipeline', 'PIC Marketing', 'Sumber Iklan', 'Catatan'];
    const rows = filteredLeads.map(l => [
      `"${l.full_name}"`,
      `"${l.phone}"`,
      `"${l.project_name}"`,
      l.budget,
      `"${STATUS_LABELS[l.status]?.label || l.status}"`,
      `"${l.assigned_to_name}"`,
      `"${l.source}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `homiq-leads-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${filteredLeads.length} data prospek berhasil diekspor ke CSV / Excel!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Direktori Leads & Prospek</h2>
            <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
              {filteredLeads.length} Prospek
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Database calon pembeli perumahan Garut Sejahtera Property dengan integrasi WhatsApp langsung
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition"
            title="Ekspor ke Excel / CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={() => setIsWebhookModalOpen(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-200 transition"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Integrasi Webhook Ads</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Prospek Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama prospek, nomor HP, PIC, atau catatan minat..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Filter Project */}
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Proyek</option>
            {DEMO_PROJECTS.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>

          {/* Filter Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Tahapan</option>
            <option value="new_lead">Prospek Baru</option>
            <option value="contacted">Sudah Dihubungi</option>
            <option value="interested">Berminat Serius</option>
            <option value="site_visit">Survei Lokasi</option>
            <option value="negotiation">Negosiasi / DP</option>
            <option value="booking">Booking Unit</option>
            <option value="closing">Closing & Akad</option>
          </select>

          {/* Filter Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Prioritas</option>
            <option value="high">Prioritas Tinggi</option>
            <option value="medium">Prioritas Sedang</option>
            <option value="low">Prioritas Rendah</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[850px]">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nama & Kontak Prospek</th>
                <th className="p-3.5">Proyek Minat</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">PIC Marketing</th>
                <th className="p-3.5">Tahapan Sales</th>
                <th className="p-3.5">Prioritas</th>
                <th className="p-3.5">Tindak Lanjut</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    Tidak ada data prospek yang sesuai kriteria pencarian
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const statusInfo = STATUS_LABELS[lead.status] || { label: lead.status, badge: 'bg-slate-100 text-slate-700 border-slate-200' };
                  const waLink = buildWhatsAppLink(
                    lead.phone,
                    WhatsAppTemplates.followUp(lead.full_name, lead.project_name, lead.assigned_to_name)
                  );

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition group">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                            {lead.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{lead.full_name}</p>
                            <p className="text-[11px] font-mono text-slate-500 mt-0.5">{formatPhoneDisplay(lead.phone)}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-medium text-slate-800">{lead.project_name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{lead.source}</span>
                      </td>

                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        Rp {(lead.budget / 1000000).toLocaleString('id-ID')} Jt
                      </td>

                      <td className="p-3.5 font-medium text-slate-700">
                        {lead.assigned_to_name}
                      </td>

                      <td className="p-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-full border focus:outline-none ${statusInfo.badge}`}
                        >
                          <option value="new_lead">Prospek Baru</option>
                          <option value="contacted">Sudah Dihubungi</option>
                          <option value="interested">Berminat Serius</option>
                          <option value="site_visit">Survei Lokasi</option>
                          <option value="negotiation">Negosiasi / DP</option>
                          <option value="booking">Booking Unit</option>
                          <option value="closing">Closing & Akad</option>
                          <option value="lost">Batal / Lost</option>
                        </select>
                      </td>

                      <td className="p-3.5">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          lead.priority === 'high' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : lead.priority === 'medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {lead.priority}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-500 text-[11px]">
                        {lead.next_follow_up}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition shadow-2xs"
                            title="Chat WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.full_name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Hapus Prospek"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Tambah Prospek Baru</h3>
                  <p className="text-[11px] text-slate-500">Daftarkan data calon pembeli properti</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
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
                  placeholder="Contoh: Cari Tipe 36 subsidi dekat kantor Pemda Garut..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  Simpan ke Direktori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WEBHOOK INTEGRATION & SIMULATOR MODAL */}
      {isWebhookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Integrasi Webhook Leads Iklan</h3>
                  <p className="text-[11px] text-slate-500">Koneksi real-time Meta Ads (IG/FB), TikTok Lead Gen &amp; Google Ads</p>
                </div>
              </div>
              <button 
                onClick={() => setIsWebhookModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              
              {/* Endpoint Information Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Webhook Listener URL (Production)
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Ready (200 OK)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://api.homiq.co.id/v1/webhooks/meta-ads"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono text-slate-700 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://api.homiq.co.id/v1/webhooks/meta-ads');
                      showToast('URL Webhook berhasil disalin!', 'success');
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition shadow-2xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Salin
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600 border-t border-slate-200/60 font-mono">
                  <div>
                    <span className="text-slate-400">Verify Token:</span>
                    <p className="font-bold text-slate-800">homiq_sec_live_998</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Auto-Assign:</span>
                    <p className="font-bold text-blue-700">Round-Robin (3 Sales)</p>
                  </div>
                </div>
              </div>

              {/* Webhook Lead Ingestion Simulator Form */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    Simulator Pengujian Lead Masuk (Live Test)
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Simulasikan klik calon konsumen</span>
                </div>

                {/* Channel Selector */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSimChannel('meta')}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-semibold transition ${
                      simChannel === 'meta'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Instagram Ads
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimChannel('tiktok')}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-semibold transition ${
                      simChannel === 'tiktok'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    TikTok Lead Gen
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimChannel('google')}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-semibold transition ${
                      simChannel === 'google'
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Google Search
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nama Calon Prospek</label>
                    <input
                      type="text"
                      value={simLeadName}
                      onChange={(e) => setSimLeadName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nomor WhatsApp Prospek</label>
                    <input
                      type="text"
                      value={simLeadPhone}
                      onChange={(e) => setSimLeadPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Proyek Tertarget</label>
                    <select
                      value={simProject}
                      onChange={(e) => setSimProject(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {DEMO_PROJECTS.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nama Judul Iklan (Campaign)</label>
                    <input
                      type="text"
                      value={simCampaign}
                      onChange={(e) => setSimCampaign(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 pt-1">
                  Saat tombol di bawah diklik, sistem akan mengeksekusi payload webhook, memasukkan prospek baru ke antrean CRM secara instan, dan membagikannya secara adil ke staf sales.
                </p>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsWebhookModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
                  >
                    Tutup
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulateWebhook}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Simulasi Webhook Lead</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
