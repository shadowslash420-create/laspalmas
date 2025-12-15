import { useRef, useEffect, useState, useMemo } from 'react'
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

const Floating3DDish = ({ isHovered, category }) => {
  const dishRef = useRef(null)
  const animationRef = useRef(null)
  
  useEffect(() => {
    if (!dishRef.current) return
    
    const animate = () => {
      if (!dishRef.current) return
      const time = Date.now() * 0.001
      
      const rotateY = isHovered 
        ? Math.sin(time * 0.8) * 20 + time * 30 
        : Math.sin(time * 0.3) * 10 + time * 15
      
      const translateY = Math.sin(time * 0.8) * 8
      const scale = isHovered ? 1.15 : 1
      
      dishRef.current.style.transform = `
        perspective(800px)
        translateY(${translateY}px)
        rotateY(${rotateY}deg)
        rotateX(${Math.sin(time * 0.5) * 5}deg)
        scale(${scale})
      `
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  const getDishStyle = () => {
    const baseStyle = {
      width: '80px',
      height: '80px',
      transformStyle: 'preserve-3d',
      transition: 'filter 0.3s ease',
      filter: isHovered ? 'drop-shadow(0 0 20px rgba(212, 160, 18, 0.6))' : 'drop-shadow(0 0 10px rgba(212, 160, 18, 0.3))'
    }
    
    return baseStyle
  }

  const getCategoryIcon = () => {
    switch(category) {
      case 'Grills':
        return (
          <div ref={dishRef} style={getDishStyle()} className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-700 to-amber-900" />
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="w-8 h-4 bg-gradient-to-r from-amber-800 to-amber-600 rounded-sm transform rotate-12" />
            </div>
          </div>
        )
      case 'Seafood':
        return (
          <div ref={dishRef} style={getDishStyle()} className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200" />
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="w-10 h-5 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full transform -rotate-12" />
            </div>
          </div>
        )
      case 'Traditional':
        return (
          <div ref={dishRef} style={getDishStyle()} className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg" />
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-600 to-amber-800" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
            <div className="absolute inset-3 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
            </div>
          </div>
        )
      case 'Desserts':
        return (
          <div ref={dishRef} style={getDishStyle()} className="relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded-sm shadow-lg" />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-5 bg-gradient-to-br from-amber-600 to-amber-800 rounded-sm" />
            <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm" />
          </div>
        )
      default:
        return (
          <div ref={dishRef} style={getDishStyle()} className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg" />
            <div className="absolute inset-3 rounded-full bg-dark-800" />
          </div>
        )
    }
  }

  return (
    <div className="absolute top-4 left-4 z-20 pointer-events-none">
      {getCategoryIcon()}
    </div>
  )
}

const MenuCard = ({ item, delay }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
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
    
    setMousePos({ x, y })
    
    const rotateY = (x - 0.5) * 15
    const rotateX = (y - 0.5) * -15
    
    imageRef.current.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04) translateZ(40px)`
  }

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsActive(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsActive(false)
      setMousePos({ x: 0.5, y: 0.5 })
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

  const glowStyle = useMemo(() => ({
    background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212, 160, 18, 0.3) 0%, transparent 50%)`,
    opacity: isActive ? 1 : 0,
    transition: 'opacity 0.3s ease'
  }), [mousePos, isActive])

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
                filter: isActive ? 'brightness(0.85) contrast(1.1) saturate(1.1)' : 'brightness(0.95)',
              }}
            />
          )}
          
          <Floating3DDish isHovered={isActive} category={item.category} />
          
          <div 
            className="absolute inset-0 pointer-events-none"
            style={glowStyle}
          />
          
          <div 
            className={`absolute inset-0 pointer-events-none transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(120deg, transparent 30%, rgba(212,160,18,0.25) 50%, transparent 70%)',
              animation: isActive ? 'sweep 1.5s ease-in-out' : 'none',
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
          
          <div 
            className={`absolute inset-0 transition-all duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
            style={{
              boxShadow: 'inset 0 0 80px rgba(212, 160, 18, 0.25)',
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
            className={`overflow-hidden transition-all duration-700 ease-out ${isActive ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="font-sans text-sand-200/80 text-sm leading-relaxed mb-3">
              {item.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-dark-800/70 backdrop-blur-sm rounded-lg p-3 border border-gold-500/20 transform transition-transform duration-300 hover:scale-105">
                <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-1">Calories</p>
                <p className="text-sand-200 text-sm font-medium">{details.calories}</p>
              </div>
              <div className="bg-dark-800/70 backdrop-blur-sm rounded-lg p-3 border border-gold-500/20 transform transition-transform duration-300 hover:scale-105">
                <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-1">Prep Time</p>
                <p className="text-sand-200 text-sm font-medium">{details.prepTime}</p>
              </div>
            </div>
            
            <div className="bg-dark-800/70 backdrop-blur-sm rounded-lg p-3 mb-3 border border-gold-500/20">
              <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-1.5">
                {details.ingredients.map((ing, i) => (
                  <span 
                    key={i}
                    className="text-sand-200/80 text-xs px-2 py-1 bg-gold-500/15 rounded-full border border-gold-500/20 transition-all duration-300 hover:bg-gold-500/25 hover:border-gold-500/40"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gold-500/15 to-transparent rounded-lg p-3 border-l-2 border-gold-500/50">
              <p className="text-gold-500/70 text-[10px] tracking-wider uppercase mb-1">Chef's Recommendation</p>
              <p className="text-sand-200/90 text-xs italic">{details.chefNote}</p>
            </div>
            
            <p className="font-sans text-gold-500/60 text-xs italic tracking-wide mt-3">
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
          className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: isActive ? 'translateX(0)' : 'translateX(-100%)',
          }}
        />
        
        <div 
          className={`absolute top-4 right-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          <div className="bg-dark-900/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gold-500/40 shadow-lg shadow-gold-500/10">
            <span className="text-gold-400 font-serif text-lg">{item.price}</span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
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
