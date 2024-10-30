import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { HiArrowLeft } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  className?: string
  action?: () => void
}

export default function BackButton({ className, action }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    action && action()
    navigate(-1)
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        'bg-zinc-200 text-font hover:bg-zinc-300 border',
        'mb-3 flex items-center gap-2.5 p-0 px-3.5 lg:absolute lg:left-7 lg:top-7 lg:mb-0 lg:px-4 lg:py-2 ',
        className
      )}
    >
      <HiArrowLeft className="text-sm lg:text-base" />
      <span className="hidden text-xs font-semibold lg:flex">Back</span>
    </Button>
  )
}