import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="w-full border-b border-[#EDEDED] bg-white px-6 py-5 lg:px-10 flex items-center justify-between">
      <div>
        <p className="text-[#f3e218] tracking-[2px]" style={{ fontSize: '11px', fontWeight: 400 }}>
          ADMIN
        </p>
        <h1 className="text-[#2B2B2B]" style={{ fontSize: '1.25rem', fontWeight: 400 }}>
          Project Management
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#2B2B2B]/70 hidden sm:inline" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          {user?.email || 'Administrator'}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="px-6 py-2 border border-[#EDEDED] text-[#2B2B2B] hover:border-[#f3e218] transition-colors"
          style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
