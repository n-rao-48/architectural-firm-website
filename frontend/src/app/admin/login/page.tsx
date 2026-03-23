import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLoginPage() {
  const { isAuthenticated, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState('admin@bhoomiconstruction.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login(email, password);
      const redirectPath = location.state?.from || '/admin/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-[#EDEDED] p-8">
        <p className="text-[#f3e218] tracking-[2px] mb-2" style={{ fontSize: '11px', fontWeight: 400 }}>
          ADMIN LOGIN
        </p>
        <h1 className="text-[#2B2B2B] mb-8" style={{ fontSize: '2rem', fontWeight: 400 }}>
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="block mb-2" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-0 py-3 border-0 border-b border-[#EDEDED] focus:outline-none focus:border-[#f3e218]"
              required
            />
          </label>

          <label className="block">
            <span className="block mb-2" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
              Password
            </span>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-0 py-3 pr-10 border-0 border-b border-[#EDEDED] focus:outline-none focus:border-[#f3e218]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2B2B2B]/60 hover:text-[#2B2B2B] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </label>

          {error && (
            <p className="text-red-600" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
              {error}
            </p>
          )}

          {!error && (
            <p className="text-[#2B2B2B]/60" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
              Demo: admin@bhoomiconstruction.com / admin123
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-12 py-4 bg-[#2B2B2B] text-white hover:bg-[#f3e218] hover:text-[#2B2B2B] transition-colors disabled:opacity-60"
            style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
