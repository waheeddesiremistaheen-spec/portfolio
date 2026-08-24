import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react'
import { site } from '../data/site'
import { Button } from './ui/Button'
import { HeroVisual } from './HeroVisual'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

function Headline() {
  const words = site.tagline.split(' ')
  const reduce = useReducedMotion()

  if (reduce) {
    return <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-[4.2rem]">{site.tagline}</h1>
  }

  return (
    <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-[4.2rem]">
      {words.map((word, i) => {
        const isKey = i >= 2 // "technology that solves real problems." gets the gradient
        return (
          <motion.span
            key={i}
            className={`inline-block ${isKey ? 'text-gradient' : 'text-[var(--text)]'}`}
            variants={{
              hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        )
      })}
    </h1>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center pt-28 pb-16 sm:pt-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2">
            <span className="chip">
              <Sparkles className="h-3 w-3 text-violet-400" />
              Available for opportunities
            </span>
          </motion.div>

          <Headline />

          <motion.p
            variants={item}
            className="mt-6 font-mono text-sm tracking-wide text-[var(--text-muted)] sm:text-base"
          >
            {site.roles.join('  •  ')}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
          >
            {site.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#projects">
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="#contact" variant="ghost">
              Let's Connect
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div variants={item} className="mt-12 flex items-center gap-3 text-[var(--text-faint)]">
            <div className="flex -space-x-2" aria-hidden>
              {['JS', 'PY', 'AI', '3D'].map((t, i) => (
                <span
                  key={t}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-[9px] font-bold"
                  style={{ zIndex: 4 - i }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="font-mono text-xs">
              Building with AI, web &amp; 3D — every day
            </span>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-faint)] transition-colors hover:text-[var(--text)] sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-[var(--border)] p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <ArrowDown className="sr-only" />
      </motion.a>
    </section>
  )
}
