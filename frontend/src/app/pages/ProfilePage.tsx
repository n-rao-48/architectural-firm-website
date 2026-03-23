import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

const profiles = [
  {
    name: 'Santosh Kapadnekar',
    designation: 'Architect',
    qualification: 'M.Arch, RIBA, LEED AP',
    image: 'https://images.unsplash.com/photo-1667996113308-b8fa553d4ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEzNDUxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'With over 15 years of experience in sustainable architecture, Jonathan brings a unique vision that merges environmental consciousness with timeless design. His approach emphasizes the relationship between built environments and natural landscapes, creating structures that exist in harmony with their surroundings. Jonathan\'s work has been recognized internationally, with projects spanning residential, commercial, and institutional sectors.',
    expertise: [
      'Sustainable Architecture',
      'Urban Planning',
      'Residential Design',
      'Commercial Structures',
      'LEED Certification'
    ]
  },
  {
    name: 'Darshana Kapadnekar',
    designation: 'Interior Designer',
    qualification: 'BFA Interior Design, NCIDQ Certified',
    image: 'https://images.unsplash.com/photo-1685002238434-62022421d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbmVyJTIwcHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MXx8fHwxNzcxMzQ1MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Elena\'s design philosophy centers on creating spaces that tell stories and evoke emotion. With a background in fine arts and a keen eye for detail, she transforms interiors into experiences. Her minimalist aesthetic is characterized by careful material selection, subtle textures, and masterful use of light and shadow. Elena\'s portfolio includes luxury residences, boutique hotels, and high-end commercial spaces.',
    expertise: [
      'Residential Interiors',
      'Material Selection',
      'Space Planning',
      'Luxury Design',
      'Lighting Design'
    ]
  }
];

export default function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>OUR LEADERSHIP</span>
          <h1 className="text-[#2B2B2B]" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 700, 
            letterSpacing: '0.02em',
            lineHeight: 1.2
          }}>
            Leadership & Design Philosophy
          </h1>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto space-y-32">
          {profiles.map((profile, index) => (
            <div key={index}>
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Photo */}
                <div className="relative h-[600px]">
                  <img 
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-[#2B2B2B] mb-2" style={{ 
                      fontSize: 'clamp(1.5rem, 2.7vw, 2.25rem)', 
                      fontWeight: 700, 
                      letterSpacing: '0.02em'
                    }}>
                      {profile.name}
                    </h2>
                    <p className="text-[#f3e218] mb-2" style={{ 
                      fontSize: '1rem', 
                      fontWeight: 400,
                      letterSpacing: '1px'
                    }}>
                      {profile.designation}
                    </p>
                    <p className="text-[#2B2B2B]/60" style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 400,
                      letterSpacing: '0.5px'
                    }}>
                      {profile.qualification}
                    </p>
                  </div>

                  <div className="h-px bg-[#EDEDED]"></div>

                  <div>
                    <h3 className="text-[#2B2B2B] mb-4" style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 400,
                      letterSpacing: '2px'
                    }}>
                      BIOGRAPHY
                    </h3>
                    <p className="text-[#2B2B2B]" style={{ 
                      fontSize: '1rem', 
                      fontWeight: 400,
                      lineHeight: 2,
                      letterSpacing: '0.01em'
                    }}>
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#2B2B2B] mb-4" style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 400,
                      letterSpacing: '2px'
                    }}>
                      KEY EXPERTISE
                    </h3>
                    <ul className="space-y-2">
                      {profile.expertise.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-[#f3e218]"></div>
                          <span className="text-[#2B2B2B]" style={{ 
                            fontSize: '0.9375rem', 
                            fontWeight: 400,
                            letterSpacing: '0.01em'
                          }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Divider between profiles */}
              {index < profiles.length - 1 && (
                <div className="h-px bg-[#EDEDED] mt-32"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}