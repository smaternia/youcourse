import { CreateRoadmapType } from '@/lib/validations/roadmap.validation'
import api from './axiosInstance'
import { RoadmapType } from '@/lib/types/roadmap.type'

export const createRoadmapFn = async (fields: CreateRoadmapType) => {
  return await api.post('/roadmap', { ...fields, courses: fields.courses.map((course) => course.value) })
}

export const updateRoadmapFn = async (fields: CreateRoadmapType & { id: string }) => {
  const { id, ...rest } = fields
  return await api.put(`/roadmap/${id}`, { ...rest, courses: rest.courses.map((course) => course.value) })
}

export const deleteRoadmapFn = async (id: string) => {
  return await api.delete(`/roadmap/${id}`)
}

export const getRoadmapByIdFn = async (id: string): Promise<RoadmapType> => {
  const response = await api.get(`/roadmap/${id}`)
  return response.data?.data
}

export const getRoadmapsFn = async (): Promise<RoadmapType[]> => {
  const response = await api.get('/roadmap')
  return response.data?.data
}
