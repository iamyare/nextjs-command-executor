'use client'

import FormEditCommand from '@/components/form-edit-command'
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
import { useMediaQuery } from '@/hooks/use-media-query'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

const title = 'Editar comando'
const description = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'

interface UpdateCommandModal {
  commandID: string
  commandName: string
  command: string
  commandDevice: string
  userId: string
}

export default function EditCommandModal({
  commandID,
  commandName,
  command,
  commandDevice,
  userId
}: UpdateCommandModal) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'ghost'} className='justify-start'>
            <Pencil className='size-4 mr-2' />
            Editar comando
          </Button>
        </DialogTrigger>
        <DialogContent className=' max-w-lg '>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FormEditCommand
            commandID={commandID}
            command={command}
            commandName={commandName}
            commandDevice={commandDevice}
            userId={userId}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={'ghost'} className='justify-start'>
          <Pencil className='size-4 mr-2' />
          Editar comando
        </Button>
      </DrawerTrigger>
      <DrawerContent className=' h-[85dvh]'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <FormEditCommand
          className=' px-4 pb-5'
          commandID={commandID}
          command={command}
          commandName={commandName}
          commandDevice={commandDevice}
          userId={userId}
          setOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  )
}
