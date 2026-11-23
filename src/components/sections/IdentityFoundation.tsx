import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { portfolio } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

interface DiceFaceData {
  id: string
  faceNumber: number
  pipSymbol: string
  label: string
  badge: string
  title: string
  subtitle: string
  detail: string
  accent: string
}

const DICE_FACES: DiceFaceData[] = [
  {
    id: 'who',
    faceNumber: 1,
    pipSymbol: '⚀',
    label: '01 / Who I Am',
    badge: 'Python Developer',
    title: portfolio.person.name,
    subtitle: 'Python Developer & Full-Stack Builder',
    detail: 'Based in Pune, India · Focused on clean OOP architecture, scalable REST APIs, and production AI integrations.',
    accent: '#38f8d4',
  },
  {
    id: 'edu',
    faceNumber: 2,
    pipSymbol: '⚁',
    label: '02 / Education',
    badge: 'B.E. IT · CGPA 7.61',
    title: 'Trinity College, Pune',
    subtitle: 'B.E. Information Technology (2022 – 2026)',
    detail: 'Class 12th HSC: 86.60% (Distinction) at Chate Jr College · SSC: 68% at SNBP International School.',
    accent: '#4d7cff',
  },
  {
    id: 'exp',
    faceNumber: 3,
    pipSymbol: '⚂',
    label: '03 / Experience',
    badge: 'Frontend Intern',
    title: 'Devine Tech Solutions',
    subtitle: 'Travel Web App · Dec 2024 – Jan 2025 (Pune)',
    detail: 'Built responsive travel web interfaces with React.js, JavaScript, and modular reusable UI components.',
    accent: '#a855f7',
  },
  {
    id: 'certs',
    faceNumber: 4,
    pipSymbol: '⚃',
    label: '04 / Credentials',
    badge: 'Verified Certificates',
    title: 'Python & JLPT N5',
    subtitle: 'Naresh IT Certified & Japanese Language',
    detail: 'Certified in Python Programming from Naresh IT · JLPT N5 Certified · LLM Fundamentals & Prompt Engineering.',
    accent: '#38f8d4',
  },
  {
    id: 'stack',
    faceNumber: 5,
    pipSymbol: '⚄',
    label: '05 / Core Arsenal',
    badge: 'Full-Stack & AI',
    title: 'FastAPI · Django · React',
    subtitle: 'PostgreSQL · Redis · REST APIs',
    detail: 'AI Career matching algorithms with Google Gemini API, PyMuPDF parsing, and full-stack system architecture.',
    accent: '#4d7cff',
  },
  {
    id: 'vision',
    faceNumber: 6,
    pipSymbol: '⚅',
    label: '06 / Vision',
    badge: 'Next Chapter',
    title: 'Engineering Scale',
    subtitle: 'High-Throughput & Human Systems',
    detail: 'Curious engineer with strong problem-solving skills, eager to contribute to real-world impactful products.',
    accent: '#ec4899',
  },
]

export function IdentityFoundation() {
  const rootRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const diceCubeRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  const [activeFace, setActiveFace] = useState(1)

  useEffect(() => {
    const root = rootRef.current
    const dice = diceCubeRef.current
    const shadow = shadowRef.current
    if (!root || !dice || !shadow || reducedMotion) return

    const context = gsap.context(() => {
      // Set initial dice position (Face 1 Front)
      gsap.set(dice, { rotateX: 0, rotateY: 0, rotateZ: 0, y: 0 })
      gsap.set(shadow, { scale: 1, opacity: 0.65, filter: 'blur(14px)' })

      /* ------------------------------------------------------------------
       * Rolling Dice Scroll Timeline
       * The dice jumps up and rolls across 3D space on each scroll beat:
       * Beat 1 (Face 1 Front) -> Beat 2 (Face 2 Right) -> Beat 3 (Face 3 Back)
       * -> Beat 4 (Face 4 Left) -> Beat 5 (Face 5 Top) -> Beat 6 (Face 6 Bottom)
       * ------------------------------------------------------------------ */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=450%',
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const face = Math.min(6, Math.max(1, Math.floor(p * 5.99) + 1))
            setActiveFace(face)
          },
        },
      })

      // Roll 1: Face 1 (Front) -> Face 2 (Right)
      // Rotates Y: 0 -> -90
      master.to(dice, { y: -45, rotateZ: -12, duration: 0.15, ease: 'power2.out' }, 0.05)
        .to(shadow, { scale: 0.65, opacity: 0.25, filter: 'blur(28px)', duration: 0.15 }, 0.05)
        .to(dice, { rotateX: 0, rotateY: -90, rotateZ: 0, y: 0, duration: 0.2, ease: 'power3.inOut' }, 0.15)
        .to(shadow, { scale: 1, opacity: 0.65, filter: 'blur(14px)', duration: 0.2 }, 0.15)
        .to({}, { duration: 0.1 }) // pause at Face 2

      // Roll 2: Face 2 (Right) -> Face 3 (Back)
      // Rotates Y: -90 -> -180
      master.to(dice, { y: -45, rotateZ: 10, duration: 0.15, ease: 'power2.out' }, 0.45)
        .to(shadow, { scale: 0.65, opacity: 0.25, filter: 'blur(28px)', duration: 0.15 }, 0.45)
        .to(dice, { rotateX: 0, rotateY: -180, rotateZ: 0, y: 0, duration: 0.2, ease: 'power3.inOut' }, 0.55)
        .to(shadow, { scale: 1, opacity: 0.65, filter: 'blur(14px)', duration: 0.2 }, 0.55)
        .to({}, { duration: 0.1 }) // pause at Face 3

      // Roll 3: Face 3 (Back) -> Face 4 (Left)
      // Rotates Y: -180 -> -270
      master.to(dice, { y: -45, rotateZ: -10, duration: 0.15, ease: 'power2.out' }, 0.85)
        .to(shadow, { scale: 0.65, opacity: 0.25, filter: 'blur(28px)', duration: 0.15 }, 0.85)
        .to(dice, { rotateX: 0, rotateY: -270, rotateZ: 0, y: 0, duration: 0.2, ease: 'power3.inOut' }, 0.95)
        .to(shadow, { scale: 1, opacity: 0.65, filter: 'blur(14px)', duration: 0.2 }, 0.95)
        .to({}, { duration: 0.1 }) // pause at Face 4

      // Roll 4: Face 4 (Left) -> Face 5 (Top)
      // Rolls along X to tilt top face forward: rotateX: -90, rotateY: -360
      master.to(dice, { y: -50, rotateZ: 12, duration: 0.15, ease: 'power2.out' }, 1.25)
        .to(shadow, { scale: 0.6, opacity: 0.2, filter: 'blur(30px)', duration: 0.15 }, 1.25)
        .to(dice, { rotateX: -90, rotateY: -360, rotateZ: 0, y: 0, duration: 0.2, ease: 'power3.inOut' }, 1.35)
        .to(shadow, { scale: 1, opacity: 0.65, filter: 'blur(14px)', duration: 0.2 }, 1.35)
        .to({}, { duration: 0.1 }) // pause at Face 5

      // Roll 5: Face 5 (Top) -> Face 6 (Bottom)
      // Rolls forward down: rotateX: 90, rotateY: -360
      master.to(dice, { y: -55, rotateZ: -14, duration: 0.15, ease: 'power2.out' }, 1.65)
        .to(shadow, { scale: 0.55, opacity: 0.18, filter: 'blur(32px)', duration: 0.15 }, 1.65)
        .to(dice, { rotateX: 90, rotateY: -360, rotateZ: 0, y: 0, duration: 0.22, ease: 'power3.inOut' }, 1.75)
        .to(shadow, { scale: 1.1, opacity: 0.75, filter: 'blur(12px)', duration: 0.22 }, 1.75)
        .to({}, { duration: 0.1 }) // pause at Face 6
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  // Subtle interactive 3D pointer tilt
  useEffect(() => {
    const scene = sceneRef.current
    const dice = diceCubeRef.current
    if (!scene || !dice || reducedMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = scene.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(dice, {
        rotationX: `-=${py * 10}`,
        rotationY: `+=${px * 12}`,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    scene.addEventListener('pointermove', handlePointerMove)
    return () => scene.removeEventListener('pointermove', handlePointerMove)
  }, [reducedMotion])

  // Particle drift background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = 0
    let height = 0
    let raf = 0
    let particles: { x: number; y: number; s: number; a: number; hue: number }[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      const count = Math.min(800, Math.floor((width * height) / 1400))
      particles = Array.from({ length: count }, (_, i) => ({
        x: (i * 97.3) % width,
        y: (i * 53.7) % height,
        s: 0.6 + (i % 5) * 0.35,
        a: 0.12 + (i % 6) * 0.08,
        hue: i % 3 === 0 ? 174 : i % 3 === 1 ? 228 : 263,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += Math.sin((p.y + p.x) * 0.005) * 0.12
        p.y += Math.cos((p.x + p.y) * 0.005) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 88%, 70%, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return (
    <section id="identity" className="if-shell" ref={rootRef} aria-label="Identity Foundation — 3D Rolling Dice">
      {/* Anchor alias for #about */}
      <div id="about" style={{ position: 'absolute', top: 0, height: 1, width: 1, pointerEvents: 'none' }} />

      {/* Topbar with Dice Roll Telemetry */}
      <div className="if-topbar">
        <div className="flex items-center gap-3">
          <span className="if-topbar-kicker">Interactive 3D Dice</span>
          <span className="dice-telemetry-badge">
            <span className="dice-live-pip">{DICE_FACES[activeFace - 1]?.pipSymbol}</span>
            <span>Face 0{activeFace} / 06</span>
          </span>
        </div>
        <div className="dice-face-indicators">
          {DICE_FACES.map((f) => (
            <span
              key={f.faceNumber}
              className={`dice-pip-indicator ${activeFace === f.faceNumber ? 'is-active' : ''}`}
              title={`Face ${f.faceNumber}: ${f.title}`}
            >
              {f.faceNumber}
            </span>
          ))}
        </div>
        <span className="if-topbar-hint">Scroll down to roll the dice ↓</span>
      </div>

      <canvas ref={canvasRef} className="if-canvas" aria-hidden="true" />

      {/* 3D Dice Stage */}
      <div ref={sceneRef} className="dice-stage">
        <div className="dice-container">
          <div ref={diceCubeRef} className="dice-cube">
            {DICE_FACES.map((face) => (
              <div
                key={face.id}
                className={`dice-face dice-face-${face.faceNumber}`}
                style={{ '--face-accent': face.accent } as React.CSSProperties}
              >
                {/* Dice Face Top Bar */}
                <div className="dice-face-topbar">
                  <div className="flex items-center gap-2">
                    <span className="dice-corner-pip">{face.pipSymbol}</span>
                    <span className="dice-face-label">{face.label}</span>
                  </div>
                  <span className="dice-badge-pill" style={{ color: face.accent, borderColor: `${face.accent}45` }}>
                    {face.badge}
                  </span>
                </div>

                {/* Dice Face Center Content */}
                <div className="dice-face-center">
                  <h3 className="dice-face-title">{face.title}</h3>
                  <p className="dice-face-subtitle">{face.subtitle}</p>
                  <p className="dice-face-detail">{face.detail}</p>
                </div>

                {/* Dice Face Bottom Bar */}
                <div className="dice-face-bottombar">
                  <div className="flex items-center gap-2">
                    <span className="dice-pulse-dot" style={{ background: face.accent }} />
                    <span className="dice-status-txt">
                      {activeFace === face.faceNumber ? 'Currently Facing View' : 'Dice Milestone'}
                    </span>
                  </div>
                  <span className="dice-face-num">0{face.faceNumber}</span>
                </div>

                {/* Inner Face Sheen */}
                <div className="dice-face-sheen" aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* Real-time Dynamic 3D Floor Shadow beneath the dice */}
          <div ref={shadowRef} className="dice-shadow" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
