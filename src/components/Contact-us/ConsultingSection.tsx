'use client'

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { useRouter } from 'next/navigation';

const ConsultingSection = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className={`w-full py-16 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-1000 ease-in-out`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Get a Free Consulting Session
        </h2>
        <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Take your business to the next level with our expert consultation. Register now to schedule your free session.
        </p>
        <button
          onClick={handleRegister}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transform transition-all duration-300 hover:scale-105
            ${theme === 'dark' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default ConsultingSection;
