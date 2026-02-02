import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'
import SkillsMarquee from './SkillsMarquee'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Frontend Architecture',
    description: 'Scalable ecosystems using React & Next.js. Performance first.',
    gridClass: 'span-2',
    tags: ['React', 'Next.js', 'TypeScript', 'Performance']
  },
  {
    title: 'Interactive Motion',
    description: 'Fluid GSAP animations and WebGL interactions.',
    gridClass: 'span-1',
    tags: ['GSAP', 'WebGL', 'Three.js']
  },
  {
    title: 'Creative Development',
    description: 'Bridging design and code with bespoke experiences.',
    gridClass: 'span-1',
    tags: ['Creative', 'Canvas', 'GLSL']
  },
  {
    title: 'Technical Strategy',
    description: 'Future-proof architecture and stack selection.',
    gridClass: 'span-2',
    tags: ['Architecture', 'Scaling', 'Cloud']
  },
  {
    title: 'Video Editing',
    description: 'Cinematic storytelling and rhythmic pacing.',
    gridClass: 'span-1',
    tags: ['Premiere', 'After Effects', 'Story']
  },
  {
    title: 'Visual Identity',
    description: 'Bold typography and impactful branding.',
    gridClass: 'span-2',
    tags: ['Typography', 'Branding', 'Design']
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      )

      // Items stagger (Bento Reveal)
      const items = itemsRef.current?.querySelectorAll('.bento-card')
      if (items) {
        gsap.fromTo(items,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="services" id="services">
      {/* Abstract Background Elements */}
      <div className="services-bg-grid"></div>
      <div className="services-bg-bento">
        <div className="bento-blob blob-1"></div>
        <div className="bento-blob blob-2"></div>
        <div className="bento-blob blob-3"></div>
      </div>

      <div className="services-container">
        <h2 ref={titleRef} className="services-title">
          Our Expertise
        </h2>

        <div style={{ marginBottom: '4rem', width: '100%' }}>
          <SkillsMarquee />
        </div>

        <div ref={itemsRef} className="bento-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bento-card ${service.gridClass}`}
              data-cursor="card"
            >
              <div className="card-content">
                <div className="card-header">
                  <span className="service-number">0{index + 1}</span>
                  <div className="card-icon-shape"></div>
                </div>

                <div className="card-main">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>

                <div className="card-tags">
                  {service.tags.map((tag, i) => (
                    <span key={i} className={`bento-tag tag-${i % 3}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="card-hover-gradient"></div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default Services



