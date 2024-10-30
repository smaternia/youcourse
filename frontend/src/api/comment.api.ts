import api from './axiosInstance'
import { CommentType, CreateCommentType } from '@/lib/types/comment.type'

export const createCommentFn = async (fields: CreateCommentType) => {
  return await api.post('/comment', fields)
}

export const updateCommentFn = async (fields: CreateCommentType & { id: string }) => {
  const { id, ...rest } = fields
  return await api.put(`/comment/${id}`, rest)
}

export const deleteCommentFn = async (id: string) => {
  return await api.delete(`/comment/${id}`)
}

export const getCommentsFn = async (videoId: string): Promise<CommentType[]> => {
  const response = await api.get(`/comment/video/${videoId}`)
  return response.data?.data
}

export const getCommentByIdFn = async (id: string): Promise<CommentType> => {
  const response = await api.get(`/comment/${id}`)
  return response.data?.data
}
