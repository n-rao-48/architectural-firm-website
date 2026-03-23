import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[#2B2B2B] mb-8" style={{ 
            fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)', 
            fontWeight: 700, 
            letterSpacing: '0.01em',
            lineHeight: 1.3
          }}>
            Start Your Project With Us
          </h2>
          
          <p className="text-[#2B2B2B]/70 mb-12" style={{ 
            fontSize: '1rem', 
            fontWeight: 400,
            lineHeight: 2,
            letterSpacing: '0.01em'
          }}>
            Let's bring your vision to life. Reach out to discuss your architectural needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/inquiry"
              className="inline-flex items-center justify-center px-12 py-4 bg-[#2B2B2B] text-white hover:bg-[#f3e218] transition-colors duration-300"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px' }}
            >
              Contact Us
            </Link>

            <a 
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2B2B2B] hover:text-[#f3e218] transition-colors"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
