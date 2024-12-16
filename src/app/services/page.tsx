"use client"

import React from 'react';
import ServicesHeader from './components/ServicesHeader';
import FullWidthImage from './components/FullWidthImage';
import ServicesList from './components/ServicesList';
import DesignProcess from './components/DesignProcess';
import IndustryProblems from './components/IndustryProblems';
import TopClients from './components/TopClients';
import Header from '../components/header';
import FooterLabel from '../components/Career/FooterLabel';
import OurServices from './components/OurServices';
import { useTheme } from '@/app/context/ThemeContext';
import Layout from '../components/Homepage/Layout';

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
        <OurServices />
        <DesignProcess />
        <IndustryProblems />
        <TopClients />
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
          <FooterLabel />
        </div>
      </main>
      </Layout>
    </div>
  );
};

export default ServicesPage;