import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { cn } from '../../utils/cn'

interface Props {
  id: string
  className?: string
  children: React.ReactNode
  dark?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function SectionWrapper({ id, className, children, dark = false }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn('section-padding relative overflow-hidden', dark ? 'bg-marble' : '', className)}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby={`${id}-title`}
    >
      {children}
    </motion.section>
  )
}

// Re-export for backwards compatibility
export { fadeUpVariants } from '../../utils/variants'
