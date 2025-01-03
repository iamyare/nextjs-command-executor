import { create } from 'zustand'

type ApiKeysStore = {
  apiKeys: ApiKey | null
  userId: string
  setApiKeys: (keys: ApiKey | null) => void
  setUserId: (id: string) => void
}

export const useApiKeysStore = create<ApiKeysStore>((set) => ({
  apiKeys: null,
  userId: '',
  setApiKeys: (newKeys) => set({ apiKeys: newKeys }),
  setUserId: (id) => set({ userId: id })
}))
