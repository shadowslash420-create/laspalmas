import { useRef, useEffect, useState, useCallback } from 'react'
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
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2))
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [expandedCard, setExpandedCard] = useState(null)

  const getCardStyle = (index) => {
    const diff = index - activeIndex
    const absD = Math.abs(diff)
    
    let translateX = diff * 280
    let translateZ = -absD * 150
    let rotateY = diff * -15
    let scale = 1 - absD * 0.15
    let opacity = 1 - absD * 0.3
    let zIndex = 10 - absD
    
    if (absD > 2) {
      opacity = 0
      scale = 0.5
    }
    
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(0, opacity),
      zIndex,
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  }

  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      if (e.deltaX > 30 && activeIndex < items.length - 1) {
        setActiveIndex(prev => prev + 1)
      } else if (e.deltaX < -30 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1)
      }
    }
  }, [activeIndex, items.length])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(activeIndex)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const walk = (startX - x) / 100
    const newIndex = Math.round(scrollLeft + walk)
    if (newIndex >= 0 && newIndex < items.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollLeft(activeIndex)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX
    const walk = (startX - x) / 80
    const newIndex = Math.round(scrollLeft + walk)
    if (newIndex >= 0 && newIndex < items.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  const handleCardClick = (index) => {
    if (index === activeIndex) {
      setExpandedCard(expandedCard === index ? null : index)
    } else {
      setActiveIndex(index)
      setExpandedCard(null)
    }
  }

  const currentItem = items[activeIndex]
  const details = dishDetails[currentItem?.id] || {
    ingredients: ['Fresh ingredients'],
    calories: '450 kcal',
    chefNote: 'Prepared with care',
    prepTime: '30 min'
  }

  return (
    <div className="bay-window-container">
      <div
        ref={containerRef}
        className="bay-window-slider"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="bay-window-track">
          {items.map((item, index) => {
            const image = menuImages[item.id] || item.image
            const poetic = poeticLines[item.id] || item.poetic || item.origin
            const isActive = index === activeIndex
            const isExpanded = expandedCard === index
            
            return (
              <div
                key={item.id}
                className={`bay-window-card ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
                style={getCardStyle(index)}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-inner">
                  <div className="card-image">
                    {image && (
                      <img 
                        src={image} 
                        alt={item.title}
                        draggable={false}
                      />
                    )}
                    <div className="card-overlay" />
                    <div className="card-border" />
                  </div>
                  
                  <div className="card-content">
                    <p className="card-category">{item.category}</p>
                    <h3 className="card-title">{item.title}</h3>
                    {isActive && (
                      <p className="card-hint">
                        {isExpanded ? 'Tap to close' : 'Tap for details'}
                      </p>
                    )}
                  </div>
                  
                  <div className="card-price">
                    <span>{item.price}</span>
                  </div>

                  {isExpanded && isActive && (
                    <div className="card-details">
                      <p className="details-description">{item.description}</p>
                      <div className="details-meta">
                        <span>{details.calories}</span>
                        <span className="divider">|</span>
                        <span>{details.prepTime}</span>
                      </div>
                      <p className="details-note">"{poetic}"</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="slider-nav">
        {items.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              setActiveIndex(index)
              setExpandedCard(null)
            }}
          />
        ))}
      </div>

      <div className="slider-arrows">
        <button
          className="arrow-btn prev"
          onClick={() => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1)
              setExpandedCard(null)
            }
          }}
          disabled={activeIndex === 0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="arrow-btn next"
          onClick={() => {
            if (activeIndex < items.length - 1) {
              setActiveIndex(activeIndex + 1)
              setExpandedCard(null)
            }
          }}
          disabled={activeIndex === items.length - 1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="scroll-hint">
        <span className="hint-icon">↔</span>
        Scroll or drag to explore
      </p>
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
            Interactive Gallery
          </p>
          <h2 
            ref={titleRef}
            className="font-serif text-3xl md:text-6xl lg:text-8xl text-gold-400 font-light opacity-0"
            style={{ textShadow: '0 0 80px rgba(212, 160, 18, 0.15)' }}
          >
            The Collection
          </h2>
        </div>

        <div className="flex justify-center mb-10 md:mb-16 lg:mb-20">
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

        <BayWindowSlider items={filteredItems} />
      </div>
    </section>
  )
}

export default Menu
