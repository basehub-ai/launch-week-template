import * as React from 'react'
import { Pump } from 'basehub/react-pump'
import { ClientProvider } from './client-provider'
import { launchFragment } from '@/app/fragments/launch'

export const Providers = async ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Pump queries={[{ days: { days: launchFragment } }]}>
      {async ([
        {
          days: {
            days: { items }
          }
        }
      ]) => {
        'use server'

        const startDate = items?.[0]?.date
          ? new Date(items[0].date)
          : new Date()
        const endDate = items?.[items.length - 1]?.date
          ? new Date(items[items.length - 1].date)
          : new Date()

        return (
          <ClientProvider startDate={startDate} endDate={endDate}>
            {children}
          </ClientProvider>
        )
      }}
    </Pump>
  )
}
