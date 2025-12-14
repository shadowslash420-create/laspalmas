import { useEffect, useRef } from 'react'
import anime from 'animejs'

const AnimatedBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    anime({
      targets: '.floating-shape',
      translateY: [
        { value: -20, duration: 3000 },
        { value: 20, duration: 3000 },
      ],
      translateX: [
        { value: 10, duration: 4000 },
        { value: -10, duration: 4000 },
      ],
      rotateZ: [
        { value: 5, duration: 5000 },
        { value: -5, duration: 5000 },
      ],
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      delay: anime.stagger(500),
    })

    anime({
      targets: '.glow-orb',
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      duration: 4000,
      loop: true,
      easing: 'easeInOutQuad',
      delay: anime.stagger(1000),
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      
      <div className="glow-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-600/20 rounded-full filter blur-[100px]" />
      <div className="glow-orb absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-bronze-500/15 rounded-full filter blur-[120px]" />
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full filter blur-[150px]" />

      <div className="absolute inset-0 transform-style-3d" style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}>
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8 opacity-20">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className="floating-shape border border-gold-500/30 rounded-sm"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d4a012" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="floating-shape absolute top-20 left-20 w-32 h-32 border border-gold-500/20 rounded-full" />
      <div className="floating-shape absolute top-40 right-32 w-24 h-24 border border-gold-400/15 rotate-45" />
      <div className="floating-shape absolute bottom-32 left-1/4 w-40 h-40 border border-bronze-500/20 rounded-lg rotate-12" />
      <div className="floating-shape absolute bottom-20 right-20 w-28 h-28 border border-gold-500/25 rounded-full" />

      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50" />
    </div>
  )
}

export default AnimatedBackground
