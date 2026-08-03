import { motion } from 'framer-motion'
import { SiGithub, SiReact, SiTypescript, SiTailwindcss } from 'react-icons/si'
import { TbBrandThreejs } from 'react-icons/tb'
import { NAV_ITEMS, PERSONAL_INFO } from '../../data'
import logoUrl from '../../assets/logo.png'

const TECH_PILLS = [
  { label: 'React',       Icon: SiReact,         color: '#61DAFB' },
  { label: 'TypeScript',  Icon: SiTypescript,    color: '#3178C6' },
  { label: 'Three.js',    Icon: TbBrandThreejs,  color: '#D4AF37' },
  { label: 'Tailwind',    Icon: SiTailwindcss,   color: '#38BDF8' },
]

export default function FooterSection() {
  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#090909' }}
    >
      {/* Top separator */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">

        {/* ── Main grid ── */}
        <div className="grid gap-14 md:grid-cols-4 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            {/* Logo row */}
            <div className="mb-5 flex items-center gap-3.5">
              <div
                className="flex items-center justify-center overflow-hidden rounded-full"
                style={{ width: 40, height: 40, border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(13,13,13,0.8)' }}
              >
                <img src={logoUrl} alt="Md. Hasibul Hasan" className="h-full w-full rounded-full object-cover" />
              </div>
              <span
                className="text-sm font-bold tracking-[0.2em] uppercase"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: 'linear-gradient(135deg, #F0CC5A, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Md. Hasibul Hasan
              </span>
            </div>

            <p
              className="mb-7 max-w-xs text-xs leading-loose"
              style={{ color: 'rgba(234,234,234,0.38)', fontFamily: '"Inter", sans-serif', lineHeight: 1.9 }}
            >
              Passionate frontend developer focused on crafting elegant, performant, and accessible web experiences.
            </p>

            {/* Social icons */}
            <div className="mb-8 flex items-center gap-3">
              <SocialLink href={PERSONAL_INFO.github} label="GitHub profile (opens in new tab)" external>
                <SiGithub className="text-sm" aria-hidden="true" />
              </SocialLink>
              <SocialLink href={`mailto:${PERSONAL_INFO.email}`} label={`Email ${PERSONAL_INFO.email}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M1 4l6 4.5L13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </SocialLink>
            </div>

            {/* Built with */}
            <div>
              <p
                className="mb-3 text-[9px] tracking-[0.35em] uppercase"
                style={{ color: 'rgba(212,175,55,0.4)', fontFamily: '"Inter", sans-serif' }}
              >
                Built with
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_PILLS.map(({ label, Icon, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{
                      background: 'rgba(17,17,17,0.8)',
                      border: '1px solid rgba(212,175,55,0.1)',
                    }}
                  >
                    <Icon style={{ fontSize: 11, color }} aria-hidden="true" />
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: 'rgba(234,234,234,0.45)', fontFamily: '"Inter", sans-serif' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="mb-6 text-[10px] font-bold tracking-[0.32em] uppercase"
              style={{ fontFamily: '"Cinzel", serif', color: 'rgba(212,175,55,0.55)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-3.5" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="group flex items-center gap-2.5 text-xs transition-all duration-300"
                    style={{ color: 'rgba(234,234,234,0.38)', fontFamily: '"Inter", sans-serif' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(212,175,55,0.85)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(234,234,234,0.38)' }}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <span
                      className="h-px transition-all duration-300 group-hover:w-5"
                      style={{ width: 12, background: 'rgba(212,175,55,0.4)', display: 'block', flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="mb-6 text-[10px] font-bold tracking-[0.32em] uppercase"
              style={{ fontFamily: '"Cinzel", serif', color: 'rgba(212,175,55,0.55)' }}
            >
              Contact
            </h3>
            <div className="space-y-5">
              <div>
                <p
                  className="mb-1.5 text-[9px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(212,175,55,0.38)', fontFamily: '"Inter", sans-serif' }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="block text-xs transition-colors duration-300"
                  style={{ color: 'rgba(234,234,234,0.5)', fontFamily: '"Inter", sans-serif', wordBreak: 'break-all' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(234,234,234,0.5)' }}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div>
                <p
                  className="mb-1.5 text-[9px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(212,175,55,0.38)', fontFamily: '"Inter", sans-serif' }}
                >
                  GitHub
                </p>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs transition-colors duration-300"
                  style={{ color: 'rgba(234,234,234,0.5)', fontFamily: '"Inter", sans-serif' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(234,234,234,0.5)' }}
                >
                  @{PERSONAL_INFO.githubUsername}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          style={{ borderTop: '1px solid rgba(212,175,55,0.07)' }}
        >
          <p
            className="text-xs"
            style={{ color: 'rgba(234,234,234,0.22)', fontFamily: '"Inter", sans-serif' }}
          >
            &copy; {new Date().getFullYear()} Md. Hasibul Hasan. All Rights Reserved.
          </p>
          <p
            className="text-[10px] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(234,234,234,0.16)', fontFamily: '"Cinzel", serif' }}
          >
            Crafted with passion &amp; precision
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full"
        style={{
          width: 44, height: 44,
          background: 'linear-gradient(145deg, rgba(22,22,22,0.97), rgba(13,13,13,0.99))',
          border: '1px solid rgba(212,175,55,0.28)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.12, borderColor: 'rgba(212,175,55,0.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.15)' }}
        whileTap={{ scale: 0.94 }}
        aria-label="Scroll back to top"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 13V1M1 7l6-6 6 6" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </footer>
  )
}

/* ── Social icon button ─────────────────────────────────────────────────────── */
function SocialLink({
  href, label, external, children,
}: {
  href: string; label: string; external?: boolean; children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center justify-center rounded-full transition-all duration-300"
      style={{
        width: 38, height: 38,
        background: 'rgba(17,17,17,0.8)',
        border: '1px solid rgba(212,175,55,0.14)',
        color: 'rgba(234,234,234,0.5)',
      }}
      aria-label={label}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'
        e.currentTarget.style.color = '#D4AF37'
        e.currentTarget.style.boxShadow = '0 0 16px rgba(212,175,55,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.14)'
        e.currentTarget.style.color = 'rgba(234,234,234,0.5)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </a>
  )
}
