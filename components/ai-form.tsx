'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { Sparkles, Terminal } from 'lucide-react'
import { Input } from './ui/input'


import { AnimatePresence, motion } from 'framer-motion'
import { generateCommands } from '@/lib/gemini'
import { readStreamableValue } from 'ai/rsc'

type IAFormInputProps = {
  field: any
  watch: any
  osDevice: string
}

const variants = {
  hidden: { opacity: 0.5, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
}

type CommandAI = {
  id: string
  title: string
  command: string | null
}

export function IAFormInput({ field, watch,osDevice }: IAFormInputProps) {
  const [open, setOpen] = useState(false)
  const [isAIPending, startTransition] = useTransition()
  const [commandAi, setCommandAi] = useState<CommandAI[] | null>(null)

  const commandValue = watch('command')

  useEffect(() => {
    if (commandValue.startsWith('#')) {
      setOpen(true)
    } else {
      setCommandAi(null)
      setOpen(false)
    }
  }, [commandValue])

  const promptAI = useCallback(() => {
    if (!commandValue.startsWith('#')) {
      return
    }
  
    startTransition(async () => {
      const prompt = commandValue.slice(1)
      const OS = osDevice === 'darwin' ? 'MacOs' : osDevice

  
      try {
        const { object } = await generateCommands({
          prompt,
          OS,
          apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY ?? '',
        })

  
        for await (const partialObject of readStreamableValue(object)) {
          if (partialObject && partialObject.commands) {
            const commandResponseObject = partialObject.commands.map((command: CommandAI, index: number) => ({
              id: `command-${index}`,
              title: command.title,
              command: command.command,
            }))
            setCommandAi(commandResponseObject)
            console.log('commandResponseObject', commandResponseObject)
          }
        }
      } catch (error) {
        console.error('Error generating commands:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setCommandAi([{ id: 'error', title: errorMessage, command: null }])
      }
    })
  }, [commandValue])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      //Presionar control enter
      if (e.key === 'Enter') {
        e.preventDefault()
        promptAI()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [promptAI])

  return (
    <div className='relative'>
      <Terminal className='absolute z-[2] text-muted-foreground size-4 left-3 top-1/2 -translate-y-1/2' />

      <Input placeholder='open calculator.exe' className='pl-8' {...field} />

      <AnimatePresence>
        {open && (
          <motion.div
            className='absolute bg-background/90 overflow-y-auto rounded-md max-h-[120px] p-4 w-full right-0 bottom-[45px]'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div
              key={commandAi ? 'commandAiTrue' : 'commandAiFalse'} // Cambia la key basada en el estado de commandAi
              className='flex flex-col'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }} // Agrega una animación de salida
              transition={{ duration: 0.5 }}
            >
              {commandAi ? (
                <div className='flex flex-col space-y-2'>
                  {isAIPending ? (
                    <div className='flex items-center space-x-2'>
                      <div className='relative'>
                        <Sparkles className='size-4 text-white' />
                        <div className='absolute size-2 top-0 right-0 bg-white blur-sm  animate-infinite animate-pulse'></div>
                        <div className='absolute size-5 top-0 right-0 bg-primary blur-md  animate-infinite animate-pulse'></div>
                      </div>
                      <p className='animate-background-shine text-gradient-loading bg-[length:250%_100%] bg-clip-text text-transparent'>
                        Generando comando...
                      </p>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-2'>
                      <div className='relative'>
                        <Sparkles className='size-4 text-foreground' />
                      </div>
                      <p className=' text-foreground'>Comandos generados</p>
                    </div>
                  )}

                  <AnimatePresence>
                    <ul>
                      {commandAi.map((command) => (
                        <motion.li
                          key={command.id} // Asegúrate de usar un identificador único si está disponible, en lugar de index
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3 }}
                          className={`flex w-full relative overflow-hidden group flex-col rounded-md px-2 py-2 hover:bg-accent/50 cursor-pointer ${
                            command.id === 'error' ? 'is-error' : ''
                          }`}
                          onClick={() => {
                            field.onChange(command.command ?? '')
                            setOpen(false)
                          }}
                        >
                          <h4 className='font-medium text-foreground group-[.is-error]:text-destructive'>
                            {command.title}
                          </h4>
                          <p className='text-muted-foreground inline-block text-sm w-full truncate group-[.is-error]:hidden'>
                            <Terminal className='inline-block size-4 mr-1' />
                            {command.command}
                          </p>
                          <div className='absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]'>
                            <div className='relative blur-lg h-full w-8 bg-foreground/20'></div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  {isAIPending ? (
                    <div className='flex items-center space-x-2'>
                      <div className='relative'>
                        <Sparkles className='size-4 text-white' />
                        <div className='absolute size-2 top-0 right-0 bg-white blur-sm -z-[1] animate-infinite animate-pulse'></div>
                        <div className='absolute size-5 top-0 right-0 bg-primary blur-md -z-[1] animate-infinite animate-pulse'></div>
                      </div>
                      <p className='animate-background-shine text-gradient-loading bg-[length:250%_100%] bg-clip-text text-transparent'>
                        Generando comando...
                      </p>
                    </div>
                  ) : (
                    <div className='flex flex-col'>
                      <h4 className='font-medium text-foreground'>
                        🤖 AI Command Generator
                      </h4>
                      <p className='text-muted-foreground text-sm'>
                        Press{' '}
                        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                          ENTER ↵
                        </kbd>{' '}
                        to generate a command...
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
