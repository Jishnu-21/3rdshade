"use client"

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@/app/context/ThemeContext';
import { usePathname } from 'next/navigation';

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
  loading: () => <div className="min-h-[50vh]" />
});
const ScrollingTimeline = dynamic(() => import('./components/Homepage/ScrollingTimeline'), { 
  ssr: false,
  loading: () => <div className="min-h-[400px]" />
});
const ServiceLine = dynamic(() => import('./components/Homepage/Services'), { ssr: false });
const Brands = dynamic(() => import('./components/Homepage/Brands'), { ssr: false });
const WhatWeDo = dynamic(() => import('./components/Homepage/WhatWeDo'), { ssr: false });
const ClientsMarquee = dynamic(() => import('./components/Homepage/Clients'), { ssr: false });
const Testimonials = dynamic(() => import('./components/Homepage/Testimonials'), { ssr: false });
const FAQ = dynamic(() => import('./components/Homepage/FAQ'), { ssr: false });
const MoreInfoWithTime = dynamic(() => import('./components/Homepage/MoreInfoWithTime'), { ssr: false });

const LoadingSpinner = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className={`fixed inset-0 flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
    <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 
      ${theme === 'dark' ? 'border-white' : 'border-black'}`} 
    />
  </div>
);

const Page = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Reset mount state on pathname change
    setIsMounted(false);
    
    // Set mounted after a short delay
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isMounted) {
    return <LoadingSpinner theme={theme} />;
  }

  return (
    <div className={`transition-colors duration-300`}>
      <Header key="header" />
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
            <div className="mt-10" />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;
