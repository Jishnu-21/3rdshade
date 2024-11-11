'use client';

import dynamic from 'next/dynamic';

// Static components that don't use window
import Header from './components/header';
import Layout from './components/Homepage/Layout';

// Dynamic imports for components that might use window
const Banner = dynamic(() => import('./components/Homepage/Banner'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Videoplayback = dynamic(() => import('./components/Homepage/Videoplayback'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const ScrollingTimeline = dynamic(() => import('./components/Homepage/ScrollingTimeline'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const ServiceLine = dynamic(() => import('./components/Homepage/Services'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Brands = dynamic(() => import('./components/Homepage/Brands'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const WhatWeDo = dynamic(() => import('./components/Homepage/WhatWeDo'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const ClientsMarquee = dynamic(() => import('./components/Homepage/Clients'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Testimonials = dynamic(() => import('./components/Homepage/Testimonials'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const FAQ = dynamic(() => import('./components/Homepage/FAQ'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const MoreInfoWithTime = dynamic(() => import('./components/Homepage/MoreInfoWithTime'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page() {
  return (
    <Layout>
      <div className='bg-white w-full'>
        <Header/>
        <Banner/>
        <Videoplayback/>
        <ScrollingTimeline/>
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
}
