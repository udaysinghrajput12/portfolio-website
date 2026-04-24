import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

const FloatingRobot = () => {
  const robotRef = useRef(null);
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Idle floating animation
      gsap.to(robotRef.current, {
        y: -5,
        rotation: 2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Parallax movement on scroll
      const handleScroll = () => {
        const scrolled = window.scrollY;
        // Move slightly opposite to scroll direction for parallax feel
        gsap.to(containerRef.current, {
          y: scrolled * 0.15,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleHover = () => {
    gsap.to(robotRef.current, {
      scale: 1.1,
      filter: isDarkMode ? "drop-shadow(0 0 25px rgba(212, 175, 55, 0.8))" : "drop-shadow(0 0 25px rgba(37, 99, 235, 0.6))",
      duration: 0.3,
      ease: "back.out(1.5)"
    });
  };

  const handleLeave = () => {
    gsap.to(robotRef.current, {
      scale: 1,
      filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const primary = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const accent = isDarkMode ? "#D4AF37" : "#2563eb"; // Gold in dark, Blue in light
  const secondary = isDarkMode ? "#16213e" : "#f3f4f6";
  const screenColor = isDarkMode ? "#0B0B0F" : "#111111";

  return (
    <div 
      ref={containerRef}
      className="fixed top-24 md:top-8 left-4 md:left-8 z-[100] pointer-events-none"
    >
      <div 
        ref={robotRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="w-16 h-16 md:w-20 md:h-20 pointer-events-auto cursor-pointer will-change-transform"
        style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            {/* Robot Head (3D-like styling) */}
            <defs>
              <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={screenColor} />
                <stop offset="100%" stopColor="#222" />
              </linearGradient>
              <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="1" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Main Body with gradient for 3D volume */}
            <rect x="15" y="30" width="70" height="55" rx="15" fill="url(#robotBodyGrad)" />
            
            {/* Inner Face/Screen Frame */}
            <rect x="20" y="35" width="60" height="45" rx="10" fill="rgba(0,0,0,0.1)" />
            
            {/* Screen */}
            <rect x="25" y="40" width="50" height="35" rx="8" fill="url(#screenGrad)" />
            
            {/* Glowing Eyes */}
            <circle cx="38" cy="57" r="12" fill="url(#eyeGlow)" className="animate-pulse" />
            <circle cx="62" cy="57" r="12" fill="url(#eyeGlow)" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
            
            {/* Eye Cores */}
            <rect x="35" y="54" width="6" height="6" rx="2" fill="#fff" />
            <rect x="59" y="54" width="6" height="6" rx="2" fill="#fff" />
            
            {/* Antenna Base */}
            <path d="M 40 30 L 60 30 L 55 20 L 45 20 Z" fill={secondary} />
            
            {/* Antenna Stem */}
            <line x1="50" y1="20" x2="50" y2="8" stroke={primary} strokeWidth="6" strokeLinecap="round" />
            
            {/* Antenna Bulb */}
            <circle cx="50" cy="6" r="8" fill={accent} className="animate-ping opacity-60" />
            <circle cx="50" cy="6" r="6" fill={accent} />
            
            {/* Ears/Bolts */}
            <rect x="5" y="50" width="10" height="15" rx="3" fill={secondary} />
            <rect x="85" y="50" width="10" height="15" rx="3" fill={secondary} />
        </svg>
      </div>
    </div>
  );
};

export default FloatingRobot;
