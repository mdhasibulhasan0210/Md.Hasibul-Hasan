import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { PERSONAL_INFO } from '../../data'

const CONTACT_METHODS = [
  {
    id: 'email',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="24" height="17" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 10l12 8 12-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    label: 'Email',
    sublabel: 'Best way to reach me',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    cta: 'Send Email',
    external: false,
  },
  {
    id: 'github',
    icon: <SiGithub size={28} aria-hidden="true" />,
    label: 'GitHub',
    sublabel: 'See my projects & code',
    value: `@${PERSONAL_INFO.githubUsername}`,
    href: PERSONAL_INFO.github,
    cta: 'View Profile',
    external: true,
  },
]

export default function ContactSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute -top-48 -right-48 rounded-full opacity-[0.03]"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, #D4AF37, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.012) 1px,transparent 1px)',
          backgroundSize: '68px 68px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* ── Large heading ── */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="section-subtitle mb-5">Let&apos;s Connect</p>
          <h2
            id="contact-title"
            className="section-title text-silver-gradient mb-6"
          >
            Get In Touch
          </h2>
          <div className="divider-gold mx-auto mb-8" style={{ width: 80 }} />
          <p
            className="mx-auto max-w-md text-sm leading-loose sm:text-base"
            style={{ color: 'rgba(234,234,234,0.45)', fontFamily: '"Inter", sans-serif', lineHeight: 2 }}
          >
            Have a project, a question, or just want to say hello?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ── Quote card ── */}
        <motion.blockquote
          className="relative mb-16 overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(145deg, rgba(20,20,20,0.97), rgba(13,13,13,0.99))',
            border: '1px solid rgba(212,175,55,0.18)',
            boxShadow: '0 12px 60px rgba(0,0,0,0.45)',
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
        >
          {/* Gold top bar */}
          <div
            style={{ height: 2, background: 'linear-gradient(90deg, transparent 0%, #A08520 15%, #D4AF37 45%, #F0CC5A 65%, transparent 100%)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.055), transparent)' }}
            aria-hidden="true"
          />

          <div className="px-8 py-12 text-center sm:px-16">
            {/* Opening mark */}
            <div
              className="mb-6 text-8xl leading-none select-none"
              style={{ color: 'rgba(212,175,55,0.16)', fontFamily: '"Cinzel", serif', lineHeight: 0.6 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <p
              className="relative mx-auto mb-6"
              style={{
                maxWidth: 560,
                fontFamily: '"Cinzel", serif',
                fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
                fontStyle: 'italic',
                color: 'rgba(234,234,234,0.78)',
                lineHeight: 1.85,
              }}
            >
              {PERSONAL_INFO.tagline}
            </p>

            <div
              className="mb-6 text-8xl leading-none select-none"
              style={{ color: 'rgba(212,175,55,0.16)', fontFamily: '"Cinzel", serif', lineHeight: 0.6 }}
              aria-hidden="true"
            >
              &rdquo;
            </div>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-4">
              <div style={{ height: 1, width: 52, background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
              <span
                className="text-xs font-semibold tracking-[0.38em] uppercase"
                style={{ color: 'rgba(212,175,55,0.6)', fontFamily: '"Inter", sans-serif' }}
              >
                Md. Hasibul Hasan
              </span>
              <div style={{ height: 1, width: 52, background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
            </div>
          </div>
        </motion.blockquote>

        {/* ── Contact cards ── */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2">
          {CONTACT_METHODS.map(({ id, icon, label, sublabel, value, href, cta, external }, i) => (
            <motion.a
              key={id}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col overflow-hidden rounded-2xl"
              style={{
                padding: '2.25rem 2rem',
                background: 'linear-gradient(145deg, rgba(18,18,18,0.97), rgba(11,11,11,0.99))',
                border: '1px solid rgba(212,175,55,0.12)',
                textDecoration: 'none',
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: 'easeOut', delay: 0.28 + i * 0.14 }}
              whileHover={{
                y: -7,
                borderColor: 'rgba(212,175,55,0.42)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.55), 0 0 36px rgba(212,175,55,0.09)',
              }}
              aria-label={`${label}: ${value}`}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse 85% 55% at 50% 0%, rgba(212,175,55,0.07), transparent)' }}
                aria-hidden="true"
              />
              {/* Top accent on hover */}
              <div
                className="pointer-events-none absolute top-0 left-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ height: 2, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="mb-6 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: 56, height: 56,
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: '#D4AF37',
                }}
              >
                {icon}
              </div>

              <p
                className="mb-1 text-[9px] font-bold tracking-[0.38em] uppercase"
                style={{ color: 'rgba(212,175,55,0.55)', fontFamily: '"Inter", sans-serif' }}
              >
                {label}
              </p>

              <p
                className="mb-2 break-all font-bold"
                style={{
                  fontFamily: '"Cinzel", serif',
                  color: '#EAEAEA',
                  fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                  lineHeight: 1.5,
                }}
              >
                {value}
              </p>

              <p
                className="mb-8 text-xs"
                style={{ color: 'rgba(234,234,234,0.35)', fontFamily: '"Inter", sans-serif' }}
              >
                {sublabel}
              </p>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-2.5">
                <span
                  className="text-sm font-bold tracking-wide"
                  style={{ color: '#D4AF37', fontFamily: '"Cinzel", serif' }}
                >
                  {cta}
                </span>
                <motion.span
                  style={{ color: '#D4AF37' }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Availability status ── */}
        <motion.div
          className="flex flex-col items-center gap-5 overflow-hidden rounded-2xl sm:flex-row sm:gap-8"
          style={{
            padding: '1.5rem 2rem',
            background: 'linear-gradient(135deg, rgba(74,222,128,0.04), rgba(74,222,128,0.02))',
            border: '1px solid rgba(74,222,128,0.18)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.5 }}
          role="status"
          aria-label="Availability status"
        >
          <div className="flex shrink-0 items-center gap-3.5">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 44, height: 44, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.28)' }}
              aria-hidden="true"
            >
              <motion.div
                className="rounded-full"
                style={{ width: 10, height: 10, background: '#4ade80', boxShadow: '0 0 10px #4ade80' }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div>
              <p
                className="font-bold"
                style={{ fontFamily: '"Cinzel", serif', color: 'rgba(74,222,128,0.9)', fontSize: 13 }}
              >
                Open to Opportunities
              </p>
              <p
                className="text-[11px]"
                style={{ color: 'rgba(74,222,128,0.5)', fontFamily: '"Inter", sans-serif' }}
              >
                Currently available
              </p>
            </div>
          </div>
          <div className="hidden sm:block" style={{ width: 1, alignSelf: 'stretch', background: 'rgba(74,222,128,0.12)' }} aria-hidden="true" />
          <p
            className="text-center text-sm leading-loose sm:text-left"
            style={{ color: 'rgba(234,234,234,0.42)', fontFamily: '"Inter", sans-serif' }}
          >
            Available for freelance projects, collaborations, and learning opportunities.
            Typical response within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
