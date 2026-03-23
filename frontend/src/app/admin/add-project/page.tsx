import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProjectForm, type ProjectFormValues } from '../../components/admin/ProjectForm';
import { useAuth } from '../../contexts/AuthContext';
import { createProject } from '../../lib/api';

export default function AddProjectPage() {
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: ProjectFormValues, imageFile: File | null) => {
    if (!token) {
      throw new Error('Unauthorized. Please login again.');
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
    if (imageFile) data.append('image', imageFile);

    setSubmitting(true);
    try {
      await createProject(data, token);
      navigate('/admin/manage-projects');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[#2B2B2B]" style={{ fontSize: '2rem', fontWeight: 400 }}>
        Add Project
      </h2>
      <ProjectForm submitLabel="Create Project" loading={submitting} onSubmit={handleSubmit} />
    </div>
  );
}
