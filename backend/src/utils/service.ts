export const userSelect = {
  select: {
    id: true,
    fullname: true,
    username: true,
    email: true,
    photo: true,
    provider: true,
    role: true
  }
}

export const extractYouTubeVideoId = (url: string) => {
  const videoIdMatch = url.match(
    // eslint-disable-next-line no-useless-escape
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return videoIdMatch ? videoIdMatch[1] : null
}
