import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  { category: "Languages", items: ["C++", "JavaScript", "TypeScript", "C#"] },
  { category: "Frontend", items: ["HTML", "CSS", "React.js"] },
  { category: "Backend", items: ["Node.js", "Express.js"] },
  { category: "Database", items: ["MongoDB", "MySQL", "SQL Server"] },
  { category: "Tools", items: ["Azure", "Power BI", "Postman", "REST APIs"] },
];

const Skills = () => {
  const containerRef = useRef(null);
  const groupsRef = useRef([]);

  useEffect(() => {
    groupsRef.current.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
      
      // Gentle anti-gravity upward pull
      gsap.to(el, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 md:py-48 transition-colors duration-500 bg-theme-lightBg dark:bg-theme-bg relative z-10 w-full overflow-hidden">
      
      {/* Decorative track representing the journey */}
      <div className="absolute left-12 md:left-24 top-0 w-1 h-full bg-gradient-to-b from-transparent via-theme-lightSecondary/20 dark:via-theme-secondary/20 to-transparent -z-10 hidden md:block"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row gap-16 md:gap-32 relative">
        
        <div className="w-full md:w-1/3 shrink-0">
          <div className="inline-block px-4 py-2 rounded-full bg-theme-lightAccent/20 dark:bg-theme-accent/20 text-theme-lightAccent dark:text-theme-accent text-sm font-bold tracking-wider uppercase mb-6">
            Chapter 2: The Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-theme-lightText dark:text-theme-text mb-6">
            Tools of the trade
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            A craftsman is only as good as their tools. Here are the technologies I've mastered to bring ideas to life.
          </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-wrap gap-4 md:gap-6">
          {skillGroups.map((group, idx) => (
            <div key={idx} ref={el => groupsRef.current[idx] = el} className="flex flex-wrap gap-3 mb-8 w-full">
              <div className="w-full text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">{group.category}</div>
              {group.items.map((item, i) => (
                <div key={i} className="px-6 py-3 rounded-2xl bg-white dark:bg-theme-surface border border-neutral-200 dark:border-neutral-800 text-theme-lightText dark:text-theme-text font-medium shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>

  );
};

export default Skills;
