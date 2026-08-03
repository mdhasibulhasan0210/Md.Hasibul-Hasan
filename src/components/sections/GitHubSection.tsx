import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiGithub, SiReact, SiTypescript, SiJavascript, SiPython, SiTailwindcss,
} from 'react-icons/si'
import { PERSONAL_INFO } from '../../data'

const GH = PERSONAL_INFO.githubUsername

const LANGS = [
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', pct: 55 },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', pct: 25 },
  { name: 'Python',     Icon: SiPython,     color: '#3776AB', pct: 10 },
  { name: 'Tailwind',   Icon: SiTailwindcss,color: '#38BDF8', pct: 7  },
  { name: 'React (JSX)',Icon: SiReact,       color: '#61DAFB', pct: 3  },
]

const STATS = [
  { label: 'Focus',   value: 'Frontend'    },
  { label: 'Stack',   value: 'React + TS'  },
  { label: 'Status',  value: 'Active'      },
  { label: 'Open To', value: 'Collaborate' },
]

/* Animated counter */
function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const [val, setVal] = useState(0)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const timeout = setTimeout(() => {
      const step = Math.ceil(to / 40)
      const iv = setInterval(() => {
        start += step
        if (start >= to) { setVal(to); clearInterval(iv) }
        else setVal(start)
      }, 30)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [inView, to, delay])

  return <span ref={ref}>{val.toLocaleString()}</span>
}

export default function GitHubSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <section
      ref={ref}
      id="github"
      aria-labelledby="github-title"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#090909' }}
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 rounded-full opacity-[0.03]"
        style={{ width: 700, height: 500, background: 'radial-gradient(ellipse, #D4AF37, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="section-subtitle mb-5">Open Source</p>
          <h2 id="github-title" className="section-title text-silver-gradient mb-6">
            GitHub
          </h2>
          <div className="divider-gold mx-auto mb-8" style={{ width: 80 }} />
          <p
            className="mx-auto max-w-md text-sm leading-loose"
            style={{ color: 'rgba(234,234,234,0.4)', fontFamily: '"Inter", sans-serif' }}
          >
            Actively building and learning in public. Every commit is a step forward.
          </p>
        </motion.div>

        {/* ── Profile card ── */}
        <motion.a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mb-8 flex flex-col items-center gap-6 overflow-hidden rounded-3xl p-8 sm:flex-row sm:gap-10 sm:p-10"
          style={{
            background: 'linear-gradient(145deg, rgba(22,22,22,0.97), rgba(13,13,13,0.99))',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 12px 50px rgba(0,0,0,0.45)',
            textDecoration: 'none',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
          whileHover={{
            borderColor: 'rgba(212,175,55,0.45)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.55), 0 0 40px rgba(212,175,55,0.08)',
          }}
          aria-label={`Visit @${GH} on GitHub (opens in new tab)`}
        >
          {/* Gold top accent */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0"
            style={{ height: 2, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
            aria-hidden="true"
          />
          {/* Hover glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.06), transparent)' }}
            aria-hidden="true"
          />

          {/* GitHub icon */}
          <motion.div
            className="flex shrink-0 items-center justify-center rounded-2xl"
            style={{
              width: 80, height: 80,
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.04))',
              border: '1px solid rgba(212,175,55,0.28)',
            }}
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <SiGithub style={{ fontSize: 42, color: '#EAEAEA' }} />
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <p
              className="mb-1 text-2xl font-bold"
              style={{ fontFamily: '"Cinzel", serif', color: '#EAEAEA' }}
            >
              @{GH}
            </p>
            <p
              className="mb-4 text-sm"
              style={{ color: 'rgba(212,175,55,0.6)', fontFamily: '"Inter", sans-serif' }}
            >
              github.com/{GH}
            </p>
            <p
              className="text-sm leading-loose"
              style={{ color: 'rgba(234,234,234,0.4)', fontFamily: '"Inter", sans-serif' }}
            >
              Passionate frontend developer sharing projects, experiments, and open-source contributions.
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex shrink-0 items-center justify-center rounded-full"
            style={{
              width: 44, height: 44,
              border: '1px solid rgba(212,175,55,0.3)',
              background: 'rgba(212,175,55,0.05)',
            }}
            whileHover={{ x: 5 }}
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.a>

        {/* ── Stats counters row ── */}
        <motion.div
          className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.22 }}
        >
          {[
            { label: 'Repositories', value: 12,  suffix: '+' },
            { label: 'Commits',      value: 250, suffix: '+' },
            { label: 'Projects',     value: 8,   suffix: '+' },
            { label: 'Stars',        value: 15,  suffix: '+' },
          ].map(({ label, value, suffix }, i) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl p-5 text-center cursor-default"
              style={{
                background: 'linear-gradient(145deg, rgba(18,18,18,0.92), rgba(11,11,11,0.97))',
                border: '1px solid rgba(212,175,55,0.1)',
              }}
            >
              <p
                className="text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: 'linear-gradient(135deg, #F0CC5A, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <Counter to={value} delay={0.3 + i * 0.1} />{suffix}
              </p>
              <p
                className="mt-1 text-[10px] tracking-[0.28em] uppercase"
                style={{ color: 'rgba(234,234,234,0.3)', fontFamily: '"Inter", sans-serif' }}
              >
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Profile overview + Languages ── */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Profile overview */}
          <motion.div
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(145deg, rgba(20,20,20,0.92), rgba(13,13,13,0.97))',
              border: '1px solid rgba(212,175,55,0.1)',
            }}
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.3 }}
            whileHover={{ borderColor: 'rgba(212,175,55,0.26)' }}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-full" style={{ width: 3, height: 20, background: 'linear-gradient(to bottom, #F0CC5A, #D4AF37)' }} aria-hidden="true" />
              <h3
                className="text-sm font-bold tracking-[0.18em] uppercase"
                style={{ fontFamily: '"Cinzel", serif', color: 'rgba(234,234,234,0.7)' }}
              >
                Profile Overview
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(9,9,9,0.5)', border: '1px solid rgba(212,175,55,0.07)' }}
                >
                  <p
                    className="mb-1.5 text-[9px] font-semibold tracking-[0.32em] uppercase"
                    style={{ color: 'rgba(212,175,55,0.45)', fontFamily: '"Inter", sans-serif' }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ fontFamily: '"Cinzel", serif', color: '#EAEAEA' }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div
              className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.16)' }}
            >
              <motion.div
                className="rounded-full shrink-0"
                style={{ width: 8, height: 8, background: '#4ade80', boxShadow: '0 0 8px #4ade80' }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <p
                className="text-xs"
                style={{ color: 'rgba(74,222,128,0.8)', fontFamily: '"Inter", sans-serif' }}
              >
                Open to collaborations &amp; opportunities
              </p>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(145deg, rgba(20,20,20,0.92), rgba(13,13,13,0.97))',
              border: '1px solid rgba(212,175,55,0.1)',
            }}
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.35 }}
            whileHover={{ borderColor: 'rgba(212,175,55,0.26)' }}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-full" style={{ width: 3, height: 20, background: 'linear-gradient(to bottom, #F0CC5A, #D4AF37)' }} aria-hidden="true" />
              <h3
                className="text-sm font-bold tracking-[0.18em] uppercase"
                style={{ fontFamily: '"Cinzel", serif', color: 'rgba(234,234,234,0.7)' }}
              >
                Top Languages
              </h3>
            </div>
            <div className="space-y-5">
              {LANGS.map(({ name, Icon, color, pct }) => (
                <div key={name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon style={{ color, fontSize: 14 }} aria-hidden="true" />
                      <span
                        className="text-xs font-medium"
                        style={{ color: 'rgba(234,234,234,0.7)', fontFamily: '"Inter", sans-serif' }}
                      >
                        {name}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: '#D4AF37', fontFamily: '"Inter", sans-serif' }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="relative h-1 w-full overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: color, opacity: 0.85 }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
        >
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-royal gold-shine inline-flex items-center gap-3"
            style={{ padding: '1rem 2.75rem' }}
            aria-label="View all repositories on GitHub (opens in new tab)"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <SiGithub style={{ fontSize: 16 }} aria-hidden="true" />
            View All Repositories
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
