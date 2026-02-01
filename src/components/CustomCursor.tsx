import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide cursor on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      if (cursorRef.current) cursorRef.current.style.display = 'none'
      if (followerRef.current) followerRef.current.style.display = 'none'
      document.body.style.cursor = 'auto'
      return
    }

    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    // Initialize cursor position
    // Initialize cursor position
    gsap.set(cursor, { x: window.innerWidth / 2 + window.scrollX, y: window.innerHeight / 2 + window.scrollY, scale: 0, opacity: 0 })
    gsap.set(follower, { x: window.innerWidth / 2 + window.scrollX, y: window.innerHeight / 2 + window.scrollY, scale: 0, opacity: 0 })

    const updateCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.pageX,
        y: e.pageY,
        duration: 0,
      })

      gsap.to(follower, {
        x: e.pageX,
        y: e.pageY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e)
    }

    // Magnetic effect for links and buttons using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a, button, [data-cursor="magnetic"]') as HTMLElement

      if (link) {
        const rect = link.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2 + window.scrollX
        const centerY = rect.top + rect.height / 2 + window.scrollY

        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(follower, {
          x: centerX,
          y: centerY,
          scale: 2,
          opacity: 0.2,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a, button, [data-cursor="magnetic"]')

      if (link) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(follower, {
          scale: 1,
          opacity: 0.3,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Simple hover effect for elements that are just hovered but not magnetic (optional, kept simple)
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 })
      gsap.to(follower, { scale: 0, opacity: 0, duration: 0.3 })
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={followerRef}
        className="cursor-follower"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>,
    document.body
  )
}

export default CustomCursor

