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
import { useEffect, useState, useTransition } from 'react'
import { getUserSingle } from '@/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

const FormSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  avatar_url: z.optional(z.string()),
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function AccountTabs({
  userId,
  setOpen
}: {
  userId: string
  setOpen: (open: boolean) => void
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isLoading, startLoading] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: '',
      avatar_url: '',
      email: ''
    }
  })

  useEffect(() => {
    startLoading(async() => {
      const {user:userFetch, error} = await getUserSingle({userId})
      if (error){
        return console.log(error)
      }
      if (!userFetch){
        return console.log('No hay usuario')
      }
      setUser(userFetch)
      form.setValue('full_name', userFetch.full_name)
      form.setValue('avatar_url', userFetch.avatar_url ?? '')
      form.setValue('email', userFetch.email)

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
          className='w-full space-y-2'
        >

      <div className=' space-y-2'>
        <Label>Avatar</Label>
      <div className=' flex gap-2 w-full'>

<Avatar>
<AvatarImage src={user?.avatar_url ?? ''} alt="@shadcn" />
<AvatarFallback>
  {user?.full_name[0]}
</AvatarFallback>
</Avatar>

<FormField
  control={form.control}
  name="avatar_url"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormControl>
        <Input
          placeholder="Avatar"
          type="file"
          disabled={true}
          onChange={(e) => {
            const file = e.target.files?.[0];
            field.onChange(file ? file.name : "");
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
</div>
      </div>

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



<FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electronico</FormLabel>
                <FormControl>
                  <Input placeholder='info@iamyare.com' disabled={true} {...field} />
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
