import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    // Parallax & smooth fade in of "Get in touch"
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: 'power3.out',
        scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
        }
      }
    );

    gsap.to(textRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });

    // Fade links
    gsap.fromTo(linksRef.current.children,
        { opacity: 0, y: 30 },
        { 
            opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: {
                trigger: linksRef.current,
                start: 'top 90%',
            }
        }
    );

  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-40 md:py-64 px-6 md:px-16 lg:px-32 transition-colors duration-500 bg-transparent border-t border-black/5 dark:border-white/5 relative flex flex-col justify-center items-center overflow-hidden w-full m-0 min-h-[90vh]">
      
      <div ref={textRef} className="text-center w-full flex flex-col items-center gap-16 md:gap-32 w-full transform will-change-transform z-10 font-display">
        <h2 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-light text-[#111111] dark:text-[#EAEAEA] leading-none tracking-tight transition-colors duration-500">
            Get in touch.
        </h2>
        
        <div ref={linksRef} className="flex flex-wrap justify-center gap-10 md:gap-20 text-sm md:text-base uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-500 font-medium font-sans transition-colors duration-500">
            <a href="mailto:pratap33888@gmail.com" className="hover:text-blue-600 dark:hover:text-[#D4AF37] transition-colors duration-300 cursor-none relative group transition-colors duration-500">
                Email
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-600 dark:bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="https://www.linkedin.com/in/uday032/" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-[#D4AF37] transition-colors duration-300 cursor-none relative group transition-colors duration-500">
                LinkedIn
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-600 dark:bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="https://github.com/udaysinghrajput12" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-[#D4AF37] transition-colors duration-300 cursor-none relative group transition-colors duration-500">
                GitHub
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-600 dark:bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
            </a>
        </div>
        
        <a 
            href="/resume.pdf" 
            download="Uday-Pratap-Resume.pdf"
            className="mt-20 md:mt-24 inline-flex items-center gap-4 px-8 py-4 rounded-full border border-black/10 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-blue-600 dark:hover:border-[#D4AF37] hover:text-[#111111] dark:hover:text-[#EAEAEA] hover:bg-blue-600/5 dark:hover:bg-[#D4AF37]/5 transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer z-20 group transition-colors duration-500"
        >
            <span className="uppercase tracking-[0.1em] text-xs font-medium">Download Resume</span>
            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        </a>

      </div>

      <div className="absolute bottom-10 left-0 w-full px-6 md:px-16 lg:px-32 flex justify-between items-center text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.1em] transition-colors duration-500 font-sans">
          <span>© 2026 Uday Pratap.</span>
          <span>Designed with Precision.</span>
      </div>

    </section>

  );
};

export default Contact;
