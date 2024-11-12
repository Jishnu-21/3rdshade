'use client';

import React from 'react'
import Header from '@/app/components/Services/Unnati/Header'
import Banner from '@/app/components/Services/Unnati/Banner'
import HowWeWork from '@/app/components/Services/Unnati/HowWeWork'
import HowWeWork2 from '@/app/components/Services/Unnati/HowWeWork2'
import ProcessSteps from '@/app/components/Services/Unnati/ProcessSteps'
import CompanyMarquee from '@/app/components/Services/Unnati/CompanyMarquee'
import CTASection from '@/app/components/Services/Unnati/CTASection'

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
      <CTASection />
      </div>
    </>
  )
}

export default Page