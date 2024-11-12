import React from 'react'
import WebDevelopmentServices from './components/WebDevelopmentServices'
import ValueProposition from './components/ValueProposition'
import TechStack from './components/TechStack'
import FAQSection from './components/FAQSection'
import LightHeader from '../components/LightHeader'
import Layout from '../components/Layout'
import FooterLabel from '../components/Career/FooterLabel'

const page = () => {
  return (
    <div>
      <LightHeader />
      <Layout>
        <div className="relative">
          <div className="absolute inset-0 bg-white" style={{ height: '200vh' }}></div>
          <div className="relative">
            <WebDevelopmentServices />
            <ValueProposition />
            <TechStack />
            <FAQSection />
          </div>
        </div>
        <FooterLabel />
      </Layout>
    </div>
  )
}

export default page