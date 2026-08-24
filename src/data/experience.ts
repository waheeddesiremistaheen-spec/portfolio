export type ExperienceType =
  | 'education'
  | 'project'
  | 'milestone'
  | 'hackathon'
  | 'certification'
  | 'achievement'

export interface ExperienceItem {
  id: string
  period: string
  title: string
  org: string
  type: ExperienceType
  summary: string
  details: string[]
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  "My journey so far." — add milestones as they happen. Each item is
 *  expandable in the UI.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const experience: ExperienceItem[] = [
  {
    id: 'started-coding',
    period: '2021',
    title: 'Wrote my first line of code',
    org: 'Self-taught',
    type: 'milestone',
    summary:
      'Discovered that computers do exactly what you tell them — then spent months teaching them to do interesting things instead.',
    details: [
      'Started with Python: automating boring tasks, small games, and text adventures.',
      'Realised I could build things people actually use, and never looked back.',
    ],
  },
  {
    id: 'cs-degree',
    period: '2022 — Present',
    title: 'Computer Science degree',
    org: 'University',
    type: 'education',
    summary:
      'Formal foundations to pair with the curiosity: data structures, algorithms, systems, databases and software engineering.',
    details: [
      'Data structures & algorithms — the discipline behind every design decision.',
      'Operating systems & computer networks — how machines really work under the hood.',
      'Databases & software engineering — turning ideas into maintainable systems.',
    ],
  },
  {
    id: 'first-product',
    period: '2023',
    title: 'Shipped my first real product',
    org: 'Side project',
    type: 'project',
    summary:
      'Took a project from idea to deployed, usable product — learning that shipping is a skill of its own.',
    details: [
      'Planned, built and deployed a web app used by real people.',
      'Learned deployment, domains, databases and the unglamorous 20% of work that makes the other 80% usable.',
    ],
  },
  {
    id: 'ai-3d',
    period: '2024',
    title: 'Dived deep into AI & 3D',
    org: 'Self-directed',
    type: 'milestone',
    summary:
      'Became obsessed with intelligent systems and spatial computing — and started building with both.',
    details: [
      'Built computer-vision and 3D-reconstruction experiments end to end.',
      'Learned to work with LLM APIs, embeddings and retrieval — the stack behind modern AI products.',
    ],
  },
  {
    id: 'fancyfit-built',
    period: '2025',
    title: 'Built FancyFit',
    org: 'Flagship project',
    type: 'project',
    summary:
      'An AI-powered virtual fitting room: a digital twin of yourself that tries on clothes in 3D.',
    details: [
      'Computer vision for body measurement estimation from a single photo.',
      '3D avatar reconstruction and garment rendering in the browser.',
      'My biggest lesson: tying AI models into a polished product experience is where the magic lives.',
    ],
  },
  {
    id: 'hackathon',
    period: '2025',
    title: 'Hackathon — 48 hours, one product',
    org: 'Hackathon',
    type: 'hackathon',
    summary:
      'Built a working prototype with strangers-turned-teammates under a brutal deadline. Learned what matters when time is the scarcest resource.',
    details: [
      'Scope ruthlessly: a demo that works beats a vision that doesn\'t.',
      'Communicate constantly: alignment is the fastest tool in the box.',
    ],
  },
  {
    id: 'mark-built',
    period: '2026',
    title: 'Built Mark — my personal AI assistant',
    org: 'Flagship project',
    type: 'project',
    summary:
      'A voice-driven assistant with persistent memory and real tool-use across applications.',
    details: [
      'Designed a memory layer that decides what to remember and retrieves it when relevant.',
      'Built an action layer that lets the assistant do things, not just talk about them.',
    ],
  },
  {
    id: 'certification',
    period: '2026',
    title: 'Certifications & structured learning',
    org: 'Continuous',
    type: 'certification',
    summary:
      'Formalising knowledge as I go — the fastest way to find the gaps in what you think you know.',
    details: [
      'Algorithms & data structures certification.',
      'Modern AI engineering and prompt-systems coursework.',
      'Web performance and accessibility deep-dives.',
    ],
  },
]
