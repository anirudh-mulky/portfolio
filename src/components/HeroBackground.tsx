import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HeroBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create abstract geometry
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2.5, 15)
  }, [])

  // Create particle system
  const particles = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 3 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0008
      meshRef.current.rotation.y += 0.0015
      
      // Subtle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
      meshRef.current.scale.set(scale, scale, scale)
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.x -= 0.0003
      particlesRef.current.rotation.y += 0.0008
    }
  })

  return (
    <>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#2a2a2a"
          wireframe
          opacity={0.4}
          transparent
          emissive="#1a1a1a"
          side={THREE.DoubleSide}
        />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#ffffff"
          opacity={0.5}
          transparent
          sizeAttenuation={true}
        />
      </points>
    </>
  )
}

export default HeroBackground
