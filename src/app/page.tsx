"use client"

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
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
import { useTheme } from '@/app/context/ThemeContext';

const Page = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

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
      <div className='w-full scroll-smooth'>
      <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <Banner scrollProgress={scrollProgress} />
          <Videoplayback 
            onScroll={(progress) => setScrollProgress(progress)}
          />
          <div className="scroll-mt-24">
            <ScrollingTimeline />
          </div>
          <ServiceLine />
          <Brands />
          <WhatWeDo />
          <ClientsMarquee />
          <div className="relative">
            <Testimonials />
            <FAQ />
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-1000`}>
        <MoreInfoWithTime />
        </div>
      </div>
    </Layout>
    </>
  );
};

export default Page;
