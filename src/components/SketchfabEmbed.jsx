import { useEffect, useRef, useState } from 'react'

const SketchfabEmbed = ({ modelId = "1ed71d6c46ec4cc8b9c8c9a9c7b7b7b7", className = "" }) => {
  const iframeRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className={`absolute inset-0 bg-dark-900 transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-transparent to-dark-900/80 pointer-events-none z-10" />
      
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.4) 100%)'
        }}
      />
      
      <iframe
        ref={iframeRef}
        title="3D Restaurant Interior"
        className="w-full h-full"
        style={{ border: 'none' }}
        src={`https://sketchfab.com/models/${modelId}/embed?autospin=0&autostart=1&preload=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&scrollwheel=0&orbit_constraint_zoom_in=1&orbit_constraint_zoom_out=1&navigation=orbit&transparent=1&ui_hint=0`}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

export default SketchfabEmbed
