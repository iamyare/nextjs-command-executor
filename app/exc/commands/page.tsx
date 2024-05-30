import { getUserSession, SelectCommand } from '../../../actions'
import { CommandList } from './components/command-list'
import { CreateCommandModal } from './components/modal-create'

export default async function CommandsPage() {
  const {user, error} = await getUserSession()

  if (error || !user) {
    return console.log(error)
  }

  const { commands, commandsError } = await SelectCommand({
    userId: user.id
  })



  if (commandsError || !commands) {
    return console.log(commandsError)
  }
  return (
    <main className=''>
      <section className='flex justify-between items-center w-full'>
        <h2 className=' text-2xl font-semibold'>Lista de comandos</h2>
        <CreateCommandModal
          title={'Crear comando'}
          description='Crea un nuevo comando para ejecutar en tus dispositivos.'
          userId={user.id}
        />
      </section>
      <CommandList data={commands} />
    </main>
  )
}
