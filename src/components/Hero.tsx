import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HeroBackground from './HeroBackground'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        const ctx = gsap.context(() => {
          // Set initial states for animation
          if (titleRef.current && titleRef.current.children.length > 0) {
            const children = Array.from(titleRef.current.children) as HTMLElement[]
            // Only animate if elements exist
            if (children.length > 0) {
              gsap.set(children, { y: 100, opacity: 0, clearProps: 'none' })
              
              // Animate in
              gsap.to(children, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.3,
              })
            }
          }

          // Subtitle animation
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, { y: 50, opacity: 0, clearProps: 'none' })
            gsap.to(subtitleRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              delay: 0.8,
            })
          }

          // CTA animation
          if (ctaRef.current) {
            gsap.set(ctaRef.current, { y: 30, opacity: 0, clearProps: 'none' })
            gsap.to(ctaRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              delay: 1.2,
            })
          }

          // Parallax effect on scroll
          if (heroRef.current) {
            gsap.to(heroRef.current, {
              y: -100,
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })
          }
        }, heroRef)

        return () => ctx.revert()
      } catch (error) {
        console.error('GSAP animation error:', error)
        // If GSAP fails, ensure content is visible
        if (titleRef.current) {
          const children = Array.from(titleRef.current.children) as HTMLElement[]
          children.forEach(child => {
            child.style.opacity = '1'
            child.style.transform = 'translateY(0)'
          })
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1'
          subtitleRef.current.style.transform = 'translateY(0)'
        }
        if (ctaRef.current) {
          ctaRef.current.style.opacity = '1'
          ctaRef.current.style.transform = 'translateY(0)'
        }
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-background">
        <div className="hero-background-gradient"></div>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
          onCreated={(state) => {
            // Ensure canvas doesn't block content
            state.gl.domElement.style.pointerEvents = 'none'
          }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.6} />
          <HeroBackground />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          <span className="title-line">Creative</span>
          <span className="title-line">Frontend</span>
          <span className="title-line">Engineer</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Crafting premium digital experiences with motion, depth, and intention.
          <br />
          <span style={{ fontSize: '0.9em', opacity: 0.7 }}>Available for select projects worldwide.</span>
        </p>
        <div ref={ctaRef} className="hero-cta">
          <a href="#work" className="cta-button" data-cursor="magnetic">
            View Work
          </a>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
