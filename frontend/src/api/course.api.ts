import { CreateCourseType } from '@/lib/validations/course.validation'
import api from './axiosInstance'
import { CourseResponseType, CourseType } from '@/lib/types/course.type'
import { VideoResponseType } from '@/lib/types/video.type'

export const createCourseFn = async (fields: CreateCourseType) => {
  const formData = new FormData()
  formData.append('title', fields.title)
  formData.append('description', fields.description)
  if (Array.isArray(fields.thumbnail) && fields.thumbnail.length > 0 && fields.thumbnail[0] instanceof File) {
    formData.append('thumbnail', fields.thumbnail[0])
  }

  return await api.post('/course', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateCourseFn = async (fields: CreateCourseType & { id: string }) => {
  const formData = new FormData()
  formData.append('title', fields.title)
  formData.append('description', fields.description)

  if (Array.isArray(fields.thumbnail) && fields.thumbnail.length > 0 && fields.thumbnail[0] instanceof File) {
    formData.append('thumbnail', fields.thumbnail[0])
  } else if (Array.isArray(fields.thumbnail)) {
    formData.append('thumbnail', fields.thumbnail[0])
  }

  return await api.put(`/course/${fields.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteCourseFn = async (id: string) => {
  return await api.delete(`/course/${id}`)
}

type PublishCourseType = {
  id: string
  published: boolean
}

export const publishCourseFn = async (fields: PublishCourseType) => {
  return await api.put(`/course/${fields.id}/publish`, { published: fields.published })
}

export const getCoursesFn = async (
  search?: string,
  page?: number,
  type?: string,
  limit?: number
): Promise<CourseResponseType> => {
  const response = await api.get('/course', {
    params: {
      q: search,
      page,
      type,
      limit
    }
  })

  return response.data
}

export const getCourseByIdFn = async (id: string): Promise<CourseType> => {
  const response = await api.get(`/course/${id}`)
  return response.data?.data
}

export const getVideosByCourseIdFn = async (id: string, search?: string): Promise<VideoResponseType> => {
  const response = await api.get(`/course/${id}/videos`, {
    params: {
      q: search
    }
  })
  return response.data
}

export const joinCourseFn = async (id: string) => {
  return await api.post(`/course/${id}/join`)
}

export const leaveCourseFn = async (id: string) => {
  return await api.delete(`/course/${id}/leave`)
}

export const getPublishedCoursesFn = async (page: number): Promise<CourseResponseType> => {
  const response = await api.get('/course/publish/user', {
    params: {
      page
    }
  })
  return response.data
}
