import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '@/data/portfolio'
import { Section } from '@/components/layout/Section'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return
    const context = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        opacity: 0,
        y: 60,
        duration: 1.1,
        stagger: 0.2,
        ease: 'power3.out',
      })
      gsap.to('.timeline-line-fill', {
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        height: '100%',
        ease: 'none',
      })
    }, ref)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={ref}>
      <Section id="experience" kicker="Experience / internships" title={<>Experience <em>written in code.</em></>} intro="From frontend internships to full-stack projects — growth measured in shipped work, real-world builds, and hands-on problem solving.">
        <div className="timeline">
          <div className="timeline-line"><div className="timeline-line-fill" /></div>
          {portfolio.experience.map((item, index) => (
            <GlassPanel key={item.title} className="timeline-item">
              <div className="timeline-period">{item.period}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <span className="timeline-context">{item.context}</span>
              <p className="timeline-description">{item.description}</p>
              <div className="timeline-tags">
                {item.tags.map((tag) => (
                  <span className="project-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </Section>
    </div>
  )
}