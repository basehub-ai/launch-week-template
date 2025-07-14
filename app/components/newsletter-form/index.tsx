'use client'

import * as React from 'react'
import { useId } from '@radix-ui/react-id'

import { clsx } from 'clsx'
import { Icon } from 'basehub/react-icon'
import { FormState, subscribe } from './action'
import { NewsletterSubscriptions } from './fragment'

const INITIAL_STATE: FormState = { success: true }

export const NewsletterForm = ({
  iconButton,
  subscriptions: { emailSubscriptions },
  className = ''
}: {
  iconButton: string
  subscriptions: NewsletterSubscriptions
  className?: string
}) => {
  const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({})
  const [subscribedEmail, setSubscribedEmail] = React.useState<string | null>(
    null
  )

  const [state, formAction, isPending] = React.useActionState(
    async (_: FormState, formData: FormData) => {
      const result = await subscribe(formData)

      if (result.success) {
        const email = formData.get('email') as string
        localStorage.setItem('subscribedEmail', email)
        setSubscribedEmail(email)
      }

      return result
    },
    INITIAL_STATE
  )

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('subscribedEmail')
    if (savedEmail) {
      setSubscribedEmail(savedEmail)
    }
  }, [])

  const [formValues, setFormValues] = React.useState(
    () =>
      Object.fromEntries(
        emailSubscriptions.schema.map((i) => [i.name, ''])
      ) as Record<string, string>
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  React.useEffect(() => {
    if (!state.success && state.errors) {
      const firstErrorKey = Object.keys(state.errors)[0]
      const ref = inputRefs.current[firstErrorKey]
      if (ref) {
        ref.select()
      }
    }
  }, [state])

  return (
    <form
      action={formAction}
      className={clsx('relative overflow-x-clip', className)}
    >
      {emailSubscriptions.schema.map((i) => {
        const inputId = i.id + '-' + useId()

        return (
          <React.Fragment key={i.id}>
            <label
              htmlFor={inputId}
              className="text-sm font-medium opacity-80 pb-2 flex items-center"
            >
              {i.label}
            </label>
            <div className="dashed">
              <div className="flex h-8">
                <input
                  autoFocus
                  {...i}
                  id={inputId}
                  ref={(el) => {
                    inputRefs.current[i.name] = el
                  }}
                  onChange={handleChange}
                  value={formValues[i.name]}
                  className="px-3 py-2 flex-1 placeholder:text-foreground xl:text-sm bg-base placeholder:opacity-80"
                  required
                />

                <div className="flex dashed !pr-0 !py-0">
                  <button
                    disabled={!formValues[i.name] || isPending}
                    className={clsx(
                      'p-2 focus-visible:border-l-transparent bg-accent text-label',
                      isPending
                        ? 'disabled:opacity-50'
                        : 'disabled:bg-shade-hover disabled:text-foreground'
                    )}
                  >
                    <Icon
                      content={iconButton}
                      components={{
                        svg: (props) => <svg {...props} className="size-3.5" />
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {!state.success && state.errors[i.name] ? (
              <div className="text-red-500 text-sm mt-2 absolute overflow-hidden text-ellipsis w-full">
                {state.errors[i.name]}
              </div>
            ) : (
              <>
                {!!subscribedEmail && (
                  <div className="text-green-500 rounded text-sm mt-2 absolute whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    Subscribed with{' '}
                    <strong className="break-words">{subscribedEmail}</strong>
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        )
      })}
    </form>
  )
}
