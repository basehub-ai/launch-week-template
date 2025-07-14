import { basehub } from 'basehub'
import { authenticateWebhook } from 'basehub/workflows'
import { getEvents } from 'basehub/events'
import { resend } from '@/lib/resend'
import { siteOrigin } from '@/constants/routing'
import NewsletterEmail from '@/emails/newsletter'
import { Img, Link } from '@react-email/components'

const dryRun = false
export const POST = async (request: Request) => {
  'use server'

  const data = await basehub().query({
    newsletter: {
      emails: { webhookSecret: true },
      socialLinks: {
        items: {
          _title: true,
          image: {
            url: true
          },
          url: true
        }
      },
      emailSubscriptions: { adminKey: true },
      emailFrom: true,
      emailVideoThumb: {
        url: true,
        alt: true
      }
    }
  })

  const parsedRequest = await authenticateWebhook({
    body: request.body,
    secret: data.newsletter.emails.webhookSecret,
    signature: request.headers.get('x-basehub-webhook-signature')
  })

  if (!parsedRequest.success) {
    console.error('Webhook authentication failed:', parsedRequest.error)
    return new Response(JSON.stringify({ error: parsedRequest.error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401
    })
  }

  const emailQuery = await basehub().query({
    site: {
      days: {
        __args: {
          filter: {
            _sys_id: {
              eq: parsedRequest.payload.data.blockId
            }
          }
        },
        item: {
          _id: true,
          _title: true,
          name: true,
          description: true,
          isPublished: true,
          emailSent: true,
          date: true,
          emailSubject: true,
          links: {
            _title: true,
            label: true,
            href: true
          },
          content: {
            json: {
              content: true
            }
          }
        }
      }
    }
  })

  const day = emailQuery.site.days.item
  if (!day) {
    return new Response(
      JSON.stringify({ success: false, message: 'Launch day not found' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }

  if (!day.isPublished) {
    console.error('This day is not published yet:', day._title)
    return new Response(
      JSON.stringify({ success: false, message: 'Day not launched yet' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }

  if (day.emailSent) {
    console.error('This day has already been emailed:', day._title)
    return new Response(
      JSON.stringify({
        success: false,
        message: `Emails for ${day._title} were already sent`
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }

  // const nowTimestamp = Date.now()
  // const dateHasPassed = new Date(day.date).getTime() <= nowTimestamp
  // if (!dateHasPassed) {
  //   console.log(`This day is supposed to launch at ${day.date}`)
  //   return new Response(
  //     JSON.stringify({
  //       error: `This day is supposed to launch at ${day.date}`
  //     }),
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //       status: 400
  //     }
  //   )
  // }

  const subscribers = await getEvents(
    data.newsletter.emailSubscriptions.adminKey,
    { type: 'table' }
  )

  if (!subscribers.success) {
    return new Response(JSON.stringify({ error: subscribers.error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401
    })
  }

  const recipients = subscribers.data.filter((v) => v.email)
  const emailsProcessed = new Set<string>()

  for (const subsBatch of chunk(recipients, 100)) {
    await resend.batch.send(
      subsBatch
        .map(({ email, id }) => {
          if (emailsProcessed.has(email)) {
            return null
          }

          emailsProcessed.add(email)

          if (dryRun) {
            console.log(
              `Dry run: Would send email to ${email} for ${emailQuery.site.days.item?._title}`
            )

            return null
          }

          console.log(
            `Sending email to ${email} for ${emailQuery.site.days.item?._title}`
          )

          return {
            to: email,
            from: data.newsletter.emailFrom,
            subject: day.emailSubject,
            react: (
              <NewsletterEmail
                title={`${day._title}: ${day.name}`}
                description={day.description ?? undefined}
                links={(day.links ?? []).map((link) => ({
                  ...link,
                  label: link.label || link._title
                }))}
                blocks={undefined}
                content={day.content.json.content}
                socialLinks={data.newsletter.socialLinks.items}
                unsubscribeLink={`${siteOrigin}/api/newsletter/unsubscribe?event-id=${id}`}
                components={{
                  video: (props) => (
                    <Link href={props.src}>
                      <figure className="mb-5 mx-0">
                        <Img
                          src={data.newsletter.emailVideoThumb.url}
                          alt={data.newsletter.emailVideoThumb.alt ?? ''}
                          className="w-full object-cover mb-2 mx-0"
                        />
                      </figure>
                    </Link>
                  )
                }}
              />
            ),
            headers: {
              'List-Unsubscribe': `<${siteOrigin}/api/newsletter/unsubscribe?event-id=${id}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
            }
          }
        })
        .filter((e) => e !== null)
    )
  }

  await basehub({
    token: process.env.BASEHUB_ADMIN_TOKEN
  }).mutation({
    transaction: {
      __args: {
        autoCommit: `Setting emailSent to true for the ${day._title}`,
        data: {
          type: 'update',
          id: day._id,
          children: {
            emailSent: {
              type: 'boolean',
              value: true
            }
          }
        }
      },
      status: true
    }
  })

  return new Response(
    JSON.stringify({
      success: true,
      message: `${emailsProcessed.size} email${emailsProcessed.size === 1 ? '' : 's'} sent for ${emailQuery.site.days.item?._title}`
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

function chunk<T>(arr: T[], size: number): T[][] {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    [] as T[][]
  )
}
