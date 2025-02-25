'use client';

import React from 'react'
import Header from '@/app/components/Services/Shuruwat/Header'
import Banner from '@/app/components/Services/Shuruwat/Banner'
import HowWeWork from '@/app/components/Services/Shuruwat/HowWeWork'
import HowWeWork2 from '@/app/components/Services/Shuruwat/HowWeWork2'
import ProcessSteps from '@/app/components/Services/Shuruwat/ProcessSteps'
import CompanyMarquee from '@/app/components/Services/Shuruwat/CompanyMarquee'
import CTASection from '@/app/components/Services/Shuruwat/CTASection'
import VideoCtaSection from '@/app/components/Services/Shuruwat/VideoCtaSection';

const Page = () => {
  return (
    <>
    <div className='bg-black'>
      <Header />
      <Banner />
      <HowWeWork />
      <ProcessSteps />
      <CompanyMarquee />
      <HowWeWork2 />
      <VideoCtaSection/>
      <CTASection />
      </div>
    </>
  )
}

export default Page