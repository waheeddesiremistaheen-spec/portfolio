import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Magnetic } from './Magnetic'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  magnetic?: boolean
}

export function Button({
  children,
  variant = 'primary',
  magnetic = true,
  className,
  ...rest
}: ButtonProps) {
  const base = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3',
    'text-sm font-medium transition-all duration-300 will-change-transform',
    'focus-visible:outline-2 focus-visible:outline-offset-4',
    variant === 'primary' &&
      'bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.55)] hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.7)] hover:brightness-110 active:scale-[0.97]',
    variant === 'ghost' &&
      'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] backdrop-blur-sm hover:bg-[var(--surface-hover)] hover:border-[color-mix(in_srgb,var(--text-muted)_40%,transparent)] active:scale-[0.97]',
    className
  )

  const content = (
    <a className={base} {...rest}>
      {children}
    </a>
  )

  if (!magnetic) return content
  return <Magnetic strength={0.18}>{content}</Magnetic>
}
