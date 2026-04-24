import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

export default function Robot3D() {
  const groupRef = useRef();
  const { isDarkMode } = useTheme();

  const accentColor = isDarkMode ? "#ffb703" : "#fb8500";
  const bodyColor = isDarkMode ? "#fdfbf7" : "#1a1a2e";
  const visorColor = isDarkMode ? "#111116" : "#ffffff";

  useFrame((state) => {
    // Parallax tracking mouse
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 6, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(state.pointer.y * Math.PI) / 8, 0.05);
      
      // Add slight vertical movement based on scroll
      const scrollY = window.scrollY;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 3 - (scrollY * 0.005), 0.1);
    }
  });

  return (
    // Float adds that natural idle anti-gravity feel
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group ref={groupRef} position={[0, 3, 0]} scale={[1.2, 1.2, 1.2]}>
        
        {/* Main Head/Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.9, 1]} />
          <meshStandardMaterial color={bodyColor} roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Visor/Screen */}
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshStandardMaterial color={visorColor} roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Left Eye */}
        <mesh position={[-0.2, 0, 0.52]}>
          <capsuleGeometry args={[0.05, 0.1, 4, 8]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* Right Eye */}
        <mesh position={[0.2, 0, 0.52]}>
          <capsuleGeometry args={[0.05, 0.1, 4, 8]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* Left Ear / Bolt */}
        <mesh position={[-0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>

        {/* Right Ear / Bolt */}
        <mesh position={[0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>

        {/* Antenna Stem */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>

        {/* Antenna Bulb */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
        </mesh>

        {/* Floating Halo (Abstract) */}
        <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.02, 16, 64]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.2} transparent opacity={0.6} />
        </mesh>

      </group>
    </Float>
  );
}
