'use client'

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
import { Trash } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from '@/components/ui/use-toast'
import { deleteDeviceById } from '@/actions'
import { useRouter } from 'next/navigation'

const title = 'Eliminar dispositivo'
const description =
  '¿Estás seguro de que deseas eliminar este dispositivo? Esta acción no se puede deshacer. Ten en cuenta que se perderá toda la información relacionada con el dispositivo.'

interface DeleteDeviceModalProps {
  deviceID: string
}

export default function DeleteDeviceModal({
  deviceID
}: DeleteDeviceModalProps) {
  const [open, setOpen] = useState(false)
  const [isPeding, startTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 600px)')
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const { error } = await deleteDeviceById({ deviceId: deviceID })
      console.log(error)
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo eliminar el dispositivo'
        })
        return
      }
      toast({
        title: 'Dispositivo eliminado',
        description: 'El dispositivo se ha eliminado con éxito'
      })
      router.refresh()
      setOpen(false)
    })
  }

  const renderContent = () => (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center md:justify-end space-x-2'>
        <Button variant='ghost' onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          variant='destructive'
          onClick={handleDelete}
          disabled={isPeding}
        >
          {isPeding ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </div>
    </>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'ghost'}
            className='justify-start hover:bg-destructive/20 hover:text-red-500 hover:animate-shake'
          >
            <Trash className='h-4 w-4 mr-2' />
            Eliminar dispositivo
          </Button>
        </DialogTrigger>
        <DialogContent
          classNameGradient='gradient-experience__1_destructive z-[50]'
          classNameOverlay='bg-background/50'
          className='sm:max-w-[425px] border-destructive/30 bg-destructive/5 '
        >
          {renderContent()}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={'ghost'}
          className='justify-start hover:bg-destructive/20 hover:text-red-500 hover:animate-shake'
        >
          <Trash className='h-4 w-4 mr-2' />
          Eliminar dispositivo
        </Button>
      </DrawerTrigger>
      <DrawerContent
        classNameGradient='gradient-experience__1_destructive z-[50]'
        classNameOverlay='bg-background/50'
      >
        {renderContent()}
      </DrawerContent>
    </Drawer>
  )
}
