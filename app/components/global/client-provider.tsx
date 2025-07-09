'use client'

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
  return (
    <CountdownProvider startDate={startDate} endDate={endDate}>
      {children}
    </CountdownProvider>
  )
}
