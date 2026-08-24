import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories, type Skill } from '../data/skills'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { cn } from '../lib/utils'

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[number]
  index: number
}) {
  const [active, setActive] = useState<Skill | null>(null)

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div className="glass group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-violet-400/30 sm:p-7">
        <p className="eyebrow-accent mb-2">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="text-xl font-semibold text-[var(--text)]">{category.title}</h3>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">{category.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(skill)}
                onFocus={() => setActive(skill)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                aria-label={`${skill.name} — ${skill.note}`}
                className={cn(
                  'rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200',
                  active === skill
                    ? 'border-transparent bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-glow'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                )}
              >
                {skill.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Detail line — swaps with an animation, fixed height to avoid layout shift */}
        <div className="mt-auto pt-5">
          <div className="flex min-h-[52px] items-end">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="w-full"
                >
                  <p className="text-sm leading-snug text-[var(--text)]">{active.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{active.note}</p>
                  {typeof active.level === 'number' && (
                    <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[var(--surface-hover)]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${active.level}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full font-mono text-xs text-[var(--text-faint)]"
                >
                  // hover a technology to see what I've done with it
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="02 · Skills"
          title={
            <>
              Technologies I <span className="text-gradient">build with.</span>
            </>
          }
          description="Not a wall of logos — each one is something I've used to build real things, and hovering shows you what."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
