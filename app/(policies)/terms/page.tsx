'use client'

import LogoSidebar from '@/app/exc/components/logo-sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' }
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
        Terms of Use
      </h1>
      <p className=' text-center text-muted-foreground text-sm'>
        Effective Date: September 09, 2024
      </p>
      <h2 className=' text-xl font-semibold'>1. Acceptance of Terms</h2>
      <p className='text-muted-foreground'>
        By using Command Executor, you agree to these Terms of Use. If you do not agree, please do not use the application.
      </p>
      <h2 className=' text-xl font-semibold'>2. Use of the Application</h2>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>You must be at least 13 years old to use Command Executor.</li>
        <li>You are responsible for maintaining the confidentiality of your account.</li>
        <li>You must not use the application for illegal or unauthorized activities.</li>
      </ul>
      <h2 className=' text-xl font-semibold'>3. Intellectual Property</h2>
      <p className='text-muted-foreground'>
        Command Executor and its content are owned by <strong>YARE</strong> and are protected by intellectual property laws.
      </p>
      <h2 className=' text-xl font-semibold'>4. User Content</h2>
      <p className='text-muted-foreground'>
        You retain the rights to any content you create, but you grant us a license to use it in connection with our services.
      </p>
      <h2 className=' text-xl font-semibold'>5. Limitation of Liability</h2>
      <p className='text-muted-foreground'>
        Command Executor is provided &quot;as is&quot; and we do not guarantee it will be free of errors or interruptions.
      </p>
      <h2 className=' text-xl font-semibold'>6. Service Modifications</h2>
      <p className='text-muted-foreground'>
        We reserve the right to modify or discontinue Command Executor at any time.
      </p>
      <h2 className=' text-xl font-semibold'>7. Termination</h2>
      <p className='text-muted-foreground'>
        We may terminate or suspend your access to Command Executor for violations of these terms.
      </p>
      {/* <h2 className=' text-xl font-semibold'>8. Governing Law</h2>
      <p className='text-muted-foreground'>
        These terms are governed by the laws of [insert jurisdiction].
      </p> */}
      <h2 className=' text-xl font-semibold'>9. Contact</h2>
      <p className='text-muted-foreground'>
        For questions about these terms, contact: iamyare@outlook.com
      </p>
    </main>
  )
}