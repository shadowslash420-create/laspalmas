import { useRef, useEffect } from 'react'
import anime from 'animejs'

const SocialIcon = ({ children, delay }) => {
  const iconRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: iconRef.current,
              opacity: [0, 1],
              scale: [0.5, 1],
              easing: 'easeOutElastic(1, .8)',
              duration: 1000,
              delay: delay,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (iconRef.current) {
      observer.observe(iconRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const handleHover = () => {
    anime({
      targets: iconRef.current,
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      duration: 600,
      easing: 'easeInOutQuad',
    })
  }

  return (
    <div
      ref={iconRef}
      onMouseEnter={handleHover}
      className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-dark-900 transition-colors duration-300 cursor-pointer opacity-0"
    >
      {children}
    </div>
  )
}

const Footer = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: mapRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
              easing: 'easeOutCubic',
              duration: 1000,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer className="relative bg-dark-900 pt-20 pb-10 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        <div 
          ref={mapRef}
          className="mb-16 rounded-2xl overflow-hidden border border-gold-500/20 opacity-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.8!2d-0.6417!3d35.6969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzQ4LjgiTiAwwrAzOCczMC4xIlc!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Las Palmas Location"
          ></iframe>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-4xl text-gold-400 mb-6">Las Palmas</h3>
            <p className="font-sans text-sand-200/60 leading-relaxed">
              P922+7XX, Rue Patrice Lumumba<br />
              Oran, Algeria
            </p>
          </div>

          <div>
            <h4 className="font-serif text-2xl text-gold-400 mb-6">Opening Hours</h4>
            <div className="space-y-2 font-sans text-sand-200/60">
              <p>Monday - Thursday: 12:00 - 23:00</p>
              <p>Friday - Saturday: 12:00 - 00:00</p>
              <p>Sunday: 13:00 - 22:00</p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-2xl text-gold-400 mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <SocialIcon delay={0}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </SocialIcon>
              <SocialIcon delay={100}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIcon>
              <SocialIcon delay={200}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/10 pt-8">
          <p className="text-center font-sans text-sand-200/40 text-sm">
            © 2024 Las Palmas Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
