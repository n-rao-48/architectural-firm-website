import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
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
  const [activeSection, setActiveSection] = useState<'home' | 'about'>('home');

  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // ✅ GLOBAL SCROLL TO TOP (except About)
  useEffect(() => {
    if (location.hash === '#about') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const navOffset = 90;
    const top =
      aboutSection.getBoundingClientRect().top +
      window.scrollY -
      navOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleAboutClick = (
    event: MouseEvent<HTMLAnchorElement>,
    shouldCloseMobile = false
  ) => {
    if (shouldCloseMobile) closeMobile();

    if (location.pathname === '/') {
      event.preventDefault();
      scrollToAboutSection();
      setActiveSection('about');
    }
  };

  const handleHomeClick = (
    event: MouseEvent<HTMLAnchorElement>,
    shouldCloseMobile = false
  ) => {
    if (shouldCloseMobile) closeMobile();

    if (location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    }
  };

  // 🔥 Scroll detection for active section
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();

      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection('about');
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
  if (location.pathname === '/' && location.hash === '#about') {
    const timer = setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const navOffset = 90;
      const top =
        aboutSection.getBoundingClientRect().top +
        window.scrollY -
        navOffset;

      window.scrollTo({ top, behavior: 'smooth' });
    }, 100); // small delay ensures DOM is ready

    return () => clearTimeout(timer);
  }
}, [location.pathname, location.hash]);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setProjectsMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5F5F5]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex flex-row items-center gap-3">
            <img
              src={logoImage}
              alt="Kapadnekar Design Consultancy logo"
              className="w-20 h-20 object-contain"
            />
            <div className="leading-tight">
              <h4 className="text-[#2B2B2B] text-[1.15rem] sm:text-[1.3rem] tracking-[0.02em]">
                Kapadnekar
              </h4>
              <span className="text-[#2B2B2B]/70 uppercase tracking-[0.18em] text-[0.6rem] sm:text-[0.64rem] block mt-1">
                Design Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">

            {/* Home */}
            <Link
              to="/"
              onClick={(e) => handleHomeClick(e)}
              className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${
                location.pathname === '/' && activeSection === 'home'
                  ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]'
                  : ''
              }`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/#about"
              onClick={(e) => handleAboutClick(e)}
              className={`text-[#2B2B2B] hover:text-[#f3e218] transition-colors relative ${
                location.pathname === '/' && activeSection === 'about'
                  ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]'
                  : ''
              }`}
            >
              About
            </Link>

            {/* Projects Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 transition-colors ${
                  isActive('/projects')
                  ? 'text-[#f3e218]'
                  : 'text-[#2B2B2B] hover:text-[#f3e218]'
                }`}
              >
                Projects
                <ChevronDown size={13} />
              </button>

              {isActive('/projects') && (
                <span className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-[#f3e218]" />
              )}

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block">
                <div className="bg-white border border-[#EDEDED] shadow-sm min-w-[220px] py-1">
                  {projectLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-5 py-2.5 transition-colors ${
  location.pathname === link.to
    ? 'text-[#f3e218]'
    : 'text-[#2B2B2B] hover:text-[#f3e218]'
}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Links */}
            {[
              { label: 'Services', to: '/services' },
              { label: 'Team', to: '/team' },
              { label: 'Testimonials', to: '/testimonials' },
              { label: 'Contact', to: '/inquiry' },
              { label: 'Apply', to: '/apply' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-[#2B2B2B] hover:text-[#f3e218] relative ${
                  isActive(item.to)
                    ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#f3e218]'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 flex flex-col gap-4">

  <Link to="/" onClick={(e) => handleHomeClick(e, true)}>
    Home
  </Link>

  <Link to="/#about" onClick={(e) => handleAboutClick(e, true)}>
    About
  </Link>

  <Link to="/projects" onClick={closeMobile}>
    Projects
  </Link>

  <Link to="/services" onClick={closeMobile}>
    Services
  </Link>

  <Link to="/team" onClick={closeMobile}>
    Team
  </Link>

  <Link to="/testimonials" onClick={closeMobile}>
    Testimonials
  </Link>

  <Link to="/inquiry" onClick={closeMobile}>
    Contact
  </Link>

  <Link to="/apply" onClick={closeMobile}>
    Apply
  </Link>

</div>
        )}
      </div>
    </nav>
  );
}