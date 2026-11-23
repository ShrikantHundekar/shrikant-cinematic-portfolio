import { portfolio } from '@/data/portfolio'
import { ProjectCard } from './ProjectCard'
import { Section } from '@/components/layout/Section'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    const context = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        opacity: 0,
        y: 60,
        duration: 1.1,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, ref)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={ref}>
      <Section id="projects" kicker="Work / craft" title={<>Things I’ve built</>} intro="A handful of focused projects that explore product thinking, clean architecture, and deliberate interaction.">
        <div className="projects-list">
          {portfolio.projects.map((project, index) => (
            <ProjectCard key={project.number} index={index} editable={project.editable} />
          ))}
        </div>
      </Section>
    </div>
  )
}