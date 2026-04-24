import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

const RobotGuide = () => {
  const robotRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltipText, setTooltipText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();

  // Idle animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(robotRef.current, {
        y: -15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Listen for navigation events
  useEffect(() => {
    const handleNav = (e) => {
      const { targetId, targetName } = e.detail;
      
      // Stop idle temporarily
      gsap.killTweensOf(robotRef.current);
      
      // Fly/Bounce animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Resume idle
          gsap.to(robotRef.current, {
            y: -15,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut"
          });
        }
      });

      tl.to(robotRef.current, {
        scale: 1.2,
        y: -30,
        rotation: 10,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(robotRef.current, {
        scale: 1,
        y: 0,
        rotation: -5,
        duration: 0.3,
        ease: "bounce.out"
      })
      .to(robotRef.current, {
        rotation: 0,
        duration: 0.2
      });

      // Show tooltip
      setTooltipText(`Here is the ${targetName} section! 👇`);
      setIsVisible(true);
      
      // Hide tooltip after a few seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      // Perform scroll
      const elem = document.getElementById(targetId.replace('#', ''));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('robotNavigate', handleNav);
    return () => window.removeEventListener('robotNavigate', handleNav);
  }, []);

  // Hover interaction
  const handleMouseEnter = () => {
    gsap.to(robotRef.current, { scale: 1.1, duration: 0.3 });
  };
  
  const handleMouseLeave = () => {
    gsap.to(robotRef.current, { scale: 1, duration: 0.3 });
  };

  const primary = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const accent = isDarkMode ? "#ffb703" : "#fb8500";

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[9999] pointer-events-none flex flex-col items-end hidden sm:flex"
    >
      {/* Tooltip */}
      <div 
        className={`mb-4 px-4 py-2 rounded-2xl bg-white dark:bg-theme-surface shadow-xl border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-theme-lightText dark:text-theme-text transition-all duration-300 origin-bottom-right
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `}
      >
        {tooltipText}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-theme-surface border-b border-r border-neutral-200 dark:border-neutral-800 transform rotate-45"></div>
      </div>

      {/* Robot Character */}
      <div 
        ref={robotRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-16 h-16 md:w-20 md:h-20 pointer-events-auto cursor-pointer filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]"
        onClick={() => {
           setTooltipText("Need guidance? Click the menu above! ⬆️");
           setIsVisible(true);
           setTimeout(() => setIsVisible(false), 3000);
           gsap.fromTo(robotRef.current, { rotation: -20 }, { rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="robotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#robotGlow)" className="animate-pulse" />
          
          {/* Robot Head */}
          <rect x="25" y="30" width="50" height="40" rx="12" fill={primary} />
          
          {/* Antenna */}
          <line x1="50" y1="30" x2="50" y2="15" stroke={primary} strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="12" r="4" fill={accent} className="animate-ping" />
          <circle cx="50" cy="12" r="4" fill={accent} />

          {/* Eyes */}
          <rect x="35" y="45" width="8" height="12" rx="4" fill={accent} />
          <rect x="57" y="45" width="8" height="12" rx="4" fill={accent} />
          
          {/* Mouth/Voice indicator */}
          <line x1="40" y1="62" x2="60" y2="62" stroke={isDarkMode ? "#1a1a2e" : "#fdfbf7"} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default RobotGuide;
