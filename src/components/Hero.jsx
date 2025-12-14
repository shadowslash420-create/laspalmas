import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useOwner } from '../App'
import AnimatedBackground from './AnimatedBackground'

const Hero = () => {
  const { siteData } = useOwner()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const addressRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const title = titleRef.current
      if (title) {
        const text = siteData.heroTitle
        title.innerHTML = text.split('').map(char => 
          char === ' ' ? '<span class="letter inline-block">&nbsp;</span>' : `<span class="letter inline-block opacity-0">${char}</span>`
        ).join('')

        anime({
          targets: '.hero-title .letter',
          opacity: [0, 1],
          translateY: [80, 0],
          rotateX: [-90, 0],
          easing: 'easeOutExpo',
          duration: 1400,
          delay: anime.stagger(60, { start: 300 }),
        })
      }

      anime({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'easeOutCubic',
        duration: 1000,
        delay: 1000,
      })

      anime({
        targets: addressRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutCubic',
        duration: 1000,
        delay: 1200,
      })

      anime({
        targets: buttonRef.current,
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'easeOutCubic',
        duration: 1000,
        delay: 1400,
      })
    }, 100)

    return () => clearTimeout(timeout)
  }, [siteData.heroTitle])

  const scrollToReservation = () => {
    const reservation = document.querySelector('#reservation')
    if (reservation) {
      reservation.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.7) 100%)'
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-20 text-center px-6">
        <h1 
          ref={titleRef}
          className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-light text-gold-400 mb-8 tracking-wider"
          style={{ 
            textShadow: '0 0 60px rgba(212, 160, 18, 0.2)',
            perspective: '1000px'
          }}
        >
          {siteData.heroTitle}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-sans text-lg md:text-xl text-sand-200/70 mb-4 tracking-[0.3em] uppercase opacity-0"
        >
          {siteData.heroSubtitle}
        </p>
        
        <p 
          ref={addressRef}
          className="font-sans text-sm text-sand-300/40 mb-16 tracking-widest opacity-0"
        >
          P922+7XX, Rue Patrice Lumumba, Oran, Algeria
        </p>
        
        <button 
          ref={buttonRef}
          onClick={scrollToReservation}
          className="luxury-button group relative px-12 py-5 bg-transparent border border-gold-500/40 text-gold-400/80 font-sans text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-700 hover:border-gold-500/80 hover:text-gold-400 opacity-0"
        >
          <span className="relative z-10">Reserve a Table</span>
          <div className="absolute inset-0 bg-gold-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border border-gold-500/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold-500/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
