import React from 'react';
import ContactInfo from './ContactInfo';
import TimeDisplay from '../Homepage/TimeDisplay';
import { useTheme } from '@/app/context/ThemeContext';

const FooterLabel = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} pt-20 px-14 pb-42 rounded-b-[40px]`}>
      <div className="max-w-5xl mx-auto">
        <ContactInfo />
      </div>
    </div>
  );
};

export default FooterLabel;