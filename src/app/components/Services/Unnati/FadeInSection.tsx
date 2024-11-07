'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial={false}
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection; 