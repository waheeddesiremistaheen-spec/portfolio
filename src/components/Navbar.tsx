import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { site } from '../data/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { cn } from '../lib/utils'
import type { Theme } from '../hooks/useTheme'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

interface NavbarProps {
  theme: Theme
  toggleTheme: () => void
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(NAV_ITEMS.map((i) => i.id))

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        {/* Scroll progress */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
          style={{ scaleX: progress }}
        />

        <nav
          className="container-site flex h-[72px] items-center justify-between"
          aria-label="Primary"
        >
          {/* Monogram */}
          <button
            type="button"
            onClick={() => goTo('home')}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-violet-400/50"
            aria-label={`${site.name} — back to top`}
          >
            <span className="text-gradient font-display text-lg font-bold">{site.monogram}</span>
            <span className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-violet-500/0 via-cyan-400/0 to-emerald-400/0 blur transition-all duration-500 group-hover:from-violet-500/30 group-hover:via-cyan-400/20 group-hover:to-emerald-400/30" />
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(item.id)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    activeId === item.id
                      ? 'text-[var(--text)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  )}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  {item.label}
                  {activeId === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-[var(--border)] bg-[var(--surface)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-overlay fixed inset-0 z-[60] flex flex-col backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-site flex h-[72px] items-center justify-between">
              <span className="text-gradient font-display text-lg font-bold">{site.monogram}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="container-site mt-8 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    className="group flex w-full items-center justify-between border-b border-[var(--border)] py-5 text-left"
                  >
                    <span className="font-display text-3xl font-semibold text-[var(--text)]">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-faint)] transition-transform duration-300 group-hover:translate-x-1">
                      0{i + 1}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="container-site mt-auto pb-10 font-mono text-xs text-[var(--text-faint)]"
            >
              {site.email}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
