export default function Home() {
  return (
    <main className=' '>
      <section className='relative flex min-h-screen w-screen flex-col items-center justify-between p-24'>
        <div className='flex flex-col items-center bg-background p-5 rounded-lg'>
          <h2>Welcome to command</h2>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <h4>Get started</h4>
              <p>
                We re excited to have you on board! Please choose a way to sign
                up or log in.
              </p>
            </div>
            <span>Boton aqui</span>
          </div>
        </div>
        <div className='absolute inset-0 -z-10 h-full w-full bg-dot'></div>
        <div className='absolute top-0 -z-[2]  h-screen w-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'></div>
      </section>
    </main>
  )
}
