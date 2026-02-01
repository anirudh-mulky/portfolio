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

        // Recalculate on resize
        const resizeObserver = new ResizeObserver(() => {
            calculateTop()
        })

        if (sectionRef.current) {
            resizeObserver.observe(sectionRef.current)
        }

        window.addEventListener('resize', calculateTop)

        return () => {
            window.removeEventListener('resize', calculateTop)
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <div
            ref={sectionRef}
            id={id}
            className={`stacked-section ${className}`}
            style={{
                position: 'sticky',
                top: `${stickyTop}px`,
            }}
        >
            {children}
        </div>
    )
}

export default StackedSection
