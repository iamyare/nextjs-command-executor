'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Terminal } from 'lucide-react'
import Link from 'next/link'

export default function CommandRecent({
  lastCommands
}: {
  lastCommands: (CommandHistory & { command: Command })[] | null
}) {
  return (
    <AnimatePresence>
      {lastCommands ? (
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='mt-2'
        >
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
        </motion.ul>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant={'ghost'}
            className='w-full justify-start text-muted-foreground hover:bg-transparent font-normal'
          >
            <Link href='/history' className='flex items-center'>
              <Terminal className='h-5 w-5' />
              <span className='ml-2'>No hay comandos recientes</span>
            </Link>
          </Button>
        </motion.p>
      )}
    </AnimatePresence>
  )
}
