import { motion } from 'framer-motion';
import { ClipboardCheck, Hammer, Home, Palette } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

const services = [
  {
    icon: Home,
    title: 'Architectural Design',
    description:
      'We provide conceptual design, planning, and detailed architectural drawings tailored to each client\'s requirements. Our approach ensures functional excellence while achieving an aesthetic vision that stands the test of time.',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description:
      'Our team develops comprehensive interior concepts covering space planning, material selection, lighting design, and furniture layout — creating interiors that are both visually compelling and deeply functional.',
  },
  {
    icon: ClipboardCheck,
    title: 'Site Supervision (Periodic)',
    description:
      'We conduct periodic site visits to monitor construction progress, verify adherence to approved designs, and guide contractors in maintaining the quality standards expected at every stage of the build.',
  },
  {
    icon: Hammer,
    title: 'Renovation',
    description:
      'We assist clients in redesigning and upgrading existing buildings and interiors, improving functionality, enhancing aesthetics, and optimising structural efficiency to breathe new life into older spaces.',
  },
];

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span
            className="text-[#f3e218] tracking-[3px] mb-4 block"
            style={{ fontSize: '11px', fontWeight: 400 }}
          >
            WHAT WE DO
          </span>
          <h1
            className="text-[#2B2B2B] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.2,
            }}
          >
            Our Services
          </h1>
          <p
            className="text-[#2B2B2B]/70 max-w-xl mx-auto"
            style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.8 }}
          >
            We offer a full spectrum of architectural and interior design consultancy services —
            from initial concept through to completion.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col gap-6 p-10 border border-[#EDEDED] hover:border-[#f3e218] transition-colors duration-300"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 border border-[#2B2B2B] flex items-center justify-center transition-all duration-300 group-hover:border-[#f3e218] group-hover:bg-[#f3e218]/5">
                    <Icon
                      size={28}
                      strokeWidth={1}
                      className="text-[#2B2B2B] transition-colors group-hover:text-[#f3e218]"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[#2B2B2B]"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-px bg-[#EDEDED] group-hover:bg-[#f3e218]/30 transition-colors duration-300" />

                  {/* Description */}
                  <p
                    className="text-[#2B2B2B]/70"
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                      lineHeight: 2,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
