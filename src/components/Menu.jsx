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

const FlipMenuCard = ({ item, delay }) => {
  const cardRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const details = dishDetails[item.id] || {
    ingredients: ['Fresh ingredients'],
    calories: '450 kcal',
    chefNote: 'Prepared with care',
    prepTime: '30 min'
  }

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

  const handleClick = () => {
    if (isTouchDevice) {
      setIsFlipped(prev => !prev)
    }
  }

  const image = menuImages[item.id] || item.image
  const poetic = poeticLines[item.id] || item.poetic || item.origin

  return (
    <div
      ref={cardRef}
      className={`flip-card cursor-pointer ${isFlipped ? 'is-flipped' : ''} ${isRevealed ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
      style={{ 
        height: '420px',
        transition: 'opacity 1s ease, transform 1s ease'
      }}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {image && (
            <img 
              src={image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
          
          <div className="absolute inset-0 border border-gold-500/20 rounded-xl pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-gold-500/60 text-xs tracking-[0.3em] uppercase mb-2">
              {item.category}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-gold-400 mb-2"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              {item.title}
            </h3>
            <p className="font-sans text-sand-300/40 text-xs tracking-widest uppercase">
              {isTouchDevice ? 'Tap to discover' : 'Hover to discover'}
            </p>
          </div>
          
          <div className="absolute top-4 right-4">
            <div className="bg-dark-900/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gold-500/30">
              <span className="text-gold-400 font-serif text-lg">{item.price}</span>
            </div>
          </div>
        </div>
        
        <div className="flip-card-back border border-gold-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-800/95 via-dark-900/98 to-dark-800/95" />
          
          <div className="relative h-full p-6 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gold-500/60 text-xs tracking-[0.3em] uppercase mb-1">
                  {item.category}
                </p>
                <h3 className="font-serif text-2xl text-gold-400">
                  {item.title}
                </h3>
              </div>
              <div className="bg-gold-500/20 rounded-full px-3 py-1.5 border border-gold-500/40">
                <span className="text-gold-400 font-serif text-base">{item.price}</span>
              </div>
            </div>
            
            <p className="font-sans text-sand-200/80 text-sm leading-relaxed mb-4">
              {item.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-dark-700/50 rounded-lg p-3 border border-gold-500/20">
                <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-1">Calories</p>
                <p className="text-sand-200 text-sm font-medium">{details.calories}</p>
              </div>
              <div className="bg-dark-700/50 rounded-lg p-3 border border-gold-500/20">
                <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-1">Prep Time</p>
                <p className="text-sand-200 text-sm font-medium">{details.prepTime}</p>
              </div>
            </div>
            
            <div className="bg-dark-700/50 rounded-lg p-3 mb-4 border border-gold-500/20">
              <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-1.5">
                {details.ingredients.slice(0, 4).map((ing, i) => (
                  <span 
                    key={i}
                    className="text-sand-200/80 text-xs px-2 py-1 bg-gold-500/10 rounded-full border border-gold-500/20"
                  >
                    {ing}
                  </span>
                ))}
                {details.ingredients.length > 4 && (
                  <span className="text-sand-300/50 text-xs px-2 py-1">
                    +{details.ingredients.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gold-500/10 to-transparent rounded-lg p-3 border-l-2 border-gold-500/50 mt-auto">
              <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-1">Chef's Note</p>
              <p className="text-sand-200/90 text-xs italic">{details.chefNote}</p>
            </div>
            
            <p className="font-sans text-gold-500/50 text-xs italic tracking-wide mt-3 text-center">
              "{poetic}"
            </p>
          </div>
        </div>
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
          <div 
            className="radio-container font-sans"
            style={{ '--total-radio': categories.length }}
          >
            {categories.map((category, index) => (
              <div key={category}>
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="category-filter"
                  checked={activeFilter === category}
                  onChange={() => setActiveFilter(category)}
                />
                <label htmlFor={`category-${category}`}>
                  {category}
                </label>
              </div>
            ))}
            <div className="glider-container">
              <div 
                className="glider"
                style={{ transform: `translateY(${categories.indexOf(activeFilter) * 100}%)` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <FlipMenuCard
              key={item.id}
              item={item}
              delay={index * 150}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 md:mt-20">
          <p className="font-sans text-sand-300/20 text-xs tracking-[0.3em] uppercase">
            Hover over each dish to discover more
          </p>
        </div>
      </div>
    </section>
  )
}

export default Menu
