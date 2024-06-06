'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Loader, Trash } from "lucide-react"


import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState, useTransition } from "react"
import { deleteCommandById } from "@/actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


const INFO = {
  title: "Delete Command",
  description: "Are you sure you want to delete this command?",
}

export function DeleteCommandModal({nameCommand, idCommand}: {nameCommand: string, idCommand: string}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")


  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
        <Button variant={'ghost'} className="hover:bg-destructive/20 hover:text-red-500 hover:animate-shake">
        <Trash className="h-4 w-4 mr-2 " />
        Eliminar Comando
        </Button>

        </DialogTrigger>
        <DialogContent classNameGradient="gradient-experience__1_destructive z-[50]" classNameOverlay="bg-background/50"  className="sm:max-w-[425px] border-destructive/30 bg-destructive/5 ">
        <DialogHeader>
            <DialogTitle>{INFO.title}</DialogTitle>
            <DialogDescription>
            {INFO.description}
            </DialogDescription>
          </DialogHeader>
          <DeleteForm nameCommand={nameCommand} idCommand={idCommand} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <DropdownMenuItem className=" hover:!bg-destructive/20 hover:!text-red-500  hover:animate-shake" >
    <Trash className="h-4 w-4 mr-2" />
        Eliminar Comando
    </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{INFO.title}</DrawerTitle>
          <DrawerDescription>
          {INFO.description}
          </DrawerDescription>
        </DrawerHeader>
        <DeleteForm nameCommand={nameCommand} idCommand={idCommand} setOpen={setOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

type DeleteFormProps = React.ComponentProps<"form"> & {
  nameCommand: string;
  idCommand: string;
  setOpen: (open: boolean) => void;
};

function DeleteForm({ className, nameCommand, idCommand, setOpen }: DeleteFormProps) {

  const [isPeding, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const FormSchema = z.object({
    confirm: z.string().min(1, {
      message: 'El nombre del comando es requerido'
    }).refine(value => value === nameCommand, {
      message: 'El nombre del comando no coincide'
    }),
    id: z.string().min(1, {
      message: 'El id del comando es requerido'
    })
  });

  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirm: '',
      id: idCommand
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const {error} = await deleteCommandById({commandId: data.id})
      if (error) {
         toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
        return undefined
      }
      toast({
        variant: "default",
        title: "Command deleted",
        description: `The command ${nameCommand} has been deleted.`,
      })
      router.refresh()
      setOpen(false)
    })
  }

  return (
    <Form {...form}>

    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4", className)}>

    <FormField
        control={form.control}
        name='confirm'
        render={({ field }) => (
          <FormItem className=' space-y-1'>
            <FormLabel>
            Ingrese <span className=" font-bold">{nameCommand}</span> para confirmar
            </FormLabel>
            <FormControl>
            <Input type="text" className="border-destructive focus-visible:ring-destructive focus-visible:border-none" placeholder={nameCommand} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button  variant={'destructive'} >
        {
          isPeding ? (
            <>
            <Loader className="h-4 w-4 animate-spin mr-2" />
            Eliminando...
            </>
          ) : (
            <>
            <Trash className="h-4 w-4 mr-2" />
            Eliminar comando
            </>
          )
        }
      </Button>
    </form>
    </Form>

  )
}
