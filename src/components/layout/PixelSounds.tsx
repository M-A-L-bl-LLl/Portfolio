import { useEffect, useRef, useState } from 'react'

let sharedCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!sharedCtx || sharedCtx.state === 'closed') {
    sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return sharedCtx
}

export function playBlip(freq = 660, duration = 0.07) {
  if (localStorage.getItem('sound-muted') === 'true') return
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'square'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration)
    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration + 0.01)
  } catch {}
}

export default function PixelSounds() {
  const lastTarget = useRef<EventTarget | null>(null)
  const [muted, setMuted] = useState(() => localStorage.getItem('sound-muted') === 'true')

  useEffect(() => {
    function onToggle() {
      setMuted(localStorage.getItem('sound-muted') === 'true')
    }
    window.addEventListener('sound-toggle', onToggle)
    return () => window.removeEventListener('sound-toggle', onToggle)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (muted) return
      if (e.target === lastTarget.current) return
      lastTarget.current = e.target
      playBlip(660, 0.07)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [muted])

  return null
}
