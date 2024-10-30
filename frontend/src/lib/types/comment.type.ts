import { UserType } from './user.type'

export type CommentType = {
  id: string
  content: string
  user_id: string
  video_id: string
  created_at: string
  updated_at: string
  user: UserType
}

export type CreateCommentType = {
  content: string
  video_id: string
}
