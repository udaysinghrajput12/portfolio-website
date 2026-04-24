import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const projects = [
    {
      title: 'Retail Order & Inventory Optimization Platform',
      desc: 'A robust full-stack solution leveraging Node.js, Microsoft Azure, and Power BI. Designed to systematically eliminate low-stock scenarios and streamline enterprise inventory workflows.',
      link: 'https://github.com/udaysinghrajput12/Retail-Order-Inventory-Optimization-Platform'
    },
    {
      title: 'ANIDEX \u2013 Animal Detection App',
      desc: 'An AI-driven ecosystem featuring computer vision and machine learning. Capable of classifying 50+ species at ~90% accuracy while delivering smart dietary recommendations.',
      link: '#'
    }
  ];

  useEffect(() => {
    itemsRef.current.forEach((el) => {
      // Very gentle fade slide
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          }
        }
      );

      // Scroll opposing anti-gravity
      gsap.to(el, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="w-full transition-colors duration-500 bg-white dark:bg-theme-surface relative py-32 md:py-48 z-20 overflow-hidden">
      
      {/* Decorative winding path */}
      <svg className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full -z-10 opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 1000">
        <path d="M 50 0 Q 80 100 50 200 T 50 400 T 50 600 T 50 800 T 50 1000" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-theme-lightAccent dark:text-theme-accent" />
      </svg>

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-24 md:mb-32 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-theme-lightSecondary/20 dark:bg-theme-secondary/20 text-theme-lightSecondary dark:text-theme-secondary text-sm font-bold tracking-wider uppercase mb-6">
            Chapter 3: The Quests
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-theme-lightText dark:text-theme-text max-w-2xl">
            Adventures in code and logic
          </h2>
        </div>
        
        <div className="flex flex-col gap-32 md:gap-48 relative">
          {projects.map((proj, idx) => (
            <div key={idx} ref={el => itemsRef.current[idx] = el} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}>
              
              <div className="w-full md:w-1/2 flex justify-center">
                <div className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500 ${idx % 2 === 0 ? 'bg-gradient-to-br from-theme-lightAccent to-theme-lightSecondary dark:from-theme-accent dark:to-theme-secondary' : 'bg-gradient-to-br from-emerald-400 to-teal-600'} p-1`}>
                   <div className="w-full h-full bg-white dark:bg-theme-bg rounded-[calc(1.5rem-4px)] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      {/* Playful abstract icon representing project */}
                      <div className="w-24 h-24 mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center animate-[bounce_3s_infinite]">
                         <span className="text-4xl">{idx % 2 === 0 ? '📦' : '🐾'}</span>
                      </div>
                      <h4 className="text-xl font-display font-bold text-theme-lightText dark:text-theme-text mb-2 z-10">{proj.title}</h4>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none"></div>
                   </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <span className="text-6xl md:text-8xl font-black text-neutral-100 dark:text-neutral-800/50 -mb-8 md:-mb-12 z-0 font-display">0{idx + 1}</span>
                <div className="bg-white/80 dark:bg-theme-surface/80 backdrop-blur-md p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xl z-10 w-full relative">
                  <h4 className="text-2xl md:text-3xl font-display font-bold text-theme-lightText dark:text-theme-text mb-4">
                    {proj.title}
                  </h4>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    {proj.desc}
                  </p>
                  
                  {proj.link !== '#' ? (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-lightText dark:bg-theme-text text-white dark:text-theme-bg font-bold hover:scale-105 transition-transform shadow-lg">
                      Explore Quest 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                  ) : (
                    <span className="inline-flex px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 font-bold cursor-not-allowed">
                      Quest Locked
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Projects;
