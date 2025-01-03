import { create } from 'zustand'

const defaultUser: User = {
  id: '',
  full_name: 'Usuario Anónimo',
  email: '',
  avatar_url: '',
  alert: false,
  created_at: ''
}

type UserStore = {
  user: User
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: defaultUser,
  setUser: (user) => set({ user: user || defaultUser })
}))
