import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectLocationMap } from '../components/ProjectLocationMap';
import type { Project } from '../data/projectsData';
import { useProjects } from '../lib/useProjects';

const eetamaxPlanImages = [
  new URL('../assets/nR1.png', import.meta.url).href,
  new URL('../assets/nR2.png', import.meta.url).href,
  new URL('../assets/nR8.png', import.meta.url).href,
  new URL('../assets/nR9.png', import.meta.url).href,
];

const alligoOfficeImage = new URL('../assets/Alligo Horizon.jpeg', import.meta.url).href;

export default function OngoingProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useProjects();
  const adminOngoingProjects = projects.filter((project) => project.status === 'ongoing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>
            PORTFOLIO - ONGOING
          </span>
          <h1 className="text-[#2B2B2B]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.2 }}>
            Ongoing Projects
          </h1>
          <p className="text-[#2B2B2B]/70 mt-4 max-w-2xl mx-auto" style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.8 }}>
            Current projects under design and development across Maharashtra.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto space-y-20">
          <article className="bg-[#F8F8F8] p-8 lg:p-12">
            <div className="mb-8">
              <p className="text-[#f3e218] mb-2" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
                INDUSTRIAL PROJECT - PROPOSED PLAN
              </p>
              <h2 className="text-[#2B2B2B]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '0.02em' }}>
                Eetamax
              </h2>
              <p className="text-[#2B2B2B]/70 mt-2" style={{ fontSize: '1rem', fontWeight: 400 }}>
                Ahilyanagar
              </p>
              <p className="text-[#2B2B2B] mt-4" style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.9 }}>
                Proposed industrial development plan prepared for Eetamax, focused on efficient planning, scalable workflow, and practical movement across the site.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {eetamaxPlanImages.map((image, index) => (
                <div key={image} className="relative h-[280px] lg:h-[340px]">
                  <img
                    src={image}
                    alt={`Eetamax proposed plan ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 max-w-[420px]">
              <ProjectLocationMap location="Ahilyanagar, Maharashtra" title="Project Location" />
            </div>
          </article>

          <article className="bg-[#F8F8F8] p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[#f3e218] mb-2" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
                  FACTORY OFFICE - ONGOING
                </p>
                <h2 className="text-[#2B2B2B]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '0.02em' }}>
                  M/s Alligo Horizon Pvt. Ltd.
                </h2>
                <p className="text-[#2B2B2B]/70 mt-2" style={{ fontSize: '1rem', fontWeight: 400 }}>
                  Waghere, Igatpuri, Nasik
                </p>
                <p className="text-[#2B2B2B] mt-4" style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.9 }}>
                  Ongoing factory office project for M/s Alligo Horizon Pvt. Ltd., combining industrial functionality with a clear, organized office environment for daily operations.
                </p>
              </div>

              <div className="relative h-[320px] lg:h-[380px]">
                <img
                  src={alligoOfficeImage}
                  alt="M/s Alligo Horizon Pvt. Ltd. factory office project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-6 max-w-[420px]">
              <ProjectLocationMap location="Waghere, Igatpuri, Nashik, Maharashtra" title="Project Location" />
            </div>
          </article>
        </div>
      </section>

      {adminOngoingProjects.length > 0 && !selectedProject && (
        <section className="py-16 px-6 lg:px-12 border-t border-[#EDEDED]">
          <div className="max-w-[1200px] mx-auto">
            <h3 className="text-[#2B2B2B] mb-8" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.02em' }}>
              More Ongoing Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adminOngoingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedProject && (
        <section className="py-20 px-6 lg:px-12 border-t border-[#EDEDED]">
          <div className="max-w-[1200px] mx-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors mb-12"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
            >
              ← Back to Ongoing Projects
            </button>

            <div className="relative h-[520px] mb-16">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
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
    </div>
  );
}
