import type { Project, ProjectCategory, ProjectCity, ProjectStatus } from '../data/projectsData';
import { getProjectRecordId, type ProjectRecord } from './api';

const validCategories: ProjectCategory[] = ['Residential', 'Commercial', 'Interior'];
const validCities: ProjectCity[] = ['pune', 'nashik', 'ahilyanagar', 'sambhajinagar'];

function normalizeCategory(input: string): ProjectCategory {
  const value = input.trim().toLowerCase();
  const match = validCategories.find((category) => category.toLowerCase() === value);
  return match || 'Residential';
}

function inferCity(location: string): ProjectCity {
  const text = location.toLowerCase();
  if (text.includes('nashik')) return 'nashik';
  if (text.includes('ahilyanagar') || text.includes('ahmednagar')) return 'ahilyanagar';
  if (text.includes('sambhaji') || text.includes('aurangabad')) return 'sambhajinagar';
  return 'pune';
}

function normalizeCity(input: string | undefined, fallbackLocation: string): ProjectCity {
  const value = (input || '').trim().toLowerCase();
  const match = validCities.find((city) => city === value);
  if (match) return match;
  return inferCity(fallbackLocation);
}

function normalizeStatus(input: string | undefined): ProjectStatus {
  return input?.toLowerCase() === 'ongoing' ? 'ongoing' : 'completed';
}

export function mapApiProjectToUi(project: ProjectRecord): Project {
  const createdDate = project.created_at ? new Date(project.created_at) : new Date();
  const fallbackYear = Number.isNaN(createdDate.getTime()) ? String(new Date().getFullYear()) : String(createdDate.getFullYear());
  const year = project.project_year?.trim() || fallbackYear;
  const fallbackIdSeed = `${project.name}-${project.location}-${year}`.toLowerCase().replace(/\s+/g, '-');
  const projectId = getProjectRecordId(project) || fallbackIdSeed;

  return {
    id: projectId,
    title: project.name,
    category: normalizeCategory(project.type),
    city: normalizeCity(project.city, project.location),
    status: normalizeStatus(project.status),
    location: project.location,
    year,
    area: project.area?.trim() || 'N/A',
    mapsQuery: project.maps_query?.trim() || project.location,
    image: project.image_url,
    description: project.description,
  };
}
