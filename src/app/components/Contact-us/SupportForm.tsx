"use client"

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface SupportFormProps {
  onAlertShow: (message: string, type: 'success' | 'error') => void;
}

const SupportForm: React.FC<SupportFormProps> = ({ onAlertShow }) => {
  const { theme } = useTheme();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    website: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const dataToSend = {
      ...formData,
      services: selectedServices
    };
  
    try {
      // First, save to database
      const contactResponse = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!contactResponse.ok) {
        throw new Error('Failed to save contact information');
      }

      // Then, send emails
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send emails');
      }
  
      onAlertShow('Form submitted successfully!', 'success');
      // Reset form
      setFormData({
        name: '',
        organization: '',
        email: '',
        website: '',
        message: ''
      });
      setSelectedServices([]);
    } catch (error) {
      console.error('Error:', error);
      onAlertShow('Error submitting form. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Lead Management',
    'Social Media Marketing',
    'Web Development',
    'Mobile App Development',
    'SEO Optimization',
    'Content Creation',
    'Email Marketing',
    'UI/UX Design',
    'E-commerce Solutions',
    'Data Analytics',
    'Cloud Services',
    'Cybersecurity'
  ];

  return (
    <>
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px ${theme === 'dark' ? 'black' : 'white'} inset;
          -webkit-text-fill-color: ${theme === 'dark' ? 'white' : 'black'};
        }
      `}</style>
      <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'} pt-16 sm:pt-24 md:pt-36 pb-16 px-4 sm:px-8 md:px-16 lg:px-[122px]`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1"> Ready to watch 
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF9F4A] to-[#FFC837] text-transparent bg-clip-text">
            your business grow and thrive?
            </span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-4 max-w-xl">
          Let’s write down a happy story for your digital journey. We are always excited to answer your Queries and work with potential businesses!
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mb-12 sm:mb-12 max-w-xl">
          Drop us your message and we will get back to you soon! 
          </p>
          <div className="flex flex-col lg:flex-row gap-8">
            <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-8 sm:space-y-12">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`w-full bg-transparent border-b ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'} py-2 text-sm focus:outline-none`}
                required
              />
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Your Organization Name"
                className={`w-full bg-transparent border-b ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'} py-2 text-sm focus:outline-none`}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className={`w-full bg-transparent border-b ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'} py-2 text-sm focus:outline-none`}
                required
              />
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Website/Social Media link"
                className={`w-full bg-transparent border-b ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'} py-2 text-sm focus:outline-none`}
              />
              <div>
                <p className="mb-4 text-sm">Which services are you interested in?</p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {services.map((service) => (
                    <label key={service} className="relative mb-2">
                      <input
                        type="checkbox"
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                      />
                      <span className={`block bg-transparent border ${selectedServices.includes(service) ? 'border-blue-500' : 'border-gray-700'} rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs cursor-pointer whitespace-nowrap`}>
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="What&apos;s on your mind?"
                className={`w-full bg-transparent border-b ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'} py-2 text-sm focus:outline-none`}
                rows={2}
                required
              ></textarea>
              <button 
                type="submit" 
                className="relative w-full sm:w-[200px] h-[50px] rounded-full text-base font-medium text-white overflow-hidden group"
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                </span>
                <span 
                  className="absolute inset-0 rounded-full opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
                    padding: '1px',
                    content: "''",
                    zIndex: 0,
                  }}
                ></span>
                <span className="absolute inset-[1px] bg-black rounded-full z-[1]"></span>
                <span 
                  className="absolute inset-0 rounded-full opacity-75 blur-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
                    content: "''",
                    zIndex: -1,
                  }}
                ></span>
              </button>
            </form>
            <div className="w-full lg:w-1/2 flex items-start justify-center -mt-4 sm:-mt-8 lg:-mt-12">
              <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/4f10db29-1416-42f1-8930-d41fca410f4d/WGOgpIONP9.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportForm;
