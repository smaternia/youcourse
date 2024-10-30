import api from './axiosInstance'

export const getMemberLoginFn = async (courseId: string): Promise<{ id: string }> => {
  const response = await api.get(`/member/course/${courseId}`)
  return response.data?.data?.members[0]
}
