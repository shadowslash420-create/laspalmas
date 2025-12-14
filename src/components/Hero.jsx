import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { animateButton } from '../animations/useAnime'

const Hero = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const addressRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const title = titleRef.current
    if (title) {
      const text = title.textContent
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
        delay: anime.stagger(60, { start: 500 }),
      })
    }

    anime({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      easing: 'easeOutCubic',
      duration: 1000,
      delay: 1200,
    })

    anime({
      targets: addressRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutCubic',
      duration: 1000,
      delay: 1400,
    })

    anime({
      targets: buttonRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutElastic(1, .8)',
      duration: 1200,
      delay: 1600,
    })
  }, [])

  const handleButtonClick = (e) => {
    animateButton(e.target)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600 rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bronze-500 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="absolute top-10 left-10 w-32 h-32 text-gold-500 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
        <svg className="absolute bottom-20 right-20 w-48 h-48 text-gold-400 opacity-5" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.3"/>
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 perspective-1000">
        <h1 
          ref={titleRef}
          className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-gold-400 mb-6 tracking-wider"
        >
          Las Palmas
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-sans text-xl md:text-2xl text-sand-200 mb-4 tracking-widest uppercase opacity-0"
        >
          Fine Dining in the Heart of Oran
        </p>
        
        <p 
          ref={addressRef}
          className="font-sans text-sm md:text-base text-sand-300/70 mb-12 tracking-wide opacity-0"
        >
          P922+7XX, Rue Patrice Lumumba, Oran, Algeria
        </p>
        
        <button 
          ref={buttonRef}
          onClick={handleButtonClick}
          className="group relative px-10 py-4 bg-transparent border-2 border-gold-500 text-gold-400 font-sans text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:text-dark-900 opacity-0"
        >
          <span className="relative z-10">Reserve a Table</span>
          <div className="absolute inset-0 bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
