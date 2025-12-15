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

const GoldenSpoon = ({ mousePosition }) => {
  const meshRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    targetPosition.current.x = mousePosition.x * 2.5
    targetPosition.current.y = mousePosition.y * 2.5
    
    const lerpFactor = 0.06
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor
    
    meshRef.current.position.x = currentPosition.current.x
    meshRef.current.position.y = currentPosition.current.y
    
    const velocityX = targetPosition.current.x - currentPosition.current.x
    const velocityY = targetPosition.current.y - currentPosition.current.y
    
    const targetRotationX = -velocityY * 0.4
    const targetRotationY = velocityX * 0.4
    
    currentRotation.current.x += (targetRotationX - currentRotation.current.x) * 0.08
    currentRotation.current.y += (targetRotationY - currentRotation.current.y) * 0.08
    
    meshRef.current.rotation.x = currentRotation.current.x + Math.PI * 0.1
    meshRef.current.rotation.y = currentRotation.current.y + state.clock.elapsedTime * 0.3
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.3
  })

  const goldMaterial = {
    color: "#d4a012",
    metalness: 0.95,
    roughness: 0.1,
    emissive: "#d4a012",
    emissiveIntensity: 0.15
  }
  
  return (
    <group ref={meshRef} scale={1.8}>
      <mesh castShadow position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial {...goldMaterial} side={2} />
      </mesh>
      
      <mesh castShadow position={[0, 0.75, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.35, 0.04, 16, 32, Math.PI * 2]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.5, 16]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[0, -0.85, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[0, -0.6, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial {...goldMaterial} />
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
      
      <GoldenSpoon mousePosition={mousePosition} />
      
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
      style={{ touchAction: 'none', position: 'relative', zIndex: 10 }}
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
          style={{ 
            background: 'transparent', 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10
          }}
        >
          <Scene mousePosition={mousePosition} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}

export default Interactive3DObject
