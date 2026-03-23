import { useState } from 'react';
import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectLocationMap } from '../components/ProjectLocationMap';
import type { Project, ProjectCategory } from '../data/projectsData';
import { useProjects } from '../lib/useProjects';

type FilterCategory = 'All' | ProjectCategory;
type FilterStatus = 'All' | 'completed' | 'ongoing';

export default function ProjectsGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useProjects();

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const statusMatch = selectedStatus === 'All' || (project.status || 'completed') === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const categories: FilterCategory[] = ['All', 'Residential', 'Commercial', 'Interior'];
  const statuses: FilterStatus[] = ['All', 'completed', 'ongoing'];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>PORTFOLIO</span>
          <h1 className="text-[#2B2B2B]" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            lineHeight: 1.2
          }}>
            Our Projects
          </h1>
          <p className="text-[#2B2B2B]/70 mt-4 max-w-xl mx-auto" style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.8 }}>
            Bhoomi Constructions has completed projects across Pune, Nashik, Ahilyanagar, and Chhatrapati Sambhaji Nagar.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12 px-6 lg:px-12 border-b border-[#EDEDED]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-[#2B2B2B] transition-colors relative pb-1 ${
                  selectedCategory === category
                    ? 'text-[#f3e218] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]'
                    : 'hover:text-[#f3e218]'
                }`}
                style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px' }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 border transition-colors ${
                  selectedStatus === status
                    ? 'border-[#2B2B2B] bg-[#2B2B2B] text-white'
                    : 'border-[#EDEDED] text-[#2B2B2B] hover:border-[#2B2B2B]'
                }`}
                style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.8px' }}
              >
                {status === 'All' ? 'All Status' : status === 'completed' ? 'Previous Projects' : 'Ongoing Projects'}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/projects/ongoing"
              className="px-6 py-3 border border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white transition-colors"
              style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}
            >
              View Ongoing Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      {!selectedProject && (
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Detail View */}
      {selectedProject && (
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors mb-12"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
            >
              ← Back to Projects
            </button>

            <div className="relative h-[600px] mb-16">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-[#2B2B2B] mb-4" style={{
                  fontSize: 'clamp(1.5rem, 2.7vw, 2.25rem)',
                  fontWeight: 700,
                  letterSpacing: '0.02em'
                }}>
                  {selectedProject.title}
                </h2>
                <p className="text-[#2B2B2B]" style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: 2,
                  letterSpacing: '0.01em'
                }}>
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
