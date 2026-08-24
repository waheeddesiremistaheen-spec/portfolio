import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const FOCUS_AREAS = [
  'Software development',
  'Problem solving',
  'Product development',
  'Artificial intelligence',
  'Web development',
  '3D technology',
  'Automation',
  'Experimentation',
]

const JOURNEY = [
  {
    step: 'Learning',
    year: '2021',
    text: 'Started with Python and the fundamentals — data structures, algorithms, how machines actually think.',
  },
  {
    step: 'Building',
    year: '2022 →',
    text: 'Started shipping real things: web apps, tools and APIs used by actual people, not just tutorials.',
  },
  {
    step: 'Experimenting',
    year: '2024 →',
    text: 'Got hands-on with AI, computer vision and 3D — building prototypes that push past the syllabus.',
  },
  {
    step: 'Shipping',
    year: '2026',
    text: 'Now: full products with real users — like FancyFit and Mark — with the polish that makes them feel made.',
  },
]

export function About() {
  const [active, setActive] = useState(0)

  return (
    <section id="about" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="01 · About"
          title={
            <>
              A little about <span className="text-gradient">me.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Narrative */}
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              <p>
                I'm a <span className="font-medium text-[var(--text)]">Computer Science student</span>{' '}
                and developer who likes understanding how technology works — then turning that
                understanding into things people can actually use.
              </p>
              <p>
                Most of my time goes into building software end to end: thinking about a problem,
                designing the system, writing the code, and shipping it. I care about the details
                most people never notice — the ones that make software feel considered.
              </p>
              <p>
                Right now I'm especially interested in{' '}
                <span className="font-medium text-[var(--text)]">
                  AI-powered products, 3D technology and automation
                </span>
                , and in the intersection where they meet.
              </p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area) => (
                <li key={area} className="chip">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Interactive journey */}
          <Reveal delay={0.1}>
            <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <p className="eyebrow mb-6">My journey</p>
              <ol className="relative space-y-3">
                {/* connecting line */}
                <span
                  aria-hidden
                  className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-violet-400/60 via-cyan-400/40 to-emerald-400/50"
                />
                {JOURNEY.map((step, i) => {
                  const isActive = active === i
                  return (
                    <li key={step.step} className="relative">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={isActive}
                        className="group flex w-full items-start gap-4 rounded-xl p-2 text-left transition-colors"
                      >
                        <span
                          className={`relative mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-all duration-300 ${
                            isActive
                              ? 'border-transparent bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-glow'
                              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-faint)] group-hover:text-[var(--text)]'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span
                              className={`font-display text-base font-semibold transition-colors ${
                                isActive ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'
                              }`}
                            >
                              {step.step}
                            </span>
                            <span className="font-mono text-[10px] text-[var(--text-faint)]">
                              {step.year}
                            </span>
                          </span>
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.span
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="block overflow-hidden"
                              >
                                <span className="block pt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                                  {step.text}
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
