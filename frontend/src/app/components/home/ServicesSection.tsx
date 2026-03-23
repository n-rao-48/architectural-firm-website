import { Home, Palette, Hammer, ClipboardCheck } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Architectural Design',
    description: 'Innovative structural design that balances form and function',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description: 'Curated spaces that reflect personality and purpose',
  },
  {
    icon: Hammer,
    title: 'Renovation',
    description: 'Transforming existing spaces with modern sensibilities',
  },
  {
    icon: ClipboardCheck,
    title: 'Site Supervision',
    description: 'Ensuring excellence from concept to completion',
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>WHAT WE DO</span>
          <h2 className="text-[#2B2B2B]" style={{ 
            fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)', 
            fontWeight: 700, 
            letterSpacing: '0.01em',
            lineHeight: 1.3
          }}>
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 border border-[#2B2B2B] flex items-center justify-center transition-all duration-300 group-hover:border-[#f3e218] group-hover:bg-[#f3e218]/5">
                    <Icon size={32} strokeWidth={1} className="text-[#2B2B2B] transition-colors group-hover:text-[#f3e218]" />
                  </div>
                </div>
                
                <h3 className="text-[#2B2B2B] mb-4" style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 400, 
                  letterSpacing: '0.02em'
                }}>
                  {service.title}
                </h3>
                
                <p className="text-[#2B2B2B]/70 max-w-xs mx-auto" style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 400,
                  lineHeight: 1.8,
                  letterSpacing: '0.01em'
                }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
