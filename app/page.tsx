import * as React from 'react'

import { Pump } from 'basehub/react-pump'
import { Countdown, CountdownOrLinkToDay } from './components/countdown'
import { RichText } from 'basehub/react-rich-text'
import { NewsletterForm } from './components/newsletter-form'
import { countdownInputFragment } from './components/newsletter-form/fragment'
import { DayContent } from './components/day/content'

import clsx from 'clsx'
import { Container } from './components/global/container'
import { dayFragment } from './components/day/fragment'

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
            },
            days: { items: dayFragment }
          }
        }
      ]}
    >
      {async ([{ site }]) => {
        'use server'

        return (
          <main>
            <Container
              className={clsx(
                'mx-auto flex flex-col gap-6 row-start-2 pt-[140px] pb-32 lg:pt-52 2xl:pt-64',
                site.days.items.length > 0 && '2xl:h-[768px]'
              )}
            >
              <div className="max-w-[291px] mx-auto w-full">
                <CountdownOrLinkToDay
                  days={site.days.items}
                  overtitle={site.countdown.overtitle}
                />
                <h1 className="font-semibold mb-6 text-dim text-xl">
                  <RichText components={{ p: (props) => <p {...props} /> }}>
                    {site.countdown.title.json.content}
                  </RichText>
                </h1>
              </div>

              <NewsletterForm
                input={site.countdown.input}
                className="max-w-[291px] mx-auto w-full"
              />
            </Container>

            {site.days.items.map((day, index) => (
              <DayContent
                key={day._id}
                dayId={day._id}
                isLastDay={index === site.days.items.length - 1}
              />
            ))}
          </main>
        )
      }}
    </Pump>
  )
}
