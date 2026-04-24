import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import SystemPreview from './components/SystemPreview';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <Navbar />
      <CustomCursor />
      
      {/* Global Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay opacity-10 dark:opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}></div>
      <div className="fixed inset-0 pointer-events-none z-[99] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_120%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-50 dark:opacity-80 mix-blend-multiply"></div>

      
      <div className="flex flex-col w-full relative transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] text-[#111111] dark:text-[#EAEAEA]">
        <Hero />
        <About />
        <SystemPreview />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;

