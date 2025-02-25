"use client"

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@/app/context/ThemeContext';
// Preload critical components
const Header = dynamic(() => import('./components/header'), { 
  ssr: false,
  loading: () => <div className="h-20" />
});

const Layout = dynamic(() => import('./components/Homepage/Layout'), { 
  ssr: false,
  loading: () => null
});

// Other dynamic imports with loading states
const Banner = dynamic(() => import('./components/Homepage/Banner'), { 
  ssr: false,
  loading: () => <div className="min-h-screen" />
});
const Videoplayback = dynamic(() => import('./components/Homepage/Videoplayback'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading video component...</div>
    </div>
  )
});
const ScrollingTimeline = dynamic(() => import('./components/Homepage/ScrollingTimeline'), { 
  ssr: false,
  loading: () => <div className="min-h-[400px]" />
});
const ServiceLine = dynamic(() => import('./components/Homepage/Services'), { ssr: false });
const BusinessStatus = dynamic(() => import('./components/Homepage/BusinessStatus'), { ssr: false });
const Brands = dynamic(() => import('./components/Homepage/Brands'), { ssr: false });
const WhatWeDo = dynamic(() => import('./components/Homepage/WhatWeDo'), { ssr: false });
const ClientsMarquee = dynamic(() => import('./components/Homepage/Clients'), { ssr: false });
const Testimonials = dynamic(() => import('./components/Homepage/Testimonials'), { ssr: false });
const FAQ = dynamic(() => import('./components/Homepage/FAQ'), { ssr: false });
const MoreInfoWithTime = dynamic(() => import('./components/Homepage/MoreInfoWithTime'), { ssr: false });

const LoadingSpinner = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className={`fixed inset-0 flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
    <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 
      ${theme === 'dark' ? 'border-white' : 'border-black'}`} 
    />
  </div>
);

const Page = () => {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <Header key="header" />
      <Layout>
        <div className='w-full scroll-smooth'>
          <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
            <Banner scrollProgress={scrollProgress} />
            <Videoplayback 
              onScroll={(progress) => setScrollProgress(progress)}
            />
            <div className="mt-24">
              <ScrollingTimeline />
            </div>
            <ServiceLine />
            <Brands />
            <WhatWeDo />
            <BusinessStatus />
            <ClientsMarquee />
            <div className="relative">
              <Testimonials />
              <div className="mt-16">
                <FAQ />
              </div>
            </div>
          </div>
          <div className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
            <MoreInfoWithTime />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;