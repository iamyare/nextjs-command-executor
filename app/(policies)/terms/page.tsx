'use client'

import LogoSidebar from '@/app/exc/components/logo-sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/terms', label: 'Términos de Servicio' },
  { href: '/privacy', label: 'Política de Privacidad' }
]

export default function Terms() {
  const pathname = usePathname()
  return (
    <main className=' flex flex-col max-w-xl mx-auto gap-4 my-32'>
      <header className=' fixed top-0 left-0  flex py-3 justify-between items-center w-full'>
        <LogoSidebar isOpen />
        <nav className=' flex space-x-2'>
          {LINKS.map(({ href, label }) => (
            <Button
              key={href}
              variant={'link'}
              className={cn(
                'text-muted-foreground',
                pathname === href && 'text-primary'
              )}
              asChild
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>
      </header>
      <h1 className=' text-3xl font-bold text-center'>
        Términos de Uso
      </h1>
      <p className=' text-center text-muted-foreground text-sm'>
        Fecha de entrada en vigor: [Insertar fecha]
      </p>
      <h2 className=' text-xl font-semibold'>1. Aceptación de los términos</h2>
      <p className='text-muted-foreground'>
        Al utilizar Command Executor, usted acepta estos Términos de Uso. Si no está de acuerdo, por favor no use la aplicación.
      </p>
      <h2 className=' text-xl font-semibold'>2. Uso de la aplicación</h2>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>Usted debe tener al menos 13 años para usar Command Executor.</li>
        <li>Usted es responsable de mantener la confidencialidad de su cuenta.</li>
        <li>No debe usar la aplicación para actividades ilegales o no autorizadas.</li>
      </ul>
      <h2 className=' text-xl font-semibold'>3. Propiedad intelectual</h2>
      <p className='text-muted-foreground'>
        Command Executor y su contenido son propiedad de <strong>YARE</strong> y están protegidos por leyes de propiedad intelectual.
      </p>
      <h2 className=' text-xl font-semibold'>4. Contenido del usuario</h2>
      <p className='text-muted-foreground'>
        Usted mantiene los derechos de cualquier contenido que cree, pero nos otorga una licencia para usarlo en relación con nuestros servicios.
      </p>
      <h2 className=' text-xl font-semibold'>5. Limitación de responsabilidad</h2>
      <p className='text-muted-foreground'>
        Command Executor se proporciona &quot;tal cual&quot; y no garantizamos que esté libre de errores o interrupciones.
      </p>
      <h2 className=' text-xl font-semibold'>6. Modificaciones del servicio</h2>
      <p className='text-muted-foreground'>
        Nos reservamos el derecho de modificar o discontinuar Command Executor en cualquier momento.
      </p>
      <h2 className=' text-xl font-semibold'>7. Terminación</h2>
      <p className='text-muted-foreground'>
        Podemos terminar o suspender su acceso a Command Executor por violaciones a estos términos.
      </p>
      {/* <h2 className=' text-xl font-semibold'>8. Ley aplicable</h2>
      <p className='text-muted-foreground'>
        Estos términos se rigen por las leyes de [insertar jurisdicción].
      </p> */}
      <h2 className=' text-xl font-semibold'>9. Contacto</h2>
      <p className='text-muted-foreground'>
        Para preguntas sobre estos términos, contacte a: iamyare@outlook.com
      </p>
    </main>
  )
}