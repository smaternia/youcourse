/* eslint-disable @typescript-eslint/return-await */
import { userSelect } from '../utils/service'
import { type IComment } from '../types/comment.type'
import db from '../utils/db'

export const addNewComment = async (fields: IComment, userId: string) => {
  return await db.comment.create({ data: { user_id: userId, ...fields } })
}

export const getCommentById = async (commentId: string) => {
  return await db.comment.findUnique({ where: { id: commentId } })
}

export const updateCommentById = async (commentId: string, fields: IComment) => {
  return await db.comment.update({ where: { id: commentId }, data: fields })
}

export const deleteCommentById = async (commentId: string) => {
  return await db.comment.delete({ where: { id: commentId } })
}

export const getCommentsByVideoId = async (videoId: string) => {
  return await db.comment.findMany({
    where: { video_id: videoId },
    orderBy: { created_at: 'desc' },
    include: {
      user: userSelect
    }
  })
}
