'use client'

import * as React from 'react'
import { MonitorSmartphone, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isSystemDark, setIsSystemDark] = React.useState(false)

  React.useEffect(() => {
    if (theme === 'system') {
      setIsSystemDark(
        window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    }
  }, [theme])

  const sunVariants = {
    hidden: { rotate: 0, scale: 1 },
    visible: { rotate: -90, scale: 1 }
  }

  const moonVariants = {
    hidden: { rotate: 90, scale: 1 },
    visible: { rotate: 0, scale: 1 }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <motion.div
            animate={
              theme === 'system'
                ? isSystemDark
                  ? 'hidden'
                  : 'visible'
                : theme === 'dark'
                ? 'hidden'
                : 'visible'
            }
            variants={sunVariants}
            className={
              theme === 'system'
                ? isSystemDark
                  ? 'hidden'
                  : 'block'
                : theme === 'dark'
                ? 'hidden'
                : 'block'
            }
          >
            <Sun className='size-5' />
          </motion.div>
          <motion.div
            animate={
              theme === 'system'
                ? isSystemDark
                  ? 'visible'
                  : 'hidden'
                : theme === 'dark'
                ? 'visible'
                : 'hidden'
            }
            variants={moonVariants}
            className={
              theme === 'system'
                ? isSystemDark
                  ? 'block'
                  : 'hidden'
                : theme === 'dark'
                ? 'block'
                : 'hidden'
            }
          >
            <Moon className=' size-5' />
          </motion.div>
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setTheme('light')
          }}
          className=' cursor-pointer'
        >
          <Sun className=' size-4 mr-2' />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark')
          }}
          className=' cursor-pointer'
        >
          <Moon className=' size-4 mr-2' />
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system')
          }}
          className=' cursor-pointer'
        >
          <MonitorSmartphone className=' size-4 mr-2' />
          Igual que el sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
