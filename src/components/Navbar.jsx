import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';


const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Training', href: '#training' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 pt-5 px-6 md:px-12 pointer-events-none`}
    >
      <div 
        className={`max-w-5xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 pointer-events-auto
          ${scrolled 
            ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg' 
            : 'bg-transparent border border-transparent'
          }
        `}
      >
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => scrollToSection(e, '#')}
          className="text-xl font-display font-medium tracking-tight text-[#111111] dark:text-[#EAEAEA]"
        >
          UP<span className="text-blue-600 dark:text-[#D4AF37]">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-sm uppercase tracking-[0.2em] transition-all duration-300 relative group
                ${activeSection === item.href.slice(1) 
                  ? 'text-blue-600 dark:text-[#D4AF37]' 
                  : 'text-neutral-500 hover:text-[#111111] dark:hover:text-[#EAEAEA]'
                }
              `}
            >
              {item.name}
              <span 
                className={`absolute -bottom-1 left-0 h-[1.5px] bg-blue-600 dark:bg-[#D4AF37] transition-all duration-300
                  ${activeSection === item.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
              />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeToggle standalone={false} />
          </div>
          <button 
            className="md:hidden text-[#111111] dark:text-[#EAEAEA] p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-6 right-6 md:hidden pointer-events-auto"
          >
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-white/10 p-8 shadow-2xl overflow-hidden">
              <div className="flex flex-col gap-6">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`text-2xl font-display font-light tracking-wide py-2 border-b border-black/5 dark:border-white/5 last:border-0
                      ${activeSection === item.href.slice(1) 
                        ? 'text-blue-600 dark:text-[#D4AF37]' 
                        : 'text-neutral-600 dark:text-neutral-400'
                      }
                    `}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">Theme</span>
                  <ThemeToggle standalone={false} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
