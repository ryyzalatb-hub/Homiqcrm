'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Move } from 'lucide-react';

interface DraggableAIFabProps {
  onOpen: () => void;
}

const BUTTON_SIZE = 48; // 48px compact ultra-luxury circular trigger
const PADDING = 14;     // Minimum margin from viewport edges in px
const DRAG_THRESHOLD = 5; // Minimum px movement to distinguish drag from click

export default function DraggableAIFab({ onOpen }: DraggableAIFabProps) {
  // Position in viewport coordinates (px)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const hasMovedRef = useRef(false);
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialPosX: number;
    initialPosY: number;
  }>({
    startX: 0,
    startY: 0,
    initialPosX: 0,
    initialPosY: 0,
  });

  // Clamping helper to prevent dragging off-screen
  const clamp = useCallback((val: number, min: number, max: number) => {
    return Math.max(min, Math.min(val, max));
  }, []);

  // Compute safe boundaries based on current viewport
  const getBounds = useCallback(() => {
    if (typeof window === 'undefined') {
      return { minX: PADDING, minY: PADDING, maxX: PADDING, maxY: PADDING };
    }
    const maxX = Math.max(PADDING, window.innerWidth - BUTTON_SIZE - PADDING);
    const maxY = Math.max(PADDING, window.innerHeight - BUTTON_SIZE - PADDING);
    return { minX: PADDING, minY: PADDING, maxX, maxY };
  }, []);

  // Initialize position on client mount (from localStorage or default bottom-right)
  useEffect(() => {
    setIsMounted(true);
    const { minX, minY, maxX, maxY } = getBounds();
    let initialX = maxX;
    let initialY = maxY;

    try {
      const saved = localStorage.getItem('homiq_ai_fab_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === 'object' &&
          Number.isFinite(parsed.x) &&
          Number.isFinite(parsed.y)
        ) {
          initialX = clamp(parsed.x, minX, maxX);
          initialY = clamp(parsed.y, minY, maxY);
        }
      }
    } catch {
      // ignore localStorage errors (e.g. private mode or SSR)
    }

    const initial = { x: initialX, y: initialY };
    setPosition(initial);
    currentPosRef.current = initial;

    // Reposition dynamically if browser viewport resizes
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return prev;
        const b = getBounds();
        const adjusted = {
          x: clamp(prev.x, b.minX, b.maxX),
          y: clamp(prev.y, b.minY, b.maxY),
        };
        currentPosRef.current = adjusted;
        try {
          localStorage.setItem('homiq_ai_fab_pos', JSON.stringify(adjusted));
        } catch {
          // ignore storage errors
        }
        return adjusted;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clamp, getBounds]);

  // Pointer drag event handlers (desktop mouse + mobile/tablet touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button or touch contact
    if (e.button !== 0) return;

    // Use currentPosRef to eliminate coordinate drift from CSS scale transforms
    const currentX = currentPosRef.current.x || (position?.x ?? (window.innerWidth - BUTTON_SIZE - PADDING));
    const currentY = currentPosRef.current.y || (position?.y ?? (window.innerHeight - BUTTON_SIZE - PADDING));

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: currentX,
      initialPosY: currentY,
    };

    isPointerDownRef.current = true;
    hasMovedRef.current = false;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore capture fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;
    const moveDistance = Math.hypot(deltaX, deltaY);

    // Only initiate dragging movement once threshold is exceeded (>= 5px)
    if (moveDistance >= DRAG_THRESHOLD) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }

      const bounds = getBounds();
      const newX = clamp(dragStartRef.current.initialPosX + deltaX, bounds.minX, bounds.maxX);
      const newY = clamp(dragStartRef.current.initialPosY + deltaY, bounds.minY, bounds.maxY);

      currentPosRef.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });
    }
  };

  const cleanupPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    setIsDragging(false);

    try {
      if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const moved = hasMovedRef.current;
    cleanupPointer(e);

    if (moved) {
      // Drag ended: persist new position to localStorage
      try {
        localStorage.setItem('homiq_ai_fab_pos', JSON.stringify(currentPosRef.current));
      } catch {
        // ignore storage errors
      }
    } else {
      // Tap or click (< 5px movement): Open HOMIQ AI Copilot
      onOpen();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    cleanupPointer(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  const isNearLeftEdge = position !== null && position.x < 180;

  return (
    <div
      ref={buttonRef}
      role="button"
      tabIndex={0}
      aria-label="HOMIQ AI Co-Pilot (Dapat digeser kemana saja)"
      aria-haspopup="dialog"
      aria-expanded={false}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        left: position ? `${position.x}px` : undefined,
        top: position ? `${position.y}px` : undefined,
        width: `${BUTTON_SIZE}px`,
        height: `${BUTTON_SIZE}px`,
        touchAction: 'none',
      }}
      className={`fixed z-50 select-none transition-opacity duration-300 ${
        isMounted && position ? 'opacity-100' : 'opacity-0 bottom-6 right-6'
      } ${
        isDragging
          ? 'cursor-grabbing scale-105 shadow-2xl'
          : 'cursor-grab hover:scale-105 active:scale-95'
      }`}
    >
      {/* Sleek Ultra-Compact Luxury AI Trigger Orb (~48px) */}
      <div className="relative w-full h-full group">
        {/* Ambient Gold Halo Glow */}
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-gold-500/50 via-amber-400/40 to-gold-600/50 blur-md transition duration-300 pointer-events-none ${
            isDragging ? 'opacity-100 blur-lg scale-110' : 'opacity-70 group-hover:opacity-100'
          }`}
        />

        {/* Outer Champagne Metallic Border Ring */}
        <div className="relative w-full h-full rounded-full p-[1.5px] bg-gradient-to-b from-gold-300 via-amber-500 to-gold-700 shadow-xl shadow-black/80">
          {/* Inner Obsidian Glass Body */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#111728] via-[#0A0F1D] to-[#050811] flex items-center justify-center relative overflow-hidden border border-gold-400/20 group-hover:border-gold-400/60 transition">
            
            {/* Center Golden Sparkle Core */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gold-500 via-amber-400 to-gold-300 flex items-center justify-center text-obsidian-950 shadow-md shadow-gold-500/50 transition group-hover:rotate-12">
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse text-obsidian-950" />
            </div>

            {/* Micro "AI" Monogram Badge at bottom */}
            <div className="absolute bottom-0.5 inset-x-0 flex justify-center pointer-events-none">
              <span className="text-[7px] font-mono font-black tracking-widest text-gold-300 uppercase leading-none scale-90">
                AI
              </span>
            </div>

            {/* Drag Handle Icon Affordance at top-right */}
            <div className="absolute top-1 right-1 opacity-40 group-hover:opacity-85 transition pointer-events-none">
              <Move className="w-2.5 h-2.5 text-gold-400" />
            </div>

            {/* Online Live Status Indicator Pulse */}
            <span className="absolute top-1 left-1.5 flex h-2 w-2 pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
        </div>

        {/* Luxury Micro Hover Tooltip with Dynamic Screen Edge Positioning */}
        {showTooltip && !isDragging && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-obsidian-900/95 border border-gold-500/30 shadow-2xl backdrop-blur-md text-[11px] font-medium text-slate-200 whitespace-nowrap pointer-events-none animate-fadeIn flex items-center gap-1.5 z-50 ${
              isNearLeftEdge ? 'left-full ml-3' : 'right-full mr-3'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-white font-serif font-bold">HOMIQ AI</span>
            <span className="text-slate-400 text-[10px] font-mono">• Geser kemana saja</span>
          </div>
        )}
      </div>
    </div>
  );
}
