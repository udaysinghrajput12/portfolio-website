import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Beautiful fade + upward drift for About text
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    // Subtle Anti-gravity
    gsap.to(textRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 transition-colors duration-500 bg-theme-lightBg dark:bg-theme-bg relative z-10 w-full overflow-hidden">
      
      {/* Playful background element */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-theme-lightSecondary/10 dark:bg-theme-secondary/10 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-[spin_8s_linear_infinite] -z-10"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 w-full bg-white/50 dark:bg-theme-surface/50 backdrop-blur-md p-8 md:p-16 rounded-[3rem] border border-neutral-200 dark:border-neutral-800 shadow-xl">
        <div className="w-full md:w-1/3 shrink-0 flex justify-center">
           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-theme-lightAccent to-theme-lightSecondary dark:from-theme-accent dark:to-theme-secondary flex items-center justify-center shadow-lg shadow-theme-lightAccent/20 dark:shadow-theme-accent/20 overflow-hidden relative">
              {/* Cute abstract face/graphic inside */}
              <div className="w-24 h-24 bg-white/20 rounded-full flex gap-4 items-center justify-center">
                 <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                 <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
           </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="inline-block px-4 py-2 rounded-full bg-theme-lightSecondary/20 dark:bg-theme-secondary/20 text-theme-lightSecondary dark:text-theme-secondary text-sm font-bold tracking-wider uppercase mb-6">
            Chapter 1: The Origin
          </div>
          <p ref={textRef} className="text-2xl md:text-4xl lg:text-5xl font-display font-medium leading-[1.4] text-theme-lightText dark:text-theme-text transition-colors duration-500">
            I'm a <span className="text-theme-lightAccent dark:text-theme-accent">MERN Stack Developer</span> who loves turning complex spaghetti code into beautiful, scalable architectures. <br/><br/>
            Whether it's building robust APIs with Node.js or painting pixels with React, my ultimate goal is simple: <span className="text-theme-lightSecondary dark:text-theme-secondary">delightful digital experiences</span>.
          </p>
        </div>
      </div>
    </section>

  );
};

export default About;
