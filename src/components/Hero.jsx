import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useOwner } from '../App'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const { siteData } = useOwner()
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textTopRef = useRef(null)
  const textBottomRef = useRef(null)
  const subtitleRef = useRef(null)
  const addressRef = useRef(null)
  const buttonRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: true
        }
      })

      tl.fromTo(imageRef.current, 
        { y: 0, scale: 1 }, 
        { y: -100, scale: 1.15 }, 
        0
      )
      tl.fromTo('.hero-overlay', 
        { opacity: 0.3 }, 
        { opacity: 0.75 }, 
        0
      )
      tl.fromTo(textTopRef.current, 
        { y: 0, opacity: 1 }, 
        { y: -120, opacity: 0 }, 
        0
      )
      tl.fromTo(textBottomRef.current, 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        0
      )
      tl.fromTo(subtitleRef.current, 
        { y: 0, opacity: 0.8 }, 
        { y: -60, opacity: 0 }, 
        0
      )
      tl.fromTo(addressRef.current, 
        { y: 0, opacity: 0.5 }, 
        { y: -40, opacity: 0 }, 
        0
      )
      tl.fromTo(buttonRef.current, 
        { y: 0, opacity: 1 }, 
        { y: -80, opacity: 0 }, 
        0
      )
      tl.fromTo(scrollIndicatorRef.current, 
        { opacity: 1 }, 
        { opacity: 0 }, 
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToReservation = () => {
    const reservation = document.querySelector('#reservation')
    if (reservation) {
      reservation.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <img
        ref={imageRef}
        src="/bar-hero.jpg"
        alt="Las Palmas Bar"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.9) contrast(1.05)' }}
      />
      
      <div className="hero-overlay absolute inset-0 bg-dark-900" style={{ opacity: 0.3 }} />
      
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

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 
          ref={textTopRef}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-gold-400 mb-2 tracking-wider"
          style={{ 
            textShadow: '0 0 60px rgba(212, 160, 18, 0.4), 0 4px 30px rgba(0,0,0,0.6)',
          }}
        >
          {siteData.heroTitle.split(' ')[0] || 'Las'}
        </h1>
        
        <h1 
          ref={textBottomRef}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-gold-400 mb-8 tracking-wider"
          style={{ 
            textShadow: '0 0 60px rgba(212, 160, 18, 0.4), 0 4px 30px rgba(0,0,0,0.6)',
            opacity: 0
          }}
        >
          {siteData.heroTitle.split(' ')[1] || 'Palmas'}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-sans text-lg md:text-xl text-sand-200/80 mb-4 tracking-[0.3em] uppercase"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {siteData.heroSubtitle}
        </p>
        
        <p 
          ref={addressRef}
          className="font-sans text-sm text-sand-300/50 mb-16 tracking-widest"
        >
          P922+7XX, Rue Patrice Lumumba, Oran
        </p>
        
        <button 
          ref={buttonRef}
          onClick={scrollToReservation}
          className="group relative px-12 py-5 bg-dark-900/50 backdrop-blur-sm border border-gold-500/50 text-gold-400 font-sans text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-700 hover:border-gold-500 hover:bg-gold-500/10"
        >
          <span className="relative z-10">Reserve a Table</span>
          <div className="absolute inset-0 bg-gold-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </button>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
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
