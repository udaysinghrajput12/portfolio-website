import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const RobotBikePath = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const bikeGroupRef = useRef(null);
  const frontWheelRef = useRef(null);
  const backWheelRef = useRef(null);
  const tooltipRef = useRef(null);
  
  const [tooltipText, setTooltipText] = useState("");
  const { isDarkMode } = useTheme();

  const sections = [
    { id: '#about', text: 'Welcome to About! 👋' },
    { id: '#projects', text: 'Check out these Quests! 🚀' },
    { id: '#skills', text: 'My Arsenal 🛠️' },
    { id: '#training', text: 'Training & Certs 🎓' },
    { id: '#contact', text: 'Let’s connect! 📬' }
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    let ctx = gsap.context(() => {
      const showTooltip = (text) => {
        setTooltipText(text);
        gsap.killTweensOf(tooltipRef.current);
        gsap.to(tooltipRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
        setTimeout(() => {
          if (tooltipRef.current) {
             gsap.to(tooltipRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
          }
        }, 3000);
      };

      // Constant subtle bounce (idle state)
      gsap.to(bikeGroupRef.current, {
        y: "-=5",
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Wait a tick for DOM to render full height
      setTimeout(() => {
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        
        // Define curved path dynamically based on document height
        // Path spans from top to bottom
        const pathCoordinates = isMobile 
          ? [
              { x: window.innerWidth * 0.1, y: 0 },
              { x: window.innerWidth * 0.1, y: docHeight }
            ]
          : [
              { x: window.innerWidth * 0.2, y: 0 },
              { x: window.innerWidth * 0.8, y: docHeight * 0.25 },
              { x: window.innerWidth * 0.1, y: docHeight * 0.5 },
              { x: window.innerWidth * 0.8, y: docHeight * 0.75 },
              { x: window.innerWidth * 0.5, y: docHeight }
            ];

        // Create Master Timeline for movement along the path
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              // Tilt the bike slightly forward based on scroll velocity
              const velocity = self.getVelocity();
              const tilt = Math.max(-10, Math.min(10, velocity / -100));
              gsap.to(bikeGroupRef.current, { rotation: tilt, duration: 0.2, overwrite: "auto" });
            }
          }
        });

        // 1. Move along motion path
        tl.to(bikeGroupRef.current, {
          motionPath: {
            path: pathCoordinates,
            curviness: isMobile ? 0 : 1.5,
            autoRotate: isMobile ? false : true,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none"
        }, 0);

        // 2. Rotate wheels continuously as it travels
        tl.to([frontWheelRef.current, backWheelRef.current], {
          rotation: 360 * (isMobile ? 10 : 20), 
          ease: "none",
          transformOrigin: "center"
        }, 0);

        // Setup Checkpoints for Tooltips and Bounce
        sections.forEach(sec => {
          const el = document.querySelector(sec.id);
          if (el) {
            ScrollTrigger.create({
              trigger: el,
              start: "top center",
              onEnter: () => {
                showTooltip(sec.text);
                gsap.fromTo(bikeGroupRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
              },
              onEnterBack: () => {
                showTooltip(sec.text);
                gsap.fromTo(bikeGroupRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
              }
            });
          }
        });
        
        ScrollTrigger.refresh();
      }, 300);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const primary = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const accent = isDarkMode ? "#ffb703" : "#fb8500";
  const secondary = isDarkMode ? "#16213e" : "#f3f4f6";

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[50]"
    >
      {/* Invisible SVG path for debugging / reference if needed. We don't render it visually to keep it clean, but GSAP uses the coordinates array above. */}
      
      <div 
        ref={bikeGroupRef} 
        className="absolute w-24 h-24 md:w-32 md:h-32 will-change-transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        {/* Tooltip */}
        <div 
          ref={tooltipRef}
          className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-white dark:bg-theme-surface shadow-2xl border border-neutral-200 dark:border-neutral-800 text-xs md:text-sm font-bold text-theme-lightText dark:text-theme-text opacity-0 scale-50 origin-bottom whitespace-nowrap"
        >
          {tooltipText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-theme-surface border-b border-r border-neutral-200 dark:border-neutral-800 transform rotate-45"></div>
        </div>

        {/* Soft shadow */}
        <div className="absolute -bottom-2 w-16 h-4 bg-black/20 dark:bg-black/40 blur-sm rounded-[100%] animate-pulse"></div>

        {/* Bike + Robot SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] relative z-10">
            {/* Glow */}
            <defs>
              <radialGradient id="bikeGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="150" r="60" fill="url(#bikeGlow2)" />

            {/* --- BICYCLE --- */}
            {/* Frame */}
            <path d="M 60 140 L 90 90 L 140 90 L 100 140 Z" fill="none" stroke={primary} strokeWidth="6" strokeLinejoin="round" />
            <line x1="90" y1="90" x2="80" y2="70" stroke={primary} strokeWidth="6" strokeLinecap="round" />
            <line x1="140" y1="90" x2="150" y2="140" stroke={primary} strokeWidth="6" strokeLinecap="round" />
            <line x1="140" y1="90" x2="130" y2="70" stroke={primary} strokeWidth="6" strokeLinecap="round" />
            
            {/* Handlebars */}
            <path d="M 120 70 L 140 70 M 130 70 L 130 80" stroke={primary} strokeWidth="6" strokeLinecap="round" />
            <rect x="70" y="65" width="20" height="8" rx="4" fill={accent} />

            {/* Wheels */}
            <g ref={backWheelRef} transform="translate(60, 140)">
                <circle cx="0" cy="0" r="24" fill="none" stroke={primary} strokeWidth="4" />
                <circle cx="0" cy="0" r="20" fill="none" stroke={secondary} strokeWidth="2" />
                <line x1="-24" y1="0" x2="24" y2="0" stroke={primary} strokeWidth="2" />
                <line x1="0" y1="-24" x2="0" y2="24" stroke={primary} strokeWidth="2" />
                <circle cx="0" cy="0" r="4" fill={accent} />
            </g>
            <g ref={frontWheelRef} transform="translate(150, 140)">
                <circle cx="0" cy="0" r="24" fill="none" stroke={primary} strokeWidth="4" />
                <circle cx="0" cy="0" r="20" fill="none" stroke={secondary} strokeWidth="2" />
                <line x1="-24" y1="0" x2="24" y2="0" stroke={primary} strokeWidth="2" />
                <line x1="0" y1="-24" x2="0" y2="24" stroke={primary} strokeWidth="2" />
                <circle cx="0" cy="0" r="4" fill={accent} />
            </g>

            {/* --- ROBOT --- */}
            <g transform="translate(5, -15)">
                <rect x="65" y="40" width="26" height="35" rx="8" fill={primary} />
                <rect x="58" y="5" width="40" height="30" rx="10" fill={primary} />
                <rect x="63" y="10" width="30" height="20" rx="6" fill={secondary} />
                <rect x="68" y="15" width="6" height="8" rx="2" fill={accent} className="animate-bounce" />
                <rect x="82" y="15" width="6" height="8" rx="2" fill={accent} className="animate-bounce" style={{animationDelay: '0.2s'}} />
                <line x1="78" y1="5" x2="78" y2="-5" stroke={primary} strokeWidth="3" strokeLinecap="round" />
                <circle cx="78" cy="-8" r="4" fill={accent} className="animate-pulse" />
                <path d="M 85 50 Q 110 50 125 70" fill="none" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                <path d="M 75 70 Q 80 100 100 140" fill="none" stroke={primary} strokeWidth="6" strokeLinecap="round" />
            </g>
        </svg>
      </div>
    </div>
  );
};

export default RobotBikePath;
