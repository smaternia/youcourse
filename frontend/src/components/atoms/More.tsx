import { HiEllipsisHorizontal, HiOutlineCog6Tooth, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { IconType } from 'react-icons'

interface MoreProps {
  children: React.ReactNode
  type?: 'more' | 'settings'
}

export default function More({ children, type = 'more' }: MoreProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {type === 'settings' ? (
          <Button variant="ghost" size="icon" className="bg-font text-white hover:bg-font/80 hover:text-white">
            <HiOutlineCog6Tooth className="text-xl" />
          </Button>
        ) : (
          <Button size="icon" variant="outline" className="h-6 w-6 p-0">
            <HiEllipsisHorizontal />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ItemProps {
  label?: string
  icon?: IconType
  type?: 'edit' | 'delete' | 'default'
  onClick?: () => void
}

function Item({ label, type = 'default', icon: Icon, onClick }: ItemProps) {
  return (
    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5" onClick={onClick}>
      {type === 'edit' && <HiOutlinePencilSquare className="text-lg" />}
      {type === 'delete' && <HiOutlineTrash className="text-lg" />}
      {type === 'default' && Icon && <Icon className="text-lg" />}
      <p className="text-xs font-medium capitalize">{label ?? type}</p>
    </DropdownMenuItem>
  )
}

More.Item = Item
