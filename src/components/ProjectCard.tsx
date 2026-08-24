import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { cn } from '../lib/utils'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300 hover:border-violet-400/35',
        project.featured && 'sm:col-span-2'
      )}
    >
      {/* Visual */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block aspect-[16/9] w-full overflow-hidden text-left"
        aria-label={`Open case study for ${project.title}`}
      >
        <img
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        {/* Accent wash */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16] mix-blend-screen transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: project.accent }}
        />

        <div className="absolute left-5 right-5 top-4 flex items-center justify-between">
          <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/85 backdrop-blur-sm">
            {project.category}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-white/75">{project.tagline}</p>
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech} className="chip !px-2.5 !py-0.5 !text-[10px]">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2 border-t border-[var(--border)] pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            aria-label={`${project.title} on GitHub`}
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="link-underline ml-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--text)]"
          >
            Case study
          </button>
        </div>
      </div>
    </motion.article>
  )
}
