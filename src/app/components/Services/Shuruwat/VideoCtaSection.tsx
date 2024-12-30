'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VideoCtaSection = () => {
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
    <div className="bg-black text-white py-12 sm:py-16 md:py-24" ref={ref}>
      <motion.div 
        className="max-w-[1200px] mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="bg-[#001F2D] rounded-xl sm:rounded-2xl md:rounded-3xl 
          py-12 sm:py-16 md:py-24 
          px-4 sm:px-6 md:px-8"
        >
          <motion.div 
            className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden relative aspect-video"
            variants={textVariants}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dkgjl08a5/video/upload/f_auto:video,q_auto/wvz3zbnqxu2tgworqmvg"  type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoCtaSection; 