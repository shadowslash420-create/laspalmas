const SketchfabEmbed = ({ 
  modelId = "c4eb0ce3d2814a168ce359c707e540df",
  className = "" 
}) => {
  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_stop=0&transparent=1&preload=1&camera=0&orbit_constraint_pitch_down=-0.8&orbit_constraint_pitch_up=0.7`

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <iframe
        title="3D Restaurant Scene"
        src={embedUrl}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        loading="eager"
        style={{
          pointerEvents: 'none',
          transform: 'scale(1.1)',
          transformOrigin: 'center center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900/90 pointer-events-none" />
    </div>
  )
}

export default SketchfabEmbed
