import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, Html, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const Island = ({ isDarkMode }) => (
  <mesh castShadow receiveShadow position={[0, -2.5, 0]}>
    <cylinderGeometry args={[4.5, 5, 2, 32]} />
    <meshStandardMaterial color={isDarkMode ? "#0d0d12" : "#f1f5f9"} roughness={0.8} metalness={0.2} />
  </mesh>
);

const Desk = ({ isDarkMode }) => (
  <group position={[0, -1.2, 0]}>
    {/* Desk Top */}
    <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
      <boxGeometry args={[4.2, 0.1, 2]} />
      <meshStandardMaterial color={isDarkMode ? "#16161c" : "#e2e8f0"} roughness={0.4} />
    </mesh>
    {/* Desk Legs simplified */}
    {[[-1.9, -0.6], [1.9, -0.6], [-1.9, 0.6], [1.9, 0.6]].map(([x, z], i) => (
      <mesh key={i} castShadow receiveShadow position={[x, 0, z]}>
        <boxGeometry args={[0.08, 1, 0.08]} />
        <meshStandardMaterial color={isDarkMode ? "#222" : "#94a3b8"} />
      </mesh>
    ))}
  </group>
);

const Chair = ({ isDarkMode }) => {
    const chairRef = useRef();
    useFrame((state) => {
        if (chairRef.current) {
            chairRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
        }
    });

    return (
        <group ref={chairRef} position={[0, -0.6, 1.8]}>
            <mesh castShadow position={[0, -0.3, 0]}>
                <cylinderGeometry args={[0.05, 0.06, 0.4, 8]} />
                <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#cbd5e1"} />
            </mesh>
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.1, 0.12, 1.1]} />
                <meshStandardMaterial color={isDarkMode ? "#050505" : "#64748b"} />
            </mesh>
            <mesh castShadow position={[0, 0.6, 0.5]}>
                <boxGeometry args={[1.1, 1.2, 0.15]} />
                <meshStandardMaterial color={isDarkMode ? "#050505" : "#64748b"} />
            </mesh>
        </group>
    );
};

const Monitor = ({ isDarkMode }) => (
  <group position={[0, -0.35, -0.5]}>
    <mesh castShadow position={[0, -0.1, 0]}>
      <boxGeometry args={[0.1, 0.5, 0.1]} />
      <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#475569"} />
    </mesh>
    <mesh castShadow position={[0, -0.35, 0]}>
      <boxGeometry args={[0.7, 0.05, 0.5]} />
      <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#475569"} />
    </mesh>
    <mesh castShadow position={[0, 0.4, 0.05]}>
      <boxGeometry args={[2.5, 1.5, 0.1]} />
      <meshStandardMaterial color={isDarkMode ? "#0a0a0f" : "#1e293b"} />
    </mesh>
    <mesh position={[0, 0.4, 0.11]}>
      <planeGeometry args={[2.4, 1.4]} />
      <meshBasicMaterial color={isDarkMode ? "#000" : "#f8fafc"} />
      <Html transform distanceFactor={1.3} position={[0, 0, 0.01]} portal={undefined} occlude="blended">
        <div 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className={`w-[850px] h-[480px] p-8 flex flex-col font-mono rounded-lg relative overflow-hidden cursor-pointer transition-all duration-700 border shadow-2xl
              ${isDarkMode 
                ? 'bg-[#0B0B0F]/90 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]' 
                : 'bg-white/90 text-blue-600 border-blue-600/20 hover:border-blue-600 shadow-blue-500/10'
              }`}
        >
          <div className={`absolute top-0 left-0 w-full h-8 flex items-center px-4 border-b transition-colors duration-700
            ${isDarkMode ? 'bg-[#111] border-[#333]' : 'bg-[#f1f5f9] border-[#e2e8f0]'}`}>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 text-[10px] text-neutral-500 uppercase tracking-tighter">terminal — zsh</div>
          </div>
          <div className="mt-12 flex flex-col gap-4 text-left pointer-events-none select-none">
            <p className="text-3xl font-bold">&gt; UDAY_PRATAP.init()</p>
            <p className={`text-xl animate-pulse ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>System status: OPTIMIZED</p>
            <p className={`text-xl mt-4 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>[ SUCCESS ] 60 FPS Stable</p>
            <p className={`text-xl ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>[ SUCCESS ] Low Latency Input</p>
            <p className={`text-xl mt-6 ${isDarkMode ? 'text-[#D4AF37]' : 'text-blue-600'} font-bold`}>&gt;&gt; Deploying innovative solutions... ⚡</p>
          </div>
        </div>
      </Html>
    </mesh>
  </group>
);

const FloatingCard = ({ position, title, subtitle, color, onClick, delay = 0, isDarkMode }) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state) => {
    if (mesh.current) {
        const t = state.clock.getElapsedTime();
        mesh.current.position.y = position[1] + Math.sin(t * 1.2 + delay) * 0.12;
        mesh.current.rotation.y = Math.sin(t * 0.4 + delay) * 0.08;
    }
  });

  return (
    <group ref={mesh} position={position}>
      <mesh 
        onClick={onClick}
        onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'none'; }}
        castShadow
      >
        <boxGeometry args={[1.4, 1.8, 0.08]} />
        <meshStandardMaterial 
            color={hovered ? color : (isDarkMode ? '#111' : '#f8fafc')} 
            emissive={hovered ? color : '#000'} 
            emissiveIntensity={hovered ? 0.8 : 0} 
            roughness={0.1}
            metalness={0.1}
        />
        <Html transform distanceFactor={1.4} position={[0, 0, 0.05]} pointerEvents="none">
          <div className="w-[160px] p-4 text-center select-none flex flex-col items-center justify-center h-full transition-all duration-300">
            <h3 className={`font-display font-bold text-lg leading-tight mb-2 transition-colors duration-500
                ${hovered ? (isDarkMode ? 'text-black' : 'text-white') : (isDarkMode ? 'text-white' : 'text-black')}`}>
                {title}
            </h3>
            <p className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 font-bold
                ${hovered ? (isDarkMode ? 'text-black/60' : 'text-white/70') : (isDarkMode ? 'text-yellow-600' : 'text-blue-600')}`}>
                {subtitle}
            </p>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

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
        <mesh key={i} position={[Math.cos(skill.offset) * 4.5, Math.sin(skill.offset) * 0.8 + 1, Math.sin(skill.offset) * 4.5]} castShadow>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={1} wireframe />
          <Html distanceFactor={6} position={[0, -0.4, 0]}>
              <div className={`text-[9px] uppercase tracking-[0.3em] font-bold pointer-events-none transition-colors duration-500 whitespace-nowrap
                ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                {skill.name}
              </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
};

const Lamp = ({ isDarkMode }) => (
    <group position={[1.8, -0.7, -0.6]}>
        <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.25, 0.06, 8]} />
            <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#94a3b8"} />
        </mesh>
        <mesh castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
            <meshStandardMaterial color={isDarkMode ? "#1a1a1a" : "#94a3b8"} />
        </mesh>
        <mesh position={[0, 0.8, 0]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.25, 0.4, 12]} />
            <meshStandardMaterial color={isDarkMode ? "#0a0a0f" : "#475569"} />
        </mesh>
        <pointLight position={[0, 0.7, 0]} intensity={isDarkMode ? 1.5 : 0.8} color={isDarkMode ? "#fee2e2" : "#fef3c7"} distance={4} />
    </group>
)

export default function HeroScene() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`w-full h-screen absolute inset-0 z-0 overflow-hidden transition-all duration-1000 bg-gradient-to-b
      ${isDarkMode 
        ? 'from-[#0B0B0F] to-[#0A0F1C]' 
        : 'from-[#F8FAFB] to-[#F1F5F9]'
      }`}>
      <Canvas 
        shadows 
        camera={{ position: [0, 2.5, 10], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true
        }}
      >
        <fog attach="fog" args={[isDarkMode ? '#0B0B0F' : '#F8FAFB', 8, 25]} />
        
        {/* Optimized Stars */}
        <Stars radius={100} depth={50} count={isDarkMode ? 3000 : 800} factor={4} saturation={0} fade speed={0.5} />
        
        {/* Dynamic lighting */}
        <Suspense fallback={null}>
            <ambientLight intensity={isDarkMode ? 1.2 : 1.8} color={isDarkMode ? "#ffffff" : "#fefefe"} />
            <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 2.5 : 1.2} castShadow shadow-mapSize={[512, 512]} />
            <spotLight position={[-10, 10, -5]} intensity={isDarkMode ? 5 : 2} color={isDarkMode ? "#D4AF37" : "#2563EB"} angle={0.5} penumbra={0.8} />
            <spotLight position={[5, -5, 10]} intensity={isDarkMode ? 3 : 1} color={isDarkMode ? "#3b82f6" : "#2563EB"} angle={0.5} penumbra={0.8} />

            <group position={[0, -0.5, 0]}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Island isDarkMode={isDarkMode} />
                    <Desk isDarkMode={isDarkMode} />
                    <Chair isDarkMode={isDarkMode} />
                    <Monitor isDarkMode={isDarkMode} />
                    <Lamp isDarkMode={isDarkMode} />
                    
                    <FloatingCard 
                      position={[-3.8, 1.2, 0]} 
                      title="Retail AI" 
                      subtitle="Azure / DB" 
                      color={isDarkMode ? "#D4AF37" : "#2563EB"}
                      delay={0}
                      isDarkMode={isDarkMode}
                      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    />
                    
                    <FloatingCard 
                      position={[3.8, 0.8, 1.2]} 
                      title="ANIDEX" 
                      subtitle="ML / Python" 
                      color="#10b981" 
                      delay={1.5}
                      isDarkMode={isDarkMode}
                      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    />

                    <OrbitingSkills isDarkMode={isDarkMode} />
                </Float>
            </group>

            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
            />

            <ContactShadows position={[0, -4.5, 0]} opacity={isDarkMode ? 0.6 : 0.2} scale={22} blur={2} far={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}

