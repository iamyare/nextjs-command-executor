'use client'

import Login from './components/login'

export default function LandingPage({ user }: { user: User | null }) {
  return (
    <main className='relative flex justify-center items-center min-h-dvh   md:min-h-screen w-full   overflow-hidden '>
      <div className='flex justify-center w-full p-10 gap-5 '>
        <Login user={user} />

        <section className='hidden md:flex flex-col w-full gap-5 max-w-3xl max-h-[700px]'>
          <article className='relative overflow-hidden flex h-[80%] flex-col rounded-[30px] border border-muted/30 bg-background/30 '>
            <img
              className='absolute w-[150%]  bottom-0 translate-y-1/2  left-0 z-0 pointer-events-none '
              src='https://qcwdivuxddjokidadogy.supabase.co/storage/v1/object/public/imgs/landing_page_desktop.webp'
              alt=''
            />
          </article>
          <article className='relative overflow-hidden h-full rounded-[30px] border border-muted/30 bg-background/30 p-6'>
            <p className=' text-center text-muted-foreground z-[50]'>
              ¡Comienza a automatizar tareas de forma sencilla y eficiente!
            </p>
            <img
              className='absolute w-full -bottom-1/4 translate-y-1/4 left-1/2 -translate-x-1/2 z-0 pointer-events-none '
              src='https://qcwdivuxddjokidadogy.supabase.co/storage/v1/object/public/imgs/landing_page_phones.webp'
              alt=''
            />
          </article>
        </section>
      </div>
      <div className='absolute top-0 -z-[2] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'></div>
      <div className='absolute inset-0 -z-10 h-full w-full bg-dot'></div>
    </main>
  )
}
