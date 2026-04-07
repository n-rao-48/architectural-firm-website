import { useEffect, useMemo, useState } from 'react';
import { projects as fallbackProjects, type Project } from '../data/projectsData';
import { fetchProjects } from './api';
import { mapApiProjectToUi } from './projectMapper';

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
        const records = await fetchProjects();
        if (isMounted) {
          if (records.length === 0) {
            setProjects(fallbackProjects);
          } else {
            const mapped = records.map(mapApiProjectToUi);
            setProjects(mapped);
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
