import { useRef, useEffect } from 'react'
import anime from 'animejs'
import { animateButton } from '../animations/useAnime'

const Reservation = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: contentRef.current?.querySelectorAll('.reveal-item'),
              opacity: [0, 1],
              translateY: [60, 0],
              easing: 'easeOutCubic',
              duration: 1000,
              delay: anime.stagger(150),
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

  const handleButtonClick = (e) => {
    animateButton(e.currentTarget)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-bronze-500/10 rounded-full filter blur-[120px]"></div>
      </div>

      <div 
        ref={contentRef}
        className="max-w-4xl mx-auto relative z-10 text-center"
      >
        <h2 className="reveal-item opacity-0 font-serif text-5xl md:text-7xl text-gold-400 mb-6">
          Reserve Your Table
        </h2>
        
        <p className="reveal-item opacity-0 font-sans text-xl text-sand-200/80 mb-12 max-w-2xl mx-auto">
          Join us for an unforgettable dining experience. Book your table today and let us create lasting memories together.
        </p>

        <div className="reveal-item opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={handleButtonClick}
            className="group relative px-12 py-5 bg-gold-500 text-dark-900 font-sans font-semibold text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:bg-gold-400"
          >
            <span className="relative z-10">Reserve Now</span>
          </button>

          <button 
            onClick={handleButtonClick}
            className="group relative flex items-center gap-3 px-8 py-5 bg-transparent border-2 border-green-500 text-green-400 font-sans text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:bg-green-500 hover:text-dark-900"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="relative z-10">WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Reservation
