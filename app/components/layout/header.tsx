import * as React from 'react'

import { Icon } from 'basehub/react-icon'
import { Pump } from 'basehub/react-pump'
import Link from 'next/link'
import clsx from 'clsx'
import { Container } from '../global/container'

export const Header = async () => {
  const date = new Date()

  return (
    <Pump
      queries={[
        {
          header: {
            logo: true,
            title: true,
            links: {
              items: {
                _id: true,
                _title: true,
                href: true,
                target: true
              }
            }
          },
          site: {
            days: {
              __args: { orderBy: 'date__ASC' },
              items: { _id: true, _title: true, date: true }
            }
          },
          icons: {
            lockedDay: true,
            unlockedDay: true
          }
        }
      ]}
    >
      {async ([
        {
          header,
          site: { days },
          icons: { lockedDay, unlockedDay }
        }
      ]) => {
        'use server'

        const currentDay = days.items.find(
          (day) => new Date(day.date).getDate() === date.getDate()
        )

        return (
          <header
            className="sticky top-0"
            style={{
              background:
                'linear-gradient(180deg, var(--color-background) 30.29%, rgba(var(--background-raw), 0.70) 60.58%, rgba(var(--background-raw), 0.00) 100%)'
              // backdropFilter: 'blur(0px)'
            }}
          >
            <Container className="min-h-header flex flex-col lg:flex-row lg:flex-nowrap items-center justify-between gap-x-5">
              {/* left/top side */}
              <div className="flex items-center flex-wrap gap-x-2 pt-4 pb-4 justify-between lg:justify-start w-full lg:w-auto">
                <span className="flex items-center gap-x-2">
                  <Icon
                    content={header.logo}
                    components={{
                      svg: (props) => <svg {...props} className="text-dim" />
                    }}
                  />
                  <span className="text-sm font-semibold text-dim whitespace-nowrap">
                    {header.title}
                  </span>
                </span>
                {Boolean(header.links.items.length) && (
                  <div className="flex items-center gap-x-4 lg:gap-x-2">
                    <span className="hidden lg:block">&ndash;</span>
                    {header.links.items.map((link) => (
                      <Link
                        key={link._id}
                        href={link.href}
                        target={link.target || '_self'}
                        className="text-faint hover:underline font-semibold text-sm"
                      >
                        {link._title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between lg:items-center gap-x-1.5 font-medium pb-8 lg:pb-0 w-full lg:max-w-min">
                {days.items.map((day, index) => {
                  const dayHasPassed = new Date(day.date) < date
                  const isCurrentDay = currentDay?._id === day._id

                  return (
                    <React.Fragment key={day._id}>
                      <div className="flex flex-col md:flex-row items-center gap-x-1">
                        {isCurrentDay ? (
                          <span className="size-1.5 rounded-full bg-accent mx-1" />
                        ) : (
                          <Icon
                            content={dayHasPassed ? unlockedDay : lockedDay}
                          />
                        )}
                        <p
                          key={day._id}
                          className={clsx(
                            isCurrentDay && 'text-accent',
                            'text-sm whitespace-nowrap text-center'
                          )}
                        >
                          {day._title || `Day ${index + 1}`}
                        </p>
                      </div>
                      {index < days.items.length - 1 && (
                        <span className="divider basis-8 sm:basis-12 lg:w-8 mb-2.5 lg:mb-0" />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </Container>
          </header>
        )
      }}
    </Pump>
  )
}
