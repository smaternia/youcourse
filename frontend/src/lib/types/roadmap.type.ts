import { CourseType } from './course.type'

export type RoadmapType = {
  id: string
  title: string
  created_at: string
  updated_at: string
  courses: CourseType[]
}
