import { useEffect, useRef, useState, useCallback } from 'react'
import anime from 'animejs'
import { useOwner } from '../App'
import heroImage from '@assets/images_1765765570695.jfif'

const Hero = () => {
  const { siteData } = useOwner()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const addressRef = useRef(null)
  const buttonRef = useRef(null)
  const sectionRef = useRef(null)
  
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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

  const parallaxOffset = scrollY * 0.5
  const textParallax = scrollY * 0.3
  const imageScale = 1 + (scrollY * 0.0003)
  const overlayOpacity = Math.min(0.7, 0.3 + scrollY * 0.001)

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
          transformOrigin: 'center center',
        }}
      >
        <img 
          src={heroImage} 
          alt="Las Palmas Restaurant" 
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.85) contrast(1.05)',
          }}
        />
        <div 
          className="absolute inset-0 bg-dark-900"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(10,10,10,0.6) 100%)'
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div 
        className="relative z-20 text-center px-6"
        style={{
          transform: `translateY(${-textParallax}px)`,
        }}
      >
        <h1 
          ref={titleRef}
          className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-light text-gold-400 mb-8 tracking-wider"
          style={{ 
            textShadow: '0 0 60px rgba(212, 160, 18, 0.3), 0 4px 30px rgba(0,0,0,0.5)',
            perspective: '1000px'
          }}
        >
          {siteData.heroTitle}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-sans text-lg md:text-xl text-sand-200/80 mb-4 tracking-[0.3em] uppercase opacity-0"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {siteData.heroSubtitle}
        </p>
        
        <p 
          ref={addressRef}
          className="font-sans text-sm text-sand-300/50 mb-16 tracking-widest opacity-0"
        >
          P922+7XX, Rue Patrice Lumumba, Oran, Algeria
        </p>
        
        <button 
          ref={buttonRef}
          onClick={scrollToReservation}
          className="luxury-button group relative px-12 py-5 bg-dark-900/50 backdrop-blur-sm border border-gold-500/50 text-gold-400 font-sans text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-700 hover:border-gold-500 hover:bg-gold-500/10 opacity-0"
        >
          <span className="relative z-10">Reserve a Table</span>
          <div className="absolute inset-0 bg-gold-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </button>
      </div>

      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          opacity: Math.max(0, 1 - scrollY * 0.005),
        }}
      >
        <div className="w-6 h-10 border border-gold-500/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold-500/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
