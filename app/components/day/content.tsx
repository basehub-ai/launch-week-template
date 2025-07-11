import { Pump } from 'basehub/react-pump'
import { Container } from '../global/container'
import { DayDivider } from './divider'

import { Heading } from '../heading'
import { ClientProvider } from '../global/client-provider'
import { Countdown } from '../countdown'
import { NewsletterForm } from '../newsletter-form'
import {
  CountdownInput,
  countdownInputFragment
} from '../newsletter-form/fragment'
import { siteOrigin } from '@/constants/routing'
import { Manifesto } from '../manifesto'
import { Body } from '../body'
import { Link } from '../link'

export const DayContent = async ({
  dayId,
  isLastDay
}: {
  dayId: string
  isLastDay?: boolean
}) => {
  return (
    <Pump
      queries={[
        {
          icons: { link: true },
          site: {
            days: {
              __args: {
                orderBy: 'date__ASC' as const,
                filter: {
                  _id: { eq: dayId },
                  isPublished: true
                },
                first: 1
              },
              item: {
                _slug: true,
                _title: true,
                name: true,
                description: true,
                content: {
                  json: {
                    content: true
                  }
                }
              }
            }
          }
        },
        {
          site: {
            countdown: {
              input: countdownInputFragment
            },
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
          icons: { link },
          site: {
            days: { item: day }
          }
        },
        {
          site: {
            countdown: { input },
            days: { item: upcomingDay }
          }
        }
      ]) => {
        'use server'

        if (!day) {
          if (upcomingDay && isLastDay) {
            const endDate = upcomingDay?.date
              ? new Date(upcomingDay.date)
              : new Date()

            return (
              <ClientProvider startDate={new Date()} endDate={endDate}>
                <Container>
                  <div className="dashed">
                    <div className="p-10 binary">
                      <div className="dashed">
                        <div className="px-10 py-8 bg-background flex justify-between items-center">
                          <p className="underline decoration-dashed text-dim font-bold text-sm md:text-base">
                            {upcomingDay._title} starts in <Countdown />
                          </p>
                          <NewsletterForm
                            input={input as CountdownInput}
                            className="max-w-[252px] w-full pb-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </ClientProvider>
            )
          }

          return null
        }

        if (!day.content) {
          return null
        }

        return (
          <Container>
            <div className="flex justify-between items-start">
              <Heading
                as="h2"
                id={day._slug}
                data-day-heading
                link={{
                  svg: link ?? <>&rarr;</>,
                  url: `${siteOrigin}#${day._slug}`
                }}
              >
                {day._title}: {day.name}
              </Heading>

              <div className="flex gap-x-5 md:gap-x-6 gap-y-2 text-xxs md:text-xs 2xl:text-sm">
                <Link href="/blog/" label="Go to Blog" />
                <Link href="#" label="Read on X" />
              </div>
            </div>

            {!!day.description && (
              <p className="normal-case tracking-normal leading-snug mt-2">
                {day.description}
              </p>
            )}

            <Body content={day.content.json.content} />

            <DayDivider>
              end of {!isLastDay ? day._title : 'ai week'}
            </DayDivider>

            <Manifesto />
          </Container>
        )
      }}
    </Pump>
  )
}
