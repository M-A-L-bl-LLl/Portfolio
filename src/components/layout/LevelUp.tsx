import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const LEVEL_THRESHOLDS = [200, 700, 1500, 2050]

export default function LevelUp() {
  const { lang } = useLanguage()
  const totalXP = useRef(0)
  const levelRef = useRef(1)
  const [popup, setPopup] = useState<{ level: number } | null>(null)

  useEffect(() => {
    function onXP(e: Event) {
      const amount = (e as CustomEvent<{ amount: number }>).detail.amount
      totalXP.current += amount

      const newLevel = LEVEL_THRESHOLDS.filter(t => totalXP.current >= t).length + 1
      if (newLevel > levelRef.current) {
        levelRef.current = newLevel
        setPopup({ level: newLevel })
        setTimeout(() => setPopup(null), 4000)
      }
    }

    window.addEventListener('xp-earned', onXP)
    return () => window.removeEventListener('xp-earned', onXP)
  }, [])

  if (!popup) return null

  return (
    <div style={{
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 99999,
      pointerEvents: 'none',
      textAlign: 'center',
      animation: 'spring-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: '#fbbf24',
        marginBottom: '0.3rem',
      }}>
        {lang === 'ru' ? '— ПОВЫШЕНИЕ УРОВНЯ —' : '— LEVEL UP —'}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#fbbf24',
        textShadow: '0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4)',
        letterSpacing: '0.1em',
      }}>
        LVL {popup.level}
      </div>
    </div>
  )
}
