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

export default function Home() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const plane1 = useRef<HTMLDivElement>(null);
  const plane2 = useRef<HTMLDivElement>(null);
  const plane3 = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let requestAnimationFrameId: number | null = null;
  let xForce: number = 0;
  let yForce: number = 0;
  const easing: number = 0.08;
  const speed: number = 0.01;
  const tileWidth = 1200;  // Base tile size
  const tileHeight = 1200;
  const tilesX = 5;  // Enough tiles to cover beyond viewport
  const tilesY = 5;
  const contentWidth = tileWidth * tilesX;
  const contentHeight = tileHeight * tilesY;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cloudParticles = useRef<HTMLDivElement[]>([]);
  const cloudBackground = useRef<HTMLDivElement>(null);

  const manageMouseMove = (e: MouseEvent): void => {
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
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const scrollTop = containerRef.current.scrollTop;

      // Update plane positions without wrapping scroll directly
      updatePlanePositions(scrollLeft, scrollTop);
    }
  }

  const updatePlanePositions = (scrollLeft: number, scrollTop: number) => {
    [plane1, plane2, plane3].forEach((plane, index) => {
      if (plane.current) {
        const speedFactor = [1, 0.5, 0.25][index];
        // Use modulo to wrap the offset within tile size, scaled by speed
        const offsetX = -((scrollLeft * speedFactor) % tileWidth);
        const offsetY = -((scrollTop * speedFactor) % tileHeight);
        gsap.set(plane.current, { x: offsetX, y: offsetY });
      }
    });
  }

  const animate = (): void => {
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
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Start in the middle of the content
      container.scrollLeft = (contentWidth - container.clientWidth) / 2;
      container.scrollTop = (contentHeight - container.clientHeight) / 2;
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // Create cloud particles
    if (cloudBackground.current) {
      const numParticles = 50;
      cloudParticles.current = [];
      
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = styles.cloudParticle;
        
        // Random size between 50px and 200px
        const size = Math.random() * 150 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random initial position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        cloudBackground.current.appendChild(particle);
        cloudParticles.current.push(particle);
      }
    }

    return () => {
      if (cloudBackground.current) {
        cloudBackground.current.innerHTML = '';
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });

    // Update particle positions based on mouse movement
    cloudParticles.current.forEach((particle, index) => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width / 2;
      const particleY = rect.top + rect.height / 2;

      const deltaX = clientX - particleX;
      const deltaY = clientY - particleY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Movement factor decreases with distance
      const factor = Math.max(0, 1 - distance / 1000) * 0.2;
      
      const translateX = deltaX * factor;
      const translateY = deltaY * factor;

      particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  };

  const imagePositions = [
    { left: '10%', top: '10%' },  // img 0
    { left: '30%', top: '20%' },  // img 1
    { left: '20%', top: '40%' },  // img 2
    { left: '40%', top: '15%' },  // img 3
    { left: '50%', top: '30%' },  // img 4
    { left: '60%', top: '45%' },  // img 5
    { left: '70%', top: '20%' },  // img 6
    { left: '80%', top: '35%' }   // img 7
  ];

  const renderImages = (planeIndex: number, tileX: number, tileY: number) => {
    const planeImages = [
      [0, 1, 2],    // plane1
      [3, 4, 5],    // plane2
      [6, 7]        // plane3
    ][planeIndex];

    return planeImages.map((imgIndex) => (
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
    ));
  }

  return (
    <main onMouseMove={(e) => {handleMouseMove(e); manageMouseMove(e as any)}} className={styles.main}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image
          src="/logo png-01 2@2x.png"
          alt="3rdshade Logo"
          width={200}
          height={100}
          priority
        />
      </div>
      <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
        <source src="https://media.istockphoto.com/id/1467661374/video/soft-white-background-the-concept-of-abstract-clean-beautiful-soft-shiny-simple-blurred.mp4?s=mp4-640x640-is&k=20&c=c2mhjoEGYZWpLipzBKjJ38h43ogQtzmCOGsqyoRSe7w=" type="video/mp4" />
      </video>
      <div ref={cloudBackground} className={styles.cloudBackground}></div>
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.contentWrapper}>
          <div ref={plane1} className={styles.plane}>
            {Array.from({ length: tilesX }).map((_, x) =>
              Array.from({ length: tilesY }).map((_, y) =>
                renderImages(0, x, y)
              )
            )}
          </div>
          <div ref={plane2} className={styles.plane}>
            {Array.from({ length: tilesX }).map((_, x) =>
              Array.from({ length: tilesY }).map((_, y) =>
                renderImages(1, x, y)
              )
            )}
          </div>
          <div ref={plane3} className={styles.plane}>
            {Array.from({ length: tilesX }).map((_, x) =>
              Array.from({ length: tilesY }).map((_, y) =>
                renderImages(2, x, y)
              )
            )}
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>×</button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.description}
              width={selectedImage.width * 2}
              height={selectedImage.height * 2}
              className={styles.modalImage}
            />
            <p className={styles.imageDescription}>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </main>
  )
}