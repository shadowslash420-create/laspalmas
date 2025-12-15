import { useRef, useEffect } from 'react'
import anime from 'animejs'
import { useOwner } from '../App'
import FloatingLines from './FloatingLines'

const About = () => {
  const { siteData } = useOwner()
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: textRef.current?.querySelectorAll('.reveal-text'),
              opacity: [0, 1],
              translateY: [60, 0],
              easing: 'easeOutCubic',
              duration: 1200,
              delay: anime.stagger(200),
            })

            anime({
              targets: imageRef.current,
              opacity: [0, 1],
              translateX: [80, 0],
              easing: 'easeOutCubic',
              duration: 1400,
              delay: 400,
            })

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-dark-800 overflow-hidden z-10"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={['#d4a012', '#c9a227', '#b8860b', '#8b6914', '#654321']}
          animationSpeed={0.8}
          mixBlendMode="screen"
        />
      </div>

      <div className="absolute inset-0 opacity-10" style={{ zIndex: 1 }}>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-600/20 to-transparent" />
      </div>

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          zIndex: 2
        }}
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center relative" style={{ zIndex: 3 }}>
        <div ref={textRef}>
          <p className="reveal-text opacity-0 font-sans text-gold-500/50 text-xs tracking-[0.4em] uppercase mb-6">
            Our Story
          </p>
          <h2 className="reveal-text opacity-0 font-serif text-5xl md:text-6xl lg:text-7xl text-gold-400 mb-10 font-light">
            A Legacy of <br />Excellence
          </h2>
          
          <p className="reveal-text opacity-0 font-sans text-lg text-sand-200/70 leading-relaxed mb-10">
            {siteData.aboutText}
          </p>
          
          <div className="reveal-text opacity-0 flex gap-12 md:gap-16 mt-12">
            <div>
              <div className="font-serif text-4xl md:text-5xl text-gold-400 mb-2">Quality</div>
              <p className="text-sand-300/40 text-xs tracking-widest uppercase">Premium Ingredients</p>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-5xl text-gold-400 mb-2">Comfort</div>
              <p className="text-sand-300/40 text-xs tracking-widest uppercase">Elegant Ambiance</p>
            </div>
          </div>
        </div>

        <div 
          ref={imageRef}
          className="relative opacity-0"
        >
          <div className="relative aspect-[4/5] bg-dark-700 rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-600/10 via-transparent to-bronze-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-serif text-8xl md:text-9xl text-gold-400/30 mb-4">LP</div>
                <div className="w-16 h-px bg-gold-500/30 mx-auto mb-4" />
                <p className="text-sand-200/40 text-xs tracking-[0.3em] uppercase">Est. 2020</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 rounded-sm -z-10" />
          <div className="absolute -bottom-8 -right-8 w-full h-full border border-gold-500/10 rounded-sm -z-20" />
        </div>
      </div>
    </section>
  )
}

export default About
