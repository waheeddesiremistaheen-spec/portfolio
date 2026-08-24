export type ProjectCategory = 'AI' | 'Web' | '3D' | 'Tools' | 'Automation'

export interface CaseStudySection {
  heading: string
  body: string
  bullets?: string[]
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  /** Path to the project visual (public/) or a data-URI */
  image: string
  /** CSS gradient used as the image fallback / accent */
  accent: string
  technologies: string[]
  github: string
  demo?: string
  featured: boolean
  category: ProjectCategory
  caseStudy: {
    problem: string
    idea: string
    technology: string
    process: string[]
    challenges: string[]
    result: string
  }
}

const githubBase = 'https://github.com/desire-dev'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Project data — add a new project by appending an object below.
 *  The UI, filters and case-study modal are generated automatically.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: 'fancyfit',
    title: 'FancyFit',
    tagline: 'AI-powered virtual fitting room',
    description:
      'An AI-powered fashion platform that lets people create a digital representation of themselves and experiment with clothing virtually — before buying anything.',
    image: '/images/fancyfit.jpg',
    accent: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
    technologies: ['Computer Vision', '3D', 'React', 'Python', 'AI APIs'],
    github: `${githubBase}/fancyfit`,
    demo: 'https://fancyfit.example.com',
    featured: true,
    category: 'AI',
    caseStudy: {
      problem:
        'Buying clothes online is a gamble. Shoppers guess at sizes, colours and fit from flat photos, leading to huge return rates, wasted shipping and a frustrating experience. Physical try-ons require stores, inventory and time.',
      idea:
        'Build a digital twin of the user from a single photo, then let them try on clothes in 3D before committing. The platform estimates body dimensions with computer vision, reconstructs a 3D avatar, and drapes garments over it in real time.',
      technology:
        'Python and OpenCV for body measurement estimation, a lightweight 3D engine (Three.js) for avatar rendering, React + TypeScript for the frontend, and REST APIs wiring the pieces together.',
      process: [
        'Prototyped body-dimension estimation from single images using OpenCV + MediaPipe landmarks.',
        'Built a 3D avatar pipeline that maps estimated measurements to an adjustable rigged model.',
        'Created a web app where users upload a photo, review their avatar, and browse garments.',
        'Iterated on the garment-draping pass until simple outfits looked believable on the avatar.',
      ],
      challenges: [
        'Estimating accurate proportions from a single photo is under-constrained — I combined landmark ratios with population priors to stay plausible.',
        'Real-time 3D draping is heavy; I simplified geometry and offloaded expensive work to web workers to keep interactions at 60fps.',
        'Handling poor lighting and varied body types without bias required careful dataset curation and augmentation.',
      ],
      result:
        'A working end-to-end virtual fitting room: upload a photo, get a 3D avatar, try on outfits, and see how they look from every angle. The pipeline taught me how far single-image 3D reconstruction can go — and where the research frontier starts.',
    },
  },
  {
    id: 'mark',
    title: 'Mark',
    tagline: 'A personal AI assistant that remembers',
    description:
      'A voice-driven personal AI assistant designed to interact through natural speech, remember information across conversations, and perform tasks across applications.',
    image: '/images/mark.jpg',
    accent: 'linear-gradient(135deg, #22d3ee, #34d399)',
    technologies: ['Generative AI', 'Voice', 'Python', 'LLM APIs', 'Automation'],
    github: `${githubBase}/mark`,
    demo: 'https://mark.example.com',
    featured: true,
    category: 'AI',
    caseStudy: {
      problem:
        'Assistants forget everything between conversations. Asking your own machine something from last week means re-explaining context, and most assistants can only chat — they cannot actually do things in your applications.',
      idea:
        'Build a personal assistant with persistent memory and real tool-use: Mark remembers facts you tell it, keeps a searchable memory store, and can execute tasks — opening apps, managing files, and automating routine actions — instead of just recommending them.',
      technology:
        'Python core with an LLM for reasoning, a local vector store for long-term memory, speech-to-text / text-to-speech for voice interaction, and an app-control layer for executing tasks.',
      process: [
        'Started with the conversation loop: speech in → transcription → LLM → spoken reply.',
        'Added a memory layer that extracts salient facts from each conversation and stores them as retrievable memories.',
        'Built an action layer exposing safe operations (files, apps, clipboard, timers) the model can call.',
        'Wrapped everything in a clean desktop-style interface with a wake phrase and hotkey.',
      ],
      challenges: [
        'Deciding what deserves to be remembered — I used heuristics plus model-judged salience to avoid noise in memory.',
        'Making tool execution safe: every destructive action requires confirmation and is sandboxed where possible.',
        'Keeping latency low for a natural voice conversation despite chained transcription → model → synthesis calls.',
      ],
      result:
        'A genuinely useful personal assistant that remembers who you are, what you asked last week, and can actually do things — not just answer. It became my test bed for prompt engineering, memory systems and voice UX.',
    },
  },
  {
    id: 'reconstruct',
    title: 'Reconstruct',
    tagline: 'From photos to 3D models',
    description:
      'An experimental 3D reconstruction tool that turns a set of ordinary photographs into a textured 3D model using structure-from-motion and photogrammetry techniques.',
    image: '/images/reconstruct.jpg',
    accent: 'linear-gradient(135deg, #6366f1, #a78bfa)',
    technologies: ['3D', 'Computer Vision', 'Python', 'OpenCV', 'WebGL'],
    github: `${githubBase}/reconstruct`,
    demo: undefined,
    featured: true,
    category: '3D',
    caseStudy: {
      problem:
        'Creating 3D models of real objects usually means expensive scanners or long manual modelling sessions. Most people never get to touch 3D capture because the tooling is intimidating and costly.',
      idea:
        'Build an accessible photogrammetry pipeline: the user photographs an object from many angles, and the tool reconstructs a point cloud, meshes it, and produces a viewable 3D model — all in the browser where possible.',
      technology:
        'Python with OpenCV for feature detection and matching, structure-from-motion for camera poses and sparse reconstruction, Poisson/ball-pivoting meshing, and a WebGL viewer for the result.',
      process: [
        'Implemented SIFT-like feature extraction and matching to find correspondences between photos.',
        'Recovered camera positions with structure-from-motion and built a sparse point cloud.',
        'Converted the sparse cloud into a dense surface mesh and added texture projection.',
        'Built a web viewer so models can be inspected and exported without desktop software.',
      ],
      challenges: [
        'Outlier matches wreck the reconstruction — robust estimation (RANSAC + bundle adjustment) was essential.',
        'Dense reconstruction is memory-hungry; I voxelised and decimated aggressively to keep models web-friendly.',
        'Making the capture process forgiving — telling users which photos will reconstruct well is half the product.',
      ],
      result:
        'A working photogrammetry pipeline that reconstructs small objects from ~60 photos, plus a browser viewer. It demystified a field I found intimidating and became my entry point into 3D graphics and geometry processing.',
    },
  },
  {
    id: 'automata',
    title: 'Automata',
    tagline: 'Workflow automation engine',
    description:
      'A visual automation platform that lets non-developers chain triggers and actions — files, APIs, emails, scripts — into reliable workflows that remove repetitive work.',
    image: '/images/automata.jpg',
    accent: 'linear-gradient(135deg, #34d399, #22d3ee)',
    technologies: ['Node.js', 'TypeScript', 'React', 'Docker', 'REST APIs'],
    github: `${githubBase}/automata`,
    demo: undefined,
    featured: false,
    category: 'Automation',
    caseStudy: {
      problem:
        'Repetitive digital chores — renaming files, forwarding emails, scraping a page, syncing data — eat hours every week, but writing scripts for each one is a barrier for most people.',
      idea:
        'Create a drag-and-drop workflow builder where nodes are triggers and actions. Users connect them visually; the engine executes the graph on a schedule or when an event fires.',
      technology:
        'Node.js + TypeScript engine with a DAG scheduler, React frontend with a node-graph editor, Docker for sandboxed execution, and REST APIs for the node library.',
      process: [
        'Designed the node model: typed inputs/outputs, retries, and error handling as first-class concepts.',
        'Built the graph editor UI with pan/zoom and connection handling between ports.',
        'Implemented the executor with a topologically-ordered scheduler, retries and dead-letter handling.',
        'Shipped a starter node library (HTTP, filesystem, email, schedule, script) and a CLI runner.',
      ],
      challenges: [
        'Cycles in graphs — I detect and reject them at build time rather than failing at runtime.',
        'Long-running workflows needed resilience: state persistence and resume-after-restart took real engineering.',
        'Making failure visible: a clear per-node run history was the feature that made people trust it.',
      ],
      result:
        'A working automation engine with a visual editor, scheduler and sandboxed execution. I now dogfood it for my own daily chores, which is the best endorsement a tool can get.',
    },
  },
  {
    id: 'pulse',
    title: 'Pulse',
    tagline: 'Developer workspace dashboard',
    description:
      'A terminal-inspired dashboard that aggregates a developer\'s repositories, PRs, issues and metrics into one focused command-line experience with a web frontend.',
    image: '/images/pulse.jpg',
    accent: 'linear-gradient(135deg, #f472b6, #a78bfa)',
    technologies: ['TypeScript', 'React', 'Node.js', 'Git', 'CLI'],
    github: `${githubBase}/pulse`,
    demo: undefined,
    featured: false,
    category: 'Tools',
    caseStudy: {
      problem:
        'Developer context lives in too many places: GitHub notifications, PR review queues, CI status, local branches. Context-switching between them is expensive and easy to lose track of.',
      idea:
        'Build a single dashboard that pulls everything into one place — a fast, keyboard-driven interface with a terminal feel, plus a browser view for the same data.',
      technology:
        'TypeScript everywhere, React for the web dashboard, Node.js for the sync daemon, git plumbing for local state, and the GitHub REST API for remote data.',
      process: [
        'Built the sync layer first: fetch repos, PRs, issues, CI runs into a local store.',
        'Designed the interface around a command line: fuzzy search, j/k navigation, one-key actions.',
        'Added the web view sharing the same data store, so the dashboard works in the browser too.',
        'Polished the details: unread indicators, review requests, and a "what needs me now" view.',
      ],
      challenges: [
        'Rate limits on the GitHub API forced smart caching and incremental syncs.',
        'Merging remote state with local git state (branches, status) required careful reconciliation.',
        'Keyboard UX is unforgiving — every shortcut needed discoverability without clutter.',
      ],
      result:
        'A dashboard I use daily that cut my context-switching noticeably. It also sharpened my TypeScript, API-design and UX instincts more than any tutorial ever could.',
    },
  },
  {
    id: 'lumina',
    title: 'Lumina',
    tagline: 'Collaborative study platform',
    description:
      'A real-time collaborative web app for students to share notes, quiz each other and track study streaks — with offline support and a progressive web app shell.',
    image: '/images/lumina.jpg',
    accent: 'linear-gradient(135deg, #fbbf24, #f472b6)',
    technologies: ['React', 'Node.js', 'MySQL', 'WebSockets', 'PWA'],
    github: `${githubBase}/lumina`,
    demo: 'https://lumina.example.com',
    featured: false,
    category: 'Web',
    caseStudy: {
      problem:
        'Study notes live in silos — Google Docs, PDFs, group chats. There is no shared space where a class can build, test and reinforce knowledge together.',
      idea:
        'Build a collaborative note-sharing and quiz platform where each course gets a space: markdown notes, community quizzes, streaks, and real-time presence so it feels alive.',
      technology:
        'React frontend with a PWA shell, Node.js + WebSockets for real-time collaboration, MySQL for durable storage, and markdown rendering with syntax highlighting.',
      process: [
        'Designed the data model around course spaces, notes and quiz questions with versioning.',
        'Implemented real-time editing with WebSockets and operational transforms for concurrent notes.',
        'Built the quiz engine with spaced-repetition scheduling and streak tracking.',
        'Added offline support via service worker caching and local-first writes.',
      ],
      challenges: [
        'Concurrent markdown editing is subtle — I ended up with a pragmatic last-write-wins + presence model that felt instant.',
        'Spaced repetition scheduling had to stay simple enough to explain in one sentence.',
        'Keeping the PWA fast: code splitting, cache-first strategies and lazy loading images.',
      ],
      result:
        'A polished, deployable web app used by a real study group. It taught me full-stack ownership — database design, real-time sync, and the long tail of production polish.',
    },
  },
]

export const projectCategories: Array<'All' | ProjectCategory> = [
  'All',
  'AI',
  'Web',
  '3D',
  'Tools',
  'Automation',
]
