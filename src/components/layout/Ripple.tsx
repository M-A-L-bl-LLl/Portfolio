import { useEffect } from 'react'

export default function Ripple() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest('button, a') as HTMLElement
      if (!btn) return

      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const ripple = document.createElement('span')

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(139,92,246,0.25);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.55s ease-out forwards;
        pointer-events: none;
        z-index: 10;
      `

      const pos = window.getComputedStyle(btn).position
      if (pos === 'static') btn.style.position = 'relative'
      btn.style.overflow = 'hidden'
      btn.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
