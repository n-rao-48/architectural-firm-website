import { Mail, MapPin, Phone } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { EmailInteractionModal } from './EmailInteractionModal';
const logoImage = new URL('../assets/logo.png', import.meta.url).href;


export function Footer() {
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const emails = ['s.kaps@rediffmail.com', 'd.kaps@rediffmail.com'];

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>, email: string) => {
    event.preventDefault();
    setSelectedEmail(email);
    setIsEmailModalOpen(true);
  };

  return (
    <footer className="bg-[#F5F5F5] px-6 lg:px-12 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="flex flex-row items-center gap-3">
              <img
                src={logoImage}
                alt="Kapadnekar Design Consultancy logo"
                className="w-20 h-20 object-contain"
              />
              <span className="text-[#2B2B2B] tracking-wide" style={{ fontWeight: 400, fontSize: '14px' }}>Kapadnekar Design Consultancy</span>
            </Link>
            <p className="text-[#2B2B2B]/70" style={{ 
              fontSize: '0.875rem', 
              fontWeight: 400,
              lineHeight: 1.8
            }}>
              Designing spaces that inspire and endure.
            </p>

            <div className="mt-8">
              <h4 className="text-[#2B2B2B] mb-4" style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '2px'
              }}>
                OFFICE LOCATION
              </h4>

              <div className="w-full overflow-hidden border border-[#EDEDED] rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1773285963705!6m8!1m7!1sC03PWXUp2jJKFv9DAxBlYQ!2m2!1d19.99333685020697!2d73.77211184364224!3f112.51290580062961!4f9.745903360697014!5f0.7820865974627469"
                  className="w-full h-[220px] sm:h-[250px] lg:h-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kapadnekar Design Consultancy Office Street View"
                />
              </div>

              <a
                href="https://maps.app.goo.gl/8M6cSL4gixtppLZY8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors"
                style={{ fontSize: '0.875rem', fontWeight: 400 }}
              >
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#2B2B2B] mb-6" style={{ 
              fontSize: '0.875rem', 
              fontWeight: 400, 
              letterSpacing: '2px'
            }}>
              NAVIGATION
            </h4>
            <div className="space-y-3">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Home</Link>
              <a href="/#about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>About</a>
              <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Projects</Link>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Services</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#2B2B2B] mb-6" style={{ 
              fontSize: '0.875rem', 
              fontWeight: 400, 
              letterSpacing: '2px'
            }}>
              SERVICES
            </h4>
            <div className="space-y-3">
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Architecture</Link>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Interior Design</Link>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Renovation</Link>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>Supervision</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#2B2B2B] mb-6" style={{ 
              fontSize: '0.875rem', 
              fontWeight: 400, 
              letterSpacing: '2px'
            }}>
              CONTACT
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-[#f3e218] mt-1 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/8M6cSL4gixtppLZY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors"
                  style={{ fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 }}
                >
                  205, Space Star, MICO Circle,<br />
                  Tidke Colony, Nashik - 422002
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1.5} className="text-[#f3e218] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-[#2B2B2B]/70 hover:text-[#f3e218] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
                  +91 (0253) 2316312
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} strokeWidth={1.5} className="text-[#f3e218] flex-shrink-0" />
                <div className="flex flex-col gap-2">
                  {emails.map((email) => {
                    const isSelected = selectedEmail === email;

                    return (
                      <a
                        key={email}
                        onClick={(event) => handleEmailClick(event, email)}
                        href="#"
                        className={`text-left transition-colors ${
                          isSelected ? 'text-[#f3e218]' : 'text-[#2B2B2B]/70 hover:text-[#f3e218]'
                        }`}
                        style={{ fontSize: '0.875rem', fontWeight: 400 }}
                        aria-current={isSelected ? 'true' : undefined}
                      >
                        {email}
                      </a>
                    );
                  })}

                </div>
              </div>
            </div>

            <EmailInteractionModal
              selectedEmail={selectedEmail}
              open={isEmailModalOpen}
              onOpenChange={setIsEmailModalOpen}
            />

          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2B2B2B]/10 mb-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[#2B2B2B]/50" style={{ fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.5px' }}>
            © {new Date().getFullYear()} Kapadnekar Design Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
