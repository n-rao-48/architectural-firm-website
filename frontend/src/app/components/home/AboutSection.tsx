import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div>
              <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>ABOUT US</span>
              <h2 className="text-[#2B2B2B] mb-8" style={{ 
                fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)', 
                fontWeight: 700, 
                letterSpacing: '0.01em',
                lineHeight: 1.3
              }}>
                Building Tomorrow's Vision 
              </h2>
            </div>
            
            <p className="text-[#2B2B2B]" style={{ 
              fontSize: '1rem', 
              fontWeight: 400,
              lineHeight: 2,
              letterSpacing: '0.01em'
            }}>
              We are a team of passionate architects and interior designers dedicated to transforming spaces into timeless works of art. Our approach blends functionality with aesthetic excellence, creating environments that inspire and endure.
            </p>

            <p className="text-[#2B2B2B]" style={{ 
              fontSize: '1rem', 
              fontWeight: 400,
              lineHeight: 2,
              letterSpacing: '0.01em'
            }}>
              With a focus on sustainable design and innovative solutions, we bring your architectural dreams to life with precision and care.
            </p>

            <Link 
              to="/team" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#2B2B2B] text-white hover:bg-[#f3e218] transition-colors group"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
            >
              Meet Our Team
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Image */}
          <div className="relative h-[500px] md:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1765277789203-b26f51b78f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBzcGFjZXxlbnwxfHx8fDE3NzEzNDUxODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Interior design"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[#f3e218]/30 hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
