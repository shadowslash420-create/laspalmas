import { useRef, useState, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
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

const GoldenFork = ({ mousePosition }) => {
  const meshRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0, z: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    targetPosition.current.x = mousePosition.x * 4
    targetPosition.current.y = mousePosition.y * 3
    
    const lerpFactor = 0.05
    const prevX = currentPosition.current.x
    const prevY = currentPosition.current.y
    
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor
    
    velocity.current.x = currentPosition.current.x - prevX
    velocity.current.y = currentPosition.current.y - prevY
    
    meshRef.current.position.x = currentPosition.current.x
    meshRef.current.position.y = currentPosition.current.y + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    
    const targetRotationX = velocity.current.y * 10
    const targetRotationY = -velocity.current.x * 10
    const targetRotationZ = velocity.current.x * 4
    
    currentRotation.current.x += (targetRotationX - currentRotation.current.x) * 0.08
    currentRotation.current.y += (targetRotationY - currentRotation.current.y) * 0.08
    currentRotation.current.z += (targetRotationZ - currentRotation.current.z) * 0.06
    
    meshRef.current.rotation.x = currentRotation.current.x + state.clock.elapsedTime * 0.2
    meshRef.current.rotation.y = currentRotation.current.y + state.clock.elapsedTime * 0.3
    meshRef.current.rotation.z = currentRotation.current.z + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  const goldMaterial = {
    color: "#d4a012",
    metalness: 0.95,
    roughness: 0.05,
    emissive: "#d4a012",
    emissiveIntensity: 0.15
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const forkScale = isMobile ? 0.35 : 0.5

  return (
    <group ref={meshRef} scale={forkScale} rotation={[0, 0, Math.PI / 4]}>
      <mesh castShadow position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.2, 16]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.06]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[-0.18, 0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.75, 12]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.75, 12]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      <mesh castShadow position={[0.18, 0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.75, 12]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#d4a012" distance={4} />
    </group>
  )
}

const Scene = ({ mousePosition }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
      />
      
      <pointLight 
        position={[-3, 3, 2]} 
        intensity={0.5} 
        color="#d4a012" 
      />
      
      <GoldenFork mousePosition={mousePosition} />
      
      <Environment preset="city" />
    </>
  )
}

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

const Interactive3DObject = ({ className = '', style = {} }) => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [webglSupported, setWebglSupported] = useState(true)
  
  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
  }, [])
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1
      const normalizedY = -((event.clientY / window.innerHeight) * 2 - 1)
      setMousePosition({ x: normalizedX, y: normalizedY })
    }
    
    const handleTouchMove = (event) => {
      if (!event.touches[0]) return
      const touch = event.touches[0]
      const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1
      const normalizedY = -((touch.clientY / window.innerHeight) * 2 - 1)
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
    return null
  }
  
  return (
    <div 
      ref={containerRef}
      className={`${className}`}
      style={{ 
        touchAction: 'none',
        pointerEvents: 'none',
        ...style
      }}
    >
      <WebGLErrorBoundary fallback={null}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
          style={{ 
            background: 'transparent',
            pointerEvents: 'none'
          }}
        >
          <Scene mousePosition={mousePosition} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}

export default Interactive3DObject
