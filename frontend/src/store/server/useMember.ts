import { getMemberLoginFn } from '@/api/member.api'
import { useQuery } from 'react-query'

export const useGetMemberLogin = (courseId?: string, token?: string) => {
  return useQuery(['member'], () => getMemberLoginFn(courseId as string), { enabled: !!token })
}
