import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1617788587804-10346bac2ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTMyMzg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern architecture"
          className="w-full h-full object-cover grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-[#2B2B2B] mb-6" style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 700, 
            letterSpacing: '0.02em',
            lineHeight: 1.2
          }}>
            Designing Spaces,
            <br />
            Crafting Experiences
          </h1>
          <p className="text-[#2B2B2B] max-w-2xl mx-auto" style={{ 
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', 
            fontWeight: 400,
            letterSpacing: '0.03em',
            lineHeight: 1.8
          }}>
            Where architecture meets artistry, and every structure tells a story
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[#2B2B2B] tracking-widest" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>SCROLL</span>
          <ChevronDown size={20} strokeWidth={1} className="text-[#2B2B2B]" />
        </div>
      </div>
    </section>
  );
}
