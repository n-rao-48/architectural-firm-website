import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">

      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset * 0.2}px)`
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1617788587804-10346bac2ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTMyMzg0OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern architecture"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">

        <div className="max-w-4xl">

          {/* Firm Name */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#2B2B2B] mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.2
            }}
          >
            Kapadnekar
            <br />
            Design Consultancy
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[#2B2B2B] mb-6"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: '#f3e218'
            }}
          >
            Designing Spaces, Crafting Experiences
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#2B2B2B] max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              fontWeight: 400,
              letterSpacing: '0.03em',
              lineHeight: 1.8
            }}
          >
            Where architecture meets artistry, and every structure tells a story
          </motion.p>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span
            className="text-[#2B2B2B] tracking-widest"
            style={{ fontSize: '11px', letterSpacing: '2px' }}
          >
            SCROLL
          </span>
          <ChevronDown size={20} strokeWidth={1} className="text-[#2B2B2B]" />
        </motion.div>

      </div>
    </section>
  );
}