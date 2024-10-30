import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const bytesToSize = (bytes: number): string => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) return '0 Byte'

  const i: number = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
}

export const formatDate = (date: string, type: 'with-hour' | 'without-hour' = 'without-hour') => {
  // Membuat objek Date dari string
  const tanggalObjek = new Date(date)

  // Mendapatkan tanggal, bulan, dan tahun dari objek Date
  const tanggal = tanggalObjek.getDate()
  const bulan = tanggalObjek.getMonth() // Ingat bahwa bulan dimulai dari 0 (Januari = 0)
  const tahun = tanggalObjek.getFullYear()

  // Array untuk nama bulan
  const namaBulan = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Mendapatkan nama bulan dari array
  const namaBulanStr = namaBulan[bulan]
  const hours = ('0' + tanggalObjek.getHours()).slice(-2)
  const minutes = ('0' + tanggalObjek.getMinutes()).slice(-2)

  // Format output
  const withoutHour = tanggal + ' ' + namaBulanStr + ' ' + tahun
  const withHour = `${withoutHour}, ${hours}:${minutes}`

  return type === 'with-hour' ? withHour : withoutHour
}

export const extractYouTubeUrl = (url: string) => {
  const videoIdMatch = url.match(
    // eslint-disable-next-line no-useless-escape
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return videoIdMatch ? videoIdMatch[1] : null
}

export const convertDurationToSeconds = (duration: string) => {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  const hours = parseInt(matches?.[1] ?? '') || 0
  const minutes = parseInt(matches?.[2] ?? '') || 0
  const seconds = parseInt(matches?.[3] ?? '') || 0

  return hours * 3600 + minutes * 60 + seconds
}

export const formatDuration = (duration: string) => {
  const durationInSeconds = convertDurationToSeconds(duration)

  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
  const seconds = durationInSeconds % 60

  return `${hours ? `${hours}:` : ''}${minutes < 10 && hours ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
