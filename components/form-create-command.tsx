
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
import { useToast } from "@/components/ui/use-toast"


import { AnimatePresence, motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Loader, PenLine, Terminal } from 'lucide-react'
import { useTransition } from 'react'

import { toast } from '@/components/ui/use-toast'
import { InsertCommand } from '@/actions'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

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
  user_id: z.string().min(1, {
    message: 'El usuario es requerido'
  })
})

export default function FormCreateCommand({className}: {className?: string}) {

    const [isPeding, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: '',
        command: '',
        device: '',
        user_id: 'f19615b5-82cf-4b41-a8c1-d8f4b284bdb7'
      }
    })
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
      startTransition(async () => {
        const { commandInsertError} = await InsertCommand({data: data})
        if (commandInsertError) {
          console.log(commandInsertError)
           toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
            return undefined
        }
  
        form.reset()
        router.refresh()
        toast({
          variant: "default",
          title: "Command created",
          description: `The command ${data.name} has been created.`,
        })
        
      })
    }
  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
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
                      <SelectItem value='id217362781'>
                        PC-Station
                      </SelectItem>
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
        {form.watch('device') && (
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
                  <FormLabel>Comando</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Terminal className='absolute text-muted-foreground size-4 left-3 top-1/2 -translate-y-1/2' />

                      <Input
                        placeholder='open calculator.exe'
                        className='pl-8'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Este es el código que se ejecutará cuando se invoque
                    el comando.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex w-full justify-end'>
        <Button type='submit'>
          {isPeding ? (<Loader className=' size-4 animate-spin'/>) : (<PenLine className='size-4' />)}
          <span className='ml-2'>Crear comando</span>
          </Button>
      </div>
    </form>
  </Form>
  )
}
