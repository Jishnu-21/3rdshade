"use client"

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import all components that might use window/document
const Header = dynamic(() => import('./components/header'), { ssr: false });
const Banner = dynamic(() => import('./components/Homepage/Banner'), { ssr: false });
const Videoplayback = dynamic(() => import('./components/Homepage/Videoplayback'), { ssr: false });
const ScrollingTimeline = dynamic(() => import('./components/Homepage/ScrollingTimeline'), { ssr: false });
const ServiceLine = dynamic(() => import('./components/Homepage/Services'), { ssr: false });
const Brands = dynamic(() => import('./components/Homepage/Brands'), { ssr: false });
const WhatWeDo = dynamic(() => import('./components/Homepage/WhatWeDo'), { ssr: false });
const ClientsMarquee = dynamic(() => import('./components/Homepage/Clients'), { ssr: false });
const Testimonials = dynamic(() => import('./components/Homepage/Testimonials'), { ssr: false });
const FAQ = dynamic(() => import('./components/Homepage/FAQ'), { ssr: false });
const MoreInfoWithTime = dynamic(() => import('./components/Homepage/MoreInfoWithTime'), { ssr: false });
const Layout = dynamic(() => import('./components/Homepage/Layout'), { ssr: false });

const Page = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <>
    <Header />
    <Layout>
      <div className='bg-white w-full'>
        <Banner />
        <Videoplayback />
        <ScrollingTimeline />
        <ServiceLine />
        <Brands />
        <WhatWeDo />
        <ClientsMarquee />
        <div className="bg-black relative">
          <Testimonials />
          <FAQ />
        </div>
        <MoreInfoWithTime />
      </div>
    </Layout>
    </>
  );
};

export default Page;
