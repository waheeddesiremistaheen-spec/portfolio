import { motion } from 'framer-motion'

/**
 * Fixed ambient background: faint grid, soft drifting radial glows.
 * Purely decorative — aria-hidden and pointer-events-free.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-grid absolute inset-0" />

      {/* Soft drifting glows */}
      <motion.div
        className="absolute -top-48 -left-48 h-[640px] w-[640px] rounded-full blur-3xl"
        style={{ background: 'var(--glow-a)' }}
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-56 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: 'var(--glow-b)' }}
        animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-64 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'var(--glow-c)' }}
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top horizon highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </div>
  )
}
