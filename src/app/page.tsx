import { youtubeVideos } from '@/data/youtube';
import { motionDesigns  } from '@/data/motion';
import HeroSection    from '@/components/sections/HeroSection';
import ClientsSection from '@/components/sections/ClientsSection';
import YoutubeSection from '@/components/sections/YoutubeSection';
import MotionSection  from '@/components/sections/MotionSection';
import AboutSection   from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection projectCount={youtubeVideos.length + motionDesigns.length} />
      <ClientsSection />
      <MotionSection  motions={motionDesigns} />
      <YoutubeSection videos={youtubeVideos} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
