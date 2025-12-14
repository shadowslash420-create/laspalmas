import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

const AnimatedBackground = () => {
  const containerRef = useRef(null)
  const [isIdle, setIsIdle] = useState(true)
  const idleTimeoutRef = useRef(null)

  useEffect(() => {
    anime({
      targets: '.glow-orb',
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.1, 1],
      duration: 6000,
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(2000),
    })

    anime({
      targets: '.ambient-element',
      translateY: [0, -8, 0],
      duration: 4000,
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(500),
    })

    const handleScroll = () => {
      setIsIdle(false)
      clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true)
      }, 2000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(idleTimeoutRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      
      <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold-600/15 rounded-full filter blur-[150px]" />
      <div className="glow-orb absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-bronze-500/10 rounded-full filter blur-[180px]" />
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/8 rounded-full filter blur-[200px]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d4a012" strokeWidth="0.3" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="ambient-element absolute top-20 left-[15%] w-24 h-24 border border-gold-500/10 rounded-full" />
      <div className="ambient-element absolute top-[40%] right-[10%] w-16 h-16 border border-gold-400/8 rotate-45" />
      <div className="ambient-element absolute bottom-[30%] left-[20%] w-20 h-20 border border-bronze-500/10 rounded-sm rotate-12" />

      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/30" />
      
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,10,0.4) 100%)'
        }}
      />
    </div>
  )
}

export default AnimatedBackground
