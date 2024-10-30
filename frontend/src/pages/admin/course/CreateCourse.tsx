import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'

import { BackButton, Dropzone } from '@/components/atoms'
import { Heading } from '@/components/organisms'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useTitle } from '@/hooks'
import { useCreateCourse, useGetCourse, useUpdateCourse } from '@/store/server/useCourse'
import { CreateCourseType, createCourseValidation } from '@/lib/validations/course.validation'

export default function CreateCourse() {
  const { courseId } = useParams<{ courseId: string }>()

  useTitle(`Admin ~ ${courseId ? 'Update' : 'Create'} Course`)
  const navigate = useNavigate()

  const { data: course, isSuccess } = useGetCourse(courseId as string)
  const { mutate: createCourse, isLoading: loadingCreate } = useCreateCourse()
  const { mutate: updateCourse, isLoading: loadingUpdate } = useUpdateCourse()

  const forms = useForm<CreateCourseType>({
    mode: 'onTouched',
    resolver: yupResolver(createCourseValidation)
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('title', course?.title)
      forms.setValue('description', course?.description)

      if (course?.thumbnail) {
        forms.setValue('thumbnail', [course?.thumbnail])
      }
    }
  }, [isSuccess, forms, course])

  const onSuccess = () => {
    forms.reset()
    navigate('/admin/course')
  }

  const onSubmit = (values: CreateCourseType) => {
    if (!courseId) return createCourse(values, { onSuccess })
    updateCourse({ ...values, id: courseId }, { onSuccess })
  }

  return (
    <React.Fragment>
      <BackButton />
      <Heading className="mx-auto flex w-6/12 flex-col gap-1 text-font">
        <Heading.Title>{courseId ? 'Edit' : 'Create'} Course</Heading.Title>
        <Heading.SubTitle className="text-font/80">
          Fill in the form below to {courseId ? 'update the' : 'create a new'} course
        </Heading.SubTitle>
      </Heading>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mx-auto mt-16 flex w-6/12 flex-col gap-5">
          <FormField
            name="title"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} placeholder="Type the title of the course" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="thumbnail"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Thumbnail</FormLabel>
                <FormControl>
                  <Dropzone
                    id="thumbnail"
                    setValue={field.onChange}
                    fileValue={field.value as unknown as FileWithPreview[]}
                    accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Write something here..."
                    className="h-[160px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto mt-3 w-fit text-[13px]" loading={loadingCreate || loadingUpdate}>
            {courseId ? 'Update' : 'Create'} Course
          </Button>
        </form>
      </Form>
    </React.Fragment>
  )
}
