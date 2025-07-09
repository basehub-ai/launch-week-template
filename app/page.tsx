import * as React from 'react'

import { Pump } from 'basehub/react-pump'
import { Icon } from 'basehub/react-icon'
import { Countdown } from './components/countdown'
import { RichText } from 'basehub/react-rich-text'

export default async function Home() {
  return (
    <Pump
      queries={[
        {
          countdown: {
            input: {
              label: true,
              placeholder: true,
              iconButton: true
            },
            title: {
              json: {
                content: true
              }
            },
            overtitle: true
          }
        }
      ]}
    >
      {async ([{ countdown }]) => {
        'use server'

        const hasCountdown = Boolean(
          countdown?.overtitle?.includes(`{{countdown}}`)
        )

        return (
          <main>
            <div className="max-w-[291px] mx-auto flex flex-col gap-6 row-start-2 pt-[140px]">
              <div>
                <p className="text-accent italic font-medium mb-1">
                  {!!hasCountdown &&
                    countdown.overtitle
                      ?.split(`{{countdown}}`)
                      .map((seg, index) => {
                        return (
                          <React.Fragment key={seg + index}>
                            {index === 1 && <Countdown />}
                            <span>{seg}</span>
                          </React.Fragment>
                        )
                      })}
                </p>
                <h1 className="font-semibold mb-6 text-dim">
                  <RichText components={{ p: (props) => <p {...props} /> }}>
                    {countdown.title.json.content}
                  </RichText>
                </h1>
              </div>

              <form>
                <label
                  htmlFor="waitlist-input"
                  className="text-xs font-medium opacity-80"
                >
                  {countdown.input.label}
                </label>
                <div className="dashed">
                  <div className="flex h-8">
                    <input
                      autoFocus
                      id="waitlist-input"
                      placeholder={countdown.input.placeholder ?? undefined}
                      className="px-3 py-2 flex-1 placeholder:text-foreground text-xs bg-base placeholder:opacity-80"
                      type="email"
                    />

                    <div className="flex dashed !pr-0 !py-0">
                      <button
                        // disabled
                        className="p-2 focus-visible:border-l-transparent bg-accent text-label disabled:bg-shade-hover disabled:text-foreground"
                      >
                        <Icon
                          content={countdown.input.iconButton}
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
              </form>
            </div>
          </main>
        )
      }}
    </Pump>
  )
}
