import { HomeSection } from '..'
import { Brand } from '@/components/atoms'
import { HiEnvelope, HiPhone } from 'react-icons/hi2'

export default function MainFooter() {
  return (
    <footer className="bg-primary py-3">
      <HomeSection.Container className="flex items-center justify-between gap-5 py-0 xl:w-[1180px] xl:px-0">
        <Brand
          type="dark"
          className="gap-3 text-white"
          imageClassName="xl:w-8"
          titleClassName="xl:text-sm"
          descClassName="text-white/50 xl:text-[10px]"
        />
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 text-xs font-medium text-white">
            <HiPhone />
            <p>+62 812-7847-3458</p>
          </div>
          <p className="text-white">|</p>
          <div className="flex items-center gap-2 text-xs font-medium text-white">
            <HiEnvelope />
            <p>youcourse07@email.com</p>
          </div>
        </div>
      </HomeSection.Container>
    </footer>
  )
}
