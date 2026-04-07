import { motion } from 'framer-motion';
import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { createCareerInquiry } from '../lib/api';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    dob: '',
    state: '',
    skills: '',
    agreeToTerms: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const parsedSkills = formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);

      await createCareerInquiry({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        age: formData.age ? Number(formData.age) : undefined,
        dob: formData.dob || undefined,
        state: formData.state,
        skills: parsedSkills,
      });

      setSuccessMessage('Application submitted successfully. We will review your profile shortly.');
      setFormData({
        name: '',
        email: '',
        gender: '',
        age: '',
        dob: '',
        state: '',
        skills: '',
        agreeToTerms: false,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  return (
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
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

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                GENDER
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                AGE
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min={1}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                DATE OF BIRTH
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                STATE
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#EDEDED] text-[#2B2B2B] focus:outline-none focus:border-[#f3e218] transition-colors"
                style={{ fontSize: '15px', fontWeight: 400 }}
              />
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="skills" className="block text-[#2B2B2B] mb-3" style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '1px' }}>
                SKILLS (COMMA SEPARATED)
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                rows={4}
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
              disabled={!formData.agreeToTerms || submitting}
              className="w-full px-12 py-4 bg-[#f3e218] text-white hover:bg-[#2B2B2B] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '1px', borderRadius: '4px' }}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
