import React from 'react'
import LoginAuth from './components/LoginAuth'
import { getUser } from '@/actions'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const { data } = await getUser()

  if (data.user !== null) {
    redirect('/')
  }
  return <LoginAuth />
}
