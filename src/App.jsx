import { useState, createContext, useContext, Suspense } from 'react'
import { ScrollProvider } from './hooks/useScrollProgress.jsx'
import CinematicIntro from './components/CinematicIntro'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Atmosphere from './components/Atmosphere'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import OwnerMode from './components/OwnerMode'
import ParallaxSection from './components/ParallaxSection'
import AmbientLighting from './components/AmbientLighting'
import Interactive3DObject from './components/Interactive3DObject'
import ScrollIndicator from './components/ScrollIndicator'
import MusicPlayer from './components/MusicPlayer'

export const OwnerContext = createContext({
  isOwnerMode: false,
  setIsOwnerMode: () => {},
  siteData: {},
  setSiteData: () => {},
})

export const useOwner = () => useContext(OwnerContext)

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [isOwnerMode, setIsOwnerMode] = useState(false)
  const [siteData, setSiteData] = useState({
    heroTitle: 'Las Palmas',
    heroSubtitle: 'Fine Dining in the Heart of Oran',
    aboutText: 'Nestled in the vibrant heart of Oran, Las Palmas brings together the warmth of Algerian hospitality with the sophistication of Mediterranean cuisine. Our journey began with a simple vision: to create an extraordinary dining experience that celebrates the rich culinary heritage of our region.',
    sketchfabModelId: '900d7025f0574a768c524c323ca6b6e1',
    menuItems: [
      {
        id: 1,
        title: 'Lamb Chops',
        category: 'Grills',
        description: 'Tender lamb marinated in Mediterranean herbs, grilled to perfection over open flame. Served with roasted vegetables.',
        origin: 'Locally sourced from the Atlas Mountains',
        price: '2800 DZD',
      },
      {
        id: 2,
        title: 'Grilled Sea Bass',
        category: 'Seafood',
        description: 'Fresh Mediterranean sea bass, delicately grilled with lemon and capers. A tribute to Oran\'s coastal heritage.',
        origin: 'Caught daily from Oran\'s fishing boats',
        price: '2600 DZD',
      },
      {
        id: 3,
        title: 'Couscous Royal',
        category: 'Traditional',
        description: 'Hand-rolled semolina steamed with saffron, topped with lamb, chicken, and seasonal vegetables.',
        origin: 'A family recipe passed through generations',
        price: '2200 DZD',
      },
      {
        id: 4,
        title: 'Seafood Paella',
        category: 'Seafood',
        description: 'Spanish-inspired rice dish with prawns, mussels, and calamari, infused with saffron.',
        origin: 'Mediterranean fusion',
        price: '3000 DZD',
      },
      {
        id: 5,
        title: 'Beef Tenderloin',
        category: 'Grills',
        description: 'Prime cut tenderloin, aged and grilled, served with truffle butter and seasonal garnish.',
        origin: 'Premium Algerian beef',
        price: '3200 DZD',
      },
      {
        id: 6,
        title: 'Baklava Selection',
        category: 'Desserts',
        description: 'Layers of flaky phyllo, honey, and pistachios. A sweet ending to your journey.',
        origin: 'Traditional Ottoman recipe',
        price: '700 DZD',
      },
    ],
  })

  const handleEnter = () => {
    setHasEntered(true)
  }

  return (
    <OwnerContext.Provider value={{ isOwnerMode, setIsOwnerMode, siteData, setSiteData }}>
      <ScrollProvider>
        <div className="min-h-screen bg-dark-900">
          {!hasEntered && <CinematicIntro onEnter={handleEnter} />}
          
          <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
            {hasEntered && <MusicPlayer />}
            <AmbientLighting />
            {hasEntered && <ScrollIndicator />}
            
            <div data-section="hero">
              <Hero />
            </div>
            <ParallaxSection speed={0.3}>
              <div data-section="about">
                <About />
              </div>
            </ParallaxSection>
            <ParallaxSection speed={0.2}>
              <div data-section="menu">
                <Menu />
              </div>
            </ParallaxSection>
            <ParallaxSection speed={0.25}>
              <div data-section="atmosphere">
                <Atmosphere />
              </div>
            </ParallaxSection>
            <div data-section="reservation">
              <Reservation />
            </div>
            <Footer />
          </div>

          <OwnerMode />
          
          <Suspense fallback={null}>
            <Interactive3DObject className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }} />
          </Suspense>
        </div>
      </ScrollProvider>
    </OwnerContext.Provider>
  )
}

export default App
