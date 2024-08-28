'use client'
import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Settings } from 'lucide-react'
import TabsConf from './tabs-conf'

export function ConfigModal({
  userId,

}: {
  userId: string
}) {
  const title = 'Configuración'
  const description = 'Configuración de la cuenta'
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'ghost'}
            size={'icon'}
          >
            <Settings className=' size-5' />
          </Button>
        </DialogTrigger>
        <DialogContent className=' max-w-lg '>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <TabsConf setOpen={setOpen} userId={userId} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
      <Button
            variant={'ghost'}
            size={'icon'}
          >
            <Settings className=' size-5' />
          </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <TabsConf setOpen={setOpen} userId={userId} />
      </DrawerContent>
    </Drawer>
  )
}
