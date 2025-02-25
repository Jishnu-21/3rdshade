"use client"
import Head from 'next/head'; // Import Head from next/head
import React, { useEffect } from 'react'
import { useTheme } from '@/app/context/ThemeContext'
import ServicesHeader from './components/ServicesHeader'
import FullWidthImage from '@/app/components/shared/FullWidthImage'
import ServicesList from './components/ServicesList'
import DesignProcess from './components/DesignProcess'
import IndustryProblems from './components/IndustryProblems'
import TopClients from './components/TopClients'
import Header from '../components/header'
import FooterLabel from '../components/Career/FooterLabel'
import OurServices from './components/OurServices'
import Cards from '../components/Services/components/Cards'
import Layout from '../components/Homepage/Layout'

const ServicesPage = () => {
  const { theme } = useTheme()
  
  useEffect(() => {
    // Ensure components are mounted properly and layouts are calculated
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Unnati - Comprehensive Services Overview</title>
      </Head>
      <div className={`services-page w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
        <Header />
        <Layout>
          <main className="min-h-screen mt-10">
            <ServicesList />
            <OurServices />
            <DesignProcess />
            <IndustryProblems />
            <TopClients />
            <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
              <FooterLabel />
            </div>
          </main>
        </Layout>
      </div>
    </>
  )
}

export default ServicesPage