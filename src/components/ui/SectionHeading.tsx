import { motion } from 'framer-motion'
import { fadeUpVariants } from './SectionWrapper'

interface Props {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ id, eyebrow, title, subtitle }: Props) {
  return (
    <motion.div className="mb-16 text-center" variants={fadeUpVariants}>
      <p className="section-subtitle mb-4">{eyebrow}</p>

      <h2
        id={`${id}-title`}
        className="section-title text-silver-gradient mb-4"
      >
        {title}
      </h2>

      <div
        className="mx-auto h-px w-24"
        style={{
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }}
      />

      {subtitle && (
        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed"
          style={{ color: 'rgba(234,234,234,0.5)', fontFamily: '"Inter", sans-serif' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
