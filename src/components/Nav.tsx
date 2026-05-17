'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '#youtube', label: 'YouTube' },
  { href: '#motion',  label: 'Motion'  },
  { href: '#about',   label: 'About'   },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [tc,          setTc]          = useState('00:00:00:00');
  const pathname = usePathname();
  const isAdmin  = pathname.startsWith('/admin');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
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

  if (isAdmin) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-6 md:px-10 h-14">

        {/* Brand + REC */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display font-black text-xl tracking-widest text-white hover:text-red transition-colors duration-200">
            TAHA
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-red rounded-full rec-dot" />
            <span className="timecode">REC</span>
          </div>
        </div>

        {/* Timecode */}
        <span className="hidden md:block timecode">{tc}</span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="timecode tracking-widest opacity-50 hover:opacity-100 hover:text-red transition-all duration-200">
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Mobile burger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          <span className={`block h-px w-5 bg-white transition-all duration-200 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px w-5 bg-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-white transition-all duration-200 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden nav-glass border-t border-border overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-52 py-5' : 'max-h-0'}`}>
        <nav className="flex flex-col gap-4 px-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="timecode tracking-widest hover:text-red transition-colors">
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
