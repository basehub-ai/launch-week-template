import * as React from 'react'

export const DayDivider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <hr className="border-0 h-px divider-md my-14" />
      <p className="-translate-y-1/2 relative left-1/2 -translate-x-1/2 bg-background max-w-max px-4 -top-14">
        {children}
      </p>
    </>
  )
}
