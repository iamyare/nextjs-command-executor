import Link from 'next/link'
import React from 'react'

export default function LogoSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <Link
      className={`flex items-center  text-xl font-semibold h-14 -mt-3 mb-2  ${
        isOpen ? 'justify-start' : 'justify-center'
      } `}
      href='/'
      aria-label='Infinity Logo'
    >
      <div className={`${isOpen && 'rotate-[360deg] '}  duration-500`}>
        <span>Logo aqui</span>
      </div>
      {isOpen && (
        <span className='ml-2 text-xl font-semibold text-foreground'>
          Infinity
        </span>
      )}
    </Link>
  )
}
