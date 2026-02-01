import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Services from './components/Services'

import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StackedSection from './components/StackedSection'
import GlobalNoise from './components/GlobalNoise'

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
      <GlobalNoise />
      <Navbar />
      <StackedSection id="hero"><Hero /></StackedSection>
      <StackedSection id="about"><About /></StackedSection>
      <StackedSection id="work"><Work /></StackedSection>
      <StackedSection id="services"><Services /></StackedSection>

      <StackedSection id="reviews"><Reviews /></StackedSection>
      <StackedSection id="contact"><Contact /></StackedSection>
      <Footer />
    </div>
  )
}

export default App

