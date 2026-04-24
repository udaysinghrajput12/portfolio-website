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
import BackgroundScene from './components/BackgroundScene';





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

      {/* Global 3D Background */}
      <BackgroundScene />
      
      {/* App Content Wrapper - Transparent to show 3D background */}
      <div className="flex flex-col w-full relative transition-colors duration-500 bg-transparent text-theme-lightText dark:text-theme-text z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Hero />
        </div>
        <div className="pointer-events-auto">
          <About />
        </div>
        <div className="pointer-events-auto">
          <SystemPreview />
        </div>
        <div className="pointer-events-auto">
          <Projects />
        </div>
        <div className="pointer-events-auto">
          <Skills />
        </div>
        <div className="pointer-events-auto">
          <Experience />
        </div>
        <div className="pointer-events-auto">
          <Achievements />
        </div>
        <div className="pointer-events-auto">
          <Contact />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

