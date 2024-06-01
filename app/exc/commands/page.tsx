import HeadersContent from '@/components/headers'
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
      <HeadersContent className='flex flex-row justify-between items-center w-full'
        title='Comandos'
        description='Aquí puedes ver todos los comandos que has creado.'
      >
        <CreateCommandModal
          title={'Crear comando'}
          description='Crea un nuevo comando para ejecutar en tus dispositivos.'
          userId={user.id}
        />
      </HeadersContent>

      <CommandList data={commands} />
    </main>
  )
}
