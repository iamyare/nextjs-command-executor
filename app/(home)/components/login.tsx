'use client'

import { GoogleButton } from '@/components/oauth-buttons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Login({ user }: { user: User | null }) {
  const searchParams = useSearchParams()
  const authCode = searchParams.get('auth_code')
  const redirectUri = searchParams.get('redirect_uri')
  const alexaAuth = searchParams.get('alexa_auth')

  useEffect(() => {
    if (user && authCode && redirectUri && alexaAuth) {
      // El usuario ha iniciado sesión y tenemos los parámetros de Alexa
      linkAccountWithAlexa({
        authCode,
        redirectUri,
        state: searchParams.get('state')!
      })
    }
  }, [user, authCode, redirectUri, alexaAuth, searchParams])

  async function linkAccountWithAlexa({
    authCode,
    redirectUri,
    state
  }: {
    authCode: string
    redirectUri: string
    state: string
  }) {
    try {
      const response = await fetch('/api/link-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authCode, redirectUri, state })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.redirect) {
          const finalRedirectUrl = `${data.redirect}&state=${encodeURIComponent(
            state
          )}`
          window.location.href = finalRedirectUrl
        } else {
        }
      } else {
        const errorText = await response.text()
        console.error('Error linking account:', errorText)
      }
    } catch (error) {
      console.error('Error in linkAccountWithAlexa:', error)
    }
  }

  return (
    <section className='flex flex-col gap-5 max-w-sm max-h-[700px]'>
      <article className='flex h-full flex-col rounded-[30px] border border-muted/30 bg-background/30 px-6 pb-6'>
        <header className='relative flex flex-col items-center gap-4 overflow-hidden rounded-b-3xl border border-muted/30 bg-muted/10 p-6 text-2xl'>
          <div className='absolute -z-10 top-0 left-1/2 h-1/4 w-1/2 -translate-x-1/2 bg-primary blur-[50px]'></div>
          <div className='absolute -z-10 top-0 left-1/2 h-1/4 w-2/3 -translate-x-1/2 bg-primary blur-[80px]'></div>

          <figure className='relative mt-24 overflow-hidden rounded-3xl border bg-background p-2'>
            <img
              src='/YAREdev.svg'
              alt='Logo Command Executor'
              className='size-16 z-10'
            />
            <div className='absolute top-0 left-1/2 h-full w-2 -translate-x-1/2 bg-primary blur-[20px]'></div>
            <div className='absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-primary/80 blur-[15px]'></div>
          </figure>
          <h1 className='text-center'>
            <span className='block text-2xl text-muted-foreground'>
              Bienvenido a
            </span>
            <strong className='text-3xl'>Commands</strong>
          </h1>

          <footer className='mt-auto flex flex-col gap-4 bg-muted/20 rounded-3xl border border-muted/30 p-4'>
            {user ? (
              <>
                <div>
                  <h2 className='text-base font-medium text-pretty'>
                    ¡Hola, {user.full_name}!
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    {alexaAuth
                      ? '¡Estás a punto de vincular tu cuenta con Alexa!'
                      : '¡Bienvenido de nuevo! ¿Estás listo para comenzar a automatizar tareas?'}
                  </p>
                </div>
                {alexaAuth ? (
                  <Button
                    className='glow rounded-2xl text-white'
                    onClick={() =>
                      linkAccountWithAlexa({
                        authCode: authCode!,
                        redirectUri: redirectUri!,
                        state: searchParams.get('state')!
                      })
                    }
                  >
                    Vincular con Alexa
                  </Button>
                ) : (
                  <Button className='glow rounded-2xl text-white' asChild>
                    <Link href={'/exc'}>Comenzar</Link>
                  </Button>
                )}
              </>
            ) : (
              <>
                <div>
                  <h2 className='text-base font-medium'>Comienza ahora</h2>
                  <p className='text-sm text-muted-foreground'>
                    {alexaAuth
                      ? 'Por favor, inicia sesión para vincular tu cuenta con Alexa.'
                      : '¡Nos alegra tenerte a bordo! Por favor, inicia sesión con Google.'}
                  </p>
                </div>
                <GoogleButton className='rounded-2xl' />
              </>
            )}
          </footer>
        </header>
      </article>

      <aside className='hidden  items-center rounded-[30px] border border-muted/30 bg-background/30  px-6 py-4 md:flex flex-col justify-center'>
        <h2 className='text-lg font-medium'>¿Qué es Commands?</h2>
        <p className='text-sm text-muted-foreground'>
          Commands es una plataforma de automatización de tareas que te permite
          generar comandos de terminal de forma rápida y sencilla.
        </p>
      </aside>
    </section>
  )
}
