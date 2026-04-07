import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const santoshImage = new URL('../../assets/Santosh Kapadnekar.jpeg', import.meta.url).href;
const darshanaImage = new URL('../../assets/Darshana Kapadnekar.jpeg', import.meta.url).href;

const team = [
  {
    name: 'Santosh Kapadnekar',
    role: 'Architect',
    image: santoshImage,
    objectPosition: '50% 20%'
  },
  {
    name: 'Darshana Kapadnekar',
    role: 'Interior Designer',
    image: darshanaImage,
    objectPosition: '50% 25%'
  }
];

export function TeamSection() {
  return (
    <section id="team" className="py-32 px-6 lg:px-12 bg-[#F5F5F5]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>OUR PEOPLE</span>
          <h2 className="text-[#2B2B2B]" style={{ 
            fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)', 
            fontWeight: 700, 
            letterSpacing: '0.01em',
            lineHeight: 1.3
          }}>
            Meet The Team
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto mb-16">
          {team.map((member, index) => (
            <div key={index} className="group text-center flex flex-col items-center">
              {/* Portrait */}
              <div className="mb-8 relative overflow-hidden w-64 aspect-[4/5]">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                  style={{ objectPosition: member.objectPosition }}
                />
              </div>

              {/* Info */}
              <h3 className="text-[#2B2B2B] mb-2" style={{ 
                fontSize: '1.25rem', 
                fontWeight: 400, 
                letterSpacing: '0.02em'
              }}>
                {member.name}
              </h3>
              
              <p className="text-[#2B2B2B]/70 mb-6" style={{ 
                fontSize: '0.875rem', 
                fontWeight: 400,
                letterSpacing: '0.5px'
              }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* View Profiles Link */}
        <div className="text-center">
          <Link 
            to="/team" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2B2B2B] text-white hover:bg-[#f3e218] transition-colors group"
            style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
          >
            View Full Profiles
            <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
