import * as React from 'react'
import { HiArrowDown } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'

import { BackButton, Loading } from '@/components/atoms'
import { Container, CourseCard, Heading } from '@/components/organisms'

import { useDisableBodyScroll, useTitle } from '@/hooks'
import { useGetRoadmap } from '@/store/server/useRoadmap'

export default function DetailRoadmap() {
  const { roadmapId } = useParams<{ roadmapId: string }>()
  const { data: roadmap, isSuccess } = useGetRoadmap(roadmapId as string)

  useTitle(roadmap?.title || 'Roadmap')

  useDisableBodyScroll(!isSuccess)

  return (
    <section className="relative bg-[#F6F8FD] lg:pb-20">
      <BackButton />
      {!isSuccess && <Loading />}
      <Heading className="bg-[#FAFAFA] bg-[url('@/assets/images/bg-roadmap.png')] bg-contain px-4 py-16 text-center">
        <Heading.Title className="text-font">{roadmap?.title}</Heading.Title>
        <p className="mx-auto mt-2.5 max-w-[720px] text-[15px] leading-relaxed text-font/90">
          Step by step guide to becoming a modern {roadmap?.title} developer in 2024
        </p>
      </Heading>
      <Container>
        <div className="flex flex-col items-center gap-3">
          {roadmap?.courses.map((course, i) => (
            <React.Fragment key={course.id}>
              <CourseCard course={course} containerClassName="max-w-[650px]" type="row" />
              {i !== roadmap.courses.length - 1 && <HiArrowDown className="text-5xl" />}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
}
