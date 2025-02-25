import { motion } from 'framer-motion';
import Image from 'next/image';
import { ImageProps } from './types';

interface GalleryImageProps {
  image: ImageProps;
  index: number;
  isMobile: boolean;
  position: { x: number; y: number };
  onImageClick: (image: ImageProps, event: React.MouseEvent) => void;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  image,
  index,
  isMobile,
  position,
  onImageClick
}) => {
  return (
    <motion.div
      key={`image-${index}`}
      className="absolute cursor-pointer bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${isMobile ? image.mobileWidth : image.width}px`,
        height: `${isMobile ? image.mobileHeight : image.height}px`,
      }}
      whileHover={{ 
        scale: isMobile ? 1.01 : 1.05,
        zIndex: 10,
        rotate: isMobile ? [-0.5, 0.5] : [-1, 1],
        transition: {
          rotate: {
            repeat: Infinity,
            duration: isMobile ? 1.5 : 1,
            repeatType: "reverse"
          }
        }
      }}
      animate={{
        y: [0, -10, 0],
        rotate: [-0.5, 0.5, -0.5],
        transition: {
          y: {
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            ease: "easeInOut"
          },
          rotate: {
            repeat: Infinity,
            duration: 4 + Math.random() * 2,
            ease: "easeInOut"
          }
        }
      }}
      drag={!isMobile}
      dragConstraints={{
        left: -50,
        right: 50,
        top: -50,
        bottom: 50
      }}
      dragElastic={0.05}
      onClick={(e) => onImageClick(image, e)}
    >
      <GalleryImageEffects index={index} />
      <Image
        src={image.url}
        alt={image.description}
        width={isMobile ? image.mobileWidth : image.width}
        height={isMobile ? image.mobileHeight : image.height}
        className="w-full h-full object-cover rounded-lg"
        priority={index < 4}
        quality={85}
        sizes={`(max-width: 768px) ${image.mobileWidth}px, ${image.width}px`}
      />
    </motion.div>
  );
};

const GalleryImageEffects: React.FC<{ index: number }> = ({ index }) => (
  <>
    <motion.div
      className="absolute inset-0 bg-white/10"
      animate={{
        opacity: [0, 0.2, 0],
        scale: [0.8, 1.1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
    />
    <motion.div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  </>
); 