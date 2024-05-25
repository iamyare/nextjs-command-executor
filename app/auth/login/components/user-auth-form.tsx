'use client'

import * as React from 'react'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'react-toastify'
import { useTransition } from 'react'
import { signInWithEmailAndPassword } from '@/app/actions'
import { renameError } from '@/app/actions/client'
import Toast from '@/components/ui/toast'
import { FacebookButton, GitHubButton, GoogleButton } from '@/components/oauth-buttons'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({
      message: 'Debe ser un correo electrónico válido'
    }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
  //   "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener al menos 6 caracteres"
  // ),
})

type ValidationSchema = z.infer<typeof validationSchema>

export function UserAuthForm () {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      const { error } = await signInWithEmailAndPassword(data)
      if (error) {
        toast.error(renameError(error))
      }
    })
  }

  return (
    <>
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 '>
          <div className='flex justify-between gap-2'>
            <GoogleButton size={'icon'} />
            <GitHubButton size={'icon'} />
            <FacebookButton size={'icon'} />
          </div>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                O continuar con
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-5'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Correo electrónico</Label>
              <Input
                placeholder='name@example.com'
                type='email'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect='off'
                disabled={isPending}
                {...register('email')}
              />
              {errors.email && (
                <p className='text-xs italic text-red-500 mt-1'>
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Contraseña</Label>
              <Input
                placeholder='Contraseña'
                type='password'
                autoCapitalize='none'
                autoComplete='password'
                autoCorrect='off'
                disabled={isPending}
                {...register('password')}
              />
              {errors.password && (
                <p className='text-xs italic text-red-500 mt-1'>
                  {errors.password?.message}
                </p>
              )}

              <div className='flex justify-between text-sm'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms' />
                  <label
                    htmlFor='terms'
                    className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Recordarme
                  </label>
                </div>
                <Link href={'/auth/resetpassword'}>
                  Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <Button disabled={isPending}>
              {isPending && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
      <Toast />
    </>
  )
}
