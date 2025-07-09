import * as React from 'react'

import { Pump } from 'basehub/react-pump'
import { Countdown } from './components/countdown'
import { RichText } from 'basehub/react-rich-text'
import { NewsletterForm } from './components/newsletter-form'
import { countdownInputFragment } from './components/newsletter-form/fragment'

export default async function Home() {
  return (
    <Pump
      queries={[
        {
          site: {
            countdown: {
              input: countdownInputFragment,
              title: {
                json: {
                  content: true
                }
              },
              overtitle: true
            }
          }
        }
      ]}
    >
      {async ([{ site }]) => {
        'use server'

        const hasCountdown = Boolean(
          site.countdown.overtitle?.includes(`{{countdown}}`)
        )

        return (
          <main>
            <div className="max-w-[291px] mx-auto flex flex-col gap-6 row-start-2 pt-[140px]">
              <div>
                <p className="text-accent italic font-medium mb-1">
                  {!!hasCountdown &&
                    site.countdown.overtitle
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
                <h1 className="font-semibold mb-6 text-dim text-xl">
                  <RichText components={{ p: (props) => <p {...props} /> }}>
                    {site.countdown.title.json.content}
                  </RichText>
                </h1>
              </div>

              <NewsletterForm input={site.countdown.input} />
            </div>
          </main>
        )
      }}
    </Pump>
  )
}
