import { useState } from 'react'
import SpaceInvaders from '../ui/SpaceInvaders'
import AchievementPopup from '../ui/AchievementPopup'
import { useLanguage } from '../../context/LanguageContext'

export default function GameButton() {
  const [open, setOpen] = useState(false)
  const [won, setWon] = useState(false)
  const { lang } = useLanguage()

  function handleWin() {
    setWon(true)
    setTimeout(() => setWon(false), 6000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Play Space Invaders"
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 9997,
          width: 44,
          height: 44,
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-muted)',
          fontSize: '1.25rem',
          lineHeight: 1,
          paddingBottom: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.color = 'var(--color-accent)'
          e.currentTarget.style.boxShadow = '0 0 12px rgba(139,92,246,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-muted)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        🎮
      </button>

      {open && (
        <SpaceInvaders
          onClose={() => setOpen(false)}
          onWin={handleWin}
        />
      )}

      {won && (
        <AchievementPopup
          title={lang === 'ru' ? 'Space Invaders пройден!' : 'Space Invaders Cleared!'}
        />
      )}
    </>
  )
}
