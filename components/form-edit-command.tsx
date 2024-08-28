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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { IAFormInput } from './ai-form'
import { Loader, PenLine } from 'lucide-react'
import { getDevicesByUser, UpdateCommand } from '@/actions'

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre del comando es requerido'
  }),
  command: z.string().min(1, {
    message: 'El código del comando es requerido'
  }),
  device_id: z.string().min(1, {
    message: 'El dispositivo es requerido'
  }),
  id: z.string().min(1, {
    message: 'No hay un id'
  }),

})

interface UpdateCommandModal {
  commandID: string
  commandName: string
  command: string
  commandDevice: string
  userId: string
  setOpen: (open: boolean) => void
  className?: string
}

export default function FormEditCommand({
  commandID,
  commandName,
  command,
  className,
  commandDevice,
  userId,
  setOpen
}: UpdateCommandModal) {
  const [isPeding, startTransition] = useTransition()
  const [devices, setDevices] = useState<Device[] | null>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: commandID,
      name: commandName,
      command: command,
      device_id: commandDevice,
    }
  })

  useEffect(() => {
    async function getDevices() {
      const {devices, devicesError} = await getDevicesByUser({ userId: userId })
      if (devicesError) {
        console.log(devicesError)
        return
      }
      setDevices(devices)
    }
    getDevices()
  }, [userId])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { commandUpdateError } = await UpdateCommand({ data: data })
      if (commandUpdateError) {
        console.log(commandUpdateError)
        toast({
          variant: 'destructive',
          title: 'Error al actualizar el comando',
          description: 'Hubo un error al actualizar el comando. Por favor, intente de nuevo.'
        })
        return
      }
      form.reset()
      router.refresh()
      setOpen(false)
      toast({
        variant: 'default',
        title: 'Comando Actualizado',
        description: `El comando ${data.name} ha sido actualizado.`
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
              <FormLabel>Nombre del comando</FormLabel>
              <FormControl>
                <Input placeholder='Abrir Calculadora' {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre que se usará para invocar el comando.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='device_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dispositivo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccione el dispositivo' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {
                          devices ? (

                            devices?.map((device) => (
                              <SelectItem value={device.id} key={device.id}>
                                {device.name} - <span className='text-muted-foreground'>{device.os}</span>
                              </SelectItem>
                            ))
                          ):(
                            <SelectItem value='loading'>
                              Cargando dispositivos...
                            </SelectItem>
                          )
                        }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='command'
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' flex items-center '>Comando</FormLabel>
              <FormControl>
                {/* <div className='relative'>
                        <Terminal className='absolute text-muted-foreground size-4 left-3 top-1/2 -translate-y-1/2' />

                        <Input
                          placeholder='open calculator.exe'
                          className='pl-8'
                          {...field}
                        />
                      </div> */}
                <IAFormInput
                  field={field}
                  watch={form.watch}
                  osDevice={form.watch('device_id')}
                />
              </FormControl>
              <FormDescription>
                Este es el comando que se ejecutará en el dispositivo. <br />
                <span className=' font-semibold'>(Presione # para activar la IA)</span>
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
            <span className='ml-2'>Actualizar comando</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
