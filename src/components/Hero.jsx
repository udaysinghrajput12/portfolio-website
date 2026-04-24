import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Avatar from './Avatar';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    tl.fromTo(textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' },
      "-=0.5"
    );
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 bg-theme-lightBg dark:bg-theme-bg m-0">
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-lightAccent/20 dark:bg-theme-secondary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-theme-lightSecondary/20 dark:bg-theme-accent/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 w-full z-10">
        
        <div ref={textRef} className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-6 pt-24 md:pt-0">
          <div className="inline-block px-4 py-2 rounded-full bg-white dark:bg-theme-surface shadow-sm border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            👋 Welcome to my universe
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-theme-lightText dark:text-theme-text leading-[1.1]">
            Hi, I'm <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-lightAccent to-theme-lightSecondary dark:from-theme-accent dark:to-theme-secondary">Uday Pratap.</span>
          </h1>
          <p className="text-xl md:text-2xl font-sans text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
            I craft playful, scalable web systems and turn complex problems into delightful user experiences.
          </p>
          
          <div className="flex gap-4 mt-8">
            <a href="#projects" className="px-8 py-4 rounded-2xl bg-theme-lightAccent dark:bg-theme-accent text-white dark:text-theme-bg font-bold shadow-lg shadow-theme-lightAccent/30 dark:shadow-theme-accent/30 hover:-translate-y-1 transition-transform">
              Explore my world
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end pb-24 md:pb-0">
          <Avatar isDarkMode={isDarkMode} />
        </div>

      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-xs font-bold tracking-widest uppercase text-neutral-500">Scroll to begin</span>
        <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  );
};

export default Hero;
