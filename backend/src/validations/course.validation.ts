import Joi from 'joi'
import { type ICourse } from '../types/course.type'

export const validCourse = (payload: ICourse) => {
  const shcema = Joi.object<ICourse>({
    title: Joi.string().required(),
    thumbnail: Joi.any(),
    description: Joi.string().required()
  })

  return shcema.validate(payload)
}
