import React from 'react'
import LatestWork from './components/LatestWork'
import LightHeader from '../components/LightHeader'
import Layout from '../components/Layout'
import FooterLabel from '../components/Career/FooterLabel'

const page = () => {
  return (
    <div>
      <LightHeader />
      <Layout>
        <LatestWork />
        <FooterLabel />
      </Layout>
    </div>
  )
}

export default page