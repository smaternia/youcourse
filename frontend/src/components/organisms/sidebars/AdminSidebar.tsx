import * as React from 'react'
import { cn } from '@/lib/utils'
import { useOutsideClick } from '@/hooks'
import { Button } from '@/components/ui/button'
import { HiOutlineArrowLeftOnRectangle, HiXMark } from 'react-icons/hi2'
import { ActiveLink, Brand, Image } from '@/components/atoms'
import { useUserInfo } from '@/store/client'
import { Alert } from '..'
import { useLogout } from '@/store/server/useAuth'
import { useNavigate } from 'react-router-dom'
import { MAIN_MENU } from '@/lib/data'

export default function AdminSidebar() {
  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)

  const { mutate: logout } = useLogout()

  const [isShow, setIsShow] = React.useState(false)
  const ref = useOutsideClick(() => setIsShow(false))

  const handleClose = () => {
    setIsShow(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside
      ref={ref}
      className={cn(
        'fixed top-0 z-[9999999] h-screen w-72 border-r-2 border-[#F8F8F8] bg-white text-font transition-transform duration-300 dark:border-white/10 dark:bg-primary dark:text-white lg:sticky',
        isShow ? '-translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {isShow && (
        <Button
          variant="outline"
          onClick={handleClose}
          className="fixed left-64 top-0 z-[9999999] ml-2 mt-2 flex h-12 w-12 rounded-full p-0 dark:bg-primary md:ml-3 md:mt-3 md:h-14 md:w-14"
        >
          <HiXMark className="m-auto text-2xl dark:text-white md:text-3xl" />
        </Button>
      )}
      <nav className="mx-auto flex w-60 flex-col gap-4 px-4 py-5">
        <Brand className="mb-8 mt-5 hidden gap-3 p-1 text-primary lg:flex" imageClassName="w-7" />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            {MAIN_MENU.map((menu, index) => (
              <ActiveLink href={menu.href} name={menu.title} icon={menu.icon} key={index} action={handleClose} />
            ))}
          </div>
        </div>
      </nav>

      <div className="sticky bottom-0 top-full mx-auto w-56 py-10">
        <div className="flex w-full flex-col items-center gap-4 rounded-xl bg-font/90 p-4">
          <Image src={user?.photo} alt={user?.fullname as string} className="h-14 w-14 rounded-full" />
          <div className="flex flex-col items-center">
            <p className="max-w-[160px] truncate text-sm font-semibold text-white">{user?.fullname}</p>
            <p className="truncate text-xs font-medium text-white/50">@{user?.username}</p>
          </div>
          <Alert
            title="Comeback soon?"
            desc="Are you sure you want to sign out of the app?"
            btnText="sign out"
            action={handleLogout}
          >
            <Button variant="destructive" className="mt-2 w-full gap-2.5 text-xs">
              <HiOutlineArrowLeftOnRectangle className="text-lg" />
              Sign Out
            </Button>
          </Alert>
        </div>
      </div>
    </aside>
  )
}
