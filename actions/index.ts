'use server'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'
import { nanoid } from 'nanoid'



export async function createAuthCode({ clientId, redirectUri, state, scope }: { clientId: string, redirectUri: string, state: string, scope: string | null }) {
  
  if (clientId !== process.env.ALEXA_CLIENT_ID) {
    throw new Error('Invalid client_id')
  }

  const supabase = await createSupabaseServerClient()
  const authCode = nanoid()

  const { error } = await supabase.from('auth_codes').insert({
    code: authCode,
    state: state,
    redirect_uri: redirectUri,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes expiration
  })

  if (error) {
    throw new Error('Failed to create auth code')
  }

  return authCode
}


export async function verifyAndExchangeAuthCode({ code, clientId, redirectUri }: { code: string, clientId: string, redirectUri: string }) {

  if (clientId !== process.env.ALEXA_CLIENT_ID ) {
    throw new Error('Invalid client credentials')
  }

  const supabase = await createSupabaseServerClient()
  const { data: authCode, error } = await supabase
    .from('auth_codes')
    .select('*')
    .eq('code', code)
    .single()

  if (error || !authCode || new Date(authCode.expires_at) < new Date() || authCode.redirect_uri !== redirectUri) {
    throw new Error('Invalid authorization code')
  }

  const accessToken = nanoid(32)
  const refreshToken = nanoid(32)
  const expiresIn = 3600 // 1 hour

  const { error: insertError } = await supabase.from('user_tokens').insert({
    user_id: authCode.user_id,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: new Date(Date.now() + expiresIn * 1000).toISOString()
  })

  if (insertError) {
    throw new Error('Failed to generate tokens')
  }

  await supabase.from('auth_codes').delete().eq('code', code)


  return {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: expiresIn,
    refresh_token: refreshToken
  }
}

export async function linkAccount({ authCode, userId, redirectUri }: { authCode: string, userId: string, redirectUri: string }) {
  
  const supabase = await createSupabaseServerClient()
  
  const { data: existingCode, error: fetchError } = await supabase
    .from('auth_codes')
    .select('*')
    .eq('code', authCode)
    .single()

  if (fetchError || !existingCode) {
    throw new Error('Auth code not found')
  }

  const { error: updateError } = await supabase
    .from('auth_codes')
    .update({ user_id: userId })
    .eq('code', authCode)

  if (updateError) {
    throw new Error('Failed to link account')
  }

  return { code: authCode, redirect_uri: redirectUri, state: existingCode.state }
}


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

//cambiar alert de user
export async function UpdateUserAlert({ alert, userId }: { alert: boolean, userId:string }) {
  const { data: userUpdateResult, error: userUpdateError } = await supabase
    .from('users')
    .update({ alert: alert })
    .eq('id', userId)

  return { userUpdateResult, userUpdateError }
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

export async function getTokensByUser({ userId }: { userId: string }) {
  const { data: tokens, error: tokensError } = await supabase.from('tokens')
    .select('*')
    .eq('user_id', userId)
    .single()

  return { tokens, tokensError }
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

//Eliminar dispositivo
export async function deleteDeviceById({ deviceId }: { deviceId: string }) {
  const { error } = await supabase.from('devices').delete().eq('id', deviceId)

  return { error }
}

//UpdateDeviceName
export async function UpdateDeviceName({ data }: { data: DeviceUpdate }) {
  const { data: deviceUpdateResult, error: deviceUpdateError } =
    await supabase.from('devices').update({ ...data }).eq('id', data.id ?? '')

  return { deviceUpdateResult, deviceUpdateError }
}