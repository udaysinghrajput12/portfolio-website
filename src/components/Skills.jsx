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
    <section id="skills" ref={containerRef} className="py-40 md:py-64 px-6 md:px-16 lg:px-32 transition-colors duration-500 bg-[#F9FAFB] dark:bg-[#0B0B0F] border-t border-black/5 dark:border-white/5 relative z-10 w-full">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-24 md:gap-32 w-full">
        
        <div className="w-full md:w-1/4 shrink-0">
          <h3 className="text-xs tracking-[0.2em] text-blue-600 dark:text-[#D4AF37] uppercase font-medium transition-colors duration-500">Core Capabilities</h3>
        </div>

        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {skillGroups.map((group, idx) => (
            <div key={idx} ref={el => groupsRef.current[idx] = el} className="flex flex-col gap-8">
              <h4 className="text-xs tracking-[0.15em] text-neutral-400 dark:text-neutral-600 uppercase pb-4 border-b border-black/5 dark:border-white/5 transition-colors duration-500">{group.category}</h4>
              <ul className="flex flex-col gap-4">
                {group.items.map((item, i) => (
                  <li key={i} className="text-xl md:text-2xl font-light text-[#111111] dark:text-[#EAEAEA] transition-colors duration-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>

  );
};

export default Skills;
