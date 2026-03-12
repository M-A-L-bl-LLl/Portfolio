import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { experienceData } from '../../i18n/translations'
import ScrambleText from '../ui/ScrambleText'

export default function Experience() {
  const { tr, lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = experienceData[lang]

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          className="text-2xl font-bold mb-12"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            {tr.experience.index}
          </span>
          <ScrambleText text={tr.experience.title} />
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="sm:pl-8 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[3px] hidden sm:block"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                    {item.role}
                  </h3>
                  <span className="text-sm" style={{ color: 'var(--color-accent)' }}>
                    {'link' in item && item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        @ {item.company}
                      </a>
                    ) : (
                      `@ ${item.company}`
                    )}
                  </span>
                </div>

                <p className="text-xs font-mono mb-3" style={{ color: 'var(--color-muted)' }}>
                  {item.period} · {item.duration}
                </p>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
