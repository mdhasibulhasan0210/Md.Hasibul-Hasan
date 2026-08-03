import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERTISE_CARDS, PERSONAL_INFO } from '../../data'
import logoUrl from '../../assets/logo.png'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export default function AboutSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-title"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      {/* Ambient radial accent */}
      <div
        className="pointer-events-none absolute -top-60 -right-60 rounded-full opacity-[0.035]"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, #D4AF37, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-60 -left-60 rounded-full opacity-[0.025]"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, #EAEAEA, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Section header ── */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          <p className="section-subtitle mb-5">Who I Am</p>
          <h2
            id="about-title"
            className="section-title text-silver-gradient mb-6"
          >
            About Me
          </h2>
          <div className="divider-gold mx-auto" style={{ width: 80 }} />
        </motion.div>

        {/* ── Bio grid ── */}
        <div className="mb-32 grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Photo */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            <div className="relative">
              {/* Outer frame rings */}
              <div
                className="absolute rounded-2xl pointer-events-none"
                style={{ inset: -16, border: '1px solid rgba(212,175,55,0.1)' }}
                aria-hidden="true"
              />
              <div
                className="absolute rounded-2xl pointer-events-none"
                style={{ inset: -30, border: '1px solid rgba(212,175,55,0.05)' }}
                aria-hidden="true"
              />

              {/* Image container */}
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                style={{ width: 300, height: 340 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <img
                  src={logoUrl}
                  alt="Md. Hasibul Hasan — Frontend Developer from Bogura, Bangladesh"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{
                    border: '1px solid rgba(212,175,55,0.25)',
                    filter: 'brightness(0.92) contrast(1.06)',
                  }}
                />
                {/* Metallic sheen overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(240,204,90,0.09) 0%, transparent 40%, rgba(234,234,234,0.04) 100%)' }}
                  aria-hidden="true"
                />
                {/* Bottom gradient */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0"
                  style={{ height: '40%', background: 'linear-gradient(to top, rgba(13,13,13,0.6), transparent)' }}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Corner gold accents */}
              <CornerAccent pos="tl" />
              <CornerAccent pos="br" />

              {/* Floating info badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 rounded-xl px-5 py-3.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(22,22,22,0.97), rgba(13,13,13,0.99))',
                  border: '1px solid rgba(212,175,55,0.32)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(212,175,55,0.07)',
                  backdropFilter: 'blur(12px)',
                }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p
                  className="text-[9px] tracking-[0.35em] uppercase mb-1"
                  style={{ color: 'rgba(212,175,55,0.55)', fontFamily: '"Inter", sans-serif' }}
                >
                  Frontend Dev
                </p>
                <p
                  className="text-sm font-bold tracking-wide"
                  style={{ color: '#D4AF37', fontFamily: '"Cinzel", serif' }}
                >
                  React · TypeScript
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            <h3
              className="mb-5 text-gold-gradient"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
              }}
            >
              Md. Hasibul Hasan
            </h3>

            <div className="divider-gold mb-8" style={{ width: 56 }} />

            <div className="space-y-5">
              {PERSONAL_INFO.bio.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-sm leading-loose sm:text-base"
                  style={{ color: 'rgba(234,234,234,0.58)', fontFamily: '"Inter", sans-serif', lineHeight: 1.9 }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Info cards */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { label: 'Class',    value: '9th Grade' },
                { label: 'SSC Year', value: '2028' },
                { label: 'Focus',    value: 'Frontend' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl px-4 py-4"
                  style={{
                    background: 'rgba(17,17,17,0.85)',
                    border: '1px solid rgba(212,175,55,0.1)',
                  }}
                >
                  <p
                    className="mb-1 text-[9px] tracking-[0.32em] uppercase"
                    style={{ color: 'rgba(212,175,55,0.45)', fontFamily: '"Inter", sans-serif' }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: '#EAEAEA', fontFamily: '"Cinzel", serif' }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Expertise heading ── */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <h3
            className="section-title text-silver-gradient mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
          >
            Areas of Expertise
          </h3>
          <div className="divider-gold mx-auto" style={{ width: 60 }} />
        </motion.div>

        {/* ── Expertise cards — masonry-feel ── */}
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Areas of expertise"
        >
          {EXPERTISE_CARDS.map((card, i) => (
            <ExpertiseCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Expertise Card ─────────────────────────────────────────────────────────── */
function ExpertiseCard({
  card, index, inView,
}: {
  card: { title: string; description: string; icon: string }
  index: number
  inView: boolean
}) {
  /* Alternate padding heights for masonry feel */
  const tall = index % 3 === 0
  return (
    <motion.article
      role="listitem"
      className="card-royal group relative cursor-default overflow-hidden"
      style={{ padding: tall ? '2rem 1.75rem 2.25rem' : '1.75rem 1.75rem 2rem' }}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, ease: EASE, delay: 0.04 * index + 0.2 }}
      whileHover={{ y: -6, transition: { duration: 0.35 } }}
      aria-label={card.title}
    >
      {/* Hover top-glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="mb-5 flex items-center justify-center rounded-xl"
        style={{
          width: 48, height: 48,
          background: 'rgba(212,175,55,0.07)',
          border: '1px solid rgba(212,175,55,0.14)',
          fontSize: 22,
          transition: 'transform 0.35s ease',
        }}
        aria-hidden="true"
      >
        {card.icon}
      </div>

      {/* Title */}
      <h4
        className="mb-3 text-sm font-bold leading-snug"
        style={{
          fontFamily: '"Cinzel", serif',
          background: 'linear-gradient(135deg, #F0CC5A, #D4AF37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.03em',
        }}
      >
        {card.title}
      </h4>

      {/* Description */}
      <p
        className="text-xs leading-relaxed"
        style={{ color: 'rgba(234,234,234,0.45)', fontFamily: '"Inter", sans-serif', lineHeight: 1.75 }}
      >
        {card.description}
      </p>

      {/* Bottom gold line on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        aria-hidden="true"
      />
    </motion.article>
  )
}

/* ── Corner Accent ──────────────────────────────────────────────────────────── */
function CornerAccent({ pos }: { pos: 'tl' | 'br' }) {
  const cls = pos === 'tl' ? 'absolute -top-2 -left-2' : 'absolute -bottom-2 -right-2 rotate-180'
  return (
    <div className={cls} aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2 20 L2 2 L20 2" stroke="rgba(212,175,55,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
