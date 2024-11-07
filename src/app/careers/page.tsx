import React from 'react';
import CareerHero from '../components/career/CareerHero';
import CareerDifference from '../components/career/CareerDifference';
import FamilyNotCompany from '../components/career/FamilyNotCompany';
import WorkCulture from '../components/career/WorkCulture';
import BenefitsSection from '../components/career/BenefitsSection';
import LifeAtShade from '../components/career/LifeAtShade';
import CurrentOpenings from '../components/career/CurrentOpenings';
import LightHeader from '../components/LightHeader';
import FooterLabel from '../components/Career/FooterLabel';
import Layout from '../components/Layout';

const CareerPage = () => {
  return (
    <div className="career-page bg-black"> {/* Added bg-black class */}
      <LightHeader />
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
