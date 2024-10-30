import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'

import { BackButton, TextEditor } from '@/components/atoms'
import { Heading } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useTitle } from '@/hooks'
import { useCreateVideo, useGetVideo, useUpdateVideo } from '@/store/server/useVideo'
import { CreateVideoType, createVideoValidation } from '@/lib/validations/video.validation'

export default function CreateVideo() {
  const { courseId, videoId } = useParams<{ courseId: string; videoId: string }>()

  useTitle(`Admin ~ ${videoId ? 'Update' : 'Create'} Video`)
  const navigate = useNavigate()

  const { data: video, isSuccess } = useGetVideo(videoId as string)
  const { mutate: createVideo, isLoading: loadingCreate } = useCreateVideo()
  const { mutate: updateVideo, isLoading: loadingUpdate } = useUpdateVideo()

  const forms = useForm<CreateVideoType>({
    mode: 'onTouched',
    resolver: yupResolver(createVideoValidation)
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('title', video?.title)
      forms.setValue('video_url', video?.video_url)
      forms.setValue('description', video?.description)
    }
  }, [forms, isSuccess, video])

  const onSuccess = () => {
    forms.reset()
    navigate(`/admin/course/${courseId}/video`)
  }

  const onSubmit = (values: CreateVideoType) => {
    const fields = { ...values, course_id: courseId as string }
    if (!videoId) return createVideo(fields, { onSuccess })
    updateVideo({ ...fields, id: videoId }, { onSuccess })
  }

  return (
    <React.Fragment>
      <BackButton />
      <Heading className="mx-auto flex w-6/12 flex-col gap-1 text-font">
        <Heading.Title>{videoId ? 'Edit' : 'Add New'} Video</Heading.Title>
        <Heading.SubTitle className="text-font/80">
          Fill in the form below to {videoId ? 'edit video from course' : 'create a new video to course'}
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
                  <Input {...field} value={field.value ?? ''} placeholder="Type the title of the video" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="video_url"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Youtube Link</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} placeholder="https://youtu.be/..." />
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
                  <TextEditor
                    id="description"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write something here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto mt-3 w-fit text-[13px]" loading={loadingCreate || loadingUpdate}>
            {videoId ? 'Update' : 'Create'} Video
          </Button>
        </form>
      </Form>
    </React.Fragment>
  )
}
