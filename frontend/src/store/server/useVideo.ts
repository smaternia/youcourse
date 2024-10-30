import { createVideoFn, deleteVideoFn, getVideoByIdFn, updateVideoFn } from '@/api/video.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateVideo = () => {
  const queryClient = useQueryClient()

  return useMutation(createVideoFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('videos')
      toast({
        title: 'Video created',
        description: 'Video has been created successfully'
      })
    }
  })
}

export const useUpdateVideo = () => {
  const queryClient = useQueryClient()

  return useMutation(updateVideoFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('videos')
      toast({
        title: 'Video updated',
        description: 'Video has been updated successfully'
      })
    }
  })
}

export const useDeleteVideo = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteVideoFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('videos')
      toast({
        title: 'Video deleted',
        description: 'Video has been deleted successfully'
      })
    }
  })
}

export const useGetVideo = (id?: string) => {
  return useQuery(['videos', id], async () => await getVideoByIdFn(id as string), { enabled: !!id })
}
