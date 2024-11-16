import React from 'react'
import BlogImage from './components/BlogImage'
import BlogIntro from './components/BlogIntro'
import RecentStories from './components/RecentStories'
import FooterLabel from '../components/Career/FooterLabel'
import Layout from '../components/Homepage/Layout'
import Header from '../components/header'

const page = () => {
  return (
    <div className='bg-black'>
      <Layout>
      <Header/>
        <BlogImage />
        <BlogIntro />
        <RecentStories />
        <FooterLabel/>
      </Layout>
    </div>
  )
}

export default page