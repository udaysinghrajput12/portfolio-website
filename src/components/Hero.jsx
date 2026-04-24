import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import HeroScene from './HeroScene';

const Hero = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Elegant Text Overlay Reveal
    gsap.fromTo(overlayRef.current.children,
      { y: 40, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 1 }
    );
  }, []);

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center overflow-hidden transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] m-0">
      
      {/* 3D Core Scene Background */}
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-blue-600 dark:text-yellow-600 text-xs tracking-[0.3em] font-mono animate-pulse">INITIALIZING 3D WORKSPACE...</div>}>
          <HeroScene />
      </Suspense>

      {/* HTML Overlay */}
      <div className="absolute inset-0 z-50 flex flex-col justify-end p-6 md:p-16 lg:px-32 pb-24 md:pb-32 pointer-events-none">
        <div ref={overlayRef} className="max-w-5xl will-change-transform relative group">
          
          {/* Premium Glassmorphism Panel - subtle but always present for readability */}
          <div className="absolute -inset-8 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] rounded-[2rem] -z-10 opacity-100 transition-all duration-700 hidden md:block border border-white/20 dark:border-white/5" />
          
          {/* Subtle Gradient Overlay - the primary readability booster */}
          <div className="absolute -inset-x-32 -inset-y-16 bg-gradient-to-r from-white/80 via-white/40 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent -z-20 blur-3xl opacity-100 transition-all duration-700" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium tracking-tight text-[#111111] dark:text-[#EAEAEA] mb-2 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] pointer-events-auto w-max transition-all duration-500">
            Uday Pratap.
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-light text-neutral-800 dark:text-neutral-300 leading-tight drop-shadow-md transition-all duration-500 max-w-3xl">
            Building scalable web systems.
          </h2>
          
          <p className="mt-8 text-xs md:text-sm text-blue-700 dark:text-[#D4AF37] uppercase tracking-[0.2em] font-bold drop-shadow-sm bg-white/60 dark:bg-black/60 backdrop-blur-md w-max px-6 py-2.5 rounded-full hidden md:flex items-center gap-2 transition-all duration-500 shadow-xl border border-white/50 dark:border-white/10">
            MERN Stack Developer <span className="mx-2 text-neutral-400 dark:text-neutral-600 opacity-50">|</span> Azure <span className="mx-2 text-neutral-400 dark:text-neutral-600 opacity-50">|</span> AI
          </p>
        </div>
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-black/40 dark:text-white/30 tracking-[0.4em] font-mono animate-pulse pointer-events-none z-50 text-center w-full transition-colors duration-500">
        CLICK + DRAG TO EXPLORE OR SCROLL DOWN
      </div>
    </section>

  );
};
export default Hero;
