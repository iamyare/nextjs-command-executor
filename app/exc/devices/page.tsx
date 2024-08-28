import HeadersContent from '@/components/headers'
import { getDevicesByUser, getUserSession } from '../../../actions'
import { DeviceList } from './components/device-list'
import { CreateTokenModal } from './components/modal-create-token'

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
        description='Lista de dispositivos asociados a su cuenta.'
      >
      <CreateTokenModal
          title={'Token generado'}
          description='Este es su token único que puede utilizarse para autenticar su aplicación.'
          userId={user.id}
        />
      </HeadersContent>
      <DeviceList data={devices} />
    </main>
  )
}