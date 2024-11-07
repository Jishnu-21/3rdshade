import React from 'react'
import BlogImage from './components/BlogImage'
import BlogIntro from './components/BlogIntro'
import RecentStories from './components/RecentStories'
import LightHeader from '../components/LightHeader'
import FooterLabel from '../components/Career/FooterLabel'
import Layout from '../components/Layout'

const page = () => {
  return (
    <div className='bg-black'>
      <Layout>
      <LightHeader/>
        <BlogImage />
        <BlogIntro />
        <RecentStories />
        <FooterLabel/>
      </Layout>
    </div>
  )
}

export default page