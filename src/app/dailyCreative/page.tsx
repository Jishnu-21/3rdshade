import React from 'react'
import LatestWork from './components/LatestWork'
import Layout from '../components/Homepage/Layout'
import FooterLabel from '../components/Career/FooterLabel'
import Header from '../components/header'

const page = () => {
  return (
    <div>
      <Header />
      <Layout>
        <LatestWork />
        <FooterLabel />
      </Layout>
    </div>
  )
}

export default page