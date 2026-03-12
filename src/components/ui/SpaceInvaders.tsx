import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const T = {
  en: {
    score: 'SCORE:',
    hud: 'ESC: EXIT  R: RESTART',
    win: 'YOU WIN!',
    over: 'GAME OVER',
    restart: 'PRESS R TO RESTART',
    hints: ['← → / A D — MOVE', 'SPACE — SHOOT', 'R — RESTART', 'ESC — EXIT'],
    btnRestart: '[ RESTART ]',
    btnAbort: '[ ABORT MISSION ]',
    abortTitle: 'ABORT MISSION?',
    abortSub: 'Your progress will be lost.',
    confirm: 'CONFIRM',
    cancel: 'CANCEL',
  },
  ru: {
    score: 'СЧЁТ:',
    hud: 'ESC: ВЫХОД  R: РЕСТАРТ',
    win: 'ПОБЕДА!',
    over: 'ИГРА ОКОНЧЕНА',
    restart: 'НАЖМИТЕ R ДЛЯ РЕСТАРТА',
    hints: ['← → / A D — ДВИЖЕНИЕ', 'ПРОБЕЛ — ОГОНЬ', 'R — РЕСТАРТ', 'ESC — ВЫХОД'],
    btnRestart: '[ РЕСТАРТ ]',
    btnAbort: '[ ПРЕРВАТЬ МИССИЮ ]',
    abortTitle: 'ПРЕРВАТЬ МИССИЮ?',
    abortSub: 'Прогресс будет потерян.',
    confirm: 'ПОДТВЕРДИТЬ',
    cancel: 'ОТМЕНА',
  },
}

const W = 640
const H = 480
const COLS = 11
const ROWS = 5
const AW = 26
const AH = 18
const AGX = 20
const AGY = 18
const GRID_X = Math.floor((W - (COLS * (AW + AGX) - AGX)) / 2)
const GRID_Y = 58
const PW = 38
const PH = 20
const PLAYER_Y = H - 50
const PLAYER_SPEED = 210
const PBW = 3
const PBH = 14
const ABW = 4
const ABH = 10
const PB_SPEED = 420
const AB_SPEED = 160
const ALIEN_COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b']
const ALIEN_PTS = [30, 20, 10]

// ── 8-bit sounds ──────────────────────────────────────────────
let _audioCtx: AudioContext | null = null
function getACtx() {
  if (!_audioCtx || _audioCtx.state === 'closed')
    _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  return _audioCtx
}
function tone(freq: number, dur: number, vol = 0.12, freqEnd?: number, type: OscillatorType = 'square') {
  if (localStorage.getItem('sound-muted') === 'true') return
  try {
    const ctx = getACtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + dur)
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
    osc.start(); osc.stop(ctx.currentTime + dur + 0.01)
  } catch {}
}
const sfxShoot    = () => tone(700, 0.08, 0.1, 180)
const sfxKill     = () => tone(280, 0.13, 0.18, 60)
const sfxHit      = () => tone(160, 0.22, 0.22, 55)
const sfxGameOver = () => [440, 330, 220, 110].forEach((f, i) => setTimeout(() => tone(f, 0.18, 0.2), i * 170))
const sfxWin      = () => [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => tone(f, 0.14, 0.18), i * 110))
// ──────────────────────────────────────────────────────────────

type GS = 'playing' | 'dead' | 'win'

interface Alien { x: number; y: number; alive: boolean; type: number }
interface Bullet { x: number; y: number; player: boolean }
interface Block { x: number; y: number; alive: boolean }

function createAliens(): Alien[] {
  const list: Alien[] = []
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      list.push({ x: GRID_X + c * (AW + AGX), y: GRID_Y + r * (AH + AGY), alive: true, type: r === 0 ? 0 : r < 3 ? 1 : 2 })
  return list
}

function createBarriers(): Block[] {
  const list: Block[] = []
  const BX = [110, 230, 350, 470]
  const BY = H - 115
  BX.forEach(bx => {
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 6; c++) {
        if ((r === 0 && (c === 0 || c === 5)) || (r === 3 && (c === 2 || c === 3))) continue
        list.push({ x: bx + c * 10, y: BY + r * 10, alive: true })
      }
  })
  return list
}

function drawAlien(ctx: CanvasRenderingContext2D, x: number, y: number, type: number, frame: number) {
  const col = ALIEN_COLORS[type]
  ctx.fillStyle = col
  if (type === 0) {
    ctx.fillRect(x + 8, y + 4, 10, 8)
    ctx.fillRect(x + 6, y, 2, 4)
    ctx.fillRect(x + 18, y, 2, 4)
    ctx.fillStyle = '#0a0a12'; ctx.fillRect(x + 10, y + 6, 3, 3); ctx.fillRect(x + 15, y + 6, 3, 3)
    ctx.fillStyle = col
    frame === 0 ? (ctx.fillRect(x + 4, y + 12, 4, 4), ctx.fillRect(x + 18, y + 12, 4, 4))
                : (ctx.fillRect(x + 6, y + 14, 4, 4), ctx.fillRect(x + 16, y + 14, 4, 4))
  } else if (type === 1) {
    ctx.fillRect(x + 4, y + 4, 18, 10); ctx.fillRect(x + 8, y, 10, 4)
    ctx.fillStyle = '#0a0a12'; ctx.fillRect(x + 7, y + 6, 4, 4); ctx.fillRect(x + 15, y + 6, 4, 4)
    ctx.fillStyle = col
    frame === 0 ? (ctx.fillRect(x, y + 6, 4, 6), ctx.fillRect(x + 22, y + 6, 4, 6))
                : (ctx.fillRect(x + 2, y + 8, 4, 6), ctx.fillRect(x + 20, y + 8, 4, 6))
  } else {
    ctx.fillRect(x + 2, y + 2, 22, 12); ctx.fillRect(x + 6, y, 14, 2)
    ctx.fillStyle = '#0a0a12'; ctx.fillRect(x + 6, y + 5, 4, 4); ctx.fillRect(x + 16, y + 5, 4, 4)
    ctx.fillStyle = col
    frame === 0
      ? (ctx.fillRect(x, y + 10, 4, 4), ctx.fillRect(x + 8, y + 14, 4, 4), ctx.fillRect(x + 16, y + 14, 4, 4), ctx.fillRect(x + 22, y + 10, 4, 4))
      : (ctx.fillRect(x + 2, y + 12, 4, 4), ctx.fillRect(x + 10, y + 16, 4, 4), ctx.fillRect(x + 14, y + 16, 4, 4), ctx.fillRect(x + 20, y + 12, 4, 4))
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = '#8b5cf6'
  ctx.fillRect(x + 16, PLAYER_Y - 4, 6, 4)
  ctx.fillRect(x + 14, PLAYER_Y, 10, 6)
  ctx.fillRect(x + 8, PLAYER_Y + 6, 22, 8)
  ctx.fillRect(x, PLAYER_Y + 14, PW, 6)
}

interface Props { onClose: () => void; onWin?: () => void }

export default function SpaceInvaders({ onClose, onWin }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const touchKeys = useRef({ left: false, right: false, shoot: false })
  const restartRef = useRef<() => void>(() => {})
  const [confirmAbort, setConfirmAbort] = useState(false)
  const { lang } = useLanguage()
  const langRef = useRef(lang)
  useEffect(() => { langRef.current = lang }, [lang])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return
    const isTouch = window.matchMedia('(pointer: coarse)').matches

    let gs: GS = 'playing'
    let score = 0
    let lives = 3
    let px = W / 2 - PW / 2
    let aliens = createAliens()
    let barriers = createBarriers()
    let bullets: Bullet[] = []
    let dir = 1
    let moveTimer = 0
    let animFrame = 0
    let shootTimer = 0
    let animId: number
    let lastT = 0
    let canShoot = true
    let closeTimer: ReturnType<typeof setTimeout> | null = null

    const keys = new Set<string>()

    function restart() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
      gs = 'playing'; score = 0; lives = 3; px = W / 2 - PW / 2
      aliens = createAliens(); barriers = createBarriers()
      bullets = []; dir = 1; moveTimer = 0; animFrame = 0; shootTimer = 0; canShoot = true
    }

    restartRef.current = restart

    function onKeyDown(e: KeyboardEvent) {
      keys.add(e.code)
      if (e.code === 'Space') e.preventDefault()
      if (e.code === 'Escape') onClose()
      if (e.code === 'KeyR') restart()
    }
    function onKeyUp(e: KeyboardEvent) { keys.delete(e.code) }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    function update(dt: number) {
      if (gs !== 'playing') return
      const alive = aliens.filter(a => a.alive)
      if (alive.length === 0) {
        gs = 'win'
        sfxWin()
        onWin?.()
        closeTimer = setTimeout(() => onClose(), 4000)
        return
      }

      if (keys.has('ArrowLeft') || keys.has('KeyA') || touchKeys.current.left) px = Math.max(0, px - PLAYER_SPEED * dt)
      if (keys.has('ArrowRight') || keys.has('KeyD') || touchKeys.current.right) px = Math.min(W - PW, px + PLAYER_SPEED * dt)

      if ((keys.has('Space') || keys.has('ArrowUp') || keys.has('KeyW') || touchKeys.current.shoot) && canShoot) {
        bullets.push({ x: px + PW / 2 - PBW / 2, y: PLAYER_Y - PBH, player: true })
        canShoot = false
        sfxShoot()
        setTimeout(() => { canShoot = true }, 380)
      }

      // Move bullets
      for (const b of bullets) b.y += (b.player ? -PB_SPEED : AB_SPEED) * dt
      bullets = bullets.filter(b => b.y > -30 && b.y < H + 30)

      // Alien movement
      const speed = Math.max(0.1, 0.75 - (1 - alive.length / (COLS * ROWS)) * 0.62)
      moveTimer += dt
      if (moveTimer >= speed) {
        moveTimer = 0
        animFrame = 1 - animFrame
        let drop = false
        for (const a of alive) {
          if ((dir > 0 && a.x + AW >= W - 8) || (dir < 0 && a.x <= 8)) { drop = true; break }
        }
        if (drop) {
          dir *= -1
          aliens.forEach(a => { if (a.alive) a.y += AH * 0.55 })
        } else {
          aliens.forEach(a => { if (a.alive) a.x += dir * AW * 0.6 })
        }
        for (const a of alive) { if (a.y + AH >= PLAYER_Y - 4) { gs = 'dead'; closeTimer = setTimeout(() => onClose(), 4000); return } }
      }

      // Alien shoot
      shootTimer += dt
      if (shootTimer >= 1.1 && alive.length > 0) {
        shootTimer = 0
        const s = alive[Math.floor(Math.random() * alive.length)]
        bullets.push({ x: s.x + AW / 2 - ABW / 2, y: s.y + AH, player: false })
      }

      // Collisions
      for (const b of bullets) {
        if (b.player) {
          for (const a of aliens) {
            if (!a.alive) continue
            if (b.x < a.x + AW && b.x + PBW > a.x && b.y < a.y + AH && b.y + PBH > a.y) {
              a.alive = false; score += ALIEN_PTS[a.type]; b.y = -9999; sfxKill(); break
            }
          }
          for (const bl of barriers) {
            if (!bl.alive) continue
            if (b.x < bl.x + 10 && b.x + PBW > bl.x && b.y < bl.y + 10 && b.y + PBH > bl.y) {
              bl.alive = false; b.y = -9999; break
            }
          }
        } else {
          if (b.x < px + PW && b.x + ABW > px && b.y + ABH > PLAYER_Y && b.y < PLAYER_Y + PH) {
            b.y = 9999; lives--; sfxHit()
            if (lives <= 0) { gs = 'dead'; sfxGameOver(); closeTimer = setTimeout(() => onClose(), 4000) }
            px = W / 2 - PW / 2
          }
          for (const bl of barriers) {
            if (!bl.alive) continue
            if (b.x < bl.x + 10 && b.x + ABW > bl.x && b.y < bl.y + 10 && b.y + ABH > bl.y) {
              bl.alive = false; b.y = 9999; break
            }
          }
        }
      }
      bullets = bullets.filter(b => b.y > -50 && b.y < H + 50)
    }

    function draw() {
      ctx.fillStyle = '#0a0a12'
      ctx.fillRect(0, 0, W, H)

      // Scanlines
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.07)'
        ctx.fillRect(0, y, W, 1)
      }

      // HUD
      ctx.font = 'bold 13px "JetBrains Mono", monospace'
      ctx.fillStyle = '#8b5cf6'
      const t = T[langRef.current as 'en' | 'ru'] ?? T.en
      ctx.fillText(`${t.score} ${score}`, 18, 26)
      ctx.fillStyle = '#f43f5e'
      ctx.fillText('♥ '.repeat(lives), W / 2 - 30, 26)
      if (!isTouch) {
        ctx.fillStyle = '#6b6a80'
        ctx.fillText(t.hud, W - 195, 26)
      }
      ctx.fillStyle = '#1e1e30'
      ctx.fillRect(0, 36, W, 1)

      // Barriers
      for (const bl of barriers) {
        if (!bl.alive) continue
        ctx.fillStyle = '#4ade80'
        ctx.shadowColor = '#4ade80'; ctx.shadowBlur = 3
        ctx.fillRect(bl.x, bl.y, 9, 9)
        ctx.shadowBlur = 0
      }

      // Aliens
      for (const a of aliens) {
        if (a.alive) drawAlien(ctx, a.x, a.y, a.type, animFrame)
      }

      // Player
      if (gs !== 'dead') drawPlayer(ctx, px)

      // Bullets
      for (const b of bullets) {
        if (b.player) {
          ctx.fillStyle = '#8b5cf6'; ctx.shadowColor = '#8b5cf6'; ctx.shadowBlur = 8
          ctx.fillRect(b.x, b.y, PBW, PBH)
        } else {
          ctx.fillStyle = '#f43f5e'; ctx.shadowColor = '#f43f5e'; ctx.shadowBlur = 8
          ctx.fillRect(b.x, b.y, ABW, ABH)
        }
        ctx.shadowBlur = 0
      }

      // Overlay
      if (gs !== 'playing') {
        ctx.fillStyle = 'rgba(10,10,18,0.78)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.font = 'bold 42px "JetBrains Mono", monospace'
        ctx.fillStyle = gs === 'win' ? '#4ade80' : '#f43f5e'
        ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 20
        ctx.fillText(gs === 'win' ? t.win : t.over, W / 2, H / 2 - 24)
        ctx.shadowBlur = 0
        ctx.font = '15px "JetBrains Mono", monospace'
        ctx.fillStyle = '#e2e0f0'
        ctx.fillText(`${t.score} ${score}`, W / 2, H / 2 + 16)
        ctx.fillStyle = '#8b5cf6'
        ctx.fillText(t.restart, W / 2, H / 2 + 46)
        ctx.textAlign = 'left'
      }
    }

    function loop(t: number) {
      const dt = Math.min((t - lastT) / 1000, 0.05)
      lastT = t
      update(dt)
      draw()
      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(t => { lastT = t; loop(t) })

    return () => {
      cancelAnimationFrame(animId)
      if (closeTimer) clearTimeout(closeTimer)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [onClose])

  const btnStyle: React.CSSProperties = {
    width: 60,
    height: 60,
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(30,30,48,0.9)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'none',
    flexShrink: 0,
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99998,
        backgroundColor: 'rgba(0,0,0,0.88)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          border: '1px solid var(--color-accent)',
          boxShadow: '0 0 50px rgba(139,92,246,0.35)',
          maxWidth: '95vw',
          maxHeight: '82vh',
          imageRendering: 'pixelated',
        }}
      />
      {/* Keyboard hints — hidden on touch */}
      <div style={{ marginTop: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-muted)', display: 'flex', gap: '2rem' }} className="hidden-on-touch">
        {T[lang as 'en' | 'ru'].hints.map((h, i) => <span key={i}>{h}</span>)}
      </div>

      {/* Mobile controls */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '480px',
        padding: '0 1rem',
        gap: '0.5rem',
      }}>
        {/* Left */}
        <button
          onTouchStart={(e) => { e.preventDefault(); touchKeys.current.left = true; e.currentTarget.style.transform = 'scale(0.88)' }}
          onTouchEnd={(e) => { e.preventDefault(); touchKeys.current.left = false; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseDown={(e) => { touchKeys.current.left = true; e.currentTarget.style.transform = 'scale(0.88)' }}
          onMouseUp={(e) => { touchKeys.current.left = false; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseLeave={(e) => { touchKeys.current.left = false; e.currentTarget.style.transform = 'scale(1)' }}
          style={{ ...btnStyle, transition: 'transform 0.1s ease' }}
        >◀</button>

        {/* Shoot */}
        <button
          onTouchStart={(e) => { e.preventDefault(); touchKeys.current.shoot = true; e.currentTarget.style.transform = 'scale(0.88)' }}
          onTouchEnd={(e) => { e.preventDefault(); touchKeys.current.shoot = false; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseDown={(e) => { touchKeys.current.shoot = true; e.currentTarget.style.transform = 'scale(0.88)' }}
          onMouseUp={(e) => { touchKeys.current.shoot = false; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseLeave={(e) => { touchKeys.current.shoot = false; e.currentTarget.style.transform = 'scale(1)' }}
          style={{ ...btnStyle, width: 72, height: 72, fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '10px', backgroundColor: 'rgba(139,92,246,0.25)', borderColor: 'var(--color-accent)', transition: 'transform 0.1s ease' }}
        >🔫</button>

        {/* Right */}
        <button
          onTouchStart={(e) => { e.preventDefault(); touchKeys.current.right = true; e.currentTarget.style.transform = 'scale(0.88)' }}
          onTouchEnd={(e) => { e.preventDefault(); touchKeys.current.right = false; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseDown={(e) => { touchKeys.current.right = true; e.currentTarget.style.transform = 'scale(0.88)' }}
          onMouseUp={(e) => { touchKeys.current.right = false; e.currentTarget.style.transform = 'scale(1)' }}
          onMouseLeave={(e) => { touchKeys.current.right = false; e.currentTarget.style.transform = 'scale(1)' }}
          style={{ ...btnStyle, transition: 'transform 0.1s ease' }}
        >▶</button>
      </div>

      {/* Restart button */}
      <button
        onClick={() => restartRef.current()}
        style={{
          marginTop: '2.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: '#4ade80',
          background: 'rgba(74,222,128,0.08)',
          border: '1px solid rgba(74,222,128,0.4)',
          borderRadius: '0.4rem',
          padding: '0.5rem 1.5rem',
          cursor: 'none',
          transition: 'background 0.2s, box-shadow 0.2s, border-color 0.2s',
          boxShadow: '0 0 8px rgba(74,222,128,0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(74,222,128,0.18)'
          e.currentTarget.style.borderColor = 'rgba(74,222,128,0.8)'
          e.currentTarget.style.boxShadow = '0 0 16px rgba(74,222,128,0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(74,222,128,0.08)'
          e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'
          e.currentTarget.style.boxShadow = '0 0 8px rgba(74,222,128,0.15)'
        }}
      >
        {T[lang as 'en' | 'ru'].btnRestart}
      </button>

      {/* Close button */}
      <button
        onClick={() => setConfirmAbort(true)}
        style={{
          marginTop: '0.75rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: '#f43f5e',
          background: 'rgba(244,63,94,0.08)',
          border: '1px solid rgba(244,63,94,0.4)',
          borderRadius: '0.4rem',
          padding: '0.5rem 1.5rem',
          cursor: 'none',
          transition: 'background 0.2s, box-shadow 0.2s, border-color 0.2s',
          boxShadow: '0 0 8px rgba(244,63,94,0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(244,63,94,0.18)'
          e.currentTarget.style.borderColor = 'rgba(244,63,94,0.8)'
          e.currentTarget.style.boxShadow = '0 0 16px rgba(244,63,94,0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(244,63,94,0.08)'
          e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)'
          e.currentTarget.style.boxShadow = '0 0 8px rgba(244,63,94,0.15)'
        }}
      >
        {T[lang as 'en' | 'ru'].btnAbort}
      </button>

      {/* Confirm popup */}
      {confirmAbort && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'rgba(10,10,18,0.97)',
            border: '1px solid #f43f5e',
            borderRadius: '0.75rem',
            padding: '2rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(244,63,94,0.3)',
            fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            <div style={{ color: '#f43f5e', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              {T[lang as 'en' | 'ru'].abortTitle}
            </div>
            <div style={{ color: 'var(--color-muted)', fontSize: '0.7rem', marginBottom: '1.5rem' }}>
              {T[lang as 'en' | 'ru'].abortSub}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em',
                  color: '#f43f5e', background: 'rgba(244,63,94,0.12)',
                  border: '1px solid rgba(244,63,94,0.5)', borderRadius: '0.4rem',
                  padding: '0.5rem 1.2rem', cursor: 'none',
                }}
              >{T[lang as 'en' | 'ru'].confirm}</button>
              <button
                onClick={() => setConfirmAbort(false)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em',
                  color: '#4ade80', background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.5)', borderRadius: '0.4rem',
                  padding: '0.5rem 1.2rem', cursor: 'none',
                }}
              >{T[lang as 'en' | 'ru'].cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
