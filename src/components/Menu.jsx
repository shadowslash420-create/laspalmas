import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'
import { useOwner } from '../App'

import lambChopsImg from '@assets/generated_images/luxury_grilled_lamb_chops.png'
import seaBassImg from '@assets/generated_images/mediterranean_grilled_sea_bass.png'
import couscousImg from '@assets/generated_images/couscous_royal_fine_dining.png'
import paellaImg from '@assets/generated_images/luxury_seafood_paella.png'
import tenderloinImg from '@assets/generated_images/premium_beef_tenderloin.png'
import baklavaImg from '@assets/generated_images/luxury_baklava_dessert.png'

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

const MenuCard = ({ item, delay }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsRevealed(true)
              setTimeout(() => setShowName(true), 400)
              setTimeout(() => setShowDescription(true), 800)
            }, delay)
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

  const handleMouseMove = (e) => {
    if (isTouchDevice || !imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    const rotateY = (x - 0.5) * 8
    const rotateX = (y - 0.5) * -8
    
    imageRef.current.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02) translateZ(20px)`
  }

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsActive(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsActive(false)
      if (imageRef.current) {
        imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)'
      }
    }
  }

  const handleClick = () => {
    if (isTouchDevice) {
      setIsActive(prev => !prev)
    }
  }

  const image = menuImages[item.id] || item.image
  const poetic = poeticLines[item.id] || item.poetic || item.origin

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className={`relative overflow-hidden rounded-lg transition-all duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
        <div 
          ref={imageRef}
          className="relative aspect-[4/3] overflow-hidden transition-transform duration-500 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {image && (
            <img 
              src={image} 
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                filter: isActive ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.95)',
              }}
            />
          )}
          
          <div 
            className={`absolute inset-0 pointer-events-none ${isActive ? 'animate-light-sweep' : ''}`}
            style={{
              background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 1.2s ease-out, opacity 0.5s',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-80" />
          
          <div 
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)',
              opacity: isActive ? 0.3 : 0.7,
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <p 
            className={`text-gold-500/50 text-xs tracking-[0.3em] uppercase mb-2 transition-all duration-700 ${showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            {item.category}
          </p>
          
          <h3 
            className={`font-serif text-xl md:text-3xl lg:text-4xl text-gold-400 mb-2 md:mb-3 transition-all duration-700 ${showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ 
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              transitionDelay: '200ms'
            }}
          >
            {item.title}
          </h3>
          
          <div 
            className={`overflow-hidden transition-all duration-700 ease-out ${isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="font-sans text-sand-200/80 text-sm leading-relaxed mb-2 md:mb-3">
              {item.description}
            </p>
            <p className="font-sans text-gold-500/60 text-xs italic tracking-wide">
              "{poetic}"
            </p>
          </div>

          <p 
            className={`font-sans text-sand-300/30 text-xs tracking-widest uppercase mt-3 md:mt-4 transition-all duration-500 ${showDescription && !isActive ? 'opacity-100' : 'opacity-0'}`}
          >
            {isTouchDevice ? 'Tap to discover' : 'Hover to discover'}
          </p>
        </div>

        <div 
          className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: isActive ? 'translateX(0)' : 'translateX(-100%)',
          }}
        />
      </div>
    </div>
  )
}

const Menu = () => {
  const { siteData } = useOwner()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', ...new Set(siteData.menuItems.map(item => item.category))]
  
  const filteredItems = activeFilter === 'All' 
    ? siteData.menuItems 
    : siteData.menuItems.filter(item => item.category === activeFilter)

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
    <section id="menu" className="relative py-20 md:py-32 lg:py-40 px-4 md:px-8 lg:px-16 bg-dark-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/3 rounded-full filter blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gold-500/2 rounded-full filter blur-[180px]" />
      </div>

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20 lg:mb-28">
          <p 
            ref={subtitleRef}
            className="font-sans text-gold-500/40 text-xs tracking-[0.5em] uppercase mb-6 md:mb-8 opacity-0"
          >
            A Private Gallery
          </p>
          <h2 
            ref={titleRef}
            className="font-serif text-3xl md:text-6xl lg:text-8xl text-gold-400 font-light opacity-0"
            style={{ textShadow: '0 0 80px rgba(212, 160, 18, 0.15)' }}
          >
            The Collection
          </h2>
        </div>

        <div className="flex justify-center gap-3 md:gap-8 lg:gap-12 mb-10 md:mb-16 lg:mb-20 flex-wrap px-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`font-sans text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-700 py-2 px-1 border-b-2 ${
                activeFilter === category 
                  ? 'text-gold-400 border-gold-500/60' 
                  : 'text-sand-300/30 border-transparent hover:text-sand-300/60 hover:border-gold-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              delay={index * 150}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 md:mt-20">
          <p className="font-sans text-sand-300/20 text-xs tracking-[0.3em] uppercase">
            Each creation is prepared with intention
          </p>
        </div>
      </div>
    </section>
  )
}

export default Menu
