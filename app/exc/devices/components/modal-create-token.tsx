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
import {  Plus } from 'lucide-react'
import FormCreateToken from '@/components/form-create-token'

export function CreateTokenModal({userId, title, description}: {userId: string, title: string, description: string}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog  open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant={'outline'} type='submit'>
          <Plus className='size-4 mr-2' />
          Generar token
        </Button>
        </DialogTrigger>
        <DialogContent className=' max-w-lg '>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
          </DialogHeader>
        <FormCreateToken userId={userId}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={'outline'}  type='submit'>
          <Plus className='size-4 mr-2' />
          Generar token
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>
            {title}
          </DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <FormCreateToken className=' px-4 pb-5' userId={userId}/>
      </DrawerContent>
    </Drawer>
  )
}