"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/app/context/ThemeContext';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';

type BusinessStatusType = 'not-started' | 'early-stage';

const businesses = {
  'not-started': {
    title: 'Shuruwat',
    logo: '/shuruwat-logo.png',
    question: 'Are you just starting your business or looking to scale it to the next level?',
    description: 'Begin your entrepreneurial journey with Shuruwat - your first step towards business success.',
    color: 'purple'
  },
  'early-stage': {
    title: 'Unnati',
    logo: '/unnati-logo.png',
    question: 'Are you struggling to increase sales and profitability while scaling your business?',
    description: 'Accelerate your growth with Unnati - transform your startup into a thriving business.',
    color: 'pink'
  }
} as const;

const BusinessStatus = () => {
  const { theme } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<BusinessStatusType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    issue: '',
    description: ''
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const questionVariants = {
    hidden: { 
      opacity: 0,
      y: -30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4 // Delay cards until after questions appear
      }
    }
  };

  const handleStatusSelect = (status: BusinessStatusType) => {
    setSelectedStatus(status);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { status: selectedStatus, ...formData });
    setFormData({
      name: '',
      contact: '',
      issue: '',
      description: ''
    });
    setShowForm(false);
    setSelectedStatus(null);
  };

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const inputClassName = `w-full px-4 py-3 rounded-xl border 
    ${theme === 'dark' 
      ? 'border-gray-600 bg-gray-800 text-white focus:ring-pink-500' 
      : 'border-gray-300 bg-white text-gray-900 focus:ring-purple-500'
    } focus:ring-2 outline-none`;

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto" ref={ref}>
      <motion.div 
        className="text-center space-y-6 mb-16" // Reduced margin bottom
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600`}
        >
          Start Your Journey
        </motion.h2>
        <motion.p 
          className={`text-xl ${textColor} max-w-2xl mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Tell us where you are in your business journey
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" // Reduced gap
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {Object.entries(businesses).map(([key, business]) => (
          <div key={key} className="space-y-4"> {/* Reduced space between elements */}
            <motion.div
              variants={questionVariants}
              className="relative transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              onClick={() => handleStatusSelect(key as BusinessStatusType)}
            >
              <h4 className={`
                text-xl md:text-2xl font-medium px-8 py-6
                ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
                text-center relative z-10 leading-tight
              `}>
                {business.question}
              </h4>
              <div className={`
                absolute inset-0 
                rounded-2xl
                ${theme === 'dark' 
                  ? 'bg-gray-800/50' 
                  : 'bg-white'}
                shadow-lg
                backdrop-blur-sm
                transform transition-transform duration-300
                group-hover:scale-105
              `} />
            </motion.div>

            <motion.button
              variants={cardVariants}
              onClick={() => handleStatusSelect(key as BusinessStatusType)}
              className={`group p-6 rounded-2xl border-2 transition-all duration-500 w-full
                flex flex-col items-center text-center
                hover:shadow-2xl hover:scale-[1.02]
                ${
                  selectedStatus === key
                    ? theme === 'dark'
                      ? `border-${business.color}-500 bg-${business.color}-900/30 text-white`
                      : `border-${business.color}-500 bg-${business.color}-50 text-gray-900`
                    : theme === 'dark'
                      ? `border-gray-700 hover:border-${business.color}-500 text-gray-100`
                      : `border-gray-200 hover:border-${business.color}-300 text-gray-900`
                }`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`
                relative w-32 h-32 mb-4 flex-shrink-0 // Reduced size and margin
                transform transition-transform duration-500
                group-hover:scale-105 group-hover:rotate-2
                rounded-xl overflow-hidden
                flex items-center justify-center
                ${theme === 'dark' ? 'shadow-lg shadow-purple-500/20' : 'shadow-xl'}
              `}>
                <div className="relative w-28 h-28"> {/* Reduced container size */}
                  <Image
                    src={business.logo}
                    alt={business.title}
                    fill
                    className="object-contain transform transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 112px, 112px"
                  />
                </div>
              </div>
              
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className={`text-2xl font-bold mb-2 ${textColor} // Reduced text size and margin
                  transition-colors duration-300
                  group-hover:text-${business.color}-500
                `}>
                  {business.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed"> {/* Reduced text size */}
                  {business.description}
                </p>
              </motion.div>
            </motion.button>
          </div>
        ))}
      </motion.div>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl mx-4">
            <motion.form 
              onSubmit={handleSubmit} 
              className={`w-full space-y-4 sm:space-y-6 p-4 sm:p-8 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]
                ${theme === 'dark' 
                  ? 'bg-gray-900 border border-gray-800' 
                  : 'bg-white border border-gray-100'
                }`}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col items-center justify-center gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={selectedStatus ? businesses[selectedStatus].logo : ''}
                    alt={selectedStatus ? businesses[selectedStatus].title : ''}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className={`text-2xl sm:text-3xl font-bold text-center ${textColor}`}>
                  {selectedStatus ? businesses[selectedStatus].title : ''} Application
                </h2>
              </div>
              <div className="text-center mb-6 sm:mb-8">
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={inputClassName}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>Contact Information</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>What issues are you facing?</label>
                <input
                  type="text"
                  value={formData.issue}
                  onChange={(e) => setFormData({...formData, issue: e.target.value})}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>Describe your situation</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={inputClassName}
                  rows={4}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                <motion.button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedStatus(null);
                  }}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default BusinessStatus;
