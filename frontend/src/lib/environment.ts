const ENV = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  storageUrl: import.meta.env.VITE_STORAGE_URL as string,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  apiKeyTinyMce: import.meta.env.VITE_TINY_MCE_API_KEY as string,
  apiKeyYouTube: import.meta.env.VITE_YOUTUBE_API_KEY as string
}

export default ENV
