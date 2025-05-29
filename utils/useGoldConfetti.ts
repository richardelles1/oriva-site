import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function useGoldConfetti() {
  useEffect(() => {
    const duration = 4000
    const end = Date.now() + duration
    const colors = ['#FFD28F', '#FFCC88', '#FEC56B']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 80,
        origin: { x: 0.5, y: 0.3 },
        colors,
        gravity: 0.4,
        scalar: 0.8,
        ticks: 200
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])
}
