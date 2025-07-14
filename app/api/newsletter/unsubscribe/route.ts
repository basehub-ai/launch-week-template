import { basehub } from 'basehub'
import { deleteEvent, getEvents } from 'basehub/events'

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const eventId = url.searchParams.get('event-id')

  if (!eventId) {
    return new Response('Missing stuff', { status: 400 })
  }

  const data = await basehub().query({
    newsletter: {
      emailSubscriptions: {
        adminKey: true
      }
    }
  })

  const events = await getEvents(data.newsletter.emailSubscriptions.adminKey, {
    type: 'table'
  })

  if (!events.success) {
    console.error(events.error)
    return new Response('Failed to delete event', { status: 500 })
  }

  const emailForThisEvent = events.data.find(
    (event) => event.id === eventId
  )?.email

  let eventIds: string[] = []

  if (!!emailForThisEvent) {
    const allEventsWithEmail = await getEvents(
      data.newsletter.emailSubscriptions.adminKey,
      {
        type: 'table',
        filter: { email: { eq: emailForThisEvent } }
      }
    )

    if (allEventsWithEmail.success) {
      eventIds = allEventsWithEmail.data.map((event) => event.id)
    }
  } else {
    eventIds = [eventId]
  }

  const res = await deleteEvent(
    data.newsletter.emailSubscriptions.adminKey,
    eventIds.length ? (eventIds as [string, ...string[]]) : [eventId]
  )

  if (!res.success) {
    console.error(res.error)
    return new Response('Failed to delete event', { status: 500 })
  }

  return new Response('Unsubscribed ✅', { status: 200 })
}

export const POST = GET
