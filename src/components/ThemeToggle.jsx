import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, rotate: 15 }}
      onClick={toggleTheme}
      className={`
        fixed top-[20px] left-[20px] z-[1000]
        w-12 h-12 rounded-full flex items-center justify-center
        backdrop-blur-md border transition-all duration-500
        ${isDarkMode 
          ? 'bg-white/5 border-white/10 text-yellow-400 shadow-[0_0_20px_rgba(253,224,71,0.2)]' 
          : 'bg-black/5 border-black/10 text-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.2)]'
        }
      `}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {isDarkMode ? <FiMoon size={22} /> : <FiSun size={22} />}
      </motion.div>
      
      {/* Decorative Glow */}
      <div className={`
        absolute inset-0 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10
        ${isDarkMode ? 'bg-yellow-400/20' : 'bg-blue-600/20'}
      `} />
    </motion.button>
  );
};

export default ThemeToggle;
