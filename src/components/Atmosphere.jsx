import { useRef, useEffect } from 'react'
import anime from 'animejs'

const AtmosphereCard = ({ title, description, delay }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [60, 0],
              easing: 'easeOutCubic',
              duration: 1200,
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
      className="relative group opacity-0"
    >
      <div className="relative bg-dark-800/30 backdrop-blur-sm p-10 md:p-12 rounded-sm border border-gold-500/10 hover:border-gold-500/20 transition-all duration-700">
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-gold-500/20" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gold-500/20" />
        
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(135deg, rgba(212,160,18,0.02) 0%, transparent 100%)'
          }}
        />
        
        <h3 className="font-serif text-2xl md:text-3xl text-gold-400 mb-6 font-light">{title}</h3>
        <p className="font-sans text-sand-200/60 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  )
}

const Atmosphere = () => {
  const titleRef = useRef(null)

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
              duration: 1200,
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
    <section className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-dark-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full filter blur-[200px]" />
      </div>
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20 md:mb-24 opacity-0">
          <p className="font-sans text-gold-500/50 text-xs tracking-[0.4em] uppercase mb-6">
            Where Every Detail Matters
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold-400 font-light">
            The Experience
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {atmosphereItems.map((item, index) => (
            <AtmosphereCard
              key={item.title}
              title={item.title}
              description={item.description}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Atmosphere
