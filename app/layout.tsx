import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Command Executor',
  description:
    'Command Executor es una herramienta que te permite ejecutar comandos en tu computador.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={cn('antialiased', inter.className) }>
      <div id='noisy'></div>
       {children}
      </body>
    </html>
  )
}
