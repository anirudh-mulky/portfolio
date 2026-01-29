import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

const services = [
  {
    title: 'Frontend Development',
    description: 'Custom React, Next.js, and Vue.js applications with premium UI/UX',
  },
  {
    title: 'Motion Design',
    description: 'GSAP animations, WebGL experiences, and interactive micro-interactions',
  },
  {
    title: '3D Experiences',
    description: 'Three.js and WebGL implementations for immersive digital products',
  },
  {
    title: 'Creative Direction',
    description: 'End-to-end creative direction from concept to polished execution',
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Items stagger
      const items = itemsRef.current?.querySelectorAll('.service-item')
      if (items) {
        gsap.from(items, {
          x: -50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleItemHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget
    const number = item.querySelector('.service-number')
    const line = item.querySelector('.service-line')

    gsap.to(number, {
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.to(line, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleItemLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget
    const number = item.querySelector('.service-number')
    const line = item.querySelector('.service-line')

    gsap.to(number, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.to(line, {
      scaleX: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <section ref={sectionRef} className="services" id="services">
      <div className="services-container">
        <h2 ref={titleRef} className="services-title">
          Services
        </h2>
        <div ref={itemsRef} className="services-list">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item"
              data-cursor="magnetic"
              onMouseEnter={handleItemHover}
              onMouseLeave={handleItemLeave}
            >
              <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
              <div className="service-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services


