import { CreateVideoType } from '@/lib/validations/video.validation'
import api from './axiosInstance'
import { VideoType } from '@/lib/types/video.type'

type CreateVideoParams = CreateVideoType & { course_id: string }

export const createVideoFn = async (fields: CreateVideoParams) => {
  return await api.post('/video', fields)
}

export const updateVideoFn = async (fields: CreateVideoParams & { id: string }) => {
  const { id, ...rest } = fields
  return await api.put(`/video/${id}`, rest)
}

export const deleteVideoFn = async (id: string) => {
  return await api.delete(`/video/${id}`)
}

export const getVideoByIdFn = async (id: string): Promise<VideoType> => {
  const response = await api.get(`/video/${id}`)
  return response.data?.data
}
