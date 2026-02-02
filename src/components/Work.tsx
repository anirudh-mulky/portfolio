import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleBackground from './ParticleBackground'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'VRXocial-Agency',
    category: 'Digital Marketing',
    description: 'A luxury digital marketing site with advanced motion and seamless flow',
    year: '2025',
    tags: ['React', 'Three.js', 'GSAP', 'Stripe'],
    image: '/assets/uploaded_media_1769871654879.png',
    link: 'https://vrxocial.in/'
  },
  {
    id: 2,
    title: 'Creative Agency Website',
    category: 'Portfolio',
    description: 'Award-winning portfolio site with advanced motion design and interactive case studies',
    year: '2024',
    tags: ['Next.js', 'Framer', 'TypeScript'],
    image: null,
    link: 'https://example.com'
  },
  {
    id: 3,
    title: 'Tech Product Launch',
    category: 'Marketing',
    description: 'Interactive product launch site with WebGL animations and scroll-triggered reveals',
    year: '2024',
    tags: ['WebGL', 'GSAP', 'React'],
    image: null,
    link: 'https://example.com'
  },
  {
    id: 4,
    title: 'Fashion Brand Platform',
    category: 'E-commerce',
    description: 'High-end fashion e-commerce with cinematic storytelling and AR try-on features',
    year: '2023',
    tags: ['Vue.js', 'WebXR', 'Shopify'],
    image: null,
    link: 'https://example.com'
  },
  {
    id: 5,
    title: 'SaaS Dashboard Redesign',
    category: 'Product Design',
    description: 'Complete UI/UX overhaul of enterprise dashboard with real-time data visualization',
    year: '2023',
    tags: ['React', 'D3.js', 'Tailwind'],
    image: null,
    link: 'https://example.com'
  },
  {
    id: 6,
    title: 'Music Festival Website',
    category: 'Entertainment',
    description: 'Immersive festival experience with interactive lineups and ticket purchasing',
    year: '2023',
    tags: ['Next.js', 'GSAP', 'Stripe'],
    image: null,
    link: 'https://example.com'
  },
]

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.work-header-left > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-header',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Grid Animation (Vertical Stagger)
      gsap.fromTo('.project-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1, // Faster stagger for grid
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-list',
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse'
          }
        }
      )

      ScrollTrigger.refresh()

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Spotlight Effect
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)

    // 3D Tilt Effect
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -5 // Max -5deg to 5deg
    const rotateY = ((x - centerX) / centerX) * 5  // Max -5deg to 5deg

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1, // Reset scale
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  return (
    <section ref={sectionRef} className="work" id="work">
      {/* Background Elements */}
      <div className="work-background">
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 1.5]}>
          <ParticleBackground />
        </Canvas>

        {/* Creative Floating Orbs */}
        <div className="work-orb orb-blue"></div>
        <div className="work-orb orb-purple"></div>
        <div className="work-orb orb-cyan"></div>
      </div>

      <div className="work-container">
        {/* Header */}
        <div className="work-header">
          <div className="work-header-left">
            <h2>SELECTED</h2>
            <span className="outline-text">WORKS</span>
          </div>
          <div className="work-header-right">
            <p>A collection of digital experiences crafted with precision, passion, and code.</p>
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="swipe-indicator">
          <span>&larr; Swipe to Explore &rarr;</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Project List */}
        <div className="project-list">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => window.open(project.link, '_blank')}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Visual Side */}
              <div className="project-visual">
                <div className="project-visual-inner">
                  {project.image ? (
                    <div className="project-image" style={{ backgroundImage: `url(${project.image})` }} />
                  ) : (
                    <div className="project-image" style={{
                      background: `linear-gradient(135deg, ${['#1a1a1a', '#222', '#111'][index % 3]} 0%, #000 100%)`
                    }} />
                  )}
                  <div className="project-overlay"></div>
                </div>
              </div>

              {/* Info Side */}
              <div className="project-info">
                <div className="project-meta">
                  <span>0{project.id}</span>
                  <div className="separator"></div>
                  <span>{project.category}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-footer">
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mosaic-glass-btn" onClick={(e) => e.stopPropagation()} data-cursor="magnetic">
                    <span className="btn-text">Visit</span>
                    <span className="btn-icon">↗</span>
                    <div className="mosaic-shimmer"></div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
