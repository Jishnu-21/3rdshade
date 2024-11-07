"use client"

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const SpinningStar = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create sphere of particles (increased size)
    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64); // Increased radius and segments
    const sphereParticles = new THREE.Points(
      sphereGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.04, // Increased particle size
      })
    );
    scene.add(sphereParticles);

    // Create dust particles (increased count and size)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 10000; // Increased particle count
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10; // Increased spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // Increased particle size
      color: 0xffffff,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5; // Moved camera back to see the larger object

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;

    // Mouse movement effect (adjusted for larger object)
    const mouseEffect = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      gsap.to(scene.rotation, {
        x: mouseY * 0.2, // Increased effect
        y: mouseX * 0.2, // Increased effect
        duration: 1,
      });
    };

    window.addEventListener('mousemove', mouseEffect);

    // Device orientation effect (adjusted for larger object)
    const deviceOrientationEffect = (event) => {
      const beta = event.beta * (Math.PI / 180);
      const gamma = event.gamma * (Math.PI / 180);

      gsap.to(scene.rotation, {
        x: beta * 0.2, // Increased effect
        y: gamma * 0.2, // Increased effect
        duration: 1,
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationEffect);
    }

    // Mouse scroll effect (adjusted for larger object)
    const handleMouseWheel = (event: WheelEvent) => {
      if (sceneRef.current) {
        const scrollSpeed = 0.002; // Increased speed
        sceneRef.current.rotation.x += event.deltaY * scrollSpeed;
        sceneRef.current.rotation.y += event.deltaX * scrollSpeed;
      }
    };

    window.addEventListener('wheel', handleMouseWheel, { passive: false });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      sphereParticles.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
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
      window.removeEventListener('wheel', handleMouseWheel);
      if (mountRef.current) {
        window.removeEventListener('wheel', handleMouseWheel);
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default SpinningStar;
