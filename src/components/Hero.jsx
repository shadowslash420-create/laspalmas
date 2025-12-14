import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { animateButton } from '../animations/useAnime'
import SketchfabEmbed from './SketchfabEmbed'

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
      <SketchfabEmbed modelId="c4eb0ce3d2814a168ce359c707e540df" />
      
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600 rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bronze-500 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 perspective-1000">
        <div className="backdrop-blur-sm bg-dark-900/30 p-8 md:p-16 rounded-2xl border border-gold-500/10">
          <h1 
            ref={titleRef}
            className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-gold-400 mb-6 tracking-wider drop-shadow-2xl"
          >
            Las Palmas
          </h1>
          
          <p 
            ref={subtitleRef}
            className="font-sans text-xl md:text-2xl text-sand-200 mb-4 tracking-widest uppercase opacity-0 drop-shadow-lg"
          >
            Fine Dining in the Heart of Oran
          </p>
          
          <p 
            ref={addressRef}
            className="font-sans text-sm md:text-base text-sand-300/80 mb-12 tracking-wide opacity-0"
          >
            P922+7XX, Rue Patrice Lumumba, Oran, Algeria
          </p>
          
          <button 
            ref={buttonRef}
            onClick={handleButtonClick}
            className="group relative px-10 py-4 bg-dark-900/50 border-2 border-gold-500 text-gold-400 font-sans text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:text-dark-900 opacity-0 backdrop-blur-sm"
          >
            <span className="relative z-10">Reserve a Table</span>
            <div className="absolute inset-0 bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1 h-3 bg-gold-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
