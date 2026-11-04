'use client';
import React, { useState } from 'react';
import { DEMO_LEADS, DEMO_PROJECTS } from '@/lib/demo-data';
import { Lead, LeadStatus } from '@/types';
import { 
  CalendarClock, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Building, 
  UserCheck, 
  Check, 
  RotateCcw, 
  Search,
  Filter,
  Eye,
  Calendar,
  X,
  Phone,
  Sparkles,
  DollarSign,
  ChevronRight,
  Send
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, WhatsAppTemplates, formatPhoneDisplay } from '@/lib/whatsapp';

type FollowUpStatus = 'all' | 'today' | 'overdue' | 'scheduled' | 'completed';

export default function FollowUpsPage() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [completedIds, setCompletedIds] = useState<string[]>(['l7']);
  const [activeTab, setActiveTab] = useState<FollowUpStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');

  // Modal States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailModalLead, setDetailModalLead] = useState<Lead | null>(null);
  const [modalType, setModalType] = useState<'complete' | 'reschedule' | null>(null);
  const [interactionNote, setInteractionNote] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('Besok, 10:00 WIB');

  // Helper to determine visual status
  const getFollowUpCategory = (lead: Lead): 'completed' | 'today' | 'overdue' | 'scheduled' => {
    if (completedIds.includes(lead.id) || lead.status === 'closing' || lead.next_follow_up.includes('Selesai')) {
      return 'completed';
    }
    if (lead.next_follow_up.includes('Hari ini')) {
      return 'today';
    }
    if (lead.next_follow_up.includes('Terlambat')) {
      return 'overdue';
    }
    return 'scheduled';
  };

  // Metric counts
  const countToday = leads.filter(l => getFollowUpCategory(l) === 'today').length;
  const countOverdue = leads.filter(l => getFollowUpCategory(l) === 'overdue').length;
  const countScheduled = leads.filter(l => getFollowUpCategory(l) === 'scheduled').length;
  const countCompleted = completedIds.length;

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const cat = getFollowUpCategory(lead);
    
    // Tab filtering
    if (activeTab === 'today' && cat !== 'today') return false;
    if (activeTab === 'overdue' && cat !== 'overdue') return false;
    if (activeTab === 'scheduled' && cat !== 'scheduled') return false;
    if (activeTab === 'completed' && cat !== 'completed') return false;

    // Project filtering
    if (projectFilter !== 'all' && lead.project_name !== projectFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.full_name.toLowerCase().includes(q);
      const matchPhone = lead.phone.includes(q);
      const matchProject = lead.project_name.toLowerCase().includes(q);
      const matchNotes = (lead.notes || '').toLowerCase().includes(q);
      const matchPIC = lead.assigned_to_name.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProject && !matchNotes && !matchPIC) {
        return false;
      }
    }

    return true;
  });

  const handleOpenCompleteModal = (lead: Lead) => {
    setSelectedLead(lead);
    setInteractionNote(`Telah menghubungi via WhatsApp. Prospek menanyakan ketersediaan unit dan simulasi angsuran.`);
    setModalType('complete');
  };

  const handleOpenRescheduleModal = (lead: Lead) => {
    setSelectedLead(lead);
    setRescheduleDate('Besok, 10:00 WIB');
    setModalType('reschedule');
  };

  const handleConfirmAction = () => {
    if (!selectedLead) return;

    if (modalType === 'complete') {
      setCompletedIds(prev => Array.from(new Set([...prev, selectedLead.id])));
      setLeads(prev => prev.map(l => {
        if (l.id === selectedLead.id) {
          return {
            ...l,
            last_contacted: 'Hari ini',
            next_follow_up: 'Selesai (Interaksi Tercatat)',
            notes: interactionNote ? `${l.notes || ''} | ${interactionNote}` : l.notes
          };
        }
        return l;
      }));
      showToast(`Follow-up ${selectedLead.full_name} berhasil ditandai selesai!`, 'success');
    } else if (modalType === 'reschedule') {
      setCompletedIds(prev => prev.filter(id => id !== selectedLead.id));
      setLeads(prev => prev.map(l => {
        if (l.id === selectedLead.id) {
          return {
            ...l,
            next_follow_up: rescheduleDate,
            notes: interactionNote ? `${l.notes || ''} | [Reschedule]: ${interactionNote}` : l.notes
          };
        }
        return l;
      }));
      showToast(`Follow-up ${selectedLead.full_name} dijadwalkan ulang ke ${rescheduleDate}.`, 'info');
    }

    setSelectedLead(null);
    setModalType(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header Banner - Executive Midnight Navy with Emerald Pulse */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 text-white shadow-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Smart Follow-up Engine</h2>
            <span className="text-[11px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Automation Ready
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Prioritas penanganan prospek pembeli, template pesan otomatis WhatsApp 628..., dan rekaman log komunikasi tim sales
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 z-10">
          <span className="text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-mono">
            Total Prospek: <strong className="text-white">{leads.length}</strong>
          </span>
        </div>
      </div>

      {/* 4 Follow-up Metric Summary Cards - Distinct Vibrancy & Tint */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <button 
          onClick={() => setActiveTab('today')}
          className={`text-left p-4 rounded-2xl border transition-all shadow-2xs ${
            activeTab === 'today' 
              ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-400/30 shadow-md' 
              : 'bg-gradient-to-br from-amber-500/15 via-amber-50/50 to-white border-amber-200/90 hover:border-amber-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-800">
            <span>Due Today</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-amber-900 mt-2">{countToday}</p>
          <p className="text-[11px] font-semibold text-amber-800/90 mt-0.5">Jadwal kontak hari ini</p>
        </button>

        <button 
          onClick={() => setActiveTab('overdue')}
          className={`text-left p-4 rounded-2xl border transition-all shadow-2xs ${
            activeTab === 'overdue' 
              ? 'bg-rose-100/80 border-rose-400 ring-2 ring-rose-400/30 shadow-md' 
              : 'bg-gradient-to-br from-rose-500/15 via-rose-50/50 to-white border-rose-200/90 hover:border-rose-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-800">
            <span>Overdue</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-700">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-rose-900 mt-2">{countOverdue}</p>
          <p className="text-[11px] font-semibold text-rose-800/90 mt-0.5">Melewati jadwal &gt; 24 jam</p>
        </button>

        <button 
          onClick={() => setActiveTab('scheduled')}
          className={`text-left p-4 rounded-2xl border transition-all shadow-2xs ${
            activeTab === 'scheduled' 
              ? 'bg-blue-100/80 border-blue-400 ring-2 ring-blue-400/30 shadow-md' 
              : 'bg-gradient-to-br from-blue-500/15 via-blue-50/50 to-white border-blue-200/90 hover:border-blue-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-blue-800">
            <span>Scheduled</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-700">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-blue-900 mt-2">{countScheduled}</p>
          <p className="text-[11px] font-semibold text-blue-800/90 mt-0.5">Akan datang / terjadwal</p>
        </button>

        <button 
          onClick={() => setActiveTab('completed')}
          className={`text-left p-4 rounded-2xl border transition-all shadow-2xs ${
            activeTab === 'completed' 
              ? 'bg-emerald-100/80 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md' 
              : 'bg-gradient-to-br from-emerald-500/15 via-emerald-50/50 to-white border-emerald-200/90 hover:border-emerald-300 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
            <span>Completed</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-mono text-emerald-900 mt-2">{countCompleted}</p>
          <p className="text-[11px] font-semibold text-emerald-800/90 mt-0.5">Interaksi selesai dicatat</p>
        </button>

      </div>

      {/* Filter, Search & Tab Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Navigation Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'all' 
                ? 'bg-slate-900 text-white font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Semua ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'today' 
                ? 'bg-amber-600 text-white font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Due Today ({countToday})
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'overdue' 
                ? 'bg-rose-600 text-white font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Overdue ({countOverdue})
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'scheduled' 
                ? 'bg-blue-600 text-white font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Scheduled ({countScheduled})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'completed' 
                ? 'bg-emerald-600 text-white font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Completed ({countCompleted})
          </button>
        </div>

        {/* Search & Project Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari prospek, no WA, catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-700"
          >
            <option value="all">Semua Proyek</option>
            {DEMO_PROJECTS.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Customer Cards Grid */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-800">Tidak ada antrean follow-up</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Tidak ada calon pembeli yang sesuai dengan kriteria filter saat ini.
          </p>
          <button
            onClick={() => { setActiveTab('all'); setSearchQuery(''); setProjectFilter('all'); }}
            className="mt-4 px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500 transition"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLeads.map(lead => {
            const cat = getFollowUpCategory(lead);
            const waLink = buildWhatsAppLink(
              lead.phone,
              WhatsAppTemplates.followUp(lead.full_name, lead.project_name, lead.assigned_to_name)
            );

            // Status visual config
            let statusPill = {
              label: 'Scheduled',
              classes: 'bg-blue-50 text-blue-800 border-blue-200',
              borderLeft: 'border-l-4 border-l-blue-600',
              avatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
            };
            if (cat === 'today') {
              statusPill = { 
                label: 'Due Today', 
                classes: 'bg-amber-50 text-amber-800 border-amber-200',
                borderLeft: 'border-l-4 border-l-amber-500',
                avatarBg: 'bg-gradient-to-br from-amber-500 to-amber-700 text-white'
              };
            } else if (cat === 'overdue') {
              statusPill = { 
                label: 'Overdue', 
                classes: 'bg-rose-50 text-rose-800 border-rose-200',
                borderLeft: 'border-l-4 border-l-rose-500',
                avatarBg: 'bg-gradient-to-br from-rose-500 to-rose-700 text-white'
              };
            } else if (cat === 'completed') {
              statusPill = { 
                label: 'Completed', 
                classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                borderLeft: 'border-l-4 border-l-emerald-500',
                avatarBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white'
              };
            }

            return (
              <div
                key={lead.id}
                className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-all duration-150 flex flex-col justify-between space-y-4 ${statusPill.borderLeft}`}
              >
                
                {/* Card Top: Customer Info & Status Badge */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${statusPill.avatarBg}`}>
                        {lead.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-tight">
                          {lead.full_name}
                        </h3>
                        <p className="text-xs font-mono text-slate-500 mt-0.5 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{formatPhoneDisplay(lead.phone)}</span>
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusPill.classes} shrink-0`}>
                      {statusPill.label}
                    </span>
                  </div>

                  {/* Property, Budget & PIC Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[11px] text-slate-400">Proyek Diminati</span>
                      <p className="font-semibold text-slate-800 truncate mt-0.5">{lead.project_name}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[11px] text-slate-400">Estimasi Budget</span>
                      <p className="font-bold text-slate-800 font-mono mt-0.5">
                        Rp {(lead.budget / 1000000).toLocaleString('id-ID')} Jt
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[11px] text-slate-400">PIC Marketing</span>
                      <p className="font-semibold text-slate-700 truncate mt-0.5">{lead.assigned_to_name}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[11px] text-slate-400">Status Pipeline</span>
                      <p className="font-semibold text-blue-700 truncate mt-0.5 capitalize">
                        {lead.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Schedule & Notes */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">Jadwal:</span>
                      <span className={cat === 'overdue' ? 'text-rose-600 font-bold' : cat === 'today' ? 'text-amber-700 font-bold' : 'text-slate-600'}>
                        {lead.next_follow_up}
                      </span>
                    </div>

                    {lead.notes && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic line-clamp-2">
                        &quot;{lead.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Bottom: 4 Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Kirim WhatsApp */}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 transition"
                      title="Buka WhatsApp dengan nomor terformat 628..."
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Kirim WA</span>
                    </a>

                    {/* Lihat Detail */}
                    <button
                      onClick={() => setDetailModalLead(lead)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Detail</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Tandai Selesai */}
                    <button
                      onClick={() => handleOpenCompleteModal(lead)}
                      disabled={cat === 'completed'}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                        cat === 'completed'
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Selesai</span>
                    </button>

                    {/* Jadwalkan Ulang */}
                    <button
                      onClick={() => handleOpenRescheduleModal(lead)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
                      title="Jadwalkan Ulang (Reschedule)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Complete / Reschedule Action Modal */}
      {selectedLead && modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setSelectedLead(null)} 
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${modalType === 'complete' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {modalType === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  {modalType === 'complete' ? 'Tandai Follow-up Selesai' : 'Jadwalkan Ulang Follow-up'}
                </h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p className="font-bold text-slate-900">{selectedLead.full_name}</p>
              <p className="text-slate-500">{selectedLead.project_name} &bull; {selectedLead.phone}</p>
            </div>

            {modalType === 'reschedule' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Waktu Kontak Baru
                </label>
                <input
                  type="text"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  placeholder="Contoh: Besok, 10:00 WIB"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan Hasil Komunikasi / Respon Prospek
              </label>
              <textarea
                rows={3}
                value={interactionNote}
                onChange={(e) => setInteractionNote(e.target.value)}
                placeholder="Tuliskan ringkasan hasil interaksi WhatsApp..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-white font-semibold rounded-lg shadow-xs transition ${
                  modalType === 'complete' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                {modalType === 'complete' ? 'Simpan & Selesai' : 'Simpan Jadwal Baru'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Lihat Detail Lead Dossier */}
      {detailModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setDetailModalLead(null)} 
          />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  {detailModalLead.full_name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{detailModalLead.full_name}</h3>
                  <p className="text-[11px] text-slate-500">Profil & Dossier Riwayat Prospek</p>
                </div>
              </div>
              <button onClick={() => setDetailModalLead(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Nomor WhatsApp</span>
                <p className="font-bold text-slate-800 font-mono mt-0.5">{formatPhoneDisplay(detailModalLead.phone)}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Sumber Lead</span>
                <p className="font-semibold text-slate-800 mt-0.5">{detailModalLead.source}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Proyek Diminati</span>
                <p className="font-semibold text-slate-800 mt-0.5">{detailModalLead.project_name}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Anggaran / Budget</span>
                <p className="font-bold text-emerald-700 font-mono mt-0.5">
                  Rp {(detailModalLead.budget / 1000000).toLocaleString('id-ID')} Juta
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">PIC Marketing</span>
                <p className="font-semibold text-slate-800 mt-0.5">{detailModalLead.assigned_to_name}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Prioritas Prospek</span>
                <p className="font-bold text-rose-700 uppercase mt-0.5">{detailModalLead.priority}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
              <span className="font-semibold text-slate-700">Catatan & Histori Interaksi Terakhir:</span>
              <p className="text-slate-600 italic">
                {detailModalLead.notes || 'Belum ada catatan interaksi.'}
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Kontak terakhir: {detailModalLead.last_contacted} &bull; Jadwal kontak: {detailModalLead.next_follow_up}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={buildWhatsAppLink(
                  detailModalLead.phone,
                  WhatsAppTemplates.followUp(detailModalLead.full_name, detailModalLead.project_name, detailModalLead.assigned_to_name)
                )}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat via WhatsApp</span>
              </a>

              <button
                onClick={() => setDetailModalLead(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
