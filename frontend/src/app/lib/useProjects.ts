import { useEffect, useMemo, useState } from 'react';
import { getProjects } from '../../api/api.js';
import { projects as fallbackProjects, type Project } from '../data/projectsData';
import type { ProjectRecord } from './api';
import { mapApiProjectToUi } from './projectMapper';

function buildProjectFingerprint(project: Project): string {
  return [project.title, project.location, project.year].map((part) => part.trim().toLowerCase()).join('|');
}

function mergeProjects(staticProjects: Project[], apiProjects: Project[]): Project[] {
  const merged = [...staticProjects];
  const seen = new Set(staticProjects.map(buildProjectFingerprint));

  for (const project of apiProjects) {
    const fingerprint = buildProjectFingerprint(project);
    if (seen.has(fingerprint)) continue;
    merged.unshift(project);
    seen.add(fingerprint);
  }

  return merged;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setLoading(true);
      setError(null);
      try {
        const records = (await getProjects()) as ProjectRecord[];
        if (isMounted) {
          if (records.length === 0) {
            setProjects(fallbackProjects);
          } else {
            const mapped = records.map(mapApiProjectToUi);
            setProjects(mergeProjects(fallbackProjects, mapped));
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch projects');
          setProjects(fallbackProjects);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () => ({
      projects,
      loading,
      error,
    }),
    [projects, loading, error],
  );
}
