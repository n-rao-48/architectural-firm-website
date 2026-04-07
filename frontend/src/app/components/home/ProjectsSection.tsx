import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useProjects } from '../../lib/useProjects';

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const { projects: allProjects } = useProjects();
  const projects = allProjects.slice(0, 4).map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    image: project.image,
  }));

  return (
    <section id="projects" className="py-32 px-6 lg:px-12 bg-[#F5F5F5]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>PORTFOLIO</span>
          <h2 className="text-[#2B2B2B]" style={{ 
            fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)', 
            fontWeight: 700, 
            letterSpacing: '0.01em',
            lineHeight: 1.3
          }}>
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-[#2B2B2B] transition-opacity duration-500 ${
                hoveredId === project.id ? 'opacity-80' : 'opacity-0'
              }`}></div>

              {/* Content */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-500 ${
                hoveredId === project.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <span className="text-[#f3e218] tracking-[2px] mb-3" style={{ fontSize: '11px', fontWeight: 400 }}>
                  {project.category}
                </span>
                <h3 className="mb-6" style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.02em'
                }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2B2B2B] text-white hover:bg-[#f3e218] transition-colors group"
            style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
          >
            View All Projects
            <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
