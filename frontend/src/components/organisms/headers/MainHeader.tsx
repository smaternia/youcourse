import {
  HiBars3,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBookOpen,
  HiOutlineChevronDown,
  HiOutlineCog6Tooth
} from 'react-icons/hi2'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Alert } from '..'
import { Button } from '@/components/ui/button'
import { Brand, Image } from '@/components/atoms'

import { cn } from '@/lib/utils'
import { useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'
import { UserType } from '@/lib/types/user.type'

const links = [
  { to: '/', label: 'Home' },
  { to: '/course', label: 'Course' },
  { to: '/roadmap', label: 'Roadmap' }
]

const dropdownLinkClass = 'flex cursor-pointer items-center gap-4 rounded-md px-4 py-3 hover:bg-zinc-100 text-font'

export default function MainHeader() {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()
  const user = useUserInfo((state) => state.user)

  const [isOpen, setIsOpen] = React.useState(false)
  const handleClose = () => setIsOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center border-b border-zinc-200 bg-white px-5 lg:h-24 lg:border-0 lg:px-0">
      <div className="mx-auto flex w-[1180px] items-center justify-between">
        <Button variant="ghost" size="icon" className="bg-zinc-200 hover:bg-zinc-300 lg:hidden">
          <HiBars3 className="text-xl" />
        </Button>
        <Brand imageClassName="w-10" className="gap-3 text-primary" />
        <nav className="hidden items-center gap-10 text-[15px] font-medium text-font lg:flex">
          {links.map((link, i) => (
            <Link to={link.to} key={i} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        {user?.role === 'GUEST' ? (
          <div className="relative w-fit">
            <ProfileBox
              isHidden
              user={user}
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer rounded-lg bg-zinc-100 px-2.5 py-2 hover:bg-zinc-200"
            >
              <HiOutlineChevronDown className="hidden text-lg text-font lg:block" />
            </ProfileBox>

            <div
              className={cn(
                'absolute right-0 top-full z-[9999] origin-top-right transition-all duration-300',
                'mt-2 w-[270px] flex-col rounded-lg border-2 border-zinc-200 bg-white p-4 shadow-xl',
                isOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-[-10px] opacity-0'
              )}
            >
              <ProfileBox user={user} className="border-b border-zinc-200 pb-4" />
              <Link to="/me/course" className={cn(dropdownLinkClass, 'mt-3')} onClick={handleClose}>
                <HiOutlineBookOpen className="text-xl" />
                <span className="text-sm font-medium">My Courses</span>
              </Link>
              <Link to="/me" className={dropdownLinkClass} onClick={handleClose}>
                <HiOutlineCog6Tooth className="text-xl" />
                <span className="text-sm font-medium">Settings</span>
              </Link>

              <Alert
                title="Comeback soon?"
                desc="Are you sure you want to sign out of the app?"
                btnText="sign out"
                action={handleLogout}
              >
                <button className={cn(dropdownLinkClass, 'w-full cursor-pointer text-red-500')}>
                  <HiOutlineArrowRightOnRectangle className="text-xl" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </Alert>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/sign-up')}
              className="hidden bg-zinc-200 text-xs hover:bg-zinc-300 md:flex"
            >
              Sign Up
            </Button>
            <Button
              className="bg-zinc-200 text-xs text-zinc-950 hover:bg-zinc-300 md:bg-primary md:text-zinc-50 md:hover:bg-primary/90"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

interface ProfileBoxProps {
  onClick?: () => void
  children?: React.ReactNode
  user: UserType
  className?: string
  isHidden?: boolean
}

function ProfileBox({ user, onClick, children, className, isHidden }: ProfileBoxProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)} onClick={() => onClick && onClick()}>
      <Image src={user.photo} alt={user.fullname} className="h-10 w-10 rounded-full" />
      <div className={cn('flex max-w-[170px] flex-col', isHidden && 'hidden lg:flex')}>
        <h3 className="truncate text-sm font-semibold text-font">{user.username}</h3>
        <p className="truncate text-xs text-font/50">{user.email}</p>
      </div>
      {children}
    </div>
  )
}
