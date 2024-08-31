'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'
import { cn } from '@/lib/utils'
import { UpdateDeviceName } from '@/actions'
import { Loader, PenLine } from 'lucide-react'

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre del dispositivo es requerido'
  }),
  id: z.string().min(1, {
    message: 'No hay un id'
  }),
})

interface UpdateDeviceNameModal {
  deviceID: string
  deviceName: string
  setOpen: (open: boolean) => void
  className?: string
}

export default function FormEditDeviceName({
  deviceID,
  deviceName,
  setOpen,
  className
}: UpdateDeviceNameModal) {
  const [isPeding, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: deviceID,
      name: deviceName,
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { deviceUpdateError } = await UpdateDeviceName({ data: data })
      if (deviceUpdateError) {
        console.log(deviceUpdateError)
        toast({
          variant: 'destructive',
          title: 'Error al actualizar el nombre del dispositivo',
          description: 'Hubo un error al actualizar el nombre del dispositivo. Por favor, intente de nuevo.'
        })
        return
      }
      form.reset()
      router.refresh()
      setOpen(false)
      toast({
        variant: 'default',
        title: 'Nombre del dispositivo actualizado',
        description: `El nombre del dispositivo ha sido actualizado a ${data.name}.`
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className=' space-y-1'>
              <FormLabel>Nombre del dispositivo</FormLabel>
              <FormControl>
                <Input placeholder='Nombre del dispositivo' {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre que se usará para identificar el dispositivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex w-full justify-end'>
          <Button type='submit' className='glow text-white'>
            {isPeding ? (
              <Loader className=' size-4 animate-spin' />
            ) : (
              <PenLine className='size-4' />
            )}
            <span className='ml-2'>Actualizar nombre del dispositivo</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}