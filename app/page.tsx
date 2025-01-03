import { getUserSession } from '@/actions'
import LandingPage from './(home)/page'

export default async function Home() {
  const { user } = await getUserSession()

  return <LandingPage user={user || null} />
}
