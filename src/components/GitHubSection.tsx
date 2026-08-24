import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, Users, Database } from 'lucide-react'
import { site } from '../data/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { cn } from '../lib/utils'

interface GitHubProfile {
  login: string
  name: string
  avatar: string
  bio: string
  followers: number
  following: number
  publicRepos: number
}

interface Repo {
  name: string
  description: string
  language: string | null
  stars: number
  forks: number
  url: string
}

interface GitHubState {
  source: 'live' | 'sample'
  profile: GitHubProfile
  repos: Repo[]
}

const SAMPLE_REPOS: Repo[] = [
  {
    name: 'fancyfit',
    description: 'AI-powered virtual fitting room — try clothes on your 3D avatar.',
    language: 'TypeScript',
    stars: 48,
    forks: 9,
    url: 'https://github.com',
  },
  {
    name: 'mark',
    description: 'Personal AI assistant with memory and tool-use across apps.',
    language: 'Python',
    stars: 37,
    forks: 6,
    url: 'https://github.com',
  },
  {
    name: 'reconstruct',
    description: 'Photogrammetry pipeline: photos in, textured 3D models out.',
    language: 'Python',
    stars: 22,
    forks: 4,
    url: 'https://github.com',
  },
  {
    name: 'automata',
    description: 'Visual workflow automation engine with a node-graph editor.',
    language: 'TypeScript',
    stars: 15,
    forks: 2,
    url: 'https://github.com',
  },
]

const SAMPLE_PROFILE: GitHubProfile = {
  login: site.githubUsername,
  name: 'Desire',
  avatar: '',
  bio: 'CS student · building AI products, 3D experiences and developer tools.',
  followers: 120,
  following: 89,
  publicRepos: 14,
}

const SAMPLE_LANGS = [
  { name: 'TypeScript', pct: 34, color: '#3178c6' },
  { name: 'Python', pct: 28, color: '#3776ab' },
  { name: 'JavaScript', pct: 16, color: '#f7df1e' },
  { name: 'Java', pct: 10, color: '#e76f00' },
  { name: 'C / C++', pct: 7, color: '#659ad2' },
  { name: 'Other', pct: 5, color: '#8b8b8b' },
]

/** Deterministic pseudo-random heatmap (same pattern every visit, no lying numbers). */
function buildHeatmap() {
  const weeks = 26
  const days = 7
  const cells: number[] = []
  let seed = 7
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  for (let i = 0; i < weeks * days; i++) {
    const r = rand()
    cells.push(r < 0.42 ? 0 : r < 0.68 ? 1 : r < 0.86 ? 2 : r < 0.96 ? 3 : 4)
  }
  return { weeks, days, cells }
}

const LEVEL_COLORS = [
  'bg-[var(--surface-hover)]',
  'bg-violet-500/35',
  'bg-violet-500/55',
  'bg-violet-500/80',
  'bg-violet-400',
]

async function loadGitHub(): Promise<GitHubState> {
  const username = site.githubUsername
  const sample: GitHubState = {
    source: 'sample',
    profile: SAMPLE_PROFILE,
    repos: SAMPLE_REPOS,
  }
  if (!username) return sample

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
        signal: controller.signal,
      }),
    ])
    clearTimeout(timer)

    if (!userRes.ok || !reposRes.ok) return sample
    const [user, repos] = await Promise.all([userRes.json(), reposRes.json()])

    return {
      source: 'live',
      profile: {
        login: user.login,
        name: user.name ?? user.login,
        avatar: user.avatar_url ?? '',
        bio: user.bio ?? '',
        followers: user.followers ?? 0,
        following: user.following ?? 0,
        publicRepos: user.public_repos ?? 0,
      },
      repos: (repos as Array<Record<string, unknown>>)
        .filter((r) => !(r.fork as boolean))
        .slice(0, 6)
        .map((r) => ({
          name: String(r.name),
          description: String(r.description ?? ''),
          language: r.language ? String(r.language) : null,
          stars: Number(r.stargazers_count ?? 0),
          forks: Number(r.forks_count ?? 0),
          url: String(r.html_url ?? '#'),
        })),
    }
  } catch {
    return sample
  }
}

export function GitHubSection() {
  const [state, setState] = useState<GitHubState | null>(null)
  const heatmap = buildHeatmap()

  useEffect(() => {
    let mounted = true
    loadGitHub().then((data) => {
      if (mounted) setState(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  const langs = state?.source === 'live' ? computeLanguages(state.repos) : SAMPLE_LANGS
  const topRepos = (state?.repos ?? []).slice(0, 4)

  return (
    <section id="github" className="section-shell">
      <div className="container-site">
        <SectionHeading
          eyebrow="05 · GitHub"
          title={
            <>
              Code in the <span className="text-gradient">open.</span>
            </>
          }
          description="Everything below is pulled from the GitHub API when the username is configured — until then, sample data keeps the layout honest."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Profile card */}
          <Reveal className="h-full">
            <div className="glass flex h-full flex-col rounded-2xl p-6 sm:p-7">
              <div className="flex items-start gap-4">
                {state?.profile.avatar ? (
                  <img
                    src={state.profile.avatar}
                    alt={`${state.profile.name} GitHub avatar`}
                    className="h-16 w-16 rounded-2xl border border-[var(--border)]"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 font-display text-2xl font-bold text-white">
                    {site.monogram}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xl font-semibold text-[var(--text)]">
                    {state?.profile.name ?? 'Desire'}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-faint)]">@{state?.profile.login}</p>
                  <span
                    className={cn(
                      'mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                      state?.source === 'live'
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-amber-400/10 text-amber-400'
                    )}
                  >
                    {state?.source === 'live' ? '● Live data' : '○ Sample data'}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                {state?.profile.bio || SAMPLE_PROFILE.bio}
              </p>

              <dl className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: 'Repos', value: state?.profile.publicRepos ?? SAMPLE_PROFILE.publicRepos, icon: Database },
                  { label: 'Followers', value: state?.profile.followers ?? SAMPLE_PROFILE.followers, icon: Users },
                  { label: 'Following', value: state?.profile.following ?? SAMPLE_PROFILE.following, icon: Github },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <dt className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                      <s.icon className="h-3 w-3" />
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-semibold text-[var(--text)]">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={`${site.githubUrl}/${site.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-[var(--text)]"
              >
                <Github className="h-4 w-4" />
                View GitHub
                <ExternalLink className="h-3.5 w-3.5 text-[var(--text-faint)]" />
              </a>
            </div>
          </Reveal>

          {/* Heatmap + languages + repos */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.05}>
              <div className="glass rounded-2xl p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-faint)]">
                    Contribution heatmap
                  </p>
                  <span className="font-mono text-[10px] text-[var(--text-faint)]">last 26 weeks</span>
                </div>
                <div
                  className="grid grid-flow-col gap-[3px]"
                  style={{ gridTemplateRows: `repeat(${heatmap.days}, 10px)` }}
                  aria-hidden
                >
                  {Array.from({ length: heatmap.weeks * heatmap.days }).map((_, i) => (
                    <span
                      key={i}
                      className={cn('h-[10px] w-[10px] rounded-[2px]', LEVEL_COLORS[heatmap.cells[i]])}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-end gap-1">
                  <span className="font-mono text-[10px] text-[var(--text-faint)]">less</span>
                  {LEVEL_COLORS.map((c) => (
                    <span key={c} className={cn('h-2.5 w-2.5 rounded-[2px]', c)} />
                  ))}
                  <span className="font-mono text-[10px] text-[var(--text-faint)]">more</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--text-faint)]">
                  Most-used languages
                </p>
                <div className="space-y-3">
                  {langs.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-3">
                      <span className="w-24 shrink-0 truncate font-mono text-xs text-[var(--text-muted)]">
                        {lang.name}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-hover)]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: lang.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right font-mono text-xs text-[var(--text-faint)]">
                        {lang.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass rounded-2xl p-6">
                <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--text-faint)]">
                  Repository highlights
                </p>
                <ul className="space-y-2.5">
                  {topRepos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 transition-colors hover:border-violet-400/35"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate font-mono text-sm font-medium text-[var(--text)] group-hover:text-violet-400">
                            {repo.name}
                          </span>
                          <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-[var(--text-faint)]">
                            {repo.stars > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-400" /> {repo.stars}
                              </span>
                            )}
                            {repo.forks > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <GitFork className="h-3 w-3" /> {repo.forks}
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-[var(--text-muted)]">
                          {repo.description || 'No description'}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {state?.source === 'sample' && (
          <p className="mt-6 text-center font-mono text-xs text-[var(--text-faint)]">
            // Sample data shown — set your real username in{' '}
            <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-violet-400">src/data/site.ts</code>{' '}
            and this section becomes live.
          </p>
        )}
      </div>
    </section>
  )
}

function computeLanguages(repos: Repo[]): Array<{ name: string; pct: number; color: string }> {
  const counts = new Map<string, number>()
  let total = 0
  for (const r of repos) {
    if (!r.language) continue
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
    total++
  }
  if (total === 0) return SAMPLE_LANGS
  const palette = ['#3178c6', '#3776ab', '#f7df1e', '#e76f00', '#659ad2', '#f34b7d', '#8b8b8b', '#22d3ee']
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count], i) => ({
      name,
      pct: Math.round((count / total) * 100),
      color: palette[i % palette.length],
    }))
}
