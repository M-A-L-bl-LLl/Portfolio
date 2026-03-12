import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Lang, t } from '../i18n/translations'

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
  tr: typeof t.en
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  const toggle = () => setLang((l) => (l === 'en' ? 'ru' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
