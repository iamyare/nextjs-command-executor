'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Separator } from '@/components/ui/separator'
import { useEffect, useTransition } from 'react'
import { getUserSingle } from '@/actions'

const FormSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

export default function AccountTabs({
  userId,
  setOpen
}: {
  userId: string
  setOpen: (open: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const [isLoading, startLoading] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: ''
    }
  })

  useEffect(() => {
    startLoading(async() => {
      const {user, error} = await getUserSingle({userId})
      if (error){
        return console.log(error)
      }
      if (!user){
        return console.log('No hay usuario')
      }

      form.setValue('full_name', user.full_name)
    })
  }, [form, userId])
    

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })

      setOpen(false)
    })
  }

  return (
    <section className='flex flex-col gap-2'>
      <div className=' flex flex-col'>
        <h2 className=' text-lg font-medium'>Perfil</h2>
        <p className=' text-muted-foreground text-xs'>
          Información personal y de contacto.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            name='full_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder='Nombre Completo' disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=' w-full flex justify-end'>
            <Button type='submit' className='glow text-white'>
              {isPending ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
