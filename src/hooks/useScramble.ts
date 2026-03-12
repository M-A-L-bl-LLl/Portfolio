import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$<>/?'

export function useScramble(text: string, trigger: boolean, speed = 35) {
  const [displayed, setDisplayed] = useState(text)

  useEffect(() => {
    if (!trigger) return

    let iteration = 0
    const total = text.length * 4

    const id = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < Math.floor(iteration / 4)) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )
      iteration++
      if (iteration > total) {
        clearInterval(id)
        setDisplayed(text)
      }
    }, speed)

    return () => clearInterval(id)
  }, [trigger, text, speed])

  return displayed
}
