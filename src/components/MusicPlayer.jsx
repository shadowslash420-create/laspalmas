import { useState, useRef, useEffect } from 'react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 md:gap-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/30 rounded-full px-3 py-1.5 md:px-4 md:py-2">
      <audio ref={audioRef} loop src="/background-music.mp3" />
      
      <button
        onClick={togglePlay}
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gold-400 hover:text-gold-300 transition-colors"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-12 md:w-16 h-1 bg-gold-500/30 rounded-full appearance-none cursor-pointer accent-gold-500"
      />
      
      <span className="hidden md:inline text-gold-500/60 text-xs uppercase tracking-wider">Music</span>
    </div>
  )
}

export default MusicPlayer
