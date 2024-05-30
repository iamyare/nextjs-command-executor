import { getUserSession } from "@/actions";
import CreateCommand from "./components/create-command";


export default async function DashboardPage() {

  const {user, error} = await getUserSession()

  if (error ?? !user) {
    return console.log(error)
  }




  return (
    <main className=''>
        <CreateCommand userId={user.id} />
        
    </main>
  )
}
