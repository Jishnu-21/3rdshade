"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Target, Lightbulb, Pen } from "lucide-react";
import dynamic from 'next/dynamic';
import { useTheme } from '@/app/context/ThemeContext';
import FooterLabel from "../components/Career/FooterLabel";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

// Dynamic imports for layout components
const Header = dynamic(() => import('../components/header'), { 
  ssr: false,
  loading: () => <div className="h-20" />
});

const Layout = dynamic(() => import('../components/Homepage/Layout'), { 
  ssr: false,
  loading: () => null
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  const { theme } = useTheme();
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [missionRef, missionInView] = useInView({ triggerOnce: true });
  const [foundersRef, foundersInView] = useInView({ triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true });

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
      <Header key="header" />
      <Layout>
        <div className="w-full scroll-smooth">
          <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
            {/* Hero Section */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`relative h-[60vh] mt-20 flex items-center justify-center ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-white/40 to-white/20' : 'from-black/40 to-black/20'}`} />
                <img
                  src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2000"
                  alt="Abstract business concept"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 text-center">
                <h1 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-black' : 'text-white'}`}>About Us</h1>
                <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
                  Storytellers, Design Ninjas, Marketing Freaks, and Consulting Professionals
                </p>
              </div>
            </motion.div>

            {/* Who We Are Section */}
            <motion.section
              ref={missionRef}
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className={`py-20 px-4 md:px-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16">Who are we?</motion.h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div variants={fadeIn} className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      We are a 360-degree Marketing and Consulting firm helping brands create a profitable identity in the market. Creating, growing, and guiding brands to innovate is what we do best. We guide brands from their vision to market dominance.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      {[
                        { icon: <Users className="w-8 h-8" />, text: "Storytellers" },
                        { icon: <Pen className="w-8 h-8" />, text: "Design Ninjas" },
                        { icon: <Target className="w-8 h-8" />, text: "Marketing Freaks" },
                        { icon: <Lightbulb className="w-8 h-8" />, text: "Consulting Pros" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          variants={fadeIn}
                          className="flex items-center gap-3 bg-card p-4 rounded-lg"
                        >
                          {item.icon}
                          <span className="font-medium">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div variants={fadeIn} className="relative h-[400px]">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800"
                      alt="Our team"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Perspective Section */}
            <motion.section
              ref={valuesRef}
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className={`py-20 px-4 md:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <div className="max-w-6xl mx-auto text-center">
                <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-12">
                  Beyond Black and White: Meet the 3rd Perspective
                </motion.h2>
                <motion.p variants={fadeIn} className="text-lg max-w-3xl mx-auto leading-relaxed">
                  Marketing Meets Perspective isn't just a tagline for us—it's the essence of our approach. In a realm where most see only two options—black or white, positive or negative—we bring a refreshing third perspective that raises brands to new heights.
                </motion.p>
              </div>
            </motion.section>

            {/* Vision Section */}
            <motion.section
              ref={foundersRef}
              initial="hidden"
              animate={foundersInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className={`py-20 px-4 md:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16">
                  Say Hello to the Founders
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-12">
                  {[
                    {
                      name: "Mr. Deepak Sahu",
                      role: "CEO",
                      image: "/founder-1.jpg",
                      description: "He loves storytelling and is always keen to present the emotions of the brand. He believes that the way you present your brand lies in the tiniest details, which create a perspective in the mind of the audience. If not find churning strategies and wonderful campaigns in his mind, you will find him writing poetries and stories.",
                      social: {
                        linkedin: "https://www.linkedin.com/in/deepak-sahu",
                        instagram: "https://www.instagram.com/deepak.sahu",
                      }
                    },
                    {
                      name: "Mr. Ayyaz Shaikh",
                      role: "Managing Director",
                      image: "/founder2.jpg",
                      description: "He is the backbone of the firm and envisions making it the best Internet Company in the world. His foresight to dream bigger, belief in the phrase 'You rise by lifting others', and cheerful personality is what makes him the guardian and strength of the company.",
                      social: {
                        linkedin: "https://www.linkedin.com/in/ayyaz-shaikh",
                        instagram: "https://www.instagram.com/ayyaz.shaikh",
                      }
                    }
                  ].map((founder, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="bg-background rounded-lg overflow-hidden shadow-lg"
                    >
                      <div className="h-[400px] w-full relative">
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                        <p className="text-primary mb-4">{founder.role}</p>
                        <p className="text-muted-foreground mb-6">{founder.description}</p>
                        
                        {/* Social Media Links */}
                        <div className="flex items-center gap-6 mt-4">
                          <a 
                            href={founder.social.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center gap-2 group ${
                              theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            <div className={`p-3 rounded-full border ${
                              theme === 'dark' 
                                ? 'border-blue-400 group-hover:border-blue-300' 
                                : 'border-blue-600 group-hover:border-blue-700'
                            }`}>
                              <FaLinkedinIn className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium">LinkedIn</span>
                          </a>
                          
                          <a 
                            href={founder.social.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center gap-2 group ${
                              theme === 'dark' ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'
                            }`}
                          >
                            <div className={`p-3 rounded-full border ${
                              theme === 'dark' 
                                ? 'border-pink-400 group-hover:border-pink-300' 
                                : 'border-pink-600 group-hover:border-pink-700'
                            }`}>
                              <FaInstagram className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium">Instagram</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
          <FooterLabel />
        </div>
      </Layout>
    </div>
  );
}