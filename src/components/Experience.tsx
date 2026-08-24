import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Rocket, Flag, Trophy, Award, Sparkles, Plus } from 'lucide-react'
import { experience, type ExperienceType } from '../data/experience'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { cn } from '../lib/utils'

const TYPE_META: Record<ExperienceType, { label: string; icon: typeof Rocket; color: string }> = {
  education: { label: 'Education', icon: GraduationCap, color: 'text-cyan-400' },
  project: { label: 'Project', icon: Rocket, color: 'text-violet-400' },
  milestone: { label: 'Milestone', icon: Flag, color: 'text-emerald-400' },
  hackathon: { label: 'Hackathon', icon: Trophy, color: 'text-amber-400' },
  certification: { label: 'Certification', icon: Award, color: 'text-fuchsia-400' },
  achievement: { label: 'Achievement', icon: Sparkles, color: 'text-rose-400' },
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <section id="experience" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="04 · Experience"
          title={
            <>
              My journey <span className="text-gradient">so far.</span>
            </>
          }
          description="Education, projects, milestones and everything in between. Every entry expands into the story behind it."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <span
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-400/50 via-cyan-400/35 to-emerald-400/50 sm:left-[23px]"
          />

          <ol className="space-y-4">
            {experience.map((item, i) => {
              const meta = TYPE_META[item.type]
              const Icon = meta.icon
              const isOpen = openId === item.id

              return (
                <li key={item.id} className="relative pl-14 sm:pl-16">
                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] transition-all duration-300 sm:h-12 sm:w-12',
                      isOpen && 'border-transparent shadow-glow'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', meta.color)} />
                  </span>

                  <Reveal delay={Math.min(i * 0.04, 0.2)}>
                    <div
                      className={cn(
                        'glass rounded-2xl transition-colors duration-300',
                        isOpen ? 'border-violet-400/30' : 'hover:border-[color-mix(in_srgb,var(--text-muted)_35%,transparent)]'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                              {item.period}
                            </span>
                            <span className={cn('font-mono text-[10px] uppercase tracking-wider', meta.color)}>
                              {meta.label}
                            </span>
                          </div>
                          <h3 className="mt-1.5 font-display text-base font-semibold text-[var(--text)] sm:text-lg">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)]">{item.org}</p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.summary}</p>
                        </div>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className={cn(
                            'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                            isOpen
                              ? 'border-transparent bg-gradient-to-r from-violet-500 to-cyan-400 text-white'
                              : 'border-[var(--border)] text-[var(--text-muted)]'
                          )}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-[var(--border)] px-5 pb-5 sm:px-6">
                              <ul className="space-y-2 pt-4">
                                {item.details.map((d, j) => (
                                  <motion.li
                                    key={j}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 + j * 0.06, duration: 0.3 }}
                                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-muted)]"
                                  >
                                    <span className="mt-1 text-cyan-400">▸</span>
                                    {d}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
