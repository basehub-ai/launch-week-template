import { fragmentOn } from 'basehub'

export const newsletterFragment = fragmentOn('Newsletter', {
  emailSubscriptions: {
    schema: true,
    ingestKey: true
  }
})

export type NewsletterSubscriptions = fragmentOn.infer<
  typeof newsletterFragment
>
