import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchProjects } from '../../lib/api';

export default function AdminDashboardPage() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((items) => {
        if (active) setTotalProjects(items.length);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[#2B2B2B]" style={{ fontSize: '2rem', fontWeight: 400 }}>
          Dashboard
        </h2>
        <p className="text-[#2B2B2B]/70 mt-2" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
          Track project counts and navigate quickly to admin operations.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#EDEDED] p-6">
          <p className="text-[#2B2B2B]/60" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Total Projects</p>
          <p className="text-[#2B2B2B] mt-2" style={{ fontSize: '2rem', fontWeight: 400 }}>
            {loading ? '...' : totalProjects}
          </p>
        </div>
        <div className="bg-white border border-[#EDEDED] p-6">
          <p className="text-[#2B2B2B]/60" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Recent Updates</p>
          <p className="text-[#2B2B2B] mt-2" style={{ fontSize: '1.1rem', fontWeight: 400 }}>Live from database</p>
        </div>
        <div className="bg-white border border-[#EDEDED] p-6">
          <p className="text-[#2B2B2B]/60" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Quick Actions</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/admin/add-project" className="text-[#2B2B2B] hover:text-[#f3e218]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
              Add New Project
            </Link>
            <Link to="/admin/manage-projects" className="text-[#2B2B2B] hover:text-[#f3e218]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>
              Manage Existing Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
