import { useEffect, useRef, useState } from 'react'

const MILESTONES = new Set([5, 10, 25, 50, 100, 200])

function getLabel(n: number) {
  if (n >= 100) return `GODLIKE ×${n}!`
  if (n >= 50)  return `ULTRA COMBO ×${n}!`
  if (n >= 25)  return `MEGA COMBO ×${n}!`
  return `COMBO ×${n}!`
}

interface Popup { id: number; label: string; x: number; y: number }

export default function ClickCombo() {
  const countRef = useRef(0)
  const [popups, setPopups] = useState<Popup[]>([])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      countRef.current += 1
      const n = countRef.current
      if (!MILESTONES.has(n)) return

      const id = Date.now() + Math.random()
      const x = Math.min(Math.max(e.clientX, 90), window.innerWidth - 90)
      const y = Math.min(Math.max(e.clientY, 60), window.innerHeight - 60)
      setPopups(p => [...p, { id, label: getLabel(n), x, y }])
      setTimeout(() => setPopups(p => p.filter(pp => pp.id !== id)), 1600)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {popups.map(popup => (
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
            color: '#fbbf24',
            textShadow: '0 0 12px rgba(251,191,36,0.9), 0 0 28px rgba(251,191,36,0.4)',
            animation: 'xp-float 1.6s ease-out forwards',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}
        >
          {popup.label}
        </div>
      ))}
    </>
  )
}
