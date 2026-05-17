'use client';
import { useEffect, useState } from 'react';

// Each word reads as "[WORD] DESIGNER & EDITOR" — all must work as adjectives
const WORDS = ['MOTION', 'VIDEO', 'VISUAL', 'CREATIVE', 'CINEMATIC', 'CONTENT'];

const STATS = [
  { value: '5+',  label: 'YEARS XP' },
  { value: '50+', label: 'PROJECTS' },
  { value: '∞',   label: 'FRAMES'   },
];

interface Props { projectCount: number }

export default function HeroSection({ projectCount }: Props) {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordKey, setWordKey] = useState(0);
  const [tc, setTc] = useState('00:00:00:00');

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
      setWordKey(k => k + 1);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const e = Date.now() - start;
      const s = Math.floor(e / 1000) % 60;
      const m = Math.floor(e / 60000) % 60;
      const f = Math.floor((e % 1000) / 33);
      setTc(`00:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(f).padStart(2,'0')}`);
    }, 33);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">

      {/* Grid background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,31,31,1) 1px,transparent 1px),' +
          'linear-gradient(90deg,rgba(255,31,31,1) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.02,
      }} />

      {/* Vignette */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 40% 50%, transparent 35%, rgba(5,5,5,0.85) 100%)',
      }} />

      {/* ── Typography (shared desktop / mobile top) ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-start md:justify-center
                      px-8 md:px-16 lg:px-20 pt-24 md:pt-0 pb-6 md:pb-16">

        {/* Pre-title badge */}
        <div className="hero-fade-1 flex items-center gap-3 mb-6 md:mb-10">
          <div className="w-1.5 h-1.5 bg-red rounded-full rec-dot" />
          <span className="timecode tracking-widest">SIGNAL ACTIVE · {String(projectCount)} PROJECTS</span>
          <div className="h-px w-12 bg-border" />
        </div>

        {/* Main title */}
        <h1 className="font-display font-black leading-none mb-6 md:mb-8">

          <div className="hero-line-wrap mb-1">
            <span key={wordKey} className="hero-word-enter text-stroke-red block"
              style={{ fontSize: 'clamp(32px, 11vw, 185px)', lineHeight: 0.88 }}>
              {WORDS[wordIdx]}
            </span>
          </div>

          <div className="hero-line-wrap mb-1">
            <span className="hero-line-2 block text-white"
              style={{ fontSize: 'clamp(32px, 11vw, 185px)', lineHeight: 0.88 }}>
              DESIGNER
            </span>
          </div>

          <div className="hero-line-wrap">
            <div className="hero-line-3 flex items-end gap-2 md:gap-3">
              <span className="text-stroke-dim"
                style={{ fontSize: 'clamp(22px, 8vw, 135px)', lineHeight: 0.88 }}>&amp;</span>
              <div className="flex flex-col gap-1.5 mb-2 md:mb-3">
                <div className="h-px w-6 md:w-10 bg-red" />
                <div className="h-px w-4 md:w-5 bg-border" />
              </div>
              <span className="text-white"
                style={{ fontSize: 'clamp(22px, 8vw, 135px)', lineHeight: 0.88 }}>
                EDITOR<span className="text-red">.</span>
              </span>
            </div>
          </div>
        </h1>

        {/* Subtitle */}
        <div className="hero-fade-3 flex flex-wrap items-center gap-x-4 gap-y-1 mb-8 md:mb-10">
          <span className="timecode opacity-50 tracking-widest">VIDEO EDITOR</span>
          <span className="text-red opacity-60">·</span>
          <span className="timecode opacity-50 tracking-widest">MOTION DESIGNER</span>
          <span className="text-red opacity-60">·</span>
          <span className="timecode opacity-50 tracking-widest">CONTENT CREATOR</span>
        </div>

        {/* CTAs */}
        <div className="hero-fade-4 flex flex-wrap items-center gap-4">
          <a href="#youtube" className="btn-signal"><span>↓ view work</span></a>
          <a href="#contact" className="btn-ghost">contact</a>
        </div>
      </div>

      {/* ── Mobile-only bottom panel ── */}
      <div className="md:hidden relative z-10 border-t border-border pb-10">

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          {STATS.map(s => (
            <div key={s.label} className="py-5 text-center">
              <p className="font-display font-black text-red" style={{ fontSize: 'clamp(26px,7vw,38px)' }}>
                {s.value}
              </p>
              <p className="timecode text-[8px] opacity-40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Availability + tools */}
        <div className="px-8 pt-5 flex items-start justify-between gap-4">
          <div>
            <span className="section-label block mb-2">STACK</span>
            <div className="flex flex-wrap gap-1.5">
              {['Premiere Pro', 'After Effects', 'Cinema 4D'].map(t => (
                <span key={t} className="timecode text-[8px] px-2 py-1 border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
            <div className="w-1.5 h-1.5 bg-red rounded-full rec-dot" />
            <span className="timecode opacity-40">AVAILABLE</span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar (desktop) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-9 border-t border-border
                      hidden md:flex items-center px-8 gap-6 z-20 bg-bg/40 backdrop-blur-sm">
        <div className="relative h-px flex-1 max-w-xs bg-border/40">
          <div className="absolute left-0 top-0 h-full bg-red hero-progress-bar" />
        </div>
        <span className="timecode opacity-30 tracking-widest">SCROLL TO EXPLORE</span>
        <span className="timecode text-[9px] opacity-25 ml-auto">{tc}</span>
      </div>
    </section>
  );
}
