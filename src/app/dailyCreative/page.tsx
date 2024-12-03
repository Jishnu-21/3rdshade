"use client"
import React from 'react'
import LatestWork from './components/LatestWork'
import Layout from '../components/Homepage/Layout'
import FooterLabel from '../components/Career/FooterLabel'
import Header from '../components/header'
import { useTheme } from '@/app/context/ThemeContext';


const page = () => {
  const { theme } = useTheme();
  return (
    <div>
      <Header />
      <Layout>
        <LatestWork />
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-1000 ease-in-out`}>
        <FooterLabel />
        </div>
      </Layout>
    </div>
  )
}

export default page