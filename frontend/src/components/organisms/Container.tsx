import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  type?: 'home' | 'default'
}

export default function Container({ children, className, type = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'flex flex-col px-5 xl:mx-auto xl:w-[1180px] xl:px-0',
        type === 'home' && 'items-center gap-5 py-10 md:px-10 xl:w-[980px] xl:flex-row xl:gap-20 xl:py-0',
        type === 'default' && 'pb-20 pt-7 xl:pb-28 xl:pt-14',
        className
      )}
    >
      {children}
    </div>
  )
}
