import { Pump } from 'basehub/react-pump'
import { Heading } from './heading'
import { Body } from './body'
import { Link } from './link'

export const Manifesto = () => {
  return (
    <Pump
      queries={[
        {
          site: {
            manifesto: {
              title: true,
              body: {
                json: {
                  content: true
                }
              },
              button: {
                href: true,
                label: true
              }
            }
          }
        }
      ]}
    >
      {async ([
        {
          site: {
            manifesto: { title, body, button }
          }
        }
      ]) => {
        'use server'

        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <Heading as="h4">{title}</Heading>
              <Link href={button.href} label={button.label} />
            </div>

            <Body content={body.json.content} />
          </>
        )
      }}
    </Pump>
  )
}
