import Joi from 'joi'
import { type IComment } from '../types/comment.type'

export const validComment = (payload: IComment) => {
  const shcema = Joi.object<IComment>({
    content: Joi.string().required(),
    video_id: Joi.string().required()
  })

  return shcema.validate(payload)
}
