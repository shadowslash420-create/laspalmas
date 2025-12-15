import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useOwner } from '../App'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const { siteData } = useOwner()
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToReservation = () => {
    const reservation = document.querySelector('#reservation')
    if (reservation) {
      reservation.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const parallaxOffset = scrollY * 0.4
  const textParallax = scrollY * 0.6
  const imageScale = 1 + (scrollY * 0.0002)
  const overlayOpacity = Math.min(0.8, 0.3 + scrollY * 0.0008)
  const textOpacity = Math.max(0, 1 - scrollY * 0.002)

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/bar-hero.jpg"
          alt="Las Palmas Bar"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.9) contrast(1.05)' }}
        />
      </div>
      
      <div 
        className="absolute inset-0 bg-dark-900 transition-opacity duration-300" 
        style={{ opacity: overlayOpacity }} 
      />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 20%, rgba(10,10,10,0.8) 100%)'
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{
          transform: `translateY(${-textParallax * 0.5}px)`,
        }}
      >
        <h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-gold-400 mb-8 tracking-wider transition-opacity duration-300"
          style={{ 
            textShadow: '0 0 60px rgba(212, 160, 18, 0.4), 0 4px 30px rgba(0,0,0,0.6)',
            opacity: textOpacity,
            transform: `translateY(${-scrollY * 0.3}px)`,
          }}
        >
          {siteData.heroTitle || 'Las Palmas'}
        </h1>
        
        <p 
          className="font-sans text-lg md:text-xl text-sand-200/80 mb-4 tracking-[0.3em] uppercase transition-opacity duration-300"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            opacity: textOpacity,
            transform: `translateY(${-scrollY * 0.2}px)`,
          }}
        >
          {siteData.heroSubtitle}
        </p>
        
        <p 
          className="font-sans text-sm text-sand-300/50 mb-16 tracking-widest transition-opacity duration-300"
          style={{
            opacity: textOpacity,
            transform: `translateY(${-scrollY * 0.15}px)`,
          }}
        >
          P922+7XX, Rue Patrice Lumumba, Oran
        </p>
        
        <button 
          onClick={scrollToReservation}
          className="group relative px-12 py-5 bg-dark-900/50 backdrop-blur-sm border border-gold-500/50 text-gold-400 font-sans text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-700 hover:border-gold-500 hover:bg-gold-500/10"
          style={{
            opacity: textOpacity,
            transform: `translateY(${-scrollY * 0.1}px)`,
          }}
        >
          <span className="relative z-10">Reserve a Table</span>
          <div className="absolute inset-0 bg-gold-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </button>
      </div>

      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollY * 0.005),
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-gold-400/60 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-6 h-10 border border-gold-500/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold-500/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
