import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5,
  SiTailwindcss, SiFramer, SiGreensock, SiFirebase,
  SiGit, SiGithub, SiVite, SiPython,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { FaCss3Alt } from 'react-icons/fa'
import type { IconType } from 'react-icons'

const ICON_MAP: Record<string, IconType> = {
  SiReact, SiTypescript, SiJavascript, SiHtml5,
  SiTailwindcss, SiFramer, SiGreensock, SiFirebase,
  SiGit, SiGithub, SiVite, SiPython,
  FaCss3Alt, VscCode,
}

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Core languages and frameworks for building interfaces',
    items: [
      { name: 'React',        icon: 'SiReact',       color: '#61DAFB', desc: 'Component library' },
      { name: 'TypeScript',   icon: 'SiTypescript',  color: '#3178C6', desc: 'Type-safe JavaScript' },
      { name: 'JavaScript',   icon: 'SiJavascript',  color: '#F7DF1E', desc: 'ES2024+' },
      { name: 'HTML5',        icon: 'SiHtml5',       color: '#E34F26', desc: 'Semantic markup' },
      { name: 'CSS3',         icon: 'FaCss3Alt',     color: '#1572B6', desc: 'Modern styling' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#38BDF8', desc: 'Utility-first CSS' },
    ],
  },
  {
    id: 'animation',
    label: 'Animation',
    description: 'Premium motion and interaction libraries',
    items: [
      { name: 'Framer Motion', icon: 'SiFramer',     color: '#BB4B96', desc: 'React animations' },
      { name: 'GSAP',          icon: 'SiGreensock',  color: '#88CE02', desc: 'Professional tweening' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Services',
    description: 'Cloud platforms and server-side knowledge',
    items: [
      { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28', desc: 'Auth, Firestore, Storage' },
      { name: 'Python',   icon: 'SiPython',   color: '#3776AB', desc: 'Scripting & automation' },
    ],
  },
  {
    id: 'tools',
    label: 'Tooling',
    description: 'Development workflow and productivity tools',
    items: [
      { name: 'Git',     icon: 'SiGit',           color: '#F05032', desc: 'Version control' },
      { name: 'GitHub',  icon: 'SiGithub',        color: '#EAEAEA', desc: 'Remote hosting' },
      { name: 'VS Code', icon: 'VscCode',          color: '#007ACC', desc: 'Code editor' },
      { name: 'Vite',    icon: 'SiVite',           color: '#646CFF', desc: 'Next-gen bundler' },
    ],
  },
]

export default function TechStackSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <section
      ref={ref}
      id="skills"
      aria-labelledby="skills-title"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#090909' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 rounded-full opacity-[0.03]"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, #D4AF37, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
        >
          <p className="section-subtitle mb-5">My Arsenal</p>
          <h2 id="skills-title" className="section-title text-silver-gradient mb-6">
            Tech Stack
          </h2>
          <div className="divider-gold mx-auto mb-8" style={{ width: 80 }} />
          <p
            className="mx-auto max-w-xl text-sm leading-loose"
            style={{ color: 'rgba(234,234,234,0.4)', fontFamily: '"Inter", sans-serif' }}
          >
            The tools and technologies I rely on to build fast, elegant, and maintainable web experiences.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-20">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: ci * 0.12 + 0.1 }}
            >
              {/* Category header */}
              <div className="mb-8 flex items-start gap-6">
                <div>
                  <h3
                    className="mb-1 text-base font-bold tracking-[0.12em] uppercase"
                    style={{ fontFamily: '"Cinzel", serif', color: 'rgba(240,204,90,0.85)' }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: 'rgba(234,234,234,0.35)', fontFamily: '"Inter", sans-serif' }}
                  >
                    {cat.description}
                  </p>
                </div>
                <div
                  className="mt-2 flex-1 shrink-0"
                  style={{ height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.18), transparent)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Tech cards */}
              <div
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                role="list"
                aria-label={`${cat.label} technologies`}
              >
                {cat.items.map((tech, ti) => (
                  <TechCard
                    key={tech.name}
                    tech={tech}
                    delay={ci * 0.1 + ti * 0.07}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee strip */}
        <motion.div
          className="mt-24 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          aria-hidden="true"
        >
          <div className="divider-gold mb-6 opacity-20" />
          <div className="relative flex overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Tech Card ──────────────────────────────────────────────────────────────── */
function TechCard({
  tech, delay, inView,
}: {
  tech: { name: string; icon: string; color: string; desc: string }
  delay: number
  inView: boolean
}) {
  const Icon = ICON_MAP[tech.icon]

  return (
    <motion.div
      role="listitem"
      className="group relative flex flex-col items-center gap-3 rounded-2xl p-5 cursor-default"
      style={{
        background: 'rgba(17,17,17,0.75)',
        border: '1px solid rgba(212,175,55,0.08)',
      }}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.94 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(212,175,55,0.35)',
        boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 24px ${tech.color}18`,
        transition: { duration: 0.3 },
      }}
      aria-label={`${tech.name} — ${tech.desc}`}
    >
      {/* Icon */}
      <motion.div
        className="flex items-center justify-center"
        style={{ width: 44, height: 44 }}
        whileHover={{ scale: 1.18, rotate: [0, -4, 4, 0] }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      >
        {Icon ? (
          <Icon style={{ fontSize: 30, color: tech.color, filter: `drop-shadow(0 0 8px ${tech.color}55)` }} />
        ) : (
          <span style={{ color: tech.color, fontSize: 28 }}>◆</span>
        )}
      </motion.div>

      {/* Name */}
      <span
        className="text-center text-[11px] font-semibold leading-tight"
        style={{ color: 'rgba(234,234,234,0.65)', fontFamily: '"Inter", sans-serif' }}
      >
        {tech.name}
      </span>

      {/* Desc — revealed on hover */}
      <span
        className="text-center text-[10px] leading-tight opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ color: 'rgba(212,175,55,0.5)', fontFamily: '"Inter", sans-serif' }}
      >
        {tech.desc}
      </span>

      {/* Color glow bg on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 70% 55% at 50% 10%, ${tech.color}12 0%, transparent 70%)` }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

/* ── Marquee ────────────────────────────────────────────────────────────────── */
function MarqueeRow() {
  const items = [
    'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion',
    'GSAP', 'Three.js', 'Firebase', 'Git', 'Vite', 'Python', 'HTML5', 'CSS3', 'VS Code',
  ]
  return (
    <motion.div
      className="flex shrink-0 gap-14"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="text-[10px] font-semibold tracking-[0.3em] uppercase whitespace-nowrap"
          style={{ color: 'rgba(212,175,55,0.18)', fontFamily: '"Cinzel", serif' }}
        >
          {item}
        </span>
      ))}
    </motion.div>
  )
}
