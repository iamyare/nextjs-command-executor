'use client'
import { ExecuteCommand, getUserSession } from '@/actions'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function ButtonExc({ id, name, deviceId }: { id: string; name: string, deviceId: string }) {
  const [isPeding, startTransition] = useTransition()
  const router = useRouter()

  function executeCommand() {
    startTransition(async () => {
      const { user, error } = await getUserSession()
      if (error || !user) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was a problem with your request.'
        })
        return
      }
      const { commandError } = await ExecuteCommand({
        command: {
          command_id: id,
          user_id: user.id,
          device_id: deviceId
        }
      })
      if (commandError) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        })
        return
      }
      toast({
        variant: 'default',
        title: 'Command executed',
        description: `The command ${name} has been executed.`
      })
      router.refresh()
    })
  }

  return (
    <Button
      variant='ghost'
      className='p-0 aspect-square rounded-full'
      onClick={executeCommand}
    >
      <span className='sr-only'>
        {isPeding ? 'Executing command' : 'Execute command'}
      </span>
      {isPeding ? (
        <Loader className='h-4 w-4 animate-spin' />
      ) : (
        <Play className='h-4 w-4' />
      )}
    </Button>
  )
}
