'use client'
import Link from 'next/link'
import { UserAuthForm } from './user-auth-form'
import {YAREDev} from '@/components/Logo-YARE-dev'

export default function LoginAuth() {
  return (
    <main className='relative h-screen flex justify-center items-center'>
      <div className=' max-w-md  flex w-full flex-col justify-center space-y-2  '>
        <div className='flex flex-col space-y-2 text-center my-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Bienvenido de vuelta
          </h1>
          <p className='text-muted-foreground'>
            Por favor inicia sesión para continuar
          </p>
        </div>
        <UserAuthForm />
        <p className='text-muted-foreground text-center'>
          ¿No tienes una cuenta?{' '}
          <Link
            href='/auth/signup'
            className=' text-foreground font-medium hover:text-primary'
          >
            Regístrate
          </Link>
        </p>
      </div>

      <YAREDev className=' absolute top-5 lg:top-10 left-1/2 -translate-x-1/2  size-[80px]' />
      <div className=' absolute opacity-30 -z-[1] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.4)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_15%_at_50%_0%,#000_-20%,transparent_100%)]'></div>
      <div className=' absolute -z-[1] top-0  h-screen w-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(124,58,237,0.2)_0,rgba(124,58,237,0)_50%,rgba(124,58,237,0)_100%)]'></div>
    </main>
  )
}
