import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} {portfolio.person.name}</span>
        <span>Aspiring Software Developer / built with intent</span>
        <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>Back to top <ArrowUpRight size={12} /></a>
      </div>
    </footer>
  )
}
