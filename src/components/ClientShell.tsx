'use client';
import { useState } from 'react';
import Loader from './Loader';
import CustomCursor from './CustomCursor';
import Nav from './Nav';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Permanent overlays */}
      <div className="grain" aria-hidden />
      <div className="scanlines" aria-hidden />

      {/* Cursor */}
      <CustomCursor />

      {/* Loader — sits above everything via z-[9999]; content renders underneath */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Site — always visible; loader covers it until complete */}
      <div>
        <Nav />
        {children}
      </div>
    </>
  );
}
