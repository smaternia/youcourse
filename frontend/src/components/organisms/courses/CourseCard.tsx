import { Image } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { CourseType } from '@/lib/types/course.type'
import { cn } from '@/lib/utils'
import { HiOutlineClock } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

interface CourseCardProps {
  course: CourseType
  type?: 'column' | 'row'
  containerClassName?: string
  isNotRounded?: boolean
}

export default function CourseCard({ type = 'column', containerClassName, course, isNotRounded }: CourseCardProps) {
  const navigate = useNavigate()

  return (
    <article
      className={cn('overflow-hidden rounded-xl bg-white', type === 'row' && 'flex flex-row gap-2', containerClassName)}
    >
      <Image
        src={course.thumbnail}
        alt="course"
        className={cn(
          'h-[228px] w-full rounded-xl object-cover',
          type === 'row' && 'w-[342px]',
          isNotRounded && 'rounded-none rounded-t-xl'
        )}
      />
      {/* <img src={img} alt="course" className="w-full rounded-xl object-cover" /> */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-font">{course.title}</h3>
        <h1 className="truncate-3 mt-2 text-[13px] text-font">{course.description}</h1>
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <HiOutlineClock className="text-lg" />
            <p className="mt-1 text-sm font-semibold text-primary">{course._count.videos} Pertemuan</p>
          </div>
          <Button className="text-xs" onClick={() => navigate(`/course/${course.id}`)}>
            See Detail
          </Button>
        </div>
      </div>
    </article>
  )
}
