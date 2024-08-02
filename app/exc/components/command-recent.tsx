'use client'

import { Button } from '@/components/ui/button'
import { Terminal } from 'lucide-react'
import Link from 'next/link'

import { MagicMotion } from 'react-magic-motion'

export default function CommandRecent({
  lastCommands
}: {
  lastCommands: (CommandHistory & { command: Command })[] | null
}) {
  return (
    <MagicMotion>
      {lastCommands ? (
        <ul className='mt-2'>
          {lastCommands.map((item) => (
            <li key={item.id}>
              <Button
                variant={'ghost'}
                className='w-full justify-start text-muted-foreground hover:bg-transparent font-normal'
              >
                <Link href='/history' className='flex items-center'>
                  <Terminal className='h-5 w-5' />
                  <span className='ml-2'>{item.command.name}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <Button
            variant={'ghost'}
            className='w-full justify-start text-muted-foreground hover:bg-transparent font-normal'
          >
            <Link href='/history' className='flex items-center'>
              <Terminal className='h-5 w-5' />
              <span className='ml-2'>No hay comandos recientes</span>
            </Link>
          </Button>
        </p>
      )}
    </MagicMotion>
  )
}
