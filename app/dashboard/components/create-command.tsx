'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

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

const FormSchema = z.object({
  commandName: z.string().min(1, {
    message: 'El nombre del comando es requerido'
  }),
  commandCode: z.string().min(1, {
    message: 'El código del comando es requerido'
  })
})

export default function CreateCommand() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      commandName: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Card className=' bg-background/20'>
      <CardHeader>
        <CardTitle>Crear comando</CardTitle>
        <CardDescription>
          Elija un nombre para el comando y escriba el código que se ejecutará
          cuando se invoque el comando.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='commandName'
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
              {form.watch('commandName') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <FormField
                    control={form.control}
                    name='commandCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comando</FormLabel>
                        <FormControl>
                          <Input placeholder='open calculator.exe' {...field} />
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

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
