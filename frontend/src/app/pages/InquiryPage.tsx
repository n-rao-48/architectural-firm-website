import { motion } from 'framer-motion';
import { useState } from 'react';
import { sendClientInquiry } from '../../api/api.js';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    location: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.projectType.trim() || !formData.budget.trim() || !formData.location.trim()) {
      setErrorMessage('Please fill in all required fields before submitting.');
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const extraDetails = [
        formData.budget ? `Budget: ${formData.budget}` : '',
        formData.location ? `Location: ${formData.location}` : '',
        formData.message ? `Message: ${formData.message}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      await sendClientInquiry({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        projectType: formData.projectType.trim(),
        message: extraDetails,
      });

      setSuccessMessage('Inquiry submitted successfully. Our team will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        location: '',
        message: '',
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit inquiry right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[#f3e218] tracking-[3px] mb-4 block" style={{ fontSize: '11px', fontWeight: 400 }}>GET IN TOUCH</span>
          <h1 className="text-[#2B2B2B] mb-6" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 700, 
            letterSpacing: '0.02em',
            lineHeight: 1.2
          }}>
            Start Your Project
          </h1>
          <p className="text-[#2B2B2B]/70 max-w-2xl mx-auto" style={{ 
            fontSize: '1rem', 
            fontWeight: 400,
            lineHeight: 2,
            letterSpacing: '0.01em'
          }}>
            Share your vision with us, and we'll help bring it to life with architectural excellence.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {successMessage && (
                  <p className="text-green-700" style={{ fontSize: '14px', fontWeight: 400 }}>
                    {successMessage}
                  </p>
                )}

                {errorMessage && (
                  <p className="text-red-600" style={{ fontSize: '14px', fontWeight: 400 }}>
                    {errorMessage}
                  </p>
                )}

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
                    PHONE NUMBER
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

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                    PROJECT TYPE
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                    style={{ fontSize: '15px', fontWeight: 400 }}
                  >
                    <option value="">Select type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="interior">Interior</option>
                    <option value="renovation">Renovation</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="budget" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                    BUDGET RANGE
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                    style={{ fontSize: '15px', fontWeight: 400 }}
                  >
                    <option value="">Select range</option>
                    <option value="under-50k">Under Rs.50,000</option>
                    <option value="50k-100k">Rs.50,000 - Rs.100,000</option>
                    <option value="100k-250k">Rs.100,000 - Rs.250,000</option>
                    <option value="250k-500k">Rs.250,000 - Rs.500,000</option>
                    <option value="above-500k">Above Rs.500,000</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                    LOCATION
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                    style={{ fontSize: '15px', fontWeight: 400 }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                    MESSAGE (OPTIONAL)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors resize-none"
                    style={{ fontSize: '15px', fontWeight: 400 }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-12 py-4 bg-[#f3e218] text-white hover:bg-[#2B2B2B] transition-colors duration-300"
                  style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px', borderRadius: '4px' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>

            {/* Right Side Image */}
            <div className="hidden lg:block">
              <div className="sticky top-32 h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1658737229058-cf22ac7ee8ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYXJjaGl0ZWN0dXJhbCUyMHNwYWNlfGVufDF8fHx8MTc3MTM0NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Architecture"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
