'use client'
import LogoSidebar from '@/app/exc/components/logo-sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/terms', label: 'Términos de Servicio' },
  { href: '/privacy', label: 'Política de Privacidad' }
]

export default function Privacy() {
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
      <h1 className=' text-3xl font-bold text-center'>Políticas de Privacidad</h1>
      <p className=' text-center text-muted-foreground text-sm'>Última actualización: Septiembre 09, 2024</p>
      <h2 className=' text-xl font-semibold'>1. Introducción</h2>
      <p className='text-muted-foreground'>
        Command Executor (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la
        aplicación&quot;) se compromete a proteger la privacidad de nuestros
        usuarios (&quot;usted&quot; o &quot;su&quot;). Esta Política de
        Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su
        información cuando utiliza nuestra aplicación y servicios relacionados.
      </p>
      <h2 className=' text-xl font-semibold'>2. Información que recopilamos</h2>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>
          Información de la cuenta: nombre de usuario, dirección de correo
          electrónico.
        </li>
        <li>
          Datos de uso: comandos creados, frecuencia de uso, preferencias de
          automatización.
        </li>
        <li>
          Información del dispositivo: tipo de dispositivo, sistema operativo,
          identificadores únicos.
        </li>
        <li>
          Datos de ubicación (opcional): si usted lo permite, para funciones
          basadas en la ubicación.
        </li>
      </ul>
      <h2 className=' text-xl font-semibold'>3. Cómo utilizamos su información</h2>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>Para proporcionar y mantener nuestros servicios.</li>
        <li>Para personalizar y mejorar su experiencia.</li>
        <li>Para desarrollar nuevas características y funcionalidades.</li>
        <li>Para comunicarnos con usted sobre actualizaciones o soporte.</li>
      </ul>
      <h2 className=' text-xl font-semibold'>4. Compartir información</h2>
      <p className='text-muted-foreground'>No vendemos su información personal. Podemos compartir datos con:</p>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>Proveedores de servicios que nos ayudan a operar la aplicación.</li>
        <li>Autoridades legales cuando sea requerido por ley.</li>
      </ul>
      <h2 className=' text-xl font-semibold'>5. Seguridad de los datos</h2>
      <p className='text-muted-foreground'>
        Implementamos medidas de seguridad para proteger su información, pero
        ningún sistema es 100% seguro.
      </p>
      <h2 className=' text-xl font-semibold'>6. Sus derechos</h2>
      <p className='text-muted-foreground'>
        Usted tiene derecho a acceder, corregir o eliminar su información
        personal.
      </p>
      <h2 className=' text-xl font-semibold'>7. Cambios a esta política</h2>
      <p className='text-muted-foreground'>
        Podemos actualizar esta política periódicamente. Le notificaremos sobre
        cambios significativos.
      </p>
      <h2 className=' text-xl font-semibold'>8. Contacto</h2>
      <p className='text-muted-foreground'>
        Para preguntas sobre esta política, contacte a: iamyare@outlook.com
      </p>
    </main>
  )
}
