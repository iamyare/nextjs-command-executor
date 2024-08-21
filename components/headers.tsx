'use client'

import { cn } from '@/lib/utils'

export const Header = {
  Title: ({
    className,
    children
  }: {
    className?: string
    children: string
  }) => <h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>,
  Subtitle: ({
    className,
    children
  }: {
    className?: string
    children: string
  }) => <h2 className={cn('', className)}>{children}</h2>,
  Description: ({
    className,
    children
  }: {
    className?: string
    children: string
  }) => <p className={cn(' text-muted-foreground', className)}>{children}</p>,
  Container: ({
    className,
    children
  }: {
    className: string
    children: React.ReactNode
  }) => <header className={cn('', className)}>{children}</header>
}

export default function HeadersContent({
  title,
  description,
  className,
  children
}: {
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Header.Container className={cn(' flex flex-col', className)}>
      <div className='flex flex-col'>
        <Header.Title>{title}</Header.Title>
        <Header.Description>{description}</Header.Description>
      </div>
      {children}
    </Header.Container>
  )
}




