import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import SpaceInvaders from '../ui/SpaceInvaders'
import AchievementPopup from '../ui/AchievementPopup'

function useTypewriter(text: string, speed = 55) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return displayed
}


export default function Hero() {
  const { tr, lang } = useLanguage()
  const { scrollY } = useScroll()

  const contentY = useTransform(scrollY, [0, 600], [0, 60])
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0])

  const typed = useTypewriter(tr.hero.title, 55)
  const [showCursor, setShowCursor] = useState(true)
  const [pressStart, setPressStart] = useState(false)
  const [psVisible, setPsVisible] = useState(true)
  const [gameOpen, setGameOpen] = useState(false)
  const [won, setWon] = useState(false)

  const handleClose = useCallback(() => setGameOpen(false), [])
  const handleWin = useCallback(() => {
    setWon(true)
    setTimeout(() => setWon(false), 6000)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setPressStart(true), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!pressStart) return
    const id = setInterval(() => setPsVisible((v) => !v), 560)
    return () => clearInterval(id)
  }, [pressStart])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Orb 1 — purple */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Orb 2 — cyan */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Content */}
      <motion.div className="relative max-w-4xl w-full" style={{ y: contentY, opacity: fadeOut }}>
        <motion.p
          className="font-mono text-sm mb-4"
          style={{ color: 'var(--color-accent)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tr.hero.greeting}
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="glitch" data-text={lang === 'ru' ? 'Лосев Денис' : 'Losev Denis'}>
            {lang === 'ru' ? 'Лосев Денис' : 'Losev Denis'}
          </span>
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl font-light mb-6"
          style={{ color: 'var(--color-muted)', minHeight: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {typed}
          <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--color-accent)' }}>|</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tr.hero.description}{' '}
          <span style={{ color: 'var(--color-text)' }}>{tr.hero.stack}</span>
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border-none"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
          >
            {tr.hero.viewProjects}
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)', backgroundColor: 'var(--color-surface)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            {tr.hero.contactMe}
          </button>
        </motion.div>

        {pressStart && (
          <button
            onClick={() => setGameOpen(true)}
            className="font-mono text-xs mt-6 bg-transparent border-none cursor-pointer"
            style={{
              color: 'var(--color-muted)',
              letterSpacing: '0.3em',
              opacity: psVisible ? 1 : 0,
              transition: 'opacity 0.05s',
              userSelect: 'none',
              padding: 0,
              display: 'block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            [ PRESS START ]
          </button>
        )}
      </motion.div>

      {gameOpen && <SpaceInvaders onClose={handleClose} onWin={handleWin} />}
      {won && <AchievementPopup title={lang === 'ru' ? 'Space Invaders пройден!' : 'Space Invaders Cleared!'} />}
    </section>
  )
}
