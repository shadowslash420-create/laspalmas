import { useState, useEffect, useCallback, createContext, useContext } from 'react'

const ScrollContext = createContext({
  scrollY: 0,
  scrollProgress: 0,
  sectionProgress: {},
  viewportHeight: 0,
  documentHeight: 0,
})

export const useScrollProgress = () => useContext(ScrollContext)

export const ScrollProvider = ({ children }) => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollProgress: 0,
    sectionProgress: {},
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    documentHeight: 0,
  })

  const calculateSectionProgress = useCallback(() => {
    const sections = document.querySelectorAll('[data-section]')
    const progress = {}
    const viewportMiddle = window.innerHeight * 0.5

    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      const sectionName = section.dataset.section
      
      const sectionMiddle = rect.top + rect.height / 2
      const distanceFromCenter = Math.abs(sectionMiddle - viewportMiddle)
      const maxDistance = window.innerHeight / 2 + rect.height / 2
      
      const visibility = Math.max(0, 1 - distanceFromCenter / maxDistance)
      
      const entryProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight))
      
      progress[sectionName] = {
        visibility,
        entryProgress,
        isInView: rect.top < window.innerHeight && rect.bottom > 0,
        isCentered: visibility > 0.7,
      }
    })

    return progress
  }, [])

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = documentHeight > 0 ? scrollY / documentHeight : 0

    setScrollState({
      scrollY,
      scrollProgress: Math.min(1, Math.max(0, scrollProgress)),
      sectionProgress: calculateSectionProgress(),
      viewportHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
    })
  }, [calculateSectionProgress])

  useEffect(() => {
    handleScroll()
    
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  return (
    <ScrollContext.Provider value={scrollState}>
      {children}
    </ScrollContext.Provider>
  )
}

export default useScrollProgress
