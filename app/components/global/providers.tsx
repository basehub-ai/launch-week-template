import * as React from 'react'
import { Pump } from 'basehub/react-pump'
import { ClientProvider } from './client-provider'

export const Providers = async ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Pump
      queries={[
        {
          site: {
            days: {
              __args: { orderBy: 'date__ASC' as const },
              item: { date: true }
            }
          }
        }
      ]}
    >
      {async ([
        {
          site: {
            days: { item }
          }
        }
      ]) => {
        'use server'

        const endDate = item?.date ? new Date(item.date) : new Date()

        return (
          <ClientProvider startDate={new Date()} endDate={endDate}>
            {children}
          </ClientProvider>
        )
      }}
    </Pump>
  )
}
