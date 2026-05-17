import RevealOnScroll from '@/components/RevealOnScroll';

const SOCIALS = [
  {
    platform: 'DISCORD',
    handle:   'tahaartiste',
    href:     'https://discord.com/users/tahaartiste',
    icon:     'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
  },
  {
    platform: 'TWITTER / X',
    handle:   '@tahaartiste',
    href:     'https://twitter.com/tahaartiste',
    icon:     'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    platform: 'INSTAGRAM',
    handle:   '@tahaelmm',
    href:     'https://instagram.com/tahaelmm',
    icon:     'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <RevealOnScroll>
          <span className="section-label block mb-6">CONTACT</span>
          <h2 className="font-display font-black leading-none mb-16">
            <span className="block text-white"  style={{ fontSize: 'clamp(52px, 10vw, 126px)' }}>LET&apos;S</span>
            <span className="block text-stroke-red" style={{ fontSize: 'clamp(52px, 10vw, 126px)' }}>
              WORK<span className="text-red">.</span>
            </span>
          </h2>
        </RevealOnScroll>

        {/* Social cards */}
        <RevealOnScroll delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-px">
            {SOCIALS.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-surface p-8 md:p-10 flex flex-col gap-6 hover:bg-[#0e0000] transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-border group-hover:border-red/40 flex items-center justify-center transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-dim group-hover:text-red transition-colors duration-300">
                    <path d={s.icon} />
                  </svg>
                </div>

                <div>
                  <p className="section-label mb-2">{s.platform}</p>
                  <p className="font-display font-black text-white group-hover:text-red transition-colors duration-300"
                    style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}>
                    {s.handle}
                  </p>
                </div>

                <div className="mt-auto transition-all duration-300 translate-x-0 group-hover:translate-x-1 text-border group-hover:text-red">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </RevealOnScroll>

        {/* Footer strip */}
        <RevealOnScroll delay={200}>
          <div className="border border-border mt-px px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="font-display font-black text-3xl text-white tracking-widest">TAHA</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red rounded-full rec-dot" />
                <span className="timecode opacity-40">ONLINE</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="timecode opacity-25">VIDEO EDITOR · MOTION DESIGNER</span>
              <span className="timecode opacity-20">© {new Date().getFullYear()}</span>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
