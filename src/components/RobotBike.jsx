import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const RobotBike = () => {
  const containerRef = useRef(null);
  const bikeWrapperRef = useRef(null);
  const bikeGroupRef = useRef(null);
  const frontWheelRef = useRef(null);
  const backWheelRef = useRef(null);
  const tooltipRef = useRef(null);
  
  const [tooltipText, setTooltipText] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Media query to reduce movement on mobile
    const isMobile = window.innerWidth < 768;

    const showTooltip = (text) => {
      setTooltipText(text);
      gsap.to(tooltipRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
      setTimeout(() => {
        if (tooltipRef.current) {
           gsap.to(tooltipRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
        }
      }, 3000);
    };

    // Constant subtle bounce (idle state)
    gsap.to(bikeGroupRef.current, {
      y: -5,
      duration: 0.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Create a master timeline tied to the document scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Smooth scrubbing
        onUpdate: (self) => {
          // Tilt the bike forward slightly based on scroll velocity
          const velocity = self.getVelocity();
          const tilt = Math.max(-15, Math.min(15, velocity / -100));
          gsap.to(bikeGroupRef.current, { rotation: tilt, duration: 0.2 });
        }
      }
    });

    // Animate X across the screen (0 to 80vw to avoid overflow)
    tl.to(bikeWrapperRef.current, {
      x: isMobile ? '70vw' : '85vw',
      ease: "none"
    }, 0);

    // Animate wheels rotating as it moves
    tl.to([frontWheelRef.current, backWheelRef.current], {
      rotation: 360 * (isMobile ? 5 : 8), // Multiple rotations over the page length
      ease: "none",
      transformOrigin: "center"
    }, 0);

    // Section specific triggers for Tooltips and slight Y adjustments
    const sections = [
      { id: '#about', text: 'Welcome to About! 👋' },
      { id: '#projects', text: 'Check out these Quests! 🚀' },
      { id: '#skills', text: 'My Arsenal 🛠️' },
      { id: '#contact', text: 'Let\'s talk! 📬' }
    ];

    sections.forEach(sec => {
      const el = document.querySelector(sec.id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          onEnter: () => showTooltip(sec.text),
          onEnterBack: () => showTooltip(sec.text)
        });
      }
    });

    // Listen to Navbar clicks to override and scroll
    const handleNav = (e) => {
      const { targetId } = e.detail;
      const elem = document.getElementById(targetId.replace('#', ''));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('robotNavigate', handleNav);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('robotNavigate', handleNav);
    };
  }, []);

  const primary = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const accent = isDarkMode ? "#ffb703" : "#fb8500";
  const secondary = isDarkMode ? "#16213e" : "#f3f4f6";

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-10 left-0 w-full pointer-events-none z-[9999] overflow-hidden"
    >
      <div ref={bikeWrapperRef} className="w-24 h-24 md:w-32 md:h-32 absolute bottom-0 left-[-5%] will-change-transform">
        
        {/* Tooltip */}
        <div 
          ref={tooltipRef}
          className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-white dark:bg-theme-surface shadow-xl border border-neutral-200 dark:border-neutral-800 text-xs md:text-sm font-bold text-theme-lightText dark:text-theme-text opacity-0 scale-50 origin-bottom whitespace-nowrap"
        >
          {tooltipText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-theme-surface border-b border-r border-neutral-200 dark:border-neutral-800 transform rotate-45"></div>
        </div>

        {/* Robot + Bike Group */}
        <div ref={bikeGroupRef} className="w-full h-full relative">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
                {/* Glow */}
                <defs>
                  <radialGradient id="bikeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="150" r="60" fill="url(#bikeGlow)" />

                {/* --- BICYCLE --- */}
                {/* Frame */}
                <path d="M 60 140 L 90 90 L 140 90 L 100 140 Z" fill="none" stroke={primary} strokeWidth="6" strokeLinejoin="round" />
                <line x1="90" y1="90" x2="80" y2="70" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                <line x1="140" y1="90" x2="150" y2="140" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                <line x1="140" y1="90" x2="130" y2="70" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                
                {/* Handlebars */}
                <path d="M 120 70 L 140 70 M 130 70 L 130 80" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                
                {/* Seat */}
                <rect x="70" y="65" width="20" height="8" rx="4" fill={accent} />

                {/* Back Wheel */}
                <g ref={backWheelRef} transform="translate(60, 140)">
                    <circle cx="0" cy="0" r="24" fill="none" stroke={primary} strokeWidth="4" />
                    <circle cx="0" cy="0" r="20" fill="none" stroke={secondary} strokeWidth="2" />
                    {/* Spokes */}
                    <line x1="-24" y1="0" x2="24" y2="0" stroke={primary} strokeWidth="2" />
                    <line x1="0" y1="-24" x2="0" y2="24" stroke={primary} strokeWidth="2" />
                    <circle cx="0" cy="0" r="4" fill={accent} />
                </g>

                {/* Front Wheel */}
                <g ref={frontWheelRef} transform="translate(150, 140)">
                    <circle cx="0" cy="0" r="24" fill="none" stroke={primary} strokeWidth="4" />
                    <circle cx="0" cy="0" r="20" fill="none" stroke={secondary} strokeWidth="2" />
                    {/* Spokes */}
                    <line x1="-24" y1="0" x2="24" y2="0" stroke={primary} strokeWidth="2" />
                    <line x1="0" y1="-24" x2="0" y2="24" stroke={primary} strokeWidth="2" />
                    <circle cx="0" cy="0" r="4" fill={accent} />
                </g>

                {/* --- ROBOT --- */}
                <g transform="translate(5, -15)">
                    {/* Body */}
                    <rect x="65" y="40" width="26" height="35" rx="8" fill={primary} />
                    {/* Head */}
                    <rect x="58" y="5" width="40" height="30" rx="10" fill={primary} />
                    <rect x="63" y="10" width="30" height="20" rx="6" fill={secondary} />
                    {/* Eyes */}
                    <rect x="68" y="15" width="6" height="8" rx="2" fill={accent} />
                    <rect x="82" y="15" width="6" height="8" rx="2" fill={accent} />
                    {/* Antenna */}
                    <line x1="78" y1="5" x2="78" y2="-5" stroke={primary} strokeWidth="3" strokeLinecap="round" />
                    <circle cx="78" cy="-8" r="4" fill={accent} className="animate-pulse" />
                    {/* Arms reaching to handlebars */}
                    <path d="M 85 50 Q 110 50 125 70" fill="none" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                    {/* Leg to pedal */}
                    <path d="M 75 70 Q 80 100 100 140" fill="none" stroke={primary} strokeWidth="6" strokeLinecap="round" />
                </g>
            </svg>
        </div>
      </div>
    </div>
  );
};

export default RobotBike;
