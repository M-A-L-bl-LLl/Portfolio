import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { expYears } from '../../i18n/translations'

function TerminalLine({ text, delay, color }: { text: string; delay: number; color?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="font-mono text-sm leading-relaxed"
      style={{ color: color ?? 'var(--color-muted)' }}
    >
      {text}
    </motion.div>
  )
}

export default function About() {
  const { tr, lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (inView) setStarted(true)
  }, [inView])

  const lines = lang === 'ru' ? [
    { text: '> whoami', color: 'var(--color-accent)', delay: 0 },
    { text: `Unity-разработчик, ${expYears()}+ лет опыта`, delay: 200 },
    { text: '> skills --list', color: 'var(--color-accent)', delay: 500 },
    { text: 'Mobile · WebGL · VR · Multiplayer', delay: 700 },
    { text: '> experience --highlights', color: 'var(--color-accent)', delay: 1100 },
    { text: '[VrReal]  Коммерческие мультиплеерные VR-арены', delay: 1300 },
    { text: '[Google Play / Яндекс Игры]  Мобильные и WebGL-игры', delay: 1550 },
    { text: '[Технопарк РГСУ]  VR-тренажёры', delay: 1800 },
    { text: '> focus', color: 'var(--color-accent)', delay: 2100 },
    { text: 'Мультиплеерная архитектура · Zenject · UniRx', delay: 2300 },
    { text: '> status', color: 'var(--color-accent)', delay: 2700 },
    { text: 'Открыт для новых проектов ✓', color: '#4ade80', delay: 2900 },
  ] : [
    { text: '> whoami', color: 'var(--color-accent)', delay: 0 },
    { text: `Unity Developer, ${expYears()}+ years of experience`, delay: 200 },
    { text: '> skills --list', color: 'var(--color-accent)', delay: 500 },
    { text: 'Mobile · WebGL · VR · Multiplayer', delay: 700 },
    { text: '> experience --highlights', color: 'var(--color-accent)', delay: 1100 },
    { text: '[VrReal]  Commercial multiplayer VR arenas', delay: 1300 },
    { text: '[Google Play / Yandex Games]  Mobile & WebGL games', delay: 1550 },
    { text: '[Technopark RSSU]  VR training simulators', delay: 1800 },
    { text: '> focus', color: 'var(--color-accent)', delay: 2100 },
    { text: 'Multiplayer architecture · Zenject · UniRx', delay: 2300 },
    { text: '> status', color: 'var(--color-accent)', delay: 2700 },
    { text: 'Open to new projects ✓', color: '#4ade80', delay: 2900 },
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          className="text-2xl font-bold mb-12"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            {tr.about.index}
          </span>
          {tr.about.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-lg p-6 space-y-2"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
            <span className="font-mono text-xs ml-2" style={{ color: 'var(--color-muted)' }}>terminal</span>
          </div>

          {started && lines.map((line, i) => (
            <TerminalLine key={i} text={line.text} delay={line.delay} color={line.color} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
