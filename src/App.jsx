import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Atmosphere from './components/Atmosphere'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Hero />
      <About />
      <Menu />
      <Atmosphere />
      <Reservation />
      <Footer />
    </div>
  )
}

export default App
