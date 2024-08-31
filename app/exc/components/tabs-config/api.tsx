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
import { useTransition } from 'react'
import { getApiKeyByUser, insertApiKeys, updateApiKeys as updateApiKey } from '@/actions'
import { useApiKeys } from '@/context/useAPIKeysContext'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  gemini_key: z.string().min(2, {
    message: 'API Key must be at least 2 characters.'
  }),
  user_id: z.string()

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
  const { apiKeys, updateApiKeys } = useApiKeys()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gemini_key: apiKeys.gemini_key ?? '',
      user_id: userId
    }
  })



  function onSubmit(values: z.infer<typeof FormSchema>) {

    startTransition(async () => {
      try {
        // Primero, intentamos obtener las claves API existentes
        const {  appiKeyError } = await getApiKeyByUser({ userId });

        if (appiKeyError) {
          console.error('Error al obtener las claves API:', appiKeyError);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error al obtener las claves API.',
          });
          return;
        }

        if (apiKeys) {
          // Si ya existen claves, actualizamos
          const { errorApiKeys: updateError } = await updateApiKey({apiKeysData: values});

          if (updateError) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Error al actualizar las claves API.',
            });
            return;
          }

        } else {
          // Si no existen claves, insertamos nuevas
          const {  errorApiKeys: insertError } = await insertApiKeys({
            apiKeysData: { gemini_key: values.gemini_key , user_id: userId }
          });

          if (insertError) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Error al insertar las claves API.',
            });
            return;
          }
        }

        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error('Error al guardar las claves API:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error al guardar las claves API.',
        });
      }
    });
  };

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
            name='gemini_key'
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
