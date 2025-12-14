import { useMemo } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.jsx'

const AmbientLighting = () => {
  const { scrollProgress } = useScrollProgress()

  const lightingStyle = useMemo(() => {
    const warmth = 1 - scrollProgress * 0.4
    const depth = scrollProgress * 0.3
    
    const warmHue = 35 + scrollProgress * 10
    const saturation = 80 - scrollProgress * 30
    const lightness = 50 - scrollProgress * 20
    
    const warmColor = `hsla(${warmHue}, ${saturation}%, ${lightness}%, ${0.08 + depth * 0.1})`
    const deepColor = `hsla(220, 40%, ${10 + scrollProgress * 5}%, ${0.1 + scrollProgress * 0.2})`
    
    return {
      warm: {
        background: `radial-gradient(ellipse 120% 100% at 50% 0%, ${warmColor} 0%, transparent 70%)`,
        opacity: warmth,
      },
      deep: {
        background: `radial-gradient(ellipse 150% 100% at 50% 100%, ${deepColor} 0%, transparent 60%)`,
        opacity: 0.3 + depth,
      },
      vignette: {
        boxShadow: `inset 0 0 ${150 + scrollProgress * 100}px ${30 + scrollProgress * 40}px rgba(10, 10, 10, ${0.3 + scrollProgress * 0.2})`,
      },
      glow: {
        background: `radial-gradient(circle at ${50 - scrollProgress * 10}% ${30 + scrollProgress * 20}%, rgba(212, 160, 18, ${0.03 - scrollProgress * 0.02}) 0%, transparent 50%)`,
      }
    }
  }, [scrollProgress])

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]" aria-hidden="true">
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={lightingStyle.warm}
      />
      
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={lightingStyle.deep}
      />
      
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={lightingStyle.vignette}
      />
      
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={lightingStyle.glow}
      />
      
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            rgba(10, 10, 10, ${0.1 + scrollProgress * 0.15}) 0%, 
            transparent 20%, 
            transparent 80%, 
            rgba(10, 10, 10, ${0.2 + scrollProgress * 0.1}) 100%)`,
        }}
      />
    </div>
  )
}

export default AmbientLighting
