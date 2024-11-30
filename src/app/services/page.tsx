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

const ServicesPage = () => {
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
      <FooterLabel />
      </Layout>
    </div>
  );
};

export default ServicesPage;