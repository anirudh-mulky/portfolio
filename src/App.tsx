import { useEffect, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StackedSection from './components/StackedSection'

// Lazy load heavy sections below the fold
const About = lazy(() => import('./components/About'))
const Work = lazy(() => import('./components/Work'))
const Services = lazy(() => import('./components/Services'))
const Reviews = lazy(() => import('./components/Reviews'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))


import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Smooth scroll with Lenis - Ultra Smooth Config
    const lenis = new Lenis({
      duration: 1.5, // Increased from 1.2 for more "weight" and smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay (standard for premium feel)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly more responsive to wheel
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    const rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar />
      <StackedSection id="hero"><Hero /></StackedSection>
      <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
        <StackedSection id="about"><About /></StackedSection>
        <StackedSection id="work"><Work /></StackedSection>
        <StackedSection id="services"><Services /></StackedSection>

        <StackedSection id="reviews"><Reviews /></StackedSection>
        <StackedSection id="contact"><Contact /></StackedSection>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App

