import { useEffect, useRef } from 'react'
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
    gsap.set(cursor, { x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 0, opacity: 0 })
    gsap.set(follower, { x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 0, opacity: 0 })

    const updateCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      })

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e)
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 0.3, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 })
      gsap.to(follower, { scale: 0, opacity: 0, duration: 0.3 })
    }

    // Magnetic effect for links and buttons
    const handleLinkEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

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

    const handleLinkLeave = () => {
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

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    // Add magnetic effect to all links and buttons
    const links = document.querySelectorAll('a, button, [data-cursor="magnetic"]')
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkEnter as EventListener)
      link.addEventListener('mouseleave', handleLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkEnter as EventListener)
        link.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
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
          position: 'fixed',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}

export default CustomCursor

