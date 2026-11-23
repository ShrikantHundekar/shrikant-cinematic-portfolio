import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Section } from '@/components/layout/Section'
import { portfolio } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return

    // The achievement counters animate once when the band scrolls into view.
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.achievement-value').forEach((el) => {
        const finalValue = parseFloat(el.dataset.value || '0')
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        const state = { value: 0 }
        gsap.to(state, {
          value: finalValue,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
          onUpdate: () => {
            el.textContent = state.value.toFixed(decimals)
          },
        })
      })
    }, ref)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={ref}>
      <Section
        id="achievements"
        kicker="Key highlights"
        title="Numbers that matter"
      >
        <div className="achievement-grid">
          {portfolio.achievements.map((a) => (
            <div key={a.label} className="achievement">
              <span className="achievement-label">
                {a.label === 'CGPA' ? 'CGPA' : a.label}
              </span>
              <span
                className="achievement-value"
                data-value={a.value}
                data-decimals={a.decimals ?? 0}
              >
                {a.decimals !== undefined ? a.value.toFixed(a.decimals) : a.value}
              </span>
              {a.suffix && <span className="achievement-suffix">{a.suffix}</span>}
              {a.note && <span className="achievement-note">{a.note}</span>}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}