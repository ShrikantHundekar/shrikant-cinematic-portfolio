import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '@/data/portfolio'
import { Section } from '@/components/layout/Section'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const facts = [
  { value: portfolio.education.degree, label: 'Engineering foundation' },
  { value: `Class of ${portfolio.education.year}`, label: 'Graduating in 2026' },
  { value: portfolio.education.cgpa, label: 'Current CGPA' },
  { value: portfolio.person.role, label: 'What I build' },
  { value: portfolio.person.secondaryRole, label: 'How I approach it' },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    const context = gsap.context(() => {
      gsap.from('.about-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        opacity: 0,
        y: 90,
        rotateX: 12,
        rotateZ: (index) => (index % 2 === 0 ? -2.5 : 2.5),
        stagger: 0.1,
        duration: 1.15,
        ease: 'power4.out',
      })
      gsap.to('.about-orbit', {
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        rotate: 35,
        scale: 1.08,
        ease: 'none',
      })
    }, ref)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={ref}>
      <Section id="about" kicker="About me" title={<>Backend first. <em>Full-stack vision.</em></>}>
        <div className="about-grid">
          <div className="about-manifesto">
            <p className="section-copy">{portfolio.person.summary}</p>
            <div className="about-orbit" aria-hidden="true"><div className="about-orbit-core" /></div>
          </div>
          <div className="about-cards">
            {facts.map((fact, index) => (
              <GlassPanel key={fact.value} className="about-card">
                <span className="about-card-index">0{index + 1}</span>
                <strong className="about-card-value">{fact.value}</strong>
                <span className="about-card-label">{fact.label}</span>
              </GlassPanel>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
