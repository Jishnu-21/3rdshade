"use client"
import { useTheme } from '@/app/context/ThemeContext';
import React, { useState } from 'react'
import Header from '../components/header'
import SupportForm from '../components/Contact-us/SupportForm'
import dynamic from 'next/dynamic'
import FooterLabel from '../components/Contact-us/FooterLabel'
import CustomAlert from '../components/Alert'
import ConsultingSection from '../components/Contact-us/ConsultingSection'
import MoreInfo from '../components/Contact-us/MoreInfo';
const Layout = dynamic(() => import('../components/Homepage/Layout'), { ssr: false });

const ContactUsPage = () => {
  const { theme } = useTheme();
  const [alertInfo, setAlertInfo] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlertInfo({ message, type, isVisible: true });
  };

  const closeAlert = () => {
    setAlertInfo(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Layout>
        <div className={`relative ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-colors duration-1000 ease-in-out flex-grow`}>
          <SupportForm onAlertShow={showAlert} />
          <ConsultingSection />
          <FooterLabel/>
        </div>
      </Layout>
      <CustomAlert
        message={alertInfo.message}
        type={alertInfo.type}
        isVisible={alertInfo.isVisible}
        onClose={closeAlert}
      />
    </div>
  )
}

export default ContactUsPage