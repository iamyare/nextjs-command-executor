import { SelectCommand } from '../../../actions'
import { CommandList } from './components/command-list'
import { CreateCommandModal } from './components/modal-create'

export default async function CommandsPage() {
  const { commands, commandsError } = await SelectCommand({
    userId: 'f19615b5-82cf-4b41-a8c1-d8f4b284bdb7'
  })

  if (commandsError || !commands) {
    console.log(commandsError)
  }
  return (
    <main className=''>
      <section className='flex justify-between items-center w-full'>
        <h2 className=' text-2xl font-semibold'>Lista de comandos</h2>
        <CreateCommandModal
          title={'Crear comando'}
          description='Crea un nuevo comando para ejecutar en tus dispositivos.'
        />
      </section>
      <CommandList data={commands} />
    </main>
  )
}
