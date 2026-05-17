'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getYoutubeThumbnail } from '@/lib/utils';

type Project =
  | { id: string; type: 'youtube'; title: string; description?: string | null; youtubeId: string; order: number }
  | { id: string; type: 'motion';  title: string; description?: string | null; filename: string; thumbnail?: string | null; order: number };

interface Props { projects: Project[] }

const PLACEHOLDERS = [
  { id: 'ph1', label: 'PROJET N°01', sub: 'MOTION DESIGN' },
  { id: 'ph2', label: 'PROJET N°02', sub: 'YOUTUBE'       },
  { id: 'ph3', label: 'PROJET N°03', sub: 'MOTION DESIGN' },
];

export default function ReelSection({ projects }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return;

    let gsapModule: typeof import('gsap') | null = null;
    let ScrollTriggerModule: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;

    import('gsap').then(g => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        const gsap = g.default;
        gsap.registerPlugin(ScrollTrigger);
        gsapModule = g;
        ScrollTriggerModule = ScrollTrigger;

        const section = sectionRef.current;
        const track   = trackRef.current;
        if (!section || !track) return;

        const totalW  = track.scrollWidth;
        const viewW   = window.innerWidth;
        const dist    = totalW - viewW;

        if (dist <= 0) return;

        gsap.to(track, {
          x: -dist,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${dist}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      });
    });

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      });
    };
  }, [projects]);

  const hasProjects = projects.length > 0;

  return (
    <section ref={sectionRef} id="reel" className="reel-section">
      {/* Section header (pinned with track) */}
      <div className="relative h-screen overflow-hidden">
        {/* Fixed section header */}
        <div className="absolute top-14 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-14 py-5 border-b border-border bg-bg/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="section-label">REEL · {String(projects.length).padStart(2,'0')} PROJETS</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="timecode">SCROLL →</span>
            {/* Progress bar */}
            <div className="w-24 h-px bg-border relative">
              <div
                className="absolute left-0 top-0 h-full bg-red transition-all"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex items-center gap-3 h-full pt-28 pb-8 px-8 md:px-14"
          style={{ paddingTop: '80px' }}
        >
          {/* Project cards */}
          {hasProjects
            ? projects.map((project, i) => (
                <ReelCard key={project.id} project={project} index={i} total={projects.length} />
              ))
            : PLACEHOLDERS.map((ph, i) => (
                <PlaceholderCard key={ph.id} index={i} label={ph.label} sub={ph.sub} />
              ))}

          {/* End card */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-center gap-6 border-l border-border"
            style={{ width: 'calc(40vw)', height: '70vh', paddingLeft: '40px' }}
          >
            <span className="section-label">FIN DU REEL</span>
            <a href="#youtube" className="btn-signal"><span>voir tout le contenu ↓</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Individual reel card ─── */
function ReelCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const thumbSrc = project.type === 'youtube'
    ? getYoutubeThumbnail(project.youtubeId, 'maxres')
    : project.thumbnail
      ? `/uploads/${project.thumbnail}`
      : null;

  // 3D tilt on mousemove
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    cardRef.current!.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const onMouseLeave = () => {
    cardRef.current!.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    setHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  const onMouseEnter = () => {
    setHovered(true);
    if (project.type === 'motion' && videoRef.current) {
      if (!videoRef.current.src) videoRef.current.src = `/uploads/${(project as Extract<Project, { type:'motion' }>).filename}`;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card flex-shrink-0 relative"
      style={{
        width: 'min(72vw, 640px)',
        height: '70vh',
        transition: 'transform 0.15s ease, border-color 0.3s ease',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background project number */}
      <span className="absolute -right-2 bottom-2 font-display font-black select-none pointer-events-none"
        style={{ fontSize: 'clamp(80px, 14vw, 200px)', color: 'rgba(255,31,31,0.04)', lineHeight: 1 }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Thumbnail */}
      {thumbSrc && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={thumbSrc}
            alt={project.title}
            fill
            sizes="72vw"
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        </div>
      )}

      {/* Motion video preview */}
      {project.type === 'motion' && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
          muted loop playsInline preload="none"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/30 to-transparent" />

      {/* Top bar */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between z-10">
        <span className="section-label">{project.type === 'youtube' ? '▶ YOUTUBE' : '◈ MOTION'}</span>
        <span className="timecode text-[9px]">{String(index + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
      </div>

      {/* Play indicator */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.7})`,
        }}
      >
        <div className="w-16 h-16 border border-red/70 rounded-full flex items-center justify-center bg-red/10 backdrop-blur-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-6 left-5 right-5 z-10">
        <h3
          className="font-display font-black text-cream mb-2 transition-all duration-300"
          style={{
            fontSize: 'clamp(22px, 3.5vw, 42px)',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {project.title}
        </h3>
        {project.description && (
          <p className="text-dim text-sm line-clamp-2 font-mono text-xs tracking-wide"
            style={{ opacity: hovered ? 1 : 0.6, transition: 'opacity 0.3s' }}>
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Placeholder card (no content yet) ─── */
function PlaceholderCard({ index, label, sub }: { index: number; label: string; sub: string }) {
  return (
    <div
      className="flex-shrink-0 border border-border relative flex flex-col items-center justify-center"
      style={{ width: 'min(72vw, 640px)', height: '70vh', background: 'var(--surface)' }}
    >
      <span className="absolute -right-2 bottom-2 font-display font-black select-none"
        style={{ fontSize: 'clamp(80px, 14vw, 200px)', color: 'rgba(255,31,31,0.03)', lineHeight: 1 }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative z-10 text-center px-8">
        <span className="section-label block mb-4">{sub}</span>
        <p className="font-display font-black text-cream/20" style={{ fontSize: 'clamp(28px, 5vw, 60px)' }}>
          {label}
        </p>
        <p className="timecode mt-4 opacity-40">Ajoutez du contenu via le panel admin</p>
      </div>

      {/* Frame corners */}
      <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-border/60" />
      <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-border/60" />
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-border/60" />
      <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-border/60" />
    </div>
  );
}
