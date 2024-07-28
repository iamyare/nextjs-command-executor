import HeadersContent from '@/components/headers'
import { getDevicesByUser, getUserSession } from '../../../actions'
import { DeviceList } from './components/device-list'

export default async function CommandsPage() {
  const {user, error} = await getUserSession()

  if (error || !user) {
    return console.log(error)
  }

  const { devices, devicesError } = await getDevicesByUser({
    userId: user.id
  })

  if (devicesError || !devices) {
    return console.log(devicesError)
  }
  return (
    <main className=''>
      <HeadersContent className='flex flex-row justify-between items-center w-full'
        title='Dispositivos'
        description='Aquí puedes ver todos los dispositivos que has registrado.'
      >
      </HeadersContent>

      <DeviceList data={devices} />
    </main>
  )
}