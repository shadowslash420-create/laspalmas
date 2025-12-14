import { useEffect, useRef, useState } from 'react'

const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
  const sectionRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            const scrolled = window.innerHeight - rect.top
            setOffset(scrolled * speed * 0.1)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, speed])

  return (
    <div 
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ 
        transform: `translateY(${offset}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

export default ParallaxSection
