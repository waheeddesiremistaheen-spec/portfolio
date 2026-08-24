export interface Principle {
  id: string
  number: string
  title: string
  description: string
}

export const principles: Principle[] = [
  {
    id: 'solve',
    number: '01',
    title: 'Solve What Matters',
    description:
      'Technology should solve meaningful problems. Before writing code, I ask who it helps and whether it actually helps them. A beautiful solution to the wrong problem is still the wrong problem.',
  },
  {
    id: 'learn',
    number: '02',
    title: 'Keep Learning',
    description:
      'Every project is an opportunity to understand something new. I treat unfamiliar technologies as the point, not the obstacle — each build makes the next one sharper.',
  },
  {
    id: 'improve',
    number: '03',
    title: 'Improve What\'s Next',
    description:
      'Build today, learn from it, and make tomorrow better. Software is never finished; the craft is in the iteration — measuring, refining and shipping again.',
  },
]
