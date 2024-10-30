import db from '../utils/db'

import { type IRoadmap } from '../types/roadmap.type'

export const addNewRoadmap = async (fields: IRoadmap, userId: string) => {
  return await db.roadmap.create({
    data: {
      title: fields.title,
      courses: {
        connect: fields.courses.map((courseId) => ({ id: courseId }))
      },
      admin_id: userId
    }
  })
}

export const updateRoadmapById = async (roadmapId: string, fields: IRoadmap) => {
  const roadmap = await db.roadmap.findUnique({
    where: { id: roadmapId },
    select: { courses: { select: { id: true } } }
  })

  return await db.roadmap.update({
    where: { id: roadmapId },
    data: {
      title: fields.title,
      courses: {
        disconnect: roadmap?.courses.map((course) => ({ id: course.id })),
        connect: fields.courses.map((courseId) => ({ id: courseId }))
      }
    }
  })
}

export const deleteRoadmapById = async (roadmapId: string) => {
  return await db.roadmap.delete({ where: { id: roadmapId } })
}

export const getRoadmapById = async (roadmapId: string) => {
  return await db.roadmap.findUnique({
    where: { id: roadmapId },
    include: {
      courses: {
        include: {
          _count: { select: { videos: true } }
        }
      }
    }
  })
}

export const getAllRoadmaps = async () => {
  return await db.roadmap.findMany({
    include: {
      courses: {
        include: {
          _count: { select: { videos: true } }
        }
      }
    }
  })
}
