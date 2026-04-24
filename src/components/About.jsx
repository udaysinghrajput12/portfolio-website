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
    <section id="about" ref={sectionRef} className="py-40 md:py-64 px-6 md:px-16 lg:px-32 transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] relative z-10 w-full overflow-hidden">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-24 md:gap-32 w-full">
        <div className="w-full md:w-1/4 shrink-0">
          <h3 className="text-xs tracking-[0.2em] text-blue-600 dark:text-[#D4AF37] uppercase font-medium transition-colors duration-500">01. About</h3>
        </div>
        <div className="w-full md:w-3/4">
          <p ref={textRef} className="text-3xl md:text-5xl lg:text-7xl font-display font-light leading-[1.35] text-[#111111] dark:text-[#EAEAEA] max-w-5xl transition-colors duration-500">
            A precise MERN Stack Developer. <br/><br/>
            I engineer minimal, highly scalable architectures leveraging MongoDB, React, Node.js, and Microsoft Azure. My goal is bringing seamless, calm digital experiences to life.
          </p>
        </div>
      </div>
    </section>

  );
};

export default About;
