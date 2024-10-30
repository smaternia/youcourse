import { MetaType } from './course.type'

export type VideoType = {
  id: string
  title: string
  video_url: string
  course_id: string
  description: string
  created_at: string
  updated_at: string
  youtube_info: YoutubeVideoType
}

export type VideoResponseType = {
  message: string
  data: VideoType[]
  meta: MetaType
}

export type ThumbnailType = {
  url: string
  width: number
  height: number
}

export type ChannelType = {
  title: string
  description: string
  customUrl: string
  publishedAt: string
  thumbnails: {
    default: ThumbnailType
    medium: ThumbnailType
    high: ThumbnailType
  }
  localized: {
    title: string
    description: string
  }
  country: string
}

export type YoutubeVideoType = {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: ThumbnailType
    medium: ThumbnailType
    high: ThumbnailType
    standard: ThumbnailType
    maxres: ThumbnailType
  }
  channelTitle: string
  tags: string[]
  categoryId: string
  liveBroadcastContent: string
  localized: {
    title: string
    description: string
  }
  defaultAudioLanguage: string
  duration: string
  channel: ChannelType
}
