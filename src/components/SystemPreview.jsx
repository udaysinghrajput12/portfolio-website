import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SystemPreview = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    // Elegant fade-in + slight upward slide
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
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

    gsap.fromTo(visualRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          delay: 0.2, // slight offset for the visual
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
    );

  }, []);

  return (
    <section ref={sectionRef} className="py-40 md:py-64 px-6 md:px-16 lg:px-32 bg-[#0B0B0F] relative z-20 w-full overflow-hidden border-t border-white/5">
      <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between gap-24 lg:gap-32 w-full">
        
        {/* Left Side: Minimal Text Content */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-12">
          <h3 className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase font-medium">System Preview</h3>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-light leading-[1.1] text-[#EAEAEA] max-w-2xl">
            Executing scalable solutions with modern technologies.
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-500 font-light max-w-lg leading-relaxed">
            Focused on robust architectures that handle heavy data securely while pushing pristine logic straight to the client interface.
          </p>
        </div>

        {/* Right Side: Simple Minimalist Visual Placeholder */}
        <div ref={visualRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-[80vw] h-[80vw] md:w-[25rem] md:h-[25rem] rounded-full border border-neutral-900 bg-gradient-to-tr from-transparent to-[#D4AF37]/5 flex items-center justify-center relative overflow-hidden">
               {/* Very subtle static geometry logic lines inside */}
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
               <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-[0.5px] border-[#D4AF37]/20"></div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default SystemPreview;
