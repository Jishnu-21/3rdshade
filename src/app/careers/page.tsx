import React from 'react';
import CareerHero from '../components/Career/CareerHero';
import CareerDifference from '../components/Career/CareerDifference';
import FamilyNotCompany from '../components/Career/FamilyNotCompany';
import WorkCulture from '../components/Career/WorkCulture';
import BenefitsSection from '../components/Career/BenefitsSection';
import LifeAtShade from '../components/Career/LifeAtShade';
import CurrentOpenings from '../components/Career/CurrentOpenings';
import FooterLabel from '../components/Career/FooterLabel';
import Layout from '../components/Layout';
import Header from '../components/header';

const CareerPage = () => {
  return (
    <div className="career-page bg-black"> {/* Added bg-black class */}
      <Header />
      <Layout>
        <CareerHero />
        <CareerDifference />
        <FamilyNotCompany />
        <WorkCulture />
        <BenefitsSection />
        <LifeAtShade />
        <CurrentOpenings />
        <FooterLabel/>
      </Layout>
    </div>
  );
};

export default CareerPage;
