import * as React from 'react'
import clsx from 'clsx'

import { Pump } from 'basehub/react-pump'
import { Countdown, CountdownOrLinkToDay } from './components/countdown'
import { RichText } from 'basehub/react-rich-text'
import { NewsletterForm } from './components/newsletter-form'
import { newsletterFragment } from './components/newsletter-form/fragment'
import { DayContent } from './components/day/content'

import { Container } from './components/global/container'
import { dayFragment } from './components/day/fragment'
import { ClientProvider } from './components/global/client-provider'

export default async function Home() {
  return (
    <Pump
      queries={[
        {
          icons: {
            paperPlane: true
          },
          newsletter: newsletterFragment,
          site: {
            countdown: {
              title: {
                json: {
                  content: true
                }
              },
              overtitle: true
            },
            days: { items: dayFragment }
          }
        },
        {
          site: {
            days: {
              __args: {
                orderBy: 'date__ASC' as const,
                filter: { isPublished: false },
                first: 1
              },
              item: {
                _title: true,
                date: true
              }
            }
          }
        }
      ]}
    >
      {async ([
        {
          icons: { paperPlane },
          newsletter: { emailSubscriptions },
          site
        },
        {
          site: {
            days: { item: upcomingDay }
          }
        }
      ]) => {
        'use server'

        const publishedDays = site.days.items.filter((day) => day.isPublished)

        return (
          <main>
            <Container
              className={clsx(
                'mx-auto flex flex-col gap-6 row-start-2 pt-[140px]',
                publishedDays.length > 0 &&
                  '2xl:h-[768px] pb-40 lg:pt-52 2xl:pt-64'
              )}
            >
              <div className="max-w-[291px] mx-auto w-full">
                <CountdownOrLinkToDay
                  days={publishedDays}
                  overtitle={site.countdown.overtitle}
                />
                <h1 className="font-semibold mb-6 text-dim text-xl">
                  <RichText components={{ p: (props) => <p {...props} /> }}>
                    {site.countdown.title.json.content}
                  </RichText>
                </h1>
              </div>

              <NewsletterForm
                iconButton={paperPlane}
                subscriptions={{ emailSubscriptions }}
                className="max-w-[291px] mx-auto w-full"
                autoFocus={publishedDays.length === 0}
              />
            </Container>

            {publishedDays.map((day, index) => {
              return (
                <DayContent
                  key={day._id}
                  dayId={day._id}
                  isLastDay={index === site.days.items.length - 1}
                />
              )
            })}

            {!!upcomingDay && publishedDays.length !== 0 && (
              <ClientProvider
                startDate={new Date()}
                endDate={
                  upcomingDay?.date ? new Date(upcomingDay.date) : new Date()
                }
              >
                <Container>
                  <div className="dashed">
                    <div className="p-6 lg:p-10 binary">
                      <div className="dashed">
                        <div className="p-6 lg:px-10 lg:py-8 bg-background flex flex-col gap-8 md:flex-row justify-between md:items-center">
                          <p className="underline decoration-dashed text-dim font-bold text-base">
                            {upcomingDay._title} starts in <Countdown />
                          </p>
                          <NewsletterForm
                            subscriptions={{ emailSubscriptions }}
                            iconButton={paperPlane}
                            className="max-w-[252px] w-full pb-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </ClientProvider>
            )}
          </main>
        )
      }}
    </Pump>
  )
}
