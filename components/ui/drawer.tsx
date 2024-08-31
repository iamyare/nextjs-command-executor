import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (

  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/10 backdrop-blur-sm", className)}
    {...props}
  />

))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName


type DialogContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
  classNameOverlay?: string;
  classNameGradient?: string;
};

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>, DialogContentProps
>(({ className, classNameOverlay, classNameGradient, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay className={classNameOverlay} />
    <div 
    ref={ref}
    className={cn('min-h-[calc(100vh-50vh)] min-w-[calc(100vw-50vw)] max-w-[780px] max-h-[780px] w-full h-full md:min-h-[780px] md:min-w-[780px] rounded-full fixed top-1/2 left-1/2 gradient-experience__1 blur-[150px] -translate-y-1/2 -translate-x-1/2  -z-[2] opacity-animation ',
      classNameGradient
    )}></div>

    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[20px] overflow-hidden bg-background",
        className
      )}
      {...props}
    >

      <div className="sticky top-0 z-20 flex h-10 items-center justify-center bg-background">
        <div className="h-2 w-[100px] rounded-full bg-muted" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {children}
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}