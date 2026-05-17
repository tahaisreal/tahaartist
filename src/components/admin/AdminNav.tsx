'use client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/admin',         label: 'Dashboard' },
  { href: '/admin/youtube', label: 'YouTube' },
  { href: '/admin/motion',  label: 'Motion' },
];

export default function AdminNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const path = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-glass h-14 flex items-center px-6 gap-6">
      <Link href="/admin"
        className="font-display font-black text-lg tracking-widest text-cream hover:text-red transition-colors">
        ADMIN
      </Link>

      {isLoggedIn && (
        <>
          <nav className="flex gap-5 flex-1">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className={`timecode tracking-widest transition-colors ${
                  path === l.href ? 'text-red' : 'text-dim hover:text-cream'
                }`}>
                {l.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/" target="_blank"
              className="timecode opacity-40 hover:opacity-100 hover:text-red transition-all">
              ↗ VOIR LE SITE
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="timecode opacity-40 hover:text-red hover:opacity-100 transition-all">
              DÉCONNEXION
            </button>
          </div>
        </>
      )}
    </header>
  );
}
