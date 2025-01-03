import { getUserSession } from '@/actions'
import PageClient from './page-client'

export default async function Home() {
  const { user, error } = await getUserSession()
  if (error) {
    console.error(error)
  }
  return <PageClient user={user} />
}
