import { getUserSession } from "@/actions";
import CreateCommand from "./components/create-command";
import Suggestions from "./components/suggestions";


export default async function DashboardPage() {

  const {user, error} = await getUserSession()

  if (error ?? !user) {
    return console.log(error)
  }




  return (
    <main className='flex flex-col gap-2'>

      <Suggestions />
        <CreateCommand userId={user.id} />
        
    </main>
  )
}
