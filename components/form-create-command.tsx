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

import { AnimatePresence, motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Loader, PenLine } from 'lucide-react'
import {  useEffect, useState, useTransition } from 'react'

import { toast } from '@/components/ui/use-toast'
import { getDevicesByUser, InsertCommand } from '@/actions'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { IAFormInput } from './ai-form'


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
  user_id: z.string().min(1, {
    message: 'El usuario es requerido'
  })
});

export default function FormCreateCommand({
  userId,
  className
}: {
  userId: string
  className?: string
}) {
  const [isPeding, startTransition] = useTransition()
  const router = useRouter()
  const [devices, setDevices] = useState<Device[] | null>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      command: '',
      device_id: '',
      user_id: userId
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
      const { commandInsertError } = await InsertCommand({ data: data })
      if (commandInsertError) {
        console.log(commandInsertError)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        })
        return undefined
      }

      form.reset()
      router.refresh()
      toast({
        variant: 'default',
        title: 'Command created',
        description: `The command ${data.name} has been created.`
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

        <AnimatePresence>
          {form.watch('name') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name='device_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dispositivo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {form.watch('device_id') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name='command'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' flex items-center '>
                      Comando

                    </FormLabel>
                    <FormControl>
                      {/* <div className='relative'>
                        <Terminal className='absolute text-muted-foreground size-4 left-3 top-1/2 -translate-y-1/2' />

                        <Input
                          placeholder='open calculator.exe'
                          className='pl-8'
                          {...field}
                        />
                      </div> */}
                      <IAFormInput field={field} watch={form.watch} osDevice={
                        devices?.find((device) => device.id === form.watch('device_id'))?.os ?? ''
                      } />

                    </FormControl>
                    <FormDescription>
                      Este es el código que se ejecutará cuando se invoque el
                      comando.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex w-full justify-end'>
          <Button type='submit' className='glow text-white'>
            {isPeding ? (
              <Loader className=' size-4 animate-spin' />
            ) : (
              <PenLine className='size-4' />
            )}
            <span className='ml-2'>Crear comando</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
