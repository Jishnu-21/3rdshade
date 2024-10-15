"use client"

import React, { useState } from 'react'
import Header from '../components/header'
import SupportForm from '../components/Contact-us/SupportForm'
import Layout from '../components/Homepage/Layout'
import FooterLabel from '../components/Contact-us/FooterLabel'
import CustomAlert from '../components/Alert'

const ContactUsPage = () => {
  const [alertInfo, setAlertInfo] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlertInfo({ message, type, isVisible: true });
  };

  const closeAlert = () => {
    setAlertInfo(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <Layout>
        <Header/>
        <SupportForm onAlertShow={showAlert} />
        <FooterLabel/>
      </Layout>
      <CustomAlert
        message={alertInfo.message}
        type={alertInfo.type}
        isVisible={alertInfo.isVisible}
        onClose={closeAlert}
      />
    </>
  )
}

export default ContactUsPage