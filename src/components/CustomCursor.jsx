import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Fast tracking for the main dot
      gsap.to(cursor, {
        x,
        y,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Smooth tracking for the follower circle
      gsap.to(follower, {
        x,
        y,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1.5, 
        backgroundColor: '#d0ff00', 
        mixBlendMode: 'difference',
        duration: 0.3 
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'transparent', 
        mixBlendMode: 'normal',
        duration: 0.3 
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Add magnetic hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, select, .magnetic');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-light-secondary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-300"
      />
    </>
  );
};

export default CustomCursor;
