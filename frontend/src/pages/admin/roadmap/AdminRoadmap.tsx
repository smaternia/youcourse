import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlinePencilSquare, HiOutlinePresentationChartLine, HiOutlineTrash, HiPlus } from 'react-icons/hi2'

import { Loading } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { Heading, RoadmapCard } from '@/components/organisms'

import { useTitle } from '@/hooks'
import { useDialog } from '@/store/client'
import { useDeleteRoadmap, useGetRoadmaps } from '@/store/server/useRoadmap'

export default function AdminRoadmap() {
  useTitle('Admin ~ Roadmaps')
  const { dialog } = useDialog()
  const navigate = useNavigate()
  const { data: roadmaps, isSuccess } = useGetRoadmaps()
  const { mutate: deleteRoadmap } = useDeleteRoadmap()

  const handleDelete = (id: string) => {
    dialog({
      title: 'Delete Roadmap',
      description: 'Are you sure you want to delete this roadmap?',
      submitText: 'Delete',
      variant: 'danger'
    }).then(() => deleteRoadmap(id))
  }

  return (
    <React.Fragment>
      {!isSuccess && <Loading />}
      <div className="flex items-center justify-between">
        <Heading className="flex items-center gap-5 text-font">
          <Heading.Icon icon={HiOutlinePresentationChartLine} />
          <div className="flex flex-col gap-1">
            <Heading.Title>All Roadmaps</Heading.Title>
            <Heading.SubTitle className="text-font/80">Manage all roadmaps in the platform</Heading.SubTitle>
          </div>
        </Heading>
        <Button className="gap-2.5" onClick={() => navigate('/admin/roadmap/create')}>
          <HiPlus className="text-xl" />
          <p className="text-xs">Create Roadmap</p>
        </Button>
      </div>
      <section className="mt-16 grid grid-cols-4 gap-8">
        {roadmaps?.map((roadmap, i) => (
          <RoadmapCard
            key={i}
            title={roadmap.title}
            countClass={roadmap.courses.length}
            type="admin"
            className="bg-[#F7F9FB]"
          >
            <div className="mt-3.5 flex w-full items-center gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2.5 text-xs text-font"
                onClick={() => navigate(`/admin/roadmap/${roadmap.id}`)}
              >
                <HiOutlinePencilSquare className="text-sm" />
                Edit
              </Button>
              <Button variant="destructive" className="flex-1 gap-2.5 text-xs" onClick={() => handleDelete(roadmap.id)}>
                <HiOutlineTrash className="text-sm" />
                Delete
              </Button>
            </div>
          </RoadmapCard>
        ))}
      </section>
    </React.Fragment>
  )
}
