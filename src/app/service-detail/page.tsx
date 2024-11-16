"use client"

import React from 'react'
import WebDevelopmentServices from './components/WebDevelopmentServices'
import ValueProposition from './components/ValueProposition'
import TechStack from './components/TechStack'
import FAQSection from './components/FAQSection'
import Layout from '../components/Homepage/Layout'
import FooterLabel from '../components/Career/FooterLabel'
import Header from '../components/header'
import { useTheme } from '@/app/context/ThemeContext'

const Page = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <Header />
      <Layout>
        <WebDevelopmentServices />
        <ValueProposition />
        <TechStack />
        <FAQSection />
        <FooterLabel />
      </Layout>
    </div>
  )
}

export default Page