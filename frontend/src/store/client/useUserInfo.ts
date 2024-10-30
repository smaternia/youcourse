import { UserType } from '@/lib/types/user.type'
import { create } from 'zustand'

interface UserInfoStore {
  user: UserType | null
  setUser: (user: UserType) => void
  removeUser: () => void
}

export const useUserInfo = create<UserInfoStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user-info') ?? '""'),
  setUser: (user) => {
    localStorage.setItem('user-info', JSON.stringify(user))
    set({ user })
  },
  removeUser: () => {
    localStorage.removeItem('user-info')
    set({ user: null })
  }
}))
