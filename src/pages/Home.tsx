import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Skills from '../components/sections/Skills'
import GameQuote from '../components/sections/GameQuote'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!id) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
    return () => clearTimeout(timer)
  }, [location.state])

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <GameQuote />
    </>
  )
}
