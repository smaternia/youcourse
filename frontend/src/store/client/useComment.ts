import { create } from 'zustand'

interface CommentStore {
  comment: {
    id: string
    content: string
  }
  setComment: (comment: CommentStore['comment']) => void
}

export const useComment = create<CommentStore>((set) => ({
  comment: {
    id: '',
    content: ''
  },
  setComment: (comment) => set({ comment })
}))
