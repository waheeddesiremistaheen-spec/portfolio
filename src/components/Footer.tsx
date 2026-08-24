import { ArrowUp, Github, Linkedin, Mail, Command } from 'lucide-react'
import { site } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--border)] py-12">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-gradient font-display text-2xl font-bold">{site.name}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Building technology. Learning constantly.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <a href={site.socials.find((s) => s.icon === 'github')?.href ?? '#'} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5 hover:text-[var(--text)]">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a href={site.socials.find((s) => s.icon === 'linkedin')?.href ?? '#'} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5 hover:text-[var(--text)]">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline inline-flex items-center gap-1.5 hover:text-[var(--text)]">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </li>
              <li>
                <a href="#projects" className="link-underline hover:text-[var(--text)]">
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-[var(--text-faint)]">
            © {year} {site.name}. Built with curiosity and code.
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] text-[var(--text-faint)] sm:inline-flex sm:items-center sm:gap-1">
              <Command className="h-3 w-3" /> K to open command palette
            </span>
            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-all hover:text-[var(--text)]"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
