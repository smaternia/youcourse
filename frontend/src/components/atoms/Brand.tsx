import { Logo, LogoDark } from '@/assets'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface BrandProps {
  className?: string
  imageClassName?: string
  titleClassName?: string
  descClassName?: string
  href?: string
  type?: 'dark' | 'light'
}

export default function Brand({
  className,
  imageClassName,
  href,
  titleClassName,
  descClassName,
  type = 'light'
}: BrandProps) {
  return (
    <Link to={href ?? '/'} className={cn('flex items-center gap-3 font-semibold', className)}>
      <img
        alt="logo"
        src={type === 'light' ? Logo : LogoDark}
        className={cn('w-10 rounded-full lg:w-11', imageClassName)}
      />
      <div className="hidden flex-col md:flex">
        <p className={cn('font-bold', titleClassName)}>YouCourse</p>
        <p className={cn('text-[11px] font-medium text-font md:-mt-[2px]', descClassName)}>Upgrade Your Tech Skills</p>
      </div>
    </Link>
  )
}
