import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useScramble } from '../../hooks/useScramble'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function ScrambleText({ text, className, style }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const displayed = useScramble(text, inView)

  return (
    <span ref={ref} className={className} style={style}>
      {displayed}
    </span>
  )
}
