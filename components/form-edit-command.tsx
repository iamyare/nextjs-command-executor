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
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { IAFormInput } from './ai-form'
import { Loader, PenLine } from 'lucide-react'

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre del comando es requerido'
  }),
  command: z.string().min(1, {
    message: 'El código del comando es requerido'
  }),
  device: z.string().min(1, {
    message: 'El dispositivo es requerido'
  }),
  id: z.string().min(1, {
    message: 'No hay un id'
  })
})

interface UpdateCommandModal  {
    commandID: string
    commandName: string
    command: string
    className?: string
}

export default function FormEditCommand({ commandID, commandName, command, className }: UpdateCommandModal) {
  const [isPeding, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: commandID,
      name: commandName,
      command: command,
      device: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      form.reset()
      router.refresh()
      toast({
        variant: 'default',
        title: 'Command Updated',
        description: `The command ${data.name} has been updated.`
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
                name='device'
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
                        <SelectItem value='id21321'>
                          Mackbook Air de Yamir
                        </SelectItem>
                        <SelectItem value='id217362781'>PC-Station</SelectItem>
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
                      <IAFormInput field={field} watch={form.watch} />

                    </FormControl>
                    <FormDescription>
                      Este es el código que se ejecutará cuando se invoque el
                      comando.
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
