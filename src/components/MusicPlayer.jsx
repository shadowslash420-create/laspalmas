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
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-dark-900/80 backdrop-blur-sm border border-gold-500/30 rounded-full px-4 py-2">
      <audio ref={audioRef} loop src="/background-music.mp3" />
      
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center text-gold-400 hover:text-gold-300 transition-colors"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
        className="w-16 h-1 bg-gold-500/30 rounded-full appearance-none cursor-pointer accent-gold-500"
      />
      
      <span className="text-gold-500/60 text-xs uppercase tracking-wider">Music</span>
    </div>
  )
}

export default MusicPlayer
