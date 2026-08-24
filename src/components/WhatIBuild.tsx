import { motion } from 'framer-motion'
import {
  Globe,
  BrainCircuit,
  Workflow,
  Boxes,
  Wrench,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react'
import { buildAreas } from '../data/whatIBuild'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const ICONS: Record<string, LucideIcon> = {
  web: Globe,
  ai: BrainCircuit,
  automation: Workflow,
  threed: Boxes,
  tools: Wrench,
  experiments: FlaskConical,
}

export function WhatIBuild() {
  return (
    <section id="build" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="06 · What I build"
          title={
            <>
              The kinds of technology <span className="text-gradient">I enjoy building.</span>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildAreas.map((area, i) => {
            const Icon = ICONS[area.icon]
            return (
              <Reveal key={area.id} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-violet-400/35"
                >
                  {/* Corner glow on hover */}
                  <span
                    aria-hidden
                    className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${area.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                  />
                  <span
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${area.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[var(--text)]">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {area.description}
                  </p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
