import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  Code2,
  FolderKanban,
  Briefcase,
  Mail,
  Github,
  Moon,
  Sun,
  Search,
  type LucideIcon,
} from 'lucide-react'
import { site } from '../data/site'
import { cn } from '../lib/utils'

interface Command {
  id: string
  label: string
  hint: string
  icon: LucideIcon
  run: () => void
}

interface CommandPaletteProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export function CommandPalette({ theme, toggleTheme }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const commands: Command[] = useMemo(
    () => [
      { id: 'home', label: 'Go Home', hint: 'Back to the top', icon: Home, run: () => scrollToSection('home') },
      { id: 'about', label: 'About Me', hint: 'Who I am', icon: User, run: () => scrollToSection('about') },
      { id: 'skills', label: 'View Skills', hint: 'Languages & tools', icon: Code2, run: () => scrollToSection('skills') },
      { id: 'projects', label: 'View Projects', hint: 'Things I have built', icon: FolderKanban, run: () => scrollToSection('projects') },
      { id: 'experience', label: 'View Experience', hint: 'My journey so far', icon: Briefcase, run: () => scrollToSection('experience') },
      { id: 'contact', label: 'Contact Me', hint: 'Say hello', icon: Mail, run: () => scrollToSection('contact') },
      {
        id: 'github',
        label: 'View GitHub',
        hint: 'Open profile in a new tab',
        icon: Github,
        run: () => window.open(`${site.githubUrl}/${site.githubUsername}`, '_blank', 'noopener'),
      },
      {
        id: 'theme',
        label: 'Toggle Theme',
        hint: `Currently ${theme} mode`,
        icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
    ],
    [scrollToSection, theme, toggleTheme]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q))
  }, [commands, query])

  // Keyboard: open with Ctrl/Cmd+K, navigate with arrows, run with Enter
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => {
          const next = !o
          if (next) setQuery('')
          return next
        })
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setSelected(0)
      // Small delay so the input is mounted
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filtered[selected]?.run()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-start justify-center bg-black/50 p-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <Search className="h-4 w-4 shrink-0 text-[var(--text-faint)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command…"
                aria-label="Command palette search"
                className="w-full bg-transparent py-4 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none"
              />
              <kbd className="shrink-0 rounded-md border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-faint)]">
                esc
              </kbd>
            </div>

            {/* Commands */}
            <ul className="max-h-[320px] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center font-mono text-xs text-[var(--text-faint)]">
                  No commands match “{query}”
                </li>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon
                const isSelected = i === selected
                return (
                  <li key={cmd.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        cmd.run()
                        setOpen(false)
                      }}
                      onMouseEnter={() => setSelected(i)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                        isSelected && 'bg-[var(--surface-hover)]'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]',
                          isSelected ? 'text-violet-400' : 'text-[var(--text-muted)]'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm text-[var(--text)]">{cmd.label}</span>
                      <span className="font-mono text-[10px] text-[var(--text-faint)]">{cmd.hint}</span>
                      {isSelected && <span className="font-mono text-[10px] text-violet-400">↵</span>}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-[var(--border)] px-4 py-2.5 font-mono text-[10px] text-[var(--text-faint)]">
              <span><kbd className="rounded border border-[var(--border)] px-1">↑↓</kbd> navigate</span>
              <span><kbd className="rounded border border-[var(--border)] px-1">↵</kbd> run</span>
              <span><kbd className="rounded border border-[var(--border)] px-1">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
