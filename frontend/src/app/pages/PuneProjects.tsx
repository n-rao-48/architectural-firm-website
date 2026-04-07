import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectLocationMap } from '../components/ProjectLocationMap';
import type { Project } from '../data/projectsData';
import { useProjects } from '../lib/useProjects';

export default function PuneProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useProjects();
  const cityProjects = projects.filter((p) => p.city === 'pune');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>
            PORTFOLIO — PUNE
          </span>
          <h1 className="text-[#2B2B2B]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.2 }}>
            Projects in Pune
          </h1>
          <p className="text-[#2B2B2B]/70 mt-4 max-w-xl mx-auto" style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.8 }}>
            Kapadnekar Design Consultancy has delivered architectural and interior projects across Pune, spanning residential bungalows, commercial spaces, and curated interiors.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      {!selectedProject && (
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cityProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detail View */}
      {selectedProject && (
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors mb-12"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
            >
              ← Back to Pune Projects
            </button>

            <div className="relative h-[600px] mb-16">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover grayscale" />
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-[#2B2B2B] mb-4" style={{ fontSize: 'clamp(1.5rem, 2.7vw, 2.25rem)', fontWeight: 700, letterSpacing: '0.02em' }}>
                  {selectedProject.title}
                </h2>
                <p className="text-[#2B2B2B]" style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 2, letterSpacing: '0.01em' }}>
                  {selectedProject.description}
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[#2B2B2B] mb-1" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>AREA</p>
                  <p className="text-[#2B2B2B]" style={{ fontSize: '1rem', fontWeight: 400 }}>{selectedProject.area}</p>
                </div>
                <div>
                  <p className="text-[#2B2B2B] mb-1" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>LOCATION</p>
                  <p className="text-[#2B2B2B]" style={{ fontSize: '1rem', fontWeight: 400 }}>{selectedProject.location}</p>
                </div>
                <div>
                  <p className="text-[#2B2B2B] mb-1" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>YEAR</p>
                  <p className="text-[#2B2B2B]" style={{ fontSize: '1rem', fontWeight: 400 }}>{selectedProject.year}</p>
                </div>
                <ProjectLocationMap location={selectedProject.location} mapQuery={selectedProject.mapsQuery} />
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </motion.div>
  );
}
