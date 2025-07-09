'use client'
import { Pageviews } from '@/basehub'
import { sendEvent } from 'basehub/events'
import { useEffect, useRef } from 'react'

export const PageView = ({ eKey }: { eKey: Pageviews['ingestKey'] }) => {
  const sentRef = useRef(false)

  useEffect(() => {
    if (sentRef.current) return

    sendEvent(eKey)
    sentRef.current = true
  }, [eKey])

  return null
}
