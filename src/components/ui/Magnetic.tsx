import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode, type PointerEvent } from 'react'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * Gently pulls its children toward the pointer. Disabled automatically
 * for touch devices via pointer: fine media query in the parent usage.
 */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 })

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
