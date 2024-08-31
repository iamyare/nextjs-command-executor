import React from 'react'
import Sidebar from './components/sidebar'
import { cookies } from 'next/headers'
import { getApiKeyByUser, getLastCommands, getUserSession } from '@/actions'
import Alert from './components/alert'
import { ApiKeysProvider } from '@/context/useAPIKeysContext'
import { toast } from '@/components/ui/use-toast'

export default async function layout({
  children
}: {
  children: React.ReactNode
}) {
  const sidebarIsOpen = cookies().get('sidebarIsOpen')
  const defaultOpen =
    sidebarIsOpen && sidebarIsOpen.value !== 'undefined'
      ? JSON.parse(sidebarIsOpen.value)
      : true

  const { user, error } = await getUserSession()

  if (error) {
    return <Alert message={error.message} errorCode={error.code} />
  }
  if (!user) {
    return <Alert message='No se pudo obtener la información del usuario' errorCode={'No se pudo obtener la información'} />
  }

  const { appiKey } = await getApiKeyByUser({ userId: user.id })


  const { commands, commandsError } = await getLastCommands({ userId: user.id })
  if (commandsError || !commands) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Error al obtener los comandos ejecutados.',
    })
  }

  return (
    <>
    <ApiKeysProvider
      initialApiKeys={appiKey ?? undefined}
      initialUserId={user.id}
    >
      <Sidebar defaultOpen={defaultOpen} user={user} lastCommands={commands}>
        {children}
      </Sidebar>
    </ApiKeysProvider>
    </>
  )
}
