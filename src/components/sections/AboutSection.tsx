import RevealOnScroll from '@/components/RevealOnScroll';

const STATS = [
  { value: '5+',  label: 'Years of XP' },
  { value: '50+', label: 'Projects done' },
  { value: '∞',   label: 'Frame by frame' },
];

const TOOLS = [
  'Premiere Pro', 'After Effects', 'DaVinci Resolve',
  'Cinema 4D', 'Illustrator', 'Photoshop',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <RevealOnScroll>
          <span className="section-label block mb-12">ABOUT</span>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-0 border border-border">

          {/* Left — quote */}
          <RevealOnScroll>
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-red font-display font-black text-4xl leading-none select-none">"</span>
                <h2 className="font-display font-black leading-tight mt-2"
                  style={{ fontSize: 'clamp(26px, 4vw, 50px)' }}>
                  I don&apos;t make<br />
                  <span className="text-stroke-red">videos.</span><br />
                  I build<br />
                  <span className="text-white">experiences.</span>
                </h2>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-10 bg-red" />
                <span className="timecode opacity-40">EDITOR · MOTION DESIGNER</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — info */}
          <div className="flex flex-col">

            <RevealOnScroll delay={100}>
              <div className="p-10 md:p-14 border-b border-border">
                <p className="text-sm leading-loose text-white/50 font-mono tracking-wide mb-4">
                  Passionate about image and movement, I turn every project
                  into a precise, hard-hitting visual experience.
                </p>
                <p className="text-sm leading-loose text-white/50 font-mono tracking-wide">
                  Specialised in YouTube editing and dynamic motion design —
                  every frame is crafted to <span className="text-white italic">leave a mark</span>.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
                {STATS.map(s => (
                  <div key={s.label} className="p-6 text-center">
                    <p className="font-display font-black text-red"
                      style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>{s.value}</p>
                    <p className="timecode text-[9px] opacity-40 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="p-8 md:p-10">
                <span className="timecode opacity-40 block mb-4">CREATIVE STACK</span>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map(tool => (
                    <span key={tool}
                      className="timecode text-[10px] px-3 py-1.5 border border-border
                                 hover:border-red hover:text-red transition-colors duration-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>

      </div>
    </section>
  );
}
