import { useState, useEffect, useRef } from 'react'

interface Popup {
  id: number
  label: string
  x: number
  y: number
}

const SECTION_XP: Record<string, string> = {
  about: '+200 XP',
  experience: '+500 XP',
  skills: '+300 XP',
  projects: '+1000 XP',
  contact: '+50 XP',
}

export default function XPPopup() {
  const [popups, setPopups] = useState<Popup[]>([])
  const seen = useRef(new Set<string>())

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.keys(SECTION_XP).forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !seen.current.has(id)) {
          seen.current.add(id)
          const popupId = Date.now() + Math.random()
          const x = window.innerWidth / 2 + (Math.random() - 0.5) * 160
          const y = window.innerHeight * 0.35

          setPopups((prev) => [...prev, { id: popupId, label: SECTION_XP[id], x, y }])
          const amount = parseInt(SECTION_XP[id].replace(/\D/g, ''), 10)
          window.dispatchEvent(new CustomEvent('xp-earned', { detail: { amount } }))
          setTimeout(() => {
            setPopups((prev) => prev.filter((p) => p.id !== popupId))
          }, 1400)
        }
      }, { threshold: 0.25 })

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      {popups.map((popup) => (
        <div
          key={popup.id}
          style={{
            position: 'fixed',
            left: popup.x,
            top: popup.y,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 99999,
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#8b5cf6',
            textShadow: '0 0 12px rgba(139,92,246,0.9), 0 0 24px rgba(139,92,246,0.4)',
            animation: 'xp-float 1.4s ease-out forwards',
          }}
        >
          {popup.label}
        </div>
      ))}
    </>
  )
}
