import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const RobotGuideAdvanced = () => {
  const containerRef = useRef(null);
  const robotWrapperRef = useRef(null);
  const robotBodyRef = useRef(null);
  const tooltipRef = useRef(null);
  
  const [tooltipText, setTooltipText] = useState("");
  const { isDarkMode } = useTheme();

  const sections = [
    { id: '#about', text: 'Hey! This is my About section 👋' },
    { id: '#projects', text: 'Check out my Projects 🚀' },
    { id: '#skills', text: 'These are my skills 💻' },
    { id: '#contact', text: 'Let’s connect! 📩' }
  ];

  const currentSectionIdx = useRef(-1);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    let ctx = gsap.context(() => {
      const showTooltip = (text, duration = 3000) => {
        setTooltipText(text);
        gsap.killTweensOf(tooltipRef.current);
        gsap.to(tooltipRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
        
        if (duration > 0) {
          setTimeout(() => {
            if (tooltipRef.current) {
              gsap.to(tooltipRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
            }
          }, duration);
        }
      };

      // Idle floating micro-animation
      gsap.to(robotBodyRef.current, {
        y: -10,
        rotation: 2,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Desktop Path (Curved) vs Mobile Path (Straight Horizontal)
      const pathCoordinates = isMobile 
        ? [
            { x: "5vw", y: "85vh" },
            { x: "30vw", y: "85vh" },
            { x: "55vw", y: "85vh" },
            { x: "80vw", y: "85vh" }
          ]
        : [
            { x: "5vw", y: "80vh" }, // Home
            { x: "25vw", y: "20vh" }, // About
            { x: "50vw", y: "70vh" }, // Projects
            { x: "75vw", y: "30vh" }, // Skills
            { x: "85vw", y: "80vh" }  // Contact
          ];

      // Set initial position
      gsap.set(robotWrapperRef.current, { 
        x: pathCoordinates[0].x, 
        y: pathCoordinates[0].y 
      });

      // Wait for layout
      setTimeout(() => {
        // Master scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrub
          }
        });

        // Motion path animation
        tl.to(robotWrapperRef.current, {
          motionPath: {
            path: pathCoordinates,
            curviness: isMobile ? 0 : 1.5,
            autoRotate: false
          },
          ease: "power2.inOut"
        }, 0);

        // Section Triggers for tooltips and bounces
        sections.forEach((sec, index) => {
          const el = document.querySelector(sec.id);
          if (el) {
            ScrollTrigger.create({
              trigger: el,
              start: "top center",
              onEnter: () => {
                currentSectionIdx.current = index;
                showTooltip(sec.text);
                // Small bounce effect on section enter
                gsap.fromTo(robotWrapperRef.current, 
                  { scale: 1.2 }, 
                  { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
                );
              },
              onEnterBack: () => {
                currentSectionIdx.current = index;
                showTooltip(sec.text);
                gsap.fromTo(robotWrapperRef.current, 
                  { scale: 1.2 }, 
                  { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
                );
              }
            });
          }
        });

        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(robotWrapperRef.current, { scale: 1.1, rotation: 5, duration: 0.3, filter: "drop-shadow(0 0 15px rgba(255, 183, 3, 0.6))" });
    setTooltipText("Click to explore!");
    gsap.to(tooltipRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
  };

  const handleMouseLeave = () => {
    gsap.to(robotWrapperRef.current, { scale: 1, rotation: 0, duration: 0.3, filter: "drop-shadow(0 0 0px rgba(255, 183, 3, 0))" });
    gsap.to(tooltipRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
  };

  const handleClick = () => {
    // Scroll to next section
    const nextIdx = currentSectionIdx.current + 1;
    if (nextIdx < sections.length) {
      const elem = document.querySelector(sections[nextIdx].id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Loop back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const primary = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const accent = isDarkMode ? "#ffb703" : "#fb8500";
  const secondary = isDarkMode ? "#16213e" : "#f3f4f6";

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden"
    >
      <div 
        ref={robotWrapperRef} 
        className="absolute w-20 h-20 md:w-28 md:h-28 pointer-events-auto cursor-pointer will-change-transform flex items-center justify-center origin-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        
        {/* Tooltip */}
        <div 
          ref={tooltipRef}
          className="absolute -top-16 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl bg-white dark:bg-theme-surface shadow-2xl border border-neutral-200 dark:border-neutral-800 text-xs md:text-sm font-bold text-theme-lightText dark:text-theme-text opacity-0 scale-50 origin-bottom whitespace-nowrap z-50 flex items-center justify-center text-center"
        >
          {tooltipText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-theme-surface border-b border-r border-neutral-200 dark:border-neutral-800 transform rotate-45"></div>
        </div>

        {/* Robot SVG Group */}
        <div ref={robotBodyRef} className="w-full h-full relative flex items-center justify-center">
            {/* Soft Shadow below robot */}
            <div className="absolute -bottom-4 w-12 h-3 bg-black/20 dark:bg-black/40 blur-sm rounded-[100%] animate-pulse"></div>

            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl relative z-10">
                <defs>
                  <radialGradient id="advancedGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#advancedGlow)" className="animate-pulse" />
                
                {/* Robot Main Body */}
                <rect x="25" y="30" width="50" height="45" rx="15" fill={primary} />
                
                {/* Robot Screen */}
                <rect x="32" y="38" width="36" height="22" rx="8" fill={secondary} />
                
                {/* Eyes */}
                <rect x="38" y="44" width="6" height="10" rx="3" fill={accent} className="animate-bounce" style={{ animationDuration: '2s' }} />
                <rect x="56" y="44" width="6" height="10" rx="3" fill={accent} className="animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.2s' }} />
                
                {/* Antenna */}
                <line x1="50" y1="30" x2="50" y2="10" stroke={primary} strokeWidth="5" strokeLinecap="round" />
                <circle cx="50" cy="8" r="6" fill={accent} className="animate-ping" />
                <circle cx="50" cy="8" r="6" fill={accent} />

                {/* Arms */}
                <path d="M 25 50 Q 10 50 15 70" fill="none" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                <path d="M 75 50 Q 90 50 85 70" fill="none" stroke={primary} strokeWidth="6" strokeLinecap="round" />

                {/* Jetpack / Thruster Base */}
                <path d="M 35 75 L 65 75 L 55 85 L 45 85 Z" fill={primary} />
                <circle cx="50" cy="88" r="4" fill={accent} className="animate-pulse" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default RobotGuideAdvanced;
