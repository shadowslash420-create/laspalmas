import { useEffect, useRef } from 'react'
import anime from 'animejs'

export const useStaggeredText = (selector, options = {}) => {
  useEffect(() => {
    const element = document.querySelector(selector)
    if (!element) return

    const text = element.textContent
    element.innerHTML = text.split('').map(char => 
      char === ' ' ? '<span class="letter">&nbsp;</span>' : `<span class="letter">${char}</span>`
    ).join('')

    anime({
      targets: `${selector} .letter`,
      opacity: [0, 1],
      translateY: [50, 0],
      translateZ: [0, 20],
      rotateX: [-90, 0],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: anime.stagger(50, { start: options.delay || 300 }),
    })
  }, [selector, options.delay])
}

export const useSectionReveal = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [80, 0],
              translateZ: [0, 30],
              easing: 'easeOutCubic',
              duration: 1000,
              delay: options.delay || 0,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options.delay])
}

export const useCardTilt = (ref) => {
  useEffect(() => {
    const card = ref.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      anime({
        targets: card,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        duration: 300,
        easing: 'easeOutQuad',
      })
    }

    const handleMouseLeave = () => {
      anime({
        targets: card,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 600,
        easing: 'easeOutElastic(1, .5)',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])
}

export const useAmbientFloat = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return

    anime({
      targets: ref.current,
      translateY: [
        { value: options.distance || 10, duration: 2000 },
        { value: -(options.distance || 10), duration: 2000 },
      ],
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate',
    })
  }, [ref, options.distance])
}

export const animateButton = (target) => {
  anime({
    targets: target,
    scale: [1, 0.95, 1.02, 1],
    duration: 400,
    easing: 'easeInOutQuad',
  })
}
