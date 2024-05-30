'use server'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'

export async function readUserSession () {
    noStore()
    const supabase = await createSupabaseServerClient()
    return await supabase.auth.getSession()
  }
  
  export async function signOut () {
    const supabase = await createSupabaseServerClient()
    return await supabase.auth.signOut()
  }
  
  export async function getUser () {
    const supabase = await createSupabaseServerClient()
    return await supabase.auth.getUser()
  }

  export async function SelectCommand ({userId}:{userId:string}) {
    const {data:commands, error:commandsError} = await supabase
    .from('commands')
    .select('*')
    .eq('user_id', userId)

    return {commands, commandsError}
  }


    export async function InsertCommand ({data}:{data: CommandInsert}) {
        const {data:commandInsertResult, error:commandInsertError} = await supabase
        .from('commands')
        .insert({...data})

        return {commandInsertResult, commandInsertError}
    }

    export async function ExecuteCommand ({commandId, userId}:{commandId:string, userId:string}) {
        const { error:commandError} = await supabase
        .from('command_history')
        .insert({command_id: commandId, user_id: userId})


        return { commandError}
    }

    export async function getHistoryCommands ({userId}:{userId:string}) {
        const {data:commands, error:commandsError} = await supabase
        .from('command_history')
        .select('*, command:commands!inner(*)')
        .eq('user_id', userId)

        // Agregar el nombre del comando en la raiz del objeto
      const commandsWithCommandName = commands?.map((command) => {
        return {
          ...command,
          commandName: command.command.name
        }
      }
      )


        return {commands: commandsWithCommandName, commandsError}
    }

    //obtener los 5 ultimos comandos ejecutados
    export async function getLastCommands ({userId}:{userId:string}) {
        const {data:commands, error:commandsError} = await supabase
        .from('command_history')
        .select('*, command:commands!inner(*)')
        .eq('user_id', userId)
        .order('created_at', {ascending: false})
        .limit(5)

        return {commands, commandsError}
    }


export async function getUserSession () {
    const {data, error} = await getUser()
    if (error) {
        return {user: null, error}
    }

    const {data:user, error:userError} = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

    return {user: user, error: userError}
}