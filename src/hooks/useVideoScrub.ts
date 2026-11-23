import { RefObject, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { isMeaningfulSeek, progressToVideoTime } from '@/utils/video'

gsap.registerPlugin(ScrollTrigger)

export function useVideoScrub(
  wrapperRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  sceneRef: RefObject<HTMLElement | null>,
) {
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const video = videoRef.current
    const scene = sceneRef.current
    if (!wrapper || !video || !scene || reducedMotion) return

    let frame = 0
    let targetTime = 0
    let context: gsap.Context | null = null

    const applySeek = () => {
      frame = 0
      if (Number.isFinite(targetTime) && isMeaningfulSeek(video.currentTime, targetTime)) {
        video.currentTime = targetTime
      }
    }

    const build = () => {
      setReady(true)
      video.pause()
      const playhead = { progress: 0 }
      context = gsap.context(() => {
        gsap.to(playhead, {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.22,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              targetTime = progressToVideoTime(self.progress, video.duration)
              if (!frame) frame = requestAnimationFrame(applySeek)
            },
          },
        })
      }, wrapper)
      ScrollTrigger.refresh()
    }

    const onError = () => setFailed(true)
    if (video.readyState >= 1) build()
    else video.addEventListener('loadedmetadata', build, { once: true })
    video.addEventListener('error', onError)

    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', build)
      video.removeEventListener('error', onError)
      context?.revert()
    }
  }, [reducedMotion, wrapperRef, videoRef, sceneRef])

  return { ready, failed, reducedMotion }
}
