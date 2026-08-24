import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: 'violet' | 'cyan'
}

/**
 * Minimal interactive "network" visualization — drifting nodes connected by
 * faint lines, gently responding to the pointer. Pure canvas: fast, tiny,
 * and it pauses when the tab is hidden.
 */
function NetworkCanvas({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    let width = 0
    let height = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }

    const COLORS = {
      violet: [167, 139, 250],
      cyan: [34, 211, 238],
    }

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const count = window.innerWidth < 768 ? 30 : 64
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.6,
      hue: Math.random() > 0.55 ? 'violet' : 'cyan',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDist = 110

      for (const p of particles) {
        // Gentle pointer repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 150 && dist > 0.01) {
          const force = (150 - dist) / 150
          p.vx += (dx / dist) * force * 0.02
          p.vy += (dy / dist) * force * 0.02
        }

        p.x += p.vx
        p.y += p.vy
        // Friction keeps motion calm
        p.vx *= 0.995
        p.vy *= 0.995

        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        const [r, g, b] = COLORS[p.hue]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.28
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        raf = requestAnimationFrame(loop)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    if (reduced) {
      draw() // static frame only
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
}

/* ---------------------------------------------------------------------- */

const TERMINAL_LINES = [
  { prompt: '$', text: 'whoami' },
  { prompt: '>', text: 'Desire — CS student & builder', dim: true },
  { prompt: '$', text: 'cat focus.txt' },
  { prompt: '>', text: 'AI · Web · 3D · Automation', dim: true },
  { prompt: '$', text: 'desire build --ship' },
  { prompt: '>', text: 'products that work ✦', dim: true },
]

/**
 * A small self-typing terminal card. With reduced motion it simply renders
 * all lines at once.
 */
function TerminalCard() {
  const reduced = useReducedMotionPref()

  return (
    <div className="glass pointer-events-none absolute inset-x-4 bottom-4 rounded-xl p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
      {reduced ? (
        TERMINAL_LINES.map((line, i) => (
          <p key={i} className={line.dim ? 'text-[var(--text-faint)]' : 'text-[var(--text-muted)]'}>
            <span className={line.dim ? 'text-emerald-400' : 'text-violet-400'}>{line.prompt}</span>{' '}
            {line.text}
          </p>
        ))
      ) : (
        <Typewriter lines={TERMINAL_LINES} />
      )}
    </div>
  )
}

function Typewriter({ lines }: { lines: typeof TERMINAL_LINES }) {
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    const total = lines.reduce((acc, l) => acc + l.text.length + l.prompt.length + 2, 0)
    let interval: ReturnType<typeof setInterval>
    interval = setInterval(() => {
      setCharCount((c) => {
        if (c >= total) {
          clearInterval(interval)
          return c
        }
        return c + 1
      })
    }, 26)
    return () => clearInterval(interval)
  }, [lines])

  // Derive how many full lines + chars of the current line are visible
  const rendered = []
  let remaining = charCount
  let cursorOnCurrent = false

  for (const line of lines) {
    const lineLen = line.prompt.length + 2 + line.text.length
    if (remaining >= lineLen) {
      rendered.push({ line, full: true, visibleChars: line.text.length })
      remaining -= lineLen
    } else {
      const visible = Math.min(remaining, line.text.length)
      rendered.push({ line, full: false, visibleChars: Math.max(0, visible) })
      cursorOnCurrent = remaining > 0
      remaining = 0
    }
  }

  return (
    <div>
      {rendered.map((r, i) => (
        <p key={i} className={r.line.dim ? 'text-[var(--text-faint)]' : 'text-[var(--text-muted)]'}>
          <span className={r.line.dim ? 'text-emerald-400' : 'text-violet-400'}>
            {r.line.prompt}
          </span>{' '}
          {r.line.text.slice(0, r.visibleChars)}
          {i === rendered.length - 1 && (!r.full || cursorOnCurrent) && (
            <span className="animate-pulse-soft text-cyan-400">▍</span>
          )}
        </p>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------------- */

function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function HeroVisual() {
  const reduced = useReducedMotionPref()

  return (
    <div className="relative" aria-hidden>
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-card">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-faint)]">developer.ts</span>
          <span className="chip !py-0.5 !text-[10px]">● building</span>
        </div>

        {/* Canvas stage */}
        <div className="relative h-[340px] sm:h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-400/[0.07]" />
          <NetworkCanvas reduced={reduced} />
          <TerminalCard />
        </div>
      </div>

      {/* Floating accent chips */}
      <div className="glass absolute -left-4 top-16 hidden animate-float-slow rounded-xl px-3 py-2 font-mono text-[11px] text-[var(--text-muted)] sm:block">
        <span className="text-violet-400">◍</span> AI · CV · 3D
      </div>
      <div
        className="glass absolute -right-3 bottom-24 hidden animate-float-slow rounded-xl px-3 py-2 font-mono text-[11px] text-[var(--text-muted)] sm:block"
        style={{ animationDelay: '-4s' }}
      >
        <span className="text-cyan-400">→</span> shipping since 2021
      </div>
    </div>
  )
}
