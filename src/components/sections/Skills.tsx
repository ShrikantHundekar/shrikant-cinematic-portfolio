import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Server, Layout, Database, Sparkles, Wrench } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '@/data/portfolio'
import { Section } from '@/components/layout/Section'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Skill } from '@/types/portfolio'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    key: 'backend',
    title: 'Backend & Frameworks',
    icon: Server,
    color: '#38f8d4',
    skills: ['Python', 'Django', 'FastAPI', 'Django REST Framework', 'OOP', 'RESTful APIs'],
  },
  {
    key: 'frontend',
    title: 'Frontend & Interface',
    icon: Layout,
    color: '#4d7cff',
    skills: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    key: 'data',
    title: 'Databases & Storage',
    icon: Database,
    color: '#a855f7',
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'SQL Schema Design', 'Query Optimization'],
  },
  {
    key: 'ai',
    title: 'Gen-AI & Data Stack',
    icon: Sparkles,
    color: '#ec4899',
    skills: ['Google Gemini API', 'Prompt Engineering', 'LangChain Basics', 'PyMuPDF', 'Pandas', 'NumPy'],
  },
  {
    key: 'delivery',
    title: 'Tools & Workflow',
    icon: Wrench,
    color: '#38bdf8',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Agile / Scrum', 'Linux CLI'],
  },
]

const groupMeta: Record<string, { label: string; desc: string }> = {
  backend: { label: 'Backend Architecture', desc: 'FastAPI · Django · RESTful APIs' },
  frontend: { label: 'Modern Frontend', desc: 'React.js · TypeScript · Interactive UI' },
  interface: { label: 'Interface & Styling', desc: 'Tailwind CSS · Responsive Systems' },
  data: { label: 'Databases & ML', desc: 'PostgreSQL · Pandas · NumPy' },
  delivery: { label: 'Delivery & Git', desc: 'Version Control & Code Reviews' },
}

const ACCENT_HEX: Record<string, string> = {
  cyan: '#38f8d4',
  blue: '#4d7cff',
  violet: '#a855f7',
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const orbitTweens = useRef<(gsap.core.Tween | null)[]>([])

  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isCoreHovered, setIsCoreHovered] = useState(false)

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    const context = gsap.context(() => {
      const tween1 = gsap.to('.skills-orbit-1', { rotate: 360, duration: 42, repeat: -1, ease: 'none' })
      const tween2 = gsap.to('.skills-orbit-2', { rotate: -360, duration: 56, repeat: -1, ease: 'none' })
      const tween3 = gsap.to('.skills-orbit-3', { rotate: 360, duration: 72, repeat: -1, ease: 'none' })
      orbitTweens.current = [tween1, tween2, tween3]

      gsap.from('.skills-stage', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        opacity: 0,
        scale: 0.8,
        filter: 'blur(16px)',
        duration: 1.4,
        ease: 'expo.out',
      })
      gsap.from('.skill-category-card', {
        scrollTrigger: { trigger: '.skills-category-grid', start: 'top 85%' },
        opacity: 0,
        y: 35,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      })
    }, ref)
    return () => context.revert()
  }, [reducedMotion])

  const handleSkillHover = (skill: Skill) => {
    setHoveredSkill(skill)
    orbitTweens.current.forEach((t) => t?.timeScale(0.12))
  }

  const handleSkillLeave = () => {
    setHoveredSkill(null)
    orbitTweens.current.forEach((t) => t?.timeScale(1))
  }

  const activeColor = hoveredSkill
    ? ACCENT_HEX[hoveredSkill.accent] || '#38f8d4'
    : '#38f8d4'

  return (
    <div ref={ref}>
      <Section
        id="skills"
        kicker="Technical Arsenal"
        title={<>Skills in <em>constant orbit.</em></>}
        intro="Hover on any skill node to pause the orbit, inspect focus areas, and view engineering telemetry."
      >
        <div className="skills-stage" role="region" aria-label="Interactive skills solar system">
          {[1, 2, 3].map((orbit) => {
            const items = portfolio.skills.filter((skill) => skill.orbit === orbit)
            const radius = orbit === 1 ? 152 : orbit === 2 ? 242 : 332
            const isOrbitActive = hoveredSkill?.orbit === orbit

            return (
              <div
                key={orbit}
                className={`skills-orbit skills-orbit-${orbit} ${isOrbitActive ? 'is-active-orbit' : ''}`}
                style={isOrbitActive ? ({ '--orbit-active-color': activeColor } as CSSProperties) : undefined}
              >
                {items.map((skill, index) => {
                  const angle = (360 / items.length) * index - 90
                  const isHovered = hoveredSkill?.name === skill.name
                  const isDimmed = hoveredSkill !== null && !isHovered
                  const isCategoryMatch = hoveredCategory !== null && (
                    (hoveredCategory === 'backend' && skill.group === 'backend') ||
                    (hoveredCategory === 'frontend' && (skill.group === 'frontend' || skill.group === 'interface')) ||
                    (hoveredCategory === 'data' && skill.group === 'data') ||
                    (hoveredCategory === 'delivery' && skill.group === 'delivery')
                  )
                  const skillAccent = ACCENT_HEX[skill.accent] || '#38f8d4'

                  const style = {
                    '--angle': `${angle}deg`,
                    '--radius': `${radius}px`,
                    '--node-accent': skillAccent,
                  } as CSSProperties

                  return (
                    <button
                      key={skill.name}
                      className={`skill-node ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''} ${isCategoryMatch ? 'is-category-highlight' : ''}`}
                      style={style}
                      type="button"
                      onMouseEnter={() => handleSkillHover(skill)}
                      onMouseLeave={handleSkillLeave}
                      onFocus={() => handleSkillHover(skill)}
                      onBlur={handleSkillLeave}
                      aria-label={`${skill.name} — ${groupMeta[skill.group]?.label || skill.group}`}
                    >
                      <span className="skill-node-beacon" style={{ background: skillAccent, color: skillAccent }} />
                      <span className="skill-node-name">{skill.name}</span>
                      {isHovered && (
                        <span className="skill-node-tooltip" style={{ borderColor: `${skillAccent}60`, color: skillAccent }}>
                          Orbit {skill.orbit}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )
          })}

          {/* Central Interactive Core */}
          <div
            className={`skills-core ${hoveredSkill ? 'is-active' : ''} ${isCoreHovered ? 'is-core-hovered' : ''}`}
            style={hoveredSkill ? ({ '--core-active-color': activeColor } as CSSProperties) : undefined}
            onMouseEnter={() => {
              setIsCoreHovered(true)
              orbitTweens.current.forEach((t) => t?.timeScale(0.25))
            }}
            onMouseLeave={() => {
              setIsCoreHovered(false)
              if (!hoveredSkill) orbitTweens.current.forEach((t) => t?.timeScale(1))
            }}
            tabIndex={0}
            role="button"
            aria-label="Core Engineering Focus"
          >
            {hoveredSkill ? (
              <div className="skills-core-active">
                <span className="core-category" style={{ color: activeColor }}>
                  {groupMeta[hoveredSkill.group]?.label || 'Production Stack'}
                </span>
                <strong className="core-skill-title">{hoveredSkill.name}</strong>
                <span className="core-skill-desc">
                  {groupMeta[hoveredSkill.group]?.desc || 'Core Competency'}
                </span>
              </div>
            ) : isCoreHovered ? (
              <div className="skills-core-active">
                <span className="core-category" style={{ color: '#38f8d4' }}>
                  Architecture
                </span>
                <strong className="core-skill-title" style={{ fontSize: '1.4rem' }}>Full-Stack</strong>
                <span className="core-skill-desc">
                  Python · AI · Web APIs
                </span>
              </div>
            ) : (
              <div className="skills-core-default">
                <strong>Core</strong>
                <span>Python · Full-Stack</span>
                <span className="core-hint-badge">Interactive</span>
              </div>
            )}
            <div className="skills-core-ripple" style={hoveredSkill ? { borderColor: activeColor } : undefined} />
          </div>
        </div>

        {/* Bento Grid Category Breakdown */}
        <div className="skills-category-grid">
          {skillCategories.map((cat) => {
            const Icon = cat.icon
            const isCategoryActive = hoveredSkill?.group === cat.key || hoveredCategory === cat.key

            return (
              <div
                key={cat.title}
                className={`skill-category-card ${isCategoryActive ? 'is-active-cat' : ''}`}
                style={{ '--card-accent': cat.color } as CSSProperties}
                onMouseEnter={() => setHoveredCategory(cat.key)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="skill-category-header">
                  <span className="skill-icon-shell" style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}15` }}>
                    <Icon size={16} />
                  </span>
                  <h4>{cat.title}</h4>
                </div>
                <div className="skill-pill-wrap">
                  {cat.skills.map((s) => {
                    const isMatchedPill = hoveredSkill?.name.toLowerCase() === s.toLowerCase()
                    return (
                      <span
                        key={s}
                        className={`skill-pill ${isMatchedPill ? 'pill-matched' : ''}`}
                        style={isMatchedPill ? { borderColor: cat.color, color: '#ffffff', background: `${cat.color}25` } : undefined}
                      >
                        {s}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <ul className="sr-only">
          {portfolio.skills.map((skill) => (
            <li key={skill.name}>{skill.name}</li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
