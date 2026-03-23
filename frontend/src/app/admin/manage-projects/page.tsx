import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { deleteProject, fetchProjects, type ProjectRecord } from '../../lib/api';

export default function ManageProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (statusFilter === 'all') return true;
    const currentStatus = project.status?.toLowerCase() === 'ongoing' ? 'ongoing' : 'completed';
    return currentStatus === statusFilter;
  });

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) {
      setError('Unauthorized. Please login again.');
      return;
    }

    const confirmed = window.confirm('Delete this project?');
    if (!confirmed) return;

    try {
      await deleteProject(id, token);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[#2B2B2B]" style={{ fontSize: '2rem', fontWeight: 400 }}>
          Manage Projects
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'ongoing' | 'completed')}
            className="px-3 py-2 border border-[#EDEDED] bg-white text-[#2B2B2B]"
            style={{ fontSize: '0.875rem', fontWeight: 400 }}
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <Link
            to="/admin/add-project"
            className="px-6 py-3 bg-[#2B2B2B] text-white hover:bg-[#f3e218] hover:text-[#2B2B2B] transition-colors"
            style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
          >
            Add New
          </Link>
        </div>
      </div>

      {error && (
        <p className="text-red-600" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          {error}
        </p>
      )}

      <div className="bg-white border border-[#EDEDED] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EDEDED] text-left">
              <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Project</th>
              <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Type</th>
              <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Status</th>
              <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>City</th>
              <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Location</th>
              <th className="px-4 py-3" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                  Loading projects...
                </td>
              </tr>
            ) : filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                  No projects found for this status.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-[#F5F5F5]">
                  <td className="px-4 py-3" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{project.name}</td>
                  <td className="px-4 py-3" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{project.type}</td>
                  <td className="px-4 py-3" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
                    {project.status?.toLowerCase() === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{project.city || '-'}</td>
                  <td className="px-4 py-3" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{project.location}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Link
                      to={`/admin/edit-project/${project.id}`}
                      className="text-[#2B2B2B] hover:text-[#f3e218]"
                      style={{ fontSize: '0.9rem', fontWeight: 400 }}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600"
                      style={{ fontSize: '0.9rem', fontWeight: 400 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
