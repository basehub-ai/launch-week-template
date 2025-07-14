'use client'

import * as React from 'react'

import { Icon } from 'basehub/react-icon'
import Link from 'next/link'
import clsx from 'clsx'

export const Heading = ({
  as = 'h2',
  link,
  children,
  ...props
}: {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  link?: { url: string; svg: React.ReactNode }
} & React.JSX.IntrinsicElements['h1']) => {
  const H = as

  return (
    <H
      {...props}
      className={clsx(
        'underline tracking-normal decoration-dashed text-dim font-bold text-sm md:text-base scroll-mt-[var(--spacing-header)]',
        props.className
      )}
    >
      {link ? (
        <Link
          className="hover:decoration-solid group flex items-center gap-x-2"
          href={link.url}
          onClick={() => {
            navigator.clipboard.writeText(link.url)
          }}
        >
          {children}
          {typeof link.svg === 'string' ? (
            <Icon
              content={link.svg}
              components={{
                svg: (props) => (
                  <svg
                    {...props}
                    className="invisible group-hover:visible group-focus:visible"
                  />
                )
              }}
            />
          ) : (
            link.svg
          )}
        </Link>
      ) : (
        children
      )}
    </H>
  )
}
