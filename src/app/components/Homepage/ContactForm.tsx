"use client"

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface ContactFormProps {
  onAlertShow: (message: string, type: 'success' | 'error') => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAlertShow }) => {
  const { theme } = useTheme();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    website: '',
    message: ''
  });

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
    
    const dataToSend = {
      ...formData,
      services: selectedServices
    };

    try {
      // Save to database
      const dbResponse = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!dbResponse.ok) {
        throw new Error('Failed to save contact form');
      }

      // Send email notification
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (emailResponse.ok) {
        onAlertShow('Form submitted successfully!', 'success');
        setFormData({
          name: '',
          organization: '',
          email: '',
          website: '',
          message: ''
        });
        setSelectedServices([]);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      onAlertShow('Failed to submit form. Please try again.', 'error');
    }
  };

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} 
      p-4 sm:p-6 md:p-8
    `}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Let's Connect</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className={`
              w-full bg-transparent border-b 
              ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-black placeholder-gray-400'} 
              py-2 text-sm focus:outline-none
            `}
            required
          />

          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="Organization Name"
            className={`
              w-full bg-transparent border-b 
              ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-black placeholder-gray-400'} 
              py-2 text-sm focus:outline-none
            `}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className={`
              w-full bg-transparent border-b 
              ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-black placeholder-gray-400'} 
              py-2 text-sm focus:outline-none
            `}
            required
          />

          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Website (optional)"
            className={`
              w-full bg-transparent border-b 
              ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-black placeholder-gray-400'} 
              py-2 text-sm focus:outline-none
            `}
          />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <p className="text-sm">Services</p>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <label key={service} className="relative">
                <input
                  type="checkbox"
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                />
                <span 
                  className={`
                    block px-2 sm:px-3 py-1 sm:py-1.5 
                    text-xs rounded-full cursor-pointer 
                    border transition-colors
                    ${selectedServices.includes(service)
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : `${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`
                    }
                  `}
                >
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
          placeholder="Your Message"
          className={`
            w-full bg-transparent border-b 
            ${theme === 'dark' ? 'border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-black placeholder-gray-400'} 
            py-2 text-sm focus:outline-none
          `}
          rows={3}
          required
        />

        <button
          type="submit"
          className={`
            w-full sm:w-auto
            px-6 sm:px-8 py-2 sm:py-2.5 
            rounded-full text-sm font-medium 
            transition-colors
            ${theme === 'dark' 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-black text-white hover:bg-gray-800'
            }
          `}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm; 