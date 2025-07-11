'use client'

import * as React from 'react'

import { useCountdownStore } from '@bsmnt/drop'
import { Day } from './day/fragment'
import { getCurrentDay } from '../utils/days'

export const Countdown = () => {
  const [hydrated, setHydrated] = React.useState(false)
  const remaining = useCountdownStore()((s) => s.humanTimeRemaining)

  const formattedTimeLeft = React.useMemo(() => {
    const { days, hours, minutes, seconds } = remaining
    const format = (num: number | string) =>
      typeof num === 'string' ? parseInt(num) : num < 10 ? `0${num}` : `${num}`
    return `${format(days)}d ${format(hours)}h ${format(minutes)}m ${format(
      seconds
    )}s`
  }, [remaining])

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {hydrated ? formattedTimeLeft : <br />}
    </span>
  )
}

export const CountdownOrLinkToDay = ({
  overtitle,
  days
}: {
  overtitle: string
  days: Day[]
}) => {
  const hasCountdown = Boolean(overtitle?.includes(`{{countdown}}`))
  const hasStarted = useCountdownStore()((s) => s.isComplete)
  const currentDay = getCurrentDay(days)

  return (
    <h3 className="text-accent italic font-medium mb-1">
      {hasStarted && currentDay ? (
        <>
          {currentDay?._title}: {currentDay?.name}
        </>
      ) : (
        !!hasCountdown && (
          <>
            {overtitle.split(`{{countdown}}`).map((seg, index) => (
              <React.Fragment key={seg + index}>
                {index === 1 && <Countdown />}
                <span>{seg}</span>
              </React.Fragment>
            ))}
          </>
        )
      )}
    </h3>
  )
}
