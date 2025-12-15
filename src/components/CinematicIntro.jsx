import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

const Loader = () => (
  <div className="loader">
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="text"><span>Loading</span></div>
    <div className="line"></div>
  </div>
)

const CinematicIntro = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const containerRef = useRef(null)
  const loaderRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)
  const grainRef = useRef(null)

  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutCubic',
    })

    const loadingTimer = setTimeout(() => {
      anime({
        targets: loaderRef.current,
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutCubic',
        complete: () => {
          setIsLoading(false)
        }
      })
    }, 2500)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      anime({
        targets: contentRef.current,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutCubic',
      })

      anime({
        targets: grainRef.current,
        opacity: [0, 0.04],
        duration: 800,
        easing: 'easeOutCubic',
      })

      setTimeout(() => {
        setIsRevealed(true)
      }, 300)
    }
  }, [isLoading])

  useEffect(() => {
    if (isRevealed && titleRef.current) {
      const title = titleRef.current
      const text = title.textContent
      title.innerHTML = text.split('').map(char => 
        char === ' ' ? '<span class="intro-letter inline-block">&nbsp;</span>' : `<span class="intro-letter inline-block opacity-0">${char}</span>`
      ).join('')

      const timeline = anime.timeline({
        easing: 'easeOutExpo',
      })

      timeline
        .add({
          targets: '.intro-letter',
          opacity: [0, 1],
          translateY: [100, 0],
          rotateX: [-90, 0],
          duration: 1800,
          delay: anime.stagger(80),
        })
        .add({
          targets: subtitleRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1200,
        }, '-=800')
        .add({
          targets: buttonRef.current,
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 1000,
        }, '-=600')
    }
  }, [isRevealed])

  const handleEnter = () => {
    setIsExiting(true)
    
    anime({
      targets: containerRef.current,
      opacity: [1, 0],
      duration: 1500,
      easing: 'easeInOutQuad',
      complete: () => {
        onEnter()
      }
    })
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-dark-900 flex flex-col items-center justify-center overflow-hidden ${isExiting ? 'pointer-events-none' : ''}`}
      style={{ opacity: 0 }}
    >
      <div 
        ref={grainRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-900/80 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.6) 100%)'
        }}
      />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/30 rounded-full filter blur-[200px]" />
      </div>

      {isLoading && (
        <div ref={loaderRef} className="relative z-10">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <div ref={contentRef} className="relative z-10 text-center px-6" style={{ opacity: 0 }}>
          <h1 
            ref={titleRef}
            className="font-serif text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-light text-gold-400 tracking-[0.1em] sm:tracking-[0.15em] mb-6 sm:mb-8"
            style={{ 
              textShadow: '0 0 80px rgba(212, 160, 18, 0.3)',
              perspective: '1000px'
            }}
          >
            Las Palmas
          </h1>
          
          <p 
            ref={subtitleRef}
            className="font-sans text-sm md:text-base text-sand-300/60 tracking-[0.4em] uppercase mb-16 opacity-0"
          >
            Fine Mediterranean Dining
          </p>

          <button
            ref={buttonRef}
            onClick={handleEnter}
            className="group relative px-8 py-4 sm:px-12 sm:py-5 bg-transparent border border-gold-500/40 text-gold-400/80 font-sans text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] overflow-hidden transition-all duration-700 hover:border-gold-500/80 hover:text-gold-400 opacity-0"
          >
            <span className="relative z-10">Enter Experience</span>
            <div className="absolute inset-0 bg-gold-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </button>
        </div>
      )}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <p className="font-sans text-xs text-sand-300/30 tracking-[0.2em]">
          P922+7XX, Rue Patrice Lumumba, Oran
        </p>
      </div>
    </div>
  )
}

export default CinematicIntro
