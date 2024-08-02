'use client'
import { useEffect, useState, useTransition } from 'react'
import { createToken, getTokensByUser } from '@/actions'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import { Copy, KeyRound, Loader } from 'lucide-react'

import { AnimatePresence, motion } from 'framer-motion'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { cn } from '@/lib/utils'

export default function FormCreateToken({
  userId,
  className
}: {
  userId: string
  className?: string
}) {
  const [token, setToken] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    function getExistingToken() {
      startTransition(async()=>{

        const { tokens, tokensError } = await getTokensByUser({ userId: userId })
        if (tokensError) {
          console.log(tokensError)
          return
        }
  
          setToken(tokens?.id ?? null)
      })
    }
    getExistingToken()
  }, [userId])

  function onSubmit() {
    if (token) {
      toast({
        title: 'Token already exists',
        description: 'You already have a token. You cannot create a new one.'
      })
      return
    }

    startTransition(async () => {
      const { tokenInsertError, tokenInsertResult } = await createToken({
        userId
      })
      if (tokenInsertError) {
        toast({
          title: 'Error',
          description: tokenInsertError.message
        })
        return
      }
      setToken(tokenInsertResult?.id ?? null)
    })
  }

  return (

        <div className={cn('flex flex-col gap-4', className)}>
          <div className='flex gap-2 justify-between relative items-center'>
            <span className=' w-full'></span>
            <InputOTP
              maxLength={6}
              readOnly
              value={token || ''}
              disabled={isPending}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              className=''
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className=' relative items-center h-full  w-full'>
            <Button
              size={'icon'}
              variant='link'
              className=' absolute left-0 top-1/2 -translate-y-1/2'
              onClick={() => navigator.clipboard.writeText(token ?? '')}
              disabled={!token}
            >
              <Copy className='size-4' />
            </Button>
            </div>
          </div>

<AnimatePresence>
{
            !token && (
              <motion.div className='flex items-center justify-center gap-2'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={onSubmit} disabled={!!token} className='glow text-white'>
                {isPending ? (
                  <Loader className='size-4 animate-spin mr-2' />
                ) : (
                  <KeyRound className='size-4 mr-2' />
                )}
                {
                  isPending ? 'Cargando...' : 'Generar token'
                }
              </Button>
  
  
            </motion.div>
            )
}
</AnimatePresence>


        </div>

  )
}