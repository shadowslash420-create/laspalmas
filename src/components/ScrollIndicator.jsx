import { useEffect, useState, useMemo } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.jsx'
import anime from 'animejs'

const ScrollIndicator = () => {
  const { scrollProgress } = useScrollProgress()
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
      
      anime({
        targets: '.scroll-indicator-container',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1200,
        easing: 'easeOutCubic'
      })

      anime({
        targets: '.scroll-line',
        scaleY: [0, 1],
        duration: 800,
        delay: 400,
        easing: 'easeOutCubic'
      })

      anime({
        targets: '.scroll-dot',
        opacity: [0, 1],
        scale: [0, 1],
        delay: 800,
        duration: 600,
        easing: 'easeOutBack'
      })

      anime({
        targets: '.scroll-text span',
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(50, { start: 1000 }),
        duration: 600,
        easing: 'easeOutCubic'
      })
    }
  }, [isVisible, hasAnimated])

  useEffect(() => {
    if (isVisible) {
      anime({
        targets: '.scroll-dot-inner',
        translateY: [0, 16, 0],
        loop: true,
        duration: 1800,
        easing: 'easeInOutSine'
      })

      anime({
        targets: '.scroll-glow',
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        loop: true,
        duration: 2400,
        easing: 'easeInOutSine'
      })
    }
  }, [isVisible])

  const indicatorStyle = useMemo(() => {
    const opacity = Math.max(0, 1 - scrollProgress * 5)
    return {
      opacity,
      transform: `translateY(${scrollProgress * 50}px)`,
      transition: 'opacity 0.3s ease-out'
    }
  }, [scrollProgress])

  if (!isVisible || scrollProgress > 0.15) return null

  return (
    <div 
      className="scroll-indicator-container fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4"
      style={{ ...indicatorStyle, opacity: 0 }}
    >
      <div className="scroll-text flex gap-[0.15em] text-[10px] tracking-[0.4em] uppercase font-light text-gold-400/70">
        {'scroll'.split('').map((char, i) => (
          <span key={i} className="inline-block opacity-0">{char}</span>
        ))}
      </div>
      
      <div className="relative flex flex-col items-center">
        <div className="scroll-line w-[1px] h-12 bg-gradient-to-b from-gold-400/50 via-gold-500/30 to-transparent origin-top" style={{ transform: 'scaleY(0)' }} />
        
        <div className="scroll-dot absolute top-0 opacity-0">
          <div className="scroll-glow absolute -inset-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="scroll-dot-inner w-1.5 h-1.5 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(212,160,18,0.5)]" />
        </div>
      </div>

      <svg 
        className="w-4 h-4 text-gold-400/50 mt-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        style={{ 
          animation: 'bounce-subtle 2s ease-in-out infinite',
        }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
        />
      </svg>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(4px); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

export default ScrollIndicator
