import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MagneticCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !finePointer || reducedMotion) return

    const xTo = gsap.quickTo(element, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.7, ease: 'power3.out' })
    const onMove = (event: PointerEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
      gsap.to(element, { opacity: 1, duration: 0.35 })
    }
    const onLeave = () => gsap.to(element, { opacity: 0, duration: 0.35 })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [finePointer, reducedMotion])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
