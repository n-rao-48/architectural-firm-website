import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProjectForm, type ProjectFormValues } from '../../../components/admin/ProjectForm';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchProjectById, updateProject } from '../../../lib/api';

export default function EditProjectPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<ProjectFormValues | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setError('Project ID is missing.');
      setLoading(false);
      return;
    }

    let active = true;

    fetchProjectById(id)
      .then((project) => {
        if (!active) return;
        setInitialValues({
          name: project.name,
          type: project.type,
          status: project.status?.toLowerCase() === 'ongoing' ? 'ongoing' : 'completed',
          city:
            project.city === 'nashik' || project.city === 'ahilyanagar' || project.city === 'sambhajinagar'
              ? project.city
              : 'pune',
          location: project.location,
          mapsQuery: project.maps_query || '',
          area: project.area || 'N/A',
          projectYear: project.project_year || String(new Date().getFullYear()),
          description: project.description,
        });
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load project');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const heading = useMemo(() => `Edit Project #${id || ''}`, [id]);

  const handleSubmit = async (values: ProjectFormValues, imageFiles: File[]) => {
    if (!token) {
      throw new Error('Unauthorized. Please login again.');
    }

    if (!id) {
      throw new Error('Project ID is missing.');
    }

    const data = new FormData();
    data.append('name', values.name);
    data.append('type', values.type);
    data.append('status', values.status);
    data.append('city', values.city);
    data.append('location', values.location);
    data.append('maps_query', values.mapsQuery);
    data.append('area', values.area);
    data.append('project_year', values.projectYear);
    data.append('description', values.description);
    for (const file of imageFiles) {
      data.append('images', file);
    }

    setSaving(true);
    try {
      await updateProject(id, data, token);
      navigate('/admin/manage-projects');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[#2B2B2B]" style={{ fontSize: '2rem', fontWeight: 400 }}>
        {heading}
      </h2>

      {error && (
        <p className="text-red-600" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          {error}
        </p>
      )}

      {loading ? (
        <p style={{ fontSize: '0.95rem', fontWeight: 400 }}>Loading project...</p>
      ) : initialValues ? (
        <ProjectForm submitLabel="Update Project" loading={saving} onSubmit={handleSubmit} initialValues={initialValues} />
      ) : null}
    </div>
  );
}
