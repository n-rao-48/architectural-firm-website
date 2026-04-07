import { FolderPlus, Images, LayoutDashboard, ListChecks, LogOut, MessageSquareMore } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-3 transition-colors ${
    isActive ? 'bg-[#f3e218]/15 text-[#2B2B2B]' : 'text-[#2B2B2B]/70 hover:text-[#2B2B2B] hover:bg-[#F8F8F8]'
  }`;

export function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-full lg:w-72 border-r border-[#EDEDED] bg-white">
      <div className="px-6 py-8 border-b border-[#EDEDED]">
        <p className="text-[#f3e218] tracking-[2px] mb-2" style={{ fontSize: '11px', fontWeight: 400 }}>
          ADMIN PANEL
        </p>
        <h2 className="text-[#2B2B2B]" style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          Kapadnekar Design Consultancy
        </h2>
      </div>

      <nav className="py-4">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={18} strokeWidth={1.6} />
          Dashboard
        </NavLink>
        <NavLink to="/admin/add-project" className={linkClass}>
          <FolderPlus size={18} strokeWidth={1.6} />
          Add Project
        </NavLink>
        <NavLink to="/admin/manage-projects" className={linkClass}>
          <ListChecks size={18} strokeWidth={1.6} />
          Manage Projects
        </NavLink>
        <NavLink to="/admin/uploads" className={linkClass}>
          <Images size={18} strokeWidth={1.6} />
          Uploads
        </NavLink>
        <NavLink to="/admin/inquiries" className={linkClass}>
          <MessageSquareMore size={18} strokeWidth={1.6} />
          Inquiries
        </NavLink>
      </nav>

      <div className="mt-auto px-4 py-4">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[#2B2B2B] border border-[#EDEDED] hover:border-[#f3e218] transition-colors"
          style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
        >
          <LogOut size={16} strokeWidth={1.6} />
          Logout
        </button>
      </div>
    </aside>
  );
}
