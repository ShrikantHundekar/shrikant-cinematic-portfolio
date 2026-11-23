import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, FileDown, ArrowUpRight } from 'lucide-react'

const navItems = [
  { label: 'About', href: '#identity' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav-shell" aria-label="Primary navigation">
      <a className="nav-brand" href="#top" aria-label="Shrikant Hundekar, back to top">
        <span className="nav-brand-dot" aria-hidden="true" />
        <span className="font-semibold tracking-wider">SHRIKANT / 26</span>
      </a>

      <div className="nav-links">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>{item.label}</a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="nav-resume-pill"
          aria-label="Download Shrikant Hundekar Resume PDF"
        >
          <FileDown size={13} />
          <span>Resume</span>
        </a>
      </div>

      <button
        className="nav-menu-button"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '4.75rem',
              left: '1rem',
              right: '1rem',
              padding: '1.25rem',
              borderRadius: '1.2rem',
              border: '1px solid rgba(140, 180, 255, 0.22)',
              background: 'rgba(5, 8, 18, 0.96)',
              backdropFilter: 'blur(24px)',
              pointerEvents: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(56,248,212,0.1)',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.85rem 0.5rem',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: '.78rem',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,.08)',
                  color: '#edf7ff',
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                padding: '0.85rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #38f8d4, #4d7cff)',
                color: '#030611',
                fontWeight: 600,
                fontSize: '.78rem',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              <FileDown size={15} /> Download Resume PDF
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
