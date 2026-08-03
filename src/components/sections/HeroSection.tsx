import { useRef, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PERSONAL_INFO } from '../../data'
import logoUrl from '../../assets/logo.png'

const HeroScene = lazy(() => import('../three/HeroScene'))

const TITLES = [
  'Frontend Developer',
  'React Developer',
  'UI Engineer',
  'Technology Enthusiast',
]

export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const { normalised } = useMousePosition()
  const reducedMotion  = useReducedMotion()
  const { displayed, done, index: titleIndex } = useTypewriter(TITLES, 55, 1800)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY      = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  /* Stagger delays */
  const D = { logo: 0.2, name: 0.55, divider: 0.8, title: 1.0, quote: 1.25, btns: 1.5, scroll: 2.1 }

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Md. Hasibul Hasan — Portfolio Home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#090909', minHeight: '100svh' }}
    >
      {/* ── 3D canvas ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: canvasOpacity, zIndex: 0 }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroScene mouse={reducedMotion ? { x: 0, y: 0 } : normalised} />
        </Suspense>
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, rgba(9,9,9,0.45) 50%, rgba(9,9,9,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom fade ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ zIndex: 2, height: '30vh', background: 'linear-gradient(to bottom, transparent, #090909)' }}
        aria-hidden="true"
      />

      {/* ── Subtle gold grid — mouse parallax ── */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,175,55,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.018) 1px,transparent 1px)',
            backgroundSize: '90px 90px',
            x: normalised.x * -12,
            y: normalised.y * -12,
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Ambient radial glows ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          zIndex: 1,
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Hero content ── */}
      <motion.div
        className="relative flex w-full max-w-5xl flex-col items-center px-6 text-center"
        style={{
          y: reducedMotion ? 0 : contentY,
          opacity: reducedMotion ? 1 : contentOpacity,
          zIndex: 10,
          paddingTop: '5rem',
          paddingBottom: '8rem',
          gap: 0,
        }}
      >

        {/* ── 1. Animated logo / photo ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: D.logo }}
        >
          <div className="relative" style={{ width: 148, height: 148 }}>
            {/* Ring 3 — outermost, slowest */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -26, border: '1px solid rgba(212,175,55,0.08)' }}
              animate={reducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            />
            {/* Ring 2 */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -14, border: '1px solid rgba(212,175,55,0.18)', boxShadow: '0 0 30px rgba(212,175,55,0.05)' }}
              animate={reducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            />
            {/* Ring 1 — dashed */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -5, border: '1px dashed rgba(212,175,55,0.22)' }}
              animate={reducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            />
            {/* Photo */}
            <img
              src={logoUrl}
              alt="Md. Hasibul Hasan"
              className="relative h-full w-full rounded-full object-cover"
              style={{
                border: '2px solid rgba(212,175,55,0.5)',
                boxShadow: '0 0 48px rgba(212,175,55,0.22), 0 0 100px rgba(212,175,55,0.06)',
              }}
              loading="eager"
              fetchPriority="high"
            />
            {/* Metallic sheen */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 45%, rgba(212,175,55,0.06) 100%)' }}
              aria-hidden="true"
            />
            {/* Orbiting gold dot */}
            <motion.div
              className="absolute rounded-full"
              style={{
                top: 0, left: '50%', marginLeft: -4, marginTop: -4,
                width: 8, height: 8,
                background: '#D4AF37',
                boxShadow: '0 0 12px #D4AF37, 0 0 24px rgba(212,175,55,0.5)',
              }}
              animate={reducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── 2. Name ── */}
        <motion.h1
          style={{
            fontFamily: '"Cinzel", serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
            background: 'linear-gradient(135deg, #F0CC5A 0%, #D4AF37 30%, #EAEAEA 55%, #D4AF37 78%, #A08520 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: D.name }}
        >
          Md. Hasibul Hasan
        </motion.h1>

        {/* ── Gold divider ── */}
        <motion.div
          style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', marginBottom: '1.75rem' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: D.divider }}
          aria-hidden="true"
        />

        {/* ── 3. Professional title typewriter ── */}
        <motion.div
          className="mb-10"
          style={{ minHeight: '2rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: D.title }}
          aria-live="polite"
          aria-label={`Current title: ${TITLES[titleIndex % TITLES.length]}`}
        >
          <p
            className="text-base sm:text-lg tracking-[0.22em] uppercase"
            style={{ fontFamily: '"Cinzel", serif', color: 'rgba(240,204,90,0.75)', letterSpacing: '0.28em' }}
          >
            {displayed}
            {!done && <span className="typewriter-cursor" aria-hidden="true" />}
          </p>
        </motion.div>

        {/* ── 4. Quote ── */}
        <motion.blockquote
          style={{ maxWidth: 600, marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: D.quote }}
        >
          <p
            className="text-sm sm:text-base leading-loose"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontStyle: 'italic',
              color: 'rgba(234,234,234,0.5)',
              letterSpacing: '0.02em',
            }}
          >
            &ldquo;{PERSONAL_INFO.tagline}&rdquo;
          </p>
        </motion.blockquote>

        {/* ── 5. Two CTA buttons only ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: '1.25rem', marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: D.btns }}
        >
          <motion.button
            className="btn-royal gold-shine"
            onClick={scrollToAbout}
            style={{ padding: '1rem 2.75rem' }}
            aria-label="View my work"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <motion.a
            href="/portfolio/Md_Hasibul_Hasan_Resume.pdf"
            download
            className="btn-royal-outline"
            style={{ padding: '1rem 2.75rem' }}
            aria-label="Download resume"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v9M3 7l4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        {/* ── 6. Scroll indicator ── */}
        <motion.button
          className="flex flex-col items-center gap-2.5"
          style={{ color: 'rgba(212,175,55,0.4)' }}
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: D.scroll, duration: 0.9 }}
          aria-label="Scroll down to About section"
        >
          <span
            className="text-[9px] tracking-[0.5em] uppercase"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Scroll
          </span>
          <div
            className="flex h-9 w-5 items-start justify-center rounded-full pt-2"
            style={{ border: '1px solid rgba(212,175,55,0.28)' }}
            aria-hidden="true"
          >
            <motion.div
              className="rounded-full"
              style={{ width: 2, height: 6, backgroundColor: '#D4AF37', borderRadius: 2 }}
              animate={reducedMotion ? {} : { y: [0, 9, 0], opacity: [1, 0.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
}
