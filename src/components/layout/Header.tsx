import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import AchievementPopup from '../ui/AchievementPopup'

const NAV_SECTION_IDS = ['about', 'experience', 'skills', 'projects', 'contact']

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function useActiveSection(ids: string[], overrideRef: React.MutableRefObject<string>) {
  const [active, setActive] = useState('')

  useEffect(() => {
    function onScroll() {
      if (overrideRef.current) return

      // Если долистали до конца страницы — активна последняя секция
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (nearBottom) {
        setActive(ids[ids.length - 1])
        return
      }

      const offset = window.innerHeight * 0.4
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= offset && rect.bottom > offset) {
          current = id
          break
        }
      }
      if (!current) {
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i])
          if (el && el.getBoundingClientRect().top <= offset) {
            current = ids[i]
            break
          }
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, overrideRef])

  return [active, setActive] as const
}

export default function Header() {
  const { tr, lang, toggle } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [ping, setPing] = useState(12)
  const [secretVisible, setSecretVisible] = useState(false)
  const [achievement, setAchievement] = useState(false)
  const [xpPopup, setXpPopup] = useState(false)
  const nameClickCount = useRef(0)
  const nameClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleNameClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    nameClickCount.current += 1
    if (nameClickTimer.current) clearTimeout(nameClickTimer.current)
    if (nameClickCount.current >= 3) {
      nameClickCount.current = 0
      setSecretVisible(true)
      setAchievement(true)
      setXpPopup(true)
      setTimeout(() => setSecretVisible(false), 6000)
      setTimeout(() => setAchievement(false), 6000)
      setTimeout(() => setXpPopup(false), 1600)
      return
    }
    nameClickTimer.current = setTimeout(() => { nameClickCount.current = 0 }, 800)
  }

  useEffect(() => {
    const id = setInterval(() => setPing(Math.floor(Math.random() * 18 + 6)), 4000)
    return () => clearInterval(id)
  }, [])
  const [menuOpen, setMenuOpen] = useState(false)
  const navOverride = useRef('')
  const overrideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeSection, setActiveSection] = useActiveSection(NAV_SECTION_IDS, navOverride)

  function handleNavClick(id: string) {
    // Принудительно устанавливаем активную вкладку и блокируем scroll-listener на 800ms
    navOverride.current = id
    setActiveSection(id)
    if (overrideTimer.current) clearTimeout(overrideTimer.current)
    overrideTimer.current = setTimeout(() => { navOverride.current = '' }, 800)

    if (location.pathname === '/') {
      scrollTo(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const NAV_LINKS = [
    { label: tr.nav.about, id: 'about' },
    { label: tr.nav.experience, id: 'experience' },
    { label: tr.nav.skills, id: 'skills' },
    { label: tr.nav.projects, id: 'projects' },
    { label: tr.nav.contact, id: 'contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 18, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-wider"
          style={{ color: 'var(--color-accent)' }}
          onClick={handleNameClick}
        >
          {lang === 'ru' ? 'Лосев Денис' : 'Losev Denis'}<span style={{ color: 'var(--color-muted)' }}>.dev</span>
        </Link>
        {secretVisible && (
          <span style={{
            position: 'fixed',
            top: '4.5rem',
            left: 24,
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 400,
            padding: '0.4rem 0.8rem',
            borderRadius: '0.4rem',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-accent)',
            color: 'var(--color-accent)',
            animation: 'fade-in-down 0.3s ease-out',
            zIndex: 9999,
            pointerEvents: 'none',
          }}>
            {lang === 'ru' ? '👾 Пасхалка найдена!' : '👾 Easter egg found!'}
          </span>
        )}

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-sm transition-colors duration-200 cursor-pointer bg-transparent pb-[3px]"
                  style={{
                    color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--color-text)' : 'var(--color-muted)')}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>

          {/* Online indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: '#22c55e',
              boxShadow: '0 0 6px #22c55e',
              display: 'inline-block',
              animation: 'online-pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#22c55e', letterSpacing: '0.12em' }}>
              ONLINE · <span style={{ display: 'inline-block', minWidth: '2.2em', textAlign: 'left' }}>{ping}ms</span>
            </span>
          </div>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="text-xs font-mono px-2.5 py-1 rounded transition-all duration-200 cursor-pointer"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.color = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            {lang === 'en' ? 'RU' : 'EN'}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-mono px-2 py-1 rounded cursor-pointer"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
          >
            {lang === 'en' ? 'RU' : 'EN'}
          </button>

          <button
            className="p-2 cursor-pointer bg-transparent border-none"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className="block h-px transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--color-text)',
                  transform: menuOpen ? 'translateY(4px) rotate(45deg)' : '',
                }}
              />
              <span
                className="block h-px transition-all duration-300"
                style={{ backgroundColor: 'var(--color-text)', opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-px transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--color-text)',
                  transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : '',
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'rgba(10, 10, 18, 0.97)' }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                onClick={() => { handleNavClick(link.id); setMenuOpen(false) }}
                className="text-sm py-3 px-2 rounded text-left bg-transparent border-none cursor-pointer w-full"
                style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-muted)' }}
              >
                {link.label}
              </button>
            )
          })}
        </nav>
      )}
    </header>

    {achievement && (
      <AchievementPopup title={lang === 'ru' ? '👾 Охотник за пасхалками' : '👾 Easter Egg Hunter'} />
    )}

    {xpPopup && (
      <div style={{
        position: 'fixed',
        top: '35%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        fontFamily: 'var(--font-mono)',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#8b5cf6',
        textShadow: '0 0 12px rgba(139,92,246,0.9), 0 0 24px rgba(139,92,246,0.4)',
        animation: 'xp-float 1.4s ease-out forwards',
        whiteSpace: 'nowrap',
      }}>
        +777 XP
      </div>
    )}
  </>
  )
}
