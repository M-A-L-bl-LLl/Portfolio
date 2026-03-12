import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

interface Props {
  title: string
}

export default function AchievementPopup({ title }: Props) {
  const [show, setShow] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 900)
    const t2 = setTimeout(() => setShow(false), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const label = lang === 'ru' ? 'Достижение получено' : 'Achievement Unlocked'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(18,18,30,0.97)',
            border: '1px solid var(--color-accent)',
            boxShadow: '0 0 20px rgba(139,92,246,0.3), 0 4px 24px rgba(0,0,0,0.5)',
            minWidth: '240px',
            maxWidth: '320px',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Icon */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '0.375rem',
            backgroundColor: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            flexShrink: 0,
          }}>
            🏆
          </div>

          {/* Text */}
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
              {label}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: 600, lineHeight: 1.3 }}>
              {title}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
