'use client'

import FormEditDeviceName from '@/components/form-edit-device'
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

const title = 'Editar nombre del dispositivo'
const description = 'Actualiza el nombre del dispositivo según tus necesidades.'

interface UpdateDeviceNameModal {
  deviceID: string
  deviceName: string
}

export default function EditDeviceNameModal({
  deviceID,
  deviceName,
}: UpdateDeviceNameModal) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'ghost'} className='justify-start'>
            <Pencil className='size-4 mr-2' />
            Editar dispositivo
          </Button>
        </DialogTrigger>
        <DialogContent className=' max-w-lg '>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FormEditDeviceName
            deviceID={deviceID}
            deviceName={deviceName}
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
          Editar dispositivo
        </Button>
      </DrawerTrigger>
      <DrawerContent className=' h-[85dvh]'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <FormEditDeviceName
          className=' px-4 pb-5'
          deviceID={deviceID}
          deviceName={deviceName}
          setOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  )
}