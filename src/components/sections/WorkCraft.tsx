import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import { Github, ExternalLink, Sparkles, CheckCircle2, Bot, Layers, Layout, BarChart3, Terminal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { workCraft, type WorkCraftSlide } from '@/data/workcraft'

gsap.registerPlugin(ScrollTrigger)

function AestheticSlideCard({ slide }: { slide: WorkCraftSlide }) {
  const accent = slide.accent

  // Customized aesthetic mockup content based on project
  if (slide.number === '01') {
    return (
      <div className="wc-mockup wc-mockup-ai">
        <div className="wc-mockup-header">
          <div className="wc-mockup-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="wc-mockup-title">
            <Sparkles size={13} style={{ color: accent }} />
            <span>Gemini AI Career Engine</span>
          </div>
          <span className="wc-status-pill" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>
            Active
          </span>
        </div>

        <div className="wc-mockup-body">
          <div className="wc-ai-score-row">
            <div className="wc-score-circle" style={{ borderColor: accent, boxShadow: `0 0 25px ${accent}40` }}>
              <span className="score-val">98%</span>
              <span className="score-lbl">Match</span>
            </div>
            <div className="wc-ai-score-meta">
              <strong className="text-white text-sm">Role: Python / AI Engineer</strong>
              <p className="text-xs text-slate-300">PyMuPDF automated extraction verified 16 required skills</p>
              <div className="wc-chip-row">
                <span className="wc-mini-chip" style={{ color: accent }}>FastAPI</span>
                <span className="wc-mini-chip">Gemini API</span>
                <span className="wc-mini-chip">PostgreSQL</span>
              </div>
            </div>
          </div>

          <div className="wc-kanban-preview">
            <div className="wc-kanban-col">
              <span className="wc-col-header">Resume Parsed</span>
              <div className="wc-card-item">
                <span className="item-title">Shrikant Hundekar</span>
                <span className="item-sub">B.E. IT · CGPA 7.61</span>
              </div>
            </div>
            <div className="wc-kanban-col active" style={{ borderColor: `${accent}50` }}>
              <span className="wc-col-header" style={{ color: accent }}>Match Analysis</span>
              <div className="wc-card-item highlight" style={{ background: `${accent}15`, borderColor: `${accent}35` }}>
                <span className="item-badge" style={{ color: accent }}>Skill Fit: High</span>
                <span className="item-title">Recruiter Kanban Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slide.number === '02') {
    return (
      <div className="wc-mockup wc-mockup-tasks">
        <div className="wc-mockup-header">
          <div className="wc-mockup-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="wc-mockup-title">
            <Terminal size={13} style={{ color: accent }} />
            <span>Django REST Framework</span>
          </div>
          <span className="wc-status-pill" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>
            v2.4 Live
          </span>
        </div>

        <div className="wc-mockup-body">
          <div className="wc-task-stats">
            <div className="task-stat-box">
              <span className="stat-num" style={{ color: accent }}>100%</span>
              <span className="stat-lbl">CRUD Coverage</span>
            </div>
            <div className="task-stat-box">
              <span className="stat-num">JWT</span>
              <span className="stat-lbl">Role Auth</span>
            </div>
            <div className="task-stat-box">
              <span className="stat-num">Fast</span>
              <span className="stat-lbl">REST API</span>
            </div>
          </div>

          <div className="wc-tasks-list">
            <div className="wc-task-row done">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>User Authentication & Session Management</span>
              <span className="wc-tag-mini text-emerald-300">Complete</span>
            </div>
            <div className="wc-task-row current" style={{ borderColor: `${accent}60`, background: `${accent}12` }}>
              <span className="pulse-dot" style={{ background: accent }} />
              <span>User-Specific Task Filtering & Status Tracker</span>
              <span className="wc-tag-mini" style={{ color: accent }}>In Progress</span>
            </div>
            <div className="wc-task-row">
              <span className="pulse-dot bg-slate-500" />
              <span>PostgreSQL Production Query Optimization</span>
              <span className="wc-tag-mini text-slate-400">Queue</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slide.number === '03') {
    return (
      <div className="wc-mockup wc-mockup-travel">
        <div className="wc-mockup-header">
          <div className="wc-mockup-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="wc-mockup-title">
            <Layout size={13} style={{ color: accent }} />
            <span>Devine Tech Solutions · Travel UI</span>
          </div>
          <span className="wc-status-pill" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>
            Production
          </span>
        </div>

        <div className="wc-mockup-body">
          <div className="wc-travel-hero-card" style={{ border: `1px solid ${accent}40` }}>
            <div className="wc-travel-overlay" style={{ background: `linear-gradient(135deg, ${accent}30, transparent 70%)` }} />
            <div className="wc-travel-content">
              <span className="wc-travel-badge" style={{ background: accent, color: '#040b11' }}>
                Featured Portal
              </span>
              <h4 className="wc-travel-heading">Curated Global Journeys</h4>
              <p className="wc-travel-sub">Modular React.js UI Components & Responsive Architecture</p>
            </div>
          </div>

          <div className="wc-travel-grid">
            <div className="wc-travel-metric">
              <span className="metric-val" style={{ color: accent }}>★ 4.9</span>
              <span className="metric-lbl">User Usability</span>
            </div>
            <div className="wc-travel-metric">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Responsive</span>
            </div>
            <div className="wc-travel-metric">
              <span className="metric-val">React</span>
              <span className="metric-lbl">Componentized</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slide.number === '04') {
    return (
      <div className="wc-mockup wc-mockup-analytics">
        <div className="wc-mockup-header">
          <div className="wc-mockup-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="wc-mockup-title">
            <BarChart3 size={13} style={{ color: accent }} />
            <span>Pandas & NumPy Scientific Stack</span>
          </div>
          <span className="wc-status-pill" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>
            96.8% Acc.
          </span>
        </div>

        <div className="wc-mockup-body">
          <div className="wc-chart-area">
            <div className="wc-chart-bars">
              {[45, 65, 85, 55, 92, 78, 98, 84].map((height, i) => (
                <div key={i} className="wc-bar-col">
                  <div
                    className="wc-bar-fill"
                    style={{
                      height: `${height}%`,
                      background: i % 2 === 0 ? accent : 'rgba(255,255,255,0.3)',
                      boxShadow: i === 6 ? `0 0 15px ${accent}` : 'none',
                    }}
                  />
                  <span className="wc-bar-lbl">{`T${i + 1}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="wc-analytics-tags">
            <div className="wc-ana-item">
              <span className="ana-dot" style={{ background: accent }} />
              <span>Feature Engineering</span>
            </div>
            <div className="wc-ana-item">
              <span className="ana-dot bg-blue-400" />
              <span>Data Preprocessing</span>
            </div>
            <div className="wc-ana-item">
              <span className="ana-dot bg-violet-400" />
              <span>Statistical Inference</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Slide 05 - GenAI & Architecture
  return (
    <div className="wc-mockup wc-mockup-genai">
      <div className="wc-mockup-header">
        <div className="wc-mockup-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="wc-mockup-title">
          <Bot size={13} style={{ color: accent }} />
          <span>LLM & Agentic Pipeline</span>
        </div>
        <span className="wc-status-pill" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>
          Ready
        </span>
      </div>

      <div className="wc-mockup-body">
        <div className="wc-pipeline-flow">
          <div className="wc-flow-step">
            <span className="step-num">01</span>
            <span className="step-name">Prompt Eng.</span>
          </div>
          <div className="wc-flow-arrow" style={{ color: accent }}>→</div>
          <div className="wc-flow-step active" style={{ borderColor: accent, background: `${accent}15` }}>
            <span className="step-num" style={{ color: accent }}>02</span>
            <span className="step-name">LangChain / Gemini</span>
          </div>
          <div className="wc-flow-arrow" style={{ color: accent }}>→</div>
          <div className="wc-flow-step">
            <span className="step-num">03</span>
            <span className="step-name">API Action</span>
          </div>
        </div>

        <div className="wc-terminal-box">
          <div className="terminal-line"><span style={{ color: accent }}>$</span> python agent_runner.py --gemini</div>
          <div className="terminal-line text-slate-400">&gt; Vector embedding initialized...</div>
          <div className="terminal-line text-emerald-400">&gt; Task complete: 0 errors, latency: 180ms</div>
        </div>
      </div>
    </div>
  )
}

export function WorkCraft() {
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const slides = useMemo(() => workCraft, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return

    const context = gsap.context(() => {
      const getAmount = () => Math.max(1, track.scrollWidth - window.innerWidth)
      const horizontalTween = gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getAmount()}`,
          scrub: 1.05,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('.wc-slide').forEach((slide) => {
        const clip = slide.querySelector<HTMLElement>('.wc-clip')
        const title = slide.querySelector<HTMLElement>('.wc-title')
        const words = slide.querySelectorAll<HTMLElement>('.wc-word')
        const card = slide.querySelector<HTMLElement>('.wc-card')
        const num = slide.querySelector<HTMLElement>('.wc-num')
        const meta = slide.querySelector<HTMLElement>('.wc-meta')
        const halo = slide.querySelector<HTMLElement>('.wc-halo')
        const decor = slide.querySelector<HTMLElement>('.wc-decor')

        const enter = gsap.timeline({ paused: true })
        if (clip) enter.fromTo(clip, { yPercent: 110, skewY: 2 }, { yPercent: 0, skewY: 0, duration: 1.0, ease: 'power3.out' }, 0)
        if (num) enter.from(num, { opacity: 0, x: 40, duration: 0.7, ease: 'power2.out' }, 0.1)
        if (title) enter.fromTo(title, { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.12)
        if (words.length) enter.from(words, { y: 24, opacity: 0, rotate: 1.5, duration: 0.55, stagger: 0.05, ease: 'power2.out' }, 0.28)
        if (card) enter.from(card, { opacity: 0, y: 80, scale: 0.94, duration: 0.95, ease: 'power3.out' }, 0.3)
        if (meta) enter.from(meta, { opacity: 0, y: 20, duration: 0.65, ease: 'power2.out' }, 0.4)

        ScrollTrigger.create({
          trigger: slide,
          start: 'left center',
          end: 'right center',
          onToggle: (st) => {
            if (st.isActive) enter.restart()
          },
        })

        if (halo) {
          gsap.fromTo(halo, { opacity: 0.1 }, { opacity: 0.55, ease: 'none', scrollTrigger: { trigger: slide, start: 'left center', end: 'right center', scrub: 1.2 } })
        }
        if (decor) {
          gsap.fromTo(decor, { xPercent: -10, opacity: 0.4 }, { xPercent: 10, opacity: 1, ease: 'none', scrollTrigger: { trigger: slide, start: 'left right', end: 'right left', scrub: 1.2 } })
        }
      })

      gsap.fromTo(
        '.wc-streak',
        { xPercent: -60, opacity: 0.4 },
        {
          xPercent: 120,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: track, start: 'left right', end: 'right left', scrub: 1.1 },
        },
      )
      void horizontalTween
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.wc-card')
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (reducedMotion || !media.matches) return

    const cleanups: Array<() => void> = []
    cards.forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power2.out' })
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power2.out' })
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        rx((0.5 - py) * 9)
        ry((px - 0.5) * 12)
        card.style.setProperty('--mouse-x', `${px * 100}%`)
        card.style.setProperty('--mouse-y', `${py * 100}%`)
      }
      const onLeave = () => {
        rx(0)
        ry(0)
      }
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
      })
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [reducedMotion])

  return (
    <section id="work" className="wc-shell" ref={rootRef} aria-label="Work craft — featured projects">
      {/* Anchor alias for #projects */}
      <div id="projects" style={{ position: 'absolute', top: 0, height: 1, width: 1, pointerEvents: 'none' }} />

      <div className="wc-topbar">
        <span className="wc-topbar-kicker">Featured Projects & Craft</span>
        <span className="wc-topbar-hint">Horizontal Journey · Scroll to advance →</span>
      </div>

      <div className="wc-track" ref={trackRef}>
        {slides.map((slide, index) => {
          const accent = slide.accent
          return (
            <article className="wc-slide" key={slide.number} data-slide={slide.number}>
              <div className="wc-halo" style={{ '--halo': slide.glow } as CSSProperties} aria-hidden="true" />
              <div className="wc-decor" aria-hidden="true">
                <span className="wc-blob wc-blob-a" style={{ background: slide.glow }} />
                <span className="wc-blob wc-blob-b" style={{ background: slide.glow }} />
              </div>

              <div className="wc-num" aria-hidden="true">{slide.number}</div>

              <div className="wc-copy">
                <div className="wc-meta">
                  <div className="flex items-center gap-2">
                    <span className="wc-kicker">{slide.kicker}</span>
                    {slide.badge && (
                      <span className="wc-badge-highlight" style={{ color: accent, borderColor: `${accent}40` }}>
                        {slide.badge}
                      </span>
                    )}
                  </div>
                  <span className="wc-slide-count">{index + 1} <i>/</i> {slides.length}</span>
                </div>

                <h2 className="wc-title" aria-label={slide.title}>
                  {slide.title.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex} className="wc-word" aria-hidden="true">
                      {word}
                      {wordIndex < slide.title.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </h2>

                <p className="wc-description">{slide.description}</p>

                {slide.highlights && (
                  <div className="wc-highlights-list">
                    {slide.highlights.map((h, i) => (
                      <div key={i} className="wc-highlight-item">
                        <CheckCircle2 size={13} style={{ color: accent }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="wc-tech">
                  {slide.technologies.map((tech) => (
                    <span key={tech} className="wc-tech-badge" style={{ '--badge-accent': accent } as CSSProperties}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="wc-actions">
                  <a href={slide.github} target="_blank" rel="noreferrer" className="wc-btn wc-btn-ghost">
                    <Github size={15} /> Source Code
                  </a>
                  <a href={slide.demo} className="wc-btn wc-btn-solid" style={{ '--btn-accent': accent } as CSSProperties}>
                    Project Details <ExternalLink size={15} />
                  </a>
                </div>
              </div>

              <div className="wc-clip">
                <div className="wc-card" style={{ '--card-accent': accent, '--card-glow': slide.glow } as CSSProperties}>
                  <AestheticSlideCard slide={slide} />
                  <div className="wc-card-sheen" aria-hidden="true" />
                </div>
              </div>
            </article>
          )
        })}
        <div className="wc-streak" aria-hidden="true" />
      </div>
    </section>
  )
}
