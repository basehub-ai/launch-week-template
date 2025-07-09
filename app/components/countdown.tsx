'use client'

import * as React from 'react'

import { useCountdownStore } from '@bsmnt/drop'

export const Countdown = () => {
  const remaining = useCountdownStore()((s) => s.humanTimeRemaining)

  const formattedTimeLeft = React.useMemo(() => {
    const { days, hours, minutes, seconds } = remaining
    const format = (num: number | string) =>
      typeof num === 'string' ? parseInt(num) : num < 10 ? `0${num}` : `${num}`
    return `${format(days)}d ${format(hours)}h ${format(minutes)}m ${format(
      seconds
    )}s`
  }, [remaining])

  return <span className="tabular-nums">{formattedTimeLeft}</span>
}
