export const VIDEO_END_OFFSET = 0.04
export const SOURCE_FRAME_RATE = 24

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function progressToVideoTime(progress: number, duration: number) {
  const playableDuration = Math.max(0, duration - VIDEO_END_OFFSET)
  return clamp01(progress) * playableDuration
}

export function isMeaningfulSeek(current: number, target: number) {
  return Math.abs(current - target) >= 1 / SOURCE_FRAME_RATE
}
