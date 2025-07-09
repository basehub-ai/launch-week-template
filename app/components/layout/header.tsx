import * as React from 'react'

import { Icon } from 'basehub/react-icon'
import { Pump } from 'basehub/react-pump'

export const Header = async () => {
  return (
    <Pump
      queries={[
        {
          header: {
            logo: true,
            links: {
              items: {
                _id: true,
                _title: true,
                href: true,
                target: true
              }
            }
          },
          days: {
            days: {
              __args: { orderBy: 'date__ASC' },
              items: { _id: true, _title: true, date: true }
            },
            lockedDay: true,
            unlockedDay: true
          }
        }
      ]}
    >
      {async ([
        {
          header,
          days: { days, lockedDay, unlockedDay }
        }
      ]) => {
        'use server'

        return (
          <header>
            <div className="h-header max-w-7xl flex flex-nowrap items-center justify-between gap-x-5 mx-auto px-4">
              {/* left side */}
              <div className="flex items-center gap-x-2.5">
                <Icon
                  content={header.logo}
                  components={{
                    svg: (props) => <svg {...props} className="text-dim" />
                  }}
                />
                {Boolean(header.links.items.length) && (
                  <div className="flex items-center gap-x-2">
                    &ndash;
                    {header.links.items.map((link) => (
                      <a
                        key={link._id}
                        href={link.href}
                        target={link.target || '_self'}
                        className="text-faint hover:underline font-semibold text-xs"
                      >
                        {link._title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* right side */}
              <div className="flex items-center gap-x-1 font-semibold">
                {days.items.map((day, index) => (
                  <React.Fragment key={day._id}>
                    <Icon content={false ? unlockedDay : lockedDay} />
                    <p key={day._id} className="text-xs">
                      {day._title || `Day ${index + 1}`}
                    </p>
                    {index < days.items.length - 1 && (
                      <span
                        style={{
                          background:
                            'linear-gradient(to right, transparent 50%, var(--color-faint) 50%)',
                          backgroundSize: '4px 2px'
                        }}
                        className="h-px w-8"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </header>
        )
      }}
    </Pump>
  )
}
