import { IconType } from 'react-icons'

interface NoDataProps {
  icon: IconType
  title: string
  text: string
}

export default function NoData({ icon: Icon, title, text }: NoDataProps) {
  return (
    <div className="mt-5 flex flex-col items-center gap-8">
      <div className="flex h-24 w-24 rounded-full bg-slate-100">
        <Icon className="m-auto text-3xl text-font/20 md:text-6xl" />
      </div>
      <div className="gap flex flex-col items-center gap-1 text-center font-semibold md:gap-2">
        <p className="text-[13px] text-font md:text-sm">{title}</p>
        <p className="text-xs text-font/50 md:text-[13px]">{text}</p>
      </div>
    </div>
  )
}
