import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { AboutSection } from '../components/home/AboutSection';
import { CTASection } from '../components/home/CTASection';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TeamSection } from '../components/home/TeamSection';
import { Navigation } from '../components/Navigation';

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </motion.div>
  );
}