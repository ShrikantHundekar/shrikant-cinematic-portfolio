import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  alpha: number
  hue: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let width = 0
    let height = 0
    let visible = true
    const pointer = { x: -1000, y: -1000 }
    let particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = width < 700 ? 36 : 72
      particles = Array.from({ length: count }, (_, index) => ({
        x: (index * 97.3) % width,
        y: (index * 53.7) % height,
        size: 0.4 + (index % 5) * 0.28,
        speed: 0.08 + (index % 7) * 0.025,
        alpha: 0.15 + (index % 6) * 0.07,
        hue: index % 3 === 0 ? 174 : index % 3 === 1 ? 228 : 263,
      }))
    }

    const draw = () => {
      if (!visible) return
      context.clearRect(0, 0, width, height)
      for (const particle of particles) {
        particle.y -= particle.speed
        if (particle.y < -10) particle.y = height + 10
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 120 && distance > 0) {
          particle.x += (dx / distance) * 0.3
          particle.y += (dy / distance) * 0.3
        }
        context.beginPath()
        context.fillStyle = `hsla(${particle.hue}, 92%, 70%, ${particle.alpha})`
        context.shadowBlur = particle.size * 9
        context.shadowColor = `hsla(${particle.hue}, 95%, 70%, .5)`
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }
      animationFrame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    const onVisibility = () => {
      visible = !document.hidden
      cancelAnimationFrame(animationFrame)
      if (visible) draw()
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
