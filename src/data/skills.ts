export interface Skill {
  name: string
  note: string
  level?: number
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: Skill[]
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Skills — grouped into categories. `note` shows on hover/tap.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'The primitives I think in.',
    skills: [
      { name: 'Java', note: 'Coursework + Android experiments', level: 85 },
      { name: 'Python', note: 'AI, CV and automation scripts', level: 90 },
      { name: 'JavaScript', note: 'The web\'s native tongue', level: 90 },
      { name: 'TypeScript', note: 'My default for serious apps', level: 88 },
      { name: 'C', note: 'Systems and embedded basics', level: 70 },
      { name: 'C++', note: 'Performance-sensitive code', level: 65 },
      { name: 'Rust', note: 'Exploring fearless concurrency', level: 55 },
      { name: 'Go', note: 'Simple, fast backend services', level: 60 },
      { name: 'SQL', note: 'Designing and querying data', level: 82 },
      { name: 'HTML', note: 'Semantic structure', level: 95 },
      { name: 'CSS', note: 'Layout, motion, design systems', level: 90 },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    description: 'How I ship software.',
    skills: [
      { name: 'React', note: 'Component architecture + hooks', level: 90 },
      { name: 'Node.js', note: 'APIs and tooling', level: 85 },
      { name: 'Spring Boot', note: 'Java backends, REST', level: 70 },
      { name: 'REST APIs', note: 'Designing and consuming', level: 88 },
      { name: 'MySQL', note: 'Relational data modelling', level: 80 },
      { name: 'Git', note: 'Branching, rebasing, history', level: 88 },
      { name: 'GitHub', note: 'PRs, CI, project workflows', level: 90 },
    ],
  },
  {
    id: 'ai',
    title: 'AI / Emerging',
    description: 'Where I spend my curiosity.',
    skills: [
      { name: 'Generative AI', note: 'LLMs, prompt engineering, RAG', level: 85 },
      { name: 'Computer Vision', note: 'Detection, pose, reconstruction', level: 75 },
      { name: '3D Reconstruction', note: 'SfM, photogrammetry, meshes', level: 70 },
      { name: 'AI APIs', note: 'Integrating models into products', level: 88 },
      { name: 'Automation', note: 'Turning manual work into code', level: 85 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'My daily instruments.',
    skills: [
      { name: 'VS Code', note: 'My main editor', level: 95 },
      { name: 'IntelliJ IDEA', note: 'Java when needed', level: 70 },
      { name: 'Blender', note: '3D modelling + scenes', level: 60 },
      { name: 'Figma', note: 'Design → code handoff', level: 78 },
      { name: 'Docker', note: 'Reproducible environments', level: 72 },
      { name: 'GitHub Actions', note: 'CI/CD pipelines', level: 75 },
    ],
  },
]
