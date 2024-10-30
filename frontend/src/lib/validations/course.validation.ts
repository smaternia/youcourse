import * as Yup from 'yup'

export const createCourseValidation = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  thumbnail: Yup.mixed().required('Thumbnail is required')
})

export type CreateCourseType = Yup.InferType<typeof createCourseValidation>
