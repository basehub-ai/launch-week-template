import { fragmentOn } from 'basehub'

export const countdownInputFragment = fragmentOn('Input', {
  iconButton: true,
  emailSubscriptions: {
    schema: true,
    ingestKey: true
  }
})
export type CountdownInput = fragmentOn.infer<typeof countdownInputFragment>
