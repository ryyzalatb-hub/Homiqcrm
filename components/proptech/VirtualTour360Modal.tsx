'use client';
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Layers, 
  Check, 
  Maximize2, 
  Minimize2,
  Sparkles,
  ArrowRight,
  Eye,
  Info
} from 'lucide-react';

interface RoomScene {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  highlights: string[];
  specs: { area: string; ceiling: string; lighting: string };
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'living',
    name: 'Grand Living & Void Area',
    category: 'Ruang Utama',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    description: 'Desain open-space dengan void plafon 4.8 meter yang menciptakan sirkulasi udara alami dan pencahayaan melimpah.',
    highlights: ['Plafon Double Height 4.8M', 'Lantai Homogeneous Tile 60x60', 'Kaca Tempered Low-E'],
    specs: { area: '24 m²', ceiling: '4.8 m', lighting: 'Warm Indirect LED' }
  },
  {
    id: 'master',
    name: 'Executive Master Suite',
    category: 'Kamar Tidur Utama',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85',
    description: 'Kamar tidur luas bernuansa hotel bintang 5 dengan akses balkon pribadi, walk-in closet, dan kamar mandi dalam.',
    highlights: ['Private Balcony Access', 'Parket Kayu Solid Spanyol', 'Smart Home Ambient Dimmer'],
    specs: { area: '18 m²', ceiling: '3.4 m', lighting: 'Recessed 3000K' }
  },
  {
    id: 'kitchen',
    name: 'Gourmet Kitchen & Dining Island',
    category: 'Dapur & Ruang Makan',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85',
    description: 'Kitchen set modern dengan island table berlapis marmer Carrara, kompor tanam induction, dan kitchen sink granit.',
    highlights: ['Island Table Carrara Marble', 'Exhaust Hood Stainless', 'Soft-close Blum Cabinet'],
    specs: { area: '14 m²', ceiling: '3.2 m', lighting: 'Pendant Brass Lamp' }
  },
  {
    id: 'pool',
    name: 'Courtyard & Zen Plunge Pool',
    category: 'Taman Dalam & Kolam',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
    description: 'Area relaksasi keluarga di bagian belakang rumah dengan deck kayu ulin, dinding batu alam Andesit, dan kolam renang mini.',
    highlights: ['Decking Kayu Ulin Kalimantan', 'Batu Alam Andesit Garut', 'Water Feature Zen Fountain'],
    specs: { area: '20 m²', ceiling: 'Open Sky', lighting: 'Solar Path Lights' }
  }
];

interface VirtualTour360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  unitType?: string;
  onSelectBooking?: () => void;
}

export default function VirtualTour360Modal({
  isOpen,
  onClose,
  projectName = 'Bumi Cimanuk Asri',
  unitType = 'Tipe 45/72 Scandinavian Modern',
  onSelectBooking
}: VirtualTour360ModalProps) {
  const [activeRoom, setActiveRoom] = useState<RoomScene>(ROOM_SCENES[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHotspotInfo, setShowHotspotInfo] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotate || isDragging) return;
    const interval = setInterval(() => {
      setPanX(prev => (prev + 0.15) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotate, isDragging]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStart.x) * 0.1;
    const deltaY = (e.clientY - dragStart.y) * 0.1;

    setPanX(prev => (prev - deltaX + 100) % 100);
    setPanY(prev => Math.max(-25, Math.min(25, prev - deltaY)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = (e.touches[0].clientX - dragStart.x) * 0.15;
    const deltaY = (e.touches[0].clientY - dragStart.y) * 0.15;

    setPanX(prev => (prev - deltaX + 100) % 100);
    setPanY(prev => Math.max(-25, Math.min(25, prev - deltaY)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl h-[92vh] max-h-[850px] bg-[#070B16] rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden text-white select-none"
      >
        
        {/* Top Header Bar */}
        <div className="h-16 px-6 bg-[#070B16]/90 backdrop-blur-xl border-b border-amber-500/20 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Compass className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white font-display">
                  360° Architectural Walkthrough
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  4K ULTRA HD
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {projectName} &bull; {unitType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                isAutoRotate 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20' 
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Auto Rotate"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">Auto-Pan</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Fullscreen Mode"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-800 transition"
              title="Tutup Walkthrough"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 360 Interactive Panorama Viewport */}
        <div 
          className="relative flex-1 bg-black overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Panoramic Image Layer with 360 wrap calculation */}
          <div 
            className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform"
            style={{
              backgroundImage: `url(${activeRoom.image})`,
              backgroundSize: 'cover',
              backgroundPosition: `${panX}% calc(50% + ${panY}px)`,
              transform: `scale(${zoom})`,
              filter: 'brightness(0.96) contrast(1.05)'
            }}
          />

          {/* Vignette & Ambient Luxury Film Grain Effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Compass Orientation Indicator */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center gap-2 shadow-lg">
            <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            <span>HEADING: {Math.round(panX * 3.6)}° NNE</span>
          </div>

          {/* Hotspot Info Card Overlay */}
          {showHotspotInfo && (
            <div className="absolute bottom-6 left-6 z-10 max-w-sm p-4 rounded-2xl bg-[#070B16]/90 backdrop-blur-xl border border-amber-500/30 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  {activeRoom.category}
                </span>
                <button
                  onClick={() => setShowHotspotInfo(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-base font-extrabold text-white font-display mb-1">
                {activeRoom.name}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {activeRoom.description}
              </p>

              {/* Room Specifications */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0D1426] border border-[#1C2640] mb-3 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Luas</span>
                  <span className="text-xs font-bold text-amber-300">{activeRoom.specs.area}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Ceiling</span>
                  <span className="text-xs font-bold text-amber-300">{activeRoom.specs.ceiling}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Lighting</span>
                  <span className="text-[10px] font-bold text-slate-200">{activeRoom.specs.lighting}</span>
                </div>
              </div>

              {/* Material Highlights */}
              <div className="space-y-1 mb-3">
                {activeRoom.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Check className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {onSelectBooking && (
                <button
                  onClick={onSelectBooking}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Kunci Kavling Ini Sekarang</span>
                </button>
              )}
            </div>
          )}

          {/* Floating Zoom & Controls Box */}
          <div className="absolute right-6 top-6 z-10 flex flex-col gap-2">
            <button
              onClick={() => setZoom(prev => Math.min(1.8, prev + 0.15))}
              className="p-2.5 rounded-xl bg-[#070B16]/80 hover:bg-[#131C35] text-white border border-amber-500/20 backdrop-blur-md transition shadow-lg"
              title="Perbesar Tampilan (Zoom In)"
            >
              <ZoomIn className="w-4 h-4 text-amber-300" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(0.85, prev - 0.15))}
              className="p-2.5 rounded-xl bg-[#070B16]/80 hover:bg-[#131C35] text-white border border-amber-500/20 backdrop-blur-md transition shadow-lg"
              title="Perkecil Tampilan (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4 text-amber-300" />
            </button>
            <button
              onClick={() => setShowHotspotInfo(!showHotspotInfo)}
              className={`p-2.5 rounded-xl border backdrop-blur-md transition shadow-lg ${
                showHotspotInfo 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-[#070B16]/80 hover:bg-[#131C35] text-slate-400 border-amber-500/20'
              }`}
              title="Toggle Info Ruangan"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Instruction Tooltip */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 pointer-events-none hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Tahan dan geser kursor untuk memutar sudut pandang 360°</span>
          </div>
        </div>

        {/* Bottom Room Selector Strip */}
        <div className="p-4 bg-[#070B16] border-t border-amber-500/20 z-20 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white">Pilih Ruangan:</span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
              {ROOM_SCENES.map((room) => {
                const isActive = room.id === activeRoom.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => {
                      setActiveRoom(room);
                      setShowHotspotInfo(true);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 border ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-transparent text-amber-300 border-amber-400/60 shadow-md shadow-amber-500/10'
                        : 'bg-[#0D1426] text-slate-400 border-[#1C2640] hover:text-white hover:border-amber-500/30'
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-amber-400/40 shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${room.image})` }}
                    />
                    <span>{room.name}</span>
                    {isActive && <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
