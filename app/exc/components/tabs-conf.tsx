import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AccountTabs from './tabs-config/account'
import APITabs from './tabs-config/api'

export default function TabsConf({
    userId,
  setOpen
}: {
    userId: string
  setOpen: (open: boolean) => void
}) {
  return (
    <Tabs defaultValue='account' className=' flex w-full h-full gap-2'>
      <TabsList className=' flex flex-col h-full bg-transparent justify-start items-start'>
        <TabsTrigger className=' w-full justify-start' value='account'>
          Cuenta
        </TabsTrigger>
        <TabsTrigger className=' w-full justify-start' value='api'>
          API
        </TabsTrigger>
        <TabsTrigger className=' w-full justify-start' value='sessions'>
          Sesiones
        </TabsTrigger>
        <TabsTrigger className=' w-full justify-start' value='delete'>
          Eliminar cuenta
        </TabsTrigger>
      </TabsList>
      <TabsContent className=' w-full' value='account'>
        <AccountTabs userId={userId} setOpen={setOpen} />
      </TabsContent>
      <TabsContent className=' w-full' value='api'>
        <APITabs userId={userId} setOpen={setOpen} />
      </TabsContent>
      <TabsContent value='sessions'>
        <div>Sesiones</div>
      </TabsContent>
      <TabsContent value='delete'>
        <div>Eliminar cuenta</div>
      </TabsContent>
    </Tabs>
  )
}
