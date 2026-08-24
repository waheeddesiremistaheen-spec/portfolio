# Desire — Developer Portfolio

A premium, dark-first, highly interactive personal portfolio for **Desire** — a Computer
Science student and software developer. Built to feel like a product, not a template.

![Stack](https://img.shields.io/badge/React-18-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Highlights

- **Hero** — staggered text-reveal headline, roles, magnetic buttons, and a canvas-based
  interactive "network" visualization with a self-typing terminal card.
- **Projects** — filterable, large premium cards, each with an expandable **case-study modal**
  (Problem → Idea → Technology → Process → Challenges → Result).
- **Skills** — interactive category cards; hover any technology to see what it was used for.
- **Experience** — expandable vertical timeline (education, projects, milestones, hackathons…).
- **GitHub section** — live data via the GitHub REST API with a graceful fallback to sample data
  (no keys needed — it's a public API).
- **Statistics** — animated counters that trigger on scroll (values are configurable, defaults are honest).
- **Command palette** — press `Ctrl/⌘ + K` for a Linear-style command palette (Go Home, View
  Projects, View GitHub, Contact Me, Toggle Theme, …).
- **Themes** — hand-crafted dark (default) and light themes, persisted to `localStorage`.
- **Extras** — custom cursor (desktop only), magnetic buttons, scroll-spy navigation, blur-on-scroll
  navbar, mobile full-screen menu, noise + grid + drifting-glow background, `prefers-reduced-motion`
  support throughout, SEO/OG/Twitter metadata, sitemap + robots.txt, JSON-LD structured data.

## 🛠 Stack

| Layer    | Choice                                   |
| -------- | ---------------------------------------- |
| UI       | React 18 + TypeScript                    |
| Build    | Vite 5                                   |
| Styling  | Tailwind CSS 3 (dark mode via `.dark`)   |
| Motion   | Framer Motion 11                         |
| Icons    | Lucide                                   |
| Fonts    | Self-hosted variable fonts (Inter, Space Grotesk, JetBrains Mono) |

No heavy 3D libs — the hero visualization is a hand-rolled, dependency-free `<canvas>`
(≈60 particles, pauses when the tab is hidden, static frame under reduced motion).

## 🚀 Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # preview the production build
```

## 📝 Making it yours

Everything editable lives in **`src/data/`** — no component changes needed:

| File                    | What it controls                                |
| ----------------------- | ----------------------------------------------- |
| `site.ts`               | Name, tagline, roles, intro, email, socials, **GitHub username**, **statistics**, contact endpoint |
| `projects.ts`           | Projects + full case studies (add a new object to add a project) |
| `skills.ts`             | Skill categories and per-skill hover notes      |
| `experience.ts`         | Timeline entries                                |
| `whatIBuild.ts`         | The "What I build" cards                        |
| `philosophy.ts`         | The three principles                            |

### GitHub integration

Set `githubUsername` in `src/data/site.ts` to your real username. The section then fetches
your profile, repo highlights and language stats from `api.github.com` automatically (it is a
public API — no token, no keys). Until then it shows clearly-labelled sample data.

### Contact form

- By default the form opens the visitor's mail client with the message pre-filled (no backend).
- To use a real endpoint, set `contactEndpoint` in `src/data/site.ts` (e.g. a Formspree or
  Web3Forms URL). No private keys are ever exposed.

### Projects

Add an entry to `src/data/projects.ts` with the shape
`{ id, title, tagline, description, image, accent, technologies, github, demo?, featured, category, caseStudy }`.
Drop the visual into `public/images/` and reference it — the card, filters and case-study modal
all generate automatically.

## 📁 Structure

```
src/
├── components/        # Navbar, Hero, About, Skills, Projects(+Card/Modal),
│                      # Experience, GitHubSection, Stats, WhatIBuild, Philosophy,
│                      # Contact, Footer, CommandPalette, Cursor, Background
│   └── ui/            # Button, Magnetic, Reveal, SectionHeading
├── data/              # ← all editable content
├── hooks/             # useTheme, useCountUp, useScrollSpy
└── lib/               # cn(), formatNumber()
```

## ♿ Accessibility & performance

- Semantic HTML, heading hierarchy, labelled forms, visible focus rings, `aria-*` states.
- `prefers-reduced-motion` respected by every animation (CSS + Framer `MotionConfig`).
- Custom cursor auto-disabled on touch devices and under reduced motion.
- Zero external requests at runtime (fonts self-hosted, GitHub API only when configured).
- Code-split Framer Motion chunk; lazy-loaded images; single canvas for all background FX.

---

© 2026 Desire. Built with curiosity and code.
