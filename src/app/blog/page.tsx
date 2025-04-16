"use client"

import React from 'react'
import BlogImage from './components/BlogImage'
import BlogIntro from './components/BlogIntro'
import RecentStories from './components/RecentStories'
import FooterLabel from '../components/Career/FooterLabel'
import Layout from '../components/Homepage/Layout'
import Header from '../components/header'
import { useTheme } from '@/app/context/ThemeContext';

const page = () => {
  const { theme } = useTheme();
  return (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <Layout>
        <div className='w-full scroll-smooth flex-grow mt-[80px]'>
          <BlogImage />
          <BlogIntro />
          <RecentStories />
          <div className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-1000`}>
            <FooterLabel/>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default page