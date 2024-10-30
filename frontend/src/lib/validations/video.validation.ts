import * as Yup from 'yup'

export const createVideoValidation = Yup.object({
  title: Yup.string().required('Title is required'),
  video_url: Yup.string().required('Youtube Link is required'),
  description: Yup.string().required('Description is required')
})

export type CreateVideoType = Yup.InferType<typeof createVideoValidation>
