import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface ActiveLinkProps {
  name: string
  href: string
  icon?: IconType
  type?: 'menu' | 'favorite'
  action?: () => void
}

export default function ActiveLink({ name, href, icon: Icon, type = 'menu', action }: ActiveLinkProps) {
  return (
    <NavLink
      to={href}
      onClick={action}
      className={({ isActive }) =>
        cn(
          'relative flex items-center gap-3.5 rounded-lg py-3.5 pl-5 pr-2',
          isActive
            ? 'bg-primary/10 text-primary dark:bg-white/10'
            : 'text-font/60 hover:bg-black/5 dark:hover:bg-white/5'
        )
      }
    >
      {type === 'menu' ? (
        Icon && <Icon className="text-xl" />
      ) : (
        <img src={`https://source.unsplash.com/random?${name}`} alt={name} className="h-5 w-5 rounded-full" />
      )}
      <span className="text-[13px] font-medium">{name}</span>
    </NavLink>
  )
}
