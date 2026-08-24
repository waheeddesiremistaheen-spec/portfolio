import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Github, ExternalLink, ArrowRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { Button } from './ui/Button'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  useEffect(() => {
    lastFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [onClose])

  const cs = project.caseStudy

  const sections = [
    { title: 'The Problem', body: cs.problem },
    { title: 'The Idea', body: cs.idea },
    { title: 'The Technology', body: cs.technology },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        role="document"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl"
      >
        {/* Header image */}
        <div className="relative h-56 w-full overflow-hidden sm:h-72">
          <img
            src={project.image}
            alt={`${project.title} — project visual`}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-soft)] via-transparent to-transparent" />
          <div className="absolute inset-0" style={{ background: project.accent, opacity: 0.12, mixBlendMode: 'screen' }} />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
            aria-label="Close case study"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="chip mb-2 !border-white/20 !bg-white/10 !text-white/90">{project.category}</span>
            <h3 id="project-modal-title" className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm text-white/75">{project.tagline}</p>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <p className="mb-8 text-base leading-relaxed text-[var(--text-muted)]">{project.description}</p>

          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h4 className="mb-2 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                  <span className="h-px w-6 bg-gradient-to-r from-violet-400 to-cyan-400" />
                  {s.title}
                </h4>
                <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">{s.body}</p>
              </section>
            ))}

            <section>
              <h4 className="mb-3 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                <span className="h-px w-6 bg-gradient-to-r from-violet-400 to-cyan-400" />
                The Process
              </h4>
              <ol className="space-y-2.5">
                {cs.process.map((step, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[var(--text-muted)]">
                    <span className="mt-0.5 font-mono text-xs font-bold text-violet-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h4 className="mb-3 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                <span className="h-px w-6 bg-gradient-to-r from-violet-400 to-cyan-400" />
                The Challenges
              </h4>
              <ul className="space-y-2.5">
                {cs.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[var(--text-muted)]">
                    <span className="mt-0.5 text-cyan-400">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h4 className="mb-2 flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                <span className="h-px w-6 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                The Result
              </h4>
              <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">{cs.result}</p>
            </section>
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-6">
            <Button href={project.github} target="_blank" rel="noopener noreferrer" className="!px-5 !py-2.5 !text-sm">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
            {project.demo && (
              <Button href={project.demo} target="_blank" rel="noopener noreferrer" variant="ghost" className="!px-5 !py-2.5 !text-sm">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-auto inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              Close <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
