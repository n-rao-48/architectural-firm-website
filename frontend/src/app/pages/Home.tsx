import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TeamSection } from '../components/home/TeamSection';
import { CTASection } from '../components/home/CTASection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
}
