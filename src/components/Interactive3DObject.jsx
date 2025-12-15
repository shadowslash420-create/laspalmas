import { useRef, useState, useEffect, useMemo, Component } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

const RestaurantPlate = ({ mousePosition }) => {
  const meshRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    targetPosition.current.x = mousePosition.x * 2
    targetPosition.current.y = mousePosition.y * 2
    
    const lerpFactor = 0.08
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor
    
    meshRef.current.position.x = currentPosition.current.x
    meshRef.current.position.y = currentPosition.current.y
    
    const velocityX = targetPosition.current.x - currentPosition.current.x
    const velocityY = targetPosition.current.y - currentPosition.current.y
    
    const targetRotationX = -velocityY * 0.3
    const targetRotationY = velocityX * 0.3
    
    currentRotation.current.x += (targetRotationX - currentRotation.current.x) * 0.1
    currentRotation.current.y += (targetRotationY - currentRotation.current.y) * 0.1
    
    meshRef.current.rotation.x = currentRotation.current.x + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    meshRef.current.rotation.y = currentRotation.current.y + Math.cos(state.clock.elapsedTime * 0.3) * 0.05
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.02
  })
  
  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.15, 64]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.0, 1.1, 0.08, 64]} />
        <meshStandardMaterial 
          color="#d4a012"
          metalness={0.6}
          roughness={0.3}
          emissive="#d4a012"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh castShadow position={[0.3, 0.25, 0.1]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <MeshDistortMaterial 
          color="#8B4513"
          metalness={0.3}
          roughness={0.7}
          distort={0.2}
          speed={2}
        />
      </mesh>
      
      <mesh castShadow position={[-0.2, 0.22, -0.1]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial 
          color="#228B22"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      <mesh castShadow position={[0, 0.2, 0.25]}>
        <torusGeometry args={[0.08, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

const Scene = ({ mousePosition }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      
      <pointLight 
        position={[-3, 3, 2]} 
        intensity={0.8} 
        color="#d4a012" 
      />
      
      <pointLight 
        position={[3, -2, -3]} 
        intensity={0.4} 
        color="#87CEEB" 
      />
      
      <RestaurantPlate mousePosition={mousePosition} />
      
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      
      <Environment preset="city" />
    </>
  )
}

const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-dark-700">
    <div className="text-center">
      <div className="font-serif text-8xl md:text-9xl text-gold-400/30 mb-4">LP</div>
      <div className="w-16 h-px bg-gold-500/30 mx-auto mb-4" />
      <p className="text-sand-200/40 text-xs tracking-[0.3em] uppercase">Est. 2020</p>
    </div>
  </div>
)

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

const Interactive3DObject = ({ className = '' }) => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [webglSupported, setWebglSupported] = useState(true)
  
  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
  }, [])
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      
      const relativeX = event.clientX - rect.left
      const relativeY = event.clientY - rect.top
      
      const normalizedX = (relativeX / rect.width) * 2 - 1
      const normalizedY = -((relativeY / rect.height) * 2 - 1)
      
      setMousePosition({ x: normalizedX, y: normalizedY })
    }
    
    const handleTouchMove = (event) => {
      if (!containerRef.current || !event.touches[0]) return
      
      const touch = event.touches[0]
      const rect = containerRef.current.getBoundingClientRect()
      
      const relativeX = touch.clientX - rect.left
      const relativeY = touch.clientY - rect.top
      
      const normalizedX = (relativeX / rect.width) * 2 - 1
      const normalizedY = -((relativeY / rect.height) * 2 - 1)
      
      setMousePosition({ x: normalizedX, y: normalizedY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
  
  if (!webglSupported) {
    return (
      <div className={`w-full h-full ${className}`}>
        <Fallback />
      </div>
    )
  }
  
  return (
    <div 
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ touchAction: 'none' }}
    >
      <WebGLErrorBoundary fallback={<Fallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 45 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
          style={{ background: 'transparent' }}
        >
          <Scene mousePosition={mousePosition} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}

export default Interactive3DObject
