import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const MESSAGES = {
  en: ['Hey, still there? 👀', 'zzz... 💤', 'Hello? Anyone home?', 'Still waiting... 🌙'],
  ru: ['Эй, ты там уснул? 👀', 'zzz... 💤', 'Ау, ты здесь?', 'Всё ещё жду... 🌙'],
}

const IDLE_TIME = 30000
const SPEED = 1.5

export default function IdleEaster() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)
  const msgRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const elRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const velRef = useRef({ x: SPEED, y: SPEED })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function reset() {
      setVisible(false)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        msgRef.current = Math.floor(Math.random() * MESSAGES.en.length)
        posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        velRef.current = { x: SPEED * (Math.random() > 0.5 ? 1 : -1), y: SPEED * (Math.random() > 0.5 ? 1 : -1) }
        setVisible(true)
      }, IDLE_TIME)
    }

    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll']
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))
    reset()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach(e => window.removeEventListener(e, reset))
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }

    function animate() {
      const el = elRef.current
      if (!el) return

      const w = el.offsetWidth
      const h = el.offsetHeight
      let { x, y } = posRef.current
      let { x: vx, y: vy } = velRef.current

      x += vx
      y += vy

      if (x <= 0) { x = 0; vx = Math.abs(vx) }
      if (x + w >= window.innerWidth) { x = window.innerWidth - w; vx = -Math.abs(vx) }
      if (y <= 0) { y = 0; vy = Math.abs(vy) }
      if (y + h >= window.innerHeight) { y = window.innerHeight - h; vy = -Math.abs(vy) }

      posRef.current = { x, y }
      velRef.current = { x: vx, y: vy }

      el.style.left = `${x}px`
      el.style.top = `${y}px`

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: posRef.current.y,
        left: posRef.current.x,
        zIndex: 9998,
        fontFamily: 'var(--font-mono)',
        fontSize: '1.4rem',
        fontWeight: 600,
        padding: '1.2rem 2rem',
        borderRadius: '0.75rem',
        backgroundColor: 'rgba(18,18,30,0.97)',
        border: '1px solid var(--color-accent)',
        boxShadow: '0 0 24px rgba(139,92,246,0.4), 0 4px 32px rgba(0,0,0,0.6)',
        color: 'var(--color-text)',
        animation: 'spring-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {MESSAGES[lang as 'en' | 'ru'][msgRef.current]}
    </div>
  )
}
