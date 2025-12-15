import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
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

const dishDetails = {
  1: {
    ingredients: ['Premium lamb', 'Rosemary', 'Thyme', 'Garlic', 'Olive oil', 'Sea salt'],
    calories: '580 kcal',
    chefNote: 'Chef recommends medium-rare for optimal tenderness',
    prepTime: '45 min'
  },
  2: {
    ingredients: ['Fresh sea bass', 'Lemon', 'Capers', 'White wine', 'Parsley', 'Butter'],
    calories: '420 kcal',
    chefNote: 'Pairs beautifully with our house Chardonnay',
    prepTime: '30 min'
  },
  3: {
    ingredients: ['Hand-rolled semolina', 'Saffron', 'Lamb', 'Chicken', 'Seasonal vegetables', 'Chickpeas'],
    calories: '720 kcal',
    chefNote: 'A signature dish - allow 20 minutes for authentic preparation',
    prepTime: '55 min'
  },
  4: {
    ingredients: ['Bomba rice', 'Prawns', 'Mussels', 'Calamari', 'Saffron', 'Paprika'],
    calories: '650 kcal',
    chefNote: 'Best shared between two for the complete experience',
    prepTime: '40 min'
  },
  5: {
    ingredients: ['Aged beef tenderloin', 'Truffle butter', 'Black pepper', 'Shallots', 'Red wine reduction'],
    calories: '520 kcal',
    chefNote: 'Our sommelier suggests pairing with Malbec',
    prepTime: '35 min'
  },
  6: {
    ingredients: ['Phyllo pastry', 'Pistachios', 'Honey', 'Rose water', 'Cardamom'],
    calories: '380 kcal',
    chefNote: 'Best served with Turkish coffee',
    prepTime: '15 min'
  }
}

const BayWindowSlider = ({ items }) => {
  const sliderRef = useRef(null)
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [currentScroll, setCurrentScroll] = useState(0)

  const cardWidth = 380
  const cardGap = 30

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
    sliderRef.current.style.cursor = 'grabbing'
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      setCurrentScroll(sliderRef.current.scrollLeft)
    }
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', handleScroll, { passive: true })
      return () => slider.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const getCardTransform = (index) => {
    if (!sliderRef.current) return {}
    
    const sliderCenter = sliderRef.current.offsetWidth / 2
    const cardPosition = (index * (cardWidth + cardGap)) - currentScroll + (cardWidth / 2)
    const distanceFromCenter = cardPosition - sliderCenter
    const normalizedDistance = distanceFromCenter / sliderCenter
    
    const rotateY = normalizedDistance * -25
    const translateZ = -Math.abs(normalizedDistance) * 100
    const scale = 1 - Math.abs(normalizedDistance) * 0.15
    const opacity = 1 - Math.abs(normalizedDistance) * 0.4
    
    return {
      transform: `perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${Math.max(0.7, scale)})`,
      opacity: Math.max(0.3, opacity),
      zIndex: Math.round(10 - Math.abs(normalizedDistance) * 5),
    }
  }

  return (
    <div className="bay-window-wrapper">
      <div
        ref={sliderRef}
        className="bay-window-scroll-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        <div 
          ref={trackRef}
          className="bay-window-scroll-track"
          style={{ 
            width: `${items.length * (cardWidth + cardGap) + 200}px`,
            paddingLeft: '100px',
            paddingRight: '100px',
          }}
        >
          {items.map((item, index) => {
            const image = menuImages[item.id] || item.image
            const poetic = poeticLines[item.id] || item.poetic || item.origin
            const details = dishDetails[item.id] || { calories: '450 kcal', prepTime: '30 min' }
            const cardStyle = getCardTransform(index)
            
            return (
              <div
                key={item.id}
                className="bay-window-scroll-card"
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${cardGap}px`,
                  ...cardStyle,
                }}
              >
                <div className="card-image-container">
                  {image && (
                    <img 
                      src={image} 
                      alt={item.title}
                      draggable={false}
                    />
                  )}
                  <div className="card-gradient-overlay" />
                </div>
                
                <div className="card-info">
                  <span className="card-category">{item.category}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                  <div className="card-meta">
                    <span>{details.calories}</span>
                    <span className="meta-divider">•</span>
                    <span>{details.prepTime}</span>
                  </div>
                  <p className="card-poetic">"{poetic}"</p>
                </div>
                
                <div className="card-price-tag">
                  <span>{item.price}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span className="indicator-arrow">←</span>
        <span className="indicator-text">Scroll to explore</span>
        <span className="indicator-arrow">→</span>
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
    <section id="menu" className="relative py-20 md:py-32 lg:py-40 bg-dark-900 overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-20 lg:mb-24">
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
          <div className="category-carousel">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`category-pill font-sans ${activeFilter === category ? 'active' : ''}`}
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
