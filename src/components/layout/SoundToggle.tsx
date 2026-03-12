import { useState } from 'react'

export default function SoundToggle() {
  const [muted, setMuted] = useState(() => localStorage.getItem('sound-muted') === 'true')

  function toggle() {
    const next = !muted
    localStorage.setItem('sound-muted', String(next))
    setMuted(next)
    window.dispatchEvent(new Event('sound-toggle'))
  }

  return (
    <button
      onClick={toggle}
      title={muted ? 'Включить звук' : 'Выключить звук'}
      style={{
        position: 'fixed',
        bottom: 76,
        left: 24,
        zIndex: 9997,
        width: 44,
        height: 44,
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: muted ? 'var(--color-border)' : 'var(--color-muted)',
        fontSize: '1.1rem',
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
        e.currentTarget.style.borderColor = muted ? 'var(--color-border)' : 'var(--color-border)'
        e.currentTarget.style.color = muted ? 'var(--color-border)' : 'var(--color-muted)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
