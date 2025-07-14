import { Day } from '../components/day/fragment'

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>

export const getCurrentDay = <
  DayType extends AtLeast<Day, 'date' | 'isPublished'>
>(
  days: DayType[]
): DayType | null => {
  return days.findLast((day) => day.isPublished) ?? null
}
