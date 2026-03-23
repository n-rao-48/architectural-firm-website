import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

const logoImage = new URL('../assets/logo.png', import.meta.url).href;

const projectLinks = [
  { label: 'All Projects', to: '/projects' },
  { label: 'Ongoing Projects', to: '/projects/ongoing' },
  { label: 'Pune', to: '/projects/pune' },
  { label: 'Nashik', to: '/projects/nashik' },
  { label: 'Ahilyanagar', to: '/projects/ahilyanagar' },
  { label: 'Chhatrapati Sambhaji Nagar', to: '/projects/sambhajinagar' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsMobileOpen, setProjectsMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setProjectsMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#F5F5F5]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-row items-center gap-3">
            <img
              src={logoImage}
              alt="Bhoomi Constructions logo"
              className="w-20 h-20 object-contain"
            />
            <span className="text-[#2B2B2B] tracking-wide" style={{ fontWeight: 400, fontSize: '14px' }}>BHOOMI CONSTRUCTIONS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${isActive('/') ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]' : ''}`} style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>Home</Link>
            <a href="/#about" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>About</a>

            {/* Projects Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${isActive('/projects') ? 'text-[#f3e218]' : ''}`}
                style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}
              >
                Projects
                <ChevronDown size={13} strokeWidth={1.5} className="transition-transform duration-200 group-hover:rotate-180" />
                {isActive('/projects') && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-[#f3e218]" />
                )}
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block z-50">
                <div className="bg-white border border-[#EDEDED] shadow-sm min-w-[220px] py-1">
                  {projectLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-5 py-2.5 hover:bg-[#F8F8F8] transition-colors ${
                        location.pathname === link.to ? 'text-[#f3e218]' : 'text-[#2B2B2B] hover:text-[#f3e218]'
                      }`}
                      style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '0.5px' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <a href="/#services" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>Services</a>
            <Link to="/team" className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${isActive('/team') ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]' : ''}`} style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>Team</Link>
            <Link to="/testimonials" className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${isActive('/testimonials') ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]' : ''}`} style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>Testimonials</Link>
            <Link to="/inquiry" className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${isActive('/inquiry') ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]' : ''}`} style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>Contact</Link>
            <Link to="/apply" className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${isActive('/apply') ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]' : ''}`} style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}>Apply</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2B2B2B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-[#F5F5F5]">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>Home</Link>
              <a href="/#about" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>About</a>

              {/* Mobile Projects Accordion */}
              <div>
                <button
                  className={`flex items-center justify-between w-full py-2 transition-colors ${
                    isActive('/projects') ? 'text-[#f3e218]' : 'text-[#2B2B2B] hover:text-[#f3e218]'
                  }`}
                  style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }}
                  onClick={() => setProjectsMobileOpen(!projectsMobileOpen)}
                >
                  Projects
                  <ChevronDown size={13} strokeWidth={1.5} className={`transition-transform duration-200 ${projectsMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                {projectsMobileOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-2 border-l border-[#EDEDED]">
                    {projectLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`py-1.5 transition-colors ${
                          location.pathname === link.to ? 'text-[#f3e218]' : 'text-[#2B2B2B]/70 hover:text-[#f3e218]'
                        }`}
                        style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '0.5px' }}
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a href="/#services" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>Services</a>
              <Link to="/team" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>Team</Link>
              <Link to="/testimonials" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>Testimonials</Link>
              <Link to="/inquiry" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>Contact</Link>
              <Link to="/apply" className="text-[#2B2B2B] hover:text-[#f3e218] transition-colors py-2" style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.5px' }} onClick={closeMobile}>Apply</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}