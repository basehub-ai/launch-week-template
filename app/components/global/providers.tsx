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
    <Pump queries={[{ site: { days: launchFragment } }]}>
      {async ([
        {
          site: {
            days: { item }
          }
        }
      ]) => {
        'use server'

        const startDate = item?.date ? new Date(item.date) : new Date()

        return (
          <ClientProvider startDate={new Date()} endDate={startDate}>
            {children}
          </ClientProvider>
        )
      }}
    </Pump>
  )
}
