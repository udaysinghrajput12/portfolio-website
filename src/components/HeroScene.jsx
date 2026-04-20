import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, Html, ContactShadows, PresentationControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Island = () => (
  <mesh castShadow receiveShadow position={[0, -2, 0]}>
    <cylinderGeometry args={[4, 5, 2, 64]} />
    <meshStandardMaterial color="#111111" roughness={0.9} />
  </mesh>
);

const Desk = () => (
  <group position={[0, -1, 0]}>
    {/* Desk Top */}
    <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
      <boxGeometry args={[4, 0.15, 1.8]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
    </mesh>
    {/* Desk Legs */}
    <mesh castShadow receiveShadow position={[-1.8, 0, -0.7]}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    <mesh castShadow receiveShadow position={[1.8, 0, -0.7]}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    <mesh castShadow receiveShadow position={[-1.8, 0, 0.7]}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    <mesh castShadow receiveShadow position={[1.8, 0, 0.7]}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  </group>
);

const Chair = () => {
    const chairRef = useRef();
    useFrame((state) => {
        chairRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    });

    return (
        <group ref={chairRef} position={[0, -0.5, 1.5]}>
            {/* Base pole */}
            <mesh castShadow position={[0, -0.3, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Seat */}
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            {/* Backrest */}
            <mesh castShadow position={[0, 0.5, 0.45]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    );
};

const Monitor = () => (
  <group position={[0, -0.2, -0.4]}>
    {/* Stand */}
    <mesh castShadow position={[0, -0.1, 0]}>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color="#222" />
    </mesh>
    <mesh castShadow position={[0, -0.3, 0]}>
      <boxGeometry args={[0.6, 0.05, 0.4]} />
      <meshStandardMaterial color="#222" />
    </mesh>
    {/* Screen Frame */}
    <mesh castShadow position={[0, 0.3, 0.05]}>
      <boxGeometry args={[2.4, 1.4, 0.1]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {/* Screen Display */}
    <mesh position={[0, 0.3, 0.11]}>
      <planeGeometry args={[2.3, 1.3]} />
      <meshBasicMaterial color="#000" />
      <Html transform distanceFactor={1.2} position={[0, 0, 0.01]}>
        <div 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="w-[850px] h-[480px] bg-[#0B0B0F] text-[#D4AF37] border border-[#D4AF37]/20 p-8 flex flex-col font-mono rounded-lg relative overflow-hidden cursor-pointer hover:border-[#D4AF37] transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-8 bg-[#111] flex items-center px-4 border-b border-[#333]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
            </div>
            <div className="ml-4 text-xs text-neutral-500">terminal - zsh</div>
          </div>
          <div className="mt-12 flex flex-col gap-4 text-left">
            <p className="text-3xl">&gt; UDAY_PRATAP.initWorkspace()</p>
            <p className="text-xl text-white/50 animate-pulse">Mounting virtual environments...</p>
            <p className="text-xl text-white/70 mt-4">[ OK ] MERN Stack Initialized</p>
            <p className="text-xl text-white/70">[ OK ] Azure Cloud Linked</p>
            <p className="text-xl text-[#D4AF37] mt-4">&gt;&gt; Click screen to deploy projects 👇</p>
          </div>
        </div>
      </Html>
    </mesh>
  </group>
);

const FloatingCard = ({ position, title, subtitle, color, onClick, delay = 0 }) => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * 1.5 + delay) * 0.15;
    mesh.current.rotation.y = Math.sin(t * 0.5 + delay) * 0.1;
  });

  const [hovered, setHover] = useState(false);

  return (
    <group ref={mesh} position={position}>
      <mesh 
        onClick={onClick}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'none'; }}
        castShadow
      >
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color={hovered ? color : '#111'} emissive={hovered ? color : '#000'} emissiveIntensity={0.6} />
        <Html transform distanceFactor={1.5} position={[0, 0, 0.06]}>
          <div className="w-[180px] p-4 text-center pointer-events-none select-none flex flex-col items-center justify-center h-full">
            <h3 className={`font-display font-medium text-lg leading-tight mb-2 ${hovered ? 'text-black' : 'text-white'}`}>{title}</h3>
            <p className={`text-xs ${hovered ? 'text-black/70' : 'text-yellow-600'} uppercase tracking-widest`}>{subtitle}</p>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

const OrbitingSkills = () => {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
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
        <mesh key={i} position={[Math.cos(skill.offset) * 4, Math.sin(skill.offset) * 1 + 1, Math.sin(skill.offset) * 4]} castShadow>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.8} wireframe />
          <Html distanceFactor={5} position={[0, -0.4, 0]}>
              <div className="text-[10px] uppercase tracking-widest font-mono text-white/50 pointer-events-none">{skill.name}</div>
          </Html>
        </mesh>
      ))}
    </group>
  );
};

const Lamp = () => (
    <group position={[1.5, -0.5, -0.5]}>
        <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.2, 0.05, 16]} />
            <meshStandardMaterial color="#222" />
        </mesh>
        <mesh castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
            <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.2, 0.3, 16]} />
            <meshStandardMaterial color="#111" />
        </mesh>
        <pointLight position={[0, 0.7, 0]} intensity={1} color="#fcd34d" distance={3} />
    </group>
)

export default function HeroScene() {
  return (
    <div className="w-full h-screen absolute inset-0 z-0 bg-gradient-to-b from-[#0B0B0F] to-[#0A0F1C] overflow-hidden">
      <Canvas shadows camera={{ position: [0, 2, 9], fov: 45 }}>
        <fog attach="fog" args={['#0B0B0F', 6, 25]} />
        
        {/* Anti-gravity subtle stars */}
        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.5} />
        
        {/* Boosted lighting to ensure visibility against dark materials */}
        <ambientLight intensity={1.5} color="#EAEAEA" />
        <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <spotLight position={[-10, 10, -10]} intensity={4} color="#D4AF37" angle={0.6} penumbra={0.5} />
        <spotLight position={[10, -5, 10]} intensity={3} color="#3b82f6" angle={0.6} penumbra={0.5} />

        <PresentationControls 
          global 
          config={{ mass: 2, tension: 400 }} 
          snap={{ mass: 4, tension: 400 }} 
          rotation={[0.1, -0.2, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
            <Island />
            <Desk />
            <Chair />
            <Monitor />
            <Lamp />
            
            {/* Floating Project 1 */}
            <FloatingCard 
              position={[-3.5, 1, 0]} 
              title="Retail Optimization" 
              subtitle="Azure / DB" 
              color="#D4AF37"
              delay={0}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            />
            
            {/* Floating Project 2 */}
            <FloatingCard 
              position={[3.5, 0.5, 1]} 
              title="ANIDEX System" 
              subtitle="Python / AI" 
              color="#10b981" 
              delay={2}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            />

            <OrbitingSkills />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={20} blur={2.5} far={10} />
      </Canvas>
    </div>
  );
}
