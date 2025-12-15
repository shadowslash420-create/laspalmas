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

const BayWindowCarousel = ({ items }) => {
  const carouselRef = useRef(null)
  const containerRef = useRef(null)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const itemCount = items.length
  const rotationStep = 360 / itemCount
  const translateZ = 400

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = windowHeight / 2 - elementCenter
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = distanceFromCenter / (windowHeight / 2)
        const rotation = scrollProgress * 60
        setCurrentRotation(rotation)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateTo = (index) => {
    setActiveIndex(index)
    const targetRotation = -index * rotationStep
    setCurrentRotation(targetRotation)
  }

  const navigateNext = () => {
    const nextIndex = (activeIndex + 1) % itemCount
    navigateTo(nextIndex)
  }

  const navigatePrev = () => {
    const prevIndex = (activeIndex - 1 + itemCount) % itemCount
    navigateTo(prevIndex)
  }

  return (
    <>
      <style>
        {`
          .bay-window-container {
            width: 100%;
            height: 500px;
            position: relative;
            perspective: 1200px;
            perspective-origin: 50% 50%;
          }
          
          .bay-window-carousel {
            width: 100%;
            height: 100%;
            position: absolute;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .bay-window-item {
            position: absolute;
            width: 300px;
            height: 400px;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -200px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            transition: opacity 0.5s, box-shadow 0.5s;
            cursor: pointer;
          }
          
          .bay-window-item:hover {
            box-shadow: 0 30px 60px rgba(212, 160, 18, 0.3);
          }
          
          .bay-window-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .bay-window-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(212, 160, 18, 0.2);
            border: 1px solid rgba(212, 160, 18, 0.4);
            color: #d4a012;
            font-size: 2rem;
            padding: 15px 20px;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s;
            z-index: 20;
            backdrop-filter: blur(10px);
          }
          
          .bay-window-nav:hover {
            background: rgba(212, 160, 18, 0.4);
            box-shadow: 0 0 30px rgba(212, 160, 18, 0.3);
          }
          
          .bay-window-prev { left: 20px; }
          .bay-window-next { right: 20px; }
          
          .bay-window-dots {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 30px;
          }
          
          .bay-window-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(212, 160, 18, 0.2);
            border: 1px solid rgba(212, 160, 18, 0.4);
            cursor: pointer;
            transition: all 0.3s;
          }
          
          .bay-window-dot.active {
            background: #d4a012;
            box-shadow: 0 0 15px rgba(212, 160, 18, 0.5);
          }
          
          .bay-window-dot:hover {
            background: rgba(212, 160, 18, 0.5);
          }

          @media (max-width: 768px) {
            .bay-window-container {
              height: 400px;
              perspective: 800px;
            }
            .bay-window-item {
              width: 240px;
              height: 320px;
              margin-left: -120px;
              margin-top: -160px;
            }
            .bay-window-nav {
              padding: 10px 15px;
              font-size: 1.5rem;
            }
            .bay-window-prev { left: 5px; }
            .bay-window-next { right: 5px; }
          }
        `}
      </style>
      
      <div ref={containerRef} className="relative py-10">
        <div className="bay-window-container">
          <div 
            ref={carouselRef}
            className="bay-window-carousel"
            style={{
              transform: `translateZ(-${translateZ}px) rotateY(${currentRotation}deg)`
            }}
          >
            {items.map((item, index) => {
              const image = menuImages[item.id] || item.image
              const itemRotation = index * rotationStep
              
              return (
                <div
                  key={item.id}
                  className="bay-window-item"
                  style={{
                    transform: `rotateY(${itemRotation}deg) translateZ(${translateZ}px)`
                  }}
                  onClick={() => navigateTo(index)}
                >
                  {image && (
                    <img src={image} alt={item.title} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                  <div className="absolute inset-0 border border-gold-500/30 rounded-xl pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-gold-500/70 text-xs tracking-[0.3em] uppercase mb-2">
                      {item.category}
                    </p>
                    <h3 
                      className="font-serif text-2xl text-gold-400 mb-2"
                      style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-sans text-sand-200/60 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gold-400 font-serif text-xl">{item.price}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <button 
            className="bay-window-nav bay-window-prev"
            onClick={navigatePrev}
          >
            ‹
          </button>
          <button 
            className="bay-window-nav bay-window-next"
            onClick={navigateNext}
          >
            ›
          </button>
        </div>
        
        <div className="bay-window-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`bay-window-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => navigateTo(index)}
            />
          ))}
        </div>
      </div>
    </>
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

        <BayWindowCarousel items={filteredItems} />
      </div>
    </section>
  )
}

export default Menu
