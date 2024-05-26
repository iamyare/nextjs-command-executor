import React from 'react'
import Sidebar from './components/sidebar'
import { cookies } from 'next/headers'
import { getUserSession } from '@/actions'

export default async function layout({ children }: { children: React.ReactNode }) {
  const sidebarIsOpen = cookies().get('sidebarIsOpen')
  const defaultOpen =
    sidebarIsOpen && sidebarIsOpen.value !== 'undefined'
      ? JSON.parse(sidebarIsOpen.value)
      : true

      const {user, error} = await getUserSession()
      if (error) {
        console.log(error)
      }
      if (!user) {
        return null
      }


  return (
    <>
      <Sidebar defaultOpen={defaultOpen} user={user}>{children}</Sidebar>
    </>
  )
}
