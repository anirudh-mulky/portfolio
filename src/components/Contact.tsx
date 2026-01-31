import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'
import contactBg from '../assets/contact-prism.png'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content Reveal
      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
        },
      })

      // SVG Underline Draw Animation
      if (underlineRef.current) {
        const length = underlineRef.current.getTotalLength()

        gsap.set(underlineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length
        })

        gsap.to(underlineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 60%',
          },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="contact" id="contact">
      {/* AI Background Node Network */}
      <div className="contact-bg-wrapper">
        <div
          ref={bgRef}
          className="contact-bg-image"
          style={{ backgroundImage: `url(${contactBg})` }}
        ></div>
        <div className="contact-bg-overlay"></div>
        <div className="contact-noise"></div>
      </div>

      <div ref={contentRef} className="contact-container text-center">
        <h2 className="contact-title">
          <span className="title-line line-1">Let's create</span>
          <span className="title-line line-2">SOMETHING</span>
          <span className="title-line line-3">Exceptional</span>
          <span className="title-line line-4">
            <span className="underline-wrapper">
              Together
              <svg
                className="creative-underline"
                viewBox="0 0 300 50"
                color="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="warmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff0055" /> {/* Red/Pink start */}
                    <stop offset="33%" stopColor="#ff5500" /> {/* Orange */}
                    <stop offset="66%" stopColor="#ffdd00" /> {/* Yellow */}
                    <stop offset="100%" stopColor="#66ff00" /> {/* Green end, no blue */}
                  </linearGradient>
                </defs>
                {/* Swoop DOWN (y=45) at x=80 to miss the 'g' descender */}
                <path
                  ref={underlineRef}
                  d="M5 15 Q 80 45, 150 15 T 295 15"
                  stroke="url(#warmGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h2>

        <p className="contact-subtext">
          Ready to elevate your digital presence?
        </p>

        <a href="mailto:hello@example.com" className="premium-btn" data-cursor="magnetic">
          <span className="btn-layer btn-layer-1"></span>
          <span className="btn-layer btn-layer-2"></span>
          <span className="btn-content">
            Get In Touch
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  )
}

export default Contact

