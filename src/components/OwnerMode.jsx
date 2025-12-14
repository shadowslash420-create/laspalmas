import { useState, useEffect } from 'react'
import { useOwner } from '../App'

const OwnerMode = () => {
  const { isOwnerMode, setIsOwnerMode, siteData, setSiteData } = useOwner()
  const [isOpen, setIsOpen] = useState(false)
  const [keySequence, setKeySequence] = useState([])

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeySequence(prev => {
        const newSeq = [...prev, e.key].slice(-5)
        if (newSeq.join('') === 'owner') {
          setIsOwnerMode(true)
          setIsOpen(true)
          return []
        }
        return newSeq
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsOwnerMode])

  if (!isOwnerMode) return null

  const updateField = (field, value) => {
    setSiteData(prev => ({ ...prev, [field]: value }))
  }

  const updateMenuItem = (id, field, value) => {
    setSiteData(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-dark-700 border border-gold-500/50 rounded-full flex items-center justify-center text-gold-400 hover:bg-dark-600 transition-colors"
        title="Owner Mode"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-dark-800 border-l border-gold-500/20 z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-gold-400">Owner Mode</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sand-300/60 hover:text-sand-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sand-300/60 text-sm mb-2">Hero Title</label>
                <input
                  type="text"
                  value={siteData.heroTitle}
                  onChange={(e) => updateField('heroTitle', e.target.value)}
                  className="w-full bg-dark-700 border border-gold-500/20 rounded px-4 py-3 text-sand-200 focus:border-gold-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand-300/60 text-sm mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={siteData.heroSubtitle}
                  onChange={(e) => updateField('heroSubtitle', e.target.value)}
                  className="w-full bg-dark-700 border border-gold-500/20 rounded px-4 py-3 text-sand-200 focus:border-gold-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sand-300/60 text-sm mb-2">About Text</label>
                <textarea
                  value={siteData.aboutText}
                  onChange={(e) => updateField('aboutText', e.target.value)}
                  rows={4}
                  className="w-full bg-dark-700 border border-gold-500/20 rounded px-4 py-3 text-sand-200 focus:border-gold-500/50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sand-300/60 text-sm mb-2">Sketchfab Model ID</label>
                <input
                  type="text"
                  value={siteData.sketchfabModelId}
                  onChange={(e) => updateField('sketchfabModelId', e.target.value)}
                  className="w-full bg-dark-700 border border-gold-500/20 rounded px-4 py-3 text-sand-200 focus:border-gold-500/50 focus:outline-none font-mono text-sm"
                />
              </div>

              <div className="border-t border-gold-500/20 pt-6">
                <h3 className="font-serif text-lg text-gold-400 mb-4">Menu Items</h3>
                <div className="space-y-4">
                  {siteData.menuItems.map(item => (
                    <div key={item.id} className="bg-dark-700 rounded-lg p-4 space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateMenuItem(item.id, 'title', e.target.value)}
                        className="w-full bg-dark-600 border border-gold-500/10 rounded px-3 py-2 text-sand-200 text-sm focus:border-gold-500/30 focus:outline-none"
                        placeholder="Dish name"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => updateMenuItem(item.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-dark-600 border border-gold-500/10 rounded px-3 py-2 text-sand-200 text-sm focus:border-gold-500/30 focus:outline-none resize-none"
                        placeholder="Description"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                          className="w-1/2 bg-dark-600 border border-gold-500/10 rounded px-3 py-2 text-sand-200 text-sm focus:border-gold-500/30 focus:outline-none"
                          placeholder="Price"
                        />
                        <select
                          value={item.category}
                          onChange={(e) => updateMenuItem(item.id, 'category', e.target.value)}
                          className="w-1/2 bg-dark-600 border border-gold-500/10 rounded px-3 py-2 text-sand-200 text-sm focus:border-gold-500/30 focus:outline-none"
                        >
                          <option value="Grills">Grills</option>
                          <option value="Seafood">Seafood</option>
                          <option value="Traditional">Traditional</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOwnerMode(false)
                  setIsOpen(false)
                }}
                className="w-full mt-6 px-4 py-3 bg-dark-700 border border-red-500/30 text-red-400 rounded hover:bg-dark-600 transition-colors text-sm"
              >
                Exit Owner Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OwnerMode
