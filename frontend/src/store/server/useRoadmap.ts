import { createRoadmapFn, deleteRoadmapFn, getRoadmapByIdFn, getRoadmapsFn, updateRoadmapFn } from '@/api/roadmap.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient()

  return useMutation(createRoadmapFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('roadmaps')
      toast({
        title: 'Roadmap created',
        description: 'Roadmap has been created successfully'
      })
    }
  })
}

export const useUpdateRoadmap = () => {
  const queryClient = useQueryClient()

  return useMutation(updateRoadmapFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('roadmaps')
      toast({
        title: 'Roadmap updated',
        description: 'Roadmap has been updated successfully'
      })
    }
  })
}

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteRoadmapFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('roadmaps')
      toast({
        title: 'Roadmap deleted',
        description: 'Roadmap has been deleted successfully'
      })
    }
  })
}

export const useGetRoadmap = (id: string) => {
  return useQuery(['roadmaps', id], async () => await getRoadmapByIdFn(id), { enabled: !!id })
}

export const useGetRoadmaps = () => {
  return useQuery('roadmaps', getRoadmapsFn)
}
