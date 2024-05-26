'use client'


import FormCreateCommand from '@/components/form-create-command'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'


export default function CreateCommand() {


  return (
    <Card className=' bg-background/20'>
      <CardHeader>
        <CardTitle>Crear comando</CardTitle>
        <CardDescription>
          Elija un nombre para el comando y escriba el código que se ejecutará
          cuando se invoque el comando.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <FormCreateCommand/>
      </CardContent>
    </Card>
  )
}
