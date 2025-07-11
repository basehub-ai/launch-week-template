import { fragmentOn } from 'basehub'

export const dayFragment = fragmentOn('DaysItem', {
  _id: true,
  _title: true,
  date: true,
  isPublished: true,
  name: true
})
export type Day = fragmentOn.infer<typeof dayFragment>
