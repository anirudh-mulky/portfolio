import { useEffect, useRef, useState, ReactNode } from 'react'


interface StackedSectionProps {
    children: ReactNode
    id?: string
    className?: string
}

const StackedSection = ({ children, id, className = '' }: StackedSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [stickyTop, setStickyTop] = useState(0)

    useEffect(() => {
        let lastWidth = window.innerWidth

        const calculateTop = () => {
            if (sectionRef.current) {
                const height = sectionRef.current.offsetHeight
                const windowHeight = window.innerHeight

                // If section is taller than viewport, we want it to scroll until the bottom touches the bottom of the viewport
                if (height > windowHeight) {
                    setStickyTop(windowHeight - height)
                } else {
                    // If shorter, it sticks to top
                    setStickyTop(0)
                }
            }
        }

        // Calculate initially
        calculateTop()

        // Recalculate on resize, but filter out address bar toggles on mobile
        const handleResize = () => {
            const currentWidth = window.innerWidth
            // Only recalculate if width changes (orientation change or desktop resize)
            // or if it's not a touch device (desktop usually doesn't have address bar resize issues like mobile)
            const isMobile = window.matchMedia('(max-width: 768px)').matches

            if (!isMobile || currentWidth !== lastWidth) {
                calculateTop()
            }
            lastWidth = currentWidth
        }

        const resizeObserver = new ResizeObserver(() => {
            // For content size changes, we generally want to update
            calculateTop()
        })

        if (sectionRef.current) {
            resizeObserver.observe(sectionRef.current)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            resizeObserver.disconnect()
        }
    }, [])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div
            ref={sectionRef}
            id={id}
            className={`stacked-section ${className}`}
            style={{
                position: isMobile ? 'relative' : 'sticky',
                top: isMobile ? 'auto' : `${stickyTop}px`,
                zIndex: isMobile ? 1 : undefined // Ensure natural stacking context
            }}
        >
            {children}
        </div>
    )
}

export default StackedSection
