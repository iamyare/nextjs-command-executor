'use client'
import LogoSidebar from '@/app/exc/components/logo-sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' }
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
      <h1 className=' text-3xl font-bold text-center'>Privacy Policy</h1>
      <p className=' text-center text-muted-foreground text-sm'>Last updated: September 09, 2024</p>
      <h2 className=' text-xl font-semibold'>1. Introduction</h2>
      <p className='text-muted-foreground'>
        Command Executor (&quot;we&quot;, &quot;our&quot; or &quot;the
        application&quot;) is committed to protecting the privacy of our
        users (&quot;you&quot; or &quot;your&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your
        information when you use our application and related services.
      </p>
      <h2 className=' text-xl font-semibold'>2. Information We Collect</h2>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>
          Account Information: username, email address.
        </li>
        <li>
          Usage Data: commands created, usage frequency, automation preferences.
        </li>
        <li>
          Device Information: device type, operating system, unique identifiers.
        </li>
        <li>
          Location Data (optional): if you allow it, for location-based features.
        </li>
      </ul>
      <h2 className=' text-xl font-semibold'>3. How We Use Your Information</h2>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>To provide and maintain our services.</li>
        <li>To personalize and enhance your experience.</li>
        <li>To develop new features and functionalities.</li>
        <li>To communicate with you about updates or support.</li>
      </ul>
      <h2 className=' text-xl font-semibold'>4. Sharing Information</h2>
      <p className='text-muted-foreground'>We do not sell your personal information. We may share data with:</p>
      <ul className=' list-disc list-inside text-muted-foreground'>
        <li>Service providers who help us operate the application.</li>
        <li>Legal authorities when required by law.</li>
      </ul>
      <h2 className=' text-xl font-semibold'>5. Data Security</h2>
      <p className='text-muted-foreground'>
        We implement security measures to protect your information, but no system is 100% secure.
      </p>
      <h2 className=' text-xl font-semibold'>6. Your Rights</h2>
      <p className='text-muted-foreground'>
        You have the right to access, correct, or delete your personal information.
      </p>
      <h2 className=' text-xl font-semibold'>7. Changes to This Policy</h2>
      <p className='text-muted-foreground'>
        We may update this policy periodically. We will notify you about significant changes.
      </p>
      <h2 className=' text-xl font-semibold'>8. Contact</h2>
      <p className='text-muted-foreground'>
        For questions about this policy, contact: iamyare@outlook.com
      </p>
    </main>
  )
}