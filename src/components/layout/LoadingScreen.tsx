import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TIPS = [
  'Tip: Object pooling eliminates garbage collection spikes.',
  'Tip: Always profile before optimizing.',
  'Tip: VR target framerate is 72+ FPS — never drop below.',
  'Tip: Baked lighting is free at runtime.',
  'Tip: Addressables reduce initial load time significantly.',
  'Tip: Test multiplayer with simulated packet loss.',
  'Tip: Zenject makes large codebases maintainable.',
  'Tip: Draw calls are the enemy of mobile performance.',
  'Tip: UniRx turns async spaghetti into readable streams.',
  'Tip: Save often. Commit even more often.',
]

const LINES = [
  'INITIALIZING PORTFOLIO...',
  'LOADING ASSETS...',
  'COMPILING SHADERS...',
  'MOUNTING VR DEVICES...',
  'SYNCING MULTIPLAYER...',
  'ALL SYSTEMS READY.',
]

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const tip = useRef(TIPS[Math.floor(Math.random() * TIPS.length)])

  useEffect(() => {
    if (!visible) return

    let li = 0
    const lineTimer = setInterval(() => {
      if (li < LINES.length) {
        setLines((p) => [...p, LINES[li]])
        li++
      } else {
        clearInterval(lineTimer)
        setTimeout(() => setVisible(false), 400)
      }
    }, 363)

    const progTimer = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 14 + 6
        if (next >= 100) { clearInterval(progTimer); return 100 }
        return next
      })
    }, 200)

    return () => { clearInterval(lineTimer); clearInterval(progTimer) }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-bg)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10vw',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Logo */}
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '2rem', letterSpacing: '0.15em' }}>
            LOSEVDD.DEV
          </div>

          {/* Boot lines */}
          <div style={{ marginBottom: '2rem', minHeight: '10rem', width: '280px' }}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: '0.75rem',
                  color: i === lines.length - 1 ? 'var(--color-text)' : 'var(--color-muted)',
                  marginBottom: '0.35rem',
                  letterSpacing: '0.05em',
                }}
              >
                <span style={{ color: 'var(--color-accent)', marginRight: '0.5rem' }}>[OK]</span>
                {line}
              </motion.div>
            ))}
          </div>

          {/* Tip */}
          <div style={{ width: '280px', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', opacity: 0.7 }}>
              {tip.current}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '280px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>LOADING</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)' }}>{Math.floor(progress)}%</span>
            </div>
            <div style={{ height: '2px', backgroundColor: 'var(--color-border)', borderRadius: 2 }}>
              <motion.div
                style={{
                  height: '100%',
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, var(--color-accent), var(--color-cyan))',
                  boxShadow: '0 0 8px rgba(139,92,246,0.6)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
