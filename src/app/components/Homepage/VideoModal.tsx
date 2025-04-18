"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoModal = ({
  videoSrc = "https://res.cloudinary.com/dkgjl08a5/video/upload/v1744839021/Dubai_realestate_video_01_tsmqus.webm",
  thumbnail = "",
  autoPlay = true,
  muted = true,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMini, setIsMini] = useState(false); // Start in fullscreen mode
  const [isMuted, setIsMuted] = useState(muted);
  const [showMiniAfterClose, setShowMiniAfterClose] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animation variants for fullscreen modal
  const fullscreenVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.6 },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.6 },
    },
  };

  // Mini modal variants - always slide from right, never from bottom
  const miniVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
    exit: { x: 100, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  // Overlay animation (opacity + blur)
  const overlayVariants = {
    hidden: { opacity: 0, filter: "blur(0px)" },
    visible: {
      opacity: 1,
      filter: "blur(4px)",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };


  // Handle close of fullscreen modal
  const handleCloseFullscreen = () => {
    setIsMini(false);
    setShowMiniAfterClose(true);
    setTimeout(() => {
      setIsMini(true);
      setShowMiniAfterClose(false);
    }, 600); // Wait for exit animation
  };

  // When modal is closed, don't render
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!isMini && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          variants={fullscreenVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key="fullscreen-modal"
        >

          {/* Modal Content */}
          <div
            className="relative bg-black aspect-[9/16] w-[min(92vw,42vh)] h-[min(75vh,calc(92vw*16/9))] max-w-[420px] max-h-[75vh] lg:max-w-[600px] lg:max-h-[75vh] flex items-center justify-center rounded-lg overflow-hidden shadow-2xl"
            style={{ borderRadius: 24, zIndex: 2 }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={thumbnail}
              autoPlay={autoPlay}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-contain aspect-[9/16]"
            />
            {/* Close Button (slide out right) */}
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg transition-transform hover:scale-110"
              aria-label="Close video"
              style={{ zIndex: 3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Mute/Unmute Button */}
            <button
              onClick={() => {
                setIsMuted((m) => !m);
                if (videoRef.current) videoRef.current.muted = !isMuted;
              }}
              className="absolute bottom-2 left-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg transition-transform hover:scale-110"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              style={{ zIndex: 3 }}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      )}
      {/* Mini Modal (appears after closing fullscreen) */}
      {isMini && (
        <motion.div
          className="fixed bottom-4 right-4 w-28 h-48 sm:w-36 sm:h-64 lg:w-48 lg:h-80 z-[9999] shadow-2xl group"
          variants={miniVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ borderRadius: 16 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.5}
          onDragEnd={(event, info) => {
            if (Math.abs(info.offset.x) > 80) {
              setIsOpen(false);
            }
          }}
        >
          <div
            className="relative bg-black w-full h-full flex items-center justify-center rounded-lg overflow-hidden"
            style={{ borderRadius: 16 }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={thumbnail}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-contain aspect-[9/16] cursor-pointer"
              onClick={() => setIsMini(false)}
            />
            {/* Close Button (only on hover) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Close video"
            >
              {/* Close (X) icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Mute/Unmute Button (only on hover) */}
            <button
              onClick={() => {
                setIsMuted((m) => !m);
                if (videoRef.current) videoRef.current.muted = !isMuted;
              }}
              className="absolute bottom-2 left-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                // Muted volume icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              ) : (
                // Unmuted volume icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default VideoModal;