'use client'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
// import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ChevronRight,
  Gauge,
  History,
  LogOut,
  MenuIcon,
  MonitorSmartphone,
  Terminal,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import LogoSidebar from './logo-sidebar'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const userNavigation = [
  { name: 'Perfil', href: '/perfil', icon: Avatar },
  { name: 'Configuración', href: '/configuracion', icon: Avatar }
]

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: MonitorSmartphone },
  { name: 'Dispositivos', href: '/devices', icon: Gauge },
  { name: 'Historial', href: '/history', icon: History }
]

const history = [
  { name: 'Abrir carpetas', href: '/history' },
  { name: 'Ejecutar comandos', href: '/history' },
  { name: 'Cerrar aplicaciones', href: '/history' },
  { name: 'Apagar computadora', href: '/history' },
  { name: 'Reiniciar computadora', href: '/history' }
]

export function BreadcrumbNavbar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className='sticky  inset-x-0 top-0 z-0 border-y  px-4 sm:px-2 md:hidden md:px-4 lg:hidden bg-background text-foreground '>
      <div className='flex items-center py-2'>
        <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
          <span className='absolute -inset-0.5' />
          <span className='sr-only'>Abrir el menu</span>
          {isOpen ? (
            <X className='block h-5 w-5' aria-hidden='true' />
          ) : (
            <MenuIcon className='block h-5 w-5' aria-hidden='true' />
          )}
        </Disclosure.Button>

        {/* <BreadcrumbResponsive /> */}
      </div>
    </div>
  )
}

export function HiddenMenu() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  const pathname = usePathname()

  return (
    <Disclosure.Panel className='md:hidden bg-white dark:bg-gray-900'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              pathname === item.href
                ? 'bg-gray-100 dark:bg-slate-800  text-gray-900 dark:text-gray-100'
                : 'text-gray-900 dark:text-gray-100  hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-800',
              'block rounded-md px-3 py-2 text-base font-medium'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </Disclosure.Panel>
  )
}

export default function Sidebar({
  children,
  user,
  defaultOpen = true
}: {
  children: React.ReactNode
  user: null
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const router = useRouter()
  const pathname = usePathname()
  return (
    <>
      <Disclosure as='header'>
        {({ open }) => (
          <>
            <nav
              className={
                'sticky inset-x-0 top-0 z-[0] flex w-full flex-wrap border-b  py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4  bg-background/20'
                }
            >
              <div
                className='mx-auto flex w-full basis-full items-center px-4 sm:px-6 md:px-8'
                aria-label='Global'
              >
                <div className=' me-5 md:hidden lg:me-0 lg:hidden'>
                <LogoSidebar isOpen={isOpen} />
                </div>

                <div
                  className={cn('flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3', isOpen ? 'md:ms-64' : 'md:ms-20')}
                >
                  <h2 className='hidden md:block'>Dashboard</h2>

                  {/* Botones */}
                  <div className='flex flex-row items-center justify-end gap-2 '>
                    {/* <ModeToggle /> */}

                    {/* Profile dropdown */}
                    <Menu as='div' className='relative '>
                      <Menu.Button className='relative  rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  ring-offset-background hover:ring-2 hover:ring-offset-2 hover:ring-muted'>
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>Abrir Menu</span>
                        <Avatar className='h-9 w-9'>
                          <AvatarImage src={''} />
                          <AvatarFallback>YR</AvatarFallback>
                        </Avatar>
                        {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <div>
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-popover border p-1 shadow-xl shadow-black/5 '>
                            <Menu.Item>
                              <div className='w-full pointer-events-none'>
                                <div className='flex items-center gap-2 p-1'>
                                  <Avatar>
                                    <AvatarImage src={''} />
                                    <AvatarFallback>YR</AvatarFallback>
                                  </Avatar>
                                  <div className='w-full  overflow-hidden'>
                                    <p className='text-sm font-semibold truncate w-full '>
                                      Yamir Alejandro Rodas Elvir
                                    </p>
                                    <p className='text-xs truncate w-full  text-neutral-500'>
                                      correo@gmail.com
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Menu.Item>
                            <hr className='my-1 -mx-1' />
                            <hr className='my-1 mx-2 ' />
                            {userNavigation.map((item) => (
                              <Link
                                href={item.href}
                                key={item.name}
                                className={classNames(
                                  pathname === item.href ? 'bg-muted' : '',
                                  'relative flex select-none items-center rounded-sm px-3 py-1.5   outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 '
                                )}
                              >
                                <item.icon className='h-5 w-5' />
                                <span className=' ml-2'>{item.name}</span>
                              </Link>
                            ))}
                            <hr className='my-1 -mx-1' />
                            <Menu.Item>
                              {({ active }) => (
                                <Button
                                  variant={'ghost'}
                                  className={classNames(
                                    active ? 'bg-red-500/10 text-red-500' : '',
                                    'relative flex justify-start select-none hover:bg-red-500/10 hover:text-red-500 items-center rounded-sm px-3 py-1.5  w-full outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 '
                                  )}
                                  onClick={async () => {
                                    // await signOut()
                                    router.push('/')
                                  }}
                                >
                                  <LogOut className='h-5 w-5' />
                                  <span className=' ml-2'>Cerrar Sesión</span>
                                </Button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </div>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </nav>

            {/* Boton Sidebar */}
            <BreadcrumbNavbar isOpen={open} />

            {/* Sidebar Contenido */}
            <header
              className={`fixed  hidden md:flex md:flex-col md:justify-between bottom-0 start-0 top-0 z-[2]  -translate-x-full transform  border-e  bg-background pb-10 pt-7 transition-all duration-300 hs-overlay-open:translate-x-0 hs-overlay-backdrop-open:bg-black/50 hs-overlay-backdrop-open:backdrop-blur-sm  [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2
                ${
                  isOpen
                    ? 'bottom-0 end-auto block translate-x-0 w-64 p-4 '
                    : 'bottom-0 end-auto block translate-x-0 w-20 p-4'
                }`}
            >
              <Button
                className='absolute transition-transform top-5 -end-5 p-1 rounded-full bg-background shadow-md border'
                onClick={() => {
                  setIsOpen(!isOpen)
                  document.cookie = `sidebarIsOpen=${!isOpen}`
                }}
                size={'icon'}
                variant={'ghost'}
              >
                <ChevronRight
                  className={`h-5 w-5 ${isOpen ? 'rotate-180 ' : 'rotate-0'}
              `}
                />
              </Button>

              <section className='h-full space-y-4'>
                <aside className=' w-full'>
                <LogoSidebar isOpen={isOpen} />
                </aside>

                <nav className='h-full  overflow-y-auto  flex w-full flex-col pb-10  '>
                  {isOpen ? (
                    <>
                      <ul className='grid space-y-2'>
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Button
                              variant={'ghost'}
                              size={'lg'}
                              className={cn(
                                pathname === item.href ? 'bg-muted' : '',
                                'w-full justify-start h-10 px-4'
                              )}
                              asChild
                            >
                              <Link
                                href={item.href}
                                aria-current={
                                  pathname === item.href ? 'page' : undefined
                                }
                              >
                                <item.icon className='h-5 w-5' />
                                <span className='ml-2'>{item.name}</span>
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <Separator className='my-4' />
                      <h3 className='text-sm'>Comandos Recientes</h3>
                      <ul className='mt-2'>
                        {
                          history.map((item) => (
                            <li key={item.name}>
                              <Button
                                variant={'ghost'}
                                className='w-full justify-start text-muted-foreground hover:bg-transparent font-normal'
                              >
                                <Link href='/history' className='flex items-center'>
                                  <Terminal className='h-5 w-5' />
                                  <span className='ml-2'>{item.name}</span>
                                </Link>
                              </Button>
                            </li>
                          ))
                        }

                      </ul>
                    </>
                  ) : (
                    <ul className='grid space-y-2'>
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Button 
                              variant={'ghost'}
                              size={'icon'}
                              className={cn(
                                pathname === item.href ? 'bg-muted' : '',
                                'w-full h-10'
                              )}
                              asChild>

                          <Link
                            href={item.href}
                            
                            >
                            <item.icon className='h-5 w-5' />
                          </Link>
                            </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </nav>
              </section>
            </header>

            <HiddenMenu />
          </>
        )}
      </Disclosure>

      <main
        className={`w-full 
        ${isOpen ? ' md:ps-64' : ' md:ps-20'}
        `}
      >
        <section className='p-3'>{children}</section>
      </main>
    </>
  )
}
