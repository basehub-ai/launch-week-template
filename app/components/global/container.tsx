import clsx from 'clsx'

export const Container = ({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={clsx(className, '2xl:max-w-4xl max-w-[800px] mx-auto px-4')}
    >
      {children}
    </div>
  )
}
