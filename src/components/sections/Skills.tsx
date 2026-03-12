import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import ScrambleText from '../ui/ScrambleText'

const SKILL_ALIASES: Record<string, string> = {
  'unity': 'Unity',
  'c#': 'C#',
  'vr': 'VR (OpenXR, Hurricane VR)',
  'openxr': 'VR (OpenXR, Hurricane VR)',
  'shader graph': 'Shader Graph / HLSL',
  'hlsl': 'Shader Graph / HLSL',
  'netcode': 'Unity Netcode',
  'photon': 'Photon',
  'networking': 'Local & Online networking',
  'sync': 'Real-time sync',
  'real-time sync': 'Real-time sync',
  'zenject': 'Zenject (DI)',
  'unirx': 'UniRx',
  'addressables': 'Addressables',
  'mvc': 'MVC / MVVM',
  'mvvm': 'MVC / MVVM',
  'android': 'Android (Google Play)',
  'quest': 'VR (Quest, PC)',
  'vr quest': 'VR (Quest, PC)',
  'ios': 'iOS (App Store)',
  'webgl': 'WebGL (Yandex Games, CrazyGames, Poki)',
  'firebase': 'Firebase',
  'mysql': 'MySQL',
  'gamepush': 'GamePush',
  'metrika': 'Яндекс Метрика',
  'yandex': 'Яндекс Метрика',
  'yandex metrika': 'Яндекс Метрика',
  'яндекс': 'Яндекс Метрика',
  'метрика': 'Яндекс Метрика',
  'яндекс метрика': 'Яндекс Метрика',
  'optimization': 'Optimization',
  'оптимизация': 'Optimization',
  'git': 'Git',
  'ci/cd': 'CI/CD',
  'plasticscm': 'PlasticSCM',
  'figma': 'Figma',
  'rider': 'Rider / VS',
  'claude': 'Claude Code',
}

const TOTAL_TYPEABLE = new Set(Object.values(SKILL_ALIASES)).size

export default function Skills() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [typedInput, setTypedInput] = useState('')
  const [lastUnlocked, setLastUnlocked] = useState('')

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const key = typedInput.trim().toLowerCase()
    const skillName = SKILL_ALIASES[key]
    if (skillName && !unlocked.has(skillName)) {
      setUnlocked(prev => new Set([...prev, skillName]))
      setLastUnlocked(skillName)
      setTimeout(() => setLastUnlocked(''), 1800)
    }
    setTypedInput('')
  }

  const SKILL_GROUPS = [
    { title: tr.skills.groups.core, skills: ['Unity', 'C#', 'VR (OpenXR, Hurricane VR)', 'Shader Graph / HLSL', 'Optimization'] },
    { title: tr.skills.groups.multiplayer, skills: ['Unity Netcode', 'Photon', 'Local & Online networking', 'Real-time sync'] },
    { title: tr.skills.groups.architecture, skills: ['Zenject (DI)', 'UniRx', 'Addressables', 'MVC / MVVM'] },
    { title: tr.skills.groups.platforms, skills: ['Android (Google Play)', 'iOS (App Store)', 'WebGL (Yandex Games, CrazyGames, Poki)', 'VR (Quest, PC)'] },
    { title: tr.skills.groups.backend, skills: ['Firebase', 'MySQL', 'GamePush', 'Яндекс Метрика'] },
    { title: tr.skills.groups.tools, skills: ['Git', 'CI/CD', 'PlasticSCM', 'Figma', 'Rider / VS', 'Claude Code'] },
  ]

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          className="text-2xl font-bold mb-12"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            {tr.skills.index}
          </span>
          <ScrambleText text={tr.skills.title} />
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              className="p-6 rounded-lg"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="text-xs font-mono mb-4" style={{ color: 'var(--color-accent)' }}>
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm flex items-center gap-2"
                    style={{
                      color: unlocked.has(skill) ? 'var(--color-text)' : 'var(--color-muted)',
                      transition: 'color 0.3s',
                    }}
                  >
                    <span className="shrink-0" style={{ color: unlocked.has(skill) ? '#22c55e' : 'var(--color-accent)' }}>
                      {unlocked.has(skill) ? '✓' : '▸'}
                    </span>
                    {skill}
                    {unlocked.has(skill) && (
                      <span style={{
                        fontSize: '0.55rem',
                        color: '#22c55e',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid #22c55e',
                        borderRadius: 3,
                        padding: '1px 4px',
                        letterSpacing: '0.08em',
                        flexShrink: 0,
                      }}>
                          {tr.skills.typing.mastered}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Typing game */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="font-mono text-xs mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '0.12em' }}>
            {tr.skills.typing.hint}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            padding: '8px 14px',
            backgroundColor: 'var(--color-surface)',
            maxWidth: 360,
            transition: 'border-color 0.2s',
            cursor: 'none',
          }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
            onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', flexShrink: 0 }}>{'>'}</span>
            <input
              type="text"
              value={typedInput}
              onChange={e => setTypedInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={tr.skills.typing.placeholder}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                flex: 1,
                cursor: 'none',
              }}
            />
            {lastUnlocked && (
              <span style={{ color: '#22c55e', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {tr.skills.typing.masteredConfirm}
              </span>
            )}
          </div>
          <p className="font-mono text-xs mt-2" style={{ color: 'var(--color-border)' }}>
            {tr.skills.typing.counter(unlocked.size, TOTAL_TYPEABLE)}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
