import { cn } from '@/lib/utils'
import { IconType } from 'react-icons'

interface HeadingProps {
  children: React.ReactNode
  className?: string
}
export default function Heading({ children, className }: HeadingProps) {
  return <div className={cn(className)}>{children}</div>
}

const Title = ({ children, className }: HeadingProps) => (
  <h1 className={cn('text-3xl font-bold text-font md:text-4xl', className)}>{children}</h1>
)

const SubTitle = ({ children, className }: HeadingProps) => (
  <p className={cn('text-[15px] font-medium text-[#47BB8E] md:text-base', className)}>{children}</p>
)

interface IconProps {
  icon: IconType
}

const Icon = ({ icon: Icon }: IconProps) => (
  <div className="flex h-16 w-16 rounded-full border-2 bg-zinc-100">
    <Icon className="m-auto text-[32px] text-font/80" />
  </div>
)

Heading.Title = Title
Heading.SubTitle = SubTitle
Heading.Icon = Icon
