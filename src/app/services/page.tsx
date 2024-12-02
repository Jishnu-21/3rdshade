"use client"

import React from 'react';
import ServicesHeader from './components/ServicesHeader';
import FullWidthImage from './components/FullWidthImage';
import ServicesList from './components/ServicesList';
import DesignProcess from './components/DesignProcess';
import IndustryProblems from './components/IndustryProblems';
import TopClients from './components/TopClients';
import ProductPromoBanner from './components/ProductPromoBanner';
import Header from '../components/header';
import Layout from '../components/Homepage/Layout';
import FooterLabel from '../components/Career/FooterLabel';
import OurServices from './components/OurServices';
import { useTheme } from '@/app/context/ThemeContext';

const ServicesPage = () => {
  const { theme } = useTheme(); 
  return (
    <div className="services-page bg-black w-full">
       <Header />
      <Layout>
      <ServicesHeader />
      <FullWidthImage />
      <ServicesList />
      <OurServices />
      <DesignProcess />
      <IndustryProblems />
      <TopClients />
      <ProductPromoBanner />
      <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-1000 ease-in-out`}>
        <FooterLabel />
      </div>  
      </Layout>
    </div>
  );
};

export default ServicesPage;