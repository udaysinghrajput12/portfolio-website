import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Avatar = ({ isDarkMode }) => {
  const eyeLeft = useRef(null);
  const eyeRight = useRef(null);
  const head = useRef(null);
  const body = useRef(null);

  useEffect(() => {
    // Floating animation
    gsap.to(head.current, {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });

    gsap.to(body.current, {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      delay: 0.2
    });

    // Blinking
    const blink = () => {
      gsap.to([eyeLeft.current, eyeRight.current], {
        scaleY: 0.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.delayedCall(Math.random() * 3 + 2, blink);
        }
      });
    };
    gsap.delayedCall(2, blink);

    // Mouse tracking
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(head.current, {
        x: x,
        rotationY: x,
        rotationX: -y,
        duration: 0.5
      });
      gsap.to([eyeLeft.current, eyeRight.current], {
        x: x * 1.5,
        y: y * 1.5,
        duration: 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf([eyeLeft.current, eyeRight.current, head.current, body.current]);
    };
  }, []);

  const primary = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const secondary = isDarkMode ? "#1a1a2e" : "#fdfbf7";
  const accent = isDarkMode ? "#ffb703" : "#fb8500";

  return (
    <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow */}
        <circle cx="100" cy="100" r="80" fill="url(#glow)" />

        {/* Body */}
        <g ref={body}>
          <rect x="70" y="120" width="60" height="50" rx="15" fill={primary} />
          <path d="M 75 140 L 60 160 M 125 140 L 140 160" stroke={primary} strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Head */}
        <g ref={head}>
          <rect x="50" y="40" width="100" height="80" rx="30" fill={primary} />
          
          {/* Antenna */}
          <line x1="100" y1="40" x2="100" y2="20" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="15" r="8" fill={accent} className="animate-pulse" />

          {/* Screen */}
          <rect x="60" y="55" width="80" height="50" rx="15" fill={secondary} />
          
          {/* Eyes */}
          <g transform="origin-center">
            <rect ref={eyeLeft} x="75" y="70" width="15" height="20" rx="5" fill={accent} />
            <rect ref={eyeRight} x="110" y="70" width="15" height="20" rx="5" fill={accent} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Avatar;
