"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const SpinningStar = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Adjust sphere size based on device
    const sphereRadius = isMobile ? 0.8 : 2; // Reduced mobile radius from 1.2 to 0.8
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const sphereParticles = new THREE.Points(
      sphereGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: isMobile ? 0.015 : 0.04, // Reduced mobile particle size
      })
    );
    scene.add(sphereParticles);

    // Adjust dust particles for mobile
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile ? 2000 : 10000; // Reduced count for better visibility
    const posArray = new Float32Array(particleCount * 3);
    const spread = isMobile ? 2 : 10; // Reduced spread to concentrate particles

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * spread;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.008 : 0.01, // Increased size for mobile visibility
      color: 0xffffff,
      transparent: true,
      opacity: isMobile ? 0.8 : 1, // Increased opacity for mobile
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Adjust camera settings for mobile
    if (isMobile) {
      camera.fov = 90;
      camera.position.z = 2;
    } else {
      camera.fov = 75;
      camera.position.z = 5;
    }
    camera.updateProjectionMatrix();

    // Smoother OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08; // Increased for smoother damping
    controls.rotateSpeed = 0.3; // Reduced for smoother rotation
    controls.enableZoom = false;
    controls.enablePan = false;

    // Smoother mouse movement
    const mouseEffect = (event: { clientX: number; clientY: number; }) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      gsap.to(scene.rotation, {
        x: mouseY * 0.1, // Reduced for smoother movement
        y: mouseX * 0.1,
        duration: 2, // Increased duration
        ease: "power2.out" // Smoother easing
      });
    };

    window.addEventListener('mousemove', mouseEffect);

    // Smoother device orientation
    const deviceOrientationEffect = (event: DeviceOrientationEvent) => {
      const beta = event.beta ? event.beta * (Math.PI / 180) : 0;
      const gamma = event.gamma ? event.gamma * (Math.PI / 180) : 0;

      gsap.to(scene.rotation, {
        x: beta * 0.1,
        y: gamma * 0.1,
        duration: 2,
        ease: "power2.out"
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationEffect);
    }

    // Enhanced scroll effect with smoother momentum
    const handleMouseWheel = (event: WheelEvent) => {
      if (!isClient) return;
      event.preventDefault();

      const scrollSpeed = 0.002; // Reduced for smoother control
      const momentumFactor = 0.15; // Reduced for smoother momentum

      rotationRef.current.x += event.deltaY * scrollSpeed * momentumFactor;
      rotationRef.current.y += event.deltaX * scrollSpeed * momentumFactor;

      if (sphereParticles && particlesMesh) {
        // Smoother immediate rotation
        gsap.to(sphereParticles.rotation, {
          x: sphereParticles.rotation.x + (event.deltaY * scrollSpeed),
          y: sphereParticles.rotation.y + (event.deltaX * scrollSpeed),
          duration: 1.5,
          ease: "power3.out"
        });
        
        gsap.to(particlesMesh.rotation, {
          x: particlesMesh.rotation.x + (event.deltaY * scrollSpeed * 0.3),
          y: particlesMesh.rotation.y + (event.deltaX * scrollSpeed * 0.3),
          duration: 1.5,
          ease: "power3.out"
        });
      }
    };

    if (isClient) {
      window.addEventListener('wheel', handleMouseWheel, { 
        passive: false,
        capture: true 
      });
    }

    // Modified animation loop with smoother persistent rotation
    const animate = () => {
      requestAnimationFrame(animate);

      const momentum = 0.998; // Increased for longer-lasting, smoother momentum
      rotationRef.current.x *= momentum;
      rotationRef.current.y *= momentum;

      if (sphereParticles && particlesMesh) {
        // Slower base rotation
        sphereParticles.rotation.y += 0.0002;
        particlesMesh.rotation.x += 0.0001;
        particlesMesh.rotation.y += 0.0001;

        // Smoother momentum influence
        const momentumInfluence = 0.005; // Reduced for smoother movement
        sphereParticles.rotation.x += rotationRef.current.x * momentumInfluence;
        sphereParticles.rotation.y += rotationRef.current.y * momentumInfluence;
        particlesMesh.rotation.x += rotationRef.current.x * momentumInfluence * 0.3;
        particlesMesh.rotation.y += rotationRef.current.y * momentumInfluence * 0.3;

        // Add slight oscillation for more organic movement
        sphereParticles.position.y = Math.sin(Date.now() * 0.0005) * 0.05;
        particlesMesh.position.y = Math.sin(Date.now() * 0.0003) * 0.03;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Update resize handler
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      
      camera.aspect = window.innerWidth / window.innerHeight;
      
      if (newIsMobile) {
        camera.fov = 90;
        camera.position.z = 2;
      } else {
        camera.fov = 75;
        camera.position.z = 5;
      }
      
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseEffect);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', deviceOrientationEffect);
      }
      if (isClient) {
        window.removeEventListener('wheel', handleMouseWheel, { capture: true });
      }
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isClient, isMobile]);

  if (!isClient) {
    return <div className="w-full h-screen bg-black" />;
  }

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }} 
    />
  );
};

export default SpinningStar;
