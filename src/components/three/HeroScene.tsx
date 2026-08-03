import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Preload, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// ── Shared material colours ───────────────────────────────────────────────────
const C_GOLD       = new THREE.Color('#D4AF37')
const C_GOLD_LIGHT = new THREE.Color('#F0CC5A')
const C_GOLD_DIM   = new THREE.Color('#A08520')
const C_SILVER     = new THREE.Color('#EAEAEA')

// ── Gold particles ────────────────────────────────────────────────────────────
function buildParticles(count: number) {
  const pos = new Float32Array(count * 3)
  const spd = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const r     = 2.5 + Math.random() * 5
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = (Math.random() - 0.5) * 7
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    spd[i]         = 0.18 + Math.random() * 0.45
  }
  return { pos, spd }
}
const PARTICLES = buildParticles(320)

function GoldParticles() {
  const ref      = useRef<THREE.Points>(null)
  const reduced  = useReducedMotion()
  const { pos, spd } = PARTICLES

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: C_GOLD_LIGHT,
    size: 0.016,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return
    const t   = clock.elapsedTime
    const buf = ref.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.length / 3; i++) {
      const s = spd[i]
      buf.setY(i, pos[i * 3 + 1] + Math.sin(t * s + i * 1.3) * 0.35)
      buf.setX(i, pos[i * 3]     + Math.cos(t * s * 0.6 + i) * 0.12)
    }
    buf.needsUpdate = true
    ref.current.rotation.y = t * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <primitive object={mat} attach="material" />
    </points>
  )
}

// ── Crown / royal logo geometry ───────────────────────────────────────────────
function CrownGeometry() {
  const grp     = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: C_GOLD, metalness: 0.98, roughness: 0.02, envMapIntensity: 2.5,
  }), [])
  const goldLightMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: C_GOLD_LIGHT, metalness: 0.96, roughness: 0.04, envMapIntensity: 2,
  }), [])
  const silverMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: C_SILVER, metalness: 0.92, roughness: 0.08, envMapIntensity: 1.8,
  }), [])

  const crownPts = useMemo(() => {
    const pts = []
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      pts.push({
        x: Math.cos(angle) * 0.85,
        z: Math.sin(angle) * 0.85,
        tall: i % 2 === 0,
      })
    }
    return pts
  }, [])

  useFrame(({ clock }) => {
    if (!grp.current || reduced) return
    const t = clock.elapsedTime
    grp.current.rotation.y = t * 0.07
    grp.current.position.y = Math.sin(t * 0.35) * 0.07
  })

  return (
    <group ref={grp}>
      {/* Base ring */}
      <mesh material={goldMat} castShadow>
        <torusGeometry args={[0.85, 0.035, 20, 100]} />
      </mesh>
      {/* Spires */}
      {crownPts.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, (p.tall ? 0.55 : 0.28) / 2, p.z]}
          material={p.tall ? goldMat : goldLightMat}
          castShadow
        >
          <octahedronGeometry args={[p.tall ? 0.1 : 0.07, 0]} />
        </mesh>
      ))}
      {/* Centre gem */}
      <mesh position={[0, 0.08, 0]} material={silverMat} castShadow>
        <dodecahedronGeometry args={[0.16, 0]} />
      </mesh>
      {/* Inner detail ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={goldMat}>
        <torusGeometry args={[0.38, 0.018, 14, 72]} />
      </mesh>
    </group>
  )
}

// ── Metallic floating rings ───────────────────────────────────────────────────
function Ring({
  position, rotation, radius, tube, color, speed,
}: {
  position: [number,number,number]
  rotation: [number,number,number]
  radius: number
  tube: number
  color: THREE.Color
  speed: number
}) {
  const ref     = useRef<THREE.Mesh>(null)
  const reduced = useReducedMotion()
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color, metalness: 0.96, roughness: 0.04, envMapIntensity: 1.8,
  }), [color])

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return
    const t = clock.elapsedTime * speed
    ref.current.rotation.x = rotation[0] + t * 0.25
    ref.current.rotation.y = rotation[1] + t * 0.18
    ref.current.rotation.z = rotation[2] + t * 0.08
  })

  return (
    <mesh ref={ref} position={position} castShadow>
      <torusGeometry args={[radius, tube, 32, 140]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

// ── Soft volumetric light rays ────────────────────────────────────────────────
function LightRays() {
  const ref     = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: C_GOLD,
    transparent: true,
    opacity: 0.018,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return
    ref.current.rotation.y = clock.elapsedTime * 0.035
  })

  return (
    <group ref={ref} position={[0, 2.5, -3.5]}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} rotation={[0, (i / 8) * Math.PI, 0]} material={mat}>
          <planeGeometry args={[0.25, 10]} />
        </mesh>
      ))}
    </group>
  )
}

// ── Black marble floor with subtle gold reflection ────────────────────────────
function MarbleFloor() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a0a0a'),
    metalness: 0.3,
    roughness: 0.6,
    envMapIntensity: 0.5,
  }), [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

// ── Floating abstract luxury diamond ─────────────────────────────────────────
function LuxuryAccent({ position, color, scale = 1 }: {
  position: [number,number,number]
  color: THREE.Color
  scale?: number
}) {
  const ref     = useRef<THREE.Mesh>(null)
  const reduced = useReducedMotion()
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color, metalness: 0.95, roughness: 0.05, envMapIntensity: 1.5, transparent: true, opacity: 0.7,
  }), [color])

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return
    const t = clock.elapsedTime
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.z = t * 0.25
    ref.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.18
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[0.12, 0]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

// ── Slow camera drift + mouse parallax ───────────────────────────────────────
function CameraDrift({ mouse }: { mouse: { x: number; y: number } }) {
  const reduced = useReducedMotion()
  useFrame(({ clock, camera }) => {
    if (reduced) return
    const t = clock.elapsedTime
    camera.position.x += (mouse.x * 0.9 + Math.sin(t * 0.12) * 0.25 - camera.position.x) * 0.018
    camera.position.y += (mouse.y * 0.6 + Math.cos(t * 0.08) * 0.15 - camera.position.y) * 0.018
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Main exported scene ───────────────────────────────────────────────────────
interface HeroSceneProps {
  mouse: { x: number; y: number }
}

export default function HeroScene({ mouse }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.2], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      shadows={false}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      <CameraDrift mouse={mouse} />

      {/* Lighting */}
      <ambientLight intensity={0.18} />
      <pointLight position={[4, 5, 4]}  intensity={2.2}  color="#F0CC5A" />
      <pointLight position={[-5, -2, -3]} intensity={1.0} color="#EAEAEA" />
      <pointLight position={[0, -2, 2]}  intensity={0.6}  color="#D4AF37" />
      <spotLight
        position={[0, 9, 1]}
        intensity={2}
        angle={0.35}
        penumbra={0.9}
        color="#F0CC5A"
      />
      {/* Rim light from below for cinematic look */}
      <pointLight position={[0, -4, 0]} intensity={0.4} color="#A08520" />

      {/* Subtle environment for metallic reflections */}
      <Environment preset="night" />

      {/* Depth fog */}
      <fog attach="fog" args={['#090909', 10, 22]} />

      {/* Scene elements */}
      <MarbleFloor />
      <GoldParticles />
      <LightRays />

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <CrownGeometry />
      </Float>

      {/* Golden rings at different angles */}
      <Ring position={[0, 0, 0]}    rotation={[Math.PI/3, 0, 0]}              radius={2.1}  tube={0.010} color={C_GOLD}       speed={0.11} />
      <Ring position={[0, 0, 0]}    rotation={[Math.PI/5, Math.PI/4, 0]}      radius={2.75} tube={0.007} color={C_SILVER}     speed={0.07} />
      <Ring position={[0.3, 0.1,-0.4]} rotation={[Math.PI/2, Math.PI/6, 0]}  radius={1.55} tube={0.013} color={C_GOLD_LIGHT} speed={0.16} />
      <Ring position={[-0.2,-0.1,0.3]} rotation={[Math.PI/7,Math.PI/3,Math.PI/5]} radius={3.3} tube={0.005} color={C_GOLD_DIM}  speed={0.05} />
      <Ring position={[0, 0, 0]}    rotation={[0, 0, Math.PI/4]}              radius={1.85} tube={0.008} color={C_GOLD}       speed={0.13} />

      {/* Floating luxury accent gems */}
      <LuxuryAccent position={[ 2.2,  0.6, -1.0]} color={C_GOLD}       scale={1.1} />
      <LuxuryAccent position={[-2.4,  0.8, -0.8]} color={C_GOLD_LIGHT} scale={0.85} />
      <LuxuryAccent position={[ 1.8, -0.5,  0.5]} color={C_SILVER}     scale={0.7} />
      <LuxuryAccent position={[-1.6,  1.2,  0.3]} color={C_GOLD_DIM}   scale={0.9} />

      <Preload all />
    </Canvas>
  )
}
