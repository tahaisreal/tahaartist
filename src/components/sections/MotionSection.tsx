'use client';
import { useRef, useEffect, useState } from 'react';
import type { MotionDesign } from '@/types';
import RevealOnScroll from '@/components/RevealOnScroll';

interface Props { motions: MotionDesign[] }

export default function MotionSection({ motions }: Props) {
  return (
    <section id="motion" className="py-20 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <RevealOnScroll>
          <div className="flex items-end justify-between mb-14 gap-4">
            <div>
              <span className="section-label block mb-4">MOTION DESIGN</span>
              <h2 className="font-display font-black leading-none">
                <span className="block text-white"      style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>MOTION</span>
                <span className="block text-stroke-red" style={{ fontSize: 'clamp(40px, 6vw, 78px)'  }}>FILES</span>
              </h2>
            </div>
            <span className="timecode opacity-40 flex-shrink-0 self-end">
              {String(motions.length).padStart(2,'0')} FILES
            </span>
          </div>
        </RevealOnScroll>

        {motions.length === 0 ? (
          <RevealOnScroll>
            <div className="border border-border py-20 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                <span className="timecode text-[9px] opacity-40">MP4</span>
              </div>
              <p className="timecode opacity-30">No motion designs yet — upload via the admin panel</p>
            </div>
          </RevealOnScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {motions.map((motion, i) => (
              <RevealOnScroll key={motion.id} delay={i * 60}>
                <MotionCard motion={motion} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function MotionCard({ motion, index }: { motion: MotionDesign; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered,     setHovered]     = useState(false);
  const [posterReady, setPosterReady] = useState(false);

  // ── Lazy-load src when card enters viewport ─────────────────────────────
  useEffect(() => {
    const card  = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !video.src) video.src = `/uploads/${motion.filename}`; },
      { rootMargin: '400px' }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, [motion.filename]);

  // ── Seek to midpoint once metadata loads → acts as natural poster ────────
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !video.duration || !isFinite(video.duration)) return;
    video.currentTime = video.duration * 0.5;
  };

  const handleSeeked = () => {
    // Only mark poster ready on non-playing seeks (initial poster setup or post-hover restore)
    if (!hovered) setPosterReady(true);
  };

  // ── Hover: play from start / leave: pause and restore poster ────────────
  const onEnter = () => {
    setHovered(true);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0; // always start from beginning
    video.play().catch(() => {});
  };

  const onLeave = () => {
    setHovered(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    // Restore mid-frame poster
    if (video.duration && isFinite(video.duration)) {
      video.currentTime = video.duration * 0.5;
    }
  };

  // ── 3D tilt ─────────────────────────────────────────────────────────────
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    cardRef.current!.style.transform =
      `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  const onMouseOut = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className="motion-card project-card aspect-video relative"
      onMouseEnter={onEnter}
      onMouseLeave={() => { onLeave(); onMouseOut(); }}
      onMouseMove={onMouseMove}
      style={{ transition: 'transform 0.15s ease, border-color 0.3s' }}
    >
      {/* Static thumbnail fallback (before video metadata loads) */}
      {motion.thumbnail && !posterReady && !hovered && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/uploads/${motion.thumbnail}`}
          alt={motion.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video — mid-frame poster when idle, plays from 0 on hover */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted loop playsInline preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        style={{
          opacity: hovered ? 1 : posterReady ? 0.9 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10">
        <span className="section-label text-[8px]">◈ MOTION</span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="timecode text-[9px] opacity-40">{String(index + 1).padStart(2,'0')}</span>
      </div>

      {/* Play hint — visible when not hovered */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 0.5 }}
      >
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Info — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-all duration-300"
        style={{ transform: hovered ? 'translateY(0)' : 'translateY(5px)', opacity: hovered ? 1 : 0.7 }}
      >
        <p className="font-display font-black text-white text-lg leading-tight">{motion.title}</p>
        {motion.description && (
          <p className="timecode text-[10px] opacity-50 mt-1 line-clamp-1">{motion.description}</p>
        )}
      </div>
    </div>
  );
}
