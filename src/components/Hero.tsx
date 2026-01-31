import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import FluidBackground from './FluidBackground'
import './Hero.css'

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Creative Entrance: Shattered Text Reveal
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Reveal grid lines/elements
      tl.fromTo('.hero-overlay-grid',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2 }
      )

        .fromTo('.big-text-row',
          { y: 150, skewY: 10, opacity: 0 },
          { y: 0, skewY: 0, opacity: 1, duration: 1.5, stagger: 0.15 },
          "-=1.5"
        )

        .fromTo('.hero-meta',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1 },
          "-=1"
        )

        .fromTo('.scroll-indicator',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )

    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-webgl">
      {/* 1. WebGL Background Layer */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <FluidBackground />
        </Canvas>
      </div>

      {/* 2. HTML Content Layer - Editorial Design */}
      <div ref={contentRef} className="hero-content-layer">

        {/* Top Meta Info */}
        <div className="hero-header">
          <div className="hero-meta">
            <span className="meta-label">PORTFOLIO &copy; 2026</span>
            <span className="active-dot"></span>
          </div>
          <div className="hero-meta right">
            <span className="meta-label">BASED IN SAN FRANCISCO</span>
          </div>
        </div>

        {/* Main Fractured Headline */}
        <div className="hero-main-title">
          <div className="title-row">
            <h1 className="big-text-row">DIGITAL</h1>
            <span className="serif-italic">alchemist</span>
          </div>
          <div className="title-row offset-right">
            <h1 className="big-text-row outline">REALITY</h1>
          </div>
          <div className="title-row">
            <span className="small-bracket">[ THE ]</span>
            <h1 className="big-text-row">ARCHITECT</h1>
          </div>
        </div>

        {/* Bottom Lockup */}
        <div className="hero-footer">
          <div className="scroll-indicator">
            <span className="scroll-text">SCROLL TO EXPLORE</span>
            <div className="line"></div>
          </div>
        </div>

      </div>

      <div className="hero-overlay-grid"></div>
    </section>
  )
}

export default Hero
