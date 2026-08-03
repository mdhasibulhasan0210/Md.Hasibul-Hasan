import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Lenis from 'lenis'
import { useReducedMotion } from './hooks/useReducedMotion'

// UI shell — loaded immediately
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/ui/Navbar'

// Sections — lazy loaded after shell
const HeroSection     = lazy(() => import('./components/sections/HeroSection'))
const AboutSection    = lazy(() => import('./components/sections/AboutSection'))
const TechStackSection = lazy(() => import('./components/sections/TechStackSection'))
const EducationSection = lazy(() => import('./components/sections/EducationSection'))
const GitHubSection   = lazy(() => import('./components/sections/GitHubSection'))
const ContactSection  = lazy(() => import('./components/sections/ContactSection'))
const FooterSection   = lazy(() => import('./components/sections/FooterSection'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  // ── Lenis smooth scroll ─────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion || loading) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let raf: number
    function raf_loop(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(raf_loop)
    }
    raf = requestAnimationFrame(raf_loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reducedMotion, loading])

  // ── Lock body scroll during loading ────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <>
      <Helmet>
        <title>Md. Hasibul Hasan — Frontend Developer &amp; React Engineer</title>
        <meta
          name="description"
          content="Md. Hasibul Hasan is a passionate frontend developer and student specializing in React, TypeScript, JavaScript, and modern web engineering. Based in Bogura, Bangladesh."
        />
        <meta
          name="keywords"
          content="MD Hasibul Hasan, Md. Hasibul Hasan, Md Hasibul Hasan, Hasibul Hasan, frontend developer, React developer, TypeScript developer, Bangladesh"
        />
        <link rel="canonical" href="https://mdhasibulhasan0210.github.io/portfolio/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mdhasibulhasan0210.github.io/portfolio/" />
        <meta property="og:title" content="Md. Hasibul Hasan — Frontend Developer & React Engineer" />
        <meta property="og:description" content="Passionate frontend developer skilled in React, TypeScript, and modern web engineering." />
        <meta property="og:image" content="https://mdhasibulhasan0210.github.io/portfolio/logo.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Md. Hasibul Hasan — Frontend Developer & React Engineer" />
        <meta name="twitter:description" content="Passionate frontend developer skilled in React, TypeScript, and modern web engineering." />
        <meta name="twitter:image" content="https://mdhasibulhasan0210.github.io/portfolio/logo.png" />
        {/* JSON-LD Person */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Md. Hasibul Hasan',
          alternateName: ['MD Hasibul Hasan', 'Md Hasibul Hasan', 'Hasibul Hasan'],
          url: 'https://mdhasibulhasan0210.github.io/portfolio/',
          image: 'https://mdhasibulhasan0210.github.io/portfolio/logo.png',
          email: 'mdhasibulhasan0210@gmail.com',
          sameAs: ['https://github.com/mdhasibulhasan0210'],
          jobTitle: 'Frontend Developer',
          description: 'Passionate frontend developer and student specializing in React, TypeScript, and modern web engineering.',
          knowsAbout: ['React', 'TypeScript', 'JavaScript', 'Python', 'Frontend Development', 'UI/UX Design', 'Firebase'],
          nationality: 'Bangladeshi',
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Armed Police Battalion Public School & College',
            address: { '@type': 'PostalAddress', addressLocality: 'Bogura', addressCountry: 'BD' },
          },
        })}</script>
      </Helmet>

      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Main content */}
      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <Suspense fallback={null}>
            <main id="main-content">
              <HeroSection />
              <AboutSection />
              <TechStackSection />
              <EducationSection />
              <GitHubSection />
              <ContactSection />
            </main>
            <FooterSection />
          </Suspense>
        </>
      )}
    </>
  )
}
