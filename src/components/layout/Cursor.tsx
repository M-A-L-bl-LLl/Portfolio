import { useEffect, useRef, useState } from 'react'

const SIZE = 32
const HALF = SIZE / 2
const SPREAD = 9   // расстояние уголков от центра
const ARM = 6      // длина каждой стороны уголка
const SW = 1.5     // толщина линий

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest('button, a, input, textarea, [role="button"]')
      setHovered(!!el)
    }
    function onDown() { setClicked(true) }
    function onUp() { setClicked(false) }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const color = hovered ? '#8b5cf6' : 'rgba(226,224,240,0.88)'
  const spread = hovered ? SPREAD + 2 : SPREAD

  // Четыре уголка: top-left, top-right, bottom-right, bottom-left
  const corners = [
    // top-left: горизонталь вправо, вертикаль вниз
    `M ${HALF - spread} ${HALF - spread + ARM} L ${HALF - spread} ${HALF - spread} L ${HALF - spread + ARM} ${HALF - spread}`,
    // top-right: горизонталь влево, вертикаль вниз
    `M ${HALF + spread} ${HALF - spread + ARM} L ${HALF + spread} ${HALF - spread} L ${HALF + spread - ARM} ${HALF - spread}`,
    // bottom-right: горизонталь влево, вертикаль вверх
    `M ${HALF + spread} ${HALF + spread - ARM} L ${HALF + spread} ${HALF + spread} L ${HALF + spread - ARM} ${HALF + spread}`,
    // bottom-left: горизонталь вправо, вертикаль вверх
    `M ${HALF - spread} ${HALF + spread - ARM} L ${HALF - spread} ${HALF + spread} L ${HALF - spread + ARM} ${HALF + spread}`,
  ]

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
        marginLeft: -HALF,
        marginTop: -HALF,
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          display: 'block',
          overflow: 'visible',
          transform: clicked ? 'scale(1.6)' : 'scale(1)',
          transition: clicked ? 'transform 0.08s ease-out' : 'transform 0.2s ease-out',
        }}
      >
        <defs>
          <filter id="bracket-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={hovered ? '2.5' : '1.2'} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#bracket-glow)" style={{ transition: 'all 0.15s' }}>
          {corners.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={hovered ? SW + 0.5 : SW}
              strokeLinecap="square"
            />
          ))}

          {/* Центральная точка */}
          <circle cx={HALF} cy={HALF} r={hovered ? 2 : 1.2} fill={color} />
        </g>
      </svg>
    </div>
  )
}
