import db from '../utils/db'
import logger from '../utils/logger'
import { userSelect } from '../utils/service'
import { compressedFile, deleteFile } from '../utils/fileSettings'

import { type IUserUpdatePayload } from '../types/user.type'

export const getUserLogin = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: userSelect.select
  })
}

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({ where: { username } })
}

export const updateUserById = async (userId: string, payload: IUserUpdatePayload) => {
  return await db.user.update({
    where: { id: userId },
    data: payload,
    select: userSelect.select
  })
}

export const processPhoto = async (oldPhoto: string, filename: string) => {
  if (oldPhoto !== '') await deleteFile(oldPhoto)
  const compressedPhoto = await compressedFile(filename)
  if (compressedPhoto) {
    return compressedPhoto as string
  } else {
    logger.error('Gagal mengubah foto')
    return oldPhoto
  }
}

export const updatePhoto = async (userId: string, filename: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User tidak ditemukan')

  const oldPhoto = user.photo
  const newPhoto = await processPhoto(oldPhoto, filename)

  return await db.user.update({
    where: { id: userId },
    data: { photo: newPhoto },
    select: userSelect.select
  })
}

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const updateEmail = async (userId: string, email: string, token: string) => {
  return await db.user.update({ where: { id: userId }, data: { email, is_email_verified: false, token } })
}

interface getMyCoursesParams {
  page: number
  limit: number
  search: string
  userId: string
}

export const getMyCourses = async ({ page, limit, search, userId }: getMyCoursesParams) => {
  const [data, count] = await db.$transaction([
    db.course.findMany({
      where: {
        members: { some: { user_id: userId } },
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
        members: { some: { user_id: userId } },
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      }
    })
  ])

  return { data, count }
}
