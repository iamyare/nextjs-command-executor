import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'


export default function Alert({
  message = 'Ocurrió un error',
  errorCode = '500'
}: {
  message: string
  errorCode: string | undefined
}) {
  return (
    <>
      <div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <div className='absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-30 blur-[100px]'></div>
      </div>
      <main className='grid place-items-center h-screen'>
        <div className='text-center py-10 px-4 sm:px-6 lg:px-8 '>
          <div className='flex flex-col animate-fade-up animate-once animate-ease-in-out'>
            <h1 className='block font-bold text-9xl   animate-text-gradient bg-gradient-to-r from-[#4e7dff] via-[#8bb7ff] to-[#4e7dff] bg-[200%_auto] bg-clip-text text-transparent'>
              {errorCode}
            </h1>
            <h1 className='block text-2xl font-bold text-white'></h1>
            <p className='mt-3 text-gray-600 dark:text-gray-400 font-semibold'>
              Oops, Lo siento, ocurrió un problema
            </p>
            <p className='text-gray-600 dark:text-gray-400'>{message}</p>
          </div>
          <div className='mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3 animate-fade-up animate-once animate-ease-in-out animate-delay-500'>
            <Link
              className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600  hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href='/'
            >
                <ChevronLeft className='size-4' />
              Pagina de inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
