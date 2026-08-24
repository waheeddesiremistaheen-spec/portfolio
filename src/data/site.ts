export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'external'
}

export interface Stat {
  label: string
  value: number
  suffix: string
  decimals?: number
}

export interface SiteConfig {
  name: string
  monogram: string
  title: string
  tagline: string
  roles: string[]
  intro: string
  email: string
  location: string
  /** GitHub username used for the live GitHub API integration */
  githubUsername: string
  /** Base URL for GitHub profile links */
  githubUrl: string
  socials: SocialLink[]
  stats: Stat[]
  /** Optional contact form endpoint (e.g. a Formspree/Web3Forms URL).
   *  Leave empty to use the built-in mail client fallback. No keys are ever exposed. */
  contactEndpoint: string
  /** Base URL used for SEO metadata + sitemap/robots */
  siteUrl: string
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to personalise the site.
 *  Replace the placeholder GitHub username, social links and statistics
 *  with your real ones — every section reads from here.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const site: SiteConfig = {
  name: 'Desire',
  monogram: 'D',
  title: 'Desire — Software Developer & Builder',
  tagline: 'I build technology that solves real problems.',
  roles: ['Computer Science Student', 'Software Developer', 'Builder'],
  intro:
    "I'm a Computer Science student who enjoys creating software, experimenting with technology, and turning ideas into real products — from AI-powered applications to 3D experiences and developer tools.",
  email: 'hello@desire.dev',
  location: 'Remote · Worldwide',
  githubUsername: 'desire-dev',
  githubUrl: 'https://github.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/desire-dev', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/desire',
      icon: 'linkedin',
    },
    { label: 'X / Twitter', href: 'https://x.com/desire_dev', icon: 'twitter' },
    { label: 'Email', href: 'mailto:hello@desire.dev', icon: 'mail' },
  ],
  // ← Replace with your real numbers. The counters animate on scroll.
  stats: [
    { label: 'Projects built', value: 12, suffix: '+' },
    { label: 'Technologies worked with', value: 18, suffix: '+' },
    { label: 'Years learning & building', value: 4, suffix: '+' },
    { label: 'Lines of code written', value: 45, suffix: 'K+' },
  ],
  contactEndpoint: '',
  siteUrl: 'https://desire.dev',
}
