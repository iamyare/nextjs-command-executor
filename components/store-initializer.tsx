'use client'
import { useApiKeysStore } from '@/store/api-keys-store'
import { useUserStore } from '@/store/user-store'
import { useEffect } from 'react'

type StoreInitializerProps = {
  user: User | null
  apiKeys?: ApiKey | null
  userId: string
}

export default function StoreInitializer({
  user,
  apiKeys,
  userId
}: StoreInitializerProps) {
  useEffect(() => {
    useUserStore.getState().setUser(user)
    useApiKeysStore.getState().setApiKeys(apiKeys || null)
    useApiKeysStore.getState().setUserId(userId)
  }, [user, apiKeys, userId])

  return null
}
