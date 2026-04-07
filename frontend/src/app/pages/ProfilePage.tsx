import { motion } from 'framer-motion';
import { useEffect, type CSSProperties } from 'react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

const santoshImage = new URL('../assets/Santosh Kapadnekar.jpeg', import.meta.url).href;
const darshanaImage = new URL('../assets/Darshana Kapadnekar.jpeg', import.meta.url).href;

type Profile = {
  name: string;
  designation: string;
  qualification: string;
  image: string;
  imageFit: CSSProperties['objectFit'];
  bio: string;
  expertise: string[];
};

const profiles: Profile[] = [
  {
    name: 'Santosh Kapadnekar',
    designation: 'Architect',
    qualification: 'M.Arch, RIBA, LEED AP',
    image: santoshImage,
    imageFit: 'contain',
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
    image: darshanaImage,
    imageFit: 'contain',
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
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
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
                <div className="relative h-[580px]">
                  <img 
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full grayscale"
                    style={{ objectFit: profile.imageFit, objectPosition: 'center' }}
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
    </motion.div>
  );
}