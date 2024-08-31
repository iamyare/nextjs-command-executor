'use client'

import { useCallback, useEffect, useState } from 'react'
import { Sparkles, Terminal, AlertTriangle } from 'lucide-react'
import { Input } from './ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { generateCommands } from '@/lib/gemini'
import { useApiKey } from '@/context/useAPIKeysContext'

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
    title: string
    command: string | null
    description: string
}

export function IAFormInput({ field, watch, osDevice }: IAFormInputProps) {
  const [open, setOpen] = useState(false)
  const [isAIPending, setIsAIPending] = useState(false)
  const [commandAi, setCommandAi] = useState<CommandAI[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const geminiKey = useApiKey('gemini_key')

  const commandValue = watch('command')

  useEffect(() => {
    if (commandValue.startsWith('#')) {
      setOpen(true)
    } else {
      setCommandAi(null)
      setOpen(false)
      setError(null)
    }
  }, [commandValue])

  const promptAI = useCallback(async () => {
    if (!commandValue.startsWith('#')) {
      return
    }

    setIsAIPending(true)
    setError(null)
    const prompt = commandValue.slice(1)
    const OS = osDevice

    try {
      const { commandIA } = await generateCommands({
        prompt,
        OS,
        apiKey: geminiKey ?? '',
      })

      console.log('commandIA:', commandIA)
      setCommandAi(commandIA.commands)
    } catch (error) {
      console.error('Error generating commands:', error)
      setError('An error occurred while generating commands. Using fallback commands.')
      // Aquí podrías establecer algunos comandos de fallback si lo deseas
    } finally {
      setIsAIPending(false)
    }
  }, [commandValue, geminiKey, osDevice])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
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
            className='absolute bg-background/90 border border-border/50 overflow-y-auto rounded-md max-h-[120px] p-4 w-full right-0 bottom-[45px]'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div
              key={commandAi ? 'commandAiTrue' : 'commandAiFalse'}
              className='flex flex-col'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {error ? (
                <div className='flex items-center space-x-2 text-yellow-500'>
                  <AlertTriangle className='size-4' />
                  <p>{error}</p>
                </div>
              ) : commandAi ? (
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
                      {commandAi.map((command, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3 }}
                          className={`flex w-full relative overflow-hidden group flex-col rounded-md px-2 py-2 hover:bg-accent/50 cursor-pointer`}
                          onClick={() => {
                            field.onChange(command.command ?? '')
                            setOpen(false)
                          }}
                        >
                          <h4 className='font-medium text-foreground'>
                            {command.title}
                          </h4>
                          <p className='text-muted-foreground inline-block text-sm w-full truncate'>
                            <Terminal className='inline-block size-4 mr-1' />
                            {command.command}
                          </p>
                          <p className='text-muted-foreground text-xs mt-1'>{command.description}</p>
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
                        para generar comandos.
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