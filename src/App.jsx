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
import RobotBike3D from './components/RobotBike3D';







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
      <RobotBike3D />
      <CustomCursor />

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
