import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html, ContactShadows } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

const FloatingCard = ({ position, title, subtitle, color, delay = 0, isDarkMode }) => {
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
        onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'none'; }}
        castShadow
      >
        <boxGeometry args={[2.5, 3.5, 0.08]} />
        <meshStandardMaterial 
            color={hovered ? color : (isDarkMode ? '#111' : '#f8fafc')} 
            emissive={hovered ? color : '#000'} 
            emissiveIntensity={hovered ? 0.8 : 0} 
            roughness={0.1}
            metalness={0.1}
        />
        <Html transform distanceFactor={2.5} position={[0, 0, 0.05]} pointerEvents="none">
          <div className="w-[280px] p-6 text-center select-none flex flex-col items-center justify-center h-full transition-all duration-300">
            <h3 className={`font-display font-bold text-2xl leading-tight mb-4 transition-colors duration-500
                ${hovered ? (isDarkMode ? 'text-black' : 'text-white') : (isDarkMode ? 'text-white' : 'text-black')}`}>
                {title}
            </h3>
            <p className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 font-bold
                ${hovered ? (isDarkMode ? 'text-black/60' : 'text-white/70') : (isDarkMode ? 'text-yellow-600' : 'text-blue-600')}`}>
                {subtitle}
            </p>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

export default function ProjectsScene() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative z-0 pointer-events-auto">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 45 }}
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
            <ambientLight intensity={isDarkMode ? 1.2 : 1.0} color={isDarkMode ? "#ffffff" : "#f0f0f0"} />
            <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 2.0 : 0.8} />
            <spotLight position={[-10, 10, -5]} intensity={isDarkMode ? 3 : 1} color={isDarkMode ? "#D4AF37" : "#3B82F6"} angle={0.5} penumbra={0.8} />

            <group position={[0, 0, 0]}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <FloatingCard 
                      position={[-3, 0, 0]} 
                      title="Retail AI Order Optimization" 
                      subtitle="Azure / Node.js" 
                      color={isDarkMode ? "#D4AF37" : "#2563EB"}
                      delay={0}
                      isDarkMode={isDarkMode}
                    />
                    
                    <FloatingCard 
                      position={[3, 0, 0]} 
                      title="ANIDEX Animal Detection" 
                      subtitle="ML / Python" 
                      color="#10b981" 
                      delay={1.5}
                      isDarkMode={isDarkMode}
                    />
                </Float>
            </group>

            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
            />

            <ContactShadows position={[0, -3.5, 0]} opacity={isDarkMode ? 0.6 : 0.2} scale={20} blur={2} far={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}
