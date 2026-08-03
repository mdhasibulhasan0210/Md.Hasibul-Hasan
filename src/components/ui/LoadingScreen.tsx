import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoUrl from '../../assets/logo.png'

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let called = false

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          if (!called) {
            called = true
            setTimeout(() => setPhase('reveal'), 200)
            setTimeout(() => setPhase('exit'), 1400)
            setTimeout(() => onComplete(), 2200)
          }
          return 100
        }
        const increment = prev < 60 ? 3 : prev < 85 ? 1.5 : 0.6
        return Math.min(prev + increment, 100)
      })
    }, 30)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loading"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#090909', zIndex: 9999 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          role="status"
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Radial ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Corner ornaments */}
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          {/* Logo + Name */}
          <motion.div
            className="relative mb-14 flex flex-col items-center gap-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          >
            {/* Logo image with rotating rings */}
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(212,175,55,0.3)',
                  boxShadow: '0 0 30px rgba(212,175,55,0.1)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  inset: '10px',
                  border: '1px solid rgba(212,175,55,0.15)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
              {/* Logo image */}
              <img
                src={logoUrl}
                alt="Md. Hasibul Hasan logo"
                className="relative rounded-full object-cover"
                style={{
                  width: 80,
                  height: 80,
                  border: '1px solid rgba(212,175,55,0.25)',
                  boxShadow: '0 0 20px rgba(212,175,55,0.12)',
                }}
              />
              {/* Glow dot — top */}
              <motion.div
                className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: '#D4AF37', boxShadow: '0 0 8px #D4AF37' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Name only — no subtitle */}
            <motion.h1
              className="text-xl font-semibold tracking-[0.4em] uppercase"
              style={{
                fontFamily: '"Cinzel", serif',
                background: 'linear-gradient(135deg, #F0CC5A, #D4AF37, #A08520)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Md. Hasibul Hasan
            </motion.h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative w-72 sm:w-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Track */}
            <div
              className="relative overflow-hidden"
              style={{ height: 1, backgroundColor: 'rgba(212,175,55,0.12)' }}
            >
              {/* Fill */}
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  background: 'linear-gradient(90deg, #A08520, #D4AF37, #F0CC5A)',
                  boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                  width: `${progress}%`,
                }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute inset-y-0 w-12"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  left: `calc(${progress}% - 48px)`,
                }}
              />
            </div>

            {/* Labels */}
            <div className="mt-5 flex items-center justify-between">
              <span
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: 'rgba(212,175,55,0.5)', fontFamily: '"Inter", sans-serif' }}
              >
                Loading
              </span>
              <span
                className="text-sm font-light tabular-nums"
                style={{ fontFamily: '"Cinzel", serif', color: '#D4AF37' }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Reveal flash */}
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                key="reveal-flash"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CornerOrnament({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const classes = { 'top-left': 'top-6 left-6', 'top-right': 'top-6 right-6', 'bottom-left': 'bottom-6 left-6', 'bottom-right': 'bottom-6 right-6' }
  const rotations = { 'top-left': 'rotate-0', 'top-right': 'rotate-90', 'bottom-left': '-rotate-90', 'bottom-right': 'rotate-180' }
  return (
    <motion.div
      className={`absolute ${classes[position]} ${rotations[position]} h-8 w-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M2 30 L2 2 L30 2" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
        <circle cx="2" cy="2" r="2" fill="rgba(212,175,55,0.5)" />
      </svg>
    </motion.div>
  )
}
