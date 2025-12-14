import { useRef, useEffect } from 'react'
import anime from 'animejs'
import { useAmbientFloat } from '../animations/useAnime'

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useAmbientFloat(imageRef, { distance: 15 })

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
              duration: 1000,
              delay: anime.stagger(200),
            })

            anime({
              targets: imageRef.current,
              opacity: [0, 1],
              translateX: [100, 0],
              rotateY: [-15, 0],
              easing: 'easeOutCubic',
              duration: 1200,
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
      className="relative py-32 px-6 md:px-16 lg:px-24 bg-dark-800 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-600/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="perspective-1000">
          <h2 className="reveal-text opacity-0 font-serif text-5xl md:text-6xl text-gold-400 mb-8">
            Our Story
          </h2>
          
          <p className="reveal-text opacity-0 font-sans text-lg text-sand-200/80 leading-relaxed mb-6">
            Nestled in the vibrant heart of Oran, Las Palmas brings together the warmth of Algerian hospitality with the sophistication of Mediterranean cuisine. Our journey began with a simple vision: to create an extraordinary dining experience that celebrates the rich culinary heritage of our region.
          </p>
          
          <div className="reveal-text opacity-0 grid grid-cols-3 gap-6 mt-10">
            <div className="text-center">
              <div className="font-serif text-4xl text-gold-500 mb-2">Quality</div>
              <p className="text-sand-300/60 text-sm">Premium Ingredients</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl text-gold-500 mb-2">Comfort</div>
              <p className="text-sand-300/60 text-sm">Elegant Ambiance</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl text-gold-500 mb-2">Flavor</div>
              <p className="text-sand-300/60 text-sm">Local & International</p>
            </div>
          </div>
        </div>

        <div 
          ref={imageRef}
          className="relative perspective-1000 transform-style-3d opacity-0"
        >
          <div className="relative bg-gradient-to-br from-dark-600 to-dark-700 rounded-lg p-8 shadow-2xl shadow-gold-900/20">
            <div className="aspect-[4/3] bg-gradient-to-br from-gold-600/20 via-bronze-500/10 to-dark-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="font-serif text-6xl text-gold-400 mb-4">LP</div>
                <p className="text-sand-200/60 text-sm tracking-widest uppercase">Est. 2020</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold-500/30 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
