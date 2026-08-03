import { useState, useEffect, useRef } from 'react'

/**
 * useTypewriter — supports a single string OR an array of strings.
 *
 * Array mode: types each string, pauses, erases, then moves to the next one,
 * cycling indefinitely.
 *
 * Returns:
 *   displayed — current visible text
 *   done      — true when the current string has finished typing (array: resets each cycle)
 *   index     — index of the current string (array mode)
 */
export function useTypewriter(
  textOrTexts: string | string[],
  speed   = 50,
  delay   = 0,
  pause   = 1800,   // ms to hold before erasing (array mode)
  eraseSpeed = 30,  // ms per character when erasing
) {
  const isArray = Array.isArray(textOrTexts)

  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)
  const [index,     setIndex]     = useState(0)

  const rafRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // ── Single-string mode (original behaviour) ──
    if (!isArray) {
      const text = textOrTexts as string
      setDisplayed('')
      setDone(false)
      let i = 0
      const t = setTimeout(() => {
        const iv = setInterval(() => {
          if (i < text.length) {
            setDisplayed(text.slice(0, i + 1))
            i++
          } else {
            setDone(true)
            clearInterval(iv)
          }
        }, speed)
        rafRef.current = iv as unknown as ReturnType<typeof setTimeout>
      }, delay)
      return () => {
        clearTimeout(t)
        if (rafRef.current) clearInterval(rafRef.current as unknown as ReturnType<typeof setInterval>)
      }
    }

    // ── Array / cycling mode ──
    const texts = textOrTexts as string[]
    let cancelled = false
    let currentIndex = index

    const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

    async function cycle() {
      await sleep(delay)
      while (!cancelled) {
        const text = texts[currentIndex % texts.length]

        // Type forward
        for (let i = 0; i <= text.length; i++) {
          if (cancelled) return
          setDisplayed(text.slice(0, i))
          if (i === text.length) setDone(true)
          await sleep(speed)
        }

        // Pause at full text
        await sleep(pause)

        // Erase
        for (let i = text.length; i >= 0; i--) {
          if (cancelled) return
          setDisplayed(text.slice(0, i))
          setDone(false)
          await sleep(eraseSpeed)
        }

        // Advance to next
        currentIndex++
        setIndex(currentIndex)
        await sleep(200)
      }
    }

    cycle()
    return () => { cancelled = true }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArray, speed, delay, pause, eraseSpeed])

  return { displayed, done, index }
}
