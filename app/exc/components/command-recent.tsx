import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import Link from 'next/link'

export default function CommandRecent({
  lastCommands
}: {
  lastCommands: (CommandHistory & { command: Command })[]
}) {
  return (
    <motion.ul className='mt-2'>
      <AnimatePresence>
        {lastCommands.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Button
              variant={'ghost'}
              className='w-full justify-start text-muted-foreground hover:bg-transparent font-normal'
            >
              <Link href='/history' className='flex items-center'>
                <Terminal className='h-5 w-5' />
                <span className='ml-2'>{item.command.name}</span>
              </Link>
            </Button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}