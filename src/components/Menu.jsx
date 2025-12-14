import { useRef, useEffect } from 'react'
import anime from 'animejs'
import { useCardTilt } from '../animations/useAnime'

const MenuCard = ({ title, items, icon, delay }) => {
  const cardRef = useRef(null)
  useCardTilt(cardRef)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [80, 0],
              scale: [0.9, 1],
              easing: 'easeOutElastic(1, .8)',
              duration: 1200,
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
      className="relative group perspective-1000 transform-style-3d opacity-0 cursor-pointer"
    >
      <div className="relative bg-gradient-to-br from-dark-600 to-dark-700 p-8 rounded-xl border border-gold-500/20 transition-all duration-500 group-hover:border-gold-500/50 group-hover:shadow-lg group-hover:shadow-gold-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        
        <div className="relative z-10">
          <div className="text-5xl mb-6">{icon}</div>
          <h3 className="font-serif text-3xl text-gold-400 mb-4">{title}</h3>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-sand-200/80">
                <span className="font-sans text-sm">{item.name}</span>
                <span className="font-sans text-gold-500 text-sm">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const Menu = () => {
  const titleRef = useRef(null)

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

  const menuCategories = [
    {
      title: 'Grills',
      icon: '🔥',
      items: [
        { name: 'Lamb Chops', price: '2800 DZD' },
        { name: 'Mixed Grill Platter', price: '3500 DZD' },
        { name: 'Beef Tenderloin', price: '3200 DZD' },
      ],
    },
    {
      title: 'Seafood',
      icon: '🦐',
      items: [
        { name: 'Grilled Sea Bass', price: '2600 DZD' },
        { name: 'Seafood Paella', price: '3000 DZD' },
        { name: 'Mediterranean Prawns', price: '2900 DZD' },
      ],
    },
    {
      title: 'Traditional',
      icon: '🍲',
      items: [
        { name: 'Couscous Royal', price: '2200 DZD' },
        { name: 'Tajine Zitoune', price: '1800 DZD' },
        { name: 'Chorba Frik', price: '800 DZD' },
      ],
    },
    {
      title: 'Desserts',
      icon: '🍯',
      items: [
        { name: 'Makroud', price: '600 DZD' },
        { name: 'Baklava Selection', price: '700 DZD' },
        { name: 'Crème Caramel', price: '500 DZD' },
      ],
    },
  ]

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 bg-dark-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/5 rounded-full filter blur-[200px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20 opacity-0">
          <h2 className="font-serif text-5xl md:text-7xl text-gold-400 mb-4">
            Our Menu
          </h2>
          <p className="font-sans text-sand-300/60 tracking-widest uppercase text-sm">
            A Culinary Journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuCategories.map((category, index) => (
            <MenuCard
              key={category.title}
              title={category.title}
              items={category.items}
              icon={category.icon}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu
