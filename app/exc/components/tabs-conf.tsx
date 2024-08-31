'use client'
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
    <Tabs defaultValue='account' className=' flex flex-col md:flex-row w-full h-full gap-2'>
      <TabsList className=' flex md:flex-col h-full bg-transparent md:justify-start items-start'>
        <TabsTrigger className=' w-full md:justify-start' value='account'>
          Cuenta
        </TabsTrigger>
        <TabsTrigger className=' w-full md:justify-start' value='api'>
          API
        </TabsTrigger>
        <TabsTrigger className=' w-full md:justify-start' value='sessions'>
          Sesiones
        </TabsTrigger>
        <TabsTrigger className=' w-full md:justify-start' value='delete'>
          Eliminar cuenta
        </TabsTrigger>
      </TabsList>
      <div className=' w-full px-4'>
      <TabsContent className=' w-full' value='account'>
        <AccountTabs userId={userId} setOpen={setOpen} />
      </TabsContent>
      <TabsContent className=' w-full' value='api'>
        <APITabs userId={userId} setOpen={setOpen} />
      </TabsContent>
      <TabsContent value='sessions'>
        <div className='text-muted-foreground'>
          Luego se mostraran las sesiones
        </div>
      </TabsContent>
      <TabsContent value='delete'>
      <div className='text-muted-foreground'>
        Luego se mostrara la opcion de eliminar cuenta
        </div>
      </TabsContent>
      </div>

    </Tabs>
  )
}
