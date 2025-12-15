import { useRef, useEffect, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import anime from 'animejs'
import { useOwner } from '../App'

import lambChopsImg from '@assets/generated_images/luxury_grilled_lamb_chops.png'
import seaBassImg from '@assets/generated_images/mediterranean_grilled_sea_bass.png'
import couscousImg from '@assets/generated_images/couscous_royal_fine_dining.png'
import paellaImg from '@assets/generated_images/luxury_seafood_paella.png'
import tenderloinImg from '@assets/generated_images/premium_beef_tenderloin.png'
import baklavaImg from '@assets/generated_images/luxury_baklava_dessert.png'

gsap.registerPlugin(ScrollTrigger)

const menuImages = {
  1: lambChopsImg,
  2: seaBassImg,
  3: couscousImg,
  4: paellaImg,
  5: tenderloinImg,
  6: baklavaImg,
}

const poeticLines = {
  1: 'Prepared slowly over open flame, inspired by ancient traditions.',
  2: 'From the Mediterranean waters, served with intention.',
  3: 'A family recipe, perfected through generations of love.',
  4: 'Where Spanish soul meets Algerian heart.',
  5: 'Aged with patience, served with pride.',
  6: 'Sweetness that whispers of Ottoman gardens.',
}

const dishDetails = {
  1: { calories: '580 kcal', prepTime: '45 min' },
  2: { calories: '420 kcal', prepTime: '30 min' },
  3: { calories: '720 kcal', prepTime: '55 min' },
  4: { calories: '650 kcal', prepTime: '40 min' },
  5: { calories: '520 kcal', prepTime: '35 min' },
  6: { calories: '380 kcal', prepTime: '15 min' }
}

const BayWindowSlider = ({ items }) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const cards = cardsRef.current.filter(Boolean)
    const cardWidth = 380
    const totalWidth = cards.length * cardWidth

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        rotateY: (i) => i * 15,
        transformOrigin: '50% 50%',
        z: -200,
      })

      gsap.to(trackRef.current, {
        x: () => -(totalWidth - window.innerWidth + 200),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 20%',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })

      cards.forEach((card, i) => {
        gsap.to(card, {
          rotateY: 0,
          z: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * 150} 40%`,
            end: `top+=${i * 150 + 300} 40%`,
            scrub: 1,
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [items])

  return (
    <div ref={containerRef} className="bay-window-container relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <div 
        ref={trackRef}
        className="bay-window-track flex items-center gap-8 px-20"
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => {
          const image = menuImages[item.id] || item.image
          const poetic = poeticLines[item.id] || item.origin
          const details = dishDetails[item.id] || { calories: '450 kcal', prepTime: '30 min' }
          
          return (
            <div
              key={item.id}
              ref={el => cardsRef.current[index] = el}
              className="bay-card flex-shrink-0 w-[380px] bg-dark-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gold-500/20 shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="relative h-56 overflow-hidden">
                {image && (
                  <img 
                    src={image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-gold-400 font-semibold">{item.price}</span>
                </div>
              </div>
              
              <div className="p-6">
                <span className="text-gold-500/60 text-xs uppercase tracking-[0.3em]">{item.category}</span>
                <h3 className="font-serif text-2xl text-gold-400 mt-2 mb-3">{item.title}</h3>
                <p className="text-sand-300/70 text-sm leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center gap-4 text-sand-400/50 text-xs mb-4">
                  <span>{details.calories}</span>
                  <span>•</span>
                  <span>{details.prepTime}</span>
                </div>
                <p className="text-gold-500/40 text-sm italic">"{poetic}"</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Menu = () => {
  const { siteData } = useOwner()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = useMemo(() => 
    ['All', ...new Set(siteData.menuItems.map(item => item.category))],
    [siteData.menuItems]
  )
  
  const filteredItems = useMemo(() => 
    activeFilter === 'All' 
      ? siteData.menuItems 
      : siteData.menuItems.filter(item => item.category === activeFilter),
    [activeFilter, siteData.menuItems]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: subtitleRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutCubic',
              duration: 1000,
            })
            anime({
              targets: titleRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
              easing: 'easeOutCubic',
              duration: 1200,
              delay: 200,
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

  return (
    <section id="menu" className="relative bg-dark-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/3 rounded-full filter blur-[200px]" />
      </div>

      <div className="relative z-10 pt-20 md:pt-32 lg:pt-40 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-20">
          <p 
            ref={subtitleRef}
            className="font-sans text-gold-500/40 text-xs tracking-[0.5em] uppercase mb-6 md:mb-8 opacity-0"
          >
            Our Signature Dishes
          </p>
          <h2 
            ref={titleRef}
            className="font-serif text-3xl md:text-6xl lg:text-8xl text-gold-400 font-light opacity-0"
            style={{ textShadow: '0 0 80px rgba(212, 160, 18, 0.15)' }}
          >
            The Collection
          </h2>
        </div>

        <div className="flex justify-center mb-10 md:mb-16">
          <div className="flex gap-4 flex-wrap justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 text-xs uppercase tracking-widest border rounded-full transition-all duration-300 ${
                  activeFilter === category 
                    ? 'bg-gold-500/20 border-gold-500 text-gold-400' 
                    : 'border-gold-500/30 text-gold-500/60 hover:border-gold-500/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BayWindowSlider items={filteredItems} />
    </section>
  )
}

export default Menu
