import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ isAudioPlaying = false }) {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configurations for smooth delay lag on the outer ring
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile / touch devices
    const checkDevice = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if target or parent is interactive
      const element = e.target;
      const isInteractive = 
        element.tagName === 'A' || 
        element.tagName === 'BUTTON' || 
        element.closest('a') || 
        element.closest('button') || 
        element.closest('[role="button"]') ||
        element.classList.contains('cursor-pointer') ||
        element.closest('.clickable');
        
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  // Pulse effect based on audio play status
  const ringScale = isClicked 
    ? 0.8 
    : isHovered 
      ? 1.5 
      : isAudioPlaying 
        ? [1, 1.15, 1] // Beat pulse animation
        : 1;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? '#FFD700' : '#00E5FF',
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer Glow Ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: ringScale,
          borderColor: isHovered ? '#FFD700' : isAudioPlaying ? '#7B2EFF' : '#7B2EFF',
          boxShadow: isHovered 
            ? '0 0 15px rgba(255, 215, 0, 0.6)' 
            : isAudioPlaying 
              ? '0 0 20px rgba(123, 46, 255, 0.8)' 
              : '0 0 10px rgba(123, 46, 255, 0.3)',
          backgroundColor: isHovered ? 'rgba(255, 215, 0, 0.05)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={isAudioPlaying && !isHovered && !isClicked ? {
          scale: {
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut"
          }
        } : { duration: 0.15 }}
      />
    </>
  );
}
