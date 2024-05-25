import React from 'react'
import Sidebar from './components/sidebar'
import { cookies } from 'next/headers'

export default function layout({ children }: { children: React.ReactNode }) {
  const sidebarIsOpen = cookies().get('sidebarIsOpen')
  const defaultOpen =
    sidebarIsOpen && sidebarIsOpen.value !== 'undefined'
      ? JSON.parse(sidebarIsOpen.value)
      : true

  return (
    <>
      <Sidebar defaultOpen={defaultOpen} user={null}>{children}</Sidebar>
    </>
  )
}
