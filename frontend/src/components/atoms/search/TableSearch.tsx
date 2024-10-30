import * as React from 'react'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

interface TableSearchProps extends InputProps {
  containerClassName?: string
}

const TableSearch = React.forwardRef<HTMLInputElement, TableSearchProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('relative', containerClassName)}>
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-[#8897AD]" />
        <Input
          {...props}
          ref={ref}
          className={cn('pl-10 placeholder:text-[13px] placeholder:text-[#8897AD]', className)}
        />
      </div>
    )
  }
)

export default TableSearch
