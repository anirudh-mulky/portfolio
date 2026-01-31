import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HeroBackground from './HeroBackground'
import './Hero.css'

const CARD_Colors = [
  'linear-gradient(135deg, #ff5500, #ff8800)',
  'linear-gradient(135deg, #00ff88, #00cca3)',
  'linear-gradient(135deg, #0099ff, #0055ff)',
  'linear-gradient(135deg, #ff0055, #cc0033)',
  'linear-gradient(135deg, #aa00ff, #5500ff)',
  'linear-gradient(135deg, #ffffff, #aaaaaa)',
]

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const speedRef = useRef(0.2) // Base rotation speed
  const progressRef = useRef(0) // Accumulates rotation

  useEffect(() => {
    const cards = gsap.utils.toArray('.hero-card') as HTMLDivElement[]
    const cardCount = cards.length
    const radius = 1100 // Large radius for a "flatter" looking center
    const theta = (2 * Math.PI) / cardCount
    const thetaIndeg = theta * (180 / Math.PI)

    const update = () => {
      progressRef.current += speedRef.current * 0.05 // Increased speed slightly for visibility

      cards.forEach((card, i) => {
        const angle = (theta * i) + progressRef.current

        // Calculate 3D Cylinder Coords
        const x = Math.sin(angle) * radius
        const z = (Math.cos(angle) * radius) - radius

        // Rotation: Cards face OUT from center
        const rotY = angle * (180 / Math.PI)

        // Apply Transform
        // Normalize Z for opacity: range is roughly [-2*radius, 0]
        const normalizedZ = (z + 2 * radius) / (2 * radius)

        gsap.set(card, {
          x: x,
          z: z,
          rotationY: rotY,
          opacity: 0.1 + (0.9 * normalizedZ),
          filter: `brightness(${0.3 + 0.7 * normalizedZ})`
        })
      })
    }

    gsap.ticker.add(update)

    // Text Reveals (Creative Genius Mode)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // Reveal Top Title
      tl.fromTo('.hero-title-complex.top',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
        // Reveal Bottom Title
        .fromTo('.hero-title-complex.bottom',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          "-=1"
        )
        // Expand Glow
        .fromTo('.hero-aura',
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 0.6, duration: 2, ease: 'power2.out' },
          "-=1.2"
        )
    }, heroRef)

    return () => {
      gsap.ticker.remove(update)
      ctx.revert()
    }
  }, [])

  // Interaction: Slow down on hover
  const onEnter = () => gsap.to(speedRef, { current: 0.02, duration: 0.5 })
  const onLeave = () => gsap.to(speedRef, { current: 0.2, duration: 0.5 })

  // Duplicate color array to get enough cards
  const cardsData = [...CARD_Colors, ...CARD_Colors, ...CARD_Colors].slice(0, 14)

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
          onCreated={(state) => {
            state.gl.domElement.style.pointerEvents = 'none'
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <HeroBackground />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Cool Element: Central Glowing Aura */}
      <div className="hero-aura"></div>

      {/* Top Center Typography */}
      <div className="hero-title-complex top">
        <h1 className="hero-big-text gradient-text">CREATIVE</h1>
        <span className="hero-script-text">Vision</span>
      </div>

      {/* 3D Scene Container */}
      <div
        className="hero-carousel-3d"
        ref={containerRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {cardsData.map((grad, i) => (
          <div key={i} className="hero-card">
            <div className="card-gradient" style={{ background: grad }}></div>
            <div className="card-glass"></div>
          </div>
        ))}
      </div>

      {/* Bottom Center Typography */}
      <div className="hero-title-complex bottom">
        <span className="hero-script-text alt-pos">Craft</span>
        <h1 className="hero-big-text gradient-text">ENGINEER</h1>
      </div>

      <div className="hero-noise"></div>

    </section>
  )
}

export default Hero
