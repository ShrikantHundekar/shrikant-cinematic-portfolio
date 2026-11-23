import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, FileDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '@/data/portfolio'
import { useVideoScrub } from '@/hooks/useVideoScrub'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ready, failed, reducedMotion } = useVideoScrub(wrapperRef, videoRef, sceneRef)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || reducedMotion) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.55,
        },
      })

      // The hero timeline moves one continuous title sequence through seven scroll beats.
      timeline
        .fromTo('.hero-meta', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.08 }, 0)
        .fromTo('.hero-first', { opacity: 0, y: 90, filter: 'blur(18px)', clipPath: 'inset(100% 0 0)' }, { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0% 0 0)', duration: 0.2 }, 0.03)
        .fromTo('.hero-surname', { opacity: 0, x: 100, filter: 'blur(14px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.2 }, 0.16)
        .fromTo('.hero-role', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.29)
        .to('.role-primary', { opacity: 0, y: -14, filter: 'blur(8px)', duration: 0.08 }, 0.43)
        .fromTo('.role-secondary', { opacity: 0, y: 14, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.09 }, 0.46)
        .fromTo('.hero-education', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.12 }, 0.54)
        .fromTo('.hero-actions', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.12 }, 0.68)
        .to('.hero-name', { y: -80, opacity: 0, filter: 'blur(14px)', duration: 0.18, ease: 'power2.in' }, 0.82)
        .to('.hero-role, .hero-actions, .hero-education', { opacity: 0, y: -30, duration: 0.13, ease: 'power2.in' }, 0.85)
        .to('.hero-video', { scale: 1.14, filter: 'saturate(.65) contrast(1.15) brightness(.46) blur(2px)', duration: 0.2 }, 0.78)
        .to('.hero-scroll-hint', { opacity: 0, duration: 0.06 }, 0.05)

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.set('.hero-progress-fill', window.innerWidth < 640 ? { width: `${self.progress * 100}%` } : { height: `${self.progress * 100}%` })
        },
      })
    }, wrapper)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <div id="top" ref={wrapperRef} className="hero-scroll-space">
      <section ref={sceneRef} className="hero-scene" aria-labelledby="hero-title">
        <video
          ref={videoRef}
          className="hero-video"
          preload="auto"
          muted
          playsInline
          poster="/media/cinema-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source media="(max-width: 767px)" src="/media/cinema-scrub-mobile.mp4" />
          <source src="/media/cinema-scrub.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-lights" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-meta">
            <div className="flex items-center gap-2">
              <span className="live-status-dot" aria-hidden="true" />
              <span className="text-emerald-400 font-semibold tracking-wider">Available for Developer Opportunities</span>
            </div>
            <span>Pune, India · 18.5204° N / 73.8567° E</span>
          </div>
          <h1 id="hero-title" className="hero-name">
            <span className="hero-first">{portfolio.person.firstName}</span>
            <span className="surname hero-surname">{portfolio.person.lastName}</span>
          </h1>
          <div className="hero-role" aria-label={`${portfolio.person.role}. ${portfolio.person.secondaryRole}.`}>
            <span className="role-primary">{portfolio.person.role}</span>
            <span className="role-secondary" style={{ position: 'absolute', left: 0 }}>{portfolio.person.secondaryRole}</span>
          </div>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">View Projects <ArrowDownRight size={16} /></a>
            <a className="secondary-action hero-resume-btn" href="/resume.pdf" target="_blank" rel="noreferrer">
              <FileDown size={16} /> Download Resume
            </a>
            <a className="secondary-action" href="#contact">Get In Touch <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-education">
            <div><span>Degree</span><strong>B.E. IT</strong></div>
            <div><span>CGPA</span><strong>{portfolio.education.cgpa}</strong></div>
            <div><span>HSC Score</span><strong>86.6%</strong></div>
            <div><span>College</span><strong>Trinity College, Pune</strong></div>
          </div>
          <div className="hero-scroll-hint">Scroll to explore my journey</div>
        </div>
        <div className="hero-progress" aria-hidden="true"><div className="hero-progress-fill" /></div>
      </section>
    </div>
  )
}
