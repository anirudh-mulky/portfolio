import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      // Content stagger
      const contentElements = contentRef.current?.querySelectorAll('.about-text')
      if (contentElements) {
        gsap.from(contentElements, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="about-container">
        <h2 ref={titleRef} className="about-title">
          Who I Am
        </h2>
        <div className="about-content">
          <div ref={contentRef} className="about-text-wrapper">
            <p className="about-text">
              I'm a creative frontend engineer specializing in premium digital experiences.
              My work sits at the intersection of code, motion, and design—where every
              interaction feels intentional and every animation tells a story.
            </p>
            <p className="about-text">
              With a focus on restraint and polish, I build websites that don't just
              function—they resonate. Each project is an opportunity to push boundaries
              while maintaining the elegance that defines premium work.
            </p>
            <p className="about-text">
              Currently available for select freelance projects and collaborations
              with forward-thinking brands and agencies.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div ref={imageRef} className="about-image">
            <div className="about-image-placeholder">
              <div className="image-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

