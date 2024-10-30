import Joi from 'joi'
import { type IVideo } from '../types/video.type'

export const validVideo = (payload: IVideo) => {
  const schema = Joi.object<IVideo>({
    title: Joi.string().required(),
    video_url: Joi.string().required(),
    description: Joi.string().required(),
    course_id: Joi.string().required()
  })

  return schema.validate(payload)
}
