import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    description: 'Building performant user interfaces',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind'],
  },
  {
    title: 'Creative',
    description: 'Bringing designs to life with motion',
    skills: ['GSAP', 'Framer Motion', 'Three.js', 'WebGL', 'Lottie', 'Canvas API'],
  },
  {
    title: 'Design',
    description: 'Crafting pixel-perfect experiences',
    skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping', 'Design Systems', 'Blender'],
  },
  {
    title: 'Backend & Tools',
    description: 'Supporting scalable manufacturing',
    skills: ['Node.js', 'PostgreSQL', 'Vite', 'Webpack', 'Git', 'Docker'],
  },
]

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

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

      // Animate skill categories
      const categories = categoriesRef.current?.querySelectorAll('.skill-category')
      if (categories) {
        categories.forEach((cat, i) => {
          gsap.from(cat, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })

          // Float animation for skill items
          const items = cat.querySelectorAll('.skill-item')
          items.forEach((item) => {
            gsap.to(item, {
              y: 'random(-5, 5)',
              x: 'random(-5, 5)',
              duration: 'random(2, 4)',
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 'random(0, 2)',
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="skills" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 ref={titleRef} className="skills-title">
            Skills & <br />Technologies
          </h2>
          <p className="skills-subtitle">
            A curated stack of tools for building digital excellence.
          </p>
        </div>
        
        <div ref={categoriesRef} className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <div className="skill-category-header">
                <span className="skill-category-number">0{idx + 1}</span>
                <h3 className="skill-category-title">{category.title}</h3>
              </div>
              <p className="skill-category-desc">{category.description}</p>
              <div className="skill-list">
                {category.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

