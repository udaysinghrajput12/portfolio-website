import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';
import Robot3D from './Robot3D';

// Lightweight floating particles
const Particles = ({ isDarkMode }) => {
  const count = 150;
  const mesh = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random positions and factors
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      // Update time
      t = particle.t += speed / 2;
      
      // Calculate oscillation
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Update dummy object
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      // Add slight rotation
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.scale.set(s * 0.5, s * 0.5, s * 0.5);
      dummy.updateMatrix();
      
      // Apply to instanced mesh
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial 
        color={isDarkMode ? "#3b82f6" : "#fb8500"} 
        roughness={0.5} 
        transparent 
        opacity={0.3} 
        wireframe
      />
    </instancedMesh>
  );
};

const CameraRig = () => {
  useFrame((state) => {
    // Very subtle camera parallax tied to scroll & mouse
    const scrollY = window.scrollY;
    // Map scroll to Y position slightly
    const targetY = -(scrollY * 0.002);
    
    // Mouse parallax
    const targetX = (state.pointer.x * 2);
    const targetZ = 10 + (state.pointer.y * 1);

    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    state.camera.lookAt(0, targetY, 0);
  });
  return null;
};

const BackgroundScene = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ background: isDarkMode ? '#0B0B0F' : '#F9FAFB' }}>
      <Canvas 
        dpr={[1, 1.5]} // Performance optimized DPR
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: false, alpha: false }} // Disable antialias for performance, we use post/dpr
      >
        <color attach="background" args={[isDarkMode ? '#050508' : '#e5e7eb']} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={[isDarkMode ? '#050508' : '#e5e7eb', 10, 40]} />

        {/* Lighting */}
        <ambientLight intensity={isDarkMode ? 0.3 : 1} />
        <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 1 : 2} color={isDarkMode ? "#ffffff" : "#ffeedd"} />
        <directionalLight position={[-10, -10, -5]} intensity={isDarkMode ? 0.5 : 0.5} color="#3b82f6" />

        {/* Objects */}
        <Particles isDarkMode={isDarkMode} />
        {isDarkMode && <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}
        
        <Robot3D />
        
        <CameraRig />
      </Canvas>
      
      {/* HTML Overlay Gradient for text readability */}
      <div className={`absolute inset-0 pointer-events-none mix-blend-overlay ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]' : 'bg-white/40'}`}></div>
    </div>
  );
};

export default BackgroundScene;
