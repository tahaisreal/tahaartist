import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/ClientShell';

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
    <html lang="fr">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
