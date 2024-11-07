"use client";

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      key={pathname}
      initial={isFirstMount ? "enter" : "hidden"}
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;