import NextLink from 'next/link'
import { LinkProps } from 'next/link'

export const Link = ({ label, ...props }: LinkProps & { label: string }) => {
  return (
    <NextLink {...props} className="text-accent hover:underline font-semibold">
      {label}
      <span className="ml-2">&rarr;</span>
    </NextLink>
  )
}
