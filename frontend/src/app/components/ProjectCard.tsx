import type { Project } from '../data/projectsData';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
        />
        {project.status === 'ongoing' && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 bg-[#f3e218] text-[#2B2B2B]"
            style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '1px' }}
          >
            ONGOING
          </span>
        )}
        <div className="absolute inset-0 bg-[#2B2B2B] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      <div>
        <p className="text-[#f3e218] mb-2" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
          {project.category.toUpperCase()}
        </p>
        <h3 className="text-[#2B2B2B] mb-1" style={{ fontSize: '1.25rem', fontWeight: 400, letterSpacing: '0.02em' }}>
          {project.title}
        </h3>
        <p className="text-[#2B2B2B]/60" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          {project.location} • {project.year}
        </p>
      </div>
    </div>
  );
}
