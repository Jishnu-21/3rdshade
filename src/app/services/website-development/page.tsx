"use client"

import React from 'react'
import WebDevelopmentServices from './components/WebDevelopmentServices'
import ValueProposition from './components/ValueProposition'
import TechStack from './components/TechStack'
import FAQSection from './components/FAQSection'
import Layout from '../../components/Homepage/Layout'
import FooterLabel from '../../components/Career/FooterLabel'
import Header from '../../components/header'
import { useTheme } from '@/app/context/ThemeContext'

const Page = () => {
  const { theme } = useTheme();

  return (
    <div className={`service-detail-page ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'} transition-colors duration-300 ease-in-out`}>
      <Header />
      <Layout>
        <WebDevelopmentServices />
        <ValueProposition />
        <TechStack />
        <FAQSection />
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-300 ease-in-out`}>
          <FooterLabel />
        </div>
      </Layout>
    </div>
  )
}

export default Page