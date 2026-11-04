'use client';
import React, { useState } from 'react';
import { 
  Building2, 
  Camera, 
  Layers, 
  Download, 
  Share2, 
  Calculator, 
  MapPin, 
  BedDouble, 
  Bath, 
  Car, 
  Maximize2, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  Home,
  Compass,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { DEMO_PROJECTS } from '@/lib/demo-data';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { useToast } from '@/components/ui/Toast';

interface GalleryRoom {
  id: string;
  label: string;
  tag: string;
  imageUrl: string;
  description: string;
}

interface ProjectShowcase {
  id: string;
  name: string;
  tagline: string;
  price: string;
  cicilan: string;
  location: string;
  type: string;
  specs: {
    lt: number;
    lb: number;
    kt: number;
    km: number;
    carport: number;
    listrik: string;
    air: string;
    sertifikat: string;
  };
  rooms: GalleryRoom[];
}

const SHOWCASE_DATA: ProjectShowcase[] = [
  {
    id: 'p1',
    name: 'Bumi Cimanuk Asri',
    tagline: 'Hunian Subsidi FLPP Berkualitas Real Estate Dekat Pusat Kota Garut',
    price: 'Rp 166.000.000',
    cicilan: 'Mulai Rp 1.050.000 / bln (Bunga 5% Flat)',
    location: 'Tarogong Kidul, Garut (8 Menit dari Alun-alun & Stasiun)',
    type: 'Tipe 36/60 Standar',
    specs: {
      lt: 60,
      lb: 36,
      kt: 2,
      km: 1,
      carport: 1,
      listrik: '1.300 VA',
      air: 'PDAM Tirta Intan Garut',
      sertifikat: 'SHM & IMB/PBG Sudah Pecah Per Kavling'
    },
    rooms: [
      {
        id: 'r1',
        label: 'Fasad Depan Modern',
        tag: 'Eksterior',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        description: 'Tampilan muka bergaya minimalis kontemporer dengan aksen batu alam, kanopi carport, dan taman depan asri.'
      },
      {
        id: 'r2',
        label: 'Ruang Tamu & Keluarga',
        tag: 'Interior',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        description: 'Plafon tinggi 3.6 meter memberikan sirkulasi udara sejuk alami dan pencahayaan maksimal sepanjang hari.'
      },
      {
        id: 'r3',
        label: 'Kamar Tidur Utama',
        tag: 'Kamar Tidur',
        imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
        description: 'Kamar tidur lega berukuran 3x3 meter dengan jendela ventilasi silang yang menghadap langsung ke taman belakang.'
      },
      {
        id: 'r4',
        label: 'Dapur & Meja Makan',
        tag: 'Area Servis',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        description: 'Meja dapur cor beton dilapisi keramik motif marmer, dilengkapi bak cuci piring stainless steel dan kran leher angsa.'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Grand Karangpawitan Residence',
    tagline: 'Perumahan Komersial Eksklusif dengan Nilai Investasi Tertinggi di Jalur Provinsi',
    price: 'Rp 345.000.000',
    cicilan: 'Mulai Rp 2.450.000 / bln',
    location: 'Karangpawitan, Garut (12 Menit Menuju Rencana Exit Tol Gedebage-Tasik)',
    type: 'Tipe 45/72 Tropis Modern',
    specs: {
      lt: 72,
      lb: 45,
      kt: 2,
      km: 1,
      carport: 1,
      listrik: '2.200 VA',
      air: 'Jetpump / Sumber Air Pegunungan Jernih',
      sertifikat: 'SHM Perorangan Siap Balik Nama'
    },
    rooms: [
      {
        id: 'r2-1',
        label: 'Fasad Tropis Kontemporer',
        tag: 'Eksterior',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        description: 'Arsitektur tropis modern dengan kombinasi kisi-kisi kayu estetis dan carport lebar yang memuat mobil SUV.'
      },
      {
        id: 'r2-2',
        label: 'Open-Concept Living Room',
        tag: 'Interior',
        imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        description: 'Konsep ruang terbuka tanpa sekat yang menyatukan area tamu, ruang makan, dan inner courtyard taman belakang.'
      },
      {
        id: 'r2-3',
        label: 'Kamar Tidur Utama Mewah',
        tag: 'Kamar Tidur',
        imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        description: 'Lantai granit 60x60 cm glazed polished yang memberikan kesan sejuk dan mewah.'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Banyuresmi Hillside',
    tagline: 'Villa Asri Mountain View Dekat Kawasan Wisata Bahari Danau Situ Bagendit Garut',
    price: 'Rp 485.000.000',
    cicilan: 'Mulai Rp 3.450.000 / bln',
    location: 'Banyuresmi, Garut (4 Menit dari Objek Wisata Situ Bagendit)',
    type: 'Tipe 54/84 Villa Mountain Breeze',
    specs: {
      lt: 84,
      lb: 54,
      kt: 3,
      km: 2,
      carport: 2,
      listrik: '2.200 VA',
      air: 'PDAM Garut + Water Filter',
      sertifikat: 'SHM Murni On Hand'
    },
    rooms: [
      {
        id: 'r3-1',
        label: 'Fasad Scandinavian Villa',
        tag: 'Eksterior',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        description: 'Desain villa Scandinavian beratap pelana modern dengan view panorama langsung ke Gunung Guntur dan Gunung Cikuray.'
      },
      {
        id: 'r3-2',
        label: 'Ruang Keluarga Mewah',
        tag: 'Interior',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        description: 'Kaca jendela full-height dari lantai ke plafon memaksimalkan pemandangan bukit hijau dan udara segar pegunungan.'
      },
      {
        id: 'r3-3',
        label: 'Taman Santai Belakang',
        tag: 'Taman',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        description: 'Halaman belakang luas yang siap digunakan untuk area BBQ keluarga, mini gazebo, atau taman bunga tropis.'
      }
    ]
  }
];

export default function PropertyGalleryPage() {
  const { showToast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('p1');
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);

  const currentProject = SHOWCASE_DATA.find(p => p.id === selectedProjectId) || SHOWCASE_DATA[0];
  const activeRoom = currentProject.rooms[selectedRoomIndex] || currentProject.rooms[0];

  const handleDownloadBrochure = () => {
    showToast(`Brosur digital resmi untuk ${currentProject.name} berhasil diunduh (PDF)!`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="crm-card bg-gradient-to-r from-[#0A0F1D] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-blue-400" />
                VIRTUAL SHOWROOM & ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400 font-medium">Resolusi Tinggi 4K</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Galeri Properti & Show Unit Virtual
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Eksplorasi visual perumahan, arsitektur fasad muka, tata ruang interior, dan spesifikasi teknis bangunan yang dikembangkan oleh PT Garut Sejahtera Propertindo.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadBrochure}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm shadow-blue-500/30"
            >
              <Download className="w-4 h-4" />
              Unduh E-Katalog PDF
            </button>
            <Link
              href="/siteplan"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              Pilih di Siteplan
            </Link>
          </div>
        </div>
      </div>

      {/* Project Switcher Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {SHOWCASE_DATA.map(proj => (
          <button
            key={proj.id}
            onClick={() => {
              setSelectedProjectId(proj.id);
              setSelectedRoomIndex(0);
            }}
            className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition shrink-0 flex items-center gap-3 border ${
              selectedProjectId === proj.id
                ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <div className="text-left">
              <span className="block leading-tight">{proj.name}</span>
              <span className={`text-[10px] font-normal font-mono ${selectedProjectId === proj.id ? 'text-blue-100' : 'text-slate-400'}`}>
                {proj.price}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Showcase Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Big Screen Photo Viewer with Ambient Glow */}
        <div className="lg:col-span-8 space-y-4">
          <div className="crm-card bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Active Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 group">
              <img
                src={activeRoom.imageUrl}
                alt={activeRoom.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Tag pill top left */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  {activeRoom.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-mono font-bold">
                  {currentProject.type}
                </span>
              </div>

              {/* Description bottom overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
                  {activeRoom.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow max-w-2xl leading-relaxed">
                  {activeRoom.description}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex gap-3 overflow-x-auto">
              {currentProject.rooms.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomIndex(idx)}
                  className={`relative w-28 aspect-video rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    selectedRoomIndex === idx
                      ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-lg scale-105'
                      : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                  }`}
                >
                  <img src={room.imageUrl} alt={room.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white bg-slate-900/80 rounded px-1 truncate block text-center">
                    {room.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Specifications & Financing Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="crm-card bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            
            {/* Project Header */}
            <div>
              <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-blue-600 block mb-1">
                Spesifikasi Teknis & Legalitas
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {currentProject.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                {currentProject.location}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Harga Jual Mulai Dari
              </span>
              <div className="text-2xl font-black text-blue-900 font-mono">
                {currentProject.price}
              </div>
              <span className="text-xs text-blue-700 font-medium block">
                {currentProject.cicilan}
              </span>
            </div>

            {/* Room Features Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">LT / LB</span>
                  <strong className="text-slate-800 font-mono">{currentProject.specs.lt} / {currentProject.specs.lb} m²</strong>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Kamar Tidur</span>
                  <strong className="text-slate-800 font-mono">{currentProject.specs.kt} Ruangan</strong>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <Bath className="w-4 h-4 text-teal-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Kamar Mandi</span>
                  <strong className="text-slate-800 font-mono">{currentProject.specs.km} Unit</strong>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Carport</span>
                  <strong className="text-slate-800 font-mono">{currentProject.specs.carport} Mobil</strong>
                </div>
              </div>
            </div>

            {/* Infrastructure Details */}
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Pasokan Listrik</span>
                <span className="font-bold text-slate-800">{currentProject.specs.listrik}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Sumber Air Bersih</span>
                <span className="font-bold text-slate-800">{currentProject.specs.air}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status Legalitas</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  SHM Lengkap
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Link
                href="/kpr-calculator"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20"
              >
                <Calculator className="w-4 h-4" />
                Simulasikan Angsuran KPR BTN
              </Link>

              <a
                href={buildWhatsAppLink(
                  '6281234567890',
                  `Halo Marketing Garut Sejahtera, saya tertarik dengan foto show unit ${currentProject.name} (${currentProject.type}). Boleh minta jadwal survei ke lokasinya besok?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20"
              >
                <Phone className="w-3.5 h-3.5" />
                Hubungi Konsultan via WhatsApp
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
