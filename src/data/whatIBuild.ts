export interface BuildArea {
  id: string
  title: string
  description: string
  icon: 'web' | 'ai' | 'automation' | 'threed' | 'tools' | 'experiments'
  accent: string
}

export const buildAreas: BuildArea[] = [
  {
    id: 'web',
    title: 'Web Applications',
    description: 'Modern, scalable web experiences built with care for speed, accessibility and feel.',
    icon: 'web',
    accent: 'from-[#22d3ee] to-[#6366f1]',
  },
  {
    id: 'ai',
    title: 'AI Applications',
    description: 'Software powered by intelligent systems — from LLM features to computer vision.',
    icon: 'ai',
    accent: 'from-[#a78bfa] to-[#8b5cf6]',
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Systems that reduce repetitive work and let people focus on what matters.',
    icon: 'automation',
    accent: 'from-[#34d399] to-[#22d3ee]',
  },
  {
    id: '3d',
    title: '3D Experiences',
    description: 'Interactive 3D and digital environments that feel spatial, not flat.',
    icon: 'threed',
    accent: 'from-[#6366f1] to-[#a78bfa]',
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    description: 'Tools designed to make developers faster, calmer and more productive.',
    icon: 'tools',
    accent: 'from-[#f472b6] to-[#a78bfa]',
  },
  {
    id: 'experiments',
    title: 'Experimental Technology',
    description: 'Interesting ideas that push beyond conventional applications.',
    icon: 'experiments',
    accent: 'from-[#fbbf24] to-[#f472b6]',
  },
]
