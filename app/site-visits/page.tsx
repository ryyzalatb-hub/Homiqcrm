'use client';
import React, { useState } from 'react';
import { DEMO_SITE_VISITS, DEMO_PROJECTS, SiteVisit } from '@/lib/demo-data';
import { 
  MapPinCheck, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Plus, 
  CheckCircle2, 
  Building, 
  UserCheck, 
  X, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Navigation, 
  CalendarDays, 
  Sparkles, 
  Search, 
  Filter, 
  Check,
  Compass,
  Share2,
  Download
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { buildWhatsAppLink, WhatsAppTemplates, formatPhoneDisplay } from '@/lib/whatsapp';

export default function SiteVisitsPage() {
  const { showToast } = useToast();
  const [visits, setVisits] = useState<SiteVisit[]>(DEMO_SITE_VISITS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapGuideModalProject, setMapGuideModalProject] = useState<string | null>(null);

  // Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProject, setNewProject] = useState(DEMO_PROJECTS[0].name);
  const [newUnitCode, setNewUnitCode] = useState('Blok A-05');
  const [newTime, setNewTime] = useState('Besok, 14:00 WIB');
  const [newPIC, setNewPIC] = useState('Kang Dika Pratama');
  const [newNotes, setNewNotes] = useState('');

  const handleCompleteVisit = (visitId: string, leadName: string) => {
    setVisits(prev => prev.map(v => v.id === visitId ? { ...v, status: 'completed' } : v));
    showToast(`Survei lokasi untuk "${leadName}" berhasil ditandai selesai!`, 'success');
  };

  const handleAddVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newPhone.trim()) {
      showToast('Nama calon pembeli dan nomor kontak wajib diisi.', 'error');
      return;
    }

    const created: SiteVisit = {
      id: `sv-${Date.now()}`,
      lead_name: newLeadName.trim(),
      phone: newPhone.trim(),
      project_name: newProject,
      unit_code: newUnitCode.trim(),
      scheduled_at: newTime,
      marketing_name: newPIC,
      status: 'scheduled',
      notes: newNotes.trim() || 'Kunjungan survei lokasi dijadwalkan.'
    };

    setVisits(prev => [created, ...prev]);
    setIsModalOpen(false);
    showToast(`Jadwal survei baru untuk ${created.lead_name} berhasil dibuat!`, 'success');

    // Reset
    setNewLeadName('');
    setNewPhone('');
    setNewNotes('');
  };

  const handleExportVisitsCSV = () => {
    const headers = ['Nama Calon Pembeli', 'Nomor WhatsApp', 'Proyek Perumahan', 'Unit Diminati', 'Jadwal Survei', 'PIC Marketing Pendamping', 'Status Survei', 'Catatan'];
    const rows = filteredVisits.map(v => [
      `"${v.lead_name}"`,
      `"${v.phone}"`,
      `"${v.project_name}"`,
      `"${v.unit_code}"`,
      `"${v.scheduled_at}"`,
      `"${v.marketing_name}"`,
      `"${v.status === 'completed' ? 'Selesai' : 'Terjadwal'}"`,
      `"${(v.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `homiq-jadwal-survei-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${filteredVisits.length} data agenda survei berhasil diekspor ke format CSV / Excel!`, 'success');
  };

  // Filter & Search
  const filteredVisits = visits.filter(v => {
    const matchesSearch = 
      v.lead_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.phone.includes(searchQuery) ||
      v.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.marketing_name.toLowerCase().includes(searchQuery.toLowerCase());

    const isToday = v.scheduled_at.toLowerCase().includes('hari ini');
    const isCompleted = v.status === 'completed';

    if (selectedFilter === 'today') return matchesSearch && isToday;
    if (selectedFilter === 'upcoming') return matchesSearch && !isCompleted && !isToday;
    if (selectedFilter === 'completed') return matchesSearch && isCompleted;
    return matchesSearch;
  });

  const todayCount = visits.filter(v => v.scheduled_at.toLowerCase().includes('hari ini')).length;
  const completedCount = visits.filter(v => v.status === 'completed').length;
  const upcomingCount = visits.filter(v => v.status === 'scheduled' && !v.scheduled_at.toLowerCase().includes('hari ini')).length;

  const getMapsUrl = (projectName: string) => {
    const query = encodeURIComponent(`${projectName} Garut Jawa Barat`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const getCalendarUrl = (visit: SiteVisit) => {
    const title = encodeURIComponent(`Survei Unit ${visit.project_name} - ${visit.lead_name}`);
    const details = encodeURIComponent(
      `Survei Show Unit & Lokasi Kavling\nKonsumen: ${visit.lead_name} (${visit.phone})\nUnit Diminati: ${visit.unit_code}\nPIC Marketing: ${visit.marketing_name}\nCatatan: ${visit.notes || '-'}`
    );
    const location = encodeURIComponent(`${visit.project_name}, Garut`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const projectGuides: Record<string, { address: string; coords: string; landmark: string; picOffice: string }> = {
    'Bumi Cimanuk Asri': {
      address: 'Jl. Raya Cimanuk Km 4, Tarogong Kidul, Garut',
      coords: '-7.2144, 107.8988',
      landmark: '200 meter sebelah timur Bundaran Simpang Lima Garut, samping Kantor BPJS Ketenagakerjaan.',
      picOffice: 'Pos Marketing Gallery Bumi Cimanuk (Standby Pukul 08:00 - 17:00 WIB)'
    },
    'Grand Karangpawitan': {
      address: 'Jl. Raya Karangpawitan No. 88, Karangpawitan, Garut',
      coords: '-7.2012, 107.9245',
      landmark: 'Dekat Kantor Camat Karangpawitan, gerbang masuk gapura batu andesit megah.',
      picOffice: 'Show Unit Blok B-01 (Standby Pukul 08:00 - 17:00 WIB)'
    },
    'Emerald Hillside': {
      address: 'Kawasan Wisata Cipanas, Tarogong Kaler, Garut',
      coords: '-7.1789, 107.8821',
      landmark: 'Akses jalan utama Cipanas, 3 menit dari Pemandian Air Panas Sabda Alam.',
      picOffice: 'Clubhouse & Marketing Lounge Lantai 1'
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      
      {/* Executive Midnight Navy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#1E293B] p-6 sm:p-7 text-white shadow-lg border border-slate-800/80">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <MapPinCheck className="w-3.5 h-3.5 text-amber-400" />
                Field Operations &bull; Show Unit
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Google Maps GPS Terhubung
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Jadwal Survei Lokasi &amp; Show Unit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manajemen jadwal kunjungan calon pembeli ke lapangan, panduan navigasi koordinat satelit perumahan, dan konfirmasi WhatsApp otomatis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportVisitsCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center gap-1.5"
              title="Ekspor Jadwal Survei ke Excel / CSV"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={() => setMapGuideModalProject('Bumi Cimanuk Asri')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Panduan Rute &amp; GPS</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Jadwalkan Survei Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Agenda Survei</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono mt-2 tracking-tight">
            {visits.length} <span className="text-sm font-semibold text-slate-500">Kunjungan</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Bulan berjalan 2026</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Survei Hari Ini</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 font-mono mt-2 tracking-tight">
            {todayCount} <span className="text-sm font-semibold text-amber-700">Konsumen</span>
          </p>
          <p className="text-[11px] text-amber-700 font-medium mt-2">Wajib didampingi konsultan PIC</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-indigo-600">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Jadwal Mendatang</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-indigo-600 font-mono mt-2 tracking-tight">
            {upcomingCount} <span className="text-sm font-semibold text-indigo-700">Konsumen</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Terjadwal pekan ini</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Survei Selesai (Visited)</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-2 tracking-tight">
            {completedCount} <span className="text-sm font-semibold text-emerald-700">Kunjungan</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-2">Tingkat konversi DP 82%</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama calon pembeli, nomor HP, perumahan, atau PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-stretch sm:self-auto border border-slate-200">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({visits.length})
          </button>
          <button
            onClick={() => setSelectedFilter('today')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedFilter === 'today' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hari Ini ({todayCount})
          </button>
          <button
            onClick={() => setSelectedFilter('upcoming')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedFilter === 'upcoming' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mendatang ({upcomingCount})
          </button>
          <button
            onClick={() => setSelectedFilter('completed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedFilter === 'completed' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selesai ({completedCount})
          </button>
        </div>
      </div>

      {/* Visits Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVisits.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">Tidak ada jadwal survei yang sesuai filter.</p>
            <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau jadwalkan survei baru.</p>
          </div>
        ) : (
          filteredVisits.map((visit) => {
            const isCompleted = visit.status === 'completed';
            const isToday = visit.scheduled_at.toLowerCase().includes('hari ini');
            const waMessage = WhatsAppTemplates.siteVisitInvitation(
              visit.lead_name,
              visit.project_name,
              'Garut',
              visit.scheduled_at
            );
            const waLink = buildWhatsAppLink(visit.phone, waMessage);

            return (
              <div 
                key={visit.id} 
                className={`crm-card bg-white rounded-2xl border p-5 shadow-2xs hover:shadow-md transition space-y-4 relative flex flex-col justify-between ${
                  isCompleted 
                    ? 'border-slate-200/80 opacity-90' 
                    : isToday 
                      ? 'border-amber-300 ring-2 ring-amber-400/20' 
                      : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Status & Date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isToday
                            ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                            : 'bg-blue-50 text-blue-800 border-blue-300'
                      }`}>
                        {isCompleted ? 'SELESAI SURVEI' : isToday ? 'HARI INI' : 'MENDATANG'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{visit.scheduled_at}</span>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{visit.lead_name}</h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{formatPhoneDisplay(visit.phone)}</p>
                  </div>

                  {/* Property Unit Details */}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Perumahan:</span>
                      <span className="font-bold text-slate-900">{visit.project_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Minat Kavling:</span>
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {visit.unit_code}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">PIC Pendamping:</span>
                      <span className="font-semibold text-slate-800">{visit.marketing_name}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {visit.notes && (
                    <p className="text-[11px] text-slate-500 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                      &quot;{visit.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={getMapsUrl(visit.project_name)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition flex items-center gap-1"
                      title="Buka Peta Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>Google Maps</span>
                    </a>

                    <a
                      href={getCalendarUrl(visit)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition flex items-center gap-1"
                      title="Sinkron ke Google Calendar"
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
                      <span>Sync Calendar</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Kirim Undangan WA</span>
                    </a>

                    {!isCompleted ? (
                      <button
                        onClick={() => handleCompleteVisit(visit.id, visit.lead_name)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold transition flex items-center gap-1"
                        title="Tandai survei telah selesai"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Selesai</span>
                      </button>
                    ) : (
                      <span className="px-2.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Hadir</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Map Guide Modal */}
      {mapGuideModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Panduan Koordinat GPS &amp; Rute Show Unit</h3>
              </div>
              <button 
                onClick={() => setMapGuideModalProject(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Pilih Proyek:</span>
                <select
                  value={mapGuideModalProject}
                  onChange={(e) => setMapGuideModalProject(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-blue-700 focus:outline-none"
                >
                  <option value="Bumi Cimanuk Asri">Bumi Cimanuk Asri</option>
                  <option value="Grand Karangpawitan">Grand Karangpawitan</option>
                  <option value="Emerald Hillside">Emerald Hillside</option>
                </select>
              </div>

              {projectGuides[mapGuideModalProject] && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Alamat Resmi</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5">{projectGuides[mapGuideModalProject].address}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Koordinat GPS Satelit</span>
                    <p className="font-mono font-bold text-blue-700 text-xs mt-0.5">{projectGuides[mapGuideModalProject].coords}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Patokan Jalan &amp; Landmark</span>
                    <p className="text-slate-700 text-xs mt-0.5">{projectGuides[mapGuideModalProject].landmark}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Lokasi Pos Marketing</span>
                    <p className="text-emerald-700 font-semibold text-xs mt-0.5">{projectGuides[mapGuideModalProject].picOffice}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <a
                  href={getMapsUrl(mapGuideModalProject)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di Google Maps Live</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Visit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MapPinCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Jadwalkan Kunjungan Survei Baru</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddVisit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Calon Pembeli</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Deni Mulyadi"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Proyek Perumahan</label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  >
                    {DEMO_PROJECTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Minat Unit Kavling</label>
                  <input
                    type="text"
                    required
                    placeholder="Blok A-05"
                    value={newUnitCode}
                    onChange={(e) => setNewUnitCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Waktu &amp; Tanggal Survei</label>
                  <input
                    type="text"
                    required
                    placeholder="Besok, 14:00 WIB"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">PIC Marketing Pendamping</label>
                  <select
                    value={newPIC}
                    onChange={(e) => setNewPIC(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  >
                    <option value="Kang Dika Pratama">Kang Dika Pratama</option>
                    <option value="Teh Nisa Andriani">Teh Nisa Andriani</option>
                    <option value="Kang Fajar Ramadhan">Kang Fajar Ramadhan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Catatan Tambahan Konsumen</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Konsumen ingin melihat show unit tipe subsidi dan cek lebar jalan perumahan."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-sm transition"
                >
                  Simpan Jadwal Survei
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
