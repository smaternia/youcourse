import db from '../utils/db'
import { type IVideo } from '../types/video.type'
import ENV from '../utils/environment'
import axios from 'axios'

interface IVideoFields extends IVideo {
  youtube_info: any
}

export const addNewVideo = async (fields: IVideoFields, userId: string) => {
  return await db.video.create({ data: { admin_id: userId, ...fields } })
}

export const getVideoById = async (videoId: string) => {
  return await db.video.findUnique({ where: { id: videoId } })
}

export const updateVideoById = async (videoId: string, fields: IVideoFields) => {
  return await db.video.update({ where: { id: videoId }, data: fields })
}

export const deleteVideoById = async (videoId: string) => {
  return await db.video.delete({ where: { id: videoId } })
}

export const getVideosByCourseId = async (courseId: string, search: string) => {
  return await db.video.findMany({
    where: {
      course_id: courseId,
      OR: [{ title: { contains: search } }, { description: { contains: search } }]
    },
    orderBy: { created_at: 'asc' }
  })
}

export const getYoutubeVideoInfo = async (videoId: string) => {
  const snippet = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${ENV.apiKeyYouTube}`
  )

  const contentDetails = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${ENV.apiKeyYouTube}`
  )

  const channel = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${snippet.data.items[0].snippet.channelId}&key=${ENV.apiKeyYouTube}`
  )

  const info = snippet.data.items[0].snippet
  const duration = contentDetails.data.items[0].contentDetails.duration
  const channelInfo = channel.data.items[0].snippet

  return {
    ...info,
    duration,
    channel: channelInfo
  }
}
