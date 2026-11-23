import { useEffect, useRef, useState, useCallback } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileDown,
  Github,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { portfolio } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  hue: number
}

export function OpenCommunication() {
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const particles = useRef<Particle[]>([])
  const animationFrame = useRef<number>(0)

  const initParticles = useCallback((width: number, height: number) => {
    const count = window.innerWidth < 768 ? 45 : 90
    particles.current = Array.from({ length: count }, (_, i) => ({
      x: (i * 37.3 + 19) % width,
      y: (i * 59.7 + 23) % height,
      size: 0.5 + (i % 4) * 0.4,
      speedX: ((i % 7) - 3) * 0.08,
      speedY: ((i % 5) - 2) * 0.06 - 0.1,
      alpha: 0.12 + (i % 6) * 0.07,
      hue: i % 3 === 0 ? 174 : i % 3 === 1 ? 218 : 265, // cyan, electric blue, violet
    }))
  }, [])

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.current.forEach((p) => {
      p.x += p.speedX
      p.y += p.speedY
      if (p.x < -10) p.x = canvas.width + 10
      if (p.x > canvas.width + 10) p.x = -10
      if (p.y < -10) p.y = canvas.height + 10
      if (p.y > canvas.height + 10) p.y = -10

      ctx.beginPath()
      ctx.fillStyle = `hsla(${p.hue}, 88%, 70%, ${p.alpha})`
      ctx.shadowBlur = p.size * 10
      ctx.shadowColor = `hsla(${p.hue}, 92%, 65%, 0.45)`
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })

    animationFrame.current = requestAnimationFrame(drawParticles)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = window.innerWidth
      const h = canvas.parentElement?.offsetHeight || window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(w, h)
    }

    resize()
    window.addEventListener('resize', resize)
    drawParticles()

    return () => {
      cancelAnimationFrame(animationFrame.current)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion, initParticles, drawParticles])

  // GSAP Smooth Scroll Entrance Animation
  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })

      tl.from('.contact-breadcrumb', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
        .from('.contact-heading-lead, .contact-heading-accent', {
          opacity: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.contact-hero-sub', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .from('.contact-quick-card', {
          opacity: 0,
          x: -30,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4')
        .from('.contact-social-section', { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.contact-glass-card', {
          opacity: 0,
          y: 45,
          scale: 0.96,
          duration: 0.85,
          ease: 'power3.out',
        }, '-=0.7')
        .from('.contact-field-group', {
          opacity: 0,
          y: 18,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.5')
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    if (sending || sent) return
    setSending(true)

    // Simulate sending transmission with realistic latency
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 850)
  }

  const handleReset = () => {
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
    setSent(false)
  }

  return (
    <section ref={rootRef} className="contact-portal-shell" id="contact" aria-label="Contact Shrikant Hundekar">
      {/* Ambient background grid & glow */}
      <div className="contact-grid-backdrop" aria-hidden="true" />
      <div className="contact-ambient-halo" aria-hidden="true" />
      <canvas ref={canvasRef} className="contact-particle-canvas" aria-hidden="true" />

      <div className="contact-container">
        {/* ========================================================= */}
        {/* LEFT COLUMN: HERO HEADLINE + QUICK CARDS + SOCIALS        */}
        {/* ========================================================= */}
        <div className="contact-lead-col">
          {/* Breadcrumb / Kicker */}
          <div className="contact-breadcrumb">
            <span className="contact-breadcrumb-dot" />
            <span>Connect &middot; Direct Communication Portal</span>
          </div>

          {/* Big Bold Headline */}
          <h2 className="contact-hero-heading">
            <span className="contact-heading-lead">Let's Get</span>
            <span className="contact-heading-accent">in touch</span>
          </h2>

          {/* Subtitle */}
          <p className="contact-hero-sub">
            Open for software engineering opportunities, Python &amp; AI builds, and scalable full-stack projects.
            Don't hesitate to say hello!
          </p>

          {/* 3 Interactive Quick Cards with Arrows */}
          <div className="contact-card-stack">
            {/* 1. Email Card */}
            <a
              href={`mailto:${portfolio.person.email}`}
              className="contact-quick-card"
              title="Send an email to Shrikant Hundekar"
            >
              <div className="contact-quick-icon">
                <Mail size={22} strokeWidth={1.5} />
              </div>
              <div className="contact-quick-info">
                <span className="contact-quick-label">Email Me</span>
                <span className="contact-quick-val">{portfolio.person.email}</span>
              </div>
              <span className="contact-quick-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </a>

            {/* 2. Call / WhatsApp Card */}
            <a
              href="tel:+919423381155"
              className="contact-quick-card"
              title="Call or WhatsApp Shrikant Hundekar"
            >
              <div className="contact-quick-icon">
                <Phone size={22} strokeWidth={1.5} />
              </div>
              <div className="contact-quick-info">
                <span className="contact-quick-label">Call / WhatsApp</span>
                <span className="contact-quick-val">+91 94233 81155</span>
              </div>
              <span className="contact-quick-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </a>

            {/* 3. Base Location Card */}
            <div className="contact-quick-card contact-quick-card-static">
              <div className="contact-quick-icon">
                <MapPin size={22} strokeWidth={1.5} />
              </div>
              <div className="contact-quick-info">
                <span className="contact-quick-label">Base Location</span>
                <span className="contact-quick-val">Pune, Maharashtra, India</span>
              </div>
              <span className="contact-quick-badge" title="Open to on-site / hybrid / remote">
                <Sparkles size={14} />
              </span>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="contact-social-section">
            <span className="contact-social-label">Follow &amp; Connect</span>
            <div className="contact-social-pills">
              <a
                href="https://github.com/ShrikantHundekar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/shrikant-hundekar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${portfolio.person.email}`}
                className="contact-social-pill"
                aria-label="Direct Email"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
                aria-label="Download Resume PDF"
              >
                <FileDown size={16} />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: FLOATING FROSTED GLASS FORM CARD             */}
        {/* ========================================================= */}
        <div className="contact-form-col">
          <div className="contact-glass-card">
            {/* Card Header with Status Badge */}
            <div className="contact-card-header">
              <div>
                <h3 className="contact-card-title">Contact Me</h3>
                <p className="contact-card-desc">Have a role or idea? Send a transmission directly.</p>
              </div>
              <div className="contact-avail-pill">
                <span className="contact-avail-pulse" />
                <span>Available for Hire</span>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSend} className="contact-form-grid">
              {/* Row 1: Name and Email */}
              <div className="contact-field-group">
                <label htmlFor="contact-name">Name</label>
                <div className="contact-input-wrap">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-email">Email</label>
                <div className="contact-input-wrap">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    required
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Phone Number and Subject */}
              <div className="contact-field-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <div className="contact-input-wrap contact-phone-wrap">
                  <span className="contact-phone-flag">🇮🇳 +91</span>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="94233 81155"
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-subject">Subject</label>
                <div className="contact-input-wrap">
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Enter your subject..."
                    required
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 3: Full Width Message Area */}
              <div className="contact-field-group contact-field-full">
                <label htmlFor="contact-message">Message</label>
                <div className="contact-input-wrap">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Enter your message, project brief, or role details..."
                    required
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="contact-field-full">
                {sent ? (
                  <div className="contact-success-panel">
                    <div className="contact-success-icon">
                      <Check size={22} />
                    </div>
                    <div className="contact-success-info">
                      <h4>Message Transmitted Successfully!</h4>
                      <p>Thank you for reaching out. I'll review your details and get back to you within 24 hours.</p>
                      <button type="button" onClick={handleReset} className="contact-reset-btn">
                        Send another message
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={sending}
                  >
                    <span>{sending ? 'Transmitting...' : 'Send Message'}</span>
                    <ArrowRight size={18} className="contact-submit-arrow" />
                  </button>
                )}
              </div>

              {/* Security & Response Assurance Disclaimer */}
              <div className="contact-disclaimer">
                <Lock size={12} className="contact-lock-icon" />
                <span>
                  By submitting this form, your information is kept strictly private. Guaranteed response time: within 24 hours.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
