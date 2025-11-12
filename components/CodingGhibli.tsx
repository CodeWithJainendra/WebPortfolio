import React, { useEffect, useMemo, useState } from 'react';
import GhibliStylizer from './GhibliStylizer';

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

// Utility to get a seeded random sequence per mount
function makeRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    const t = (s >>> 0) / 0xffffffff;
    return t;
  };
}

export default function CodingGhibli({ className, width = 320, height = 320 }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  // New random seed each mount for different pattern
  const rnd = useMemo(() => makeRand(Date.now() + Math.floor(Math.random() * 100000)), []);

  useEffect(() => {
    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const ctx = off.getContext('2d');
    if (!ctx) return;

    // Background gradient (twilight coding vibes)
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#0f172a'); // slate-900
    bg.addColorStop(1, '#1e293b'); // slate-800
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Glowing blob backdrop
    const cx = width * (0.3 + rnd() * 0.4);
    const cy = height * (0.3 + rnd() * 0.4);
    const rad = Math.min(width, height) * (0.35 + rnd() * 0.25);
    const glow = ctx.createRadialGradient(cx, cy, rad * 0.2, cx, cy, rad);
    glow.addColorStop(0, 'rgba(99,102,241,0.35)'); // indigo-500
    glow.addColorStop(1, 'rgba(168,85,247,0)'); // purple
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Terminal window frame
    const termX = 24;
    const termY = 28;
    const termW = width - 48;
    const termH = height - 72;
    const radius = 12;
    ctx.shadowColor = 'rgba(99,102,241,0.35)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#0b1220';
    ctx.beginPath();
    ctx.moveTo(termX + radius, termY);
    ctx.lineTo(termX + termW - radius, termY);
    ctx.quadraticCurveTo(termX + termW, termY, termX + termW, termY + radius);
    ctx.lineTo(termX + termW, termY + termH - radius);
    ctx.quadraticCurveTo(termX + termW, termY + termH, termX + termW - radius, termY + termH);
    ctx.lineTo(termX + radius, termY + termH);
    ctx.quadraticCurveTo(termX, termY + termH, termX, termY + termH - radius);
    ctx.lineTo(termX, termY + radius);
    ctx.quadraticCurveTo(termX, termY, termX + radius, termY);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Window header bar
    ctx.fillStyle = '#111827';
    ctx.fillRect(termX, termY, termW, 26);
    const dots = ['#ef4444', '#f59e0b', '#10b981'];
    dots.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(termX + 16 + i * 16, termY + 13, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Code lines: random lengths and token colors
    const lineCount = 12 + Math.floor(rnd() * 10);
    let y = termY + 42;
    for (let i = 0; i < lineCount; i++) {
      const len = termW * (0.35 + rnd() * 0.55);
      const x = termX + 16 + rnd() * 24;
      const thickness = 8 + Math.floor(rnd() * 4);
      const huePick = rnd();
      const color =
        huePick < 0.25 ? '#93c5fd' : // sky-300
        huePick < 0.5 ? '#a78bfa' : // violet-400
        huePick < 0.75 ? '#34d399' : // emerald-400
        '#f472b6'; // pink-400
      ctx.fillStyle = color;
      ctx.fillRect(x, y, len, thickness);
      // occasional keywords as blocks
      if (rnd() < 0.3) {
        ctx.fillStyle = '#eab308'; // amber-500
        const kwW = 18 + Math.floor(rnd() * 30);
        ctx.fillRect(x + 6 + rnd() * (len - kwW - 12), y + 2, kwW, thickness - 4);
      }
      y += thickness + 6 + Math.floor(rnd() * 8);
      if (y > termY + termH - 16) break;
    }

    // Bracket & brace accents
    const braceCount = 8 + Math.floor(rnd() * 8);
    for (let i = 0; i < braceCount; i++) {
      const bx = termX + 24 + rnd() * (termW - 48);
      const by = termY + 48 + rnd() * (termH - 72);
      ctx.strokeStyle = rnd() < 0.5 ? '#60a5fa' : '#c084fc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Curly brace-like squiggle
      ctx.moveTo(bx, by - 10);
      ctx.bezierCurveTo(bx - 8, by - 8, bx - 8, by + 8, bx, by + 10);
      ctx.bezierCurveTo(bx + 8, by + 8, bx + 8, by - 8, bx, by - 10);
      ctx.stroke();
    }

    // Circuit-like lines
    const pathCount = 5 + Math.floor(rnd() * 6);
    for (let i = 0; i < pathCount; i++) {
      let px = termX + 24 + rnd() * (termW - 48);
      let py = termY + 64 + rnd() * (termH - 96);
      ctx.strokeStyle = rnd() < 0.5 ? 'rgba(99,102,241,0.7)' : 'rgba(168,85,247,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      const segs = 4 + Math.floor(rnd() * 5);
      for (let s = 0; s < segs; s++) {
        const dx = (rnd() - 0.5) * 40;
        const dy = (rnd() - 0.5) * 30;
        px = Math.max(termX + 16, Math.min(termX + termW - 16, px + dx));
        py = Math.max(termY + 40, Math.min(termY + termH - 16, py + dy));
        ctx.lineTo(px, py);
        // node dot
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.stroke();
    }

    setDataUrl(off.toDataURL('image/png'));
  }, [rnd, width, height]);

  if (!dataUrl) {
    return (
      <div className={className}>
        <div className="rounded-lg w-full h-auto" style={{ width, height, background: 'linear-gradient(135deg,#0f172a,#1e293b)' }} />
      </div>
    );
  }

  return (
    <GhibliStylizer imageUrl={dataUrl} className={className} width={width} height={height} />
  );
}