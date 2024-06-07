"use client"


'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'


import { Button } from "./ui/button"
import { useEffect, useState } from 'react'
import { Sparkles, Terminal } from 'lucide-react'
import { Input } from './ui/input'

const title = 'Crear comando'
const description = 'Elija un nombre para el comando y escriba el código que se ejecutará cuando se invoque el comando.'

type IAFormInputProps = {
    field: any
    watch: any
}

export function IAFormInput({field, watch}: IAFormInputProps) {
    const [open, setOpen] = useState(false)
    const commandValue = watch("command");
    useEffect(() => {
        if (commandValue.startsWith('#')) {
          console.log('El comando comienza con #:', commandValue);
          setOpen(true);
        }
        // Opcionalmente, manejar el caso de cuando no comienza con '#' si es necesario
      }, [commandValue]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])



  function promptAI() {
    setOpen(true)
  }

    return (

        <div className='relative'>
        <Terminal className='absolute text-muted-foreground size-4 left-3 top-1/2 -translate-y-1/2' />

        <Input
          placeholder='open calculator.exe'
          className='pl-8'
          {...field}
        />

        {open && (
          <div className='absolute bg-red-500 rounded-md h-[100px] p-4 w-full right-0 -top-[100px]'>
                hola
                <br />
                como
                <br />
                esta
          </div>
        )}
      </div>
      
    )

}


