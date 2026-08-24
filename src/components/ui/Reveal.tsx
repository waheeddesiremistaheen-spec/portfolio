import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Scroll-triggered fade/slide-in wrapper. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
      custom={delay}
    >
      {children}
    </Tag>
  )
}
