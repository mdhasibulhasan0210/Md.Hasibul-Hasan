import { useScrollProgress } from '../../hooks/useScrollProgress'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 origin-left w-full"
      style={{
        zIndex: 9998,
        height: 2,
        background: 'linear-gradient(90deg, #A08520, #D4AF37, #F0CC5A)',
        boxShadow: '0 0 8px rgba(212,175,55,0.7)',
        scaleX: progress,
      }}
      aria-hidden="true"
    />
  )
}
