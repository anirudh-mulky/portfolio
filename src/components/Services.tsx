import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'
import SkillsMarquee from './SkillsMarquee'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Frontend Architecture',
    description: 'Crafting robust, scalable frontend ecosystems using modern frameworks like React and Next.js. We focus on performance, accessibility, and pixel-perfect execution.',
  },
  {
    title: 'Interactive Motion',
    description: 'Breathing life into interfaces with fluid GSAP animations and WebGL micro-interactions. creating immersive digital narratives that captivate and engage.',
  },
  {
    title: 'Creative Development',
    description: 'Bridging the delicate gap between pure design and engineering. We implement complex 3D environments and bespoke visual experiences that defy standard layouts.',
  },
  {
    title: 'Technical Strategy',
    description: 'Beyond just code, we provide comprehensive technical direction, helping you choose the right stack and architecture to future-proof your digital presence.',
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal - using fromTo for safety
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

      // Items stagger - using fromTo for safety
      const items = itemsRef.current?.querySelectorAll('.service-item')
      if (items) {
        gsap.fromTo(items,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="services" id="services">
      <div className="services-bg-grid"></div>
      <div className="services-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
      <div className="services-container">
        <h2 ref={titleRef} className="services-title">
          Our Expertise
        </h2>

        <div style={{ marginBottom: '4rem', width: '100%' }}>
          <SkillsMarquee />
        </div>

        <div ref={itemsRef} className="services-list">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item"
              data-cursor="card"
            >
              <div className="service-line-wrapper">
                <span className="line-top"></span>
                <span className="line-right"></span>
                <span className="line-bottom"></span>
                <span className="line-left"></span>
              </div>

              <div className="service-card-inner">
                <div className="service-header">
                  <span className="service-number">0{index + 1}</span>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section >
  )
}

export default Services



