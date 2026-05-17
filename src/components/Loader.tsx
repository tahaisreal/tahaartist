'use client';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true),    1100); // start fade-out
    const t2 = setTimeout(() => onComplete(),    1500); // unmount
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
      style={{ opacity: out ? 0 : 1, transition: 'opacity 0.4s ease' }}
    >
      {/* Name */}
      <p
        className="font-display font-black text-cream loader-name-reveal select-none"
        style={{ fontSize: 'clamp(56px, 13vw, 150px)', letterSpacing: '0.18em' }}
      >
        TAHA
      </p>
      <span className="timecode opacity-25 mt-3 tracking-[0.45em] loader-sub-reveal">
        VIDEO EDITOR · MOTION DESIGNER
      </span>

      {/* Amber progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border overflow-hidden">
        <div className="h-full bg-red loader-bar" />
      </div>

      {/* Corner marks */}
      <div className="absolute top-6 left-6  w-5 h-5 border-t border-l border-border opacity-40" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-border opacity-40" />
      <div className="absolute bottom-6 left-6  w-5 h-5 border-b border-l border-border opacity-40" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-border opacity-40" />

      {/* Timecode */}
      <span className="timecode absolute bottom-4 right-6 opacity-20">MMXXV</span>
    </div>
  );
}
