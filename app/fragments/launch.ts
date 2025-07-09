import { fragmentOn } from 'basehub'

export const launchFragment = fragmentOn('Days_1', {
  __args: { orderBy: 'date__ASC' as const, first: 1 },
  item: { date: true }
})
