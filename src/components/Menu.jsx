import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'
import { useOwner } from '../App'

const MenuCard = ({ item, delay }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

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
              duration: 1000,
              delay: delay,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="relative group opacity-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-dark-800/50 backdrop-blur-sm p-8 md:p-10 rounded-lg border border-gold-500/10 transition-all duration-700 group-hover:border-gold-500/30 overflow-hidden min-h-[280px]">
        
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(135deg, rgba(212,160,18,0.03) 0%, transparent 50%, rgba(212,160,18,0.02) 100%)'
          }}
        />
        
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />

        <div className="relative z-10">
          <p className="text-gold-500/40 text-xs tracking-[0.3em] uppercase mb-4">{item.category}</p>
          
          <h3 className="font-serif text-3xl md:text-4xl text-gold-400 mb-6 transition-all duration-500 group-hover:text-gold-300">
            {item.title}
          </h3>
          
          <div className={`transition-all duration-700 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="font-sans text-sand-200/70 text-sm leading-relaxed mb-4">
              {item.description}
            </p>
            <p className="font-sans text-sand-300/40 text-xs italic">
              {item.origin}
            </p>
          </div>
          
          {!isHovered && (
            <p className="font-sans text-sand-300/30 text-xs tracking-widest uppercase mt-6">
              Hover to discover
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const Menu = () => {
  const { siteData } = useOwner()
  const titleRef = useRef(null)
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
              targets: titleRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
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

  return (
    <section id="menu" className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-dark-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-600/5 rounded-full filter blur-[250px]" />
      </div>

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16 md:mb-24 opacity-0">
          <p className="font-sans text-gold-500/50 text-xs tracking-[0.4em] uppercase mb-6">
            A Culinary Journey
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold-400 font-light">
            The Menu
          </h2>
        </div>

        <div className="flex justify-center gap-6 md:gap-10 mb-16 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 pb-2 border-b ${
                activeFilter === category 
                  ? 'text-gold-400 border-gold-500/50' 
                  : 'text-sand-300/40 border-transparent hover:text-sand-300/70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="font-sans text-sand-300/30 text-xs tracking-widest">
            Prices available upon request
          </p>
        </div>
      </div>
    </section>
  )
}

export default Menu
