'use client';
import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Train, 
  Building2, 
  GraduationCap, 
  Stethoscope, 
  ShoppingBag, 
  Trees, 
  Car, 
  Clock, 
  ExternalLink, 
  Share2, 
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DEMO_PROJECTS } from '@/lib/demo-data';
import { useToast } from '@/components/ui/Toast';

interface POI {
  id: string;
  name: string;
  category: 'transit' | 'hospital' | 'education' | 'lifestyle';
  distanceP1: string; // from Bumi Cimanuk Asri
  timeP1: string;
  distanceP2: string; // from Grand Karangpawitan
  timeP2: string;
  distanceP3: string; // from Banyuresmi Hillside
  timeP3: string;
}

const GARUT_POIS: POI[] = [
  {
    id: 'poi-1',
    name: 'Stasiun Kereta Garut (Jalur Utama)',
    category: 'transit',
    distanceP1: '3.2 km',
    timeP1: '8 Menit',
    distanceP2: '4.8 km',
    timeP2: '12 Menit',
    distanceP3: '7.5 km',
    timeP3: '18 Menit'
  },
  {
    id: 'poi-2',
    name: 'Rencana Gerbang Tol Getaci (Garut Kota)',
    category: 'transit',
    distanceP1: '4.5 km',
    timeP1: '10 Menit',
    distanceP2: '3.1 km',
    timeP2: '7 Menit',
    distanceP3: '8.2 km',
    timeP3: '16 Menit'
  },
  {
    id: 'poi-3',
    name: 'RSU dr. Slamet Garut (Rumah Sakit Rujukan)',
    category: 'hospital',
    distanceP1: '2.4 km',
    timeP1: '6 Menit',
    distanceP2: '5.2 km',
    timeP2: '14 Menit',
    distanceP3: '6.8 km',
    timeP3: '15 Menit'
  },
  {
    id: 'poi-4',
    name: 'Alun-alun & Masjid Agung Garut',
    category: 'lifestyle',
    distanceP1: '3.0 km',
    timeP1: '7 Menit',
    distanceP2: '4.2 km',
    timeP2: '10 Menit',
    distanceP3: '8.0 km',
    timeP3: '18 Menit'
  },
  {
    id: 'poi-5',
    name: 'Danau & Objek Wisata Situ Bagendit',
    category: 'lifestyle',
    distanceP1: '9.5 km',
    timeP1: '20 Menit',
    distanceP2: '8.2 km',
    timeP2: '18 Menit',
    distanceP3: '1.8 km',
    timeP3: '4 Menit'
  },
  {
    id: 'poi-6',
    name: 'Universitas Garut (Kampus Utama UNIGA)',
    category: 'education',
    distanceP1: '1.8 km',
    timeP1: '4 Menit',
    distanceP2: '6.0 km',
    timeP2: '15 Menit',
    distanceP3: '5.4 km',
    timeP3: '12 Menit'
  },
  {
    id: 'poi-7',
    name: 'Mall Intan Bisnis Center (IBC Garut)',
    category: 'lifestyle',
    distanceP1: '3.5 km',
    timeP1: '9 Menit',
    distanceP2: '3.8 km',
    timeP2: '9 Menit',
    distanceP3: '7.8 km',
    timeP3: '17 Menit'
  }
];

export default function MapExplorerPage() {
  const { showToast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('p1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'transit' | 'hospital' | 'education' | 'lifestyle'>('all');

  const currentProject = DEMO_PROJECTS.find(p => p.id === selectedProjectId) || DEMO_PROJECTS[0];

  const filteredPois = GARUT_POIS.filter(poi => {
    return selectedCategory === 'all' || poi.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="crm-card bg-gradient-to-r from-[#0A0F1D] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                GEO-SPATIAL COMMUTE & AMENITIES
              </span>
              <span className="text-xs text-slate-400 font-medium">Radius Garut Terpadu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Peta Lokasi & Aksesibilitas Proyek
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Analisis jarak tempuh, fasilitas umum, sarana transportasi kereta & jalan tol, serta destinasi strategis di sekitar kawasan perumahan PT Garut Sejahtera Propertindo.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://maps.google.com/?q=Garut,+Jawa+Barat"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm shadow-blue-500/30"
            >
              <ExternalLink className="w-4 h-4" />
              Buka Google Maps Garut
            </a>
          </div>
        </div>
      </div>

      {/* Project Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DEMO_PROJECTS.map(proj => {
          const isSelected = selectedProjectId === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/50'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
              }`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm truncate">{proj.name}</h3>
                <p className={`text-xs mt-0.5 truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {proj.city}
                </p>
                <span className={`text-[10px] font-mono font-bold mt-1 inline-block ${isSelected ? 'text-amber-300' : 'text-blue-600'}`}>
                  {proj.id === 'p1' ? 'Rp 166 Jt (Subsidi)' : proj.id === 'p2' ? 'Rp 345 Jt (Komersial)' : 'Rp 485 Jt (Villa)'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Map Visualizer & Commute Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Schematic Radar Map */}
        <div className="lg:col-span-6 space-y-4">
          <div className="crm-card bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden text-white min-h-[480px] flex flex-col justify-between">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs font-bold text-slate-300 uppercase">
                  Radar Geografis: {currentProject.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Akses Jalan Cor Beton 8m
              </span>
            </div>

            {/* Stylized Visual Coordinates Diagram */}
            <div className="relative py-12 flex items-center justify-center">
              
              {/* Radar Circles */}
              <div className="absolute w-72 h-72 rounded-full border border-dashed border-slate-800 pointer-events-none"></div>
              <div className="absolute w-48 h-48 rounded-full border border-slate-800 pointer-events-none"></div>
              <div className="absolute w-24 h-24 rounded-full border border-blue-500/20 pointer-events-none animate-ping"></div>

              {/* Central Project Pin */}
              <div className="relative z-10 text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/50 ring-4 ring-blue-500/30 animate-bounce">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{currentProject.name}</h4>
                  <span className="text-[11px] font-mono text-blue-300">Titik Koordinat Utama</span>
                </div>
              </div>

              {/* Surrounding Nodes */}
              <div className="absolute top-2 left-6 text-left p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                <span className="text-amber-400 font-bold block">🚆 Stasiun Kereta</span>
                <span className="text-[10px] text-slate-300 font-mono">
                  {selectedProjectId === 'p1' ? '3.2 km (8 Mnt)' : selectedProjectId === 'p2' ? '4.8 km (12 Mnt)' : '7.5 km (18 Mnt)'}
                </span>
              </div>

              <div className="absolute top-4 right-6 text-right p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                <span className="text-emerald-400 font-bold block">🚗 Rencana Tol Getaci</span>
                <span className="text-[10px] text-slate-300 font-mono">
                  {selectedProjectId === 'p1' ? '4.5 km (10 Mnt)' : selectedProjectId === 'p2' ? '3.1 km (7 Mnt)' : '8.2 km (16 Mnt)'}
                </span>
              </div>

              <div className="absolute bottom-4 left-6 text-left p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                <span className="text-rose-400 font-bold block">🏥 RSU dr. Slamet</span>
                <span className="text-[10px] text-slate-300 font-mono">
                  {selectedProjectId === 'p1' ? '2.4 km (6 Mnt)' : selectedProjectId === 'p2' ? '5.2 km (14 Mnt)' : '6.8 km (15 Mnt)'}
                </span>
              </div>

              <div className="absolute bottom-2 right-6 text-right p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                <span className="text-teal-400 font-bold block">🌊 Situ Bagendit</span>
                <span className="text-[10px] text-slate-300 font-mono">
                  {selectedProjectId === 'p1' ? '9.5 km (20 Mnt)' : selectedProjectId === 'p2' ? '8.2 km (18 Mnt)' : '1.8 km (4 Mnt)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-400" />
                Transportasi Umum & Angkutan Kota (Angkot 01, 02, 09) Lewat Depan Gerbang
              </span>
              <span className="font-bold text-emerald-400">100% Bebas Banjir</span>
            </div>
          </div>
        </div>

        {/* Right: Detailed POI Table */}
        <div className="lg:col-span-6 space-y-4">
          <div className="crm-card bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Matriks Waktu Tempuh & Jarak</h3>
                <p className="text-xs text-slate-500">Estimasi perjalanan dari {currentProject.name}</p>
              </div>

              {/* Category Pills */}
              <div className="flex gap-1 text-[11px] font-semibold">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${selectedCategory === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setSelectedCategory('transit')}
                  className={`px-2.5 py-1 rounded-lg transition ${selectedCategory === 'transit' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
                >
                  Akses
                </button>
                <button
                  onClick={() => setSelectedCategory('hospital')}
                  className={`px-2.5 py-1 rounded-lg transition ${selectedCategory === 'hospital' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
                >
                  Medis
                </button>
                <button
                  onClick={() => setSelectedCategory('lifestyle')}
                  className={`px-2.5 py-1 rounded-lg transition ${selectedCategory === 'lifestyle' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
                >
                  Wisata
                </button>
              </div>
            </div>

            {/* List of Amenities */}
            <div className="divide-y divide-slate-100 space-y-1">
              {filteredPois.map(poi => {
                const dist = selectedProjectId === 'p1' ? poi.distanceP1 : selectedProjectId === 'p2' ? poi.distanceP2 : poi.distanceP3;
                const time = selectedProjectId === 'p1' ? poi.timeP1 : selectedProjectId === 'p2' ? poi.timeP2 : poi.timeP3;

                return (
                  <div key={poi.id} className="pt-2.5 pb-2 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded-lg transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        {poi.category === 'transit' && <Train className="w-4 h-4 text-blue-600" />}
                        {poi.category === 'hospital' && <Stethoscope className="w-4 h-4 text-rose-600" />}
                        {poi.category === 'education' && <GraduationCap className="w-4 h-4 text-indigo-600" />}
                        {poi.category === 'lifestyle' && <ShoppingBag className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <div>
                        <strong className="text-slate-800 text-xs block">{poi.name}</strong>
                        <span className="text-[10px] text-slate-400 capitalize">{poi.category}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-slate-900 block">{dist}</span>
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        {time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              *Data waktu tempuh dihitung dalam kecepatan normal mobil/motor harian dan terintegrasi dengan peta tata ruang Pemerintah Kabupaten Garut.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
