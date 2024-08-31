'use server'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'

export async function readUserSession() {
  noStore()
  const supabase = await createSupabaseServerClient()
  return await supabase.auth.getSession()
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  return await supabase.auth.signOut()
}

export async function getUser() {
  const supabase = await createSupabaseServerClient()
  return await supabase.auth.getUser()
}



export async function SelectCommand({ userId }: { userId: string }) {
  const { data: commands, error: commandsError } = await supabase
    .from('commands')
    .select('*')
    .eq('user_id', userId)

  return { commands, commandsError }
}

export async function InsertCommand({ data }: { data: CommandInsert }) {
  const { data: commandInsertResult, error: commandInsertError } =
    await supabase.from('commands').insert({ ...data })

  return { commandInsertResult, commandInsertError }
}

export async function UpdateCommand({ data }: { data: CommnadUpdate }) {
  const { data: commandUpdateResult, error: commandUpdateError } =
    await supabase.from('commands').update({ ...data }).eq('id', data.id ?? '')

  return { commandUpdateResult, commandUpdateError }
}

export async function ExecuteCommand({
  command
}: {
  command: CommandHistoryInsert
}) {
  const { error: commandError } = await supabase
    .from('command_history')
    .insert({ ...command })

  return { commandError }
}

export async function getHistoryCommands({ userId }: { userId: string }) {
  const { data: commands, error: commandsError } = await supabase
    .from('command_history')
    .select('*, command:commands!inner(*)')
    .eq('user_id', userId)

  // Agregar el nombre del comando en la raiz del objeto
  const commandsWithCommandName = commands?.map((command) => {
    return {
      ...command,
      commandName: command.command.name
    }
  })

  return { commands: commandsWithCommandName, commandsError }
}



//obtener los 5 ultimos comandos ejecutados
export async function getLastCommands({ userId }: { userId: string }) {
  const { data: commands, error: commandsError } = await supabase
    .from('command_history')
    .select('*, command:commands!inner(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5)

  return { commands, commandsError }
}

export async function getUserSession() {
  const { data, error } = await getUser()

  if (error) {
    return { user: null, error }
  }

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return { user: user, error: userError }
}

export async function getUserSingle({ userId }: { userId: string }) {
  const { data: user, error: userError } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single()

return { user: user, error: userError }
}

export async function deleteCommandById({ commandId }: { commandId: string }) {
  const { error } = await supabase.from('commands').delete().eq('id', commandId)

  return { error }
}


export async function getDevicesByUser({ userId }: { userId: string }) {
  const { data: devices, error: devicesError } = await supabase.from('devices')
    .select('*')
    .eq('user_id', userId)

  return { devices, devicesError }
}

export async function createToken({ userId }: {userId: string}) {
  const { data: tokenInsertResult, error: tokenInsertError } = 
    await supabase.from('tokens').insert({user_id: userId}).select('*').single()

  return { tokenInsertResult, tokenInsertError }
}

export async function getApiKeyByUser({ userId }: { userId: string }) {
  const {data: appiKey, error: appiKeyError} = 
    await supabase.from('api_keys')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  return { appiKey, appiKeyError } 
}


//update api keys
export async function updateApiKeys({ apiKeysData }: { apiKeysData: ApiKeyUpdate }) {
  const { data: apiKeys, error: errorApiKeys } = await supabase
    .from('api_keys')
    .update({ ...apiKeysData })
    .eq('user_id', apiKeysData.user_id ?? '')
    .select('*')
    .single()

  return { apiKeys, errorApiKeys }
}

//insert api keys
export async function insertApiKeys({ apiKeysData }: { apiKeysData: ApiKeyInsert }) {
  const { data: apiKeys, error: errorApiKeys } = await supabase
    .from('api_keys')
    .insert({ ...apiKeysData })
    .select('*')
    .single()

  return { apiKeys, errorApiKeys }
}