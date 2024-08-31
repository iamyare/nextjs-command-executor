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
import { Plus } from 'lucide-react'
import FormCreateCommand from '@/components/form-create-command'

export function CreateCommandModal({
  userId,
  title,
  description
}: {
  userId: string
  title: string
  description: string
}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'outline'} type='submit'>
            <Plus className='size-4 mr-2' />
            Crear comando
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
      <DrawerTrigger asChild>
        <Button variant={'outline'} type='submit'>
          <Plus className='size-4 mr-2' />
          Crear comando
        </Button>
      </DrawerTrigger>
      <DrawerContent className=' h-[85dvh]'>
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
