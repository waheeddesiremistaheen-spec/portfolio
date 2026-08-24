import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { site } from '../data/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { cn } from '../lib/utils'

type FormState = 'idle' | 'sending' | 'success' | 'error' | 'network-error'

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

export function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (state === 'sending') return

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !emailOk) {
      setState('error')
      return
    }
    setState('sending')

    try {
      if (site.contactEndpoint) {
        // Real endpoint (e.g. Formspree) — no keys required, just the endpoint URL.
        const res = await fetch(site.contactEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        // Fallback: open the visitor's mail client with the message pre-filled.
        await new Promise((r) => setTimeout(r, 900)) // brief "sending" moment
        const subject = encodeURIComponent(form.subject || `Message from ${form.name}`)
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      }
      setState('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setState('network-error')
    }
  }

  const inputClass = (error: boolean) =>
    cn(
      'w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/40',
      error ? 'border-rose-400/60' : 'border-[var(--border)] hover:border-[color-mix(in_srgb,var(--text-muted)_35%,transparent)]'
    )

  return (
    <section id="contact" className="section-shell">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: pitch + socials */}
          <div>
            <SectionHeading
              eyebrow="08 · Contact"
              title={
                <>
                  Have an idea? <span className="text-gradient">Let's build it.</span>
                </>
              }
              description="Whether you're looking for a developer, want to collaborate, or simply want to talk about technology — I'd love to hear from you."
            />

            <Reveal delay={0.1}>
              <div className="space-y-3">
                <a
                  href={`mailto:${site.email}`}
                  className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-violet-400/35"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                      Email
                    </span>
                    <span className="text-sm font-medium text-[var(--text)] group-hover:text-violet-400">
                      {site.email}
                    </span>
                  </span>
                </a>

                {site.socials
                  .filter((s) => s.icon !== 'mail' && s.icon !== 'external')
                  .map((social) => {
                    const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS]
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-violet-400/35"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors group-hover:text-violet-400">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                            Social
                          </span>
                          <span className="text-sm font-medium text-[var(--text)] group-hover:text-violet-400">
                            {social.label}
                          </span>
                        </span>
                      </a>
                    )
                  })}

                <p className="pt-2 font-mono text-xs text-[var(--text-faint)]">
                  Based: {site.location} — usually online.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={update('name')}
                    className={inputClass(state === 'error' && !form.name.trim())}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="ada@example.com"
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass(
                      state === 'error' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                    )}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-subject" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Let's build something"
                  value={form.subject}
                  onChange={update('subject')}
                  className={inputClass(false)}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell me about your idea…"
                  value={form.message}
                  onChange={update('message')}
                  className={cn(inputClass(state === 'error' && !form.message.trim()), 'resize-none')}
                />
              </div>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-7 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.55)] transition-all duration-300 hover:brightness-110 active:scale-[0.97]',
                    state === 'sending' && 'cursor-wait opacity-80'
                  )}
                >
                  {state === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                {/* Status */}
                <AnimatePresence mode="wait">
                  {state === 'success' && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      className="inline-flex items-center gap-2 text-sm text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Message ready — thanks for reaching out!
                    </motion.p>
                  )}
                  {state === 'error' && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="alert"
                      className="inline-flex items-center gap-2 text-sm text-rose-400"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Please fill in your name, a valid email and a message.
                    </motion.p>
                  )}
                  {state === 'network-error' && (
                    <motion.p
                      key="network"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="alert"
                      className="inline-flex items-center gap-2 text-sm text-rose-400"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Something went wrong sending — please try again or email me directly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <p className="mt-5 font-mono text-[10px] leading-relaxed text-[var(--text-faint)]">
                // No tracking, no spam. Your message opens in your mail client — or goes through
                the configured endpoint.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
