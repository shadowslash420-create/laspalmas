import { useRef, useEffect } from 'react'
import anime from 'animejs'
import { useCardTilt, useAmbientFloat } from '../animations/useAnime'

const AtmosphereCard = ({ title, description, delay }) => {
  const cardRef = useRef(null)
  useCardTilt(cardRef)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [60, 0],
              rotateX: [-10, 0],
              easing: 'easeOutCubic',
              duration: 1000,
              delay: delay,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="relative perspective-1000 transform-style-3d opacity-0"
    >
      <div className="relative bg-gradient-to-br from-dark-700/50 to-dark-800/50 backdrop-blur-sm p-10 rounded-2xl border border-gold-500/10 hover:border-gold-500/30 transition-all duration-500">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold-500/30 rounded-tl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-500/30 rounded-br-2xl"></div>
        
        <h3 className="font-serif text-3xl text-gold-400 mb-4">{title}</h3>
        <p className="font-sans text-sand-200/70 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const Atmosphere = () => {
  const titleRef = useRef(null)
  const decorRef = useRef(null)

  useAmbientFloat(decorRef, { distance: 20 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: titleRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              easing: 'easeOutCubic',
              duration: 1000,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const atmosphereItems = [
    {
      title: 'Elegant Ambiance',
      description: 'Immerse yourself in our sophisticated setting where warm lighting meets contemporary design, creating the perfect backdrop for memorable moments.',
    },
    {
      title: 'Exceptional Service',
      description: 'Our dedicated team ensures every visit is extraordinary, anticipating your needs with genuine warmth and professional attentiveness.',
    },
    {
      title: 'Curated Experience',
      description: 'From the moment you enter, every detail has been thoughtfully designed to engage your senses and elevate your dining journey.',
    },
  ]

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 bg-dark-800 overflow-hidden">
      <div 
        ref={decorRef}
        className="absolute top-20 right-10 w-64 h-64 border border-gold-500/10 rounded-full"
      ></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-gold-500/5 rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20 opacity-0">
          <h2 className="font-serif text-5xl md:text-7xl text-gold-400 mb-4">
            The Experience
          </h2>
          <p className="font-sans text-sand-300/60 tracking-widest uppercase text-sm">
            Where Every Detail Matters
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {atmosphereItems.map((item, index) => (
            <AtmosphereCard
              key={item.title}
              title={item.title}
              description={item.description}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Atmosphere
