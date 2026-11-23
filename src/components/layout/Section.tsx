import { PropsWithChildren, ReactNode } from 'react'

interface SectionProps extends PropsWithChildren {
  id: string
  kicker: string
  title: ReactNode
  intro?: string
  className?: string
}

export function Section({ id, kicker, title, intro, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`page-section ${className}`}>
      <div className="section-inner">
        <div className="section-kicker">{kicker}</div>
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-copy">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
