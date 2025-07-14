'use server'

import { basehub, fragmentOn } from 'basehub'
import { parseFormData, sendEvent } from 'basehub/events'
import { newsletterFragment } from './fragment'

/**
 * Handles newsletter subscription.
 * @param formData FormData from the client
 * @returns {Promise<{ error?: string }>}
 */
export async function subscribe(data: FormData): Promise<FormState> {
  const {
    newsletter: {
      emailSubscriptions: { ingestKey, schema }
    }
  } = await basehub().query({
    newsletter: newsletterFragment
  })
  const parsed = parseFormData(ingestKey, schema, data)

  if (!parsed.success) {
    return { success: false, errors: parsed.errors }
  }

  await sendEvent(ingestKey, parsed.data)

  return { success: true }
}

export type FormState =
  | {
      success: false
      errors: Record<string, string>
    }
  | {
      success: true
    }
