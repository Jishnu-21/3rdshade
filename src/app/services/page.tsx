"use client";

import Head from "next/head"; 
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import ServicesList from "./components/ServicesList";
import DesignProcess from "./components/DesignProcess";
import IndustryProblems from "./components/IndustryProblems";
import TopClients from "./components/TopClients";
import Header from "../components/header";
import FooterLabel from "../components/Career/FooterLabel";
import OurServices from "./components/OurServices";
import Layout from "../components/Homepage/Layout";
import { useScroll } from 'framer-motion'
import { AppleCardsCarouselDemo } from "./components/AppleCardCarousel";
import Footer from "../components/Homepage/Footer";

const ServicesPage = () => {
  const { theme } = useTheme();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  useEffect( () => {
    async function initLenis() {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          if (lenis) {
            lenis.destroy();
          }
        }
      } catch (error) {
        console.error('Error initializing Lenis:', error);
      }
    }

    initLenis();
  }, [])

  const cardsData = [
    {
      title: "Digital Transformation",
      description: "We help businesses evolve in the digital age with comprehensive transformation strategies and implementation.",
      src: "digital-transform.jpg",
      url: "#",
      color: "#f0f0f0",
    },
    {
      title: "Cloud Solutions",
      description: "Leverage the power of cloud computing with our expert cloud migration and management services.",
      src: "cloud-solutions.jpg",
      url: "#",
      color: "#e0e0e0",
    },
    {
      title: "AI & Machine Learning",
      description: "Implement cutting-edge AI solutions to automate processes and gain valuable insights from your data.",
      src: "ai-ml.jpg",
      url: "#",
      color: "#d0d0d0",
    }
  ];

  useEffect(() => {
    // Ensure components are mounted properly and layouts are calculated
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`services-page w-full ${theme === "dark" ? "bg-white" : "bg-black"} transition-colors duration-300`}>
        <Header />
        <Layout>
          <ServicesList />
          <OurServices />    
           <DesignProcess />
           <AppleCardsCarouselDemo/>
          <IndustryProblems />
          <TopClients />
          <div className={`relative ${theme === "dark" ? "bg-white" : "bg-black"} transition-colors duration-300`}></div>
        <FooterLabel />
        </Layout>
      </div>
    </>
  );
};

export default ServicesPage;