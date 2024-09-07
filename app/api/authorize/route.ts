import { NextRequest, NextResponse } from 'next/server'
import { createAuthCode, debugLog } from '@/actions'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('client_id')
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')
  const responseType = searchParams.get('response_type')


  await debugLog('info', 'Authorize request received', { clientId, redirectUri, state, responseType })

  if (!clientId || !redirectUri || !state || responseType !== 'code') {
    await debugLog('error', 'Invalid request parameters', { clientId, redirectUri, state, responseType })
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const authCode = await createAuthCode(clientId, redirectUri, state)
    const loginUrl = `/?auth_code=${authCode}&redirect_uri=${encodeURIComponent(redirectUri)}&alexa_auth=true`
    await debugLog('info', 'Redirecting to login URL', { loginUrl })
    return NextResponse.redirect(new URL(loginUrl, request.url))
  } catch (error) {
    await debugLog('error', 'Failed to create auth code', { error: error.message })
    return NextResponse.json({ error: 'Failed to create auth code' }, { status: 500 })
  }
}