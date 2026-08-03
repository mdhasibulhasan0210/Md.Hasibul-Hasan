import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '../../data'
import logoUrl from '../../assets/logo.png'

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')
  const navRef = useRef<HTMLDivElement>(null)

  /* scroll shrink */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* active section */
  useEffect(() => {
    const secs = document.querySelectorAll<HTMLElement>('section[id]')
    if (!secs.length) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    secs.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* close mobile on desktop resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* ── Top navigation bar ── */}
      <motion.header
        role="banner"
        className="fixed left-0 right-0 top-0 z-[999] flex justify-center"
        style={{
          paddingTop:    scrolled ? '0.6rem' : '1.25rem',
          paddingBottom: scrolled ? '0.6rem' : '1.25rem',
          transition: 'padding 0.45s ease',
        }}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
      >
        <div ref={navRef} className="w-full max-w-7xl px-4 sm:px-6">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between"
            style={{
              background:     scrolled ? 'rgba(9,9,9,0.93)' : 'rgba(9,9,9,0.35)',
              backdropFilter: 'blur(24px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
              border:      scrolled ? '1px solid rgba(212,175,55,0.22)' : '1px solid rgba(212,175,55,0.1)',
              borderRadius: 9999,
              padding: '0.55rem 0.7rem 0.55rem 0.8rem',
              boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,55,0.05)' : 'none',
              transition: 'all 0.45s ease',
            }}
          >
            {/* Brand logo */}
            <motion.button
              onClick={() => scrollTo('#home')}
              className="group flex items-center gap-2.5 shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Go to top"
            >
              <div
                className="relative flex items-center justify-center rounded-full overflow-hidden shrink-0"
                style={{
                  width: 34, height: 34,
                  border: '1px solid rgba(212,175,55,0.4)',
                  background: 'rgba(13,13,13,0.8)',
                }}
              >
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <span
                className="hidden sm:block text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: 'linear-gradient(135deg, #F0CC5A 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Hasibul
              </span>
            </motion.button>

            {/* Desktop pill nav */}
            <div className="hidden md:flex items-center" style={{ gap: 4 }} role="list">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.href.replace('#', '')
                return (
                  <NavPill
                    key={item.href}
                    label={item.label}
                    active={active}
                    onClick={() => scrollTo(item.href)}
                  />
                )
              })}
            </div>

            {/* Mobile hamburger */}
            <HamburgerBtn open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 flex flex-col items-center justify-center md:hidden"
            style={{
              zIndex: 998,
              backgroundColor: 'rgba(9,9,9,0.97)',
              backdropFilter: 'blur(28px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Decorative horizontal lines */}
            <div
              className="absolute pointer-events-none"
              style={{ top: '22%', left: '8%', right: '8%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.12), transparent)' }}
              aria-hidden="true"
            />
            <div
              className="absolute pointer-events-none"
              style={{ bottom: '22%', left: '8%', right: '8%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.12), transparent)' }}
              aria-hidden="true"
            />

            {/* Corner ornaments */}
            <svg className="absolute top-8 left-8 opacity-20" width="28" height="28" fill="none" aria-hidden="true">
              <path d="M2 26V2h24" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <svg className="absolute bottom-8 right-8 opacity-20" width="28" height="28" fill="none" aria-hidden="true">
              <path d="M26 2v24H2" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>

            <nav aria-label="Mobile navigation links">
              <ul className="flex flex-col items-center" style={{ gap: '1.75rem' }}>
                {NAV_ITEMS.map((item, i) => {
                  const active = activeSection === item.href.replace('#', '')
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: 'easeOut' }}
                    >
                      <button
                        onClick={() => scrollTo(item.href)}
                        className="relative text-3xl font-bold tracking-[0.22em] uppercase px-10 py-3"
                        style={{
                          fontFamily: '"Cinzel", serif',
                          color: active ? '#D4AF37' : 'rgba(234,234,234,0.45)',
                          transition: 'color 0.25s ease',
                        }}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                        {active && (
                          <span
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 block"
                            style={{ height: 1, width: 36, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                          />
                        )}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Nav pill button ────────────────────────────────────────────────────────── */
function NavPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      role="listitem"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="relative rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase"
      style={{
        fontFamily: '"Inter", sans-serif',
        padding: '8px 20px',
        color:      active ? '#090909'              : 'rgba(234,234,234,0.5)',
        background: active ? 'linear-gradient(135deg, #F0CC5A 0%, #D4AF37 100%)' : 'transparent',
        boxShadow:  active ? '0 2px 20px rgba(212,175,55,0.4)'                    : 'none',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
      }}
      whileHover={active ? { scale: 1.03 } : { backgroundColor: 'rgba(212,175,55,0.1)', color: 'rgba(234,234,234,0.9)' }}
      whileTap={{ scale: 0.96 }}
    >
      {label}
    </motion.button>
  )
}

/* ── Hamburger button ───────────────────────────────────────────────────────── */
function HamburgerBtn({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button
      className="flex md:hidden flex-col items-center justify-center rounded-full shrink-0"
      style={{
        width: 40, height: 40, gap: 5,
        border: '1px solid rgba(212,175,55,0.3)',
        background: 'rgba(13,13,13,0.7)',
      }}
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}
    >
      {/* Top line */}
      <motion.span
        style={{ display: 'block', width: 18, height: 1.5, borderRadius: 2, background: '#D4AF37', transformOrigin: 'center' }}
        animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
      />
      {/* Mid line */}
      <motion.span
        style={{ display: 'block', width: 13, height: 1.5, borderRadius: 2, background: '#D4AF37' }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      {/* Bottom line */}
      <motion.span
        style={{ display: 'block', width: 18, height: 1.5, borderRadius: 2, background: '#D4AF37', transformOrigin: 'center' }}
        animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}
