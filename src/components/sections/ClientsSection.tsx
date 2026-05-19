'use client';
import RevealOnScroll from '@/components/RevealOnScroll';

const CLIENTS = [
  { name: 'David Lafarge',  subs: '2,04 M',   img: 'https://framerusercontent.com/images/cG0XV4PojM4AcYkheqjqYe12i84.jpg?width=160&height=160' },
  { name: 'GotagaTV',      subs: '2,54 M',   img: 'https://framerusercontent.com/images/bhLZDHTb8b7pj1gm3s4FT1xRsw.jpg?width=160&height=160' },
  { name: 'Baggy Dessine', subs: '1,93 M',   img: 'https://framerusercontent.com/images/xIDsyYSWmC0WUVTtL2dO9Z6J0VM.jpg?width=160&height=160' },
  { name: 'Cossi',         subs: '1,5 M',    img: 'https://framerusercontent.com/images/DKoQ0GIvWG184cVWezPGp03MWok.jpg?width=160&height=160' },
  { name: 'Multicort',     subs: '1,11 M',   img: 'https://framerusercontent.com/images/eamR6pqT1jd0i2gEW3mjBerzFc.jpg?width=160&height=160' },
  { name: 'Camille LV',   subs: '714 K',    img: 'https://framerusercontent.com/images/6JpSkhHioZpZrDLlGir6rpi6RA.jpg?width=160&height=160' },
  { name: 'Leti',          subs: '697 K',    img: 'https://framerusercontent.com/images/c2AuQYgCsQwCqEwtVqfnO3JvDHM.jpg?width=160&height=160' },
  { name: 'Evan',          subs: '600 K',    img: 'https://framerusercontent.com/images/BpBjqM5LwEL3Y7GfvkIvxfhUUjk.jpg?width=160&height=160' },
  { name: 'Beone%',        subs: '542 K',    img: 'https://framerusercontent.com/images/7v1VOsT6H0GudXeobUmplSrFSeo.jpg?width=160&height=160' },
];

export default function ClientsSection() {
  return (
    <section id="clients" className="py-20 md:py-28 border-t border-border overflow-hidden">

      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="section-label block mb-4">WORKED WITH</span>
              <h2 className="font-display font-black leading-none">
                <span className="block text-white"      style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>TRUSTED BY</span>
                <span className="block text-stroke-red" style={{ fontSize: 'clamp(30px, 5vw, 65px)' }}>TOP CREATORS</span>
              </h2>
            </div>
            {/* Combined reach stat */}
            <div className="text-right flex-shrink-0">
              <p className="font-display font-black text-red" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>+11M</p>
              <p className="timecode text-[9px] opacity-40 mt-1">COMBINED SUBSCRIBERS</p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* ── Infinite marquee ── */}
      <div className="relative">

        {/* Fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

        {/* Track — two copies for seamless loop */}
        <div className="clients-track flex gap-3" aria-hidden>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <ClientCard key={i} client={c} />
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
          <div className="border-t border-border pt-6 flex items-center justify-between gap-4">
            <span className="timecode opacity-30">{CLIENTS.length} CREATORS · YOUTUBE EDITING & MOTION DESIGN</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red rounded-full rec-dot" />
              <span className="timecode opacity-40">AVAILABLE FOR NEW PROJECTS</span>
            </div>
          </div>
        </div>
      </RevealOnScroll>

    </section>
  );
}

function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  return (
    <div className="clients-card flex-shrink-0 flex flex-col items-center gap-3 group">
      {/* Avatar */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border
                      group-hover:border-red transition-colors duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.img}
          alt={client.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Amber overlay on hover */}
        <div className="absolute inset-0 bg-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="font-display font-black text-white text-sm leading-tight text-center
                      group-hover:text-red transition-colors duration-300 break-words w-full">
          {client.name}
        </p>
        <p className="timecode text-[9px] opacity-70 mt-0.5">{client.subs}</p>
      </div>
    </div>
  );
}
