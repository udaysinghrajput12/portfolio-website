import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

const OrbitingSkills = ({ isDarkMode }) => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
        group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const skills = [
    { name: "React", color: "#61dafb", offset: 0 },
    { name: "Node.js", color: "#68a063", offset: Math.PI / 2 },
    { name: "MongoDB", color: "#47a248", offset: Math.PI },
    { name: "Azure", color: "#0089d6", offset: Math.PI * 1.5 },
  ];

  return (
    <group ref={group} position={[0, 0, 0]}>
      {skills.map((skill, i) => (
        <mesh key={i} position={[Math.cos(skill.offset) * 4.5, Math.sin(skill.offset) * 0.8, Math.sin(skill.offset) * 4.5]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={1} wireframe />
          <Html distanceFactor={8} position={[0, -0.8, 0]}>
              <div className={`text-[12px] uppercase tracking-[0.3em] font-bold pointer-events-none transition-colors duration-500 whitespace-nowrap
                ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                {skill.name}
              </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
};

export default function SkillsScene() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full h-[50vh] relative z-0 pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true
        }}
      >
        <Suspense fallback={null}>
            <ambientLight intensity={isDarkMode ? 1.0 : 0.8} color={isDarkMode ? "#ffffff" : "#f0f0f0"} />
            <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 1.5 : 0.8} />

            <OrbitingSkills isDarkMode={isDarkMode} />

            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
            />
        </Suspense>
      </Canvas>
    </div>
  );
}
