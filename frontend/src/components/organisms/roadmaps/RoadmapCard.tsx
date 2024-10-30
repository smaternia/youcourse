import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface RoadmapCardProps {
  title: string
  countClass: number
  roadmapId?: string

  type?: 'public' | 'admin'
  children?: React.ReactNode
  className?: string
}

export default function RoadmapCard({ title, countClass, type = 'public', roadmapId, ...rest }: RoadmapCardProps) {
  const navigate = useNavigate()

  return (
    <article className={cn('rounded-lg bg-white p-5', rest.className)}>
      <h1 className="text-xl font-bold text-font">{title}</h1>
      <p className="text-[15px] text-font/60">{countClass} courses is avaliable</p>
      {type === 'public' && (
        <Button className="mt-5 w-full text-xs" onClick={() => navigate(`/roadmap/${roadmapId}`)}>
          Start Journey
        </Button>
      )}
      {type === 'admin' && rest.children}
    </article>
  )
}
