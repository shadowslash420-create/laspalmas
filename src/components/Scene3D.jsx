import { useEffect, useRef, useMemo } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.jsx'
import { useOwner } from '../App'

const Scene3D = () => {
  const { scrollProgress, sectionProgress } = useScrollProgress()
  const { siteData } = useOwner()
  const containerRef = useRef(null)

  const sceneStyle = useMemo(() => {
    const baseOpacity = 0.25
    const scrollOpacity = scrollProgress < 0.1 
      ? baseOpacity + scrollProgress * 2 
      : baseOpacity + 0.2 - (scrollProgress - 0.1) * 0.3

    const finalOpacity = Math.max(0.1, Math.min(0.5, scrollOpacity))
    
    const scaleBase = 1
    const scaleAdjust = scrollProgress * 0.08
    const scale = scaleBase + scaleAdjust
    
    const rotateY = scrollProgress * 15 - 7.5
    const rotateX = scrollProgress * 5 - 2.5
    
    const translateY = scrollProgress * -30
    const translateZ = scrollProgress * 50

    return {
      opacity: finalOpacity,
      transform: `
        perspective(2000px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
        scale(${scale})
      `,
      transition: 'opacity 0.8s ease-out, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }
  }, [scrollProgress])

  const overlayStyle = useMemo(() => {
    const warmth = 1 - scrollProgress
    const r = Math.round(212 * warmth + 100 * (1 - warmth))
    const g = Math.round(160 * warmth + 80 * (1 - warmth))
    const b = Math.round(18 * warmth + 60 * (1 - warmth))
    
    return {
      background: `
        radial-gradient(ellipse at center, 
          rgba(${r}, ${g}, ${b}, ${0.05 + scrollProgress * 0.08}) 0%, 
          transparent 60%),
        linear-gradient(180deg, 
          rgba(10, 10, 10, ${0.4 + scrollProgress * 0.2}) 0%, 
          transparent 30%, 
          transparent 70%, 
          rgba(10, 10, 10, ${0.6 + scrollProgress * 0.2}) 100%)
      `,
    }
  }, [scrollProgress])

  const currentSection = useMemo(() => {
    let active = 'hero'
    let maxVisibility = 0

    Object.entries(sectionProgress).forEach(([name, data]) => {
      if (data.visibility > maxVisibility) {
        maxVisibility = data.visibility
        active = name
      }
    })

    return active
  }, [sectionProgress])

  const sectionLighting = useMemo(() => {
    const configs = {
      hero: { hue: 35, intensity: 0.15 },
      about: { hue: 30, intensity: 0.12 },
      menu: { hue: 25, intensity: 0.1 },
      atmosphere: { hue: 20, intensity: 0.08 },
      reservation: { hue: 40, intensity: 0.1 },
    }
    
    return configs[currentSection] || configs.hero
  }, [currentSection])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" ref={containerRef}>
      <div 
        className="absolute inset-0 will-change-transform"
        style={sceneStyle}
      >
        <div className="absolute inset-[-20%] w-[140%] h-[140%]">
          <iframe
            title="3D Restaurant Scene"
            className="w-full h-full"
            style={{ border: 'none' }}
            src={`https://sketchfab.com/models/${siteData.sketchfabModelId}/embed?autospin=0&autostart=1&preload=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&scrollwheel=0&orbit_constraint_zoom_in=1&orbit_constraint_zoom_out=1&navigation=orbit&transparent=1&ui_hint=0`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
          />
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={overlayStyle}
      />

      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, 
            hsla(${sectionLighting.hue}, 70%, 50%, ${sectionLighting.intensity}) 0%, 
            transparent 50%)`,
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.5) 100%)',
        }}
      />
    </div>
  )
}

export default Scene3D
