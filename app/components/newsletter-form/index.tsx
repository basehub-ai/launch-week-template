'use client'

import * as React from 'react'

import { Icon } from 'basehub/react-icon'
import { FormState, subscribe } from './action'
import { CountdownInput } from './fragment'

const INITIAL_STATE: FormState = { success: true }

export const NewsletterForm = ({ input }: { input: CountdownInput }) => {
  const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({})
  const [subscribedEmail, setSubscribedEmail] = React.useState<string | null>(
    null
  )

  const [state, formAction] = React.useActionState(
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
        input.emailSubscriptions.schema.map((i) => [i.name, ''])
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
    <>
      <form action={formAction}>
        {input.emailSubscriptions.schema.map((i) => {
          return (
            <React.Fragment key={i.id}>
              <label htmlFor={i.id} className="text-sm font-medium opacity-80">
                {i.label}
              </label>
              <div className="dashed">
                <div className="flex h-8">
                  <input
                    autoFocus
                    {...i}
                    ref={(el) => {
                      inputRefs.current[i.name] = el
                    }}
                    onChange={handleChange}
                    value={formValues[i.name]}
                    className="px-3 py-2 flex-1 placeholder:text-foreground bg-base placeholder:opacity-80"
                  />

                  <div className="flex dashed !pr-0 !py-0">
                    <button
                      disabled={!formValues[i.name]}
                      className="p-2 focus-visible:border-l-transparent bg-accent text-label disabled:bg-shade-hover disabled:text-foreground"
                    >
                      <Icon
                        content={input.iconButton}
                        components={{
                          svg: (props) => (
                            <svg {...props} className="size-3.5" />
                          )
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {!state.success && state.errors[i.name] ? (
                <div className="text-red-500 text-sm mt-2">
                  {state.errors[i.name]}
                </div>
              ) : (
                <>
                  {!!subscribedEmail && (
                    <div className="text-green-500 rounded text-sm mt-2">
                      Subscribed with <strong>{subscribedEmail}</strong>
                    </div>
                  )}
                </>
              )}
            </React.Fragment>
          )
        })}
      </form>
    </>
  )
}
