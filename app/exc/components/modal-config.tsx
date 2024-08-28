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
import { Plus, Settings } from 'lucide-react'
import FormCreateCommand from '@/components/form-create-command'

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
            className='relative flex justify-start select-none  items-center rounded-sm px-3 py-1.5  w-full outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 '
          >
            <Settings className=' size-4' />
            <span className=' ml-2'>Configuración</span>
          </Button>
        </DialogTrigger>
        <DialogContent className=' max-w-lg '>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FormCreateCommand userId={userId} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
      <Button
            variant={'ghost'}
            className='relative flex justify-start select-none  items-center rounded-sm px-3 py-1.5  w-full outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 '
          >
            <Settings className=' size-4' />
            <span className=' ml-2'>Configuración</span>
          </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <FormCreateCommand
          className=' px-4 pb-5'
          userId={userId}
          setOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  )
}
