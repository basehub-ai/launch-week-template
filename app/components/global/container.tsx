import clsx from 'clsx'

export const Container = ({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={clsx(className, 'max-w-7xl mx-auto px-4')}>{children}</div>
  )
}
