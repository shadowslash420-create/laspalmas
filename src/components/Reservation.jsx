import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'

const Reservation = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: contentRef.current?.querySelectorAll('.reveal-item'),
              opacity: [0, 1],
              translateY: [60, 0],
              easing: 'easeOutCubic',
              duration: 1200,
              delay: anime.stagger(150),
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    anime({
      targets: '.confirmation',
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
      easing: 'easeOutCubic',
    })
  }

  const canProceed = () => {
    if (step === 1) return formData.name.length >= 2
    if (step === 2) return formData.date && formData.time
    return true
  }

  if (isSubmitted) {
    return (
      <section 
        id="reservation"
        className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden"
      >
        <div className="max-w-2xl mx-auto text-center confirmation">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto border border-gold-500/50 rounded-full flex items-center justify-center mb-8">
              <svg className="w-10 h-10 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-gold-400 mb-6">
            We Await Your Arrival
          </h2>
          <p className="font-sans text-sand-200/70 text-lg mb-4">
            {formData.name}, your table for {formData.guests} has been reserved.
          </p>
          <p className="font-sans text-sand-300/50 text-sm tracking-widest">
            {formData.date} at {formData.time}
          </p>
          <div className="mt-12 pt-12 border-t border-gold-500/20">
            <p className="text-sand-300/40 text-xs tracking-[0.2em] uppercase">
              P922+7XX, Rue Patrice Lumumba, Oran
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="reservation"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-600/8 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-bronze-500/8 rounded-full filter blur-[120px]" />
      </div>

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div 
        ref={contentRef}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <p className="reveal-item opacity-0 font-sans text-gold-500/50 text-xs tracking-[0.4em] uppercase mb-6">
            Join Us
          </p>
          <h2 className="reveal-item opacity-0 font-serif text-5xl md:text-6xl lg:text-7xl text-gold-400 mb-6 font-light">
            Reserve Your <br />Experience
          </h2>
        </div>

        <div className="reveal-item opacity-0">
          <div className="flex justify-center gap-8 mb-12">
            {[1, 2, 3].map(s => (
              <div 
                key={s}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  s === step ? 'bg-gold-400 scale-125' : s < step ? 'bg-gold-500/50' : 'bg-dark-600'
                }`}
              />
            ))}
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/10 rounded-lg p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sand-300/50 text-xs tracking-widest uppercase mb-3">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-gold-500/20 pb-4 text-sand-200 text-lg focus:border-gold-500/50 focus:outline-none transition-colors placeholder:text-sand-300/20"
                  />
                </div>
                <div>
                  <label className="block text-sand-300/50 text-xs tracking-widest uppercase mb-3">Party Size</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    className="w-full bg-transparent border-b border-gold-500/20 pb-4 text-sand-200 text-lg focus:border-gold-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n} className="bg-dark-800">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sand-300/50 text-xs tracking-widest uppercase mb-3">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-transparent border-b border-gold-500/20 pb-4 text-sand-200 text-lg focus:border-gold-500/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sand-300/50 text-xs tracking-widest uppercase mb-3">Preferred Time</label>
                  <select
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full bg-transparent border-b border-gold-500/20 pb-4 text-sand-200 text-lg focus:border-gold-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-dark-800">Select a time</option>
                    {['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(t => (
                      <option key={t} value={t} className="bg-dark-800">{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <h3 className="font-serif text-2xl text-gold-400 mb-6">Confirm Your Reservation</h3>
                <div className="space-y-3 text-sand-200/70">
                  <p><span className="text-sand-300/40">Name:</span> {formData.name}</p>
                  <p><span className="text-sand-300/40">Date:</span> {formData.date}</p>
                  <p><span className="text-sand-300/40">Time:</span> {formData.time}</p>
                  <p><span className="text-sand-300/40">Guests:</span> {formData.guests}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-10 pt-8 border-t border-gold-500/10">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="font-sans text-xs tracking-widest uppercase text-sand-300/50 hover:text-sand-300 transition-colors"
                >
                  Back
                </button>
              ) : <div />}
              
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`px-8 py-3 border font-sans text-xs tracking-widest uppercase transition-all duration-500 ${
                    canProceed() 
                      ? 'border-gold-500/50 text-gold-400 hover:bg-gold-500/10' 
                      : 'border-dark-600 text-dark-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-10 py-4 bg-gold-500 text-dark-900 font-sans text-xs tracking-widest uppercase hover:bg-gold-400 transition-colors"
                >
                  Complete Reservation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservation
