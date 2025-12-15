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

const GoldenPlate = ({ mousePosition }) => {
  const meshRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0, z: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    targetPosition.current.x = mousePosition.x * 3.5
    targetPosition.current.y = mousePosition.y * 2.5
    
    const lerpFactor = 0.04
    const prevX = currentPosition.current.x
    const prevY = currentPosition.current.y
    
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor
    
    velocity.current.x = currentPosition.current.x - prevX
    velocity.current.y = currentPosition.current.y - prevY
    
    meshRef.current.position.x = currentPosition.current.x
    meshRef.current.position.y = currentPosition.current.y + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    
    const targetRotationX = velocity.current.y * 8
    const targetRotationY = -velocity.current.x * 8
    const targetRotationZ = velocity.current.x * 3
    
    currentRotation.current.x += (targetRotationX - currentRotation.current.x) * 0.08
    currentRotation.current.y += (targetRotationY - currentRotation.current.y) * 0.08
    currentRotation.current.z += (targetRotationZ - currentRotation.current.z) * 0.06
    
    meshRef.current.rotation.x = currentRotation.current.x + Math.PI * 0.1
    meshRef.current.rotation.y = currentRotation.current.y + state.clock.elapsedTime * 0.15
    meshRef.current.rotation.z = currentRotation.current.z + Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })

  const goldMaterial = {
    color: "#d4a012",
    metalness: 0.92,
    roughness: 0.08,
    emissive: "#d4a012",
    emissiveIntensity: 0.12
  }
  
  return (
    <group ref={meshRef} scale={1.4}>
      <mesh castShadow rotation={[Math.PI * 0.5, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.7, 0.08, 64]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow rotation={[Math.PI * 0.5, 0, 0]} position={[0, 0.02, 0]}>
        <torusGeometry args={[0.75, 0.04, 16, 64]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow rotation={[Math.PI * 0.5, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.3, 0.5, 64]} />
        <meshStandardMaterial {...goldMaterial} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh castShadow position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial 
          color="#8B4513"
          metalness={0.2}
          roughness={0.6}
          emissive="#8B4513"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      <pointLight position={[0, 0.5, 0]} intensity={0.3} color="#d4a012" distance={3} />
    </group>
  )
}

const FloatingWineGlass = ({ mousePosition, offset = { x: 2, y: -0.5 } }) => {
  const meshRef = useRef()
  const targetPosition = useRef({ x: offset.x, y: offset.y })
  const currentPosition = useRef({ x: offset.x, y: offset.y })
  const currentRotation = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    targetPosition.current.x = offset.x + mousePosition.x * 1.5
    targetPosition.current.y = offset.y + mousePosition.y * 1
    
    const lerpFactor = 0.03
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor
    
    meshRef.current.position.x = currentPosition.current.x
    meshRef.current.position.y = currentPosition.current.y + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.15
    meshRef.current.position.z = -1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    
    const velocityX = targetPosition.current.x - currentPosition.current.x
    const velocityY = targetPosition.current.y - currentPosition.current.y
    
    currentRotation.current.x += (-velocityY * 2 - currentRotation.current.x) * 0.05
    currentRotation.current.y += (velocityX * 2 - currentRotation.current.y) * 0.05
    
    meshRef.current.rotation.x = currentRotation.current.x
    meshRef.current.rotation.y = currentRotation.current.y + state.clock.elapsedTime * 0.1
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })

  const glassMaterial = {
    color: "#ffffff",
    metalness: 0.1,
    roughness: 0,
    transparent: true,
    opacity: 0.4,
  }

  const wineMaterial = {
    color: "#722F37",
    metalness: 0.3,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
  }
  
  return (
    <group ref={meshRef} scale={0.6}>
      <mesh castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
        <meshStandardMaterial {...glassMaterial} opacity={0.6} />
      </mesh>
      
      <mesh castShadow position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.1, 32]} />
        <meshStandardMaterial {...glassMaterial} opacity={0.5} />
      </mesh>
      
      <mesh castShadow position={[0, 0.5, 0]}>
        <coneGeometry args={[0.35, 0.6, 32, 1, true]} />
        <meshStandardMaterial {...glassMaterial} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.28, 0.3, 0.25, 32]} />
        <meshStandardMaterial {...wineMaterial} />
      </mesh>
    </group>
  )
}

const FloatingLogo = ({ mousePosition, offset = { x: -2.5, y: 1 } }) => {
  const groupRef = useRef()
  const targetPosition = useRef({ x: offset.x, y: offset.y })
  const currentPosition = useRef({ x: offset.x, y: offset.y })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    targetPosition.current.x = offset.x + mousePosition.x * 1.2
    targetPosition.current.y = offset.y + mousePosition.y * 0.8
    
    const lerpFactor = 0.025
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lerpFactor
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lerpFactor
    
    groupRef.current.position.x = currentPosition.current.x
    groupRef.current.position.y = currentPosition.current.y + Math.sin(state.clock.elapsedTime * 0.7 + 2) * 0.12
    groupRef.current.position.z = -0.5
    
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
  })

  const goldMaterial = {
    color: "#d4a012",
    metalness: 0.95,
    roughness: 0.05,
    emissive: "#d4a012",
    emissiveIntensity: 0.2
  }
  
  return (
    <group ref={groupRef} scale={0.5}>
      <mesh castShadow>
        <torusGeometry args={[0.6, 0.08, 16, 64]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[-0.2, 0, 0.1]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      <mesh castShadow position={[-0.2, -0.25, 0.1]}>
        <boxGeometry args={[0.3, 0.08, 0.08]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <mesh castShadow position={[0.2, 0, 0.1]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      <mesh castShadow position={[0.35, 0.1, 0.1]}>
        <boxGeometry args={[0.22, 0.08, 0.08]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      <mesh castShadow position={[0.35, -0.1, 0.1]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      <pointLight position={[0, 0, 0.5]} intensity={0.4} color="#d4a012" distance={2} />
    </group>
  )
}

const AmbientParticles = ({ mousePosition }) => {
  const particlesRef = useRef()
  const count = 30
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])
  
  useFrame((state) => {
    if (!particlesRef.current) return
    const positions = particlesRef.current.geometry.attributes.position.array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.002
      positions[i3] += Math.cos(state.clock.elapsedTime * 0.2 + i * 0.5) * 0.001
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4a012"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

const Scene = ({ mousePosition }) => {
  return (
    <>
      <ambientLight intensity={0.25} />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
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
        intensity={0.6} 
        color="#d4a012" 
      />
      
      <pointLight 
        position={[3, -2, -3]} 
        intensity={0.3} 
        color="#87CEEB" 
      />
      
      <GoldenPlate mousePosition={mousePosition} />
      <FloatingWineGlass mousePosition={mousePosition} offset={{ x: 2.5, y: -1 }} />
      <FloatingLogo mousePosition={mousePosition} offset={{ x: -2.8, y: 1.2 }} />
      <AmbientParticles mousePosition={mousePosition} />
      
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2.5, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
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

const Interactive3DObject = ({ className = '', style = {} }) => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [webglSupported, setWebglSupported] = useState(true)
  const smoothMousePosition = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
  }, [])
  
  useEffect(() => {
    let animationFrameId
    
    const updateSmoothPosition = () => {
      smoothMousePosition.current.x += (mousePosition.x - smoothMousePosition.current.x) * 0.1
      smoothMousePosition.current.y += (mousePosition.y - smoothMousePosition.current.y) * 0.1
      animationFrameId = requestAnimationFrame(updateSmoothPosition)
    }
    
    animationFrameId = requestAnimationFrame(updateSmoothPosition)
    
    return () => cancelAnimationFrame(animationFrameId)
  }, [mousePosition])
  
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
