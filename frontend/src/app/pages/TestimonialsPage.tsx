import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

const testimonials = [
  {
    id: 1,
    clientName: 'Sarah & Michael Chen',
    projectType: 'Residential Renovation',
    location: 'Beverly Hills, CA',
    testimonial: 'Working with Studio Arch was an exceptional experience from start to finish. Jonathan and his team transformed our dated home into a modern sanctuary that perfectly reflects our lifestyle. Their attention to detail and commitment to sustainable design exceeded our expectations. The process was seamless, and the result is a home we absolutely love.',
    projectImage: 'https://images.unsplash.com/photo-1564703048291-bcf7f001d83d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzEyNjIyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeImage: 'https://images.unsplash.com/photo-1753824821636-ea1dd1ccbf54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGJlZm9yZSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQ5Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    afterImage: 'https://images.unsplash.com/photo-1564703048291-bcf7f001d83d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzEyNjIyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    clientName: 'David Martinez',
    projectType: 'Commercial Office Design',
    location: 'San Francisco, CA',
    testimonial: "Elena's interior design expertise brought our vision for a modern workspace to life. She understood our company culture and created an environment that enhances productivity while maintaining aesthetic sophistication. The space has received countless compliments from clients and team members alike. Her minimalist approach was exactly what we needed.",
    projectImage: 'https://images.unsplash.com/photo-1770816307909-de85ea3b54a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxMzAyOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeImage: 'https://images.unsplash.com/photo-1651342489820-7d824299445e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvciUyMGNvbmNyZXRlfGVufDF8fHx8MTc3MTM0NTE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    afterImage: 'https://images.unsplash.com/photo-1770816307909-de85ea3b54a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxMzAyOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    clientName: 'Jennifer Thompson',
    projectType: 'Luxury Apartment Interior',
    location: 'New York, NY',
    testimonial: "Studio Arch transformed my apartment into a work of art. Elena's understanding of space, light, and materials created an interior that feels both elegant and livable. Every element was carefully considered, from the custom millwork to the lighting design. I couldn't be happier with the final result. This is more than just a home—it's a sanctuary.",
    projectImage: 'https://images.unsplash.com/photo-1769736436759-1c43688ef899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzaWRlbnRpYWwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEzMDAwNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeImage: 'https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzIwNjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    afterImage: 'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEyNzk3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    clientName: 'Robert & Lisa Anderson',
    projectType: 'Contemporary Home Design',
    location: 'Malibu, CA',
    testimonial: "Jonathan's architectural vision brought our dream coastal home to life. His ability to blend modern design with the natural landscape is truly remarkable. The home feels like it has always belonged there. The construction process was well-managed, and the attention to sustainability was impressive. We highly recommend Studio Arch for anyone seeking world-class architecture.",
    projectImage: 'https://images.unsplash.com/photo-1617788587804-10346bac2ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTMyMzg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeImage: 'https://images.unsplash.com/photo-1696743297474-d674b8e3d82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBmYWNhZGV8ZW58MXx8fHwxNzcxMzQ1MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    afterImage: 'https://images.unsplash.com/photo-1617788587804-10346bac2ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTMyMzg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 5,
    clientName: 'Kapadnis Family',
    projectType: 'Residential Renovation',
    location: 'Maharashtra, India',
    testimonial: 'The before and after transformation captured in our YouTube short reflects the thoughtful renovation work and design detailing delivered by the team. We are very happy with the final result and the way our renovated space now looks and feels.',
    projectImage: 'https://img.youtube.com/vi/-Z_NHBiCqYQ/hqdefault.jpg',
    beforeImage: '',
    afterImage: '',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/-Z_NHBiCqYQ'
  }
];

export default function TestimonialsPage() {
  return (
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>TESTIMONIALS</span>
          <h1 className="text-[#2B2B2B]" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 700, 
            letterSpacing: '0.02em',
            lineHeight: 1.2
          }}>
            Client Experiences
          </h1>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto space-y-32">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id}>
              {/* Testimonial Block */}
              <div className="bg-[#F8F8F8] p-12 lg:p-16">
                <div className="grid lg:grid-cols-5 gap-12">
                  {/* Project Image */}
                  <div className="lg:col-span-2">
                    <div className="relative h-[400px]">
                      <img 
                        src={testimonial.projectImage}
                        alt={testimonial.projectType}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="lg:col-span-3 flex flex-col justify-center">
                    <div className="mb-6">
                      <p className="text-[#f3e218] mb-2" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
                        {testimonial.projectType.toUpperCase()}
                      </p>
                      <h3 className="text-[#2B2B2B] mb-1" style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 400, 
                        letterSpacing: '0.02em'
                      }}>
                        {testimonial.clientName}
                      </h3>
                      <p className="text-[#2B2B2B]/60" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
                        {testimonial.location}
                      </p>
                    </div>

                    <p className="text-[#2B2B2B] italic" style={{ 
                      fontSize: '1.0625rem', 
                      fontWeight: 400,
                      lineHeight: 2,
                      letterSpacing: '0.01em'
                    }}>
                      "{testimonial.testimonial}"
                    </p>
                  </div>
                </div>

                {/* Before/After Gallery */}
                {testimonial.beforeImage && testimonial.afterImage && (
                  <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[#2B2B2B] mb-3" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
                        BEFORE
                      </p>
                      <div className="relative h-[300px]">
                        <img 
                          src={testimonial.beforeImage}
                          alt="Before"
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[#2B2B2B] mb-3" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
                        AFTER
                      </p>
                      <div className="relative h-[300px]">
                        <img 
                          src={testimonial.afterImage}
                          alt="After"
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Before/After Video */}
                {testimonial.youtubeEmbedUrl && (
                  <div className="mt-12">
                    <p className="text-[#2B2B2B] mb-3" style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '2px' }}>
                      BEFORE & AFTER VIDEO
                    </p>
                    <div className="relative w-full max-w-[420px] overflow-hidden" style={{ paddingTop: '75%' }}>
                      <iframe
                        src={testimonial.youtubeEmbedUrl}
                        title={`${testimonial.clientName} testimonial video`}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Divider between testimonials */}
              {index < testimonials.length - 1 && (
                <div className="h-px bg-[#EDEDED]"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}