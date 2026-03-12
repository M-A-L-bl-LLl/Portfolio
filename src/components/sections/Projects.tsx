import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
import { useLanguage } from '../../context/LanguageContext'
import { projectsData } from '../../i18n/translations'
import ScrambleText from '../ui/ScrambleText'
import { useQuestSystem } from '../../hooks/useQuestSystem'
import type { QuestState } from '../../hooks/useQuestSystem'

function getQuestXP(p: Project) {
  return (p.featured ? 600 : 300) + p.tags.length * 30
}

function TiltCard({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

const STATE_COLORS: Record<QuestState, { badge: string; badgeBorder: string; status: string; statusColor: string }> = {
  completed: { badge: '#22c55e', badgeBorder: '#22c55e', status: '✓ COMPLETED', statusColor: '#22c55e' },
  available: { badge: 'var(--color-accent)', badgeBorder: 'var(--color-accent)', status: '→ AVAILABLE', statusColor: '#fbbf24' },
  locked:    { badge: 'var(--color-border)', badgeBorder: 'var(--color-border)', status: '🔒 LOCKED', statusColor: 'var(--color-border)' },
}

export default function Projects() {
  const { tr, lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const texts = projectsData[lang]
  const { projectState, completedCount, total } = useQuestSystem()
  const [lockedHint, setLockedHint] = useState<string | null>(null)

  const progressPct = Math.round((completedCount / total) * 100)
  const completedLabel = lang === 'ru'
    ? `${completedCount} / ${total} КВЕСТОВ ВЫПОЛНЕНО`
    : `${completedCount} / ${total} QUESTS COMPLETED`

  function handleLockedClick(prevTitle: string) {
    const msg = lang === 'ru'
      ? `Сначала выполни квест: «${prevTitle}»`
      : `Complete quest first: "${prevTitle}"`
    setLockedHint(msg)
    setTimeout(() => setLockedHint(null), 2500)
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            {tr.projects.index}
          </span>
          <ScrambleText text={tr.projects.title} />
        </motion.h2>

        {/* Quest progress */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
              [ QUEST LOG ]
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: completedCount === total ? '#22c55e' : '#fbbf24', letterSpacing: '0.08em' }}>
              {completedLabel}
            </span>
          </div>
          <div style={{ height: '3px', backgroundColor: 'var(--color-border)', borderRadius: 2 }}>
            <div style={{
              height: '100%',
              borderRadius: 2,
              width: `${progressPct}%`,
              background: completedCount === total
                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                : 'linear-gradient(90deg, var(--color-accent), #fbbf24)',
              transition: 'width 0.6s ease',
              boxShadow: completedCount > 0 ? '0 0 8px rgba(139,92,246,0.5)' : 'none',
            }} />
          </div>
        </motion.div>

        {/* Locked hint */}
        {lockedHint && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(18,18,30,0.97)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            animation: 'spring-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}>
            🔒 {lockedHint}
          </div>
        )}

        {projects.length === 0 ? (
          <motion.p
            className="text-sm font-mono"
            style={{ color: 'var(--color-muted)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            {tr.projects.soon}
          </motion.p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project, i) => {
              const localized = texts[project.slug as keyof typeof texts]
              const title = localized?.title ?? project.title
              const shortDescription = localized?.shortDescription ?? project.shortDescription
              const state = projectState(project.slug, i)
              const colors = STATE_COLORS[state]
              const isLocked = state === 'locked'
              const prevTitle = i > 0
                ? (texts[projects[i - 1].slug as keyof typeof texts]?.title ?? projects[i - 1].title)
                : ''

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <TiltCard disabled={isLocked}>
                    {isLocked ? (
                      <div
                        onClick={() => handleLockedClick(prevTitle)}
                        className="block h-full rounded-lg overflow-hidden transition-all duration-300"
                        style={{
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-bg)',
                          opacity: 0.45,
                          cursor: 'not-allowed',
                        }}
                      >
                        {project.coverImage && (
                          <div className="aspect-video overflow-hidden" style={{ filter: 'grayscale(1)' }}>
                            <img src={project.coverImage} alt={title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-5">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: colors.badge, border: `1px solid ${colors.badgeBorder}`, borderRadius: 3, padding: '1px 6px' }}>
                              QUEST
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: colors.statusColor }}>
                              {colors.status}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2 text-base" style={{ color: 'var(--color-muted)' }}>{title}</h3>
                          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{shortDescription}</p>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-border)', letterSpacing: '0.08em' }}>
                            {lang === 'ru' ? 'НАГРАДА' : 'REWARD'}: +{getQuestXP(project)} XP
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="block h-full rounded-lg overflow-hidden transition-all duration-300 group"
                        style={{ border: `1px solid ${state === 'available' ? 'rgba(139,92,246,0.4)' : 'var(--color-border)'}`, backgroundColor: 'var(--color-bg)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = state === 'available' ? 'rgba(139,92,246,0.4)' : 'var(--color-border)')}
                      >
                        {project.coverImage && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={project.coverImage}
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: colors.badge, border: `1px solid ${colors.badgeBorder}`, borderRadius: 3, padding: '1px 6px' }}>
                              QUEST
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: colors.statusColor }}>
                              {lang === 'ru' && state === 'completed' ? '✓ ВЫПОЛНЕНО' : colors.status}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2 text-base" style={{ color: 'var(--color-text)' }}>{title}</h3>
                          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{shortDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded font-mono"
                                style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#fbbf24', letterSpacing: '0.08em' }}>
                            {lang === 'ru' ? 'НАГРАДА' : 'REWARD'}: +{getQuestXP(project)} XP
                          </div>
                        </div>
                      </Link>
                    )}
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
