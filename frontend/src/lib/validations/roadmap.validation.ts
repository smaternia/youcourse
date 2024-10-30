import * as Yup from 'yup'

export const createRoadmapValidation = Yup.object({
  title: Yup.string().required('Title is required'),
  courses: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required('label is required'),
        value: Yup.string().required('value is required')
      })
    )
    .required('Courses is required')
})

export type CreateRoadmapType = Yup.InferType<typeof createRoadmapValidation>
