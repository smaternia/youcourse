import db from '../utils/db'
import { type ICourseUpdate, type ICourse } from '../types/course.type'
import { compressedFile } from '../utils/fileSettings'
import { processPhoto } from './user.service'

export const addNewCourse = async (fields: ICourse, userId: string) => {
  const compressedImage = await compressedFile(fields.thumbnail)
  return await db.course.create({
    data: {
      admin_id: userId,
      title: fields.title,
      thumbnail: compressedImage as string,
      description: fields.description
    }
  })
}

export const getAllCourses = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.course.findMany({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { videos: true, members: true }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.course.count({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      }
    })
  ])

  return { data, count }
}

export const getCourseById = async (courseId: string) => {
  return await db.course.findUnique({ where: { id: courseId } })
}

export const getPublishedCourseById = async (courseId: string) => {
  return await db.course.findUnique({
    where: { id: courseId, is_published: true },
    include: {
      // only include 1 video
      videos: {
        take: 1,
        orderBy: { created_at: 'asc' }
      },
      _count: {
        select: { videos: true, members: true }
      }
    }
  })
}

export const updateCourseById = async (courseId: string, fields: ICourseUpdate) => {
  const course = await getCourseById(courseId)
  if (!course) throw new Error('Course not found')

  let newThumbnail = course.thumbnail
  if (fields.thumbnail && typeof fields.thumbnail === 'string') {
    const oldThumbnail = course.thumbnail
    newThumbnail = await processPhoto(oldThumbnail, fields.thumbnail)
  }

  return await db.course.update({
    where: { id: courseId },
    data: {
      title: fields.title,
      description: fields.description,
      thumbnail: newThumbnail
    }
  })
}

export const deleteCourseById = async (courseId: string) => {
  return await db.course.delete({ where: { id: courseId } })
}

export const updatePublishedCourse = async (courseId: string, published: boolean) => {
  return await db.course.update({ where: { id: courseId }, data: { is_published: published } })
}

export const addMemberToCourse = async (courseId: string, userId: string) => {
  return await db.course.update({
    where: { id: courseId },
    data: {
      members: {
        create: {
          user_id: userId
        }
      }
    }
  })
}

export const removeMemberFromCourse = async (courseId: string, userId: string) => {
  return await db.course.update({
    where: {
      id: courseId,
      admin_id: {
        not: userId
      },
      members: {
        some: {
          user_id: userId
        }
      }
    },
    data: {
      members: {
        deleteMany: {
          user_id: userId
        }
      }
    }
  })
}

export const getCoursesByPublished = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.course.findMany({
      where: {
        is_published: true,
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { videos: true, members: true }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.course.count({
      where: {
        is_published: true,
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      }
    })
  ])

  return { data, count }
}

export const getAllCoursesPublished = async () => {
  return await db.course.findMany({
    where: {
      is_published: true
    },
    orderBy: { created_at: 'desc' }
  })
}
