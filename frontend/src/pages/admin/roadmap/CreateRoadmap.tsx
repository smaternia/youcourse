import { yupResolver } from '@hookform/resolvers/yup'

import { Heading } from '@/components/organisms'
import { BackButton, Loading, MultipleSelector } from '@/components/atoms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useTitle } from '@/hooks'
import { useGetCourses } from '@/store/server/useCourse'
import { useCreateRoadmap, useGetRoadmap, useUpdateRoadmap } from '@/store/server/useRoadmap'
import { CreateRoadmapType, createRoadmapValidation } from '@/lib/validations/roadmap.validation'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function CreateRoadmap() {
  const { roadmapId } = useParams<{ roadmapId: string }>()

  const navigate = useNavigate()
  useTitle(`Admin ~ ${roadmapId ? 'Update' : 'Create'} Roadmap`)

  const { data: courses, isSuccess: successCourse } = useGetCourses({ type: 'public' })
  const { data: roadmap, isSuccess: successRoadmap } = useGetRoadmap(roadmapId as string)

  const { mutate: createRoadmap, isLoading: loadingCreate } = useCreateRoadmap()
  const { mutate: updateRoadmap, isLoading: loadingUpdate } = useUpdateRoadmap()

  const forms = useForm({
    mode: 'onTouched',
    resolver: yupResolver(createRoadmapValidation)
  })

  React.useEffect(() => {
    if (successRoadmap) {
      forms.setValue('title', roadmap?.title)
      forms.setValue(
        'courses',
        roadmap?.courses.map((course) => ({ value: course.id, label: course.title }))
      )
    }
  }, [successRoadmap, roadmap, forms])

  const onSuccess = () => {
    forms.reset()
    navigate('/admin/roadmap')
  }

  const onSubmit = (values: CreateRoadmapType) => {
    if (values.courses.length === 0) {
      forms.setError('courses', { type: 'required', message: 'Courses is required' }) // set error to courses
      return
    }

    if (!roadmapId) return createRoadmap(values, { onSuccess })
    updateRoadmap({ ...values, id: roadmapId }, { onSuccess })
  }

  if (!successCourse) return <Loading />

  const options =
    courses.data.map((course) => ({
      value: course.id,
      label: course.title
    })) ?? []

  return (
    <React.Fragment>
      <BackButton />
      <Heading className="mx-auto flex w-6/12 flex-col gap-1 text-font">
        <Heading.Title>{roadmapId ? 'Edit' : 'Create'} Roadmap</Heading.Title>
        <Heading.SubTitle className="text-font/80">
          Fill in the form below to{' '}
          {roadmapId ? 'update this roadmap on the server' : 'create a new roadmap to the server'}
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
                  <Input {...field} value={field.value ?? ''} placeholder="Type the title of the roadmap" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="courses"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Select Courses</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={options}
                    value={field.value ?? []}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Select published courses you like"
                    // badgeClassName="bg-primary hover:bg-primary/90"
                    badgeClassName="border border-primary text-primary hover:bg-primary hover:text-white bg-white cursor-pointer"
                    emptyIndicator={
                      <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto mt-3 w-fit text-[13px]" loading={loadingCreate || loadingUpdate}>
            {roadmapId ? 'Update' : 'Create'}
          </Button>
        </form>
      </Form>
    </React.Fragment>
  )
}
