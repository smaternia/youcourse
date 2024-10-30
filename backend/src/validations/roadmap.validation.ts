import Joi from 'joi'
import { type IRoadmap } from '../types/roadmap.type'

export const validRoadmap = (payload: IRoadmap) => {
  const schema = Joi.object<IRoadmap>({
    title: Joi.string().required(),
    courses: Joi.array().items(Joi.string()).required()
  })

  return schema.validate(payload)
}
