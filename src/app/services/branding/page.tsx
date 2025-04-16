"use client"

import React from 'react';
import ServicesHeader from './components/ServicesHeader';
import FullWidthImage from '@/app/components/shared/FullWidthImage';
import DesignProcess from './components/DesignProcess';
import Header from '../../components/header';
import FooterLabel from '../../components/Career/FooterLabel';
import { useTheme } from '@/app/context/ThemeContext';
import Layout from '../../components/Homepage/Layout';
import BrandingGrid from './components/BrandingGrid';
import BrandInfo from './components/BrandInfo';
import BenefitsSection from './components/BenefitsSection';

const BrandingPage = () => {
  const { theme } = useTheme(); 
  return (
    <div className={`services-page w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <Header />
      <Layout>
      <main className="min-h-screen">
        <ServicesHeader />
        <FullWidthImage src="/services/9.jpg" alt="Design tools and book on yellow background" />
        <BrandingGrid />
        <DesignProcess />
        <BenefitsSection/>
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
          <FooterLabel />
        </div>
      </main>
      </Layout>
    </div>
  );
};

export default BrandingPage;