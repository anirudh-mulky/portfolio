import { useState, useEffect } from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Navbar.css'

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('#hero')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Update active link on scroll
        navLinks.forEach((link) => {
            const section = document.querySelector(link.href)
            if (section) {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setActiveLink(link.href),
                    onEnterBack: () => setActiveLink(link.href),
                })
            }
        })
    }, [])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        setIsMenuOpen(false)

        // Smooth scroll
        const section = document.querySelector(href)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#hero" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
                    <span className="logo-dot glow-cyan"></span>
                    TheWebThread
                    <span className="logo-dot glow-purple"></span>
                </a>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    )}
                </button>

                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                            onClick={(e) => handleLinkClick(e, link.href)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
