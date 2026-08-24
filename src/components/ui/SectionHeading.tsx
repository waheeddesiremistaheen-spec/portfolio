import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-14 max-w-2xl sm:mb-16',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="eyebrow-accent mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl font-semibold text-[var(--text)] sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
