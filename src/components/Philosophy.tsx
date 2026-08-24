import { motion } from 'framer-motion'
import { principles } from '../data/philosophy'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Philosophy() {
  return (
    <section id="philosophy" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="07 · Design philosophy"
          title={
            <>
              How I think about <span className="text-gradient">building.</span>
            </>
          }
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.id} delay={i * 0.1} className="h-full">
              <motion.div
                whileHover="hover"
                className="group relative flex h-full flex-col bg-[var(--bg-soft)] p-8 sm:p-10"
              >
                {/* Number */}
                <span
                  aria-hidden
                  className="font-display text-5xl font-bold text-[var(--surface-hover)] transition-colors duration-500 group-hover:text-violet-400/25 sm:text-6xl"
                >
                  {principle.number}
                </span>

                <h3 className="mt-8 font-display text-xl font-semibold text-[var(--text)]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {principle.description}
                </p>

                {/* Bottom gradient accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
