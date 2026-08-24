import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Subtle custom cursor: a small dot with a trailing ring.
 * The ring expands over interactive elements. Desktop (fine pointer) only,
 * and disabled entirely when the user prefers reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 500, damping: 45, mass: 0.7 })
  const ringY = useSpring(y, { stiffness: 500, damping: 45, mass: 0.7 })

  useEffect(() => {
    if (reduceMotion) return
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      setHovering(
        Boolean(
          t?.closest(
            'a, button, [role="button"], input, textarea, select, label, [data-hover]'
          )
        )
      )
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [reduceMotion, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-violet-500"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] rounded-full border border-violet-400/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 44 : 30,
          height: hovering ? 44 : 30,
          opacity: pressed ? 0.5 : 1,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </>
  )
}
