import React from 'react'
import Header from './components/header'
import Banner from './components/Homepage/Banner';
import Videoplayback from './components/Homepage/Videoplayback';
import ScrollingTimeline from './components/Homepage/ScrollingTimeline';
import ServiceLine from './components/Homepage/Services';
import Brands from './components/Homepage/Brands';
import WhatWeDo from './components/Homepage/WhatWeDo';
import ClientsMarquee from './components/Homepage/Clients';
import Testimonials from './components/Homepage/Testimonials';
import FAQ from './components/Homepage/FAQ';
import MoreInfoWithTime from './components/Homepage/MoreInfoWithTime';
import Layout from './components/Homepage/Layout';

const Page = () => {
  return (
      <Layout>
        <div className='bg-white w-full'>
          <Header/>
          <Banner/>
          <Videoplayback/>
          <div className='w-full h-screen'>
            <ScrollingTimeline/>
          </div>
          <ServiceLine/>
          <Brands/>
          <WhatWeDo/>
          <ClientsMarquee/>
          <div className="bg-black relative">
            <Testimonials />
            <FAQ />
          </div>
          <MoreInfoWithTime/>
        </div>
      </Layout>
  );
};

export default Page;
