import { Icons } from '@/components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'


export default function SuggestionItem({
  title,
  description,
  command,
  os
}: {
  title: string
  description: string
  command: string
    os: string
}) {
  return (
    <Card className=' bg-background/20 h-32 w-80 relative overflow-hidden  '>
      <CardContent className='p-4 w-full h-full overflow-y-auto'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className=' flex flex-col space-y-2'>
          <p>{description}</p>
          <code className='text-xs text-muted-foreground bg-muted p-2 rounded-lg'>
            {command}
          </code>
        </CardDescription>
      </CardContent>
    <div className='absolute bottom-0 right-0 p-2'>
      {os === 'win32' && (
        <Icons.windows className='size-4 fill-foreground/90' />
      )}
      {os === 'darwin' && (
        <Icons.apple className='size-4 fill-foreground/90' />
      )}
    </div>
    </Card>
  )
}
