import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Work.css'

const projects = [
  {
    id: 1,
    title: 'Premium Brand Experience',
    category: 'E-commerce',
    description: 'A luxury retail platform with immersive 3D product visualization and seamless checkout flow',
    year: '2024',
    tags: ['React', 'Three.js', 'GSAP', 'Stripe'],
    image: 'project-1',
    results: ['+40% Conv. Rate', '2s Load Time']
  },
  {
    id: 2,
    title: 'Creative Agency Website',
    category: 'Portfolio',
    description: 'Award-winning portfolio site with advanced motion design and interactive case studies',
    year: '2024',
    tags: ['Next.js', 'Framer Motion', 'TypeScript'],
    image: 'project-2',
    results: ['Awwwards SOTD', '50k+ Visits']
  },
  {
    id: 3,
    title: 'Tech Product Launch',
    category: 'Marketing',
    description: 'Interactive product launch site with WebGL animations and scroll-triggered reveals',
    year: '2024',
    tags: ['WebGL', 'GSAP', 'React'],
    image: 'project-3',
    results: ['1M+ Impressions', 'Top #1 PH']
  },
  {
    id: 4,
    title: 'Fashion Brand Platform',
    category: 'E-commerce',
    description: 'High-end fashion e-commerce with cinematic storytelling and AR try-on features',
    year: '2023',
    tags: ['Vue.js', 'WebXR', 'Shopify'],
    image: 'project-4',
    results: ['+85% Engagement', 'AR Integrated']
  },
  {
    id: 5,
    title: 'SaaS Dashboard Redesign',
    category: 'Product Design',
    description: 'Complete UI/UX overhaul of enterprise dashboard with real-time data visualization',
    year: '2023',
    tags: ['React', 'D3.js', 'Tailwind'],
    image: 'project-5',
    results: ['-30% Churn', 'Team Favorite']
  },
  {
    id: 6,
    title: 'Music Festival Website',
    category: 'Entertainment',
    description: 'Immersive festival experience with interactive lineups and ticket purchasing',
    year: '2023',
    tags: ['Next.js', 'GSAP', 'Stripe'],
    image: 'project-6',
    results: ['Sold Out', 'Best UX Award']
  },
]

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.work-card')
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Magnetic intensity based on mouse position from center
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    // Normalize mouse position for gradient
    const mouseX = (x / rect.width) * 100
    const mouseY = (y / rect.height) * 100
    card.style.setProperty('--mouse-x', `${mouseX}%`)
    card.style.setProperty('--mouse-y', `${mouseY}%`)

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    })

    // Move cursor follower (View Case Study button)
    const viewBtn = card.querySelector('.view-case-study') as HTMLElement
    if (viewBtn) {
      gsap.to(viewBtn, {
        x: x,
        y: y,
        duration: 0.1,
        opacity: 1,
        scale: 1,
        ease: 'power1.out'
      })
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    const viewBtn = card.querySelector('.view-case-study') as HTMLElement
    if (viewBtn) {
      gsap.to(viewBtn, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3
      })
    }
  }

  return (
    <section ref={sectionRef} className="work" id="work">
      <div className="work-container">
        <h2 ref={titleRef} className="work-title">
          Selected Work
        </h2>
        <div ref={cardsRef} className="work-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="work-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="view-case-study">View Case Study</div>

              <div className="work-card-content">
                <div className="work-card-header">
                  <span className="work-card-category">{project.category}</span>
                  <span className="work-card-year">{project.year}</span>
                </div>

                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-description">{project.description}</p>

                <div className="work-card-metrics">
                  {project.results?.map((res, i) => (
                    <span key={i} className="metric-tag">{res}</span>
                  ))}
                </div>

                <div className="work-card-footer">
                  <div className="work-card-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="work-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="work-card-background-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work

