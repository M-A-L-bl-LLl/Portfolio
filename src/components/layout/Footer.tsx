import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { tr, lang } = useLanguage()

  return (
    <footer
      className="py-8 text-center text-sm"
      style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
    >
      <p>© {new Date().getFullYear()} {lang === 'ru' ? 'Лосев Денис' : 'Losev Denis'} — {tr.footer}</p>
    </footer>
  )
}
