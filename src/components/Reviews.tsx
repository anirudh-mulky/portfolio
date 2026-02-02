import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import './Reviews.css'

const reviews = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Studio Luxe',
    content: 'Working with this team transformed our digital presence. The attention to detail and premium aesthetic is unmatched. Every interaction feels intentional and polished.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'TechFlow',
    content: 'The level of craftsmanship and technical expertise exceeded our expectations. The site performs flawlessly and the animations are buttery smooth.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Brand Manager',
    company: 'Fashion Forward',
    content: 'Our conversion rates increased by 40% after the redesign. The user experience is intuitive and the visual storytelling perfectly captures our brand essence.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'CTO',
    company: 'InnovateX',
    content: 'Cleanest code we have seen. The WebGL integration was complex but delivered flawlessly. A rare combination of technical genius and design eye.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Isabella Ricci',
    role: 'Marketing VP',
    company: 'Veloce Motors',
    content: 'We needed a site that screamed "speed" and "luxury". They delivered exactly that. The magnetic interactions leave our clients in awe.',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Product Lead',
    company: 'SaaSify',
    content: 'Transformed our boring dashboard into a visual masterpiece. User engagement is up 200% and we are finally proud to show off the product.',
    rating: 5,
  },
]

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // We are using CSS animation for the marquee, but we can add entrance animations
      gsap.fromTo('.review-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Duplicate reviews for seamless loop
  const marqueeReviews = [...reviews, ...reviews]

  return (
    <section ref={sectionRef} className="reviews" id="reviews">
      <div className="reviews-container">
        <h2 ref={titleRef} className="reviews-title">
          Client Stories
        </h2>

        <div className="reviews-marquee">
          <div ref={trackRef} className="reviews-track">
            {marqueeReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="review-card"
              >
                <div className="review-quote-icon">"</div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0L10.163 5.527L16 6.112L12 9.944L12.944 16L8 13.527L3.056 16L4 9.944L0 6.112L5.837 5.527L8 0Z" />
                    </svg>
                  ))}
                </div>
                <p className="review-content">{review.content}</p>
                <div className="review-author">
                  <div className="review-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div className="review-author-info">
                    <h4 className="review-name">{review.name}</h4>
                    <p className="review-role">{review.role}, <span className="review-company">{review.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews



