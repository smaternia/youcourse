import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useUserInfo } from '../client'
import { changePasswordFn, getMyCourses, updateEmailFn, updateMeFn, uploadProfilePicFn } from '@/api/user.api'

import { toast } from '@/components/ui/use-toast'
import { GetCoursesParams } from './useCourse'

export const useUpdateMe = () => {
  const queryClient = useQueryClient()
  return useMutation(updateMeFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('me')
      useUserInfo.getState().setUser(data)
      toast({
        title: 'Berhasil mengupdate data',
        description: 'Data profil anda berhasil diupdate'
      })
    }
  })
}

export const useChangePassword = () => {
  return useMutation(changePasswordFn, {
    onSuccess: () => {
      toast({
        title: 'Berhasil mengupdate kata sandi',
        description: 'Kata sandi anda berhasil diupdate'
      })
    }
  })
}

export const useUpdateEmail = () => {
  const queryClient = useQueryClient()
  return useMutation(updateEmailFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('me')
      toast({
        title: 'Berhasil mengupdate email',
        description: 'Email anda berhasil diupdate'
      })
    }
  })
}

export const useUpdateProfilePic = () => {
  const queryClient = useQueryClient()
  return useMutation(uploadProfilePicFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('me')
      useUserInfo.getState().setUser(data)
      toast({
        title: 'Berhasil mengupdate foto profil',
        description: 'Foto profil anda berhasil diupdate'
      })
    }
  })
}

export const useGetMyCourses = ({ search, page, enabled }: GetCoursesParams & { enabled: boolean }) => {
  return useQuery(['my-courses', search, page], () => getMyCourses(search, page), { enabled })
}
