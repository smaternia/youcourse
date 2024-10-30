import { createCommentFn, deleteCommentFn, getCommentByIdFn, getCommentsFn, updateCommentFn } from '@/api/comment.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation(createCommentFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      toast({
        title: 'Comment created',
        description: 'Comment has been created successfully'
      })
    }
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation(updateCommentFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      toast({
        title: 'Comment updated',
        description: 'Comment has been updated successfully'
      })
    }
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteCommentFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      toast({
        title: 'Comment deleted',
        description: 'Comment has been deleted successfully'
      })
    }
  })
}

export const useGetComments = (videoId?: string) => {
  return useQuery(['comments', videoId], async () => await getCommentsFn(videoId as string), { enabled: !!videoId })
}

export const useGetComment = (id: string) => {
  return useQuery(['comments', id], async () => await getCommentByIdFn(id), { enabled: !!id })
}
