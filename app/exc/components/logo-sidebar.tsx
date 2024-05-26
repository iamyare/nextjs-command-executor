import { YAREDevFlat} from '@/components/Logo-YARE-dev'
import Link from 'next/link'
import React from 'react'

export default function LogoSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <Link
      className={`flex items-center  text-xl font-semibold  ${
        isOpen ? 'justify-start' : 'justify-center'
      } `}
      href='/'
      aria-label='Infinity Logo'
    >
      <div className={`${isOpen && 'rotate-[360deg] '}  duration-500`}>
        <YAREDevFlat className='size-[50px]' />
      </div>
      {isOpen && (
        <span className='ml-2 text-xl font-semibold text-foreground'>
          Command
        </span>
      )}
    </Link>
  )
}
