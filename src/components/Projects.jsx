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
    <section id="projects" ref={sectionRef} className="w-full transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] relative py-40 md:py-64 z-20">
      
      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-32">
        <h3 className="text-xs tracking-[0.2em] text-blue-600 dark:text-[#D4AF37] uppercase mb-24 md:mb-48 font-medium transition-colors duration-500">Selected Works</h3>

        
        <div className="flex flex-col gap-40 md:gap-64">
          {projects.map((proj, idx) => (
            <div key={idx} ref={el => itemsRef.current[idx] = el} className="group cursor-none flex flex-col gap-12 md:gap-20">
              <h4 className="text-4xl md:text-6xl lg:text-[5.5rem] font-display font-medium leading-[1.05] text-[#111111] dark:text-[#EAEAEA] max-w-6xl transition-colors duration-500">
                {proj.title}
              </h4>
              
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start w-full mt-4">
                {/* Abstract shape representing project image/preview */}
                <div className={`relative w-full lg:w-[60%] aspect-[16/10] border flex items-center justify-center overflow-hidden transition-all duration-700 rounded-lg
                    ${idx % 2 === 0 
                      ? 'bg-blue-50 dark:bg-[#111116] border-blue-100 dark:border-neutral-900 group-hover:border-blue-600/20 group-hover:dark:border-[#D4AF37]/20' 
                      : 'bg-emerald-50 dark:bg-[#111116] border-emerald-100 dark:border-neutral-900 group-hover:border-emerald-600/20 group-hover:dark:border-[#D4AF37]/20'}
                `}>
                    {/* Animated Rotating Border Effect */}
                    <div className={`absolute w-[200%] h-[200%] animate-[spin_6s_linear_infinite] opacity-10 group-hover:opacity-40 transition-opacity duration-700
                        ${idx % 2 === 0 
                          ? 'bg-[conic-gradient(from_0deg,transparent_0_300deg,#2563EB_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_300deg,#D4AF37_360deg)]' 
                          : 'bg-[conic-gradient(from_0deg,transparent_0_300deg,#10b981_360deg)]'}
                    `}></div>
                    
                    {/* The Inner Animated Image Screen */}
                    <div className="absolute inset-[1px] bg-white dark:bg-[#111116] rounded-lg flex items-center justify-center z-10 transition-colors duration-700 group-hover:bg-[#F9FAFB] dark:group-hover:bg-[#0c0c0c] overflow-hidden">
                        
                        {/* Moving Grid Background */}
                        <div className="absolute top-[-20%] left-0 w-full h-[140%] bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:15px_15px] opacity-20 group-hover:opacity-50 transition-opacity" style={{ animation: 'slideGrid 2s linear infinite' }}></div>
                        
                        {/* Laser Scanline */}
                        <div className={`absolute left-0 w-full h-[1px] opacity-30 group-hover:opacity-80 transition-all duration-700
                            ${idx % 2 === 0 
                              ? 'bg-blue-600 dark:bg-[#D4AF37] shadow-[0_0_15px_rgba(37,99,235,1)] dark:shadow-[0_0_15px_#D4AF37]' 
                              : 'bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,1)]'
                            }
                        `} style={{ animation: 'scanLine 4s ease-in-out infinite' }}></div>

                        {/* Central Animated Content imitating an image/dashboard */}
                        <div className={`relative w-[70%] h-[60%] border backdrop-blur-md flex flex-col items-center justify-center gap-4 rounded transition-all duration-700 p-6
                            ${idx % 2 === 0 
                              ? 'border-blue-600/10 dark:border-[#D4AF37]/20 bg-blue-600/5 dark:bg-[#D4AF37]/5 group-hover:border-blue-600/40 dark:group-hover:border-[#D4AF37]/40 shadow-blue-500/5 dark:shadow-yellow-500/5 shadow-xl' 
                              : 'border-emerald-600/10 dark:border-[#D4AF37]/20 bg-emerald-600/5 dark:bg-[#D4AF37]/5 group-hover:border-emerald-600/40 dark:group-hover:border-[#D4AF37]/40 shadow-emerald-500/5 shadow-xl'}
                        `}>
                            
                            <svg className={`w-16 h-16 transform group-hover:scale-110 transition-all duration-700 animate-pulse
                                ${idx % 2 === 0 ? 'text-blue-600/30 dark:text-[#D4AF37]/30 group-hover:text-blue-600 dark:group-hover:text-[#D4AF37]' : 'text-emerald-600/30 group-hover:text-emerald-600'}
                            `} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite] origin-center" />
                                <circle cx="12" cy="12" r="6" strokeLinecap="round" />
                                <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            
                            <span className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] px-3 py-1 rounded shadow-inner transition-colors duration-500
                                ${idx % 2 === 0 
                                  ? 'text-blue-600 dark:text-[#D4AF37] bg-blue-600/10 dark:bg-[#D4AF37]/10' 
                                  : 'text-emerald-600 bg-emerald-600/10'}
                            `}>
                               Live Executing
                            </span>
                            
                            {/* Loading Bar Animation */}
                            <div className="absolute bottom-4 left-6 right-6 h-1 bg-black/5 dark:bg-white/10 rounded overflow-hidden">
                               <div className={`h-full rounded relative transition-colors duration-500
                                 ${idx % 2 === 0 ? 'bg-blue-600 dark:bg-[#D4AF37]/80' : 'bg-emerald-600'}`} 
                                 style={{ animation: 'progressBar 2.5s ease-in-out infinite' }}></div>
                            </div>

                        </div>
                    </div>
                </div>
                
                <div className="w-full lg:w-[40%] flex flex-col gap-8 lg:pt-8">
                  <p className="text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-400 leading-[1.8] transition-colors duration-500">
                    {proj.desc}
                  </p>
                  
                  {proj.link !== '#' && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex w-max items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#111111] dark:text-[#EAEAEA] hover:text-blue-600 dark:hover:text-[#D4AF37] transition-colors duration-500 pointer-events-auto cursor-none mt-8">
                      <span className="border-b border-black/10 dark:border-white/20 pb-2 group-hover:border-blue-600/50 dark:group-hover:border-[#D4AF37]/50 transition-colors">View Case Study</span>
                    </a>
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
