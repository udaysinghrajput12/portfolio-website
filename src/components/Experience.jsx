import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Line grow animation
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        transformOrigin: "top center",
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    // Content fade upwards
    gsap.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        }
      }
    );

    // Parallax on the text block
    gsap.to(contentRef.current, {
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
    <section id="training" ref={sectionRef} className="py-40 md:py-64 px-6 md:px-16 lg:px-32 transition-colors duration-500 bg-transparent border-t border-black/5 dark:border-white/5 relative w-full">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-24 md:gap-32 w-full">
        
        <div className="w-full md:w-1/4 shrink-0">
          <h3 className="text-xs tracking-[0.2em] text-blue-600 dark:text-[#D4AF37] uppercase font-medium transition-colors duration-500">Trajectory</h3>
        </div>

        <div className="w-full md:w-3/4 flex gap-12 relative min-h-[30vh]">
            {/* Timeline Bar */}
            <div className="w-[1px] bg-black/5 dark:bg-white/5 relative self-stretch hidden md:block transition-colors duration-500">
                <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-blue-600 dark:bg-[#D4AF37] transition-colors duration-500"></div>
            </div>
            
            <div ref={contentRef} className="flex flex-col gap-6 md:py-12 w-full">
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600 transition-colors duration-500">2 Months Intensive Training</span>
                <h4 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-[#111111] dark:text-[#EAEAEA] leading-tight max-w-2xl transition-colors duration-500">
                    Wipro NGA Pre-Skilling Program
                </h4>
                <p className="text-xl md:text-2xl font-light text-neutral-600 dark:text-neutral-400 mt-4 transition-colors duration-500">
                    Mastered full-stack enterprise paradigms using .NET, React.js, and Node integrating scalable SQL/NoSQL architectures.
                </p>
            </div>
        </div>

      </div>
    </section>

  );
};

export default Experience;
