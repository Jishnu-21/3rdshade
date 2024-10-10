import React from 'react'
import Header from './components/header'
import Banner from './components/Homepage/Banner';
import Videoplayback from './components/Homepage/Videoplayback';
import ScrollingTimeline from './components/Homepage/ScrollingTimeline';
import ServiceLine from './components/Homepage/Services';
import Brands from './components/Homepage/Brands';
import WhatWeDo from './components/Homepage/WhatWeDo';

const page = () => {
  return (
    <>
    <Header/>
    <Banner/>
    <Videoplayback/>
    <ScrollingTimeline/>
    <ServiceLine/>
    <Brands/>
    <WhatWeDo/>
    </>
  )
}

export default page