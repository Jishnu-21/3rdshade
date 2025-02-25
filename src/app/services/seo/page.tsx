"use client"

import React from 'react';
import ServicesHeader from './components/ServicesHeader';
import FullWidthImage from './components/FullWidthImage';
import ServicesList from './components/ServicesList';
import Header from '../../components/header';
import FooterLabel from '../../components/Career/FooterLabel';
import { useTheme } from '@/app/context/ThemeContext';
import Layout from '../../components/Homepage/Layout';
import SEOServicesList from './components/SEOServiceList';
import DesignProcess from './components/DesignProcess';
import BrandingServices from './components/BrandingServices';

const ServicesPage = () => {
  const { theme } = useTheme(); 
  return (
    <div className={`services-page w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <Header />
      <Layout>
      <main className="min-h-screen">
        <ServicesHeader />
        <FullWidthImage />
        <ServicesList />
        <DesignProcess /> 
        <BrandingServices />
        <SEOServicesList />
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
          <FooterLabel />
        </div>
      </main>
      </Layout>
    </div>
  );
};

export default ServicesPage;