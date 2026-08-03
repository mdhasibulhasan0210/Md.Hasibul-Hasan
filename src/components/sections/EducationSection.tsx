import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIMELINE_ITEMS } from '../../data'

export default function EducationSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const item   = TIMELINE_ITEMS[0]

  return (
    <section
      ref={ref}
      id="education"
      aria-labelledby="education-title"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 rounded-full opacity-[0.035]"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, #D4AF37, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.015) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-0">

        {/* Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="section-subtitle mb-5">Academic Journey</p>
          <h2
            id="education-title"
            className="section-title text-silver-gradient mb-6"
          >
            Education
          </h2>
          <div className="divider-gold mx-auto" style={{ width: 80 }} />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute hidden md:block"
            style={{
              left: '50%',
              top: 0, bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.25) 15%, rgba(212,175,55,0.15) 85%, transparent)',
              transform: 'translateX(-50%)',
            }}
            aria-hidden="true"
          />

          {/* Current education node */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Timeline dot */}
            <div
              className="absolute left-1/2 hidden md:flex items-center justify-center"
              style={{ top: 36, transform: 'translate(-50%, -50%)', zIndex: 10 }}
              aria-hidden="true"
            >
              <motion.div
                className="rounded-full"
                style={{ width: 14, height: 14, background: '#D4AF37', boxShadow: '0 0 16px rgba(212,175,55,0.6), 0 0 32px rgba(212,175,55,0.25)' }}
                animate={inView ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Card — full width on mobile, offset on desktop */}
            <div className="md:w-[calc(50%-2.5rem)] md:ml-auto">
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(24,24,24,0.97) 0%, rgba(15,15,15,0.99) 100%)',
                  border: '1px solid rgba(212,175,55,0.28)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 40px rgba(212,175,55,0.06)',
                }}
              >
                {/* Gold top bar */}
                <div
                  style={{ height: 3, background: 'linear-gradient(90deg, transparent 0%, #A08520 15%, #D4AF37 45%, #F0CC5A 65%, #D4AF37 85%, transparent 100%)' }}
                  aria-hidden="true"
                />
                {/* Inner glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse 80% 35% at 50% 0%, rgba(212,175,55,0.07), transparent)' }}
                  aria-hidden="true"
                />

                <div className="p-8 md:p-10">
                  {/* Status badge */}
                  <div
                    className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.28)' }}
                  >
                    <motion.span
                      className="rounded-full"
                      style={{ width: 7, height: 7, background: '#4ade80', boxShadow: '0 0 8px #4ade80' }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[10px] font-bold tracking-[0.3em] uppercase"
                      style={{ color: '#D4AF37', fontFamily: '"Inter", sans-serif' }}
                    >
                      Currently Enrolled
                    </span>
                  </div>

                  {/* School name */}
                  <h3
                    className="mb-2 text-gold-gradient"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                      fontWeight: 800,
                      lineHeight: 1.1,
                    }}
                  >
                    {item.institution}
                  </h3>
                  <p
                    className="mb-1 text-sm"
                    style={{ color: 'rgba(234,234,234,0.55)', fontFamily: '"Inter", sans-serif' }}
                  >
                    Armed Police Battalion Public School &amp; College
                  </p>
                  <p
                    className="mb-8 text-base font-semibold"
                    style={{ color: 'rgba(234,234,234,0.75)', fontFamily: '"Inter", sans-serif' }}
                  >
                    {item.degree}
                  </p>

                  <div className="divider-gold mb-8" style={{ opacity: 0.3 }} />

                  {/* Details grid */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {item.details.map((d, di) => (
                      <motion.div
                        key={di}
                        className="flex items-start gap-3 rounded-xl p-4"
                        style={{ background: 'rgba(9,9,9,0.45)', border: '1px solid rgba(212,175,55,0.07)' }}
                        initial={{ opacity: 0, x: 16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.45 + di * 0.1, duration: 0.7 }}
                      >
                        <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: 10, marginTop: 3, flexShrink: 0 }} aria-hidden="true">◆</span>
                        <span
                          className="text-xs leading-relaxed"
                          style={{ color: 'rgba(234,234,234,0.55)', fontFamily: '"Inter", sans-serif' }}
                        >
                          {d}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Future — dashed node */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.65, duration: 1 }}
          >
            {/* Connector line */}
            <div
              style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(212,175,55,0.25), transparent)' }}
              aria-hidden="true"
            />
            <div
              className="rounded-full px-6 py-2.5 flex items-center gap-3"
              style={{ border: '1px dashed rgba(212,175,55,0.22)', background: 'rgba(212,175,55,0.025)' }}
            >
              <span className="rounded-full" style={{ width: 6, height: 6, background: 'rgba(212,175,55,0.35)' }} aria-hidden="true" />
              <p
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: 'rgba(212,175,55,0.38)', fontFamily: '"Cinzel", serif' }}
              >
                The Journey Continues…
              </p>
              <span className="rounded-full" style={{ width: 6, height: 6, background: 'rgba(212,175,55,0.35)' }} aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
        >
          {[
            { value: 'Class 9', label: 'Current Grade' },
            { value: '2028',    label: 'SSC Year' },
            { value: 'Bogura',  label: 'Location' },
            { value: 'APBn',    label: 'School' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="group relative overflow-hidden rounded-2xl p-6 text-center cursor-default"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.92), rgba(13,13,13,0.97))',
                border: '1px solid rgba(212,175,55,0.1)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.7 }}
              whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.35)', boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.07)' }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.06), transparent)' }}
                aria-hidden="true"
              />
              <p
                className="text-xl font-bold tracking-wide"
                style={{
                  fontFamily: '"Cinzel", serif',
                  background: 'linear-gradient(135deg, #F0CC5A, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </p>
              <p
                className="mt-1.5 text-[10px] tracking-[0.28em] uppercase"
                style={{ color: 'rgba(234,234,234,0.35)', fontFamily: '"Inter", sans-serif' }}
              >
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
