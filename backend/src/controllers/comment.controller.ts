import { type Request, type Response } from 'express'
import { validComment } from '../validations/comment.validation'
import { type IComment } from '../types/comment.type'
import { logError, logInfo } from '../utils/logger'
import * as CommentService from '../services/comment.service'

export const createComment = async (req: Request, res: Response) => {
  const { value, error } = validComment(req.body as IComment)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await CommentService.addNewComment(value, req.userId as string)

    logInfo(req, 'Creating new comment')
    res.status(200).json({ message: 'Berhasil membuat komentar baru', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  const { value, error } = validComment(req.body as IComment)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await CommentService.updateCommentById(req.params.commentId, value)

    logInfo(req, 'Updating comment data')
    res.status(200).json({ message: 'Berhasil mengubah data komentar', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await CommentService.deleteCommentById(req.params.commentId)

    logInfo(req, 'Deleting comment')
    res.status(200).json({ message: 'Berhasil menghapus komentar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getComment = async (req: Request, res: Response) => {
  try {
    const data = await CommentService.getCommentById(req.params.commentId)

    logInfo(req, 'Fetching comment')
    res.status(200).json({ message: 'Berhasil mendapatkan komentar', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const data = await CommentService.getCommentsByVideoId(req.params.videoId)

    logInfo(req, 'Fetching comments')
    res.status(200).json({ message: 'Berhasil mendapatkan komentar', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
