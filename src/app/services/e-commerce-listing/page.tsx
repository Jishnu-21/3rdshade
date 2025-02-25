"use client"

import React from 'react';
import ServicesHeader from './components/ServicesHeader';
import FullWidthImage from './components/FullWidthImage';
import DesignProcess from './components/DesignProcess';
import Header from '../../components/header';
import FooterLabel from '../../components/Career/FooterLabel';
import { useTheme } from '@/app/context/ThemeContext';
import Layout from '../../components/Homepage/Layout';
import BrandingGrid from './components/BrandingGrid';
import BenefitsSection from './components/BenefitsSection';
import PlatformsWeWorkOn from './components/PlatformsWeWorkOn';

const SocialMediaPage = () => {
  const { theme } = useTheme(); 
  return (
    <div className={`services-page w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <Header />
      <Layout>
      <main className="min-h-screen">
        <ServicesHeader />
        <FullWidthImage />
        <DesignProcess />
        <BrandingGrid/>
        <BenefitsSection/>
        <PlatformsWeWorkOn/>
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
          <FooterLabel />
        </div>
      </main>
      </Layout>
    </div>
  );
};

export default SocialMediaPage;