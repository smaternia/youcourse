import { useToken, useUserInfo } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedFromAdmin() {
  const location = useLocation()
  const accessToken = useToken((state) => state.accessToken)
  const user = useUserInfo((state) => state.user)

  if ((user?.role === 'ADMIN' && !accessToken) || (!user && !accessToken)) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />
  }

  if (user?.role === 'ADMIN' && accessToken) {
    return <Navigate to="/admin/course" replace state={{ from: location }} />
  }

  return <Outlet />
}
