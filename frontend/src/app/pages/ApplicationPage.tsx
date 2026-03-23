import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Upload } from 'lucide-react';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    portfolio: '',
    coverLetter: '',
    agreeToTerms: false
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData, resumeFile);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>CAREERS</span>
          <h1 className="text-[#2B2B2B] mb-6" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 700, 
            letterSpacing: '0.02em',
            lineHeight: 1.2
          }}>
            Join Our Team
          </h1>
          <p className="text-[#2B2B2B]/70 max-w-2xl mx-auto" style={{ 
            fontSize: '1rem', 
            fontWeight: 400,
            lineHeight: 2,
            letterSpacing: '0.01em'
          }}>
            We're always looking for talented individuals who share our passion for exceptional design.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                FULL NAME
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                PHONE
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Highest Qualification */}
            <div>
              <label htmlFor="qualification" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                HIGHEST QUALIFICATION
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                placeholder="e.g., Bachelor of Architecture, Master of Interior Design"
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors placeholder:text-[#2B2B2B]/30"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Portfolio Link */}
            <div>
              <label htmlFor="portfolio" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                PORTFOLIO LINK (OPTIONAL)
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors placeholder:text-[#2B2B2B]/30"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                RESUME UPLOAD
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                />
                <label 
                  htmlFor="resume"
                  className="flex items-center gap-3 px-6 py-4 border border-[#EDEDED] cursor-pointer hover:border-[#f3e218] transition-colors"
                  style={{ borderRadius: '4px' }}
                >
                  <Upload size={20} strokeWidth={1.5} className="text-[#2B2B2B]" />
                  <span className="text-[#2B2B2B]" style={{ fontSize: '14px', fontWeight: 400 }}>
                    {resumeFile ? resumeFile.name : 'Choose file (PDF, DOC, DOCX)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                COVER LETTER
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors resize-none"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1"
              />
              <label htmlFor="agreeToTerms" className="text-[#2B2B2B]" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.6 }}>
                I agree to the terms & conditions and understand that my information will be processed according to the privacy policy.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="w-full px-12 py-4 bg-[#f3e218] text-white hover:bg-[#2B2B2B] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px', borderRadius: '4px' }}
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
