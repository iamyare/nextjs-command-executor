import CreateCommand from './components/create-command'
import Suggestions from './components/suggestions'

export default async function DashboardPage() {
  return (
    <main className='flex flex-col gap-2'>
      <Suggestions />
      <CreateCommand />
    </main>
  )
}
