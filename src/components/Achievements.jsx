import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const items = [
    { label: "IEEE Research Paper Published" },
    { label: "State Rank (Olympiad)" },
    { label: "1st Prize District Quiz" }
  ];

  useEffect(() => {
    cardsRef.current.forEach((el, index) => {
      // Staggered reveal
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Unique anti-gravity speeds for each card
      gsap.to(el, {
        yPercent: -20 + (index * -5),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-40 md:py-64 px-6 md:px-16 lg:px-32 transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] border-t border-black/5 dark:border-white/5 relative w-full overflow-hidden">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-24 md:gap-32 w-full">
        
        <div className="w-full md:w-1/4 shrink-0">
          <h3 className="text-xs tracking-[0.2em] text-blue-600 dark:text-[#D4AF37] uppercase font-medium mb-12 md:mb-0 transition-colors duration-500">Benchmarks</h3>
        </div>

        <div className="w-full md:w-3/4 border-t border-b border-black/5 dark:border-white/5 py-12 md:py-24 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {items.map((item, idx) => (
                    <div key={idx} ref={el => cardsRef.current[idx] = el} className="flex flex-col items-start justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-0 border-black/5 dark:border-white/5 w-full transform will-change-transform transition-colors duration-500">
                        <span className="text-xs tracking-[0.1em] text-neutral-400 dark:text-neutral-600 mb-6 transition-colors duration-500">0{idx + 1}</span>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-[#111111] dark:text-[#EAEAEA] leading-tight transition-colors duration-500">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>

  );
};

export default Achievements;
