import React from 'react';
import ServicesHeader from './components/ServicesHeader';
import FullWidthImage from './components/FullWidthImage';
import ServicesList from './components/ServicesList';
import DesignProcess from './components/DesignProcess';
import IndustryProblems from './components/IndustryProblems';
import TopClients from './components/TopClients';
import ProductPromoBanner from './components/ProductPromoBanner';
import Header from '../components/LightHeader';
import Layout from '../components/Layout';
import FooterLabel from '../components/Career/FooterLabel';
const ServicesPage = () => {
  return (
    <div className="services-page bg-white w-full">
       <Header />
      <Layout>
      <ServicesHeader />
      <FullWidthImage />
      <ServicesList />
      <DesignProcess />
      <IndustryProblems />
      <TopClients />
      <ProductPromoBanner />
      <FooterLabel />
      </Layout>
      {/* Other sections of the services page would follow */}
    </div>
  );
};

export default ServicesPage;