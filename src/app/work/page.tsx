'use client';
import styles from './page.module.scss';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { images, ImageProps } from '../../../src/data';
import { useRouter } from 'next/navigation';

interface MouseEvent {
  movementX: number;
  movementY: number;
}

const ShootingStar: React.FC<{ 
  delay: number, 
  top: number, 
  left: number, 
  direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}> = ({ delay, top, left, direction }) => {
  const getDirectionStyles = () => {
    switch(direction) {
      case 'topLeft':
        return { top: `${top}%`, left: `${left}%` };
      case 'topRight':
        return { top: `${top}%`, right: `${left}%` };
      case 'bottomLeft':
        return { bottom: `${top}%`, left: `${left}%` };
      case 'bottomRight':
        return { bottom: `${top}%`, right: `${left}%` };
    }
  };

  return (
    <div 
      className={styles.shootingStar}
      style={{ 
        animationDelay: `${delay}s`,
        ...getDirectionStyles()
      }}
    ></div>
  );
};

export default function Home() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const plane1 = useRef<HTMLDivElement>(null);
  const plane2 = useRef<HTMLDivElement>(null);
  const plane3 = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let requestAnimationFrameId: number | null = null;
  let xForce: number = 0;
  let yForce: number = 0;
  const easing: number = 0.08;
  const speed: number = 0.01;
  const tileWidth = 1200;
  const tileHeight = 1200;
  const tilesX = 5;
  const tilesY = 5;
  const contentWidth = tileWidth * tilesX;
  const contentHeight = tileHeight * tilesY;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Array<{
    delay: number,
    top: number,
    left: number,
    direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  }>>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const manageMouseMove = (e: MouseEvent): void => {
    if (isMobile) return;
    
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start: number, target: number, amount: number): number => 
    start * (1 - amount) + target * amount;

  const handleScroll = () => {
    if (isMobile || !containerRef.current) return;
    
    const scrollLeft = containerRef.current.scrollLeft;
    const scrollTop = containerRef.current.scrollTop;
    updatePlanePositions(scrollLeft, scrollTop);
  }

  const updatePlanePositions = (scrollLeft: number, scrollTop: number) => {
    if (isMobile) return;

    [plane1, plane2, plane3].forEach((plane, index) => {
      if (plane.current) {
        const speedFactor = [1, 0.5, 0.25][index];
        const offsetX = -((scrollLeft * speedFactor) % tileWidth);
        const offsetY = -((scrollTop * speedFactor) % tileHeight);
        gsap.set(plane.current, { x: offsetX, y: offsetY });
      }
    });
  }

  const animate = (): void => {
    if (isMobile) return;

    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    
    if (plane1.current) gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`});
    if (plane2.current) gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`});
    if (plane3.current) gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`});

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrame(animate);
    }
    else{
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
        requestAnimationFrameId = null;
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if (container && !isMobile) {
      container.addEventListener('scroll', handleScroll);
      container.scrollLeft = (contentWidth - container.clientWidth) / 2;
      container.scrollTop = (contentHeight - container.clientHeight) / 2;
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const directions: Array<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'> = 
      ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    
    const newStars = Array(20).fill(null).map(() => ({
      delay: Math.random() * 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      direction: directions[Math.floor(Math.random() * directions.length)]
    }));
    setStars(newStars);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const imagePositions = [
    { left: '10%', top: '10%' },
    { left: '30%', top: '20%' },
    { left: '20%', top: '40%' },
    { left: '40%', top: '15%' },
    { left: '50%', top: '30%' },
    { left: '60%', top: '45%' },
    { left: '70%', top: '20%' },
    { left: '80%', top: '35%' }
  ];

  const renderImages = (planeIndex: number) => {
    const planeImages = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7]
    ][planeIndex];

    if (isMobile) {
      return planeImages.map((imgIndex) => (
        <Image 
          key={imgIndex}
          src={images[imgIndex].url}
          alt={images[imgIndex].description}
          width={images[imgIndex].width}
          height={images[imgIndex].height}
          onClick={() => setSelectedImage(images[imgIndex])}
          className={styles.mobileImage}
        />
      ));
    }

    return Array.from({ length: tilesY }, (_, tileY) =>
      Array.from({ length: tilesX }, (_, tileX) =>
        planeImages.map((imgIndex) => (
          <Image 
            key={`${imgIndex}-${tileX}-${tileY}`}
            src={images[imgIndex].url}
            alt={images[imgIndex].description}
            width={images[imgIndex].width}
            height={images[imgIndex].height}
            onClick={() => setSelectedImage(images[imgIndex])}
            style={{
              left: `calc(${imagePositions[imgIndex].left} + ${tileX * tileWidth}px)`,
              top: `calc(${imagePositions[imgIndex].top} + ${tileY * tileHeight}px)`
            }}
          />
        ))
      ).flat()
    ).flat();
  };

  return (
    <main 
      onMouseMove={(e) => {
        handleMouseMove(e);
        manageMouseMove(e as any);
      }} 
      className={styles.main}
    >
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image
          src="/logo png-01 2@2x.png"
          alt="3rdshade Logo"
          width={200}
          height={100}
          priority
        />
      </div>

      <div className={styles.starContainer}>
        {stars.map((star, i) => (
          <ShootingStar 
            key={i} 
            delay={star.delay} 
            top={star.top} 
            left={star.left}
            direction={star.direction}
          />
        ))}
      </div>

      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.contentWrapper}>
          <div ref={plane1} className={styles.plane}>
            {renderImages(0)}
          </div>
          <div ref={plane2} className={styles.plane}>
            {renderImages(1)}
          </div>
          <div ref={plane3} className={styles.plane}>
            {renderImages(2)}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className={styles.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null);
          }}
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.description}
              width={selectedImage.width}
              height={selectedImage.height}
              className={styles.modalImage}
            />
            <p className={styles.imageDescription}>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}