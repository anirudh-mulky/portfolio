import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'

import AlchemyParticles from './AlchemyParticles'
import './About.css'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Artistic Title Reveal
      const chars = titleRef.current?.querySelectorAll('.char')
      if (chars) {
        gsap.fromTo(chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.05,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            }
          }
        )
      }

      // Floating Cards Parallax
      const cards = cardsRef.current?.querySelectorAll('.creative-card')
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { y: 100, opacity: 0, rotate: i % 2 === 0 ? -5 : 5 },
            {
              y: 0,
              opacity: 1,
              rotate: i % 2 === 0 ? -2 : 2,
              duration: 1.2,
              delay: i * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
              }
            }
          )

          // Continuous gentle float
          gsap.to(card, {
            y: -15,
            duration: 2 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1 + i * 0.5
          })
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Helper to split text for animation
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section ref={sectionRef} className="about-creative" id="about">
      <div className="creative-background">
        {/* Golden Stardust Particles */}
        <div className="alchemy-canvas-container">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            <AlchemyParticles />
          </Canvas>
        </div>

        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="about-container-creative">
        <div className="about-header-creative">
          <span className="subtitle-creative">The Philosophy</span>
          {/* Wrapped in a no-wrap container to enforce single line */}
          <div className="title-wrapper-nowrap">
            <h2 ref={titleRef} className="title-creative">
              {splitText("Digital Alchemy")}
            </h2>
          </div>
          <p className="manifesto-text">
            We don't just build websites. We transmute <span className="highlight-serif">ideas</span> into <span className="highlight-serif">reality</span>.
            Blurring the line between functional interface and digital art.
          </p>
        </div>

        <div ref={cardsRef} className="cards-wrapper">
          <div className="creative-card card-visual">
            <div className="card-inner">
              <h3>Vision</h3>
              <p>Seeing beyond the grid.</p>
              <div className="card-shape shape-circle"></div>
            </div>
          </div>

          <div className="creative-card card-text">
            <p>
              True creativity requires the courage to let go of certainties.
              We embrace the chaos of the creative process to find the
              <span className="italic-accent"> sublime order</span> hidden within.
            </p>
          </div>

          <div className="creative-card card-stat">
            <span className="big-number">∞</span>
            <span className="label">Possibilities</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

