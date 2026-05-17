import { youtubeVideos } from '@/data/youtube';
import { motionDesigns  } from '@/data/motion';
import HeroSection    from '@/components/sections/HeroSection';
import YoutubeSection from '@/components/sections/YoutubeSection';
import MotionSection  from '@/components/sections/MotionSection';
import AboutSection   from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection projectCount={youtubeVideos.length + motionDesigns.length} />
      <YoutubeSection videos={youtubeVideos} />
      <MotionSection  motions={motionDesigns} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
