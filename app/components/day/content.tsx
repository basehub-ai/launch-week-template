import { Pump } from 'basehub/react-pump'
import { Container } from '../global/container'
import { DayDivider } from './divider'

import { Heading } from '../heading'
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
                links: {
                  _id: true,
                  _title: true,
                  href: true,
                  target: true,
                  label: true
                },
                content: {
                  json: {
                    content: true
                  }
                }
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
        }
      ]) => {
        'use server'

        if (!day) {
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
                {(day.links ?? []).map((link) => {
                  return (
                    <Link
                      key={link._id}
                      href={link.href}
                      label={link?.label || link._title}
                    />
                  )
                })}
              </div>
            </div>

            {!!day.description && (
              <p className="normal-case leading-snug mt-2">{day.description}</p>
            )}

            <Body content={day.content.json.content} />

            <DayDivider>
              end of {!isLastDay ? day._title : 'ai week'}
            </DayDivider>

            {isLastDay && <Manifesto />}
          </Container>
        )
      }}
    </Pump>
  )
}
