import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import ScrambleText from '../ui/ScrambleText'

const EMAIL = 'lose.den16@gmail.com'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/M-A-L-bl-LLl' },
  { label: 'Telegram', href: 'https://t.me/losevdd' },
  { label: 'Email', href: `mailto:${EMAIL}` },
]

export default function Contact() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  function handleEmailClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            {tr.contact.index}
          </span>
          <ScrambleText text={tr.contact.title} />
        </motion.h2>

        <motion.p
          className="text-base mb-10 max-w-md mx-auto leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {tr.contact.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              onClick={link.href.startsWith('mailto') ? handleEmailClick : undefined}
              className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text)'
              }}
            >
              {link.label === 'Email' && copied ? 'Скопировано!' : link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
