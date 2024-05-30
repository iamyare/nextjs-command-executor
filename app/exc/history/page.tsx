import React from 'react'
import { CommandListHistory } from '../commands/components/command-list-history'
import { getHistoryCommands, getUserSession } from '@/actions'

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
      <section className='flex justify-between items-center w-full'>
        <h2 className=' text-2xl font-semibold'>Historial de ejecuciones</h2>

      </section>
      <CommandListHistory data={commands} />
    </main>
  )
}
