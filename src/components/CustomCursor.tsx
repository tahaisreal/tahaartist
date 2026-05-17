'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef<number>();

  useEffect(() => {
    const dot  = dotRef.current!;
    const r    = ringRef.current!;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      r.style.left = `${ring.current.x}px`;
      r.style.top  = `${ring.current.y}px`;
      raf.current = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => r.classList.add('is-hovering');
    const onLeaveInteractive = () => r.classList.remove('is-hovering');
    const onEnterVideo       = () => r.classList.add('is-video');
    const onLeaveVideo       = () => r.classList.remove('is-video');

    const attach = () => {
      document.querySelectorAll('a, button, .btn-signal, .btn-ghost, .yt-row')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnterInteractive);
          el.addEventListener('mouseleave', onLeaveInteractive);
        });
      document.querySelectorAll('.project-card, .motion-card')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnterVideo);
          el.addEventListener('mouseleave', onLeaveVideo);
        });
    };

    document.addEventListener('mousemove', move, { passive: true });
    raf.current = requestAnimationFrame(animate);

    // Re-attach after DOM settles
    const t = setTimeout(attach, 800);

    return () => {
      document.removeEventListener('mousemove', move);
      if (raf.current) cancelAnimationFrame(raf.current);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef}  className="cursor-dot" />
    </>
  );
}
