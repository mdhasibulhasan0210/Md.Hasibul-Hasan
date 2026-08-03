import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = 0
    let mouseY = 0
    let curX = 0
    let curY = 0
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const onMouseDown = () => setClicking(true)
    const onMouseUp = () => setClicking(false)

    const onMouseEnterInteractive = () => setHovering(true)
    const onMouseLeaveInteractive = () => setHovering(false)

    const addListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], input, textarea, select, label, [tabindex]'
      )
      els.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }

    const loop = () => {
      if (cursorRef.current) {
        // Lag behind mouse — smooth trailing effect
        curX += (mouseX - curX) * 0.12
        curY += (mouseY - curY) * 0.12
        cursorRef.current.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Observe DOM for new interactive elements
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    addListeners()

    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  if (reducedMotion) return null

  return (
    <>
      {/* Outer ring — lags */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 h-10 w-10 transition-[width,height,border-color,background-color] duration-200"
        style={{
          zIndex: 99999,
          borderRadius: '50%',
          border: hovering
            ? '1.5px solid rgba(212,175,55,0.9)'
            : '1.5px solid rgba(212,175,55,0.45)',
          mixBlendMode: 'normal',
          transform: 'translate(-20px, -20px)',
          width: hovering ? 48 : 40,
          height: hovering ? 48 : 40,
          backgroundColor: hovering ? 'rgba(212,175,55,0.05)' : 'transparent',
          boxShadow: hovering ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
          scale: clicking ? '0.85' : '1',
        }}
      />
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 h-2 w-2 rounded-full"
        style={{
          zIndex: 99999,
          backgroundColor: '#D4AF37',
          transform: 'translate(-4px, -4px)',
          boxShadow: '0 0 6px rgba(212,175,55,0.8)',
          transition: 'transform 0s',
          scale: clicking ? '0.5' : '1',
        }}
      />
    </>
  )
}
