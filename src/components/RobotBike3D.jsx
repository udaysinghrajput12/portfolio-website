import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, Float } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

const RobotBikeModel = ({ isDarkMode, progressRef }) => {
  const groupRef = useRef();
  const frontWheelRef = useRef();
  const backWheelRef = useRef();
  
  const accentColor = isDarkMode ? "#ffb703" : "#fb8500";
  const bodyColor = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const frameColor = isDarkMode ? "#3b82f6" : "#2563eb";

  // Create a 3D curved path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, 4, -2),    // Start (Hero)
      new THREE.Vector3(5, 2, 2),      // About
      new THREE.Vector3(-5, 0, 1),     // Projects
      new THREE.Vector3(6, -2, -1),    // Skills
      new THREE.Vector3(0, -4, 4)      // End (Contact)
    ], false, 'centripetal', 0.5);
  }, []);

  useFrame((state, delta) => {
    // Scroll progress (0 to 1)
    const p = Math.max(0, Math.min(1, progressRef.current));
    
    // Position on curve
    const position = curve.getPoint(p);
    groupRef.current.position.lerp(position, 0.1);

    // Look at tangent (Orientation)
    // We get a point slightly ahead to calculate tangent
    const pNext = Math.min(1, p + 0.01);
    const targetPosition = curve.getPoint(pNext);
    
    // Smoothly rotate towards the target direction
    const dummy = new THREE.Object3D();
    dummy.position.copy(groupRef.current.position);
    dummy.lookAt(targetPosition);
    groupRef.current.quaternion.slerp(dummy.quaternion, 0.05);

    // Continuous wheel rotation (speed proportional to scroll delta would be cooler, but continuous is requested)
    const speed = 15;
    if (frontWheelRef.current && backWheelRef.current) {
      frontWheelRef.current.rotation.x -= delta * speed;
      backWheelRef.current.rotation.x -= delta * speed;
    }
  });

  return (
    <group ref={groupRef} scale={[0.6, 0.6, 0.6]}>
      {/* Floating offset & idle animation */}
      <Float speed={4} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        
        {/* Glow / Shadow */}
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1, 32]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.2} />
        </mesh>

        <group rotation={[0, Math.PI / 2, 0]}>
          {/* Wheels */}
          <group ref={backWheelRef} position={[0, -0.2, -0.8]}>
            <mesh>
              <torusGeometry args={[0.3, 0.05, 16, 32]} />
              <meshStandardMaterial color={bodyColor} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.6]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
          </group>

          <group ref={frontWheelRef} position={[0, -0.2, 0.8]}>
            <mesh>
              <torusGeometry args={[0.3, 0.05, 16, 32]} />
              <meshStandardMaterial color={bodyColor} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.6]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
          </group>

          {/* Frame */}
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.4]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>
          <mesh position={[0, 0.4, -0.4]} rotation={[-Math.PI / 6, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>
          <mesh position={[0, 0.4, 0.4]} rotation={[Math.PI / 6, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshStandardMaterial color={frameColor} />
          </mesh>

          {/* Robot */}
          <group position={[0, 0.8, 0]}>
            {/* Body */}
            <mesh>
              <boxGeometry args={[0.4, 0.6, 0.5]} />
              <meshStandardMaterial color={bodyColor} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.4, 0.3, 0.4]} />
              <meshStandardMaterial color={bodyColor} />
            </mesh>
            {/* Visor */}
            <mesh position={[0, 0.5, 0.21]}>
              <planeGeometry args={[0.3, 0.15]} />
              <meshBasicMaterial color="#111" />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.08, 0.5, 0.22]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>
            <mesh position={[0.08, 0.5, 0.22]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>
            {/* Antenna */}
            <mesh position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.2]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
};

const RobotBike3D = () => {
  const { isDarkMode } = useTheme();
  const progressRef = useRef(0);
  const [tooltip, setTooltip] = useState("");
  
  // Section text mapping based on scroll thresholds
  const sections = [
    { threshold: 0.1, text: "Let's Ride! 🚲" },
    { threshold: 0.3, text: "About Me 👋" },
    { threshold: 0.5, text: "My Projects 🚀" },
    { threshold: 0.7, text: "My Skills 💻" },
    { threshold: 0.9, text: "Let's Connect 📩" }
  ];

  useEffect(() => {
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    const handleResize = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const progress = currentScroll / maxScroll;
      progressRef.current = progress;
      
      // Update tooltips
      const activeSection = sections.reduce((prev, curr) => {
        return Math.abs(curr.threshold - progress) < 0.05 ? curr : prev;
      }, null);
      
      if (activeSection && tooltip !== activeSection.text) {
        setTooltip(activeSection.text);
      } else if (!activeSection && tooltip !== "") {
        setTooltip("");
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Init
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tooltip]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: false }}
      >
        <ambientLight intensity={isDarkMode ? 0.4 : 1} />
        <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 1 : 2} />
        <directionalLight position={[-10, -10, -5]} intensity={isDarkMode ? 0.5 : 1} color="#3b82f6" />
        
        <RobotBikeModel isDarkMode={isDarkMode} progressRef={progressRef} />
        
        {/* Environment map for realistic reflections without heavy lights */}
        <Environment preset={isDarkMode ? "city" : "apartment"} />
      </Canvas>
      
      {/* HTML Tooltip Layer */}
      {tooltip && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-theme-surface border border-neutral-200 dark:border-neutral-800 text-theme-lightText dark:text-theme-text font-bold px-6 py-3 rounded-full shadow-2xl animate-bounce pointer-events-auto">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default RobotBike3D;
