import * as React from 'react'

import { Icon } from 'basehub/react-icon'
import { Pump } from 'basehub/react-pump'
import Link from 'next/link'

export const Header = async () => {
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

        return (
          <header>
            <div className="min-h-header max-w-7xl flex flex-col lg:flex-row lg:flex-nowrap items-center justify-between gap-x-5 mx-auto px-4">
              {/* left/top side */}
              <div className="flex items-center flex-wrap gap-x-2 pt-4 pb-4">
                <Icon
                  content={header.logo}
                  components={{
                    svg: (props) => <svg {...props} className="text-dim" />
                  }}
                />
                <span className="text-sm font-semibold text-dim whitespace-nowrap">
                  {header.title}
                </span>
                {Boolean(header.links.items.length) && (
                  <div className="flex items-center gap-x-2">
                    &ndash;
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

              {/* right/bottom side */}
              <div className="flex items-end justify-center lg:items-center gap-x-1 font-medium pb-8 lg:pb-0 w-full max-w-[400px] sm:max-w-min">
                {days.items.map((day, index) => {
                  const dayHasPassed = new Date(day.date) < new Date()

                  return (
                    <React.Fragment key={day._id}>
                      <div className="flex flex-col md:flex-row items-center gap-x-1">
                        <Icon
                          content={dayHasPassed ? unlockedDay : lockedDay}
                        />
                        <p
                          key={day._id}
                          className="text-sm whitespace-nowrap text-center"
                        >
                          {day._title || `Day ${index + 1}`}
                        </p>
                      </div>
                      {index < days.items.length - 1 && (
                        <span
                          style={{
                            background:
                              'linear-gradient(to right, transparent 50%, var(--color-faint) 50%)',
                            backgroundSize: '4px 2px'
                          }}
                          className="h-px basis-8 sm:w-8 mb-2.5 lg:mb-0"
                        />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </header>
        )
      }}
    </Pump>
  )
}
