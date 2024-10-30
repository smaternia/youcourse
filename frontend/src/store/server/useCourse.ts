import {
  createCourseFn,
  deleteCourseFn,
  getCourseByIdFn,
  getCoursesFn,
  getPublishedCoursesFn,
  getVideosByCourseIdFn,
  joinCourseFn,
  publishCourseFn,
  updateCourseFn
} from '@/api/course.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation(createCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      toast({
        title: 'Course created',
        description: 'Course has been created successfully'
      })
    }
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation(updateCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      toast({
        title: 'Course updated',
        description: 'Course has been updated successfully'
      })
    }
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      toast({
        title: 'Course deleted',
        description: 'Course has been deleted successfully'
      })
    }
  })
}

export const usePublishCourse = () => {
  const queryClient = useQueryClient()

  return useMutation(publishCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      toast({
        title: 'Course published',
        description: 'Course has been published successfully'
      })
    }
  })
}

export interface GetCoursesParams {
  search?: string
  page?: number
  type?: string
  enabled?: boolean
  limit?: number
}

export const useGetCourses = ({ search, page, type, enabled, limit }: GetCoursesParams) => {
  return useQuery(['courses', search, page, type, limit], () => getCoursesFn(search, page, type, limit), { enabled })
}

export const useGetCourse = (id?: string) => {
  return useQuery(['course', id], () => getCourseByIdFn(id as string), { enabled: !!id })
}

export const useGetVideos = (id?: string, search?: string) => {
  return useQuery(['course', 'videos', id], () => getVideosByCourseIdFn(id as string, search), { enabled: !!id })
}

export const useJoinCourse = () => {
  const queryClient = useQueryClient()

  return useMutation(joinCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['courses', 'member'])
      toast({
        title: 'Course joined',
        description: 'You have successfully joined the course'
      })
    }
  })
}

export const useLeaveCourse = () => {
  const queryClient = useQueryClient()

  return useMutation(joinCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['courses', 'member'])
      toast({
        title: 'Course left',
        description: 'You have successfully left the course'
      })
    }
  })
}

export const useGetPublishedCourses = (page: number) => {
  return useQuery(['courses', 'publish'], () => getPublishedCoursesFn(page))
}
