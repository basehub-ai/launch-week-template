'use client'

import * as React from 'react'

import { CountdownProvider } from '@bsmnt/drop'

export const ClientProvider = ({
  children,
  startDate,
  endDate
}: {
  children: React.ReactNode
  startDate: Date
  endDate: Date
}) => {
  React.useEffect(() => {
    const headingForThisDay = document.querySelectorAll<HTMLHeadingElement>(
      'h1[data-day-heading], h2[data-day-heading], h3[data-day-heading], h4[data-day-heading], h5[data-day-heading], h6[data-day-heading]'
    )
    const lastDayHeading = headingForThisDay[headingForThisDay.length - 1]

    if (lastDayHeading) {
      lastDayHeading.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
  }, [])

  return (
    <CountdownProvider startDate={startDate} endDate={endDate}>
      {children}
    </CountdownProvider>
  )
}
