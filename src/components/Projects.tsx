import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectCategories, projects, type Project, type ProjectCategory } from '../data/projects'
import { SectionHeading } from './ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { cn } from '../lib/utils'

type Filter = 'All' | ProjectCategory

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section id="projects" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="03 · Projects"
          title={
            <>
              Things I've <span className="text-gradient">built.</span>
            </>
          }
          description="Each project below has a full case study — the problem, the approach, the hard parts and what came out of it. Click any card to read it."
        />

        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300',
                filter === cat
                  ? 'border-transparent bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-glow'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.p key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 font-mono text-xs text-[var(--text-faint)]">
          // {visible.length} project{visible.length === 1 ? '' : 's'} — click any card for the full case study
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
