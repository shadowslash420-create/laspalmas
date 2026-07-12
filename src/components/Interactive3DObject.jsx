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

// mouseRef is a shared ref passed down from Interactive3DObject.
// Updating a ref does NOT trigger React re-renders, so mouse tracking
// is entirely outside React's reconciliation loop.
const GoldenFork = ({ mouseRef }) => {
  const meshRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0, z: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    // Snap directly to mouse — no lerp lag
    const targetX = mouseRef.current.x * 4
    const targetY = mouseRef.current.y * 3

    meshRef.current.position.x = targetX
    meshRef.current.position.y = targetY + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3

    // Gentle ambient spin only — no velocity tilt since position is instant
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
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

const Scene = ({ mouseRef }) => {
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
      
      <GoldenFork mouseRef={mouseRef} />
      
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

const isMobileDevice = () =>
  typeof window !== 'undefined' && window.innerWidth < 768

const Interactive3DObject = ({ className = '', style = {} }) => {
  const [webglSupported, setWebglSupported] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  // Ref-based mouse position: updating a ref never triggers a React re-render,
  // so every mousemove is zero-cost from React's perspective.
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
    setIsMobile(isMobileDevice())

    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Skip on mobile — saves a WebGL context and avoids competing with scroll
  if (!webglSupported || isMobile) {
    return null
  }

  return (
    <div
      className={`${className}`}
      style={{
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
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false
          }}
          style={{
            background: 'transparent',
            pointerEvents: 'none'
          }}
        >
          <Scene mouseRef={mouseRef} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}

export default Interactive3DObject
