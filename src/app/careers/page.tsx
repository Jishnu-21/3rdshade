"use client"
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import CareerHero from '../components/Career/CareerHero';
import CareerDifference from '../components/Career/CareerDifference';
import FamilyNotCompany from '../components/Career/FamilyNotCompany';
import WorkCulture from '../components/Career/WorkCulture';
import BenefitsSection from '../components/Career/BenefitsSection';
import LifeAtShade from '../components/Career/LifeAtShade';
import CurrentOpenings from '../components/Career/CurrentOpenings';
import FooterLabel from '../components/Career/FooterLabel';
import Layout from '../components/Homepage/Layout';
import Header from '../components/header';

const CareerPage = () => {
  const { theme } = useTheme();

  return (
    <div className="career-page min-h-screen flex flex-col">
      <Header />
      <Layout>
        <div className='w-full scroll-smooth flex-grow'>
          <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300 flex flex-col`}>
            <CareerHero />
            <CareerDifference />
            <FamilyNotCompany />
            <BenefitsSection />
            <CurrentOpenings />
          </div>
          <div className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-1000`}>
            <FooterLabel />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CareerPage;