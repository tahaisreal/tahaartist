import type { Metadata } from 'next';
import { Syne, Space_Mono } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/ClientShell';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taha — Monteur Vidéo & Motion Designer',
  description: 'Portfolio de montage vidéo et motion design — expérience cinématique.',
  openGraph: {
    type: 'website',
    title: 'Taha — Motion Designer & Video Editor',
    description: 'Portfolio professionnel — Montage vidéo & Motion Design.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${spaceMono.variable}`}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
