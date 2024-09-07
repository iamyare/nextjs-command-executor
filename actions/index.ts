'use server'
import { supabase } from '@/lib/supabase'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache'
import { nanoid } from 'nanoid'

export async function debugLog(level: 'info' | 'error', message: string, data?: any) {
  const supabase = await createSupabaseServerClient()
  await supabase.from('debug_logs').insert({
    level,
    message,
    data: data ? JSON.stringify(data) : null
  })
}

export async function createAuthCode(clientId: string, redirectUri: string, state: string) {
  await debugLog('info', 'Creating auth code', { clientId, redirectUri, state })
  
  if (clientId !== process.env.ALEXA_CLIENT_ID) {
    await debugLog('error', 'Invalid client_id', { clientId, expectedClientId: process.env.ALEXA_CLIENT_ID })
    throw new Error('Invalid client_id')
  }

  const supabase = await createSupabaseServerClient()
  const authCode = nanoid()

  const { error } = await supabase.from('auth_codes').insert({
    code: authCode,
    state: state,
    redirect_uri: redirectUri,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
  })

  if (error) {
    await debugLog('error', 'Failed to insert auth code', { error: error.message })
    throw new Error('Failed to create auth code')
  }

  await debugLog('info', 'Auth code created successfully', { authCode, redirectUri })
  return authCode
}

export async function verifyAndExchangeAuthCode(code: string, clientId: string, clientSecret: string) {
  if (clientId !== process.env.ALEXA_CLIENT_ID || clientSecret !== process.env.ALEXA_CLIENT_SECRET) {
    throw new Error('Invalid client credentials')
  }

  const supabase = await createSupabaseServerClient()
  const { data: authCode, error } = await supabase
    .from('auth_codes')
    .select('*')
    .eq('code', code)
    .single()

  if (error || !authCode || new Date(authCode.expires_at) < new Date()) {
    throw new Error('Invalid authorization code')
  }

  const accessToken = nanoid()
  const refreshToken = nanoid()

  await supabase.from('user_tokens').insert({
    user_id: authCode.user_id,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
  })

  await supabase.from('auth_codes').delete().eq('code', code)

  return {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: refreshToken
  }
}

export async function linkAccount(authCode: string, userId: string, redirectUri: string) {
  await debugLog('info', 'Linking account', { authCode, userId, redirectUri })
  
  const supabase = await createSupabaseServerClient()
  
  const { data: existingCode, error: fetchError } = await supabase
    .from('auth_codes')
    .select('*')
    .eq('code', authCode)
    .single()

  if (fetchError || !existingCode) {
    await debugLog('error', 'Auth code not found', { authCode, error: fetchError?.message })
    throw new Error('Auth code not found')
  }

  const { error: updateError } = await supabase
    .from('auth_codes')
    .update({ user_id: userId, redirect_uri: redirectUri })
    .eq('code', authCode)

  if (updateError) {
    await debugLog('error', 'Failed to update auth code', { authCode, userId, redirectUri, error: updateError.message })
    throw new Error('Failed to link account')
  }

  await debugLog('info', 'Account linked successfully', { authCode, userId, redirectUri })
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