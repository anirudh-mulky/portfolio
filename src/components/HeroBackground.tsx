import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HeroBackground() {
  const particlesRef = useRef<THREE.Points>(null)

  // Create particle system with square pixel aesthetic
  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count * 3; i += 3) {
      // Create a large volume of particles
      // Using a box distribution for a more "digital/matrix" field feel than a sphere
      positions[i] = (Math.random() - 0.5) * 25
      positions[i + 1] = (Math.random() - 0.5) * 25
      positions[i + 2] = (Math.random() - 0.5) * 20 - 2 // Bias towards back
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      // Slow, subtle floating animation
      particlesRef.current.rotation.x += 0.0001
      particlesRef.current.rotation.y += 0.0002
      
      // Optional: bobbing motion
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Default points are squares. Size attenuation makes them smaller further away. */}
      <pointsMaterial
        size={0.12}
        color="#888888"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default HeroBackground
