import React from 'react'
import { CommandListHistory } from '../commands/components/command-list-history'
import { getHistoryCommands, getUserSession } from '@/actions'
import HeadersContent from '@/components/headers'

export default async function HistoryPage() {
    const {user, error} = await getUserSession()
    if (error || !user) {
        return console.log(error)
    }
    
    const {commands, commandsError } = await getHistoryCommands({userId: user.id})
    if (commandsError || !commands) {
        return console.log(commandsError)
    }

  return (
    <main className=''>
      <HeadersContent title='Historial de ejecuciones' description='Aquí puedes ver todas las ejecuciones que has realizado.' />
      <CommandListHistory data={commands} />
    </main>
  )
}
