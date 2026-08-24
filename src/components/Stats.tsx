import { useCountUp } from '../hooks/useCountUp'
import { site } from '../data/site'
import { Reveal } from './ui/Reveal'

function StatItem({
  label,
  value,
  suffix,
  decimals,
}: {
  label: string
  value: number
  suffix: string
  decimals?: number
}) {
  const { ref, value: current } = useCountUp(value)

  return (
    <div className="group relative px-4 py-8 text-center sm:py-10">
      <span
        aria-hidden
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        ref={ref}
        className="text-gradient block font-display text-4xl font-bold tabular-nums sm:text-5xl lg:text-6xl"
      >
        {decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString()}
        {suffix}
      </span>
      <span className="mt-3 block text-sm text-[var(--text-muted)]">{label}</span>
    </div>
  )
}

export function Stats() {
  return (
    <section aria-label="Developer statistics" className="relative py-10 sm:py-14">
      <div className="container-site">
        <Reveal>
          <div className="glass grid grid-cols-2 divide-x divide-[var(--border)] rounded-2xl lg:grid-cols-4">
            {site.stats.map((stat) => (
              <StatItem
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
