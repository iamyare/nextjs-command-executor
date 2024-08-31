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
import { getApiKeyByUser } from '@/actions'

const FormSchema = z.object({
  api_key: z.string().min(2, {
    message: 'API Key must be at least 2 characters.'
  })
})

export default function APITabs({
  userId,
  setOpen
}: {
  userId: string
  setOpen: (open: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const [apiIsLoading, setApiIsLoading] = useTransition()
  const [apiKey, setApiKey] = useState<ApiKey | null>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      api_key: apiKey?.gemini_key ?? ''
    }
  })

  useEffect(() => {
    setApiIsLoading(async()=>{
      const { appiKey, appiKeyError } = await getApiKeyByUser({ userId })
      if (appiKeyError) {
        toast({
          title: 'Error',
          description: appiKeyError.message
        })
        return
      }
      setApiKey(appiKey)
      form.setValue('api_key', appiKey?.gemini_key ?? '')
    })
  },[apiKey, form, userId])

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
        <h2 className=' text-lg font-medium'>API Key</h2>
        <p className=' text-muted-foreground text-xs'>
            API Key de Gemini.
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
            name='api_key'
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input placeholder={
                    apiIsLoading ? 'Obteniendo API KEY...' : 'Ingresa tu API KEY'
                  } type='password' {...field} />
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
