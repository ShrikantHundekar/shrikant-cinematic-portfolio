import { useEffect, useRef } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  Clapperboard,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  RotateCcw,
  RotateCw,
  Server,
  Telescope,
  type LucideIcon,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type Accent = 'cyan' | 'blue' | 'violet'

interface CaseFile {
  id: string
  fileNumber: string
  title: string
  subtitle: string
  icon: LucideIcon
  description: string
  technologies: string[]
  evidence: string[]
  accent: Accent
  actions?: Array<{
    label: string
    href: string
    icon: LucideIcon
  }>
}

const caseFiles: CaseFile[] = [
  {
    id: 'education',
    fileNumber: '01',
    title: 'Academic Journey',
    subtitle: 'Trinity College · B.E. IT · 2022–2026',
    icon: GraduationCap,
    description:
      'Pursuing B.E. in Information Technology at Trinity College of Engineering and Research, Pune with a CGPA of 7.61. Scored 86.60% distinction in Higher Secondary (HSC) at B.H. Chate Jr College, and 68% in SSC at SNBP International School.',
    technologies: ['B.E. IT (CGPA: 7.61)', 'HSC: 86.60% Distinction', 'Algorithms & Data Structures', 'Databases & Web'],
    evidence: ['Engineering fundamentals', 'Database modeling & SQL', 'Practical system architecture'],
    accent: 'cyan',
    actions: [
      { label: 'Download Resume', href: '/resume.pdf', icon: ArrowUpRight },
    ],
  },
  {
    id: 'frontend-intern',
    fileNumber: '02',
    title: 'Frontend Intern',
    subtitle: 'Devine Tech Solutions · Dec 2024–Jan 2025',
    icon: Code2,
    description:
      'Developed responsive frontend interfaces for a commercial travel website using HTML, CSS, JavaScript, and React.js. Created reusable UI components, structured layouts, and fluid navigation sections.',
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    evidence: ['Reusable UI components', 'Mobile-first responsive architecture', 'Cross-browser consistency'],
    accent: 'blue',
    actions: [
      { label: 'GitHub', href: 'https://github.com/ShrikantHundekar', icon: Github },
    ],
  },
  {
    id: 'ai-career',
    fileNumber: '03',
    title: 'AI Career Platform',
    subtitle: 'FastAPI + Google Gemini API + React',
    icon: Server,
    description:
      'Engineered an AI-powered platform to match job seekers with opportunities using scoring algorithms and AI embeddings. Implemented automated resume parsing using PyMuPDF and Google Gemini API with role-based JWT auth.',
    technologies: ['Python', 'FastAPI', 'Google Gemini API', 'PyMuPDF', 'PostgreSQL', 'Redis', 'React.js'],
    evidence: ['PyMuPDF + Gemini AI parsing pipeline', 'Role-based JWT authentication', 'Recruiter Kanban dashboard'],
    accent: 'cyan',
    actions: [
      { label: 'GitHub', href: 'https://github.com/ShrikantHundekar', icon: Github },
      { label: 'Explore Details', href: '#contact', icon: ExternalLink },
    ],
  },
  {
    id: 'task-management',
    fileNumber: '04',
    title: 'Task Management System',
    subtitle: 'Django REST Framework + React Full-Stack',
    icon: Briefcase,
    description:
      'Developed a full-stack task management application using Django, DRF, React.js, and SQL with user authentication, user-specific task isolation, filtering, and status tracking.',
    technologies: ['Python', 'Django', 'Django REST Framework', 'React.js', 'SQL', 'Tailwind CSS'],
    evidence: ['Modular RESTful API design', 'User authentication flow', 'Dynamic task filtering & CRUD'],
    accent: 'violet',
    actions: [
      { label: 'GitHub', href: 'https://github.com/ShrikantHundekar', icon: Github },
      { label: 'Explore Details', href: '#contact', icon: ExternalLink },
    ],
  },
  {
    id: 'certifications',
    fileNumber: '05',
    title: 'Certifications & Skills',
    subtitle: 'Verified Credentials & AI Stack',
    icon: Telescope,
    description:
      'Certified in Python Programming from Naresh IT. Certified in Japanese-Language Proficiency Test (JLPT) N5 Level. Proficient in Python, OOP, Django, FastAPI, SQL, React.js, and exploring Gen-AI with LangChain.',
    technologies: ['Python Certified (Naresh IT)', 'JLPT N5 Japanese', 'LLM / Prompt Engineering', 'LangChain'],
    evidence: ['OOP & Python backend mastery', 'Global language competency', 'Modern AI application design'],
    accent: 'violet',
    actions: [
      { label: 'Download Resume (PDF)', href: '/resume.pdf', icon: ArrowUpRight },
      { label: 'Get in Touch', href: '#contact', icon: ExternalLink },
    ],
  },
]

const particles = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: `${-(index % 8) * 0.48}s`,
  duration: `${5.4 + (index % 7) * 0.58}s`,
  size: `${1 + (index % 3) * 0.8}px`,
}))

export function PathAndEvidence() {
  const rootRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const masterRef = useRef<gsap.core.Timeline | null>(null)
  const activeIndexRef = useRef(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene || reducedMotion) return

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pe-card')
      const progressBars = gsap.utils.toArray<HTMLElement>('.pe-progress-step')
      const counters = gsap.utils.toArray<HTMLElement>('[data-pe-current]')
      const particleLayer = scene.querySelector<HTMLElement>('.pe-particles')
      const finale = scene.querySelector<HTMLElement>('.pe-finale')

      const setActiveCard = (index: number) => {
        if (activeIndexRef.current === index && root.dataset.activeFile) return
        activeIndexRef.current = index
        root.dataset.activeFile = String(index)

        cards.forEach((card, cardIndex) => {
          const isActive = cardIndex === index
          card.classList.toggle('is-active', isActive)
          card.setAttribute('aria-hidden', String(!isActive))
          if ('inert' in card) card.inert = !isActive
        })
        progressBars.forEach((step, stepIndex) => {
          step.classList.toggle('is-current', stepIndex === index)
          step.classList.toggle('is-complete', stepIndex < index)
        })
        counters.forEach((counter) => {
          counter.textContent = String(index + 1).padStart(2, '0')
        })
      }

      cards.forEach((card, index) => {
        gsap.set(card, {
          z: -index * 74,
          y: index * 12,
          scale: 1 - index * 0.035,
          opacity: index < 4 ? 1 - index * 0.16 : 0,
          filter: `blur(${index * 1.3}px)`,
          zIndex: caseFiles.length - index,
          transformOrigin: '50% 50%',
        })
      })
      gsap.set('.pe-card-back .pe-back-reveal', { y: 18, opacity: 0 })
      gsap.set(finale, { opacity: 0, y: 20 })
      setActiveCard(0)

      const master = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * (caseFiles.length * 1.35 + 1.2)}`,
          scrub: 0.85,
          pin: scene,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const narrativeProgress = Math.min(progress / 0.82, 0.999)
            const index = Math.min(Math.floor(narrativeProgress * caseFiles.length), caseFiles.length - 1)
            if (index !== activeIndexRef.current) setActiveCard(index)
          },
        },
      })
      masterRef.current = master

      caseFiles.forEach((_, index) => {
        const card = cards[index]
        const label = `file-${index}`
        master.addLabel(label)

        const remainingCards = cards.slice(index + 1)

        // 3D Arc Flip with dynamic elevation to prevent clipping with deck
        master
          .to(card, {
            z: 160,
            scale: 1.04,
            rotationZ: -3,
            duration: 0.38,
            ease: 'power2.out',
          }, label)
          .to(card, {
            rotationY: 180,
            duration: 0.76,
            ease: 'power3.inOut',
          }, label)
          .to(card, {
            z: 10,
            scale: 1.0,
            rotationZ: 0,
            duration: 0.38,
            ease: 'power2.in',
          }, `${label}+=0.38`)
          // Recess background cards slightly during active flip to eliminate any 3D z-depth clipping
          .to(remainingCards, {
            z: (i) => -(i + 1) * 95 - 40,
            duration: 0.38,
            ease: 'power2.out',
          }, label)
          .to(remainingCards, {
            z: (i) => -(i + 1) * 74,
            duration: 0.38,
            ease: 'power2.in',
          }, `${label}+=0.38`)
          // Dynamic edge shine sweep
          .fromTo(
            card.querySelector('.pe-edge-light'),
            { xPercent: -130, opacity: 0 },
            { xPercent: 130, opacity: 1, duration: 0.76, ease: 'power2.inOut' },
            label,
          )
          // Staggered reveal of back content
          .to(
            card.querySelectorAll('.pe-back-reveal'),
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.32, ease: 'power2.out' },
            `${label}+=0.42`,
          )
          // Ambient particle flare
          .fromTo(
            particleLayer,
            { scale: 1, filter: 'brightness(1)' },
            { scale: 1.04, filter: 'brightness(1.6)', duration: 0.25, yoyo: true, repeat: 1 },
            `${label}+=0.25`,
          )
          // Generous DWELL window: hold the flipped card in front so the user can comfortably read it!
          .to({}, { duration: 0.75 }, `${label}+=0.76`)

        // Dismissal to make room for next card
        if (index < cards.length - 1) {
          const dismissLabel = `dismiss-${index}`
          master.addLabel(dismissLabel)
          master
            // Elegant slide-away out of frame like a dealt dossier
            .to(card, {
              xPercent: -115,
              yPercent: -8,
              rotationZ: -10,
              scale: 0.85,
              opacity: 0,
              filter: 'blur(8px)',
              duration: 0.48,
              ease: 'power2.in',
            }, dismissLabel)
            // Bring next card to front
            .to(
              cards.slice(index + 1),
              {
                z: (stackIndex) => -(stackIndex) * 74,
                y: (stackIndex) => stackIndex * 12,
                scale: (stackIndex) => 1 - stackIndex * 0.035,
                opacity: (stackIndex) => stackIndex < 4 ? 1 - stackIndex * 0.16 : 0,
                filter: (stackIndex) => `blur(${stackIndex * 1.3}px)`,
                duration: 0.48,
                ease: 'power3.out',
              },
              dismissLabel,
            )
        } else {
          // Final card dwell before transmission finale
          master.to({}, { duration: 0.5 })
        }
      })

      master.addLabel('finale')
      master
        .to(cards, {
          xPercent: 0,
          yPercent: 0,
          x: (index) => (index - 2) * Math.min(window.innerWidth * 0.16, 190),
          y: (index) => -80 - Math.abs(index - 2) * 32,
          rotationZ: (index) => (index - 2) * 8,
          rotationY: (index) => 180 + (index - 2) * 8,
          z: (index) => -Math.abs(index - 2) * 45,
          scale: 0.78,
          opacity: 0.72,
          filter: 'blur(1px)',
          stagger: 0.035,
          duration: 0.55,
          ease: 'power3.out',
        }, 'finale')
        .to(cards, {
          y: -window.innerHeight * 0.48,
          scale: 0.42,
          opacity: 0,
          filter: 'blur(14px)',
          stagger: 0.025,
          duration: 0.5,
          ease: 'power2.in',
        })
        .to('.pe-particle', {
          x: () => gsap.utils.random(-160, 160),
          y: () => gsap.utils.random(-window.innerHeight * 0.52, -100),
          scale: () => gsap.utils.random(1.5, 4),
          opacity: 0,
          stagger: { amount: 0.32, from: 'random' },
          duration: 0.62,
          ease: 'power2.in',
        }, '<')
        .to('.pe-copy, .pe-progress, .pe-scroll-cue', { opacity: 0, y: -20, duration: 0.3 }, '<')
        .to(finale, { opacity: 1, y: 0, duration: 0.36, ease: 'power2.out' }, '-=0.2')
        .to(finale, { opacity: 0, y: -30, duration: 0.32 }, '+=0.18')
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  const handleFlipClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const master = masterRef.current
    if (!master || !master.scrollTrigger) return
    const st = master.scrollTrigger
    const label = `file-${index}`
    const labelTime = master.labels[label] ?? 0
    const currentTime = master.time()
    // If currently already near or in flipped dwell, scroll to unflip (start of card)
    const isCurrentlyFlipped = currentTime >= labelTime + 0.5 && currentTime <= labelTime + 1.45
    const targetTime = isCurrentlyFlipped ? Math.max(0, labelTime - 0.05) : labelTime + 0.85
    const totalDuration = master.totalDuration()
    const targetScroll = st.start + (targetTime / totalDuration) * (st.end - st.start)
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  const handleCardClick = (index: number, e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    handleFlipClick(index, e)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return
    const card = stackRef.current?.querySelector<HTMLElement>(`.pe-card[data-index="${activeIndexRef.current}"]`)
    if (!card) return
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    const isFlipped = (gsap.getProperty(card, 'rotationY') as number) >= 90
    const tiltMultiplier = isFlipped ? -1 : 1

    card.style.setProperty('--pe-tilt-x', `${-y * 5.5}deg`)
    card.style.setProperty('--pe-tilt-y', `${x * 7 * tiltMultiplier}deg`)
    card.style.setProperty('--pe-pointer-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--pe-pointer-y', `${(y + 0.5) * 100}%`)
  }

  const handlePointerLeave = () => {
    const card = stackRef.current?.querySelector<HTMLElement>(`.pe-card[data-index="${activeIndexRef.current}"]`)
    card?.style.setProperty('--pe-tilt-x', '0deg')
    card?.style.setProperty('--pe-tilt-y', '0deg')
  }

  const handleMagneticMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - (bounds.left + bounds.width / 2)
    const y = event.clientY - (bounds.top + bounds.height / 2)
    gsap.to(event.currentTarget, { x: x * 0.18, y: y * 0.22, duration: 0.28, ease: 'power2.out', overwrite: true })
  }

  const resetMagnetic = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, .45)', overwrite: true })
  }

  return (
    <section className="pe-shell" id="experience" ref={rootRef} aria-labelledby="pe-title">
      <div id="path" style={{ position: 'absolute', top: 0, height: 1, width: 1, pointerEvents: 'none' }} />
      <div id="path-and-evidence" style={{ position: 'absolute', top: 0, height: 1, width: 1, pointerEvents: 'none' }} />
      <div
        className="pe-scene"
        ref={sceneRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="pe-atmosphere" aria-hidden="true">
          <div className="pe-orbit pe-orbit-a" />
          <div className="pe-orbit pe-orbit-b" />
          <div className="pe-beam" />
          <div className="pe-particles">
            {particles.map((particle, index) => (
              <span
                className="pe-particle"
                key={index}
                style={{
                  '--pe-left': particle.left,
                  '--pe-top': particle.top,
                  '--pe-delay': particle.delay,
                  '--pe-duration': particle.duration,
                  '--pe-size': particle.size,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <header className="pe-copy">
          <p className="pe-kicker"><span>Journey &amp; Projects</span><span>Education · Internships · Builds</span></p>
          <h2 className="pe-heading" id="pe-title">Every build leaves <em>evidence.</em></h2>
        </header>

        <div className="pe-stack" ref={stackRef}>
          {caseFiles.map((file, index) => {
            const Icon = file.icon
            return (
              <article
                className={`pe-card pe-accent-${file.accent}`}
                data-index={index}
                key={file.id}
                onClick={(e) => handleCardClick(index, e)}
                aria-label={`${file.fileNumber}: ${file.title}`}
              >
                <div className="pe-card-inner">
                  <div className="pe-edge-light" aria-hidden="true" />
                  <div className="pe-card-rim" aria-hidden="true" />

                  <div className="pe-face pe-card-front">
                    <div className="pe-file-bar">
                      <span>Case file / {file.fileNumber}</span>
                      <span className="pe-clearance"><i /> Clearance granted</span>
                    </div>
                    <div className="pe-front-main">
                      <div className="pe-icon-shell"><Icon size={42} strokeWidth={1.25} /></div>
                      <p className="pe-front-eyebrow">{file.subtitle}</p>
                      <h3 className="pe-card-title">{file.title}</h3>
                    </div>
                    <div className="pe-front-footer">
                      <button
                        type="button"
                        className="pe-flip-prompt-btn"
                        onClick={(e) => handleFlipClick(index, e)}
                        aria-label="Click to decrypt evidence"
                      >
                        <RotateCw size={13} className="pe-flip-spin-icon" />
                        <span>Click or scroll to decrypt</span>
                      </button>
                      <span
                        className="pe-decrypt-mark"
                        onClick={(e) => handleFlipClick(index, e)}
                        title="Click to flip card"
                      >
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>

                  <div className="pe-face pe-card-back">
                    <div className="pe-file-bar pe-back-reveal">
                      <div className="flex items-center gap-2">
                        <span>Evidence / {file.fileNumber}</span>
                        <span className="pe-verified-pill">Verified record</span>
                      </div>
                      <button
                        type="button"
                        className="pe-flip-back-btn"
                        onClick={(e) => handleFlipClick(index, e)}
                        aria-label="Flip back to front"
                      >
                        <RotateCcw size={12} />
                        <span>Flip to overview</span>
                      </button>
                    </div>
                    <div className="pe-back-content">
                      <div className="pe-back-heading pe-back-reveal">
                        <p>{file.subtitle}</p>
                        <h3>{file.title}</h3>
                      </div>
                      <p className="pe-description pe-back-reveal">{file.description}</p>

                      <div className="pe-back-grid">
                        <div className="pe-back-reveal">
                          <span className="pe-data-label">Technology stack</span>
                          <div className="pe-tech-list">
                            {file.technologies.map((technology, technologyIndex) => (
                              <span style={{ '--pe-badge-delay': `${technologyIndex * -0.5}s` } as CSSProperties} key={technology}>
                                {technology}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pe-back-reveal">
                          <span className="pe-data-label">Evidence logged</span>
                          <ul className="pe-evidence-list">
                            {file.evidence.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {file.actions && (
                      <div className="pe-actions pe-back-reveal">
                        {file.actions.map((action) => {
                          const ActionIcon = action.icon
                          return (
                            <a
                              className="pe-action"
                              href={action.href}
                              key={action.label}
                              onPointerMove={handleMagneticMove}
                              onPointerLeave={resetMagnetic}
                              aria-label={`${action.label} for ${file.title}`}
                            >
                              <ActionIcon size={16} />
                              <span>{action.label}</span>
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="pe-progress" aria-label="Case file progress">
          <span className="pe-progress-count"><b data-pe-current>01</b> / 05</span>
          <div className="pe-progress-track">
            {caseFiles.map((file) => <i className="pe-progress-step" key={file.id} />)}
          </div>
        </div>

        <div className="pe-scroll-cue" aria-hidden="true"><span /> Scroll to open file</div>
        <div className="pe-finale" aria-hidden="true"><span>Transmission complete</span> Contact signal acquired</div>
      </div>
    </section>
  )
}
