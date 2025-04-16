"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { jobData } from './jobData';
import { Dialog } from '@headlessui/react';
import { X, MapPin, Clock, DollarSign, Mail, Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface JobListingProps {
  title: string;
}

const JobListing: React.FC<JobListingProps> = ({ title }) => {
  const { theme } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  // Validate job data exists
  if (!jobData[title]) {
    console.error(`Job data not found for title: ${title}`);
    return null;
  }
  
  const job = jobData[title];

  const handleModalToggle = (isOpen: boolean) => {
    setHeaderVisible(!isOpen);
    setShowDetails(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const handleApplicationToggle = (isOpen: boolean) => {
    setShowApplication(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      formData.append('position', job.title);

      const response = await fetch('/api/career/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Application submitted successfully!');
        setShowApplication(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          coverLetter: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit application');
      }
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      console.error('Application submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`job-listing flex items-center justify-between py-6 px-6 rounded-lg
          ${theme === 'dark' 
            ? 'bg-gray-900 hover:bg-gray-800' 
            : 'bg-gray-100 hover:bg-gray-200'} 
          transition-all duration-200`}
      >
        <h3 className={`text-xl font-bold
          ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          {job.title}
        </h3>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleModalToggle(true)}
            className={`${theme === 'dark' 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-black'} 
            transition-colors duration-200`}
          >
            View details ▼
          </button>
          
          <button 
            onClick={() => handleApplicationToggle(true)}
            className={`px-6 py-3 rounded-full transition-colors duration-200
            ${theme === 'dark' 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-black text-white hover:bg-gray-800'}`}
          >
            Apply Now
          </button>
        </div>
      </motion.div>

      {/* Job Details Modal */}
      <Dialog
        open={showDetails}
        onClose={() => handleModalToggle(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className={`w-full max-w-3xl transform overflow-hidden rounded-2xl shadow-xl transition-all
            ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
          >
            <div className="max-h-[85vh] overflow-y-auto p-8">
              <Dialog.Title className="text-3xl font-bold mb-2 sticky top-0 bg-inherit pt-2 pb-4 backdrop-blur-sm z-10">{job.title}</Dialog.Title>
              
              {/* Job Meta Information */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm sticky top-16 bg-inherit pb-4 backdrop-blur-sm z-10">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                {job.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.duration}</span>
                  </div>
                )}
                {job.experience && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.experience}</span>
                  </div>
                )}
                {job.salary && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${job.email}`} className="underline hover:text-blue-500">{job.email}</a>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{job.website}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                {/* About Us */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">About Us</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {job.aboutUs}
                  </p>
                </div>

                {/* Role Overview */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">Role Overview</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {job.roleOverview}
                  </p>
                </div>
                
                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">Responsibilities</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bonus Skills */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">Bonus Skills</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {job.bonusSkills.map((skill, index) => (
                      <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perks if available */}
                {job.perks && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">Perks</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {job.perks.map((perk, index) => (
                        <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex justify-end sticky bottom-0 bg-inherit pt-4 backdrop-blur-sm">
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      setShowApplication(true);
                    }}
                    className={`px-6 py-3 rounded-full transition-colors duration-200
                      ${theme === 'dark' 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleModalToggle(false)}
              className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Application Form Modal */}
      <Dialog
        open={showApplication}
        onClose={() => !isSubmitting && handleApplicationToggle(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className={`w-full max-w-xl transform overflow-hidden rounded-2xl shadow-xl transition-all
            ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
          >
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-inherit z-10 p-6 pb-4 backdrop-blur-sm">
                <Dialog.Title className="text-xl md:text-2xl font-bold">Apply for {job.title}</Dialog.Title>
                
                <button
                  onClick={() => !isSubmitting && handleApplicationToggle(false)}
                  disabled={isSubmitting}
                  className={`absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            
              <form className="px-6 pb-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Resume</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && handleApplicationToggle(false)}
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      theme === 'dark' 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-black text-white hover:bg-gray-800'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default JobListing;