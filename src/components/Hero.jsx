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
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] m-0">
      
      {/* 3D Core Scene Background */}
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-blue-600 dark:text-yellow-600 text-xs tracking-[0.3em] font-mono animate-pulse">INITIALIZING 3D WORKSPACE...</div>}>
          <HeroScene />
      </Suspense>

      {/* HTML Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-16 lg:px-32 pb-24 md:pb-32 pointer-events-none">
        <div ref={overlayRef} className="max-w-5xl will-change-transform">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium tracking-tight text-[#111111] dark:text-[#EAEAEA] mb-2 leading-tight drop-shadow-2xl pointer-events-auto w-max transition-colors duration-500">
            Uday Pratap.
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-light text-neutral-600 dark:text-neutral-400 leading-tight drop-shadow-lg transition-colors duration-500">
            Building scalable web systems.
          </h2>
          
          <p className="mt-8 text-xs md:text-sm text-blue-600 dark:text-[#D4AF37] uppercase tracking-[0.2em] font-medium drop-shadow-md bg-white/50 dark:bg-black/50 backdrop-blur-sm w-max px-4 py-2 rounded-full hidden md:block transition-all duration-500 shadow-sm border border-black/5 dark:border-white/5">
            MERN Stack Developer <span className="mx-3 text-neutral-400 dark:text-neutral-500">|</span> Azure <span className="mx-3 text-neutral-400 dark:text-neutral-500">|</span> AI
          </p>
        </div>
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-black/30 dark:text-white/30 tracking-[0.3em] font-mono animate-pulse pointer-events-none z-10 text-center w-full transition-colors duration-500">
        CLICK + DRAG TO EXPLORE OR SCROLL DOWN
      </div>
    </section>

  );
};
export default Hero;
