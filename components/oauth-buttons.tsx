'use client'
import { createSupabaseBrowerClient } from '@/lib/supabase'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Icons } from './icons'

type sizeType = 'default' | 'sm' | 'lg' | 'icon' | null | undefined

export function GoogleButton ({
  size = 'default',
  className
}: {
  size?: sizeType
  className?: string
}) {
  const supabase = createSupabaseBrowerClient()
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <Button
      type='button'
      size={size}
      variant={'outline'}
      onClick={handleSignIn}
      className={cn(
        'w-full inline-flex justify-center items-center gap-x-2',
        className
      )}
    >
      <Icons.google className='h-4 w-4' />
      {size === 'icon' ? null : 'Google'}
    </Button>
  )
}

export function GitHubButton ({
  size = 'default',
  className
}: {
  size?: sizeType
  className?: string
}) {
  const supabase = createSupabaseBrowerClient()
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <Button
      type='button'
      size={size}
      variant={'outline'}
      onClick={handleSignIn}
      className={cn(
        'w-full inline-flex justify-center items-center gap-x-2',
        className
      )}
    >
      <Icons.gitHub className='h-4 w-4' />
      {size === 'icon' ? null : 'GitHub'}
    </Button>
  )
}

export function FacebookButton ({
  size = 'default',
  className
}: {
  size?: sizeType
  className?: string
}) {
  const supabase = createSupabaseBrowerClient()
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <Button
      type='button'
      size={size}
      variant={'outline'}
      onClick={handleSignIn}
      className={cn(
        'w-full inline-flex justify-center items-center gap-x-2',
        className
      )}
    >
      <Icons.facebook className='h-4 w-4' />
      {size === 'icon' ? null : 'Facebook'}
    </Button>
  )
}
