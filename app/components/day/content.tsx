import { Pump } from 'basehub/react-pump'
import { RichText } from 'basehub/react-rich-text'
import { Container } from '../global/container'
import Link from 'next/link'

export const DayContent = async ({ dayId }: { dayId: string }) => {
  const date = new Date()

  return (
    <Pump
      queries={[
        {
          site: {
            days: {
              __args: {
                filter: {
                  _id: { eq: dayId },
                  date: {
                    isBefore: date.toISOString()
                  }
                },
                first: 1
              },
              item: {
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
        }
      ]}
    >
      {async ([
        {
          site: {
            days: { item }
          }
        }
      ]) => {
        'use server'

        if (!item || !('content' in item)) return null

        return (
          <Container>
            <div className="flex justify-between">
              <h2 className="underline tracking-normal decoration-dashed text-dim font-bold">
                {item._title}: {item.name}
              </h2>

              <div className="flex gap-x-6 gap-y-2">
                <Link
                  className="text-accent hover:underline font-semibold"
                  href="#"
                >
                  GO TO BLOG
                  <span className="ml-2">&rarr;</span>
                </Link>
                <Link
                  className="text-accent hover:underline font-semibold"
                  href="#"
                >
                  READ ON X<span className="ml-2">&rarr;</span>
                </Link>
              </div>
            </div>

            {!!item.description && (
              <p className="underline tracking-normal decoration-dashed text-dim font-bold mt-2">
                {item.description}
              </p>
            )}

            <div className="prose max-w-max dark:prose-invert [&>*]:!leading-normal prose-li:my-0 text-foreground normal-case mt-8">
              {/* @ts-ignore */}
              <RichText content={item.content.json.content} />
            </div>

            <hr className="border-0 h-px divider-md mt-14" />
            <p className="-translate-y-1/2 relative left-1/2 -translate-x-1/2 bg-background max-w-max px-4">
              end of {item._title || 'Day'}
            </p>
          </Container>
        )
      }}
    </Pump>
  )
}
