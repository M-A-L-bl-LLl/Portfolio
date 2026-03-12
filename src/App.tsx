import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CursorGlow from './components/layout/CursorGlow'
import Cursor from './components/layout/Cursor'
import Scanlines from './components/layout/Scanlines'
import FloatingParticles from './components/layout/FloatingParticles'
import XPPopup from './components/layout/XPPopup'
import ClickCombo from './components/layout/ClickCombo'
import Ripple from './components/layout/Ripple'
import LoadingScreen from './components/layout/LoadingScreen'
import GameButton from './components/layout/GameButton'
import IdleEaster from './components/layout/IdleEaster'
import PixelSounds from './components/layout/PixelSounds'
import LevelUp from './components/layout/LevelUp'
import SoundToggle from './components/layout/SoundToggle'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <LoadingScreen />
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
          <FloatingParticles />
          <Scanlines />
          <CursorGlow />
          <Cursor />
          <Ripple />
          <XPPopup />
          <ClickCombo />
          <IdleEaster />
          <PixelSounds />
          <LevelUp />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
          </main>
          <Footer />
          <GameButton />
          <SoundToggle />
        </div>
      </HashRouter>
    </LanguageProvider>
  )
}
