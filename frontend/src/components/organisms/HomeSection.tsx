import { cn } from '@/lib/utils'
import Container from './Container'

interface HomeSectionProps {
  children: React.ReactNode
  className?: string
}

export default function HomeSection({ children, className }: HomeSectionProps) {
  return (
    <section className={cn('flex flex-col items-center justify-center overflow-hidden xl:min-h-screen', className)}>
      {children}
    </section>
  )
}

const HomeContainer = ({ children, className }: HomeSectionProps) => (
  <Container className={className} type="home">
    {children}
  </Container>
)

interface ImageProps {
  src: string
  alt: string
  className?: string
}

const Image = ({ src, alt, className }: ImageProps) => (
  <img src={src} alt={alt} className={cn('w-full object-cover xl:w-[60%]', className)} />
)

const Body = ({ children, className }: HomeSectionProps) => (
  <div className={cn('flex flex-col items-start', className)}>{children}</div>
)

HomeSection.Container = HomeContainer
HomeSection.Image = Image
HomeSection.Body = Body
