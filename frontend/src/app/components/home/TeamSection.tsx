import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const team = [
  {
    name: 'Santosh Kapadnekar',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1667996113308-b8fa553d4ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEzNDUxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    name: 'Darshana Kapadnekar',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1685002238434-62022421d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbmVyJTIwcHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MXx8fHwxNzcxMzQ1MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
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
            <div key={index} className="group text-center">
              {/* Portrait */}
              <div className="mb-8 relative overflow-hidden mx-auto w-64 h-64">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
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
